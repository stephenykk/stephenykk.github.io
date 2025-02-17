---
title: 全面认识流行的SSR框架Nextjs
tags: 
- Nextjs
- SSR
categories: 
- Nextjs

---

## 简介
`Next.js` 是一个基于react的SSR框架, 构建全栈web应用. 我们只需专注于用react构建UI, `Next.js` 帮助我们做优化（SEO / 图片加载 / 页面性能等）, 并且提供了很多其他功能.

`Next.js`使用webpack作为构建工具, 并且默认配置好了TS、Eslint和tailwind.css.

## 特点
- 基于file-system的路由
- 客户端和服务端渲染
- 扩展fetch API, 简化数据请求
- 支持很多样式方案, 如: css module, tailwind css and css-in-js, sass
- 优化图片和脚本加载
- 全面支持TS

## 安装

创建next.js项目
```shell
npx create-next-app@latest my-app
```


## 路由
支持两种路由方式: **app router** 和 **pages router**

> app router 支持最新的react特性, 如 `server component`, `streaming` and `server actions`

项目结构示例:

![hierarchical folders](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-component-tree.png&w=1920&q=75)


在 Next.js version 13, 引入了全新的App Router，它是基于`React Server Components`实现的.
App Router 会把所有的代码都放在名为`app`文件夹中. `app` 文件夹可以和 `pages` 文件夹共同存在，允许我们将旧项目逐步地切换到新的 App Router。

![using two routing system](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnext-router-directories.png&w=1920&q=75)


默认地出于性能优化的考虑, `app`文件夹下的组件都是 `Server Components`，不过我们也可以在文件开头声明`use client`把组件变为`Client Components`.


### 文件夹和文件的作用

- `Folders` 用于定义路由. 如: `app/dashboard`
- `Files` 用于定义路由对应的UI, 如 `app/dashboard/layout.tsx` 和 `app/dashboard/page.tsx`


![route segment](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)


`page.js` 可以让当前文件夹被识别为路由，即可被公开访问

![public route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fdefining-routes.png&w=1920&q=75)

在这个例子中， `/dashboard/analytics` URL 不是可以公开访问的，因为它不包含`page.js`.

### Route Segments

每个文件夹代表一个 `route segment`. 每个 `route segment` 又对应 `URL Path`的一个 `segment`

![route segments](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)


### 嵌套路由
-  `{folder}/{subfolder}/page.tsx` 定义页面 (*page handler*)
-  `{folder}/{subfolder}/route.ts` 定义接口 (*api handler*)


![nest layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=1920&q=75)
![nest layout views](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=1920&q=75)


### 动态路由
 - `[folder]` 动态路由 
 - `[...folder]` catch-all 动态路由 
 - `[[...folder]]` optional catch-all 动态路由 

### 分组路由
`(folder)` 带括号的文件夹用于分组，对路由路径没有影响，在同一个分组下的页面可以共享一个layout, 可用分组路由根据业务模块组织代码文件

![route group](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-group-organisation.png&w=1920&q=75)

### 私有文件夹
`_folder` 带有下划线的文件夹, 里面的文件会被路由系统忽略，不会被识别为路由（即使包含 `page.tsx`）, 只能被其他文件引用。

### 并列路由
`@folder` （*文件夹名为slot名*) 定义并列路由, 可以在同一个layout下渲染多个页面

![parallel route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes.png&w=1920&q=75)

### 拦截路由
`(.)folder` `(..)folder` `(..)(..)folder`  `(...)floder` 拦截路由是指在当前页面通过`<Link>`跳转时, 若目标页面有对应的拦截路由，则会渲染该拦截路由下的page.

![intercept route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepting-routes-soft-navigate.png&w=1920&q=75)
![intercept route project stucture](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepted-routes-files.png&w=1920&q=75)

### 特殊文件名约定

Next.js 提供了一组特殊文件去创建特殊组件，然后组织嵌套在一起，得到最终的UI

