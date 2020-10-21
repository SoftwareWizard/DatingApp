using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public AdminController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
            .Include(item => item.UserRoles)
            .ThenInclude(item => item.Role)
            .OrderBy(item => item.UserName)
            .Select(item => new
            {
                item.Id,
                UserName = item.UserName,
                Roles = item.UserRoles.Select(r => r.Role.Name).ToList()
            }).ToListAsync();

            return Ok(users);
        }

        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);
            var userRoles = await _userManager.GetRolesAsync(user);
            var newRoles = selectedRoles.Except(userRoles);
            var result = await _userManager.AddToRolesAsync(user, newRoles);

            if (!result.Succeeded)
            {
                return BadRequest("Could not store new Role");
            }

            var removeRoles = userRoles.Except(selectedRoles);
            result = await _userManager.RemoveFromRolesAsync(user, removeRoles);

            if (!result.Succeeded)
            {
                return BadRequest("Could not remove from roles");
            }

            var currentRoles = _userManager.GetRolesAsync(user);
            return Ok(currentRoles);
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