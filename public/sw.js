if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>n(e,a),u={module:{uri:a},exports:c,require:r};s[a]=Promise.all(t.map((e=>u[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"d9e90fdc1873be593dfadb006c39bcb7"},{url:"/_next/static/bWe-XlYuXfDRg__dBY711/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/bWe-XlYuXfDRg__dBY711/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/177-66d687b712b87a52.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/466-e25664f315b8063f.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/472-99cbba8a5bcb983f.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/572-3a7bab496127c3a5.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/600-bfbbc6da779744cb.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/642-b95ead0f0acf6f4e.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/677-1bb947282f6271fb.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/819-9cb21dfe585eb299.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/_not-found-7fc7c8b1031bd9d0.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/bookmarks/page-3e96492a0523e0ba.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/collections/%5Bcollection%5D/page-2dc5c28ca01e4276.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/layout-f6770260ba0bf4a0.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/movie/%5Bkp_id%5D/loading-69ead5f8d6e1d3d9.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/movie/%5Bkp_id%5D/page-40a501ddde171759.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/movies/page-7180a2ad3296d8dc.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/page-468827efe34f913a.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/serials/page-2612affea491475b.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/app/tv-shows/page-e8eca1f567076384.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/fd9d1056-bb64d96be3999dec.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/main-app-59a8e4778feb1125.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/main-ed2adb2638ec6e51.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-dc6873ad25934d54.js",revision:"bWe-XlYuXfDRg__dBY711"},{url:"/_next/static/css/3197391ef93f31bd.css",revision:"3197391ef93f31bd"},{url:"/imdb.svg",revision:"5c44655b87d5e96f8d349cd975c97e62"},{url:"/kinopoisk.svg",revision:"b62d3390be0fa07e5a30ca7965a488d7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
