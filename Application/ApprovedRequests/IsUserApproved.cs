using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Persistence;

namespace Application.ApprovedRequests
{
    public class IsUserApproved
    {
        public class Query : IRequest<Result<bool>>
        {
            public string UserId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<bool>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<bool>> Handle(Query request, CancellationToken cancellationToken)
            {
                var approvedRoomate = _context.ApprovedRoomates.FirstOrDefault(ar => ar.UserId == request.UserId);

                if (approvedRoomate == null)
                {
                    return Result<bool>.Success(false);
                }
                return Result<bool>.Success(true);
            }
        }
    }
}