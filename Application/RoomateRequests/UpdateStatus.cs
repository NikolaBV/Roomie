using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
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
                roomateRequest.Status = request.NewStatus;

                var post = await _context.Posts.FindAsync(roomateRequest.PostId);

                if(request.NewStatus.ToString() == "Approved"){
                    if(post.FreeSpots < 1){
                        return Result<Unit>.Faliure("Not enough free spots!");
                    }
                    else{
                        post.FreeSpots = post.FreeSpots - 1;
                    }
                }

                /*
                1. Get the post the request is about
                2. Check the incoming status sent by the user via the request parameters
                3. If the new status is success:
                    3.1. Check of there are free spots, if there are not:
                            Return failure with message not enough spots on post
                         If there are free spots
                            decreas the freeSpots of the post by 1       
                */

                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}