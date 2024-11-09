# Use Node.js to build the Angular app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Copy the rest of the app and build
COPY . .
RUN npm run build --prod

# Use Nginx to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/url-shortner/browser /usr/share/nginx/html

# Expose a different port (8080 instead of 80)
EXPOSE 80
