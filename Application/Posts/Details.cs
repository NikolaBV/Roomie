using Application.Core;
using Domain;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<Result<PostDetailsResult>>
        {
            public Guid PostId { get; set; }
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PostDetailsResult>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<PostDetailsResult>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Retrieve the post
                var post = await _context.Posts
                    .Include(p => p.RoomateRequests) // Include RoomateRequests for the post
                    .FirstOrDefaultAsync(p => p.Id == request.PostId, cancellationToken);

                if (post == null)
                {
                    return Result<PostDetailsResult>.Failure("Post not found.");
                }

                RequestStatus requestStatus = RequestStatus.None; // Default status
                bool hasUserRequestedThePost = false;

                if (request.UserId != null)
                {
                    // Check if a RoomateRequest exists for the given UserId and PostId
                    var roomateRequest = post.RoomateRequests
                        .FirstOrDefault(rr => rr.UserId == request.UserId);

                    if (roomateRequest != null)
                    {
                        hasUserRequestedThePost = true;
                        requestStatus = roomateRequest.Status; // Set the requestStatus from the request
                    }
                }

                return Result<PostDetailsResult>.Success(new PostDetailsResult
                {
                    Post = post,
                    hasUserRequestedThePost = hasUserRequestedThePost,
                    requestStatus = requestStatus
                });
            }
        }
    }
}
