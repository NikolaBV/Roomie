using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Persistence;

namespace Application.Roomies
{
    public class LeaveRoomie
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(
                Command request,
                CancellationToken cancellationToken
            )
            {
                var roomie = await _context
                    .Roomies.Include(r => r.RoomieUsers)
                    .FirstOrDefaultAsync(r => r.RoomieUsers.Any(ru => ru.UserId == request.UserId));
                if (roomie == null)
                {
                    return Result<Unit>.Failure("Not found");
                }

                /**Declared this in advance to delete it later because .NET doesn't like to itarate trough
                 * collections and modify them at the same time and i was getting this exceptioN:
                 *
                 * Collection was modified; enumeration operation may not execute.
                 
                */

                var roomieUserToBeRemoved = new RoomieUser();

                foreach (var roomieUser in roomie.RoomieUsers)
                {
                    if (roomieUser.UserId == request.UserId)
                    {
                        roomieUserToBeRemoved = roomieUser;
                    }
                }

                roomie.RoomieUsers.Remove(roomieUserToBeRemoved);

                var user = _context.Users.FirstOrDefault(u => u.Id == roomieUserToBeRemoved.UserId);
                user.Available = true;

                var post = _context.Posts.FirstOrDefault(p => p.Id == roomie.PostId);

                var roomateRequest = _context.RoomateRequests.FirstOrDefault(rr =>
                    rr.UserId == user.Id && rr.PostId == post.Id
                );

                post.FreeSpots += 1;

                _context.RoomateRequests.Remove(roomateRequest);

                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
