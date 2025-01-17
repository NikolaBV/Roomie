using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roomies
{
    public class List
    {
        public class Query : IRequest<Result<List<Roomie>>> { } //We tell the request what object its going to be returned from this query

        public class Handler : IRequestHandler<Query, Result<List<Roomie>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Roomie>>> Handle(
                Query request,
                CancellationToken cancellationToken
            ) //Pass the query to the handler
            {
                var roomies = await _context
                    .Roomies.Include(r => r.RoomieUsers)
                    .ThenInclude(ru => ru.User) // Load User details
                    .Include(r => r.Post) // Optionally include Post details
                    .ToListAsync();
                return Result<List<Roomie>>.Success(roomies);
            }
        }
    }
}
