using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedRoomieEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RoomieId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Roomies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    PostId = table.Column<Guid>(type: "TEXT", nullable: false),
                    OwnerId = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roomies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roomies_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RoomieId",
                table: "AspNetUsers",
                column: "RoomieId");

            migrationBuilder.CreateIndex(
                name: "IX_Roomies_PostId",
                table: "Roomies",
                column: "PostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Roomies_RoomieId",
                table: "AspNetUsers",
                column: "RoomieId",
                principalTable: "Roomies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Roomies_RoomieId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Roomies");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RoomieId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RoomieId",
                table: "AspNetUsers");
        }
    }
}
