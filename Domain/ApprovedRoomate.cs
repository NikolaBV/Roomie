using System.Text.Json.Serialization;

namespace Domain
{
    public class ApprovedRoomate
    {
        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public Guid PostId { get; set; }

        [JsonIgnore] 
        public Post Post { get; set; }

        public DateTime ApprovedAt { get; set; }
    }
}
