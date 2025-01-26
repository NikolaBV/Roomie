using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Properties
{
    public class Create
    {
        public class Command : IRequest<Result<Property>> 
        {
            public Property Property { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Property>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Property>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Properties.Add(request.Property);

                // Save the changes
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Property>.Failure("Failed to create a Property");

                return Result<Property>.Success(request.Property);
            }
        }
    }
}
