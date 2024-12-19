using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string Bio { get; set; }
        public bool Available { get; set; }
        public ICollection<Post> CreatedPosts { get; set; }
        public ICollection<RoomateRequest> RoomateRequests { get; set; }
        public ICollection<ApprovedRoomate> ApprovedPosts { get; set; }

    }
}