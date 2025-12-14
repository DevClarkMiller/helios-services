dotnet ef migrations add "<migration_name>" -s .\helios.email.api -p .\helios.email.data -c IdentityContext -o Migrations -- --environment Development
dotnet ef database update -s .\helios.email.api -p .\helios.email.data -c IdentityContext -- --environment Development
dotnet ef database update 0 -s .\helios.email.api -p .\helios.email.data -c IdentityContext -- --environment Development
dotnet ef migrations list -s .\helios.email.api -p .\helios.email.data -c IdentityContext -- --environment Development
dotnet ef migrations remove -s .\helios.email.api -p .\helios.email.data -c IdentityContext -- --environment Development