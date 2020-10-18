using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Dtos;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, MemberDto>()
                .ForMember(dest => dest.PhotoUrl,
                    expression => expression.MapFrom(
                        item => item.Photos
                            .SingleOrDefault(photo => photo.IsMain)
                            .Url));

            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserLike, UserLikeDto>();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl,
                    expression => expression.MapFrom(
                        item => item.Sender.Photos
                            .SingleOrDefault(photo => photo.IsMain)
                            .Url))
                .ForMember(dest => dest.RecipientPhotoUrl,
                    expression => expression.MapFrom(
                        item => item.Recipient.Photos
                            .SingleOrDefault(photo => photo.IsMain)
                            .Url));
        }
    }
}