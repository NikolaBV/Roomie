using Domain.Enums;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public PostStatus Status { get; set; }
        public int FreeSpots { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


        public string UserId { get; set; }
        public User Creator { get; set; }
        public ICollection<RoomateRequest> RoomateRequests { get; set; }
    }
}
