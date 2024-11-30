using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(User user)
        {
            //1. Specifcy the claims about the user  
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };
            //2. Set the key and how it will be encrypted with the credentials
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("doleiwgifjzxxwgddkofoburhndhhmlnimgptrrigyybskblepnfvxttsovmsxqjkciixdcrmeyebhimepsgbcnjiitzfboerejieecouwjseomchzhmdouysgromgrmxqntbbiudishyieeijkabyeaaujdeepzrazxslsboftlxwfvewvdbjdcqtytiakorlgcnfhtvlmkckkvnhkswjnhamvucjhjrqlfzbuaxpdggqxlxkqdhlklytiqpxvj"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //3. Construct the properties of the key
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = credentials
            };

            //4. Initialize the token handler which serves the functionality of he token
            var tokenHandler = new JwtSecurityTokenHandler();

            //5, Create the token using the above descriptions
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}