- `layout.tsx`	布局组件，定义它下面pages共享的UI
- `page.tsx`	页面组件，使当前文件路径可作为路由，被公开访问
- `loading.tsx`	当前路由下的Loading组件
- `not-found.tsx`	当前路由的Not found组件
- `error.tsx`	当前路由的Error组件
- `global-error.tsx`	全局的Error组件
- `route.ts`	Server-side API endpoint
- `template.tsx`	特殊的每次都重复渲染的Layout UI
- `default.tsx`	Fallback UI for Parallel Routes

### 特殊组件嵌套方式

特殊组件都是当前路由所对应页面UI的一部分，它们交织形成完整的页面。


![Component Hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75)


在嵌套路由中, 每个层级的route segment对应的特殊组件树，也会嵌套形成更大更深的组件树

![nested routes component hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=1920&q=75)


### 其他文件组织方式
我们可以把`components`, `styles`, `tests`等文件夹直接放在`app`目录下，这样它们就可以被其他文件引用了。因为它们不包含 `page.tsx` 或 `route.ts`，所以它们不会被Next.js识别为路由。

同样，识别为路由的文件夹下面，也可以放 `components`, `styles`, `tests`等文件夹，这样它们就可以被当前路由下的页面引用了。

```shell
- app
 - product
   - page.tsx
   - components
   - Modal.tsx
```

这是因为当文件夹被识别为路由时，只有`page.tsx`或`route.ts`返回的内容，才是会被用户访问到的。如上例中，`Modal.tsx`的内容，不会被用户访问到，但是可以被`product`路由下的页面引用。


![colocation](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75)


### Pages
`page.tsx` 是对应当前route segment的页面组件

![page](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fpage-special-file.png&w=1920&q=75)

```tsx
// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```

- 为了让文件夹被识别为页面路由，`page.js`文件是必须的。
- Pages 默认是`Server Components`, 不过也可声明为 `Client Component`.
- Pages 可以获取fetch data. 

### Layouts
layout是跨route共享的UI，在导航时，layout会保持状态，保持交互性，不会重新渲染。layout也可以嵌套。

举个例子，以下的layout会被 `/dashboard` 和 `/dashboard/settings` 共享

![layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Flayout-special-file.png&w=1920&q=75)


```tsx
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```


### Root Layout

root layout 是必须的，它位于`app/layout.tsx`, 不同于其他层级的layout, route layout必须包含 `html` 和 `body` 标签, 允许我们定义初始返回给浏览器的html内容。

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```


### Nesting Layouts
layout是可以嵌套的，parent layout通过 `children` prop包裹child layout。

![nest layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=1920&q=75)
![nest layout views](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=1920&q=75)


当文件夹同时包含 `layout.js` 和 `page.js` 文件时，按照前面所说的特殊文件组织方式，layout会包裹page.  
Layouts 可以 fetch data.  
parent layout 和 child layout之间传递数据是不可能的，但是可以直接fetch相同的接口获取数据，fetch API会复用缓存数据, 避免性能影响  
可以利用分组路由`Route Groups` 把需要相同布局的pages组织在一起，另外还可以利用`Route Groups`创建多个 `root layouts`.


#### Templates
Templates 类似 layouts, 不同的地方是templates在导航时为每个子路由创建一个新的实例。


![template](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ftemplate-special-file.png&w=1920&q=75)

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

### Metadata
若需要修改 `<head>` HTML elements，可以使用 Metadata APIs。
Metadata APIs 可以在 `page.js` 或 `layout.js` 文件中定义。
导出 `metadata` 对象或 `generateMetadata` 函数来定义 metadata。

```tsx
import type { Metadata } from 'next'
 
// either Static metadata
export const metadata: Metadata = {
  title: '...',
}
 
// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: '...',
  }
}
```
`generateMetadata`中可以发起数据请求，并且可以利用`params`参数获取当前路由的参数。

```tsx
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}
 
