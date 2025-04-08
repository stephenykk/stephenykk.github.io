---
title: canvas进阶知识图解
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-04-08 11:29:00
tags: Canvas
categories: Canvas
---

## 本文简介


本文会涉及到 `canvas` 的知识包括：变形、像素控制、渐变、阴影、路径

  
## 变形

这里说的变形是基于画布，全局进行变形。

变形主要包括：`平移 translate`、`缩放 scale`、`旋转操作 rotate`。

除了对应的方法外，还可以使用 `transform` 和 `setTransform` 对上面三种操作进行配置，这称为“变换矩阵”。

  

在学习“变形”之前，需要了解 `W3C坐标系`：

![01.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d90106e58719454580a38194625c6c6d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

箭头所指是各轴自己的正方向，x轴越往右（正方向）值越大，y轴越往下（正方向）值越大。

  

### 平移

使用 `translate()` 方法可以实现平移效果（位移）。

`translate(x, y)` 接收2个参数，第一个参数代表x轴方向位移距离，第二个参数代表y轴方向位移距离。

正数代表向正方向位移，负数代表向反方向位移。

  

演示平移效果之前，我先创建一个矩形，长宽都是100，位置在画布的原点 (0, 0) ，也就是紧贴画布的左上角。

![02.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70169c8418434eb9ae14533a3703c9e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 紧贴原点的矩形，默认是黑色[]
  ctx.fillRect(0, 0, 100, 100)
</script>
```

  

如果此时在 `fillRect` 之前设置 `translate` 就可以实现整个画布位移的效果。

![03.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8b311c7f1fc4ae7a039bf8b7c2ea066~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
// 省略部分代码

// 平移，往右平移10，往下平移20
ctx.translate(10, 20)

// 渲染矩形
ctx.fillRect(0, 0, 100, 100)
```

从上图可以看出，矩形距离画布顶部的距离是20，距离画布左侧的距离是10。

  

**注意：`平移 translate()` 要写在 “绘制操作(本例是 `fillRect`)” 之前才有效。**

  

如果在使用 `translate` 的前后都有渲染操作，画布会多次渲染，并不会自动清屏。

比如这样

![04.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/611cfeb7500345c9b5eb124b79dcb5ba~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.fillRect(0, 0, 100, 100)

  ctx.translate(10, 20)

  ctx.fillRect(0, 0, 100, 100)
</script>
```

  

再做个明显点的效果，每秒平移一次

![05.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f590b372901241dca30d9d6864a39cb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.fillRect(0, 0, 100, 100)

  setInterval(() => {
    ctx.translate(10, 20)
    ctx.fillRect(0, 0, 100, 100)
  }, 1000)

</script>
```

可以看出，每次使用 `translate()` 平移画布，都会基于上一次画布所在的位置进行平移。

  

上图效果是 `canvas` 的默认效果，所以在执行 `translate` 之前可以执行 [“清屏操作”](https://juejin.cn/post/7116784455561248775#heading-29 "https://juejin.cn/post/7116784455561248775#heading-29")。

  

### 清屏

![06.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a87f79acfa9456687f6b3fe5d86cb65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.fillRect(0, 0, 100, 100)

  setInterval(() => {
    ctx.clearRect(0, 0, context.width, context.height)
    ctx.translate(10, 20)
    ctx.fillRect(0, 0, 100, 100)
  }, 1000)

</script>
```

  

### 缩放

缩放画布用到的方法是 `scale(x, y)` ，接收2个参数，第一个参数是x轴方向的缩放，第二个参数是y轴方向的缩放。

当 `x` 或者 `y` 的值是 `0 ~ 1` 时代表缩小，比如取值为 0.5 时，表示比原本缩小一半；值为2时，比原本放大一倍。

![07.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/182eb5559d17460cadaf66e163bd3eb0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.font = '60px Arial'
  ctx.strokeStyle = 'hotpink'
  ctx.strokeText('雷猴', 40, 100)

  // 缩小
  ctx.scale(0.5, 0.5)
  
  // 重新渲染
  ctx.strokeText('雷猴', 40, 100)
</script>
```

`scale()` 方法同样会保留原本已经渲染的内容。

如果不需要保留原本内容，可以使用 [“清屏操作”](https://juejin.cn/post/7116784455561248775#heading-29 "https://juejin.cn/post/7116784455561248775#heading-29")。

**注意：`scale()` 会以上一次缩放为基准进行下一次缩放。**

  

**副作用：**

其实从上面的例子就可以看出 `scale()` 存在一点副作用的，从图中可以看出，缩放后文本的左上角坐标发生了“位移”，文本描边粗细也发生了变化。

虽然说是副作用，但也很容易理解，整块画布缩放了，对应的坐标比例其实也跟着缩放嘛。

  

### 旋转

使用 `rotate(angle)` 方法可以旋转画布，但默认的旋转原点是画布的左上角，也就是 `(0, 0)` 坐标。

我计算旋转角度通常是用 `角度 * Math.PI / 180` 的方式表示。

虽然这样书写代码看上去很长，但习惯后就比较直观的看出要旋转多少度。

`rotate(angle)` 中的参数 `angle` 代表角度，`angle` 的取值范围是 `-Math.PI * 2 ~ Math.pi * 2`。

当旋转角度小于 0 时，画布逆时针旋转；反之顺时针旋转。

![08.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe385fa52a174928a80020a9a492a7ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.font = '60px Arial'
  ctx.strokeStyle = 'pink'
  ctx.strokeText('雷猴', 40, 100)

  // 旋转 45°
  ctx.rotate(45 * Math.PI / 180)
  
  // 重新渲染
  ctx.strokeText('雷猴', 40, 100)
</script>
```

  

### 修改原点

如果需要修改旋转中心，可以使用 `translate()` 方法平移画布，通过计算移动到指定位置。

![09.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a446d9c4cc945d2abe860de6d93534b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.font = '60px Arial'
  ctx.strokeStyle = 'pink'
  ctx.strokeText('雷猴', 40, 100)

  // 设置旋转中心
  ctx.translate(90, -50)

  // 旋转
  ctx.rotate(45 * Math.PI / 180)
  
  // 重新渲染
  ctx.strokeText('雷猴', 40, 100)
</script>
```

  

### 变换矩阵

变换矩阵常用方法有 `transform()` 和 `setTransform()` 两个方法。

变换矩阵是一个稍微进阶一点的知识了，别怕！

前面的 `平移 translate`、`缩放 scale`、`旋转操作 rotate` 可以说都是 `transform()` 的 “语法糖”。

变换矩阵已经涉及到一点数学知识了，但本文不会讲到这些知识，只会讲讲 `transform()` 是怎么用的。

  

#### transform

`transform()` 一个方法就可以实现 **平移、缩放、旋转** 三种功能，它接收6个参数。

`transform(a, b, c, d, e, f)`

-   `a`: 水平缩放（x轴方向），默认值是 1；
-   `b`: 水平倾斜（x轴方向），默认值是 0；
-   `c`: 垂直倾斜（y轴方向），默认值是 0；
-   `d`: 垂直缩放（y轴方向），默认值是 1；
-   `e`: 水平移动（x轴方向），默认值是 0；
-   `f`: 垂直移动（y轴方向），默认值是 0；

  

这默认值看上去很乱，但如果这样排列一下是不是就比较容易理解了：

(acebdf001)\\begin{pmatrix}a & c & e \\\\\\\\ b & d & f \\\\\\\\ 0 & 0 & 1 \\end{pmatrix}⎝⎛​ab0​cd0​ef1​⎠⎞​

  

随便修改几个值试试效果：

![10.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fab9499235a047fa86864a44ffa2847b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="400" height="400" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 变换矩阵
  ctx.transform(1, 1, 1, 2, 30, 40)

  // 绘制矩形
  ctx.fillRect(10, 10, 100, 100)
</script>
```

  

#### setTransform

`setTransform(a, b, c, d, e, f)` 同样接收6个参数，和 `transform()` 一样

![11.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c17e2c4193b4e2e9db4d7dd0bbc9478~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="400" height="400" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 变换矩阵
  ctx.setTransform(2, 1, 1, 2, 20, 10)

  // 绘制矩形
  ctx.fillRect(10, 10, 100, 100)
</script>
```

  

#### transform 和 setTransform 的区别

`transform()` 每次执行都会参考上一次变换后的结果

比如下面这个多次执行的情况：

![12.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc83f734407141be8ae389ce17d5369b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="400" height="400" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')
  
  ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'
    
  ctx.fillRect(10, 10, 100, 100)

  ctx.transform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

  ctx.transform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

  ctx.transform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

  ctx.transform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

</script>
```

  

而 `setTransform()` 每次调用都会基于最原始是状态进行变换。

![13.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3befac289d644e54b00eb051e0c04d2c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="400" height="400" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'

  ctx.fillRect(10, 10, 100, 100)

  ctx.setTransform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

  ctx.setTransform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

  ctx.setTransform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

  ctx.setTransform(1, 0, 0, 1, 10, 10)
  ctx.fillRect(10, 10, 100, 100)

</script>
```

不管改变多少次，`setTransform()` 都会参考原始状态进行变换。

  
  

## 控制像素

位图是由像素点组成的，`canvas` 提供了几个 `api` 可以操作图片中的像素。

很多工具网站也常用接下来说到的几个 `api` 做图片滤镜。

  

**需要注意的是，`canvas` 提供的操作像素的方法，必须使用服务器才能运行起来，不然没有效果的。**

可以搭建本地服务器运行本文案例，方法有很多种。

比如你使用 `Vue` 或者 `React` 的脚手架搭建的项目，运行后就能跑起本文所有案例。

又或者使用 `http-server` 启动本地服务。

  

### getImageData()

首先要介绍的是 `getImageData()` 方法，这个方法可以获取指定区域内的所有像素。

  
`getImageData(x, y, width, height)` 接收4个参数，这4个参数表示选区范围。

`x` 和 `y` 代表选区的左上角坐标，`width` 表示选区宽度，`height` 表示选区高度。

  

还是举例说明比较清楚。下图渲染到画布上的是我的猫_Bubble_。

![14.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34efd94414d5458c9902cffe32d71eb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="400" height="400" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const img = new Image() // 创建图片对象
  img.src = './bubble.jpg' // 加载本地图片

  // 图片加载完成后在执行其他操作
  img.onload = () => {
    // 渲染图片
    ctx.drawImage(img, 0, 0)
    // 获取图片信息
    const imageData = ctx.getImageData(0, 0, img.width, img.height)
    console.log(imageData)
  }

</script>
```

打印出来的信息可以点开大图看看

-   `data`: 图片像素数据集，以数组的形式存放，这是本文要讲的重点，需要关注！
-   `colorSpace`: 图片使用的色彩标准，这个属性在 `Chrome` 里有打印出来，`Firefox` 里没打印。不重要~
-   `height`: 图片高度
-   `width`: 图片宽度

  

通过 `getImageData()` 获取到的信息中，需要重点关注的是 `data` ，它是一个一维数组，仔细观察发现里面的值没一个是大于255的，也不会小于0。

![15.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f4ed87f8b994624aa19f9002e85cd16~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

其实 `data` 属性里记录了图片每个像素的 `rgba` 值分别是多少。

-   `r` 代表红色
-   `g` 代表绿色
-   `b` 代表蓝色
-   `a` 透明度

  

这个和 `CSS` 里的 `rgba` 是同一个意思。

**`data` 里，4个元素记录1个像素的信息。也就是说，1个像素是由 `r`、`g`、`b`、`a` 4个元素组成。而且每个元素的取值范围是 0 - 255 的整数。**

```auto
 data: **[r1, g1, b1, a1, r2, g2, b2, a2, ......]** 
```

| 像素点 | 值 | 颜色通道 |
| --- | --- | --- |
| `imgData.data[0]` | 49 | 红色 r |
| `imgData.data[1]` | 47 | 绿色 g |
| `imgData.data[2]` | 51 | 蓝色 b |
| `imgData.data[3]` | 255 | 透明度 a |
| …… | …… | …… |
| `imgData.data[n-4]` | 206 | 红色 r |
| `imgData.data[n-2]` | 200 | 绿色 g |
| `imgData.data[n-3]` | 200 | 蓝色 b |
| `imgData.data[n-1]` | 255 | 透明度 a |

  

如果一张图只有10个像素，通过 `getImageData()` 获取到的 `data` 信息中就有40个元素。

  

### putImageData()

`putImageData(imageData, x, y)` 可以将 `ImageData` 对象的数据（图片像素数据）绘制到画布上。

`putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` 也可以接收更多参数。

-   `imageData`: 规定要放回画布的 `ImageData` 对象
-   `x`: `ImageData` 对象左上角的 x 坐标，以像素计
-   `y`: `ImageData` 对象左上角的 y 坐标，以像素计
-   `dirtyX`: 可选。水平值（x），以像素计，在画布上放置图像的位置
-   `dirtyY`: 可选。水平值（y），以像素计，在画布上放置图像的位置
-   `dirtyWidth`: 可选。在画布上绘制图像所使用的宽度
-   `dirtyHeight`: 可选。在画布上绘制图像所使用的高度

  

比如，我要将图片复制到另一个位置

![16.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/141f958df67c4a6da0ce1c3254007ccb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="500" height="500" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const img = new Image() // 创建图片对象
  img.src = './bubble.jpg' // 加载本地图片

  // 图片加载完成后在执行其他操作
  img.onload = () => {
    // 渲染图片
    ctx.drawImage(img, 0, 0)
    // 获取图片信息
    const imageData = ctx.getImageData(0, 0, img.width, img.height)

    // 将图片对象输出到 (100, 100) 的位置上
    ctx.putImageData(imageData, 100, 100)
  }

</script>
```

可以实现复制的效果。

  

### 透明

知道前面两个 `api` 就可以实现透明效果了。

前面讲到，通过 `getImageData()` 获取的是一个数组类型的数据，每4个元素代表1个像素，就是`rgba`，而 `a` 表示透明通道，所以只需修改每组像素的最后1个元素的值，就能修改图片的不透明度。

![17.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54cc6643e82c440790f294e60a7e93ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="500" height="500" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const img = new Image() // 创建图片对象
  img.src = './bubble.jpg' // 加载本地图片

  // 图片加载完成后在执行其他操作
  img.onload = () => {
    // 渲染图片
    ctx.drawImage(img, 0, 0)
    // 获取图片信息
    const imageData = ctx.getImageData(0, 0, img.width, img.height)

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 3] = imageData.data[i + 3] * 0.5
    }

    // 将图片对象输出到 (100, 100) 的位置上
    ctx.putImageData(imageData, 100, 100)
  }

</script>
```

  

### 滤镜

要做不同的滤镜效果，其实就是通过不同的算法去操作每个像素的值，我在 [《Canvas 10款基础滤镜（原理篇）》](https://juejin.cn/post/7119893640264024071 "https://juejin.cn/post/7119893640264024071") 讲到相关知识，有兴趣的工友可以[点进去看看](https://juejin.cn/post/7119893640264024071 "https://juejin.cn/post/7119893640264024071")

  
  

## 渐变

在 `css` 和 `svg` 里都有渐变，`canvas` 肯定也不会缺失这个能力啦。

`canvas` 提供了 **线性渐变 `createLinearGradient`** 和 **径向渐变 `createRadialGradient`**。

  

### 线性渐变 createLinearGradient

在 `canvas` 中使用线性渐变步骤如下：

1.  创建线性渐变对象: `createLinearGradient(x1, y1, x2, y2)`
2.  添加渐变颜色: `addColorStop(stop, color)`
3.  设置填充色或描边颜色: `fillStyle` 或 `strokeStyle`

  

**createLinearGradient(x1, y1, x2, y2)**

在 `createLinearGradient(x1, y1, x2, y2)` 中，`x1, y1` 表示渐变的起始位置，`x2, y2` 表示渐变的结束位置。

比如水平方向的从左往右的线性渐变，此时的 `y1` 和 `y2` 的值是一样的。

![18.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af28ca6ac4fd417d8bd2474345f39f90~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

两个点就可以确定一个渐变方向。

  

**addColorStop(stop, color)**

`addColorStop(stop, color)` 方法可以添加渐变色。

第一个参数 `stop` 表示渐变色位置的偏移量，取值范围是 0 ~ 1。

第二个参数 `color` 表示颜色。

  

#### 填充渐变

实际编码演示一下

![19.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26feab0f63114394be1bdbf9c2a4255e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 1. 创建线性渐变对象
  const lgrd = ctx.createLinearGradient(10, 10, 200, 10)

  // 2. 添加渐变颜色
  lgrd.addColorStop(0, 'pink')
  lgrd.addColorStop(1, 'yellow')

  // 设置填充色
  ctx.fillStyle = lgrd

  // 创建矩形，填充
  ctx.fillRect(10, 10, 200, 200)
</script>
```

  

如果想修改渐变的方向，只需在使用 `createLinearGradient()` 时设置好起点和终点坐标即可。

  

除了填充色，描边渐变和文本渐变同样可以做到。

#### 描边渐变

![20.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7f26f374b7e4f95b03fde0fd3c8a6cc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const lgrd = ctx.createLinearGradient(10, 10, 200, 10)

  lgrd.addColorStop(0, 'pink')
  lgrd.addColorStop(1, 'yellow')

  ctx.strokeStyle  = lgrd
  ctx.lineWidth = 10
  ctx.strokeRect(10, 10, 200, 200)

</script>
```

  

#### 文本渐变

![21.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92509dc9758d484eb8468b3af31fb60c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const lgrd = ctx.createLinearGradient(10, 10, 200, 10)

  lgrd.addColorStop(0, 'pink')
  lgrd.addColorStop(1, 'yellow')

  const text = '雷猴'
  ctx.font = 'bold 100px 黑体'
  ctx.fillStyle = lgrd
  ctx.fillText(text, 10, 100)
</script>
```

  

#### 多色线性渐变

在 0 ~ 1 的范围内，`addColorStop` 可以设置多个颜色在不同的位置上。

![22.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4428ec0c24c426cbf7464fd3e7e59ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
// 省略部分代码
lgrd.addColorStop(0, '#2a9d8f') // 绿色
lgrd.addColorStop(0.5, '#e9c46a') // 黄色
lgrd.addColorStop(1, '#f4a261') // 橙色
```

  

### 径向渐变 createRadialGradient

径向渐变是从一个点到另一个点扩散出去的渐变，是圆形（椭圆也可以）渐变。

直接看效果

![23.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbc996c9465846da8dc3bd13929c0587~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const rgrd = ctx.createRadialGradient(70, 70, 0, 70, 70, 60)
  rgrd.addColorStop(0, 'yellow')
  rgrd.addColorStop(1, 'pink')
  ctx.fillStyle = rgrd

  ctx.fillRect(10, 10, 120, 120)
</script>
```

用 `createRadialGradient` 可以创建一个径向渐变的对象。使用步骤和 `createLinearGradient` 一样，但参数不同。

`createRadialGradient(x1, y1, r1, x2, y2, r2)`

-   `x1, y1`: 渐变开始的圆心坐标
-   `r1`: 渐变开始的圆心半径
-   `x2, y2`: 渐变结束的圆心坐标
-   `r2`: 渐变结束的圆心半径

  

同样使用 `addColorStop` 设置渐变颜色，同样支持多色渐变。

  

### 渐变的注意事项

渐变的定位坐标是参照画布的，超出定位的部分会使用最临近的那个颜色。

我用线性渐变举例。

![24.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f26dbd82bd0a457896da5bc6343e6a30~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="600" height="600" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  const lgrd = ctx.createLinearGradient(200, 0, 400, 400)

  lgrd.addColorStop(0, 'pink')
  lgrd.addColorStop(1, 'yellow')

  ctx.fillStyle = lgrd

  ctx.fillRect(10, 10, 160, 160)

  ctx.fillRect(220, 10, 160, 160)

  ctx.fillRect(430, 10, 160, 160)

  ctx.fillRect(10, 210, 160, 160)

  ctx.fillRect(220, 210, 160, 160)

  ctx.fillRect(430, 210, 160, 160)

  ctx.fillRect(10, 430, 160, 160)

  ctx.fillRect(220, 430, 160, 160)

  ctx.fillRect(430, 430, 160, 160)

</script>
```

上面的例子中，我只创建了一个渐变，然后创建了9个正方形。

此时正方形的填充色取决于出现在画布中的位置。

可以修改一下 `createLinearGradient()` 的定位数据对照理解。

![25.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5893892d88fe4d958647023131db6ab9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
// 省略部分代码
const lgrd = ctx.createLinearGradient(200, 0, 400, 400)
```

  

如果想每个图形都有自己的渐变色，这需要定制化配置，每个创建每个图形之前都单独创建一个渐变色。

![26.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd6870f4c11b4f9da080cdb67e30ad87~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="600" height="600" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 粉 - 黄 渐变
  const lgrd1 = ctx.createLinearGradient(10, 10, 160, 160)
  lgrd1.addColorStop(0, 'pink')
  lgrd1.addColorStop(1, 'yellow')
  ctx.fillStyle = lgrd1
  ctx.fillRect(10, 10, 160, 160)

  // 橘黄 - 蓝紫 渐变
  const lgrd2 = ctx.createLinearGradient(210, 10, 380, 160)
  lgrd2.addColorStop(0, 'bisque')
  lgrd2.addColorStop(1, 'blueviolet')
  ctx.fillStyle = lgrd2
  ctx.fillRect(220, 10, 160, 160)
</script>
```

  

所以不管是填充色还是秒变颜色，每个元素最好都自己重新设定一下。不然可能会出现意想不到的效果~

  
  

## 阴影

阴影在前端也是很常用的特效。 ~依稀记得当年还用 `png` 做阴影效果~。

在 `canvas` 中，和阴影相关的属性主要有以下4个：

-   `shadowOffsetX`: 设置或返回阴影与形状的水平距离。默认值是0。大于0时向正方向偏移。
-   `shadowOffsetY`: 设置或返回阴影与形状的垂直距离。默认值是0。大于0时向正方向偏移。
-   `shadowColor`: 设置或返回用于阴影的颜色。 默认黑色。
-   `shadowBlur`: 设置或返回用于阴影的模糊级别。 默认值是0，数值越大模糊度越强。

  

相信使用过 `css` 阴影属性的工友，理解起 `canvas` 阴影也会非常轻松。

![27.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c9085fbd2cb428e9018d4473d359644~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.shadowOffsetX = 10 // x轴偏移量
  ctx.shadowOffsetY = 10 // y轴偏移量
  ctx.shadowColor = '#f38181' // 阴影颜色
  ctx.shadowBlur = 10 // 阴影模糊度，默认0

  ctx.fillStyle = '#fce38a' // 填充色
  ctx.fillRect(30, 30, 200, 100)

  console.log(ctx.shadowOffsetX) // 输出阴影x轴方向的偏移量：10
</script>
```

  

除了图形外，文本和图片都可以设置阴影效果。

![28.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dd42fc3b35a4b8c8498ff5365bcdf96~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.shadowOffsetX = 10 // x轴偏移量
  ctx.shadowOffsetY = 10 // y轴偏移量
  ctx.shadowColor = '#b83b5e' // 阴影颜色
  ctx.shadowBlur = 10 // 阴影模糊度，默认0

  const text = '雷猴'
  ctx.font = 'bold 100px 黑体'
  ctx.fillStyle = '#fce38a'
  ctx.fillText(text, 10, 100)
</script>
```

  
  

## 路径

在 [Canvas 从入门到劝朋友放弃（图解版） —— 新开路径](https://juejin.cn/post/7116784455561248775#heading-17 "https://juejin.cn/post/7116784455561248775#heading-17") 中我讲到 **新开路径** 和 **关闭路径** 的用法，本节会在上篇的基础上丰富更多使用细节。

本节要讲的是

-   `beginPath()`: 新开路径
-   `closePath()`: 关闭路径
-   `isPointInPath()`: 判断某个点是否在当前路径内

  

### beginPath()

`beginPath()` 方法是用来开辟一条新的路径，这个方法会将当前路径之中的所有子路径都清除掉，以此来重置当前路径。

  

如果你的画布上有几个基础图形（直线、多边形、圆形、弧、贝塞尔曲线），如果样式相互之间受到影响，那你可以立刻想想在绘制新图形之前是不是忘了使用 `beginPath()` 。

先举几个例子说明一下。

  

#### 污染：颜色、线条粗细受到污染

后面的样式覆盖了前面的样式。

![29.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15212edac5c348c289b2446910628fac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 第一条线，粉色
  ctx.moveTo(50, 40)
  ctx.lineTo(150, 40)
  ctx.strokeStyle = 'pink' // 粉色描边
  ctx.stroke()

  // 第二条线，红色
  ctx.moveTo(50, 80)
  ctx.lineTo(150, 80)
  ctx.strokeStyle = 'red' // 红色描边
  ctx.lineWidth = 10 // 表面粗细
  ctx.stroke()
</script>
```

  

#### 污染：图形路径污染

比如画布上有一条直线和一个圆形，不使用 `beginPath()` 开辟新路径的话，它们可能会“打架”。

![30.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34b1f5b9857548469d5879814b3280a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 第一条线，粉色
  ctx.moveTo(50, 40)
  ctx.lineTo(150, 40)
  ctx.strokeStyle = 'pink' // 粉色描边
  ctx.stroke()

  // 圆形
  ctx.arc(150, 120, 40, 0, 360 * Math.PI / 180)
  ctx.lineWidth = 4
  ctx.stroke()
</script>
```

明明直线和圆形是没有交集的，为什么会有一条倾斜的线把两个元素连接起来？

  

#### 解决办法

除了上面两种情况外，可能还有其他更加奇怪的情况（像极喝醉了假酒），都可以先考虑是不是要使用 `beginPath()` 。

比如这样做。

![31.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9221a812048d4f1cad73183e2fcd9291~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 第一条线，粉色
  ctx.moveTo(50, 40)
  ctx.lineTo(150, 40)
  ctx.strokeStyle = 'pink' // 粉色描边
  ctx.lineWidth = 10
  ctx.stroke()

  // 圆形
  ctx.beginPath() // 开辟新的路径
  ctx.arc(150, 120, 40, 0, 360 * Math.PI / 180)
  ctx.strokeStyle = 'skyblue' // 蓝色描边
  ctx.lineWidth = 4
  ctx.stroke()
</script>
```

在使用 `arc` 或者 `moveTo` 方法之前加上一句 `ctx.beginPath()` 就可以有效解决以上问题。

这个例子中，如果没用 `ctx.beginPath()` ，`canvas` 就会以为 线 和 圆形 都属于同一个路径，所以在画圆形时，下笔的时候就会把线的“结束点”和圆的“起点”相连起来。

  

`stroke()` 和 `fill()` 都是以最近的 `beginPath()` 后面所定义的状态样式为基础进行绘制的。

  

#### 注意事项

前面的样式会覆盖后面元素的默认样式，即使使用了 `beginPath()` 。

![32.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dab87c08c6be40b69fa183c81de735d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  // 第一条线，粉色
  ctx.moveTo(50, 40)
  ctx.lineTo(150, 40)
  ctx.strokeStyle = 'pink' // 粉色描边
  ctx.lineWidth = 10 // 表面粗细
  ctx.stroke()

  // 第二条线，红色
  ctx.beginPath()
  ctx.moveTo(50, 80)
  ctx.lineTo(150, 80)
  ctx.stroke()
</script>
```

第一条先设置了 `strokeStyle` 和 `lineWidth` ，第二条线并没有设置这两个属性，即使在绘制第二条线的开始时使用了 `ctx.beginPath()` ，第二条线也会使用第一条线的 `strokeStyle` 和 `lineWidth` 。除非第二条线自己也有设置这两个属性，不然就会沿用之前的配置项。

  

#### "特殊情况"

还要补充一个 “特殊情况”。

![33.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3732a0ba88284becbe5df9f4992022c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="300" style="border: 1px solid #ccc;"></canvas>

<script>
  const cnv = document.getElementById('c')
  const ctx = cnv.getContext('2d')

  // 第一条线，粉色
  ctx.moveTo(50, 30)
  ctx.lineTo(150, 30)
  ctx.strokeStyle = 'pink' // 粉色描边
  ctx.lineWidth = 10 // 描边粗细
  ctx.stroke()

  // 矩形
  ctx.strokeStyle = 'red' // 红色描边
  ctx.strokeRect(50, 50, 200, 100)
</script>
```

这个例子中，绘制矩形 `rect` 前并没有用 `beginPath()` ，但矩形的红色描边并没有影响直线的粉色描边。

其实还不止 `strokeRect()` ，还有 `fillRect()`、`strokeText()`、`fillText()` 都不会影响其他图形，这些方法都只会绘制图形，不会影响原本路径。

  

### closePath()

`closePath()` 方法可以关闭当前路径，它可以显示封闭某段开放的路径。这个方法常用于关闭圆弧路径或者由圆弧、线段创建出来的开放路径。

`closePath()` 是关闭路径，并不是结束路径。

关闭路径，指的是连接起点与终点，也就是能够自动封闭图形。

结束路径，指的是开始新的路径。

  

#### 基础用法

举个例子会更直观

![34.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/656ede2322784bfb92d289fcdb056307~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.moveTo(50, 40)
  ctx.lineTo(150, 40)
  ctx.lineTo(150, 140)
  ctx.stroke()
</script>
```

上面的代码通过 `moveTo` 和 `lineTo` 画了3个点，使用 `stroke()` 方法把这3个点连起来，就形成了上图效果。

但如果此时在 `stroke()` 前使用 `closePath()` 方法，最终出来的路径将自动闭合（将起点和终点连接起来）。

![35.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36bf6130afb249f8bc0b33bafa5da248~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
<canvas id="c" width="300" height="200" style="border: 1px solid #ccc;"></canvas>

<script>
  const context = document.getElementById('c')
  const ctx = context.getContext('2d')

  ctx.moveTo(50, 40)
  ctx.lineTo(150, 40)
  ctx.lineTo(150, 140)
  ctx.closePath() // 关闭路径
  ctx.stroke()
</script>
```

  

#### 注意事项

看到上面的例子后，可能有些工友会觉得使用 `ctx.lineTo(50, 40)` 连接回起点也有同样效果。

```auto
// 省略部分代码
ctx.moveTo(50, 40)
ctx.lineTo(150, 40)
ctx.lineTo(150, 140)
ctx.lineTo(50, 40)
ctx.stroke()
```

确实在描边为1像素时看上去效果是差不多的，但如果此时将 `lineWidth` 的值设置得大一点，就能看到明显区别。

![36.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/870b0b25b55d422e864a923dbab967b8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
// 省略部分代码
ctx.lineWidth = 10
ctx.moveTo(50, 40)
ctx.lineTo(150, 40)
ctx.lineTo(150, 140)
ctx.lineTo(50, 40) // 连接回起点
ctx.stroke()
```

如果用 `closePath()` 自动闭合路径的话，会出现以下效果

![37.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d619b92ec44b4b7680183619b7d5cb8d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

```auto
// 省略部分代码
ctx.lineWidth = 10
ctx.moveTo(50, 40)
ctx.lineTo(150, 40)
ctx.lineTo(150, 140)
ctx.closePath() // 关闭路径
ctx.stroke()
```

  
  

本文到此就完结了，但 `canvas` 的知识点还没完，还有很多很多，根本学不完的那种。

接下来 [本专栏](https://juejin.cn/column/7113168145912692773 "https://juejin.cn/column/7113168145912692773") 的文章会偏向于 **知识点 + 案例** 的方式讲解 `canvas` 。

  
  

## 代码仓库

⭐[雷猴 Canvas](https://gitee.com/k21vin/thunder-monkey-canvas "https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fk21vin%2Fthunder-monkey-canvas")


## 推荐阅读

👍[《Canvas 从入门到劝朋友放弃（图解版）》](https://juejin.cn/post/7116784455561248775 "https://juejin.cn/post/7116784455561248775")

👍[《Canvas 10款基础滤镜（原理篇）》](https://juejin.cn/post/7119893640264024071 "https://juejin.cn/post/7119893640264024071")

👍[《Fabric.js 从入门到膨胀》](https://juejin.cn/post/7026941253845516324 "https://juejin.cn/post/7026941253845516324")

👍[《『Three.js』起飞！》](https://juejin.cn/post/7101683178741432356 "https://juejin.cn/post/7101683178741432356")

👍[《p5.js 光速入门》](https://juejin.cn/post/7173451612654927908 "https://juejin.cn/post/7173451612654927908")

👍[《SVG 从入门到后悔，怎么不早点学起来（图解版）》](https://juejin.cn/post/7118985770408345630 "https://juejin.cn/post/7118985770408345630")

