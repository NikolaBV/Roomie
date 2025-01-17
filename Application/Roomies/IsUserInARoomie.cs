using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roomies
{
    public class IsUserInARoomie
    {
        public class Query : IRequest<Result<bool>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<bool>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<bool>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                var roomie = await _context.Roomies.AnyAsync(r =>
                    r.RoomieUsers.Any(ru => ru.UserId == request.UserId)
                );
                var owner = await _context.Roomies.AnyAsync(r => r.OwnerId == request.UserId);
                if (roomie == false && owner == false)
                {
                    return Result<bool>.Success(false);
                }
                return Result<bool>.Success(true);
            }
        }
    }
}
