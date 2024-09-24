import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserChangeStatusDto } from './dto/user-change-status.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const alreadyExist = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    console.log(alreadyExist);
    if (alreadyExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: [
        'id',
        'firstName',
        'secondName',
        'firstLastName',
        'secondLastName',
        'email',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  findOne(id: number) {
    return this.userRepository.query(
      `
        SELECT id,
               "firstName",
               "secondName",
               "firstLastName",
               "secondLastName",
               email,
               "isActive",
               "createdAt",
               "updatedAt"
        FROM users
        WHERE id = $1`,
      [id],
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'secondName',
        'firstLastName',
        'secondLastName',
        'email',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async changeStatus(id: number, changeStatus: UserChangeStatusDto) {
    await this.userRepository.update(id, { isActive: changeStatus.isActive });
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'secondName',
        'firstLastName',
        'secondLastName',
        'email',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
