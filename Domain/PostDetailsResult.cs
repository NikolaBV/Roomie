using Domain.Enums;

namespace Domain
{
    public class PostDetailsResult
    {
        public Post Post { get; set; }
        public RequestStatus requestStatus {get;set;}
        public bool hasUserRequestedThePost { get; set; }
    }
}