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
{% emoji 真棒 %}
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
{% emoji 真棒 %}
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

如果您希望全站所有的 image 标签都开启此功能，可在主题配置文件中修改以下参数：
```yaml _config.stellar.yml
######## Tag Plugins ########
tag_plugins:
  # {% image %}
  image:
    fancybox: true

```

建议全局统一开启图片缩放功能。

## quot 引用标签

语法格式:
```
    {% quot title [icon:iconVal] [prefix:icon] [suffix:icon] [el:h2|h3|h4|h5|h6] %}

    #iconVal: default , hashtag
```

代码示例:
```
    适合居中且醒目的引用：
    {% quot Stellar 是迄今为止最好用的主题 %}
    
    支持自定义引号：
    {% quot 热门话题 icon:hashtag %}
    {% quot 特别引用 icon:default %}

    
    {% quot 
        这是一个 icons.yml 配置的示例
        prefix:solar:planet-bold-duotone  
    %}

    {% quot 
        这是一个 url 的示例
        prefix:https://api.iconify.design/line-md:moon-alt-to-sunny-outline-loop-transition.svg  
        suffix:https://api.iconify.design/solar:list-heart-minimalistic-line-duotone.svg
    %}

    {% quot 添加el:h3参数作为标题使用  el:h3 %}
```
显示效果:

默认的引用标题：
{% quot Stellar 是迄今为止最好用的主题 %}

支持自定义引号：
{% quot 热门话题 icon:hashtag %}
{% quot 特别引用 icon:default %}

{% quot 
    这是一个 icons.yml 配置的示例
    prefix:solar:planet-bold-duotone  
%}

{% quot 
    这是一个 url 的示例
    prefix:https://api.iconify.design/line-md:moon-alt-to-sunny-outline-loop-transition.svg  
    suffix:https://api.iconify.design/solar:list-heart-minimalistic-line-duotone.svg
%}

{% quot 添加el:h3参数作为标题使用  el:h3 %}

此外，{% mark quot标签加上参数 el:h2/h3/h4/h5/h6 可以作为标题使用，这个比较实用 color:green %}。

## note 备注标签

语法格式:
```
    {% note [title] content [color:color] %}
```

代码示例:
```
{% note 
    支持12种颜色  
    color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。
    color:warning
%}

```
{% note 
    支持12种颜色  
    color 可设置 red、orange、amber、yellow、
    green、cyan、blue、purple、light、dark、warning、error 几种取值。
    color:warning
%}

{% mark 对文章的理解和点评可以用备注块 %}

## link 链接卡片标签

语法格式:
```
    {% link href [title] [icon:src] [desc:true/false] %}
```
```yaml 参数说明
href: 链接
title: 可选，手动设置标题（为空时会自动抓取页面标题）
icon: 可选，手动设置图标（为空时会自动抓取页面图标）
desc: 可选，是否显示摘要描述，为true时将会显示页面描述

```

代码示例:
```
不带摘要的样式：
{% link https://xaoxuu.com/blog/20221029/ %}
带摘要的样式：
{% link https://xaoxuu.com/blog/20221029/ desc:true %}

```


显示效果:

