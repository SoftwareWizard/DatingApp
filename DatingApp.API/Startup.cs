using System.Text;
using System.Threading.Tasks;
using API.SignalR;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using DatingApp.API.Interfaces;
using DatingApp.API.Middleware;
using DatingApp.API.Models;
using DatingApp.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SignalR;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var cloudinarySettingsSection = Configuration.GetSection("CloudinarySettings");

            services.AddDbContext<DataContext>(optionsBuilder => optionsBuilder.UseSqlServer(connectionString));
            services.Configure<CloudinarySettings>(cloudinarySettingsSection);
            services.AddSingleton<PresenceTracker>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<ILikesRepository, LikesRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddControllers();
            services.AddAutoMapper(config => config.AddProfile(typeof(AutoMapperProfiles)));
            services.AddCors();
            services.AddSignalR();

            services.AddIdentityCore<AppUser>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
            })
            .AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddRoleValidator<RoleValidator<AppRole>>()
            .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication((JwtBearerDefaults.AuthenticationScheme))
                .AddJwtBearer(options =>
                {
                    var secret = Configuration.GetSection("AppSettings:Token").Value;
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                options.AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseRouting();

            app.UseCors(x => x
                .WithOrigins(new string[] {"http://localhost:4200"})
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PresenceHub>("hubs/presence");
            });
        }
    }
}
