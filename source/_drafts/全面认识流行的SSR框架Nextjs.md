---
title: Next.js beginner guide
tags:
---

## introduction
`Next.js` is a react framework for building full-stack web application.
you use react build ui, next.js help to do optimizations and provides a lot of other features.

`Next.js` will automatically configures building tool, and also with built-in ts eslint and tailwind.css configuration

### main features

- file-system based router
- client-side and server-side rendering
- simplified data fetching, extended fetch api
- support a lot of styling methods, including css module, tailwind css and css-in-js, sass
- optimizations for images and scripts
- support ts


## routing
app router and pages router

> app router supports latest react features, such as `server component`, `streaming` and `server actions`

```shell
# create a new next.js app
npx create-next-app@latest my-app
```


```shell
# project structure
app/{layout.tsx, page.tsx}
pages/{index.tsx, _app.tsx, _document.tsx}
public/images
routing files ( layout.tsx page.tsx route.ts  loading.tsx not-found.tsx error.tsx  global-error.tsx default.tsx )
```


### nested routes
-  `{folder}/{subfolder}/page.tsx`
-  `{folder}/{subfolder}/route.ts`

### dynamic routes
 - `[folder]` dynamic route segment 
 - `[...folder]` catch-all route segment 
 - `[[...folder]]` optional catch-all segment 

### route groups and private folders
- `(folder)` group routes without affecting routing, pages under the same group can share the same layout.
- `_folder` out of routing  system

### parallel and intercepted routes
- `@folder` named slot 
- `(.)folder` `(..)folder` `(..)(..)folder`  `(...)floder` intercept routes

> parallel routes allow you to render multiple pages in the same layout.

## SEO

