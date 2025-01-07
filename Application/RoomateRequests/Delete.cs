using Application.Core;
using MediatR;
using Persistence;

namespace Application.RoomateRequests
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var roomateRequest = await _context.RoomateRequests.FindAsync(request.Id);
                if(roomateRequest == null){
                    return Result<Unit>.Failure("No such request found");
                }
                 _context.RoomateRequests.Remove(roomateRequest);
                 await _context.SaveChangesAsync();
                 return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}