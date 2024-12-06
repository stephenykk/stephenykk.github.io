self.addEventListener('fetch', function (event) {
    console.log("🚀 ~ dd event  req.url:", event.request.url, [...event.request.headers.entries()])
    if (event.request.url.endsWith('.woff') || event.request.url.endsWith('.woff2') || event.request.url.endsWith('.ttf')) {
        // event.respondWith(fetch(event.request));
        const myReq = new Request(event.request, {
            headers: new Headers(event.request.headers).delete('referer')
        });
        console.log('myReq headers:', myReq.url, [...myReq.headers.entries()])
        event.respondWith(
            fetch(myReq)
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});