using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedEagerLoadedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Roomies_RoomieId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RoomieId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RoomieId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "RoomieUser",
                columns: table => new
                {
                    RoomieId = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomieUser", x => new { x.RoomieId, x.UserId });
                    table.ForeignKey(
                        name: "FK_RoomieUser_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoomieUser_Roomies_RoomieId",
                        column: x => x.RoomieId,
                        principalTable: "Roomies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomieUser_UserId",
                table: "RoomieUser",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomieUser");

            migrationBuilder.AddColumn<Guid>(
                name: "RoomieId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RoomieId",
                table: "AspNetUsers",
                column: "RoomieId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Roomies_RoomieId",
                table: "AspNetUsers",
                column: "RoomieId",
                principalTable: "Roomies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
