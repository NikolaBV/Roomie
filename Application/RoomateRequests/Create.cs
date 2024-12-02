using Application.Core;
using Domain;
using MediatR;
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
                _context.RoomateRequests.Add(request.RoomateRequest);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!result)
                    return Result<Unit>.Faliure("Failed to create a request");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}