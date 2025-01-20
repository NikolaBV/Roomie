using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class List
    {
        public class Query : IRequest<Result<List<Property>>> { } //We tell the request what object its going to be returned from this query

        public class Handler : IRequestHandler<Query, Result<List<Property>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Property>>> Handle(
                Query request,
                CancellationToken cancellationToken
            ) //Pass the query to the handler
            {
                var property = await _context.Properties.ToListAsync(cancellationToken);
                return Result<List<Property>>.Success(property);
            }
        }
    }
}