[什么是robots.txt和sitemap.xml？](https://cloud.tencent.com/developer/article/1666216)

- `sitemap.xml`
- `sitemap.ts`
- `robots.txt`
- `robots.ts`


## frequently asked questions

### How can I access the request object in a layout?

`layout.tsx` can not access the raw request object, for reusing the layout when navigate between pages, developers can use `headers` and `cookies` methods to access relative request info.


### How can I access the URL on a page?

By default, pages are Server Components. You can access the route segments through the `params` prop and the URL search params through the `searchParams` prop for a given page.

If you are using Client Components, you can use `usePathname`, `useSelectedLayoutSegment`, and `useSelectedLayoutSegments` for more complex routes.


### How can I redirect from a Server Component?
You can use `redirect` from a page to a relative or absolute URL. redirect is a temporary (307) redirect, while `permanentRedirect` is a permanent (308) redirect.


### How can I set cookies?
You can set cookies in `Server Actions` or `Route Handlers` using the cookies function.

Since HTTP does not allow setting cookies after streaming starts, you *cannot set cookies from a page or layout directly*. You can also set cookies from `Middleware`.


### How can I invalidate the App Router cache?

There are multiple layers of caching in `Next.js`, and thus, multiple ways to invalidate different parts of the cache. [Learn more about caching](https://nextjs.org/docs/app/building-your-application/caching).




> If you're new to `Next.js`, we recommend starting with the `Routing`, `Rendering`, `Data Fetching` and `Styling` sections, as they introduce the fundamental `Next.js` , Then, you can dive deeper into the other sections such as `Optimizing` and `Configuring`. Finally, once you're ready, checkout the `Deploying` and `Upgrading` sections.



---

## routing system

folder structure example:

![hierarchical folders](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fterminology-component-tree.png&w=1920&q=75)


In version 13, Next.js introduced a new App Router built on `React Server Components`.
The App Router works in a new directory named `app`. The `app` directory works alongside the `pages` directory to allow for incremental adoption. 

![using two routing system](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnext-router-directories.png&w=1920&q=75)


By default, components inside `app` are `React Server Components`. This is a performance optimization and allows you to easily adopt them, and you can also use `Client Components`.


### Roles of Folders and Files

Next.js uses a file-system based router where:

- `Folders` are used to define routes. 
- `Files` are used to create UI that is shown for a route segment.


### Route Segments

Each folder in a route represents a `route segment`. Each `route segment` is mapped to a corresponding `segment` in a `URL path`.

![route segments](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)


### Nested Routes

To create a nested route, you can nest folders inside each other. For example, you can add a new `/dashboard/settings` route


### File Conventions

Next.js provides a set of special files to create UI with specific behavior in nested routes:

- `layout.tsx`	Shared UI for a segment and its children
- `page.tsx`	Unique UI of a route and make routes publicly accessible
- `loading.tsx`	Loading UI for a segment and its children
- `not-found.tsx`	Not found UI for a segment and its children
- `error.tsx`	Error UI for a segment and its children
- `global-error.tsx`	Global Error UI
- `route.ts`	Server-side API endpoint
- `template.tsx`	Specialized re-rendered Layout UI
- `default.tsx`	Fallback UI for Parallel Routes


### Component Hierarchy

The React components defined in special files of a route segment are rendered in a specific hierarchy:

- `layout.js`
- `template.js`
- `error.js` (React error boundary)
- `loading.js` (React suspense boundary)
- `not-found.js` (React error boundary)
- `page.js` or nested `layout.js`

![Component Hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75)


In a nested route, the components of a segment will be nested inside the components of its parent segment.

![nested routes component hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=1920&q=75)


### Colocation
In addition to special files, you have the option to colocate your own files (e.g. `components`, `styles`, `tests`, etc) inside folders in the `app` directory.

This is because while folders define routes, only the contents returned by `page.js` or `route.js` are publicly addressable.

> only folders that contain `page.tsx` or `route.ts` are public, `page.tsx` will be treated as a page handler, `route.ts` will be treated as a api handler

![colocation](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75)


### Advanced Routing Patterns

- `Parallel Routes:`  
    Allow you to simultaneously show two or more pages in the same view that can be navigated independently. You can use them for split views that have their own sub-navigation. E.g. Dashboards.
- `Intercepting Routes:`  
    Allow you to intercept a route and show it in the context of another route. You can use these when keeping the context for the current page is important. E.g. Seeing all tasks while editing one task or expanding a photo in a feed.


### Creating Routes

Each **folder** represents a **route segment** that maps to a **URL segment**.

![route segment](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)


A special `page.js` file is used to make route segments publicly accessible.

![public route](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fdefining-routes.png&w=1920&q=75)

In this example, the `/dashboard/analytics` URL path is not publicly accessible because it does not have a corresponding `page.js` file. This folder could be used to store `components`, `stylesheets`, `images`, or other colocated files.

### Creating UI

`Special file conventions` are used to create UI for each `route segment`. The most common are `page.tsx` to show UI unique to a route, and `layout.tsx` to show UI that is shared across multiple routes.

### Pages
A page is UI that is unique to a route. You can define a page by default exporting a component from a `page.js` file.

![page](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fpage-special-file.png&w=1920&q=75)

```tsx
// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```


> A page is always the leaf of the route subtree.
> A `page.js` file is required to make a route segment publicly accessible.
> Pages are `Server Components` by default, but can be set to a `Client Component`.
> Pages can fetch data. 


### Layouts and Templates
The special files `layout.js` and `template.js` allow you to create UI that is shared between routes.


#### Layouts
A layout is UI that is shared between multiple routes. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be nested.

For example, the layout will be shared with the /dashboard and /dashboard/settings pages:

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


#### Root Layout (Required)

The root layout is defined at the top level of the app directory and applies to all routes. This layout is required and must contain `html` and `body` tags, allowing you to modify the initial HTML returned from the server.

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


#### Nesting Layouts

By default, layouts in the folder hierarchy are nested, which means they wrap child layouts via their `children` prop. 

![nest layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=1920&q=75)
![nest layout views](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=1920&q=75)


> Only the `root layout` can contain `<html>` and `<body>` tags.
> When a `layout.js` and `page.js` file are defined in the same folder, the layout will wrap the page.
> Layouts are `Server Components` by default but can be set to a Client Component.
> Layouts can fetch data.
> Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will automatically dedupe the requests without affecting performance.
> You can use `Route Groups` to opt specific route segments in and out of shared layouts.
> You can use `Route Groups` to create multiple `root layouts`. 


#### Templates
Templates are similar to layouts in that they wrap a child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation


![template](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ftemplate-special-file.png&w=1920&q=75)

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

### Metadata
You can modify the `<head>` HTML elements such as `title` and `meta` using the` Metadata APIs`.

Metadata can be defined by exporting a `metadata` object or `generateMetadata` function in a `layout.js` or `page.js` file.

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

The `metadata` object and `generateMetadata` function exports are only supported in `Server Components`.
You **cannot** export both the `metadata` object and `generateMetadata` function from the same route segment.


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

> If metadata doesn't depend on runtime information, it should be defined using the `static metadata object` rather than `generateMetadata`.
> `fetch` requests are automatically memoized for the same data across generateMetadata, generateStaticParams, Layouts, Pages, and Server Components. React cache can be used if fetch is unavailable.
> `searchParams` are only available in page.js segments.
> The `redirect()` and `notFound()` Next.js methods can also be used inside `generateMetadata`.

=============================================================================================================



`server component` should be `async` function  
`client component` can **not** be `async` function, otherwise will throw some errors

`server component` can not contain `interactions`  
during full page load: `client components` are prerendered on the server  

`server action` can be use in `client component`, will send an ajax to the route , return backend data, use with `<form action>` or element onClick callback
hide real api ( *for sensitive data* )


--------

**fetch data on server or client**  

**server**  
- less request, sensitive data, fater then client request, cached
- whole page rerender on server

fetch  
orm  


**client**  
- partial render
- realtime data

route handler    
fetching lib  

use fetch api: `server component` / `route handler` / `server actions`


dynamically render (render on request time) / statically render (render on build time)

fetch(api, { cahce: 'force-cache' })

wrap component using fetch in Suspense , dynamically render this component , but not the entire page


`<Suspense fallback={<Loading />}> <Cart /> </Suspense>`

**nextjs 14, fetch api will cached by default**

multiple components in the component tree need the same data, just request the same api, do not need to globally fetch data and pass down, because of fetch cached

can use react cache to memorize data requests for db during a react render pass

```js
import { cache } from react

export const getitem = cache(async(id) => await db.item.findOne(id))


// swr or react query  , enable caching
import useSWR from 'swr'

Response.json(data)
```

server component do not need to call route handler, it can directlly access db  


parallel and sequential data fetching  
`<Suspense fallback={<Loading />}> <Playlist artistId={artist.id} /> </Suspense>`  
partial render and user can  interacte with it

by default, layout and page are rendered in parallel.

define data fetch fn outside the page component

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

can use `<Suspense>` to break up the rendering work


preloading data

```js
// app/item/[id]/page.tsx

export default async function page({ params: {id} }) {
  preloadDataOfItem(id) // fetch data , do not use 'await' to block 'checkAvailable'
  const ok = await checkAvailable(id)

  return ok ? <Item id={id} /> : null
}
```

use `cache` and `server-only` with preload pattern  

```js
import { cache } from 'react'
import `server-only`
```

preload data and cache response  

prevent sensitive data from being exposed to client

`next.config.js`  

```js
experimental: { taint: true }
```

caching and revalidating
```js
import { unstable_cache } from 'next/cache'
fetch(api, { cache: 'force-cache'})
```

revalidating data

time-based
on-demand: tag-based or path-based approach

`fetch(api, {next: { revalidate: 3600 }})`

segment config options: `export const revalidate = 3600`

```js
import { revalidatePath, revalidateTag } from 'next/cache'

export async function createPost() {
  revalidatePath('/posts')
}

fetch(api, { next: {tags: ['haha'] }})
revalidateTag('haha')
```

if revalidating error, will take use the latest cached data, next time do revalidate again

**server actions and mutations**

server actions are `async` functions run on the server, can be called in `server component` and `client component`

`'user server'` directive in the top of ts file, or on the top of async function body
```js
export default function Page() {
  // server action
  async function create() {
     'user server'
     // todo
  }

  return (<div>hi</div>)
}

// app/actions.ts
'user server'

export async function create() {...}

// client component
// app/ui/button.tsx
'use client'

import { create } from '@/app/actions'

export function MyButton() {
  return <Button onClick={create} />
}
```
pass server action as props 
props named as `action` or ending with `Action` are assumed to receive server actions


form action  
event handler  
useEffect
props

server action integrate with caching and revalidation  

server action will return the UI and new data  

server actions inherit the route segment config from page or layout  

react extend the `<form>` element to allow server actions to be invoked with the `action` prop  

`<button>` `<input type="submit" />` support `formAction` prop. multiple server actions in a form

`event.currentTarget.form?.requestSubmit()`  

server-side form validation. `zod`

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


```js
useFormStatus()  
useOptimistic()
```

server action use in event handler  
debounce server action  

server action use in `useEffect`


error handling, nearest 'error.js'

in server action revalidate data
```js
import { revalidatePath } from 'next/cache'

export async function createPost() {
  revalidatePath('/posts')
}

```
in server action, use redirect, `redirect()` should be used outside of `try...catch`

```js
import { redirect } from 'next/navigation'

redirect('/post/123')
```

in server action, use cookies

```js
'use server'

import { cookies } from 'next/headers'

export async function exampleAction() {
  const cookieStore = cookies()
  const val = cookieStore.get('name')?.value
  cookieStore.set('name', 'lufy')
  cookieStore.delete('name')
}
```

server action security

server action should be treated as public-facing API

```js
'use server'

import { auth } from './lib'

export function addItem() {
  const { user } = auth()
  if (!user) {
    throw new Error('please sign in')
  }
}
```
react taint APIs  

server action use `POST` method , avoid csrf attack  

NEXT_SERVER_ACTION_ENCRYPTION_KEY , compare `origin` header and `host` header  

server component  

render and cached on the server  
rendering work is split by route segments to enable streaming and partial rendering

**render strategies**
- static rendering
- dynamic rendering
- streaming

benefits of server rendering

data fetching more closer to data source, faster , safer, reduce requests, caching

reduce the amount of client-side js, less client-side js to download , parse and execute

First Cotnentful Paint , initial page load   

**SEO**  

server components allow to split the rendering work into chunks and stream them to the client as they become ready.   
user can see parts of the page earlier


by default, nextjs use server components

how are server components rendered?

the rendering work is split into chunks by route segments and `<Suspense>` boundaries

server component special format: `React Server Component Payload`

> show a fast non-interactive preview of the route  
> react server component payload is used to reconcile the client and server component tree and update dom
> js instructions hydrate client components, make app interactive


*what is the react server component payload?*  
render result of server component  
placeholder for where client component should be rendered  
props passed from server component to client component.  

*static rendering*
routes are rendered at build time. result can be cached and push to CDN   
no personalized data


*dynamic rendering*  
routes are rendered for each user at request time.  
personalized data or data only be known at request time, such as cookie and search params


*switch to dynamic rendering*  
`dynamic function` or uncached data request is discovered , dynamically render the whole route

> nextjs automatically choose static rendering or dynamic rendering based on the features and apis used.

**dynamic functions**
- cookies headers searchParams
- `cookies()`
- `headers()`
- `searchParams` prop

*streaming is built into app router by default.*  


*client components*  
prerender on the server  
use client js to run in browser  


*benefits of client rendering*  
- interactivity, client component can use state effects and event listeners  
- browser apis  

`'use client'`, declare a boundary between a server component and client component
all child module and child components are considered part of the client bundle.

by default, all components in the app router are server components

define multiple `'use client'` entry points in component tree, will split application into multiple client bundles

*how are client component rendered?*  

full page load: use react apis to render a static html preview on the server for client component and server component.

*on server:*  
render server component into server component payload which includes references to client component
nextjs use `RSC` payload and client component `js instructions `to render html for the page route on the server.

*on client:*  
show a fast non-interactive preview of the page  
server component payload is used to reconcile the client and server component trees and update the dom  
the `js instructions` are used to hydrate client components and make UI interactive


> hydrate is the process of attaching event listeners to dom , make ui interactive  `hydrateRoot()`

*subsequent navigation*  
client components are rendered entirely on the client, this means the client component js bundle is downloaded and parsed,  
react use RSC payload to reconcile the client and server component tree.

after declared the `'use client'` boundary, if want to go back to the server environment (eg: reduce bundle size, fetch data on server)

*server and client composition pattern*  

*server component pattern*  
do some work on the server, like fetching data , accessing db, or other backend services
share data between components ( *a layout and a page depend on the same data* )

*react context is not available on the server*   
instead of using react context or passing data as props, we can use `fetch` or react `cache` function to fetch the same data in components

keep server-only code out of the client environment

```js
// lib/data.ts
export async function getData() {
  const res = await fetch(api, headers: { authorization: process.env.API_KEY /* sensitive data */ } )
  return res.json()
}
```

private environment variable: `API_KEY`
public environment variable: `NEXT_PUBLIC_XXX`

```js
npm i server-only

import 'server-only'

export async function getData() {... }
```

like this, to aviod accidentally import 'getData' into client component

the corresponding package `client-only`  

server component is a new react feature,  `'use server'` directive, `'use client'` directive

third-party packages without `'use client'` directive, won't work within server components, wrap it in a new jsx file

create `context` in the app/layout will cause error

should render 'context.provider' as deep as possible in the tree.


*client component*  
to reduce the client js bundle size, recommend moving client component down component tree

fetch data in a server component, pass data down as props to client component  

*interleaving server and client components*  

app is a component tree including server components and client component, add `'use client'` to mark a subtree as client component tree

client subtrees can nested server components or call server actions ` <ClientComponent><ServerComponent /> </ClientComponent>`

> at request time, server components are rendered first, including those nested inside client subtree. the rendered result (RSC payload) will contain references to the locations of the client subtree. on client, react use RSC payload to reconcile server component and client component into a single tree.

> since client components are rendered after server components, can not import a server component into a client component (it would require a new request back to the server), should pass the server component as 'props' to a client component

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

*partial prerendering*  

combine static component and dynamic component together in the same route

during the build , nextjs prerender as much of the route as possible, 
dynamic components should be wrapped with a `<Suspense>` boundary,  suspense boundary fallback will be included in the prerendered html.   
partial prerendering is an experimental feature

*next.config.js*  
```js
experimental: { ppr: 'incremental' } next.js v15
experimental: { ppr: true } next.js v14

export const experimental_ppr = true
```

----------

- *server component only renders on the server*
- *client componen renders on both the client and server side*

> server component fetch data, will block the request.

no global stores, the store should be created per request. do not share store across requests   
server component should not read or write redux store.  RSC can not use hooks or context.   
store should only contains global mutable data

next.js multi-page architecture

`makeStore` create store instance per-request 


`useEffect` only runs on the client  
`useSelector`  `useState` runs both on server and client?

state levels: 
- app level 
- request level 
- route level or page level
