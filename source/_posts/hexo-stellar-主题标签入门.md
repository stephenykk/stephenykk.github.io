---
title: hexo stellar 主题标签使用入门
banner: /images/banner_camera.jpg
date: 2024-03-26 21:20:43
tags:
    - hexo
    - stellar
---

 
更全面的使用方法请参考[stellar官方文档](https://xaoxuu.com/wiki/stellar/tag-plugins/express/) ，这里只介绍一些常用的标签。

## emoji 表情标签

语法格式:
```
{% emoji [source] name [height:1.75em] %}
```

其中 `source` 可省略，默认source为emoji配置列表的第一个。比如：配置如下时，默认source就是default对应的链接
```yaml _config.yml
tag_plugins:
  ...
  emoji:
    tieba: https://gcore.jsdelivr.net/gh/cdn-x/emoji/tieba/{name}.png
    default: https://gcore.jsdelivr.net/gh/cdn-x/emoji/qq/{name}.gif
    twemoji: https://gcore.jsdelivr.net/gh/twitter/twemoji/assets/svg/{name}.svg
    qq: https://gcore.jsdelivr.net/gh/cdn-x/emoji/qq/{name}.gif
    aru: https://gcore.jsdelivr.net/gh/cdn-x/emoji/aru-l/{name}.gif
```

代码示例：
```
{% emoji qq 爱你 %} 
{% emoji blobcat ablobcatattentionreverse %} # 指定source为blobcat
{% emoji 滑稽 %} # 使用默认source, 即 emoji.tieba
```
显示效果: 

{% emoji qq 爱你 %}
{% emoji blobcat ablobcatattentionreverse %}
{% emoji 滑稽 %}

我觉得贴吧的静态表情更加好一些，不容易分散读者的注意力，所以把它调整到第一个，作为默认source。

这里还有个比较关键的问题，我们怎么知道每个source下面有哪些表情可用呢？或者说source链接中`可用的 name 变量有哪些`?  

很简单，只要把source链接地址删除文件名部分后`如: https://gcore.jsdelivr.net/gh/cdn-x/emoji/tieba/`，在浏览器中打开，就能看到所有可用表情了。  

对于文字为主的内容来说，下面这些表情应该够用了。
```js tieba常用表情
{% emoji 泪 %}
{% emoji 乖 %}
{% emoji 汗 %}
{% emoji 酷 %}
{% emoji 滑稽 %}
{% emoji 惊讶 %}
{% emoji 鄙视 %}
{% emoji 你懂的 %}
{% emoji 不高兴 %}
```

{% emoji 泪 %}
{% emoji 乖 %}
{% emoji 汗 %}
{% emoji 酷 %}
{% emoji 滑稽 %}
{% emoji 惊讶 %}
{% emoji 鄙视 %}
{% emoji 你懂的 %}
{% emoji 不高兴 %}

上面谈及emoji的配置，这里特别说明一下hexo主题配置的优先级，有3处可进行主题的配置，优先级高的排前面， 具体如下：
```yaml 主题配置的优先级
- 项目根目录/_config.yml theme_config
- 项目根目录/_config.stellar.yml
- 项目根目录/themes/stellar/_config.yml    
```


## icon 图标标签

语法格式:
```
    {% icon  name|link [color:colorVal] %}
```

配置默认颜色:

```yaml _config.yml
tag_plugins:
  icon:
    # 留空时，图标和文字颜色相同
    default_color: accent # theme, accent, red, orange, yellow, green, cyan, blue, purple
```

{% box 可用的颜色名称 color:yellow %}
theme, accent, red, orange, yellow, green, cyan, blue, purple
{% endbox %}

代码示例:
```
icons.yml 中的图标：{% icon solar:planet-bold-duotone %}
外链图标：{% icon https://api.iconify.design/solar:link-circle-bold.svg %}
指定颜色：{% icon ph:seal-question-fill color:red %}
```
显示效果:

`themes/stellar/_data/icons.yml` 中的图标：{% icon solar:planet-bold-duotone %}
`themes/stellar/_data/icons.yml` 中的图标，指定颜色：{% icon ph:seal-question-fill color:red %}
外链图标：{% icon https://api.iconify.design/solar:link-circle-bold.svg %}


注意： 图标的source配置是在 `themes/stellar/_data/icons.yml` 文件中，想知道更多的图标名称，可到该文件查看。  


```js 更多图标
{% icon github:tag color:red %}
{% icon share:link color:orange %}
```

{% icon github:tag color:red %}
{% icon share:link color:orange %}

图标在独立页面上或许有用，普通的文章不需要什么图标

## mark 标记标签

{% mark 这个标签可以用来标记文章中的重点内容 *类似马克笔效果*，非常实用  color:purple %}

语法格式:
```
    {% mark content [color:colorVal] %}
```
代码示例:
```js
支持多彩标记，包括：
{% mark 默认 %}
{% mark 红 color:red %}
{% mark 橙 color:orange %}
{% mark 黄 color:yellow %}
{% mark 绿 color:green %}
{% mark 青 color:cyan %}
{% mark 蓝 color:blue %}
{% mark 紫 color:purple %}
{% mark 亮 color:light %}
{% mark 暗 color:dark %}
{% mark 警告 color:warning %}
{% mark 错误 color:error %}
一共 12 种颜色。
```

显示效果:

支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 亮 color:light %} {% mark 暗 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。

## hashtag 标签

用来显示一个超链接，比markdown的链接会好看一些。

语法:
```
    {% hashtag content link [color:colorVal] %}
```
代码示例:
```
{% hashtag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% hashtag Hexo https://hexo.io/ %}
{% hashtag GitHub https://github.com/xaoxuu/ %}
{% hashtag Gitea https://git.xaox.cc/ color:green %}
```

显示效果:

{% hashtag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% hashtag Hexo https://hexo.io/ %}
{% hashtag GitHub https://github.com/xaoxuu/ %}
{% hashtag Gitea https://git.xaox.cc/ color:green %}

如果没有指定颜色，且没有设置默认颜色，则随机取一个颜色

## image 图标标签
图片标签是一个精心设计的应对各种尺寸插图的标签，对于大图，可以放置一个「下载」按钮，语法格式如下：

```
    {% image src [description] [download:bool/string] [width:px] [padding:px] [bg:hex] %}
```

```yaml 参数说明
src: 图片地址
description: 图片描述
download: href # 下载地址，设置此值后鼠标放在图片上会显示下载地址，如果下载地址为图片地址，可以设置为 true
width: 200px # 图片宽度
padding: 16px # 图片四周填充宽度
bg: '#ffffff' # 图片区域背景颜色，16进制
```

代码示例: {% mark 花括号内的代码换行书写也是可以的 %}
```
{% image 
    https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd  
    图片由 xaoxuu 拍摄于一个阳光明媚的下午   
    download:https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd 
%}

```

显示效果:

{% image 
    https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd  
    图片由 xaoxuu 拍摄于一个阳光明媚的下午 
    download:https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd 
%}

### 支持 Fancybox 插件点击放大
在任意 image 标签中增加 fancybox:true 参数即可为特定图片开启缩放功能。

代码示例:
```
{% image
    https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Apple_Shot-on-iphone-macro-challenge_Cat_big.jpg.large_2x.jpg
    这是一只好奇的猫
    fancybox:true
%}
```
显示效果:

{% image
    https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Apple_Shot-on-iphone-macro-challenge_Cat_big.jpg.large_2x.jpg
    这是一只好奇的猫
    fancybox:true
%}