export default function Page({ params, searchParams }: Props) {}
```


## 渲染

### Server component
`server component` 应当声明为 `async` function, 因为通常都需要请求数据，然后通过props传递给`client component`  
`server component` 不能包含交互，即不可进行DOM事件监听  
`server component` 在后端渲染后，会被缓存，提高再次请求的响应速度。  
渲染任务会根据 route segment 和`<Suspense>` boundaries进行分割，并且通过流的方式发送给客户端，以减少等待时间。  
组件树通常会是`server component`和`client component`的互相交织，`server component`会被优先渲染执行。


服务端组件的内容, 也称为 `React Server Component Payload`， 它包含:
- `server component`的渲染得到的虚拟Dom
- `client component`的占位元素和引用
- `server component`传给`client component`的props

渲染过程:  
1. 根据服务端返回的html，渲染一个不可交互的页面
1. 获取路由对应的服务端组件的内容(`React Server Component Payload`) 用来调和客户端和服务端组件树，更新DOM.
1. 执行hydration, 使页面可以交互

### Client component
`client component` 不可以声明为 `async` function, 否则会报错  
作为入口路由的一部分时，`client components`也会在服务端执行。

`client component` 可以使用 `useEffect` 和 `useState` 等React hooks，绑定DOM事件，调用浏览器API.  

如果一个组件通过`use client`声明为客户端组件，那么它的子孙组件都会默认为客户端组件，除非显式声明为服务端组件。


默认地，被识别为路由的文件夹下的layout和page会并行渲染。  


渲染类型:
- `static` (静态渲染) : 在构建时渲染，适用于静态页面，如博客文章，不会频繁更新。
- `dynamic` (动态渲染) : 在请求时渲染，适用于需要频繁更新的页面，如用户个人主页，购物车等。

Nextjs会自动选择使用`static rendering`还是`dynamic rendering`, 如果页面使用到`dynamic functions`那么就会采用动态渲染。

`dynamic functions`是指:
- `cookies()`
- `headers()`
- `props.searchParams`


常用组件开发模式：  
`server component` fetch data, 通过props传递data给 `client component`



Next.js应用本质上就是一个包含服务端组件和客户端组件的组件树，当其中一个组件通过`use client`声明为客户端组件时，它就形成了一个client subtree

client subtrees 也可以包含 `server components` 或者调用 `server actions` 

```jsx
<ClientComponent>
  <ServerComponent />
</ClientComponent>
```

在收到请求时，Next.js会先渲染server components，然后返回一个包含server components渲染结果的RSC payload，这个payload会包含client subtree的引用，在客户端，React会使用RSC payload来协调client subtree。 

既然 client component 的渲染是在 server component的渲染之后，那么就不能在 client component 中导入 server component，因为那会导致一个新的请求回传到服务器，应该通过props将 server component 传递给 client component。

```js
// app/page.tsx
import ClientComp from './client-component'
import ServerComp from './server-component'

