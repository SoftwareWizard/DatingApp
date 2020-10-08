﻿using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

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
        }
    }
}