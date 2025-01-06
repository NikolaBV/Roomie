using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class PostByUser
    {
        public class Query : IRequest<Result<Post>>
        {
            public string UserId { get; set; }
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
                var post = _context.Posts.FirstOrDefault(p => p.UserId == request.UserId);

                if (post == null)
                {
                    return Result<Post>.Faliure("Not found");
                }
                return Result<Post>.Success(post);
            }
        }
    }
}
