using Domain.Enums;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            // Seed Users if not existing
            if (!userManager.Users.Any())
            {
                var userOne = new User
                {
                    UserName = "NikolaBV",
                    Email = "nikolavalkovb@gmail.com",
                    Bio = "A software developer who enjoys sharing living spaces with like-minded people."
                };
                var userTwo = new User
                {
                    UserName = "bulgarianmapper",
                    Email = "bulgarianmapper64@gmail.com",
                    Bio = "An enthusiastic traveler and student, always looking for a quiet place to study."
                };

                await userManager.CreateAsync(userOne, "Pa$$w0rd");
                await userManager.CreateAsync(userTwo, "Pa$$w0rdUserTwo");
            }

            // Retrieve Users
            var user1 = await userManager.FindByEmailAsync("nikolavalkovb@gmail.com");
            var user2 = await userManager.FindByEmailAsync("bulgarianmapper64@gmail.com");

            if (!context.Posts.Any())
            {
                var posts = new List<Post>
                {
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Cozy Apartment in City Center",
                        Description = "Looking for a roommate to share a 2-bedroom apartment in the heart of the city. Fully furnished, close to public transport, and includes utilities. Rent is $700/month per person.",
                        Status = true,
                        FreeSpots = 1,
                        CreatedAt = DateTime.Now.AddDays(-10),
                        UpdatedAt = DateTime.Now.AddDays(-9),
                        UserId = user1.Id
                    },
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Room Available Near University",
                        Description = "Spacious room available in a 3-bedroom house, 10 minutes from campus. Ideal for students. Rent is $500/month, excluding utilities. Shared living room and kitchen.",
                        Status = false,
                        FreeSpots = 1,
                        CreatedAt = DateTime.Now.AddDays(-7),
                        UpdatedAt = DateTime.Now.AddDays(-6),
                        UserId = user2.Id
                    },
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Furnished Room in Quiet Neighborhood",
                        Description = "Looking for a friendly and tidy roommate to share a 2-bedroom apartment. The room is fully furnished. Rent is $600/month, including utilities and WiFi.",
                        Status = true,
                        FreeSpots = 1,
                        CreatedAt = DateTime.Now.AddDays(-5),
                        UpdatedAt = DateTime.Now.AddDays(-4),
                        UserId = user1.Id
                    },
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Shared House with Garden",
                        Description = "Room available in a 4-bedroom house with a garden. Great for someone who enjoys a quiet, homely atmosphere. Rent is $550/month, plus utilities. Pets are welcome!",
                        Status = true,
                        FreeSpots = 2,
                        CreatedAt = DateTime.Now.AddDays(-3),
                        UpdatedAt = DateTime.Now.AddDays(-2),
                        UserId = user2.Id
                    },
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Modern Apartment with Rooftop Access",
                        Description = "Room available in a modern apartment with access to a shared rooftop terrace. Rent is $750/month, including all utilities and high-speed internet.",
                        Status = true,
                        FreeSpots = 1,
                        CreatedAt = DateTime.Now.AddDays(-1),
                        UpdatedAt = DateTime.Now,
                        UserId = user1.Id
                    }
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }

            // Retrieve the seeded posts
            var seededPosts = context.Posts.ToList();

            if (!context.RoomateRequests.Any())
            {
                var roomateRequests = new List<RoomateRequest>
                {
                    new RoomateRequest
                    {
                        Id = Guid.NewGuid(),
                        Status = RequestStatus.None,
                        CreatedAt = DateTime.Now.AddDays(-3),
                        UserId = user2.Id,
                        PostId = seededPosts.First(p => p.Title == "Cozy Apartment in City Center").Id
                    },
                    new RoomateRequest
                    {
                        Id = Guid.NewGuid(),
                        Status = RequestStatus.None,
                        CreatedAt = DateTime.Now.AddDays(-2),
                        UserId = user1.Id,
                        PostId = seededPosts.First(p => p.Title == "Room Available Near University").Id
                    },
                    new RoomateRequest
                    {
                        Id = Guid.NewGuid(),
                        Status = RequestStatus.None,
                        CreatedAt = DateTime.Now.AddDays(-1),
                        UserId = user2.Id,
                        PostId = seededPosts.First(p => p.Title == "Furnished Room in Quiet Neighborhood").Id
                    },
                    new RoomateRequest
                    {
                        Id = Guid.NewGuid(),
                        Status = RequestStatus.None,
                        CreatedAt = DateTime.Now,
                        UserId = user1.Id,
                        PostId = seededPosts.First(p => p.Title == "Shared House with Garden").Id
                    },
                    new RoomateRequest
                    {
                        Id = Guid.NewGuid(),
                        Status = RequestStatus.None,
                        CreatedAt = DateTime.Now,
                        UserId = user2.Id,
                        PostId = seededPosts.First(p => p.Title == "Modern Apartment with Rooftop Access").Id
                    }
                };

                await context.RoomateRequests.AddRangeAsync(roomateRequests);
                await context.SaveChangesAsync();
            }
        }
    }
}