using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ApprovedRequests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ApprovedRoomatesController : BaseApiController
    {
        [Authorize]
        [HttpGet("post-by-user")]
        public async Task<IActionResult> GetPostByUser([FromQuery] string userId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new PostByUser.Query { UserId = userId }, cancellationToken));
        }
    }
}