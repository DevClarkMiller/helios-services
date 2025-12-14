using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace helios.identity.data.Migrations
{
    /// <inheritdoc />
    public partial class Add_MergeRequest_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MergeRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OriginUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequestedUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequestedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MergeRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MergeRequests_Users_OriginUserId",
                        column: x => x.OriginUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MergeRequests_Users_RequestedUserId",
                        column: x => x.RequestedUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MergeRequests_OriginUserId",
                table: "MergeRequests",
                column: "OriginUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MergeRequests_RequestedUserId",
                table: "MergeRequests",
                column: "RequestedUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MergeRequests");
        }
    }
}
