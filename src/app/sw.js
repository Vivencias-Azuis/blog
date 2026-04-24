import { ExpirationPlugin, NetworkFirst, Serwist } from 'serwist'
import { defaultCache } from '@serwist/next/worker'

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ request, url }) => request.method === 'GET' && url.protocol.startsWith('http'),
      handler: new NetworkFirst({
        cacheName: 'offline-cache',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
        ],
      }),
    },
  ],
})

serwist.addEventListeners()
