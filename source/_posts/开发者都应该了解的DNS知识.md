---
title: 开发者都应该了解的DNS知识
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-03-04 17:46:08
tags:
---
> 转载自: [https://juejin.cn/post/7023258157241597983](https://juejin.cn/post/7023258157241597983)

## 什么是 DNS​

需要先介绍为什么需要域名，一方面是便于流通好记的，当然基于 ip 去定位资源是比较繁琐的，特别是在现在 ipv6 的情况下。在这是为了可以在业务层面更好的去更换 ip 地址，域名肯定是唯一的， 但是随着公司业务逐渐开发发展服务弹性伸缩负载均衡高可用等，使得统一个域名不用用户解析出的 ip 是不一样的，所以域名也可以保证与 ip 的解耦。保证服务可以随着业务逐步迭代。同时，DNS解析作为网络请求过程中第一步，DNS 解析的性能也是非常重要的。所以需要设置合理的 DNS 解析架构。  
  
那什么是 DNS 呢，DNS 本质是为了维护域名和 ip 的映射关系的服务，同时 DNS 分为了公网的 DNS 以及私有的 DNS 服务。  

## 域名结构

比如一个域名 mail.tsinghua.edu.cn. 这个域名分为了几个层次，比如根 . , 顶级域名 cn，二级域名 edu，三级域名 tsinghua，四级域名 mail，如下图所示：  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ae0f8945500436b816913398d9b01ce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
**根域名服务器:** 根级 DNS 服务全球一共有 13 集群，其中 10 个在美国，其他分别在英国、瑞典、日本。根服务器主要用来管理互联网的主目录。大部分采用 anycast + BGP 方式管理服务集群，anycast 技术可以是的多台服务对外暴露同一个 ip 地址，由路由层面的 BGP 机房选择一个就近的服务器进行解析任务。根域名服务器存储了顶级的 NS(name server 域名服务器) 列表。  
​

**顶级域名服务器**：顶级域名主要描述了该域名的性质，一是国家和地区顶级域名（ccTLDs），目前200多个国家都按照ISO3166国家代码分配了顶级域名，例如中国是cn，日本是jp等；二是通用顶级域名（gTLDs），例如表示工商企业的.com，表示网络提供商的 .net，表示非盈利组织的 .org等。三是新顶级域名（New gTLD）如通用的 .xyz、代表“高端”的 .top、代表“红色”的 .red、代表“人”的 .men 等一千多种。  
​

**二级域名服务器**：一般是指域名注册人选择使用的网上名称，如“yahoo．com”；上网的商业组织通常使用自己的商标、商号或其他商业标志作为自己的网上名称，如“microsoft．com”。二级以上的域名都是非注册类型的域名可以每一个服务自己去定义。  
​

**权威域名服务器**：值提供 ip 解析能力的，或者能够控制最终 ip 地址解析的服务器，一般是 二级域名服务器。  
​

**Local DNS**: 用户上网需要通过 ISP(互联网服务提供商, 比如电信、网通等) 的网络接入互联网, ISP 会分配给用户一个 DNS 服务器，该服务器就是 Local DNS。Local DNS 能够不断**迭代** 根 NS、顶NS、权威 NS，直到能够解析出该域名 ip 后返回给用户。  
**​**  

## DNS 解析原理

**​**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a33ffb990e444600a803f559a4311721~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  
**​**

**用户接入 ISP 提供的网络后，会给用户分配一个 ISP 提供的解析 DNS 的 ip 地址，称为 Local DNS。**  
**​**  

1.  用户在浏览器中输入网址开始访问 [www.aaa.com。首先会将](http://www.aaa.com%E3%80%82%E9%A6%96%E5%85%88%E4%BC%9A%E5%B0%86 "http://www.aaa.com%E3%80%82%E9%A6%96%E5%85%88%E4%BC%9A%E5%B0%86") [www.aaa.com](http://www.aaa.com "http://www.aaa.com") 进行域名地址的解析工作，解析成 ip 地址。
    
2.  浏览器会从本地缓存中查看是否有之前访问过 [www.aaa.com](http://www.aaa.com "http://www.aaa.com") 域名 DNS 解析缓存，这个缓存一般是 1min 左右(不同的浏览器不一致), 同时对于 chrome 浏览器你可以通过 chrome://net-internals/#dns 链接清除浏览器本地缓存的 DNS 解析。如果没有对应域名的缓存，会继续访问设备上本地 host。
    
3.  本地 host 是一个 域名和解析 ip 的映射表，在 Linux 里是位于“/etc/hosts”文件中，在 Windows 里是位于 “C:\\WINDOWS\\system32\\drivers\\etc\\hosts” 文件中。如果没有对应的域名的映射，则浏览器的网络模块会读取设备被分配的 Local DNS 地址，给 ISP 分配的 Local DNS 发送域名解析请求，要求 Local DNS 对 [www.aaa.com](http://www.aaa.com "http://www.aaa.com") 地址进行解析，最终给浏览器解析的 ip 地址或者解析错误日志信息。
    

​  

4.  这里 Local DNS 一般在电脑网络模块中的 DNS 中都会又看到，当然也可以修改 Local DNS， 比如改写成 8.8.8.8， 或者公司内部的 DNS 解析服务。Local DNS 得到用户的请求后，会根据域名的结构，从根NS \*\*迭代 \*\*的请求各个 NS 得到解析后的 ip。Local DNS 服务器中保存了 13 处 根域名服务器地址(几乎根域名服务器地址是不会更换的)。Local DNS 会将 [www.aaa.com](http://www.aaa.com "http://www.aaa.com") 的解析地址请求发送给选择的一个就近的根域名服务器。

​  

5.  根域名服务器地址发现这个域名是属于 .com 顶级域名下的，则返回 .com 顶级NS列表 和 IP 地址给 Local DNS 。Local DNS 得到顶级 NS 列表后，进一步选择一个就近的顶级 NS 服务器，去请求解析结果。

​  

6.  顶级 NS 接收到来自 Local DNS 请求后，发现这是来自于 .aaa 这个二级域名下的，它把在它这里登记注册的 aaa.com NS列表返回给 local DNS。此时返回一个 CNAME 地址 [www.aaa.lxdns.com。](http://www.aaa.lxdns.com%E3%80%82 "http://www.aaa.lxdns.com%E3%80%82")
    
7.  local DNS 发现返回的 NS 列表中通过 NS 策略选择出一个 CNAME 记录，所以就是用 [www.aaa.lxdns.com](http://www.aaa.lxdns.com "http://www.aaa.lxdns.com") 地址继续重复 4 5 6 步骤 直到请求到 lxdns.com NS。
    

​  

8.  在 lxdns.com NS 中成功解析出 [www.aaa.lxdns.com](http://www.aaa.lxdns.com "http://www.aaa.lxdns.com") A 记录，将 ip 1.1.1.1 返回给 Local DNS，Local DNS 返回给浏览器，浏览器发出 http 请求到 1.1.1.1 服务中开始请求内容。

**​**

**在整个过程中涉及到了 Local DNS 如果选择各个 NS 返回的下一个 NS 列表中唯一一个 ip 的问题，一般对于 bind9 等软件都实现了通过多点部署 DNS 就近选择。**

## DNS 自定义区域

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b10f9f11e1e464dbde84f0f24373bcb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e71168f460641a8b5e641d7e8afd5bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)  

## DNS 常用命令

### 1\. 查看域名对应的 NS

> dig 域名 可以查看域名的解析 NS 列表，同时也可以看出缓存时间

### 2\. 指定 Local DNS 进行域名解析

> dig @LocalDNSIP 域名 可以使用这个方法进行 CDN 的调度测试

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaac5d9dca154b46ba929360c03904ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 3.查看 DNS 的 TTL

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db96c745c9a4444bb8b945b042bd8202~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 4.查看 DNS 完整解析路径

> dig +trace 域名 +additional

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/144df4c1bcc640e4b2b513c570adc686~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75e45a361c5f44148811a71973256659~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 5.测试网络延迟

> ping serverIp

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f806d7950a584293bf66b0a1ff3f2da7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## DNS 性能分析

### CNAME 次数过多

### 设置 TTL 不合理

### DNS 多点就近部署架构升级

## 企业内网 DNS

-   内网 web 服务
-   hostname 应该设置为 FQDN 如何维护主机名和内网 ip 关系
-   一些中间件需要迁移扩容，所以需要使用域名对外服务
-   对解析域名有更高的要求（安全-dnssec 效率-ttl）
-   使用 bind9 工具去实现