using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class ListByUserId
    {
        public class Query : IRequest<Result<List<Property>>>
        {
            public string UserId { get; set; }
        }

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
                var property = await _context
                    .Properties.Where(p => p.UserId == request.UserId)
                    .ToListAsync();
                return Result<List<Property>>.Success(property);
            }
        }
    }
}
