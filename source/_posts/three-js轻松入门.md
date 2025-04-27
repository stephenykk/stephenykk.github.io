---
title: three.js轻松入门
banner: /images/banner_camera.jpg
cover: /images/banner_desk.jpg
date: 2025-04-10 16:39:51
tags: 
    - three.js
    - Canvs
categories: Canvas
---


本文使用原生三件套的方式去学习 `Three.js`。是一篇面向小白的笔记~

[Three.js 官网](https://threejs.org/ "https://threejs.org/")


## 下载 Three.js

[Three.js GitHub地址](https://github.com/mrdoob/three.js "https://github.com/mrdoob/three.js")

通过上面的地址，可以下载 `Three.js`

![01.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27e3894fd6cd40d39c9f5c48868d20b9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这是下载下来解压后的文件

  
  

## 创建项目

我习惯使用 `vs code` 编写前端代码，如果是用原生三件套学习，我还会使用 `Live Server` 插件辅助开发。

![02.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dadbc90403c2411f84de0919d98ada65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

  

创建 `Three-study-demo` 目录，用来存放本例代码。

目录如下所示

```bash
- /Three-study-demo
  |- /js
    |- Three
      |- Three下载下来的包，把src里的东西搬过来
  |- /01起步
    |- index.html

```

  

把刚刚从 [Three.js](https://github.com/mrdoob/three.js "https://github.com/mrdoob/three.js") 下载下来的包解压后，找到 `src/Three.js` ，并将其复制到 `Three-study-demo/js` 里

![03.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52ce82e10c1746f4a802e40bfbd2d48e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

项目到此就算创建好了。

  
  

## 引入 Three.js

在 `vs code` 里打开 `index.html` ，然后引入 `Three.js`

```html
<script type="module">
  import * as THREE from "../js/Three/Three.js"
</script>
```

注意，上面的 `script` 标签中使用了 `type="module"` ，在写本文时 `Chrome` 已经支持这种写法，这种写法允许我们使用 `import` 的方式引入第三方包。

  

右键，选择 `Open with Live Server` 运行该页面。

![04.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f92e608d09b42c4ae0623d93c43dbb4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`Live Server` 这个插件每当你保存时，页面都会自动刷新。减少很多手动操作。

  
  

## 基础概念

在学习 `Three.js` 前，需要了解几个概念，毕竟是 3D 库。

| 属性名称 | 描述 |
| --- | --- |
| 场景(Scene) | 是物体、光源等元素的容器，可以配合 `chrome` 插件使用，抛出 `window.scene` 即可实时调整 obj 的信息和材质信息。 |
| 相机(Camera) | 场景中的相机，代替人眼去观察，场景中只能添加一个，一般常用的是透视相机(`PerspectiveCamera`)。 |
| 物体对象(Mesh) | 包括二维物体（点、线、面）、三维物体、模型等等。 |
| 光源(Light) | 场景中的光照，如果不添加光照场景将会是一片漆黑，包括全局光、平行光、点光源等。 |
| 渲染器(Renderer) | 场景的渲染方式，如 `WebGL`、`canvas2D`、`css3D`。 |
| 控制器(Control) | 可通过键盘、鼠标控制相机的移动。 |

  

除了上面这些属性，还有 **材质** 、**音频** 、**动画** 等其他知识点。这些后面会讲到。

对于刚起步的同学来讲，先让浏览器有点东西显示出来才是最重要的。

  

**所以只需大概理解以下几个属性就能在浏览器渲染出东西：**

-   场景：用来放物体、光源等元素的容器。
-   相机：相当于你的眼睛，相机拍摄到的东西就是你看到的东西。
-   物体对象：就是物体，对应真实世界的苹果香蕉之类的东西。
-   渲染器：将相机拍摄下来的图片，放到浏览器中去显示。

  
  

## 起步

了解上面所说的 **基础概念** 后，我们根据 [官方文档](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene "https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene") 上面的案例创建出第一个场景。

本文的第一个场景会比 `Three.js` 官网上的更加简单，步骤如下：

1.  创建 `HTML` 容器，用来绑定画布的。
2.  创建一个**场景**，用来放物体。
3.  创建一个**相机**，代表我们的眼睛去看东西。
4.  创建一个**物体**，不然没东西看了。
5.  创建一个**渲染器**，并把场景和相机放到渲染器里渲染，最后将渲染器添加到页面中。
6.  让物体**动起来**。

  

代码将根据上面 **6个步骤** 进行

```html
<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>

<!-- 【步骤1】 -->
<div id="canvasBox"></div>

<!-- 引入Three.js -->
<!-- 注意这里有个 module -->
<script type="module">
  /**
   * 引入相关要素
   */
  import {
    Scene, // 场景
    PerspectiveCamera, // 相机
    WebGLRenderer, // 渲染器
    // 下面3个都是创建“物体”需要的要素，等下用到的时候会逐一解释
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
  } from "../js/Three/Three.js"


  // 【步骤2】
  // 场景对象
  // 场景是一个容器，主要用于保存、跟踪所要渲染的物体和使用的光源
  // 如果没有场景对象就无法渲染任何物体
  const scene = new Scene()


  // 【步骤3】
  // 透视相机
  // 摄像机决定了能够在场景中看到什么
  // 我们基于摄像机的角度来计算场景对象在浏览器中会渲染成什么样子
  // 第一个参数：视野角度（FOV）。视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。
  // 第二个参数：宽高比
  // 第三个参数：近截面（near）
  // 第四个参数：远截面（far）
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)


  // 【步骤4】
  // 创建一个立方几何体
  const geometry = new BoxGeometry()
  // 材质
  const material = new MeshBasicMaterial({ color: 0x002299 })
  // 组合立方几何体和材质，创建出一个新的网格对象
  const cube = new Mesh(geometry, material)
  
  // 将立方体网格追加到场景中
  scene.add(cube)

  // 设置摄像机在z轴上的距离（也就是在屏幕上的距离）
  camera.position.z = 5


  // 【步骤5】
  // 创建渲染器
  const renderer = new WebGLRenderer()

  // 设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 将渲染器添加到div中
  document.getElementById('canvasBox').appendChild(renderer.domElement)


  // 【步骤6】
  // 通过修改 cube 的 rotation 的属性，改变立方体的角度。最后再不断刷新画布做出动画效果。
  function animate() {
    requestAnimationFrame( animate )

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // 将场景和摄像机传入到渲染器中
    renderer.render( scene, camera )
  }

  // 执行动画函数
  animate()
</script>
```

![05.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d63843cde054931aaf05ebb52c32ab4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

  

第一次敲代码，先别管那些 `api` 的详细用法。先理解上面说到的 **6个步骤** 。

如果你不想显示动画，也可以把 `animate` 函数删掉，直接写 `renderer.render( scene, camera )` 即可。

  

**有场景，有相机，有物体，有渲染器。存在这4个，页面就会有东西显示。**

  

跟着敲两遍，之后再看看 [官方示例](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene "https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene") ，深入理解下每个 `api` 的用法。你就算是入门了 `Three.js` 。

  