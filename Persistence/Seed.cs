using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var userOne = new User
                {
                    UserName = "NikolaBV",
                    Email = "nikolavalkovb@gmail.com",
                    Bio =
                        "A software developer who enjoys sharing living spaces with like-minded people.",
                    Available = true,
                };
                var userTwo = new User
                {
                    UserName = "bulgarianmapper",
                    Email = "bulgarianmapper64@gmail.com",
                    Bio =
                        "An enthusiastic traveler and student, always looking for a quiet place to study.",
                    Available = true,
                };

                await userManager.CreateAsync(userOne, "Pa$$w0rd");
                await userManager.CreateAsync(userTwo, "Pa$$w0rdUserTwo");
            }

            var user1 = await userManager.FindByEmailAsync("nikolavalkovb@gmail.com");
            var user2 = await userManager.FindByEmailAsync("bulgarianmapper64@gmail.com");

            if (!context.Posts.Any())
            {
                var posts = new List<Post>
                {
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Room Available Near University",
                        Description =
                            "Spacious room available in a 3-bedroom house, 10 minutes from campus. Ideal for students.",
                        Status = false,
                        FreeSpots = 1,
                        CreatedAt = DateTime.Now.AddDays(-7),
                        UpdatedAt = DateTime.Now.AddDays(-6),
                        CreatorId = user2.Id,
                    },
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Shared House with Garden",
                        Description =
                            "Room available in a 4-bedroom house with a garden. Rent is $550/month, plus utilities.",
                        Status = true,
                        FreeSpots = 2,
                        CreatedAt = DateTime.Now.AddDays(-3),
                        UpdatedAt = DateTime.Now.AddDays(-2),
                        CreatorId = user2.Id,
                    },
                    new Post
                    {
                        Id = Guid.NewGuid(),
                        Title = "Търся си съквартирант",
                        Description =
                            "Поради началото на следващия семестър след няколко седмици си търся бързо съквартирант.",
                        Status = false,
                        FreeSpots = 1,
                        CreatedAt = DateTime.Now.AddDays(-7),
                        UpdatedAt = DateTime.Now.AddDays(-6),
                        CreatorId = user1.Id,
                    },
                };

                await context.Posts.AddRangeAsync(posts);
                await context.SaveChangesAsync();
            }

            var seededPosts = context.Posts.ToList();

            if (!context.Set<Property>().Any())
            {
                var properties = new List<Property>
                {
                    new Property
                    {
                        Id = Guid.NewGuid(),
                        Address = "жк Тракия 3325",
                        ApartmentType = ApartmentType.ThreeBedroom,
                        NumberOfRooms = 4,
                        Furnished = true,
                        Rent = 1000,
                        AdditionalNotes = "Домашни любимци са позволени",
                        PostId =
                            seededPosts.FirstOrDefault(p => p.Title == "Търся си съквартирант")?.Id
                            ?? Guid.NewGuid(),
                        UserId = user1.Id,
                    },
                    new Property
                    {
                        Id = Guid.NewGuid(),
                        Address = "123 Main Street, City Center",
                        ApartmentType = ApartmentType.TwoBedroom,
                        NumberOfRooms = 2,
                        Furnished = true,
                        Rent = 1400,
                        AdditionalNotes = "Close to public transport and fully furnished.",
                        PostId =
                            seededPosts
                                .FirstOrDefault(p => p.Title == "Shared House with Garden")
                                ?.Id ?? Guid.NewGuid(),
                        UserId = user2.Id,
                    },
                    new Property
                    {
                        Id = Guid.NewGuid(),
                        Address = "456 University Avenue",
                        ApartmentType = ApartmentType.ThreeBedroom,
                        NumberOfRooms = 3,
                        Furnished = false,
                        Rent = 1500,
                        AdditionalNotes = "Ideal for students, 10 minutes from campus.",
                        PostId =
                            seededPosts
                                .FirstOrDefault(p => p.Title == "Room Available Near University")
                                ?.Id ?? Guid.NewGuid(),
                        UserId = user2.Id,
                    },
                };

                await context.Set<Property>().AddRangeAsync(properties);
                await context.SaveChangesAsync();

                foreach (var post in seededPosts)
                {
                    var property = properties.FirstOrDefault(property =>
                        property.PostId == post.Id
                    );
                    if (property != null)
                    {
                        post.PropertyId = property.Id;
                        property.UserId = post.CreatorId;
                    }
                }

                context.Posts.UpdateRange(seededPosts);
                context.Set<Property>().UpdateRange(properties);
                await context.SaveChangesAsync();
            }
        }
    }
}
