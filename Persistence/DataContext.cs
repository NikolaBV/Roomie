using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<RoomateRequest> RoomateRequests { get; set; }
        public DbSet<ApprovedRoomate> ApprovedRoomates { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // One-to-many: Users to Posts
            builder.Entity<Post>()
                .HasOne(p => p.Creator)
                .WithMany(u => u.CreatedPosts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Post>()
            .HasOne(p => p.Property)
            .WithOne(prop => prop.Post)
            .HasForeignKey<Property>(pr => pr.PostId);

            // One-to-many: Users to Roommate Requests
            builder.Entity<RoomateRequest>()
                .HasOne(r => r.User)
                .WithMany(u => u.RoomateRequests)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // One-to-many: Posts to Roommate Requests
            builder.Entity<RoomateRequest>()
                .HasOne(r => r.Post)
                .WithMany(p => p.RoomateRequests)
                .HasForeignKey(r => r.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            // Many-to-Many: Approved Roommates
            builder.Entity<ApprovedRoomate>()
                .HasKey(ar => new { ar.PostId, ar.UserId });

            builder.Entity<ApprovedRoomate>()
                .HasOne(ar => ar.Post)
                .WithMany(p => p.ApprovedRoomates)
                .HasForeignKey(ar => ar.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ApprovedRoomate>()
                .HasOne(ar => ar.User)
                .WithMany(u => u.ApprovedPosts)
                .HasForeignKey(ar => ar.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Optional Table Naming and Indexing
            builder.Entity<ApprovedRoomate>()
                .ToTable("ApprovedRoomates");

            builder.Entity<ApprovedRoomate>()
                .HasIndex(ar => ar.PostId);

            builder.Entity<ApprovedRoomate>()
                .HasIndex(ar => ar.UserId);
        }
    }
}
