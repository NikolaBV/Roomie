
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class PostsByUser
    {
        public class Query : IRequest<Result<List<Post>>>
        {
            public string UserId { get; set; }
        }
        public class Handler : IRequestHandler<Query,Result<List<Post>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Post>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts =  await _context.Posts.Where(p => p.UserId == request.UserId).Include(p => p.RoomateRequests).ToListAsync();
                return Result<List<Post>>.Success(posts);
            }
        }
    }
}
