using Domain.Enums;

namespace Domain
{
    public class RoomateRequest
    {
        public Guid Id { get; set; }
        public RequestStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }


        public string UserId { get; set; }
        public User User { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
    }
}