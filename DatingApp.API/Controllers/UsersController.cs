using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

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

            if (user == null) return NotFound();

            return Ok(userDto);
        }

        [HttpGet("profile/{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _repository.GetUserByUsernameAsync(username);
            var userDto = _mapper.Map<MemberDto>(user);

            if (user == null) return NotFound();

            return Ok(userDto);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto dto)
        {
            var idAsString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var hasErrors = !int.TryParse(idAsString, out var id);

            if (hasErrors)
            {
                return BadRequest("Failed to update");
            }

            var user = await _repository.GetUserById(id);
            _mapper.Map(dto, user);
            _repository.Update(user);
            
            hasErrors = !await _repository.SaveAllAsync();

            if (hasErrors)
            {
                return BadRequest("Failed to update");
            }

            return NoContent();
        }
    }
}