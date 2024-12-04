using API.DTOs;
using API.Models;
using Application.RoomateRequests;
using Domain;
using Domain.Enums;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RoomateRequestsController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> Create(RoomateRequestCreateModel model, CancellationToken cancellationToken)
        {
            var roomateRequest = new RoomateRequest
            {
                UserId = model.UserID,
                PostId = model.PostId,
                CreatedAt = DateTime.UtcNow,
                Status = Domain.Enums.RequestStatus.Pending
            };

            return HandleResult(await Mediator.Send(new Create.Command { RoomateRequest = roomateRequest }, cancellationToken));
        }
        [HttpGet("get-requests-for-post")]
        public async Task<IActionResult> GetRequestsForPost([FromQuery] Guid postId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new GetRequestsForPost.Query { PostId = postId }, cancellationToken));
        }
        [HttpGet("get-requests-for-user")]
        public async Task<IActionResult> GetRequestsForUser([FromQuery] string userId, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new GetRequestsForUser.Query { UserId = userId }, cancellationToken));
        }
        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateRequestStatusDTO model, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new UpdateStatus.Command { RequestId = model.RequestId, NewStatus = model.NewStatus }, cancellationToken));
        }
    }
}
