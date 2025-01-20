using Application.Properties;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PropertiesController : BaseApiController
    {
        [HttpGet("get-property")]
        public async Task<ActionResult<Property>> GetPropertyByPostId(
            [FromQuery] Guid postId,
            CancellationToken cancellationToken
        )
        {
            return HandleResult(await Mediator.Send(new Details.Query { PostId = postId }));
        }

        [HttpGet]
        public async Task<ActionResult<Property>> ListProperties(
            CancellationToken cancellationToken
        )
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("list-by-userId")]
        public async Task<ActionResult<Property>> ListByUserId(
            [FromQuery] string userId,
            CancellationToken cancellationToken
        )
        {
            return HandleResult(await Mediator.Send(new ListByUserId.Query { UserId = userId }));
        }
    }
}
