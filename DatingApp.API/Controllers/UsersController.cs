using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private IMapper _mapper;

        public UsersController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _repository.GetUsersAsync();
            var userDtos = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var user = await _repository.GetUserById(id);
            var userDto = _mapper.Map<MemberDto>(user);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }

        [HttpGet("profile/{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _repository.GetUserByUsernameAsync(username);
            var userDto = _mapper.Map<MemberDto>(user);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(userDto);
        }
    }
}
