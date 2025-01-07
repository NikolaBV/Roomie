using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.RoomateRequests
{
    public class GetRequestsForPost
    {
        public class Query : IRequest<Result<List<RoomateRequest>>>
        {
            public Guid PostId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<RoomateRequest>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<RoomateRequest>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var roomateRequests = _context.RoomateRequests.Where(rr => rr.PostId == request.PostId).ToList();
                if (roomateRequests == null)
                {
                    return Result<List<RoomateRequest>>.Failure("No requests found");
                }
                return Result<List<RoomateRequest>>.Success(roomateRequests);
            }
        }
    }
}