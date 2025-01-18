using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roomies
{
    public class GetPropertyByUserId
    {
        public class Query : IRequest<Result<Property>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Property>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Property>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                var roomie = await _context
                    .Roomies.Include(r => r.RoomieUsers)
                    .FirstOrDefaultAsync(r => r.RoomieUsers.Any(ru => ru.UserId == request.UserId));
                if (roomie == null)
                {
                    return Result<Property>.Failure("Not found");
                }
                var post = await _context.Posts.FindAsync(roomie.PostId);
                var property = await _context.Properties.FindAsync(post.PropertyId);

                return Result<Property>.Success(property);
            }
        }
    }
}
