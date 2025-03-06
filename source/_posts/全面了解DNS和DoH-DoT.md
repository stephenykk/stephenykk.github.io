---
title: 全面了解DNS和DoH/DoT
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-03-06 20:20:17
tags: DNS
---
> 转载自: [https://juejin.cn/post/6913507512859754509](https://juejin.cn/post/6913507512859754509)

DNS (Domain Name System)，直译就是域名系统，它所提供的服务是将域名转换为主机 IP 地址，这一过程我们称为域名解析

## 标准互联网域名解析流程

在介绍之前我们来了解几个名词

-   注册局：域名注册局是管理顶级域名的组织，它们创建域名后缀，设置域名规则，并与注册商合作向公众出售域名，如 VeriSign 管理 `.com` 域名，CNNIC 管理 `.cn` 域名
-   注册商：域名注册商是经过认证可向公众销售域名的组织，如 GoDaddy，万网等
-   顶级域名：`.com`，`.cn`，`.net`，`.org` 等被称为顶级域名
-   二级域名：这个就是我们常用等域名，比如 `baidu.com`，`taobao.com` 等被称为二级域名
-   权威 NS 记录：域名服务器记录，用来指定该域名由哪个 DNS 服务器来进行解析。若不指定，默认一般由注册商的 DNS 服务器提供免费的域名解析服务

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3231b686d7ac4bd490d8e7990a978c48~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

上图就是我们非常熟悉的互联网域名解析流程，客户端会到本地 DNS 服务器递归查询出记录结果，而本地 DNS 服务器的缓存中没有相应的记录，则会依次从根域名服务器，顶级域名服务器，权限域名服务器迭代查询出记录结果。我们可以使用下面的命令来了解下本地 DNS 服务器是如何迭代查询出记录结果的

```shell
dig @8.8.8.8 www.baidu.com +trace
```

> 递归查询和迭代查询的区别为，递归查询是 A->B->C->D，而迭代查询是 A->B, A->C, A->D。本地 DNS 服务器一般是网络服务商提供的 DNS，也可以自己修改为常用的公共 DNS

## 标准 DNS 面临的安全问题

我们知道标准 DNS 协议如同大多数早期互联网协议一样，完全没有考虑安全问题，数据是通过明文传输的。常见的针对 DNS 的攻击手段有

1.  DNS 欺骗/缓存中毒 (DNS Cache Poisoning)：原理是利用 DNS 协议设计时的安全缺陷，通过伪造 ARP 应答包，当 ARP 欺骗成功后，只有嗅探到目标主机发出 DNS 请求包就解析后立即构造一个伪造的 DNS 返回包欺骗目标主机，解析器则会将返回包的结果保存进 DNS 缓存表中，而后当真实的 DNS 返回包到来时则会被丢弃。简单来说就是冒充 DNS 服务器
2.  DNS 劫持 (DNS Hijacking)：结果和 DNS 缓存一样，都是篡改 DNS 解析结果，只是不单单针对的是解析器中的 DNS 缓存表，而是针对 DNS 解析链路上的每一步。比如
    -   通过木马病毒或恶意软件篡改 DNS 配置 (hosts 文件，DNS 服务器地址，DNS 缓存表等)
    -   利用路由器漏洞篡改路由器的 DNS 配置

防御 DNS 威胁的最知名方式之一是使用 DNSSEC 协议，DNSSEC 通过对数据进行数字签名来防止攻击，以帮助确保其有效性。为确保进行安全查找，此签名必须在 DNS 查找过程的每个级别进行，但不幸的是，它当前尚未得到普遍采用

## DoH

DoH，DNS over HTTPS，是一种安全解析域名的方案。2018年 DoH 正式成为国际标准 [RFC8484](https://tools.ietf.org/html/rfc8484 "https://tools.ietf.org/html/rfc8484")，通过加密的 HTTPS 协议进行 DNS 解析请求，代替标准的，基于 UDP 的 DNS 协议，可以有效避免域名被运 DNS 劫持，DNS 欺骗/缓存中毒等域名安全问题。现如今 DoH/DoT 在 Google，Firefox 等浏览器已经获得了支持，微软也放出消息将在 Windows 10 系统的后续开发中加入 DoH/DoT 支持，苹果在 WWDC 大会宣布 iOS 14 与 macOS 11 新增对加密 DNS 的支持 (包括 DoH/DoT)，同时 DoH/DoT 已经获得部分公共 DNS 支持，如下所示

| 提供商 | 网址 |  |
| --- | --- | --- |
| Cloudflare DNS | [cloudflare-dns.com/dns-query](https://cloudflare-dns.com/dns-query "https://cloudflare-dns.com/dns-query") | [www.cloudflare.com/zh-cn/learn…](https://www.cloudflare.com/zh-cn/learning/dns/what-is-1.1.1.1/ "https://www.cloudflare.com/zh-cn/learning/dns/what-is-1.1.1.1/") |
| Google Public DNS | [dns.google/dns-query](https://dns.google/dns-query "https://dns.google/dns-query") | [developers.google.com/speed/publi…](https://developers.google.com/speed/public-dns "https://developers.google.com/speed/public-dns") |
| 阿里云公共 DNS | [dns.alidns.com/dns-query](https://dns.alidns.com/dns-query "https://dns.alidns.com/dns-query") | [www.alidns.com/](https://www.alidns.com/ "https://www.alidns.com/") |

现在我们借助公共 DNS 来了解下 DoH，可以参考这份[文档](https://developers.cloudflare.com/1.1.1.1/dns-over-https "https://developers.cloudflare.com/1.1.1.1/dns-over-https")

```auto
json 代码解读复制代码$ curl -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=baidu.com&type=A'

{
    "Status": 0,
    "TC": false,
    "RD": true,
    "RA": true,
    "AD": false,
    "CD": false,
    "Question": [
        {
            "name": "baidu.com",
            "type": 1
        }
    ],
    "Answer": [
        {
            "name": "baidu.com",
            "type": 1,
            "TTL": 546,
            "data": "220.181.38.148"
        },
        {
            "name": "baidu.com",
            "type": 1,
            "TTL": 546,
            "data": "39.156.69.79"
        }
    ]
}
```

-   Status，DNS 查询的响应状态码，可以参考 [RFC1035](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6 "https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-6")
-   TC，Truncation，标准的 DNS 协议封包最大长度为 512Bytes，超过就会发生截断，但是由于 DoH 使用的是 HTTPS 协议，不会存在截断问题，所以 TC 位恒为 false
-   RD，Recursion Desired，递归期望，与 RA 对应，由于请求端携带发送，值为 true 则表示递归解析，否则表示迭代解析
-   RA，Recursion Available，递归可用，DNS 服务器是否支持递归查询，大多数 DNS 服务器都是支持递归查询的，除了少部分根 DNS 服务器
-   AD，如果为 true 表示每一条记录都是经过 DNSSEC validation
-   CD，Checking Disabled，如果为 true 表示禁用 DNSSEC validation
-   Question name，请求域名
-   Question type，请求 DNS 解析记录，常见的解析记录有，`A`，`TXT` 等，具体可以参考 [RFC1035](https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4 "https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-4")
-   Answer name
-   Answer type
-   Answer TTL
-   Answer data，解析结果

## DoT

DoT，DNS over TLS，同样也是一种安全解析域名的方案，国际标准 [RFC7858](https://tools.ietf.org/html/rfc7858 "https://tools.ietf.org/html/rfc7858")。DoH 和 DoT 都是替代标准 DNS 的方案，那么两者有什么差别呢？

从网络安全的角度来看，DoT 可以说更好，它使网络管理员能够监视和阻止 DNS 查询，这对于识别和阻止恶意流量非常重要。另一方面，DoH 查询隐藏在常规 HTTPS 流量中，两者使用的都是 443 端口，这就意味着很难区分是常规 HTTPS 流量还是 DoH 流量

从隐私安全的角度来看，DoH 更好，就如前面所说，我们是很难区分是常规 HTTPS 流量还是 DoH 流量的，那么就从间接增强了用户的隐私性

## 在浏览器上使用 DoH

我们前面讲过现如今 DoH/DoT 在 Google，Firefox 等浏览器已经获得了支持，这里我将演示 Chrome 87 如何使用 DoH，过程如下

```auto
rust 代码解读复制代码设置 -> 隐私设置和安全性 -> 安全 -> 使用安全 DNS
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e50f02039614fd1b82887b5b08d3af5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

接下来打开 [https://1.1.1.1/help](https://1.1.1.1/help "https://1.1.1.1/help") 验证下你的浏览器是否真的是用了 DoH，如果使用了 VPN 或者其他代理工具的话，请暂时关掉，不然会测试不了。其它的浏览器配置可以参考这份文档，[Configure your browser to use DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/dns-over-https/web-browser "https://developers.cloudflare.com/1.1.1.1/dns-over-https/web-browser")