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
                await _context.SaveChangesAsync(cancellationToken);
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}