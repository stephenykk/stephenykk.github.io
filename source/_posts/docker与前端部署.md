---
title: docker与前端部署
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-11-28 20:00:11
tags: 
  - docker
  - frontend
---

> 转载自: [https://juejin.cn/post/7551268250888749090](https://juejin.cn/post/7551268250888749090)

## 需求开发场景

在说docker之前，我们先来看看一般的需求开发和部署场景，是否需要安装node

### 需求开发部署场景

_开发环境，我们使用windows或mac，开发前端项目，正常来说，都是要安装好对应[node版本](https://nodejs.cn/download/ "https://nodejs.cn/download/") ，使用node提供的npm包管理（构建）工具【除非是一个简单的只有hello world的html文件不用node】_

_生产环境，要发布到服务器上_

-   **1\. 静态SPA单页面应用部署**
-   服务器上不需要安装nodejs，使用使用nginx代理一下请求即可
-   就算是多个单页面项目，我们在本地开发使用nvm管理一下node版本（比如有node12的老项目，也有node24的新项目）
-   打包的dist，丢到服务器上后，依旧不需要在在服务器上安装node

* * *

-   **2\. SSR服务端渲染部署**
-   除了静态SPA以外，我们也可能也要去写SSR应用
-   SSR实际上就是通过nodejs运行环境，在服务器上执行js代码
-   比如解析路由、发请求拿后端数据、拼接生成html返回给前端的浏览器请求
-   因此，SSR服务端渲染的生产环境的部署，服务器上，必须安装nodejs（当然，也要使用到nginx代理请求）
-   如果，某个服务器上，只是部署一个SSR项目还好，我们只需要安装对应的node版本
-   但是，如果有两个甚至多个SSR项目，且对应的node版本不一致（如需要node12和node24版本）
-   那么，我们就需要在服务器上，安装nvm进行node版本的管理，不同的node版本前端项目，使用nvm切换到对应的node版本，然后，npm start跑起来项目【可使用pm2管理多进程】

* * *

-   **3\. BFF中间层部署**
-   BFF中间层，相当于一个服务层（中间层）
-   就是，把后端的 “通用接口” 转化为前端的 “专属接口”
-   比如，使用Express/Koa启一个服务（依赖node）（当然，也要使用到nginx代理请求）
-   流程：用户 → 前端应用（PC/移动端/小程序） → BFF 中间层 → 后端服务 → 去数据库捞数据
-   同样的，这个情况，和上述一样
-   安装nvm进行node版本的管理，不同的BFF中间层，要切换对应node才能跑起来【可使用pm2管理多进程】

### Web前端常见的三种部署方式

1.  对于Vue或React的单页面应用，打包的dist静态资源，再搭配nginx
2.  对于ssr（服务器渲染）或者bff（接口中间层），使用nvm管理node版本，同时使用pm2统一管理，再搭配nginx
3.  使用docker镜像技术，一次构建，到处运行（最灵活的方式），基本上适合所有的前端部署方式。（辅以nginx）

接下来，说说docker镜像部署的好处

### docker镜像部署前端项目的好处

**1\. 彻底解决环境一致性，不用再使用nvm做node版本切换**

_初学者，可以把docker容器镜像理解成：一个依赖宿主机的、封闭的、‘微型’服务器的内存运行环境空间吗（非虚拟机那么冗余、且凭借宿主机的操作系统内核可在此内存运行环境空间跑服务程序）_

-   假设多个ssr或者bff且node版本依赖不同的项目，有几个，就打包几个镜像
-   可以对应依赖的node版本等打包到镜像里面（当然nginx也可以选择连带着打包到镜像里面）
-   镜像与镜像之间是独立的，虽然node依赖版本不一样，但是ssr的服务不会和bff的服务产生冲突
-   不用再想以前那样，还得额外注意node版本的切换管理
-   收益，比较明显！！！

**2\. 实现 “一次构建，各个服务器环境上都能直接运行”**

无论是Linux还是Windows服务器，都能运行打包好的镜像（可移植性强）

-   假设，有一天，原来的生产服务器爆炸了、死机了、因不可抗力直接挂了。
-   老板赶紧买了一台新的服务器，让把原来生产的前端项目，移植到新的服务器上，越快越好。
-   传统情况就是，在新的服务器上装各个版本的node，安装nvm，再打包使用pm2管理部署（耗时，约为一个小时）
-   但是，如果是使用docker，直接把原本的镜像，复制粘贴到新服务器上即可（耗时约10分钟）
-   收益，十分明显！！！

**3\. docker版本管理与回滚更简单方便安全**

-   假设新项目上线后发现bug，需紧急切回上一版本
-   若是传统项目部署方式，需要本地git回滚，再重新打包，再发布到服务器上（耗时5分钟）
-   若是docker镜像部署方式，直接使用其自带的版本标签tag管理
-   每个版本的项目对应一个镜像标签（如 `v1.0.0`、`v1.0.1`），标签与代码版本一一对应，可追溯回滚
-   回滚时，只需停止当前容器，用旧版本标签的镜像重新启动容器（如 `docker run my-app:v1.0.0`）
-   整个过程秒级完成，且不会影响当前文件（容器销毁后文件自动清理），安全可靠（耗时1分钟）
-   收益，十分明显！！！

**4\. docker部署流程标准化、自动化**

-   传统前端部署流程通常是
-   本地打包 → 用winscp等工具传文件到服务器 → 然后手动配置ngixn或者手动启动node服务
-   步骤繁琐且依赖人工操作，有一定概率手抖了，人工操作出问题（虽然概率不大，但也是一个隐患，假设概率千分之一）
-   如果使用docker搭配cicd持续集成工具可以将部署流程自动化
-   实现 代码在gitlab提交后 → 点一点，就能够自动构建镜像 → 然后自动推送到镜像仓库 → 最后服务器自动拉取镜像并重启容器
-   全程无需人工干预，基本不会出问题（假设出问题概率百万分之一）
-   节省人工操作时间、隐患概率大大降低
-   收益，十分明显！！！

> 如果只是简单的spa单页面应用的部署，且暂时没有cicd工具的公司项目，也可以自己搞一个效能工具，类似于cicd的自动化发布脚本，参考笔者的这篇文章：[juejin.cn/post/733054…](https://juejin.cn/post/7330549231935766563 "https://juejin.cn/post/7330549231935766563")

> 实际上，因为前端部署项目的依赖比较少，主要是可能依赖node环境，如果是后端部署项目，那依赖的就多了，使用docker技术的优势，能够进一步加大的明显体现出来

## 记录docker部署一个简单的单页面spa前端项目

### 提前启动电脑的虚拟化、并下载安装 Docker Desktop、并启用 WSL 2

首先，windows电脑的虚拟化要开启的，如下图

按下`Ctrl + Shift + Esc` 打开任务管理器、然后选择 `性能` 标签

![111.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9d15b3a8dfea4a0388fcc2479d7619a6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rC05YaX5rC05a2a:q75.awebp?rk3s=f64ab15b&x-expires=1764563474&x-signature=JZegcLmbCYLOm5e%2BzfcXTQjC8jg%3D)

然后，打开 powershell 执行 `wsl --list --online`，查看可安装的linux发行版，初始条件下，肯定是没安装的，然后执行 `wsl --install` 自动安装默认linux发行版（笔者用的是Ubuntu）

再然后，就是安装完成后重启电脑，使 WSL2 生效

最后，访问 [Docker 官网](https://www.docker.com/products/docker-desktop "https://www.docker.com/products/docker-desktop") 下载适用于 Windows或者MAC 的安装包，这样docker的前置准备工作，就做好了

> 本文不做安装的赘述，可以另行查阅文章，实践安装（若是网络不行，就使用小梯子吧）

### 单页面应用的docker打包

-   假设，笔者有一个vue或者react项目
-   这个项目最终，打包成了一个html文件，如下：

```auto
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>每天学点新知识——docker</h1>
</body>
</html>
```

### 编写Dockerfile文件

-   想要使用docker打包镜像，就得告诉docker，这个镜像要打包那些东西
-   本案例中，是打包一个单纯的html文件
-   同时，还要告诉docker，有哪些依赖也需要连带着打包进去
-   本案例中，打包单纯的html文件不太够用
-   还需要搭配nginx（把nginx也打包进镜像中去）
-   没办法，单纯的静态文件，没法自己提供网页服务，必须搭配一个 “服务器软件”
-   这样打包出来的镜像，就像一个 “自带服务器的小盒子”，不管放到哪台装了 Docker 的服务器上的机器上，都能直接跑起来

本案例的Dockerfile文件的编写很简单，就四行

-   `FROM nginx:alpine`
-   `COPY index.html /usr/share/nginx/html/`
-   `EXPOSE 80`
-   `CMD ["nginx", "-g", "daemon off;"]`

注释，释义如下

```auto
# 默认从 Docker Hub上下载基于Alpine Linux的轻量级版本的nginx，当执行docker打包镜像命令后，流程是：
# 自己windows电脑的命令行会触发Docker Desktop依据 WSL2 Linux内核从而下载nginx:alpine到WSL2文件系统
# 自己的nginx:alpine会下载到C:\Users\lss13\AppData\Local\Docker\wsl\disk文件夹中
# 有一个docker_data.vhdx硬盘映像文件
# 文件很大，类似压缩包，包含很多东西，其中就有下载的nginx:alpine镜像，也有构建出的新镜像和以往构建的老镜像
FROM nginx:alpine

# 将当前目录下的HTML文件复制到镜像中的/usr/share/nginx/html/目录
# 镜像最终存储在docker_data.vhdx虚拟磁盘中
# /usr/share/nginx/html/这个文件夹路径，是nginx用来默认存放静态资源的路径（规定，不用去修改）
# 至此，镜像文件中，已经包含了nginx的一堆东西和html，当然还有别的docker的一堆东西
COPY index.html /usr/share/nginx/html/

# EXPOSE不会实际开放端口，单纯的语法，不写也行（NGINX默认就是80端口）
EXPOSE 80

# 启动nginx  -g是全局配置命令  daemon off关闭后台运行模式
# （能够确保 nginx 前台运行，避免容器启动后立即退出）
# 这个cmd指令，会被存放在镜像文件中，当镜像被丢到服务器上后
# 当在服务器上执行docker run这个镜像的时候，才会进一步触发镜像里面的这个cmd命令执行
# 才会让镜像中的nginx启动起来，有这样的web服务，才能访问到镜像里面的html文件
CMD ["nginx", "-g", "daemon off;"]
```

### 编写打包构建镜像的js脚本

构建镜像，就一个核心的命令：`docker build -t ${IMAGE_NAME} .`

-   `docker build`：Docker 的构建命令，告诉 Docker “我要根据 Dockerfile文件里面的内容去构建镜像了”。
-   `-t ${IMAGE_NAME}`：给镜像 “贴标签”（指定名称），比如 `-t my-nginx` 就会把镜像命名为 `my-nginx`（`${IMAGE_NAME}` 通常是一个变量，实际使用时会替换成具体名称，比如 `my-webapp:v1`）。
-   `.`：指定 Dockerfile 所在的路径（`.` 表示 “当前目录”），Docker 会从这个目录找 `Dockerfile` 文件，并读取里面的构建步骤。

> 当然，现在的我的 html 和 Dockerfile 和 要准备编写的 打包构建镜像的js脚本 在同一个文件夹里面（同级目录）

主要的核心，就是使用node的child\_process的execSync，在命令行执行docker命令：

```auto
const { execSync } = require('child_process'); // 引入同步执行命令模块

const IMAGE_NAME = 'my-html-app'; // 给镜像起个名字

execSync(`docker build -t ${IMAGE_NAME} .`, { stdio: 'inherit' }); // 派发命令执行打包构建镜像
```

完整`export-image.js`脚本如下：

```auto
const { execSync } = require('child_process'); // 引入同步执行命令模块
const fs = require('fs'); // 引入文件系统模块

console.log('📦 开始构建和导出Docker镜像...');

// 配置变量
const IMAGE_NAME = 'my-html-app';
const TAR_FILE = `${IMAGE_NAME}.tar`;

try {
    // 检查Dockerfile是否存在
    if (!fs.existsSync('./Dockerfile')) {
        console.error('❌ 找不到Dockerfile文件');
        process.exit(1);
    }

    // 检查index.html是否存在
    if (!fs.existsSync('./index.html')) {
        console.error('❌ 找不到index.html文件');
        process.exit(1);
    }

    console.log('🔨 正在构建Docker镜像...');
    
    // 构建Docker镜像
    execSync(`docker build -t ${IMAGE_NAME} .`, { stdio: 'inherit' });
    
    console.log('\n✅ 镜像构建成功，开始导出镜像...');
    
    // 删除旧的tar文件（如果存在）
    if (fs.existsSync(TAR_FILE)) {
        fs.unlinkSync(TAR_FILE);
        console.log('🗑️  已删除旧的镜像文件');
    }
    
    // 导出镜像
    execSync(`docker save -o ${TAR_FILE} ${IMAGE_NAME}:latest`, { stdio: 'inherit' });
    
    // 检查文件是否成功创建
    if (fs.existsSync(TAR_FILE)) {
        const stats = fs.statSync(TAR_FILE);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log('\n✅ 镜像导出成功！');
        console.log(`📁 导出文件: ${TAR_FILE} 文件大小: ${fileSizeMB} MB`);
        console.log('\n📋 接下来：');
        console.log('1. 复制 my-html-app.tar 和 deploy-to-server.sh 到Ubuntu');
        console.log('2. 在Ubuntu上运行: ./deploy-to-server.sh');
        
    } else {
        console.error('❌ 镜像导出失败');
        process.exit(1);
    }
    
} catch (error) {
    console.error('\n❌ 操作失败：');
    console.error(error.message);
    process.exit(1);
}
```

-   我们可以在命令行中，执行这个脚本，比如：`node export-image.js`
-   也可以，写一个bat脚本，这样也行，直接`./build.bat`回车

_build.bat_

```auto
@echo off
echo Let's start building Docker images...
node export-image.js
```

### 执行构建脚本

![PixPin_2025-09-18_22-00-25.gif](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a2fdc476b54e424da51b148cf37bfabb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rC05YaX5rC05a2a:q75.awebp?rk3s=f64ab15b&x-expires=1764563474&x-signature=VnTd0oHQ0sLgd%2FqhLPhvFOr6oJY%3D)

构建出来的镜像产物

![333.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/df73099545ca4338aab7cf129decda5b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rC05YaX5rC05a2a:q75.awebp?rk3s=f64ab15b&x-expires=1764563474&x-signature=b%2B6TOiuvwSbY90cvP7jfWLtMNrA%3D)

### 编写服务器发布镜像的shell脚本

逻辑很简单，就是把当前服务器上的，原来的容器镜像删除掉（如果有的话），然后，在执行`docker run -d -p $PORT:80 --name $CONTAINER_NAME $IMAGE_NAME:latest` 命令

上述命令释义：

-   docker run（Docker 启动容器的核心命令）
-   \-d （后台运行模式detach 的缩写）
-   \-p $PORT:80
    -   \-p是端口映射publish的缩写
    -   $PORT 是笔者自己的服务器（宿主机）端口，我这里用20000端口，外部通过这个端口访问容器；
    -   80 是容器内部的端口（Nginx 默认监听 80 端口）
    -   意思是：把我服务器（宿主机）上的20000端口，和容器的80端口连起来，外部访问我服务器上的20000端口，就会被转到这个docker容器镜像的80端口，也就会访问到镜像里面的nginx，也就能够访问到镜像里面的对应目录`/usr/share/nginx/html/`中的index.html文件（就能看到对应内容了）

当然了 服务器不随便开放端口，这个20000端口，我不会开放，我只会使用我服务器上nginx，进行请求的转发到20000端口，如下 nginx 配置

```auto
# docker的demo
location /dockerDemo/ {
    proxy_pass http://localhost:20000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

_部署脚本如下：_

```auto
#!/bin/bash

echo "🚀 开始部署Docker镜像到服务器..."

# 配置变量（镜像名称在构建时指定，容器名称在运行时指定）
CONTAINER_NAME="html-app-container"
IMAGE_NAME="my-html-app"
TAR_FILE="${IMAGE_NAME}.tar"
PORT="20000"

# 检查tar文件是否存在
if [ ! -f "$TAR_FILE" ]; then
    echo "❌ 找不到镜像文件: $TAR_FILE"
    echo "请确保已将镜像文件复制到当前目录"
    exit 1
fi

echo "📁 找到镜像文件: $TAR_FILE"

# 停止并删除现有容器（如果存在）
echo "🛑 停止并删除现有容器..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 删除现有镜像（如果存在）
echo "🗑️  删除现有镜像..."
docker rmi $IMAGE_NAME:latest 2>/dev/null || true

# 导入镜像
echo "📥 导入Docker镜像..."
docker load -i $TAR_FILE

# 运行容器
echo "🚀 启动新容器..."
docker run -d -p $PORT:80 --name $CONTAINER_NAME $IMAGE_NAME:latest

# 检查容器状态
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo "📊 容器状态:"
    docker ps | grep $CONTAINER_NAME
    echo ""
    echo "🌐 访问地址:"
    echo "   直接访问: http://localhost:$PORT"
    echo "   通过nginx代理: https://ashuai.site/dockerDemo/"
    echo ""
    echo "📋 有用的命令:"
    echo "   查看日志: docker logs $CONTAINER_NAME"
    echo "   停止容器: docker stop $CONTAINER_NAME"
    echo "   重启容器: docker restart $CONTAINER_NAME"
else
    echo "❌ 容器启动失败"
    exit 1
fi
```

### 最后一步，在服务器上，部署构建好的镜像

把镜像文件和构建脚本都丢到服务器上，在对应文件夹中，执行部署脚本，如下图：

![444.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/89dea7b5269b46029ea2e3f4a3e9fd8b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rC05YaX5rC05a2a:q75.awebp?rk3s=f64ab15b&x-expires=1764563474&x-signature=UlNH%2BKN2izkHRMHej2cRe6b%2FGgg%3D)

-   这样，我们的构建好了的，镜像，就成功部署了
-   由于笔者是通过nginx代理的
-   所以，访问：[ashuai.site/dockerDemo/](https://ashuai.site/dockerDemo/ "https://ashuai.site/dockerDemo/")
-   就可以 看到对应的内容了

![555.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1be6cf90036e400a911261e379cc6e9a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5rC05YaX5rC05a2a:q75.awebp?rk3s=f64ab15b&x-expires=1764563474&x-signature=PvRPKh6dJllgj75tZM5jWSPaRnA%3D)

### docker-compose的应用场景——统一编排管理多个镜像服务

-   比如我现在有一个项目，其中包括了，前端、后端、数据库、缓存层
-   对应的我要在本地电脑上，打包构建四个镜像，分别是nginx.tar、mysql.tar、java-app.tar、redis.tar
-   然后把这四个镜像上传到服务器上（通过dockerhub也行）
-   针对以这样的部署应用场景 如果不使用docker-compose，就得手动执行如下的几次docker脚本命令，如下：

```auto
# 1. 创建自定义网络，让容器可以互相通信
docker network create app-network

# 2. 启动 MySQL
docker run -d \
  --name mysql-container \
  --network app-network \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql-data:/var/lib/mysql \
  mysql:latest

# 3. 启动 Redis
docker run -d \
  --name redis-container \
  --network app-network \
  -p 6379:6379 \
  redis:alpine

# 4. 启动 Java 应用（依赖 MySQL 和 Redis）
docker run -d \
  --name java-app-container \
  --network app-network \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql-container:3306/mydb \
  java-app:latest

# 5. 启动 Nginx（前端）
docker run -d \
  --name nginx-container \
  --network app-network \
  -p 80:80 \
  nginx:latest
```

当然 ，也可以把上述的五次命令，都放在一个shell脚本里面，但是不优雅

**`使用docker-compose.yml优雅地管理同一个项目中的多个镜像`**

-   首先，`docker-compose.yml` 默认就会让所有服务（比如我的四个镜像）处于同一个网络中，实现自动互通，自带此功能
-   其次，有了`docker-compose.yml`以后，就可以通过`docker-compose up -d`一键启动所有服务，也可以通过`docker-compose down`一键关闭所有服务
-   然后，将整个应用栈（前端、后端、数据库、缓存）的配置都被记录在一个 `.yaml` 文件中。这样方便，做版本控制，追踪每一次变更；保持环境一致性、易于团队分享和协作
-   可以在`docker-compose.yml`文件中，设置镜像服务启动顺序（比如，`要先启动mysql和redis，然后再启动java-app，最后再启动nginx——有服务依赖先后顺序`）
-   另外，日志，也能够统一管理，等等等等的好处
-   `docker-compose`的功能强大，管理优雅，赞👍👍👍

简单如下示例，实际项目，会稍微完整完善不少

```auto
# 定义 Compose 文件版本
version: '3.8'

services:
  # 后端 Java 应用服务
  java-app:
    image: java-app:latest # 使用本地构建的 Java 应用镜像
    container_name: my-java-app # 指定容器名称
    environment:
      # 配置数据库连接地址（通过服务名访问）
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/my_database
      # 配置 Redis 连接地址
      - SPRING_REDIS_HOST=redis
    depends_on:
      - mysql # 依赖 MySQL 服务先启动
      - redis # 依赖 Redis 服务先启动
    networks:
      - app-network # 加入应用内部网络

  # 前端 Nginx 服务
  nginx:
    image: nginx:latest # 使用 Nginx 镜像
    container_name: my-nginx # 指定容器名称
    ports:
      - "80:80" # 将主机80端口映射到容器80端口
    volumes:
      # 挂载自定义 Nginx 配置文件
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - java-app # 依赖 Java 应用先启动
    networks:
      - app-network # 加入应用内部网络

  # MySQL 数据库服务
  mysql:
    image: mysql:8.0 # 使用 MySQL 8.0 镜像
    container_name: my-mysql # 指定容器名称
    environment:
      # 设置 MySQL root 用户密码
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      # 持久化数据库数据到主机
      - mysql_data:/var/lib/mysql
    networks:
      - app-network # 加入应用内部网络

  # Redis 缓存服务
  redis:
    image: redis:7-alpine # 使用 Redis Alpine 版本（轻量）
    container_name: my-redis # 指定容器名称
    networks:
      - app-network # 加入应用内部网络

# 定义自定义网络，使服务间可通过服务名通信
networks:
  app-network:
    driver: bridge # 使用桥接网络驱动

# 定义数据卷，用于持久化数据
volumes:
  mysql_data: # MySQL 数据持久化卷
```

> 此外，Docker Compose还可以做服务健康检查和服务等待机制，能通过各种策略，能够让部署更可靠，具体看文档：[docs.docker.com/compose/](https://docs.docker.com/compose/ "https://docs.docker.com/compose/")

> 其他：上述的depends\_on仅确保容器按顺序启动，但不确保服务就绪。需要配合应用的重试机制或Docker Compose的healthcheck和condition选项、Compose v2中支持

## 总结

-   docker镜像打包，好像看起来麻烦一点点，还得写Dockerfile，还得写构建脚本、和部署脚本啥的。
-   但是它解决了环境版本一致性问题
-   比如，bff和ssr不同node版本等场景，人工手动切换管理起来，还是有些麻烦的
-   此外，还有服务器更换场景，要是重新安装各种依赖包等版本，那的确耗时。
-   （打包前端项目，明显、打包后端项目更加明显）

如果打包bff，我们可以编写如下的Dockerfile

```auto
# 基础镜像：用轻量的 Node.js 16 版本（alpine 版本体积小）
FROM node:16-alpine

# 创建工作目录（类似在服务器上建一个专门的文件夹放代码）
WORKDIR /app

# 复制 package.json 和 package-lock.json（先复制依赖文件，利用 Docker 缓存加速构建）
COPY package*.json ./

# 安装依赖（npm install 会根据 package.json 下载所需的库）
RUN npm install --production  # --production 只装生产环境依赖，减小体积

# 复制 BFF 源代码（比如 server.js、路由文件等）
COPY . .

# 暴露 BFF 服务的端口（假设我的BFF的服务监听3000端口）
EXPOSE 3000

# 启动命令：运行 BFF 服务
CMD ["node", "server.js"]
```

所以，docker的优势有：

1.  环境版本依赖一致性、隔离性与安全性
2.  简化团队配置协作
3.  可快速部署与扩展
4.  而且，有了docker以后，CI/CD就更加好操作了（更好实现，标准化和自动化）
5.  首次一劳————而后永逸

> A good memory is better than a bad pen. Record it down...