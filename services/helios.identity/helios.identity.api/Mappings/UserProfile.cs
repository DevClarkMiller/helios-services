using AutoMapper;
using helios.identity.data;
using helios.identity.models;

namespace helios.identity.api.Mappings {
    public class UserProfile : Profile {
        public UserProfile() {
            CreateMap<User, UserViewModel>();
            CreateMap<UserLogin, UserLoginViewModel>();
            CreateMap<Provider, ProviderViewModel>();
        }
    }
}
