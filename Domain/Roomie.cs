using System.Text.Json.Serialization;
using Domain;

public class Roomie
{
    public Guid Id { get; set; }

    public Guid PostId { get; set; }

    [JsonIgnore]
    public Post Post { get; set; }

    public string OwnerId { get; set; }

    public ICollection<RoomieUser> RoomieUsers { get; set; } = new List<RoomieUser>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
