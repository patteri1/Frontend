# Stage 1: Build Stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine AS production-stage
COPY nginx.conf /etc/nginx/nginx.conf 
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
