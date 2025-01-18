using System.Text.Json.Serialization;
using Domain.Enums;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public int FreeSpots { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UserId { get; set; }

        [JsonIgnore]
        public User Creator { get; set; }

        [JsonIgnore]
        public Property Property { get; set; }
        public Guid PropertyId { get; set; }

        [JsonIgnore]
        public ICollection<RoomateRequest> RoomateRequests { get; set; }

        [JsonIgnore]
        public ICollection<ApprovedRoomate> ApprovedRoomates { get; set; }

        [JsonIgnore]
        public Roomie Roomie { get; set; }
    }
}
