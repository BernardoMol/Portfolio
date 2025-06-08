import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProdutoValorPrecision1749320189756 implements MigrationInterface {
    name = 'UpdateProdutoValorPrecision1749320189756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Produtos\` CHANGE \`Valor\` \`Valor\` decimal(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Produtos\` CHANGE \`Valor\` \`Valor\` decimal(10,0) NOT NULL`);
    }

}
