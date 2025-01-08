using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ApprovedRequests
{
    public class ListApprovedUsersByPost
    {
        public class Query : IRequest<Result<List<User>>>
        {
            public Guid PostId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<User>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<User>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Finish the logic
                /*
                1. Search the approved romates by post id
                2. Return a list of the users linked to a post
                3. Return the list 
                */
                var approvedRoomates = await _context.ApprovedRoomates.Where(ar => ar.PostId == request.PostId).ToListAsync();
                List<User> usersObject = new List<User>();

                foreach (var user in approvedRoomates)
                {
                    var newUser = await _context.Users.FindAsync(user.UserId);
                    usersObject.Add(newUser);
                }

                if (approvedRoomates == null)
                {
                    return Result<List<User>>.Failure("Not found");
                }
                return Result<List<User>>.Success(usersObject);
            }
        }


    }
}