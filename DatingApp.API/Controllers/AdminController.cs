using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    public class AdminController : ControllerBase
    {
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with_roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            await Task.Yield();
            return Ok("Only Admins can see this");
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public async Task<ActionResult> GetPhotosForModeration()
        {
            await Task.Yield();
            return Ok("Only Moderator can see this");
        }
    }
}