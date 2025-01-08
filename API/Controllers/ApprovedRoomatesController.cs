using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ApprovedRequests;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ApprovedRoomatesController : BaseApiController
    {
        [HttpGet("post-by-user")]
        public async Task<IActionResult> GetPostByUser([FromQuery] string userId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new PostByUser.Query { UserId = userId }, cancellationToken));
        }
        [HttpGet("is-user-approved")]
        public async Task<ActionResult<bool>> IsUserApproved([FromQuery] string userId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new IsUserApproved.Query { UserId = userId }, cancellationToken));
        }
        [HttpGet("approved-users-for-post")]
        public async Task<ActionResult<List<User>>> UsersForPost([FromQuery] Guid postId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new ListApprovedUsersByPost.Query { PostId = postId }, cancellationToken));
        }
    }
}