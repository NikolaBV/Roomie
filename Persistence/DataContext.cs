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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //One to many relationship users to posts
            builder.Entity<Post>()
            .HasOne(p => p.Creator)
            .WithMany(u => u.CreatedPosts)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<RoomateRequest>()
            .HasOne(r => r.User)
            .WithMany(u => u.RoomateRequests)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<RoomateRequest>()
            .HasOne(r => r.Post)
            .WithMany(p => p.RoomateRequests)
            .HasForeignKey(r => r.PostId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}