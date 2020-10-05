using System;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // TODO: validate request
            var username = userForRegisterDto.Username.ToLower();
            var password = userForRegisterDto.Password;

            var isUserAvailable = await _authRepository.UserExists(username);

            if (isUserAvailable)
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User
            {
                Username = username
            };

            var createdUser = await _authRepository.Register(userToCreate, password);
            return Created("url", null);
        }
    }
}
