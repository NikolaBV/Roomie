using Application.Properties;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PropertiesController : BaseApiController
    {
        [HttpGet("get-property")]
        public async Task<ActionResult<Property>> GetPropertyByPostId([FromQuery] Guid postId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new Details.Query { PostId = postId }));
        }
    }
}