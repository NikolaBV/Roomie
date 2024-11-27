using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<Result<Post>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Post>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Post>> Handle(Query request, CancellationToken cancellationToken)
            {
                var order = await _context.Posts.FindAsync(request.Id, cancellationToken);
                return Result<Post>.Success(order);
            }
        }
    }
}
