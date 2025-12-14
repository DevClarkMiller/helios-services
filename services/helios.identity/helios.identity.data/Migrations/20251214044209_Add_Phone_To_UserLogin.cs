using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace helios.identity.data.Migrations
{
    /// <inheritdoc />
    public partial class Add_Phone_To_UserLogin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "UserLogins",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "UserLogins");
        }
    }
}
