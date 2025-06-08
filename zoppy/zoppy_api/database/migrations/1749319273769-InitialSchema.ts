import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1749319273769 implements MigrationInterface {
    name = 'InitialSchema1749319273769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Produtos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`NomeProduto\` varchar(255) NOT NULL, \`Estoque\` int NOT NULL, \`Valor\` decimal NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Lojas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`NomeLoja\` varchar(255) NOT NULL, \`EnderecoLoja\` varchar(255) NOT NULL, \`FotoLoja\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Pedidos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`DataDoPedido\` date NOT NULL, \`DataPrevistaEntrega\` date NOT NULL, \`EnderecoEntrega\` varchar(255) NOT NULL, \`Entregue\` tinyint NOT NULL, \`clienteId\` int NULL, \`lojaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Clientes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`NomeCliente\` varchar(255) NOT NULL, \`EmailCliente\` varchar(255) NOT NULL, \`EnderecoCliente\` varchar(255) NOT NULL, \`FotoCliente\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`loja_produto\` (\`lojaId\` int NOT NULL, \`produtoId\` int NOT NULL, INDEX \`IDX_99b50b8ed4e202aae6f2f30526\` (\`lojaId\`), INDEX \`IDX_5c2f11750d499b21db4716893f\` (\`produtoId\`), PRIMARY KEY (\`lojaId\`, \`produtoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pedido_produto\` (\`pedidoId\` int NOT NULL, \`produtoId\` int NOT NULL, INDEX \`IDX_0e4bd2eb3bcf399be34d3c8852\` (\`pedidoId\`), INDEX \`IDX_af4f7273303fc03948f2755b4e\` (\`produtoId\`), PRIMARY KEY (\`pedidoId\`, \`produtoId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Pedidos\` ADD CONSTRAINT \`FK_2501421331c61daf892a8c227c0\` FOREIGN KEY (\`clienteId\`) REFERENCES \`Clientes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Pedidos\` ADD CONSTRAINT \`FK_d830301f1ffbdd4dbd0b42893bc\` FOREIGN KEY (\`lojaId\`) REFERENCES \`Lojas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`loja_produto\` ADD CONSTRAINT \`FK_99b50b8ed4e202aae6f2f305263\` FOREIGN KEY (\`lojaId\`) REFERENCES \`Lojas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`loja_produto\` ADD CONSTRAINT \`FK_5c2f11750d499b21db4716893f6\` FOREIGN KEY (\`produtoId\`) REFERENCES \`Produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pedido_produto\` ADD CONSTRAINT \`FK_0e4bd2eb3bcf399be34d3c88527\` FOREIGN KEY (\`pedidoId\`) REFERENCES \`Pedidos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`pedido_produto\` ADD CONSTRAINT \`FK_af4f7273303fc03948f2755b4ee\` FOREIGN KEY (\`produtoId\`) REFERENCES \`Produtos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pedido_produto\` DROP FOREIGN KEY \`FK_af4f7273303fc03948f2755b4ee\``);
        await queryRunner.query(`ALTER TABLE \`pedido_produto\` DROP FOREIGN KEY \`FK_0e4bd2eb3bcf399be34d3c88527\``);
        await queryRunner.query(`ALTER TABLE \`loja_produto\` DROP FOREIGN KEY \`FK_5c2f11750d499b21db4716893f6\``);
        await queryRunner.query(`ALTER TABLE \`loja_produto\` DROP FOREIGN KEY \`FK_99b50b8ed4e202aae6f2f305263\``);
        await queryRunner.query(`ALTER TABLE \`Pedidos\` DROP FOREIGN KEY \`FK_d830301f1ffbdd4dbd0b42893bc\``);
        await queryRunner.query(`ALTER TABLE \`Pedidos\` DROP FOREIGN KEY \`FK_2501421331c61daf892a8c227c0\``);
        await queryRunner.query(`DROP INDEX \`IDX_af4f7273303fc03948f2755b4e\` ON \`pedido_produto\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e4bd2eb3bcf399be34d3c8852\` ON \`pedido_produto\``);
        await queryRunner.query(`DROP TABLE \`pedido_produto\``);
        await queryRunner.query(`DROP INDEX \`IDX_5c2f11750d499b21db4716893f\` ON \`loja_produto\``);
        await queryRunner.query(`DROP INDEX \`IDX_99b50b8ed4e202aae6f2f30526\` ON \`loja_produto\``);
        await queryRunner.query(`DROP TABLE \`loja_produto\``);
        await queryRunner.query(`DROP TABLE \`Clientes\``);
        await queryRunner.query(`DROP TABLE \`Pedidos\``);
        await queryRunner.query(`DROP TABLE \`Lojas\``);
        await queryRunner.query(`DROP TABLE \`Produtos\``);
    }

}
