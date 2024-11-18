# Use Node.js to build the Angular app
FROM node:18 AS build

# Install Angular CLI globally
RUN npm install -g @angular/cli@18.0.0

WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app for production
RUN ng build --configuration=production

# Use Nginx to serve the Angular app
FROM nginx:alpine
COPY --from=build /app/dist/url-shortner/browser /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose a different port (8080 instead of 80)
EXPOSE 80
