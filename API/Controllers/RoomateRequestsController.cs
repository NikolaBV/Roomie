using API.Models;
using Application.RoomateRequests;
using Domain;
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
    }
}