export default function() {
 return (
  <ClientComp>
      <ServerComp />
  </ClientComp>
)
}
```

## 数据请求

### Server action

`server action` 可以在 `client component` 中使用, 会发送ajax请求给对应的路由，返回后端数据，可以隐藏真实API，可通过 `<form action>` 或 element onClick callback触发。

### 服务端请求
在 `server component` 中，可以使用 `fetch` 函数来发送请求，获取数据。  
全页面刷新时，`server component` 会重新执行，获取最新的数据。

服务端请求的优点有:
- 减少请求数量
- 保护敏感数据
- 离数据源更近，更快获得数据
- 可缓存，提高性能

可以使用fetch API在服务端请求的地方:

- `server component` 
- `route handler` 
- `server actions`


由于fetch会缓存数据，所以在服务端组件之间不需要使用单向数据流模式，通过props传递数据。直接在每个服务端组件fetch相同的接口即可，接口只会被请求一次。  

server component 不需要通过fetch方法调用 route handler，它可以直接访问数据库  


若用`<Suspense>`包裹组件，则组件会动态渲染，作为入口路由进行全页面渲染时不会包含该动态组件。

```jsx
<Suspense fallback={<Loading />}> <Cart /> </Suspense>
```

### fetch缓存

fetch 设置缓存语法: `fetch(api, { cahce: 'force-cache' })`  

fetch缓存有效性验证:
1. time-based   
  `fetch(api, {next: { revalidate: 3600 }})`
2. tag-based & path-based  
  ```js
    import { revalidatePath, revalidateTag } from 'next/cache'

    export async function createPost() {
      revalidatePath('/posts')
    }

    fetch(api, { next: {tags: ['haha'] }})
    revalidateTag('haha')
  ```

可以把获取数据的方法定义在page组件外部，然后在page组件中调用，这样就可以在多个组件中复用获取数据的方法。

```js
async function getArtist() {
  const res = await fetch(api)
  return res.json()
}
async function getAlbums() {
  const res = await fetch(api)
  return res.json()
}

export default async function page() {
  const [artist, albums] = await Promise.all([getArtist(), getAlbums()])

  return (
   <> <h1> {artist.name} </h1> <Albums list={albums} /> </>
  )
}
```

### 客户端请求
客户端请求数据适用于这些场景:
- 部分渲染，部分UI仅在客户端渲染，这部分UI所包含的数据只能从客户端发请求获得
- 实时数据，如：搜索结果


### Server action

**server actions and mutations**

server actions 是运行在服务端的 `async function`, 它可以在 `server component` 和 `client component` 被调用

声明server actions:

1. `'user server'` 指令，放在函数声明之前  
  ```js
    export default function Page() {
      // server action
      async function create() {
        'user server'
        // todo
      }

      return (<div>hi</div>)
    }
  ```
2. `'user server'` 指令， 放在代码文件顶部  

  ```js
    // app/actions.ts
    'user server'

    export async function create() {
      // todo
    }
  ```

在client component中，使用server action

```js
// client component
// app/ui/button.tsx
'use client'

import { create } from '@/app/actions'

export function MyButton() {
  return <Button onClick={create} />
}
```

Nextjs扩展了 `<form>` 元素，允许它的 `action` 属性接收server action

`useActionState` hook, 可以获取server action的执行状态

```js
// app/ui/signup.tsx

'use client'

import { useActionState } from 'react'
// old version react it is called 'useFormState'  
// import { useFormState } from 'react-dom'
import { createUser } from '@/app/actions'

const initialState = { message: '' }

explort function Signup () {
  const [state, formAction, pending] = useActionState(createUser, initialState)

  return (
  <form action={formAction}>
    <p>{state?.message}</p>
    <button disabled={pending} type=submit>submit</button>
  </form>
  )
}

```


server action 应当被看做一个公开的接口，不过这个接口的地址是一些没有语义的随机字符



## 常见问题

### 如何在layout中访问请求对象?

出于在页面间导航时重用layout的目的，`layout.tsx` 不能访问原始的request对象。但是，你可以使用`headers()`和`cookies()`方法来访问相对的请求信息。


### 如何访问页面的URL?

page默认是server component, 所以无法直接访问URL, 可以使用`usePathname`和`useSearchParams`来获取URL, 另外page的props中也有`params`和`searchParams`属性, 可以直接访问.


### Server component中怎样重定向到其他页面?

在server component中, 可以使用`redirect()`或`permanentRedirect()`方法来重定向到其他页面.


### 怎样设置cookies?
 可以在`Server Actions`, `Middleware` or `Route Handlers`使用`cookies()`方法来设置cookies.
You can set cookies in `Server Actions` or `Route Handlers` using the cookies function.

> 注意: 我们不能在page或layout中直接设置cookies, 因为HTTP不允许在流式传输开始后设置cookies。