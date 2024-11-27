using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return; // Check if there are already posts in the database

            var posts = new List<Post>
            {
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Introduction to C#",
                    Description = "This post covers the basics of C# programming.",
                    CreatedAt = DateTime.Now.AddDays(-10),
                    UpdatedAt = DateTime.Now.AddDays(-9)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Understanding ASP.NET Core",
                    Description = "A deep dive into ASP.NET Core, its structure, and how to get started.",
                    CreatedAt = DateTime.Now.AddDays(-7),
                    UpdatedAt = DateTime.Now.AddDays(-6)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Working with Entity Framework",
                    Description = "Learn how to interact with a database using Entity Framework.",
                    CreatedAt = DateTime.Now.AddDays(-5),
                    UpdatedAt = DateTime.Now.AddDays(-4)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "ASP.NET Core MVC",
                    Description = "Exploring the MVC pattern and how to implement it in ASP.NET Core.",
                    CreatedAt = DateTime.Now.AddDays(-3),
                    UpdatedAt = DateTime.Now.AddDays(-2)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Unit Testing in C#",
                    Description = "A guide to writing unit tests in C# with NUnit and xUnit.",
                    CreatedAt = DateTime.Now.AddDays(-1),
                    UpdatedAt = DateTime.Now
                }
            };

            await context.Posts.AddRangeAsync(posts); // Add posts to the context

            await context.SaveChangesAsync(); // Save changes to the database
        }
    }
}
