using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string Bio { get; set; }
        public bool Available { get; set; }

        [JsonIgnore]
        public ICollection<Post> CreatedPosts { get; set; }

        [JsonIgnore]
        public ICollection<RoomateRequest> RoomateRequests { get; set; }

        [JsonIgnore]
        public ICollection<ApprovedRoomate> ApprovedPosts { get; set; }

        [JsonIgnore]
        public ICollection<Property> Properties { get; set; }
    }
}
