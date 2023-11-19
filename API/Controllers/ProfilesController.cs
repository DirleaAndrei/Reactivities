using Application.Events;
using Application.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(ProfileDto profileDto)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { ProfileDto = profileDto }));
        }

        [HttpGet("{username}/{predicate}")]
        public async Task<IActionResult> GetEvents([FromRoute] string username, [FromQuery] string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
        }

    }
}
