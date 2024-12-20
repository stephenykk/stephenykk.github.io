---
title: curl实用教程
banner: /images/banner_camera.jpg
date: 2024-04-10 17:09:48
tags: curl
---


{% mark curl color:purple %}   是一种命令行工具，作用是发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上面。

参考 [curl 用法指南](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html)

## 基础用法

### 直接请求指定资源

```bash
# 如 url包含查询参数，需要用引号括起来，因为参数中包含&符号，在shell中表示后台执行
curl www.sina.com
```

### 响应内容导出到文件  
默认输出到stdout, 指定 `-o file` 则输出到指定文件

```bash
curl -o sina.html www.sina.com
```

### 发起GET请求并带参数   
`-G` 表示 GET请求，默认也是GET请求，所以不加也可以。

```bash
curl -G --data "login=1&name=sindy" localhost:7001
curl "https://www.baidu.com/s?wd=weather&rsv_spt=1"
```

### 发起POST请求并带参数   
`-X` 指定请求方法，`-d` 指定请求参数，`--data-urlencode` 对参数进行URL编码, `-H`/`--header` 指定请求头  

用 `-d` 参数以后，HTTP 请求会自动加上标头 `Content-Type : application/x-www-form-urlencoded`。并且会自动将请求转为 `POST` 方法，因此可以省略 `-X POST`。

```bash
# curl -X POST --data 'data' --header 'header' url POST请求
curl -X POST --data '{"name":"controller"}' --header 'Content-Type:application/json' http://127.0.0.1:7001/form

# 可用多个-d发送多个键值对数据
curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login

```

`-d` 参数可以读取本地文本文件的数据，向服务器发送。
```bash
curl -d '@data.txt' https://google.com/login
```

### 设置请求头   
`-H`/`--header` 指定请求头，设置多个header，可指定多个 `--header` 选项

```bash
# curl -H val url 
# curl --header val url
curl --header "content-type: application/json" --header "authorization: Bearer token" url
```

### 设置 useragent  
`-A`/`--user-agent` 指定UA, 对于带反爬虫的网站，可以设置UA来伪装浏览器。

```bash
curl -A val url
curl --user-agent val url
```


### 指定 referer
对于防止盗链的网站，可以指定 referer 来伪装请求来源。

```bash
curl --referer val url
```

### 指定 cookie
接口需要鉴权的话，可以指定 cookie 来发送相关鉴权信息。

```bash
curl --cookie "name=alice" url

```


## 高级用法

### 追踪重定向，获取重定向后的内容

```bash
curl -L www.sina.com
# 用eggjs起个web服务，controller.home.index中 
# ctx.redirect('https://www.baidu.com')
curl http://localhost:7001 # 301 不会返回百度首页内容

curl -L http://localhost:7001 # 会返回百度首页内容

```

### 显示响应头

```bash
curl -i www.sina.com # 返回响应头和响应体

# curl -I url 只显示响应头
curl -I www.sina.com
```


### 显示完整的 http 通信过程

```bash
curl -v www.sina.com

# curl --trace output.txt url 显示更加详细的数据
curl --trace output.txt www.baidu.com
```


### 自动urlencode传入的数据
`--data`/`-d` 默认不会encode数据

```bash
curl -X POST --data-urlencode "data" url
```



### 文件上传

```bash
curl --form upload=@localfilename --form press=ok url
```


### 保存返回的cookie

```bash
curl -c cookies.txt http://example.com
```

### 发送 cookie 文件

```bash
curl -b cookies.txt http://example.com
```

### http 认证

```bash
curl --user name:password url
```

### 多参数示例

```bash
curl -iv -d "@data.json" --cookie 'csrfToken=REhEag2ATP5vfl2Za6aOXoCT' --header 'x-csrf-token:REhEag2ATP5vfl2Za6aOXoCT' --header 'content-type: application/json' -o out.txt http://localhost:7002/component/create 
```
