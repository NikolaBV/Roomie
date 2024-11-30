using Application.Posts;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPosts(CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new List.Query(), cancellationToken));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(Guid id, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }, cancellationToken));
        }

        //As we are not returning anything, use IActionResult instead of ActionResult<T>
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(Post Post, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Post = Post }, cancellationToken));
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Post Post, CancellationToken cancellationToken)
        {
            Post.Id = id;
            await Mediator.Send(new Edit.Command { Post = Post }, cancellationToken);
            return Ok();
        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }, cancellationToken));
        }
    }
}