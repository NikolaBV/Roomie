using System.Text.Json.Serialization;

namespace Domain
{
    public class RoomieUser
    {
        public Guid RoomieId { get; set; }

        [JsonIgnore]
        public Roomie Roomie { get; set; }

        public string UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
