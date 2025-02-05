using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<RoomateRequest> RoomateRequests { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Roomie> Roomies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder
                .Entity<Post>()
                .HasOne(p => p.Creator)
                .WithMany(u => u.CreatedPosts)
                .HasForeignKey(p => p.CreatorId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Post>()
                .HasOne(p => p.Property)
                .WithOne(prop => prop.Post)
                .HasForeignKey<Property>(pr => pr.PostId);

            builder
                .Entity<Property>()
                .HasOne(p => p.User)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<RoomateRequest>()
                .HasOne(r => r.User)
                .WithMany(u => u.RoomateRequests)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<RoomateRequest>()
                .HasOne(r => r.Post)
                .WithMany(p => p.RoomateRequests)
                .HasForeignKey(r => r.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<RoomieUser>().HasKey(ru => new { ru.RoomieId, ru.UserId });

            builder
                .Entity<RoomieUser>()
                .HasOne(ru => ru.Roomie)
                .WithMany(r => r.RoomieUsers)
                .HasForeignKey(ru => ru.RoomieId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<RoomieUser>()
                .HasOne(ru => ru.User)
                .WithMany()
                .HasForeignKey(ru => ru.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
