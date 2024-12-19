using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddedApprovedUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedRoomate_AspNetUsers_UserId",
                table: "ApprovedRoomate");

            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedRoomate_Posts_PostId",
                table: "ApprovedRoomate");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApprovedRoomate",
                table: "ApprovedRoomate");

            migrationBuilder.RenameTable(
                name: "ApprovedRoomate",
                newName: "ApprovedRoomates");

            migrationBuilder.RenameIndex(
                name: "IX_ApprovedRoomate_UserId",
                table: "ApprovedRoomates",
                newName: "IX_ApprovedRoomates_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApprovedRoomates",
                table: "ApprovedRoomates",
                columns: new[] { "PostId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_ApprovedRoomates_PostId",
                table: "ApprovedRoomates",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedRoomates_AspNetUsers_UserId",
                table: "ApprovedRoomates",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedRoomates_Posts_PostId",
                table: "ApprovedRoomates",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedRoomates_AspNetUsers_UserId",
                table: "ApprovedRoomates");

            migrationBuilder.DropForeignKey(
                name: "FK_ApprovedRoomates_Posts_PostId",
                table: "ApprovedRoomates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApprovedRoomates",
                table: "ApprovedRoomates");

            migrationBuilder.DropIndex(
                name: "IX_ApprovedRoomates_PostId",
                table: "ApprovedRoomates");

            migrationBuilder.RenameTable(
                name: "ApprovedRoomates",
                newName: "ApprovedRoomate");

            migrationBuilder.RenameIndex(
                name: "IX_ApprovedRoomates_UserId",
                table: "ApprovedRoomate",
                newName: "IX_ApprovedRoomate_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApprovedRoomate",
                table: "ApprovedRoomate",
                columns: new[] { "PostId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedRoomate_AspNetUsers_UserId",
                table: "ApprovedRoomate",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApprovedRoomate_Posts_PostId",
                table: "ApprovedRoomate",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
