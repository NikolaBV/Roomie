using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.RoomateRequests
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public RoomateRequest RoomateRequest { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts
                     .Include(p => p.RoomateRequests) // Include RoomateRequests for the post
                     .FirstOrDefaultAsync(p => p.Id == request.RoomateRequest.PostId, cancellationToken);

                if (post == null)
                {
                    return Result<Unit>.Failure("Post not found.");
                }

                var userExists = await _context.Users
                    .AnyAsync(u => u.Id == request.RoomateRequest.UserId, cancellationToken);

                if (!userExists)
                {
                    return Result<Unit>.Failure("User not found.");
                }

                if(post.FreeSpots < 1){
                    return Result<Unit>.Failure("No free spots!.");
                }

                _context.RoomateRequests.Add(request.RoomateRequest);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to create a request");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}