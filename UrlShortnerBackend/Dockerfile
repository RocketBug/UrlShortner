# Use the .NET SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy and restore dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the entire project and build
COPY . .
RUN dotnet publish -c Release -o /app

# Use the .NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Expose the API port
EXPOSE 8080

# Start the application
ENTRYPOINT ["dotnet", "UrlShortnerBackend.dll"]