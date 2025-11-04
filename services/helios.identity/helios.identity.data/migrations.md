dotnet ef migrations add "<migration_name>" -s .\helios.identity.api -p .\helios.identity.data -c IdentityContext -o Migrations -- --environment Development
dotnet ef database update -s .\helios.identity.api -p .\helios.identity.data -c IdentityContext -- --environment Development
dotnet ef database update 0 -s .\helios.identity.api -p .\helios.identity.data -c IdentityContext -- --environment Development
dotnet ef migrations list -s .\helios.identity.api -p .\helios.identity.data -c IdentityContext -- --environment Development
dotnet ef migrations remove -s .\helios.identity.api -p .\helios.identity.data -c IdentityContext -- --environment Development


