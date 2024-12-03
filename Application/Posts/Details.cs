using Application.Core;
using Domain;
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
                    return Result<PostDetailsResult>.Faliure("Post not found.");
                }

                if (request.UserId != null)
                {
                    // Check if a RoomateRequest exists for the given UserId and PostId
                    var roomateRequestExists = post.RoomateRequests
                        .Any(rr => rr.UserId == request.UserId);

                    if (roomateRequestExists)
                    {
                        return Result<PostDetailsResult>.Success(new PostDetailsResult
                        {
                            Post = post,
                            hasUserRequestedThePost = true
                        });
                    }
                }

                return Result<PostDetailsResult>.Success(new PostDetailsResult
                {
                    Post = post,
                    hasUserRequestedThePost = false
                });

            }
        }
    }
}
