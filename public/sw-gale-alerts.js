// L7OT Offline Maritime Safety & Gale Warning Service Worker
const CACHE_NAME = 'l7ot-gale-alerts-v1'
const ALERTS_CACHE_URL = '/__offline_gale_alerts__.json'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  const data = event.data
  if (!data || data.type !== 'PERSIST_AND_SHOW_GALE_ALERT') return

  const alertPayload = data.payload
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME)
        const existingRes = await cache.match(ALERTS_CACHE_URL)
        const list = existingRes ? await existingRes.json() : []
        const updated = [alertPayload, ...list].slice(0, 20)
        await cache.put(
          ALERTS_CACHE_URL,
          new Response(JSON.stringify(updated), {
            headers: { 'Content-Type': 'application/json' },
          })
        )
      } catch {
        // Ignore cache write errors in restricted contexts
      }

      if (self.registration && self.registration.showNotification && Notification.permission === 'granted') {
        await self.registration.showNotification(alertPayload.title || 'L7OT Maritime Gale Alert', {
          body: alertPayload.body || '',
          icon: '/favicon.svg',
          badge: '/favicon.svg',
          tag: alertPayload.id || 'l7ot-gale-alert',
          data: alertPayload,
        })
      }
    })()
  )
})

self.addEventListener('push', (event) => {
  let payload = {
    title: '⚠️ L7OT · BMS Côte DGM',
    body: 'تنبيه رياح قوية وأمواج عاتية بالسواحل المغربية',
  }
  try {
    if (event.data) {
      payload = event.data.json()
    }
  } catch {
    // fallback to default text
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
    })
  )
})
