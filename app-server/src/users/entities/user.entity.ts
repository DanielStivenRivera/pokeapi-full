import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  firstName: string;
  @Column({ nullable: true })
  secondName: string;
  @Column({ nullable: false })
  firstLastName: string;
  @Column({ nullable: true })
  secondLastName: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
