---
title: 聊聊canvas绘图状态管理
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-04-08 12:34:04
tags: Canvas
categories: Canvas
---

## 本文简介


`canvas` 绘图时会根据当前状态来绘制。很多的 `canvas` 库都利用到这一特性。比如 `p5.js` 利用了 `canvas` 状态特性衍生出 `push` 和 `pop` 函数实现状态隔离（既然提到了，下一篇就讲这个）。

有兴趣了解 `p5.js` 的工友推荐阅读 [《p5.js光速入门》](https://juejin.cn/post/7173451612654927908 "https://juejin.cn/post/7173451612654927908")。

  

## 什么是 Canvas 状态

`canvas` 是根据状态来绘图的。所谓的状态就是指当前画布正在使用什么填充色(`fill`)、什么描边色(`stroke`) 等样式。

比如当前的填充色(`fill`) 是红色，接下来所有图形的填充色都会是红色。

如果想在某一刻恢复到指定的填充色，就可以使用 `canvas` 提供的状态机制来实现了。

  
  

## 使用方法

`canvas` 提供了 `save()` 和 `restore()` 两个方法去操作状态。这两个方法通常也会成对出现。

-   `save()`: “打标记”，记录当前状态
-   `restore()`: 恢复到 `save()` 记录的状态

  

举个例子

![01.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3c769fdf48a478ab6e1cf1a3e2e62e8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.fillStyle = 'red' // 设置填充色为红色
  ctx.strokeStyle = 'blue' // 设置描边色为蓝色
  ctx.lineWidth = 6 // 描边宽度 6

  ctx.save() // 保存当前状态

  // 第一个矩形
  ctx.rect(10, 10, 100, 60)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = 'pink' // 设置填充色为粉色
  ctx.strokeStyle = 'green' // 设置描边色为绿色
  ctx.lineWidth = 10 // 描边宽度 10

  ctx.beginPath()
  // 第二个矩形
  ctx.rect(140, 10, 100, 60)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = 'orange' // 设置填充色为橙色
  ctx.strokeStyle = 'hotpink' // 设置描边色为亮粉
  ctx.lineWidth = 2 // 描边宽度 2

  ctx.beginPath()
  // 第三个矩形
  ctx.rect(10, 100, 100, 60)
  ctx.fill()
  ctx.stroke()

  ctx.restore() // 恢复到之前保存的状态

  ctx.beginPath()
  // 第四个矩形
  ctx.rect(140, 100, 100, 60)
  ctx.fill()
  ctx.stroke()
</script>
```

从上面的例子可以看出，经过几轮的样式修改，在绘制第四个矩形时，想使用第一个矩形的样式，只需要在设置完第一个矩形的样式时使用 `save()` 做个标记，之后再使用 `restore()` 恢复一下即可。

  

需要注意的是，每次绘制矩形之前都需要使用 `beginPath()` 告诉 `canvas` 要重新绘制了。不然前面所绘制的矩形会被后面设置的样式覆盖掉。这个“问题”在 [《Canvas 从进阶到退学》](https://juejin.cn/post/7176055713733541943 "https://juejin.cn/post/7176055713733541943") 里也有讲到，有兴趣的工友可以去瞧瞧。

  

`canvas` 状态可以将裁剪区域还原到指定状态，可以将变形的画布还原到指定状态，还可以将大部分样式还原到指定状态。有兴趣的工友可以自己动手尝试一下~

  
  

## 代码仓库

⭐[雷猴 Canvas](https://gitee.com/k21vin/thunder-monkey-canvas "https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fk21vin%2Fthunder-monkey-canvas")

  
  

## 推荐阅读

👍[《Canvas 从入门到劝朋友放弃（图解版）》](https://juejin.cn/post/7116784455561248775 "https://juejin.cn/post/7116784455561248775")

👍[《Canvas 从进阶到退学》](https://juejin.cn/post/7176055713733541943 "https://juejin.cn/post/7176055713733541943")

👍[《Canvas 10款基础滤镜（原理篇）》](https://juejin.cn/post/7119893640264024071 "https://juejin.cn/post/7119893640264024071")

👍[《p5.js 光速入门》](https://juejin.cn/post/7173451612654927908 "https://juejin.cn/post/7173451612654927908")

👍[《Fabric.js 从入门到膨胀》](https://juejin.cn/post/7026941253845516324 "https://juejin.cn/post/7026941253845516324")

👍[《前端需要的免费在线api接口》](https://juejin.cn/post/7041461420818432030 "https://juejin.cn/post/7041461420818432030")

  