不带摘要的样式：
{% link https://xaoxuu.com/blog/20221029/ %}
带摘要的样式：
{% link https://xaoxuu.com/blog/20221029/ desc:true %}


相关配置:

```yaml _config.stellar.yml
######## Tag Plugins ########services:
  # {% link %}
  siteinfo:
    # 设置 api 可以自动提取网页标题、图标，服务部署方法：https://github.com/xaoxuu/site-info-api/
    # 接口测试通过后，把按钮的 href 部分替换成 {href} 之后填写到下方，例如：https://api.vlts.cc/site_info/v1?url={href}
    api: 
       ...
```

一般用hashtag标签引入外部链接即可，如果要突出某个链接，可以考虑使用link标签。

## button 按钮标签

语法格式:
```
    {% button text url [icon:key/src] [color:color] [size:xs] %}
```

```yaml 参数说明
    # 必填
text: 探索 # 显示文字
url: # 跳转链接
# 可选参数
color: orange # theme, accent, red, orange, yellow, green, cyan, blue, purple
icon: solar:planet-bold-duotone # 显示图标，支持 icon.yml 中的文件名和外链图标
size: xs # 按钮尺寸，目前只有两种尺寸：默认是普通大小， xs 是最小号

```

代码示例:
```
    {% button 探索 https://github.com/xaoxuu/hexo-theme-stellar/ icon:solar:planet-bold-duotone %}

```

显示效果:

{% button 探索 https://github.com/xaoxuu/hexo-theme-stellar/ icon:solar:planet-bold-duotone %}

`button` 和 `hashtag` , `link` 标签一样，都可以引入外部链接。

## copy 复制行标签

语法格式:
```
    {% copy content [prefix:str] %}
```
        
代码示例:
```
{% copy curl -s https://sh.xaox.cc/install | sh %}
{% copy curl -s https://sh.xaox.cc/install | sh prefix:$ %}
# github 链接, 根据git参数相应转换
{% copy git:https xaoxuu.com/hexo-theme-stellar %}
{% copy git:ssh xaoxuu.com/hexo-theme-stellar %}
{% copy git:gh xaoxuu.com/hexo-theme-stellar %}

```

{% copy curl -s https://sh.xaox.cc/install | sh %}
{% copy curl -s https://sh.xaox.cc/install | sh prefix:$ %}
github 链接, 根据git参数相应转换
{% copy git:https xaoxuu.com/hexo-theme-stellar %}
{% copy git:ssh xaoxuu.com/hexo-theme-stellar %}
{% copy git:gh xaoxuu.com/hexo-theme-stellar %}

## radio 单选框标签

语法格式:
```
    {% radio title [check:bool] [color:colorVal]}
```

```yaml 参数说明
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
```

代码示例:
```
{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}
{% radio checked:true 已勾选的单选框 color:yellow %}
```

显示效果:

{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}
{% radio checked:true 已勾选的单选框 color:yellow %}

## checkbox 多选框标签

语法格式:
```
    {% checkbox title [check:bool] [color:colorVal] [symbol:plus/minus/times] %}
```
        
```yaml 参数说明
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
symbol: plus/minus/times

```

代码示例:
```
{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}

```

显示效果: 

{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}


`radio` 和 `checkbox` 一般都不需要用到

## audio 音频标签

{% emoji 真棒 %} 可以嵌入网易音乐，这个很惊艳~

语法格式:
```
    {% audio src [type:2/0] [netease:id] [autoplay:1/0] %}
```
        
```yaml 参数说明
type: 2/0 # 歌曲/歌单 # 不设置默认为2歌曲模式
netease: xxx # 歌曲/歌单 id ，具体 id 在网易云网页版的网址链接中寻找 
autoplay: 1/0 # 自动播放/手动播放 # 不设置默认0手动播放

```

代码示例:
```
{% audio https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3 %}

{% audio netease:1856385686 %}

{% audio netease:1856385686 type:2 autoplay:0 %}

```

显示效果: 

{% audio https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3 %}

{% audio netease:1856385686 %}

{% audio netease:1856385686 type:2  autoplay:0 %}


## video 视频标签

{% emoji 真棒 %} 竟然可以插入B站视频，大赞！

代码示例:
```
{% video bilibili:BV1GP4y1d729 %}

{% video bilibili:BV1GP4y1d729 width:100% autoplay:0 %}

{% grid c:2 %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov width:100% %}
{% endgrid %}

```

```yaml 参数说明
width: 500px # 须带单位 80% 20em 100mm...
autoplay: 1/0 # 自动播放/手动播放 # 不设置默认为0手动播放
```


显示效果:

{% video bilibili:BV1GP4y1d729 %}

{% video bilibili:BV1GP4y1d729 width:100% autoplay:0 %}

{% grid c:2 %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov width:100% %}
{% endgrid %}

## 文本修饰标签集

示例代码：
```
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}
```

显示效果:

- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}


突出文章部分内容，可以使用 `wavy` 和 `u` 标签，但是我觉得 `mark` 标签突出和标记效果更好。 

显示快捷按钮之类的，用 `kbd` 标签会更加形象，其他的修饰标签感觉用户不大。

## folding 折叠容器标签

语法格式:
```
{% folding title [codeblock:bool] [open:bool] [color:color] %}
 content
{% endfolding %}
```

```yaml 参数说明
codeblock: true/false
open: true/false
color: red/orange/yellow/green/cyan/blue/purple/light/dark
```

代码示例:
```
{% folding 默认折叠的代码框 open:false color:green %}
func test() {
  print("hello world")
}
{% endfolding %}
```

显示效果:

{% folding 默认折叠的代码框 open:false color:green %}
func test() {
  print("hello world")
}
{% endfolding %}

## box 盒子容器标签

note 标签就是使用 box 容器实现的，它们样式是相同的：

语法格式:
```
{% box [title] [color:color] [child:codeblock/tabs] %}
...
{% endbox %}

```

代码示例:
```
{% grid %}
<!-- cell -->
**推荐的写法**
{% box child:codeblock color:green %}
'''swift
func test() {
    // ...
}
'''
{% endbox %}

<!-- cell -->
**不推荐的写法**
{% box child:codeblock color:red %}
'''swift
func test() -> () {
    // ...
}
'''
{% endbox %}
{% endgrid %}
```

显示效果：

{% grid %}
<!-- cell -->
**推荐的写法**
{% box child:codeblock color:green %}
```swift
func test() {
    // ...
}
```
{% endbox %}
<!-- cell -->
**不推荐的写法**
{% box child:codeblock color:red %}
```swift
func test() -> () {
    // ...
}
```
{% endbox %}
{% endgrid %}

`box` 是容器，相对 `note` 标签来说，它更灵活，可以放置任何内容。

{% quot 总结 icon:default %}
stellar 主题的标签确实非常丰富，还有很多高级的标签，没有再这里列举，可以看出作者的审美能力和开发主题投入的大量精力；写作博客其实是相对简单的需求，没想到作者能从中提取出这么多实用的功能，从各方面来说都很值得学习。

之所以花时间去过一遍标签的用法，因为这能大大增强文章的层次结构和阅读体验。

{% note 题外话 hexo主题琳琅满目，对移动端非常友好是我喜欢stellar主题的主要原因  color:cyan %}