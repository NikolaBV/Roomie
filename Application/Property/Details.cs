using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class Details
    {
        public class Query : IRequest<Result<Property>>
        {
            public Guid PostId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Property>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Property>> Handle(Query request, CancellationToken cancellationToken)
            {
                var property = _context.Properties
                .FirstOrDefault(prop => prop.PostId == request.PostId);

                if (property == null)
                {
                    return Result<Property>.Faliure("Not found");
                }
                return Result<Property>.Success(property);
            }
        }
    }
}