using System.Security.Claims;

namespace DatingApp.API.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUsername(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            var userIdAsString = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0";
            return int.Parse(userIdAsString);
        }
    }
}
