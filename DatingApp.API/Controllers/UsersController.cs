using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Extensions;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUserRepository _repository;

        public UsersController(IUserRepository repository, IMapper mapper, IPhotoService photoService)
        {
            _repository = repository;
            _mapper = mapper;
            _photoService = photoService;
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

        [HttpGet("profile/{username}", Name = "GetUser")]
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
            var idAsString = User.GetUserId();
            var hasErrors = !int.TryParse(idAsString, out var id);

            if (hasErrors) return BadRequest("Failed to update");

            var user = await _repository.GetUserById(id);
            _mapper.Map(dto, user);
            _repository.Update(user);

            hasErrors = !await _repository.SaveAllAsync();

            if (hasErrors) return BadRequest("Failed to update");

            return NoContent();
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var username = User.GetUsername();
            var user = await _repository.GetUserByUsernameAsync(username);
            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                UserId = user.Id
            };

            if (user.Photos.Count == 0) photo.IsMain = true;

            user.Photos.Add(photo);

            var hasErrors = !await _repository.SaveAllAsync();

            if (hasErrors) return BadRequest("Photo could not be stored");

            var photoDto = _mapper.Map<PhotoDto>(photo);
            return CreatedAtRoute("GetUser", new {user.Username}, photoDto);
        }
    }
}