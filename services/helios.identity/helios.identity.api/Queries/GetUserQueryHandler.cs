using AutoMapper;
using helios.identity.api.Models;
using helios.identity.data;
using helios.identity.models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace helios.identity.api.Queries {
    public class GetUserQuery : IRequest<IdentityResponse<UserViewModel>> { public required Guid UserId { get; set; } }

    namespace Handlers {
        public class GetUserQueryHandler : IRequestHandler<GetUserQuery, IdentityResponse<UserViewModel>> {
            private readonly IdentityContext _context;
            private readonly IMapper _mapper;

            public GetUserQueryHandler(IdentityContext context, IMapper mapper) {
                _context = context;
                _mapper = mapper;
            }

            public async Task<IdentityResponse<UserViewModel>> Handle(GetUserQuery request, CancellationToken cancellationToken) {
                var user = await _context.Users
                    .Include(u => u.Logins)
                    .FirstOrDefaultAsync(u => u.Id == request.UserId);

                if (user is null) return IdentityResponse<UserViewModel>.NotFound("User not found");

                var userModel = _mapper.Map<UserViewModel>(user);
                return IdentityResponse<UserViewModel>.Success(userModel);
            }
        }
    }
}