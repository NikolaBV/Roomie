using Application.Roomies;
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
    }
}
