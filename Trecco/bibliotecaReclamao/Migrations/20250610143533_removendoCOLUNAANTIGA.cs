using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bibliotecaReclamao.Migrations
{
    /// <inheritdoc />
    public partial class removendoCOLUNAANTIGA : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "removerEsteCampo",
                table: "Usuarios");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
