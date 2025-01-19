using Application.Roomies;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RoomiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> ListRoomies(CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new List.Query(), cancellationToken));
        }

        [HttpGet("is-user-a-roomie")]
        public async Task<ActionResult<bool>> IsUserInARoomie(
            [FromQuery] string userId,
            CancellationToken cancellationToken
        )
        {
            return HandleResult(
                await Mediator.Send(
                    new IsUserInARoomie.Query { UserId = userId },
                    cancellationToken
                )
            );
        }

        [HttpPost("get-property-by-userId")]
        public async Task<ActionResult<Property>> GetPropertyByUserId(
            [FromBody] string userId,
            CancellationToken cancellationToken
        )
        {
            return HandleResult(
                await Mediator.Send(
                    new GetPropertyByUserId.Query { UserId = userId },
                    cancellationToken
                )
            );
        }

        [HttpPost("get-users-of-roomie")]
        public async Task<ActionResult<ICollection<RoomieUser>>> GetUsersOfRoomie([FromBody]string userId)
        {
            return HandleResult(
                await Mediator.Send(new GetAllUsersForRoomie.Query { UserId = userId })
            );
        }
    }
}
