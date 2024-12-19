namespace Domain
{
    public class ApprovedRoomate
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid PostId { get; set; }
        public Post Post { get; set; }
        public DateTime ApprovedAt { get; set; }
    }
}
