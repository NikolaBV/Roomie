using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using Domain.Enums;
using MediatR;
using Persistence;

namespace Application.RoomateRequests
{
    public class UpdateStatus
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid RequestId { get; set; }
            public RequestStatus NewStatus { get; set; }
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
                var roomateRequest = await _context.RoomateRequests.FindAsync(request.RequestId);
                if (roomateRequest == null) return Result<Unit>.Faliure("Roommate request not found.");

                var post = await _context.Posts.FindAsync(roomateRequest.PostId);
                if (post == null) return Result<Unit>.Faliure("Post not found.");

                var user = await _context.Users.FindAsync(roomateRequest.UserId);
                if (user == null) return Result<Unit>.Faliure("User not found.");

                roomateRequest.Status = request.NewStatus;

                if (request.NewStatus == RequestStatus.Approved)
                {
                    if (post.FreeSpots < 1)
                    {
                        return Result<Unit>.Faliure("Not enough free spots!");
                    }

                    post.FreeSpots -= 1;
                    user.Available = false;

                    var approvedRoomate = new ApprovedRoomate
                    {
                        PostId = roomateRequest.PostId,
                        UserId = roomateRequest.UserId,
                        ApprovedAt = DateTime.UtcNow
                    };

                    _context.ApprovedRoomates.Add(approvedRoomate);
                }

                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}