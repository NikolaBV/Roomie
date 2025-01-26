using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Create
    {
        public class Command : IRequest<Result<Post>> //No type because commands don't return anything
        {
            public Post Post { get; set; } //What we want to recieve as a parameter from the API
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Post).SetValidator(new PostValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Post>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Post>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Posts.Add(request.Post);
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (!result)
                    return Result<Post>.Failure("Failed to create an Post");
                return Result<Post>.Success(request.Post);

            }
        }
    }
}