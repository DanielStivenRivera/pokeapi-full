import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Init1726688978008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'firstName',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'secondName',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'firstLastName',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'secondLastName',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'email',
            isNullable: false,
            isUnique: true,
            type: 'varchar',
          },
          {
            name: 'password',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'isActive',
            isNullable: false,
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'DX_EMAIL',
            columnNames: ['email'],
          },
        ],
      }),
    );
    const hashedPass = await bcrypt.hash('password123', 10);
    await queryRunner.query(
      `
        INSERT INTO users ("firstName", "firstLastName", "email", "password")
        VALUES ($1, $2, $3, $4)
    `,
      ['Admin', 'Internal', 'initialuser@yopmail.com', `${hashedPass}`],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
