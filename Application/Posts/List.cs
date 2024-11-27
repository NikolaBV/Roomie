using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        public class Query : IRequest<Result<List<Post>>> { } //We tell the request what object its going to be returned from this query
        public class Handler : IRequestHandler<Query, Result<List<Post>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Post>>> Handle(Query request, CancellationToken cancellationToken) //Pass the query to the handler
            {
                var posts = await _context.Posts.ToListAsync(cancellationToken);
                return Result<List<Post>>.Success(posts);
            }

        }
    }
}