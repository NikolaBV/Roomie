using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.ApprovedRequests
{
    public class PostByUser
    {
        public class Query : IRequest<Result<Guid>>
        {
            public string UserId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Guid>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Guid>> Handle(Query request, CancellationToken cancellationToken)
            {
                var approvedRoommate = _context.ApprovedRoomates.FirstOrDefault(ar => ar.UserId == request.UserId);

                if (approvedRoommate == null)
                {
                    return Result<Guid>.Faliure("No approved roommate found for the given UserId.");
                }

                var postId = approvedRoommate.PostId;

                return Result<Guid>.Success(postId);
            }
        }
    }
}
