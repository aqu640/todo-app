
#FROM nginx
#COPY index.html /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY  . /usr/share/nginx/html
#COPY  build /usr/share/nginx/html
       

# 使用 Node 作為第一個階段建立應用程式
# 使用Node作为基础镜像
FROM node:latest as build
# 设置工作目录
WORKDIR /app
# 复制package.json和package-lock.json文件
COPY package*.json ./
# 安装依赖
RUN npm install
#将React应用的源代码复制到工作目录
COPY . .
# 构建React应用
RUN npm run build
# 使用nginx作为基础镜像
FROM nginx:latest
# 将React应用的构建文件复制到Nginx的默认静态文件目录
COPY --from=build/app/build /usr/share/nginx/html
# 在容器中暴露Nginx的默认端口
EXPOSE 80
# 启动Nginx服务器
CMD["nginx","-g","daemon off;"]



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