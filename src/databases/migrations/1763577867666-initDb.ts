import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitDb1763577867666 implements MigrationInterface {
  name = 'InitDb1763577867666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "authors",
      columns: [
        { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "name", type: "varchar", isNullable: false }
      ]
    }), true);
    await queryRunner.createTable(new Table({
      name: "posts",
      columns: [
        { name: "id", type: "integer", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
        { name: "authorId", type: "integer", isNullable: true },
        { name: "title", type: "varchar", isNullable: true },
        { name: "subtitle", type: "varchar", isNullable: true },
        { name: "content", type: "varchar", isNullable: true }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE authors`);
    await queryRunner.query(`DROP TABLE posts`);
  }
}
