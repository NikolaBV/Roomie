using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services
                .AddIdentityCore<User>(options =>
                {
                    options.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<DataContext>(); //Allows us to query our users in the EF store

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    "doleiwgifjzxxwgddkofoburhndhhmlnimgptrrigyybskblepnfvxttsovmsxqjkciixdcrmeyebhimepsgbcnjiitzfboerejieecouwjseomchzhmdouysgromgrmxqntbbiudishyieeijkabyeaaujdeepzrazxslsboftlxwfvewvdbjdcqtytiakorlgcnfhtvlmkckkvnhkswjnhamvucjhjrqlfzbuaxpdggqxlxkqdhlklytiqpxvj"
                )
            );

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        //We amke sure the token is signed by the API server that issued it
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });
            //This service is scoped to each HTTP request - Every time a request is made a new token service will be created
            services.AddScoped<TokenService>();
            return services;
        }
    }
}
