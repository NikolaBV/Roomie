using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Posts.Any()) return;

            var posts = new List<Post>
            {
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Cozy Apartment in City Center",
                    Description = "Looking for a roommate to share a 2-bedroom apartment in the heart of the city. Fully furnished, close to public transport, and includes utilities. Rent is $700/month per person.",
                    CreatedAt = DateTime.Now.AddDays(-10),
                    UpdatedAt = DateTime.Now.AddDays(-9)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Room Available Near University",
                    Description = "Spacious room available in a 3-bedroom house, 10 minutes from campus. Ideal for students. Rent is $500/month, excluding utilities. Shared living room and kitchen.",
                    CreatedAt = DateTime.Now.AddDays(-7),
                    UpdatedAt = DateTime.Now.AddDays(-6)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Furnished Room in Quiet Neighborhood",
                    Description = "Looking for a friendly and tidy roommate to share a 2-bedroom apartment. The room is fully furnished. Rent is $600/month, including utilities and WiFi.",
                    CreatedAt = DateTime.Now.AddDays(-5),
                    UpdatedAt = DateTime.Now.AddDays(-4)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Shared House with Garden",
                    Description = "Room available in a 4-bedroom house with a garden. Great for someone who enjoys a quiet, homely atmosphere. Rent is $550/month, plus utilities. Pets are welcome!",
                    CreatedAt = DateTime.Now.AddDays(-3),
                    UpdatedAt = DateTime.Now.AddDays(-2)
                },
                new Post
                {
                    Id = Guid.NewGuid(),
                    Title = "Modern Apartment with Rooftop Access",
                    Description = "Room available in a modern apartment with access to a shared rooftop terrace. Rent is $750/month, including all utilities and high-speed internet.",
                    CreatedAt = DateTime.Now.AddDays(-1),
                    UpdatedAt = DateTime.Now
                }
            };

            await context.Posts.AddRangeAsync(posts);

            await context.SaveChangesAsync();
        }
    }
}
