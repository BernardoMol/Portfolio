import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterandoCampoFoto1749399586488 implements MigrationInterface {
    name = 'AlterandoCampoFoto1749399586488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Lojas\` DROP COLUMN \`FotoLoja\``);
        await queryRunner.query(`ALTER TABLE \`Lojas\` ADD \`FotoLoja\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`Clientes\` DROP COLUMN \`FotoCliente\``);
        await queryRunner.query(`ALTER TABLE \`Clientes\` ADD \`FotoCliente\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Clientes\` DROP COLUMN \`FotoCliente\``);
        await queryRunner.query(`ALTER TABLE \`Clientes\` ADD \`FotoCliente\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Lojas\` DROP COLUMN \`FotoLoja\``);
        await queryRunner.query(`ALTER TABLE \`Lojas\` ADD \`FotoLoja\` varchar(255) NOT NULL`);
    }

}
