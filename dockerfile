# Stage 1 — build. Installs all deps and compiles the Vite SPA to dist/.
FROM node:22-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 — runtime. Serve the static dist/ with nginx.
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
