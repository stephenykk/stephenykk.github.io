---
title: Nginx使用教程
date: 2024-03-08 08:36:30
tags: nginx
categories: nginx
---

[nginx 入门教程](https://xuexb.github.io/learn-nginx/guide/)
[nginx 配置详解](https://www.jianshu.com/p/1593954d5faf)  
[nginx 重写规则配置](https://www.cnblogs.com/pengyunjing/p/8542200.html)  
[Nginx 正向代理和反向代理详解 - 简书](https://www.jianshu.com/p/d7258c062751)  
[总结 nginx 中的 location 配置](http://www.fly63.com/article/detial/8552)  
[Nginx 的 location 匹配规则](https://www.cnblogs.com/duhuo/p/8323812.html)

## Nginx 简介

### 背景

在互联网产业远没有现在这么红火的时候，每个网站或者应用所需要支持的并发量不需要太大，所以最开始的服务器是 Apache，它对高并发并不支持，所以它不是高性能的 Web 服务器，因为并发量上万之后，会导致服务器消耗大量内存，操作系统对其进行进程或线程间的切换也会消耗大量的 CPU 资源，导致 Http 请求的平均响应速度降低。

但是现在的互联网流量已经远远不是当时所能想象的，所以迫切需要一种高性能的，稳定的 Web 服务器。于是 Nginx 诞生了。

### 优点

1. **开源免费**
2. **事件驱动** Nginx 使用基于事件驱动架构，使得其可以支持数以百万级别的 TCP 连接
3. **跨平台** Nginx 是一个跨平台服务器，可以运行在 Linxu，Windows，MacOS 等主流的操作系统中
4. **稳定**

### 应用场景

Nginx 是一个高性能且开源的 HTTP 和反向代理 Web 服务器，同时也是一个 IMAP、POP3、SMTP 代理服务器；Nginx 可以作为一个 HTTP 服务器进行网站的发布处理，另外 Nginx 可以作为反向代理进行负载均衡的实现。

使用场景：

- web服务器
- 反向代理
- 负载均衡服务器
- 邮件代理服务器

## Nginx 的配置

![nginx.conf](https://upload-images.jianshu.io/upload_images/658641-457458febe07f065.png?imageMogr2/auto-orient/strip|imageView2/2/w/441/format/webp)

配置文件分 4 部分:

- main（全局设置）：设置的指令将影响其他所有设置；
- server（主机设置）：指令主要用于指定主机和端口、
- upstream（负载均衡服务器设置）：指令主要用于负载均衡，设置一系列的后端服务器
- location（URL 匹配特定位置的设置）：用于匹配网页位置。

![server 块配置](https://upload-images.jianshu.io/upload_images/658641-02caaa1bc69a795f.png)

配置示例

```ini
user nobody nobody;
worker_processes 2;
err_log logs/error.log notice;
pid logs/nginx.pid;

events {
  use epoll;
  worker_connections 1000; # 每个nginx进程的最大连接数
}

http {
  include mime.types;
  default_type application/octet-stream;
  sendfile on;
  keepalive_timeout 60; # 长连接的超时时间

  server {
    listen 88;
    server_name localhost;
    location / {
      root /usr/var/html;
    }
  }
}
```
### location 块

URL 地址匹配是进行 Nginx 配置中最灵活的部分。 location 支持正则表达式匹配，也支持条件判断匹配，用户可以通过 location 指令实现 Nginx 对动、静态网页进行过滤处理。使用 location URL 匹配配置还可以实现反向代理，用于实现 PHP 动态解析或者负载负载均衡。

![location块配置](https://upload-images.jianshu.io/upload_images/658641-262f6910d5c3f9ff.png)

#### alias 与 root 的区别

- root 配置根目录，在根目录中查找 *$document_uri* 对应的文件 `$request_filename = $document_root + $document_uri`
- alias 配置别名目录，在别名目录中查找 *$document_uri - 匹配路径* 对应的文件 

```ini
    location  /blogs  {
        root /home/jie;
        autoindex on;
    }
    # 定位文件时， rootValue 作为前缀添加到 $document_uri 前面
    # curl localhost/blogs/a.html -> /home/jie/blogs/a.html
    # curl localhost/blogshi/a.html 也会匹配到 -> /home/jie/blogshi/a.html

    location /comics {
      alias /home/pan/manhua; 
      autoindex on;
    }
    # 定位文件时，aliasValue 替换 $document_uri 中与 locationValue 匹配的部分
    # aliasValue 替代 /comics
    # curl localhost/comics/hi.html -> /home/pan/manhua/hi.html

```

#### location 配置示例

多条 location 配置当前 `$document_uri` 时，会采用权重最高的匹配 （*精确匹配 > 开始位置正则匹配 > 普通正则匹配 > 普通匹配 > 最长字符串匹配*）

```ini
    # 普通匹配：普通 location，无任何前缀符号
    # $document_uri 开始位置匹配
    location  /blogs  { 
        root /home/jie; # 会在root下查找blogs目录，所以要先新建blogs文件夹
        autoindex on;
    }
    # curl localhost/blogs 显示文件列表
    # curl localhost/lastyear/blogs 即使root下有对应目录也不会匹配到 `location /blogs`只匹配url以`/blogs`开头的情况

    # 精确匹配：带 = 号前缀符号的严格匹配
    location = /comics {
      alias /home/pan/manhua; 
      autoindex on;
    }

    # 正则匹配
    location ~ ^.+\.txt$ {
      root /home/pan;  # 注意 指令都需要分号结尾
    }
    # curl localhost/docs/hello.txt 会查找 /home/pan/docs/hello.txt

    # curl localhost/documents/a.jpg -> 会匹配 configuration E
    # 以 /documents/ 开头这个专指度比较低，所以会继续查找 正则匹配 规则
    location /documents/ {
      # matches any query beginning with /documents/ and continues searching,
      # so regular expressions will be checked. This will be matched only if
      # regular expressions don't find a match.
      [ configuration C ]
    }

    # 开始位置正则匹配
    location ^~ /images/ {
      # matches any query beginning with /images/ and halts searching,
      # so regular expressions will not be checked.
      [ configuration D ]
    }

    # 不区分大小写正则匹配
    location ~* \.(gif|jpg|jpeg)$ {
      # matches any request ending in gif, jpg, or jpeg. However, all
      # requests to the /images/ directory will be handled by
      # Configuration D.
      [ configuration E ]
    }
```

#### location 匹配优先级：

`location [=|~|~*|^~] /uri/ { … }`

- `=` 精确匹配

- `^~` 开始位置正则匹配（区分大小写）

- `~` 正则匹配（区分大小写）

- `~*` 不区分大小写的正则匹配

- `!~` 和 `!~*` 正则不匹配(*区分/不区分 大小写*) **不用在 location 后面**

- `/` 通用匹配，任何请求都会匹配到。

首先匹配 `=`，其次匹配 `^~` , 其次是按文件中顺序的正则匹配，最后是交给 `/` 通用匹配。当有匹配成功时候，停止匹配，按当前匹配规则处理请求。

```ini
# http://localhost/ 将匹配规则A
location = / {
   # 规则A
}
# http://localhost/login 将匹配规则B
location = /login {
   # 规则B
}
#  http://localhost/static/a.html 将匹配规则C
location ^~ /static/ {
   # 规则C
}

location ~ \.(gif|jpg|png|js|css)$ {
   # 规则D
}
# http://localhost/a.PNG 则匹配规则E
location ~* \.png$ {
   # 规则E
}

# http://localhost/a.XHTML 不确定是否有效?
location !~ \.xhtml$ {
   # 规则F
}
location !~* \.xhtml$ {
   # 规则G
}

# http://localhost/category/id/1111
location / {
   # 规则H
   proxy_pass http://tomcat:8080/
}
```

### rewrite 重写请求

重写请求uri的简单例子  

```ini
server {
    listen 80;
    server_name comic.bilibili.com;
    index index.html index.php;
    root html;
    if ($http_host !~ "^comic\.bilibili\.com$") {
        rewrite ^(.*) http://comic.bilibili.com$1 redirect;
    }
}
```


重写请求防盗链

```ini
location ~* \.(gif|jpg|swf)$ {
    valid_referers none blocked comic.bilibili.com *.comic.bilibili.com;
    if ($invalid_referer) {
        rewrite ^/ http://$host/logo.png;
    }
}
```

- `last`  基本上都用这个 Flag。
- `break`  中止 Rewirte，不再继续匹配
- `permanent`  返回永久重定向的 HTTP 状态 301
- `redirect`  返回临时重定向的 HTTP 状态 302

**last 和 break 关键字的区别** 

- last 和 break 当出现在 location 之外时，两者的作用是一致的没有任何差异

- last 和 break 当出现在 location 内部时：
  - `last` 使用了 last 指令，rewrite 后会跳出 location 作用域，**用rewrite的结果**重新开始再走一次刚才的行为
  - `break` 使用了 break 指令，rewrite 后不会跳出 location 作用域，它的生命也在这个 location 中终结

**permanent 和 redirect 关键字的区别**  

- `permanent` 永久性重定向，请求日志中的状态码为 301
- `redirect` 临时重定向，请求日志中的状态码为 302

### 判断表达式

- `-f` 和 `!-f` 用来判断是否存在文件
- `-d` 和 `!-d` 用来判断是否存在目录
- `-e` 和 `!-e` 用来判断是否存在文件或目录
- `-x` 和 `!-x` 用来判断文件是否可执行

根据文件类型设置过期时间

```ini
location ~* \.(js|css|jpg|jpeg|gif|png|swf)$ {
    if (-f $request_filename) {
        expires 1h;
        break;
    }
}
```

禁止访问某些文件类型

```ini
location ~* \.(txt|doc)${
  root /data/www/wwwroot/linuxtone/test;
  deny all;
}
```
### 全局变量

- `$args`
- `$content_length`
- `$content_type`
- `$document_root`
- `$document_uri`
- `$host`
- `$query`
- `$http_origin`
- `$http_user_agent`
- `$http_cookie`
- `$limit_rate`
- `$request_body_file`
- `$request_method`
- `$request_uri`
- `$request_filename`
- `$remote_addr`
- `$remote_port`
- `$remote_user`

常用的全局变量  

```ini
# 例：http://localhost:88/test1/test2/test.php

$host：localhost
$server_port：88
$request_uri：http://localhost:88/test1/test2/test.php
$document_uri：/test1/test2/test.php
$document_root：D:\nginx/html
$request_filename：D:\nginx/html/test1/test2/test.php
```

## 负载均衡

[负载均衡的 5 种策略](https://www.cnblogs.com/andashu/p/6377323.html)

nginx的upstream目前支持的5种方式的分配


1、普通轮询（默认）
每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。

```ini
upstream backserver {
  server 192.168.0.14;
  server 192.168.0.15;
}
```

2、加权轮询
指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。

```ini
upstream backserver {
  server 192.168.0.14 weight=10;
  server 192.168.0.15 weight=10;
}

```

3、IP绑定 ip_hash
每个请求按访问ip的hash结果分配，这样*每个访客固定访问一个后端服务器，可以解决session的问题*。
```ini
upstream backserver {
  server 192.168.0.14:88;
  server 192.168.0.15:80;
  ip_hash;
}
```
4、fair（公平轮询）
按后端服务器的响应时间来分配请求，响应时间短的优先分配。
```ini
upstream backserver {
  server 192.168.0.14:88;
  server 192.168.0.15:80;
  fair;
}
```
5、url_hash（第三方）
按访问url的hash结果来分配请求，使*每个url定向到同一个后端服务器，后端服务器为缓存时比较有用*。

```ini
upstream backserver {
  server squid1:3128;
  server squid2:3128;
  hash $request_uri;
  hash_method crc32;
}
```

### 负责均衡例子

```ini
# 在需要使用负载均衡的server中增加
events {
  # todo
}

http {
  upstream backserver{
    ip_hash;
    server 127.0.0.1:9090 down;  # (down 表示当前的server暂时不参与负载)
    server 127.0.0.1:8080 weight=2; # (weight 默认为1.weight越大，负载的权重就越大)
    server 127.0.0.1:6060;
    server 127.0.0.1:7070 backup; # (其它所有的非backup机器down或者忙的时候，请求backup机器)
  }

  server {
    listen 88;
    server_name localhost;

    proxy_pass http://backserver/;

    location / {
      root html;
      autoindex on;
    }
  }
}

```

## 反向代理
在nginx中配置proxy_pass代理转发时： 
- proxyPassValue 是路径  
  `$document_uri - locationValue` 追加到路径后面，得到最终转发的目标路径
- proxyPassValue 是域名  
  `$document_uri` 追加到域名后面，得到最终转发的目标路径
 

假设下面四种情况分别用 http://192.168.1.1/proxy/test.html 进行访问。
 
 
第一种：
```ini
location /proxy/ {
    proxy_pass http://127.0.0.1/; # 转发目标是路径
}
```
代理到URL：http://127.0.0.1/test.html
 
 
第二种（相对于第一种，最后少一个 / ）
```ini
location /proxy/ {
    proxy_pass http://127.0.0.1; # 转发目标是域名
}
```
代理到URL：http://127.0.0.1/proxy/test.html
 
 
第三种：
```ini
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa/; # 转发目标是路径
}
```
代理到URL：http://127.0.0.1/aaa/test.html
 
 
第四种（相对于第三种，最后少一个 / ）
```ini
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa; # 转发目标是路径
}
```
代理到URL：http://127.0.0.1/aaatest.html

