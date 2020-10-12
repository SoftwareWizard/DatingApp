using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Internal;
using DatingApp.API.Dtos;
using DatingApp.API.Extensions;
using DatingApp.API.Helpers;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [ServiceFilter(typeof(LogUserActivity))]
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
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var username = User.GetUsername();
            userParams.CurrentUsername = username;

            if (string.IsNullOrEmpty(userParams.Gender))
            {
                var user = await _repository.GetUserByUsernameAsync(username);
                userParams.Gender = user.Gender == "male" ? "female" : "male";
            }

            var userDtos = await _repository.GetUsersAsync(userParams);

            Response.AddPaginationHeader(
                userDtos.CurrentPage, userDtos.PageSize,
                userDtos.TotalCount, userDtos.TotalPages);

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
            var userId = User.GetUserId();

            var user = await _repository.GetUserById(userId);
            _mapper.Map(dto, user);
            _repository.Update(user);

           var hasErrors = !await _repository.SaveAllAsync();

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

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var username = User.GetUsername();
            var user = await _repository.GetUserByUsernameAsync(username);

            var photos = user.Photos;
            photos.ForAll(item => item.IsMain = false);
            var mainPhoto = photos.FirstOrDefault(item => item.Id == photoId);

            if (mainPhoto == null) return BadRequest("Photo not available");

            mainPhoto.IsMain = true;

            await _repository.SaveAllAsync();
            return Ok();
        }

        [HttpDelete("photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var username = User.GetUsername();
            var user = await _repository.GetUserByUsernameAsync(username);
            var photo = user.Photos.FirstOrDefault(item => item.Id == photoId);

            if (photo == null) return BadRequest("Photo not available");

            var result = await _photoService.DeletePhotoAsync(photo.PublicId);

            if (result.Error != null) return BadRequest("Could not delete Photo");

            _repository.DeletePhoto(user, photo);
            await _repository.SaveAllAsync();
            return Ok();
        }
    }
}