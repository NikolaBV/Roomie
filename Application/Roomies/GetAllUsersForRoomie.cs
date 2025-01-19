using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roomies
{
    public class GetAllUsersForRoomie
    {
        public class Query : IRequest<Result<List<User>>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<User>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<User>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                var roomie = await _context
                    .Roomies.Include(r => r.RoomieUsers)
                    .FirstOrDefaultAsync(r =>
                        r.RoomieUsers.Any(ru =>
                            ru.UserId == request.UserId || r.OwnerId == request.UserId
                        )
                    );
                if (roomie == null)
                {
                    return Result<List<User>>.Failure("Not found");
                }
                var users = new List<User>();

                foreach (var roomieUser in roomie.RoomieUsers)
                {
                    var currentUser = await _context.Users.FindAsync(roomieUser.UserId);
                    users.Add(currentUser);
                }
                return Result<List<User>>.Success(users);
            }
        }
    }
}
