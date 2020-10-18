using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Extensions;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly ILikesRepository _likesRepository;
        private readonly IUserRepository _userRepository;

        public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
        {
            _userRepository = userRepository;
            _likesRepository = likesRepository;
        }

        [HttpPut("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null)
            {
                return NotFound();
            }

            if (sourceUser.Username == username)
            {
                return BadRequest("You cannot like yourself");
            }

            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null)
            {
                return BadRequest("You already liked this user");
            }

            userLike = new UserLike()
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);
            await _userRepository.SaveAllAsync();
            return Ok();
        }

        [HttpDelete("{username}")]
        public async Task<ActionResult> RemoveLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null)
            {
                return NotFound();
            }

            if (sourceUser.Username == username)
            {
                return BadRequest("You cannot dislike yourself");
            }

            var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike == null)
            {
                return BadRequest("You already disliked this user");
            }

            sourceUser.LikedUsers.Remove(userLike);
            await _userRepository.SaveAllAsync();
            return Ok();
        }

        [HttpPut("ids/{id}")]
        public async Task<ActionResult> AddLike(int id)
        {
            var sourceUserId = User.GetUserId();
            await _likesRepository.AddUserLike(sourceUserId, id);
            var userLikes = await _likesRepository.GetUserLikes(sourceUserId);
            return Ok(userLikes);
        }

        [HttpDelete("ids/{id}")]
        public async Task<ActionResult> RemoveLike(int id)
        {
            var sourceUserId = User.GetUserId();
            await _likesRepository.RemoveUserLike(sourceUserId, id);
            var userLikes = await _likesRepository.GetUserLikes(sourceUserId);
            return Ok(userLikes);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] string predicate)
        {
            var sourceUserId = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(predicate, sourceUserId);
            return Ok(users);
        }

        [HttpGet("ids")]
        public async Task<ActionResult<IEnumerable<UserLikeDto>>> GetUserLikeIds()
        {
            var userId = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(userId);
            return Ok(users);
        }
    }
}