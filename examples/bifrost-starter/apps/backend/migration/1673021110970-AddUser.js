module.exports = class AddUser1673021110970 {
  name = 'AddUser1673021110970';

  async up(queryRunner) {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "roles" character varying array NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "users"`);
  }
};
