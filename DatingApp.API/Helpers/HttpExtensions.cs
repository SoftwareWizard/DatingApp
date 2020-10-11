using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class HttpExtensions
    {
        private const string HEADER_KEY_PAGINATION = "Pagination";
        private const string HEADER_KEY_ACCESS_CONTROL_EXPOSE_HEADERS = "Access-Control-Expose-Headers";

        public static void AddPaginationHeader(
            this HttpResponse response,
            int currentPage,
            int itemsPerPage,
            int totalItems,
            int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            response.Headers.Add(HEADER_KEY_PAGINATION, JsonSerializer.Serialize(paginationHeader, options));
            response.Headers.Add(HEADER_KEY_ACCESS_CONTROL_EXPOSE_HEADERS, HEADER_KEY_PAGINATION);
        }
    }
}