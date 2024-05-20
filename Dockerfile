
#FROM nginx
#COPY index.html /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY  . /usr/share/nginx/html
#COPY  build /usr/share/nginx/html
       

# 使用 Node 作為第一個階段建立應用程式
FROM node:20.11-alpine as build

WORKDIR /app
COPY . /app

RUN npm install              
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
#FROM node:20.11-alpine as build
#WORKDIR /app
#COPY . /app
#RUN npm install
#RUN npm run build


# 使用 Nginx 作為第二個階段伺服靜態檔案
#FROM nginx:alpine
#COPY --from=build  /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx","-g","daemon off;"]



# 使用 Node 作為第一個階段建立應用程式
#FROM node :18-alpine
#WORKDIR /app
#COPY package.json .
#RUN npm install 
#COPY . .
#RUN npm run build


# 使用 Nginx 作為第二個階段伺服靜態檔案
#FROM nginx
#COPY --from=builder /app/build /usr/share/nginx/html
#COPY . .
#EXPOSE 8080
#CMD ["nginx","-g","daemon off;"]