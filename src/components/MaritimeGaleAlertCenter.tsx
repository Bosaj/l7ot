import React, { useState, useEffect } from 'react'
import {
  Bell,
  BellRing,
  Wind,
  Waves,
  ShieldAlert,
  CheckCircle2,
  Radio,
  Anchor,
  X,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'
import {
  INITIAL_DGM_PORT_BULLETINS,
  loadGaleSubscription,
  saveGaleSubscription,
  loadPersistedNotifications,
  persistSafetyNotification,
  registerGaleServiceWorkerAndNotify,
  buildLocalizedAlertNotification,
  evaluateGaleTrigger,
  type DgmMaritimeBulletin,
  type GaleSubscriptionState,
  type PersistedSafetyNotification,
} from '../lib/maritimeGaleAlerts'

interface MaritimeGaleAlertCenterProps {
  lang: SupportedLanguage
  isModal?: boolean
  onClose?: () => void
  onSubscriptionChange?: (sub: GaleSubscriptionState) => void
}

export const MaritimeGaleAlertCenter: React.FC<MaritimeGaleAlertCenterProps> = ({
  lang,
  isModal = false,
  onClose,
  onSubscriptionChange,
}) => {
  const [subscription, setSubscription] = useState<GaleSubscriptionState>(() =>
    loadGaleSubscription()
  )
  const [bulletins, setBulletins] = useState<DgmMaritimeBulletin[]>(INITIAL_DGM_PORT_BULLETINS)
  const [notifications, setNotifications] = useState<PersistedSafetyNotification[]>(() =>
    loadPersistedNotifications()
  )
  const [statusBanner, setStatusBanner] = useState<string>('')
  const [simWindKt, setSimWindKt] = useState<number>(28)
  const [simSwellM, setSimSwellM] = useState<number>(3.8)

  useEffect(() => {
    registerGaleServiceWorkerAndNotify().then((ok) => {
      if (ok && !subscription.swRegistered) {
        const updated = { ...subscription, swRegistered: true }
        setSubscription(updated)
        saveGaleSubscription(updated)
      }
    })
  }, [])

  const handleToggleOptIn = async (portId?: string) => {
    const targetPort = portId || subscription.homePortId
    const nextOptedIn = portId ? true : !subscription.optedIn

    if (
      nextOptedIn &&
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      try {
        await Notification.requestPermission()
      } catch {
        // ignore permission prompt errors in headless browsers
      }
    }

    const swOk = await registerGaleServiceWorkerAndNotify()
    const nextState: GaleSubscriptionState = {
      ...subscription,
      optedIn: nextOptedIn,
      homePortId: targetPort,
      swRegistered: swOk || subscription.swRegistered,
      updatedAtIso: new Date().toISOString(),
    }
    setSubscription(nextState)
    saveGaleSubscription(nextState)
    onSubscriptionChange?.(nextState)

    if (nextOptedIn) {
      const matchingBulletin =
        bulletins.find((b) => b.portId === targetPort) || bulletins[0]!
      const notif = buildLocalizedAlertNotification(matchingBulletin, lang)
      const nextList = persistSafetyNotification(notif)
      setNotifications(nextList)
      await registerGaleServiceWorkerAndNotify(notif)

      setStatusBanner(
        lang === 'ar'
          ? `✓ تم تفعيل إشعارات الإنذار البحري (Web Push + حفظ دون إنترنت) لميناء ${matchingBulletin.portNameAr}`
          : lang === 'fr'
          ? `✓ Alertes BMS & Push hors-ligne activées pour ${matchingBulletin.portNameFr}`
          : `✓ Web Push & offline gale alerts enabled for ${matchingBulletin.portNameEn}`
      )
    } else {
      setStatusBanner(
        lang === 'ar'
          ? 'تم إيقاف الإشعارات الفورية مؤقتاً'
          : lang === 'fr'
          ? 'Notifications push désactivées'
          : 'Push notifications paused'
      )
    }
  }

  const handleTriggerSimulatedGale = async () => {
    const evalResult = evaluateGaleTrigger(simWindKt, simSwellM)
    const homeBulletin =
      bulletins.find((b) => b.portId === subscription.homePortId) || bulletins[0]!

    const updatedBulletin: DgmMaritimeBulletin = {
      ...homeBulletin,
      windSpeedKnots: simWindKt,
      windGustKnots: simWindKt + 8,
      swellHeightMeters: simSwellM,
      isGaleTriggered: evalResult.isGaleTriggered,
      severity: evalResult.severity,
      harborBarStatus: evalResult.harborBarStatus,
      headlineAr: evalResult.isGaleTriggered
        ? `🚨 إنذار عاجل (${homeBulletin.portNameAr}): رياح ${simWindKt} عقدة وسويل ${simSwellM} متر`
        : `تحديث جوي (${homeBulletin.portNameAr}): رياح ${simWindKt} عقدة وسويل ${simSwellM} متر`,
      headlineFr: evalResult.isGaleTriggered
        ? `🚨 Alerte Coup de Vent (${homeBulletin.portNameFr}) : ${simWindKt} nds & houle ${simSwellM}m`
        : `Point Météo (${homeBulletin.portNameFr}) : ${simWindKt} nds & houle ${simSwellM}m`,
      headlineEn: evalResult.isGaleTriggered
        ? `🚨 Gale Alert (${homeBulletin.portNameEn}): ${simWindKt} kt winds & ${simSwellM}m swell`
        : `Marine Update (${homeBulletin.portNameEn}): ${simWindKt} kt winds & ${simSwellM}m swell`,
    }

    setBulletins((prev) =>
      prev.map((b) => (b.portId === homeBulletin.portId ? updatedBulletin : b))
    )

    const notif = buildLocalizedAlertNotification(updatedBulletin, lang)
    const updatedList = persistSafetyNotification(notif)
    setNotifications(updatedList)
    await registerGaleServiceWorkerAndNotify(notif)

    setStatusBanner(
      lang === 'ar'
        ? `⚡ تم إطلاق وحفظ تنبيه الطوارئ البحرية في سجل Service Worker (${simWindKt} عقدة / ${simSwellM}م)`
        : lang === 'fr'
        ? `⚡ Alerte enregistrée dans le Service Worker hors-ligne (${simWindKt} nds / ${simSwellM}m)`
        : `⚡ Gale alert persisted to offline Service Worker queue (${simWindKt} kt / ${simSwellM}m)`
    )
  }

  const activeGaleCount = bulletins.filter((b) => b.isGaleTriggered).length

  const content = (
    <section
      aria-label="Maritime Safety & Gale Warning Center"
      className="rounded-xl border border-amber-500/30 bg-[#14110f] p-5 sm:p-7 shadow-2xl space-y-6 text-[#f6f1e7]"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f6f1e7]/10 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/15 px-3 py-1 font-mono text-[11px] font-bold text-rose-300">
            <Radio className="h-3.5 w-3.5 animate-pulse text-rose-400" />
            <span>
              {lang === 'ar'
                ? `نظام الإنذار البحري المبكر لقوارب الصيد التقليدي (DGM BMS Côte) · ${activeGaleCount} إنذارات نشطة`
                : lang === 'fr'
                ? `Système d’Alerte Coup de Vent & Houle (BMS Côte DGM) · ${activeGaleCount} alertes actives`
                : `Real-Time Maritime Gale & Swell Warning System (DGM) · ${activeGaleCount} Active Alerts`}
            </span>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#f6f1e7] sm:text-3xl">
            {lang === 'ar'
              ? 'إشعارات السلامة البحرية، رياح الشرقي وإغلاق البارة (الفلوكة)'
              : lang === 'fr'
              ? 'Notifications Push de Sécurité Maritime, Coups de Chergui & État des Barres'
              : 'Maritime Safety Push Notifications, Chergui Squalls & Harbor Bar Closures'}
          </h2>
          <p className="max-w-3xl text-xs sm:text-sm text-[#a69b8d] leading-relaxed">
            {lang === 'ar'
              ? 'يرصد المحرك تلقائياً تجاوز سرعة الرياح لـ 25 عقدة أو علو أمواج السويل لـ 3.5 متر مع حفظ الإشعارات في ذاكرة Service Worker للعمل في عرض البحر بدون إنترنت.'
              : lang === 'fr'
              ? 'Détection automatique des vents > 25 nœuds ou houles > 3,5 mètres avec persistance hors-ligne via Service Worker pour les marins artisans.'
              : 'Automated trigger engine detecting winds > 25 knots or swell > 3.5 meters with Service Worker offline notification persistence.'}
          </p>
        </div>

        {isModal && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="self-end md:self-start flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-[#0b0908] text-[#f6f1e7] hover:border-rose-500 hover:text-rose-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Home Port Opt-In & Gale Trigger Simulator Bar */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7 rounded-xl border border-amber-500/25 bg-[#0b0908] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <BellRing className="h-4 w-4 text-amber-400" />
              {lang === 'ar'
                ? 'الاشتراك في إشعارات الميناء المفضل (Home Port Opt-In)'
                : lang === 'fr'
                ? 'Abonnement Push au Port d’Attache (Home Port)'
                : 'Home Port Push Notification Opt-In'}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                subscription.optedIn
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white/10 text-[#a69b8d]'
              }`}
            >
              {subscription.optedIn
                ? lang === 'ar'
                  ? 'مشترك · محفوظ دون إنترنت ✓'
                  : 'Actif & Hors-ligne ✓'
                : lang === 'ar'
                ? 'غير مفعل'
                : 'Inactif'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <select
              aria-label="Select Home Port for Gale Alerts"
              value={subscription.homePortId}
              onChange={(e) => handleToggleOptIn(e.target.value)}
              className="flex-1 rounded-lg border border-[#f6f1e7]/15 bg-[#14110f] px-3 py-2 text-xs font-semibold text-[#f2b47e] focus:border-amber-400 focus:outline-none"
            >
              {bulletins.map((b) => (
                <option key={b.portId} value={b.portId} className="bg-[#0b0908] text-[#f6f1e7]">
                  {lang === 'ar' ? b.portNameAr : lang === 'fr' ? b.portNameFr : b.portNameEn}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleToggleOptIn()}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-bold transition ${
                subscription.optedIn
                  ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                  : 'bg-amber-500 text-[#0b0908] hover:bg-amber-400'
              }`}
            >
              <Bell className="h-3.5 w-3.5" />
              <span>
                {subscription.optedIn
                  ? lang === 'ar'
                    ? 'إشعارات الميناء مفعلة ✓'
                    : lang === 'fr'
                    ? 'Alertes Port Activées ✓'
                    : 'Home Port Alerts Active ✓'
                  : lang === 'ar'
                  ? 'تفعيل إشعارات هذا الميناء'
                  : lang === 'fr'
                  ? 'Activer les alertes du port'
                  : 'Enable Home Port Alerts'}
              </span>
            </button>
          </div>

          {statusBanner && (
            <p className="rounded bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 font-mono text-[11px] text-emerald-300">
              {statusBanner}
            </p>
          )}
        </div>

        {/* Gale Trigger Engine Simulator (>25 kt / >3.5 m) */}
        <div className="lg:col-span-5 rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-rose-300 font-bold">
              {lang === 'ar'
                ? 'اختبار محرك الإنذار (>25 عقدة أو >3.5م)'
                : 'Simulateur Seuil Critique (>25 nds / >3,5m)'}
            </span>
            <span className="text-[10px] text-[#a69b8d]">Web Push + SW</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
            <label className="block">
              <span className="text-[10px] text-[#a69b8d] block mb-1">
                {lang === 'ar' ? 'سرعة الرياح (عقدة):' : 'Vent (nœuds) :'}
              </span>
              <input
                type="number"
                min={5}
                max={60}
                value={simWindKt}
                onChange={(e) => setSimWindKt(Number(e.target.value))}
                className="w-full rounded border border-[#f6f1e7]/15 bg-[#14110f] px-2.5 py-1.5 text-amber-300 font-bold"
              />
            </label>
            <label className="block">
              <span className="text-[10px] text-[#a69b8d] block mb-1">
                {lang === 'ar' ? 'علو الأمواج (متر):' : 'Houle (mètres) :'}
              </span>
              <input
                type="number"
                min={0.5}
                max={8}
                step={0.1}
                value={simSwellM}
                onChange={(e) => setSimSwellM(Number(e.target.value))}
                className="w-full rounded border border-[#f6f1e7]/15 bg-[#14110f] px-2.5 py-1.5 text-cyan-300 font-bold"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleTriggerSimulatedGale}
            className="w-full rounded-lg border border-rose-500/40 bg-rose-500/20 px-3 py-2 font-mono text-xs font-bold text-rose-200 hover:bg-rose-500 hover:text-black transition"
          >
            {lang === 'ar'
              ? 'بث وحفظ إنذار عاصفة تجريبي للميناء المختار'
              : lang === 'fr'
              ? 'Tester & Persister une Alerte Coup de Vent'
              : 'Trigger & Persist Gale Alert Notification'}
          </button>
        </div>
      </div>

      {/* Official DGM Maritime Bulletins Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bulletins.map((b) => {
          const isHome = b.portId === subscription.homePortId
          const barBadge =
            b.harborBarStatus === 'closed'
              ? {
                  text:
                    lang === 'ar'
                      ? 'البارة مغلقة (ممنوع الخروج)'
                      : lang === 'fr'
                      ? 'Barre Fermée'
                      : 'Harbor Bar Closed',
                  cls: 'border-rose-500/40 bg-rose-500/20 text-rose-300',
                }
              : b.harborBarStatus === 'restricted_flouka'
              ? {
                  text:
                    lang === 'ar'
                      ? 'ممنوع على الفلوكة'
                      : lang === 'fr'
                      ? 'Restreint Flouka'
                      : 'Flouka Restricted',
                  cls: 'border-amber-500/40 bg-amber-500/20 text-amber-300',
                }
              : {
                  text:
                    lang === 'ar'
                      ? 'البارة مفتوحة'
                      : lang === 'fr'
                      ? 'Passe Ouverte'
                      : 'Harbor Open',
                  cls: 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300',
                }

          return (
            <div
              key={b.id}
              className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 ${
                b.isGaleTriggered
                  ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/25 to-[#0b0908]'
                  : 'border-[#f6f1e7]/10 bg-[#0b0908]'
              } ${isHome ? 'ring-1 ring-amber-400' : ''}`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#e68a45]">
                    {b.dgmBulletinCode}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 font-mono text-[10px] font-bold ${barBadge.cls}`}
                  >
                    {barBadge.text}
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#f6f1e7]">
                    {lang === 'ar' ? b.portNameAr : lang === 'fr' ? b.portNameFr : b.portNameEn}
                  </h3>
                  <span className="font-mono text-[10px] text-[#a69b8d] block">
                    {lang === 'ar' ? b.sectorAr : lang === 'fr' ? b.sectorFr : b.sectorEn}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-2.5 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <Wind
                      className={`h-4 w-4 ${
                        b.windSpeedKnots > 25 ? 'text-rose-400' : 'text-amber-400'
                      }`}
                    />
                    <div>
                      <span className="block font-bold text-[#f6f1e7]">
                        {b.windSpeedKnots} kt
                      </span>
                      <span className="text-[9px] text-[#a69b8d]">
                        {lang === 'ar' ? `هبات ${b.windGustKnots}kt` : `Raf. ${b.windGustKnots}kt`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Waves
                      className={`h-4 w-4 ${
                        b.swellHeightMeters > 3.5 ? 'text-rose-400' : 'text-cyan-400'
                      }`}
                    />
                    <div>
                      <span className="block font-bold text-[#f6f1e7]">
                        {b.swellHeightMeters} m
                      </span>
                      <span className="text-[9px] text-[#a69b8d]">T = {b.swellPeriodSeconds}s</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-bold text-amber-200 leading-snug">
                  {lang === 'ar' ? b.headlineAr : lang === 'fr' ? b.headlineFr : b.headlineEn}
                </p>

                <p className="text-[11px] text-[#a69b8d] leading-relaxed">
                  {lang === 'ar' ? b.detailsAr : lang === 'fr' ? b.detailsFr : b.detailsEn}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f6f1e7]/10 flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#786c60]">DGM Maroc · VHF Ch. 16</span>
                <button
                  type="button"
                  onClick={() => handleToggleOptIn(b.portId)}
                  className={`inline-flex items-center gap-1 rounded px-2 py-1 font-bold transition ${
                    isHome && subscription.optedIn
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-white/10 text-[#f2b47e] hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  {isHome && subscription.optedIn ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{lang === 'ar' ? 'مينائي المفضل' : 'Mon Port'}</span>
                    </>
                  ) : (
                    <>
                      <Anchor className="h-3 w-3" />
                      <span>{lang === 'ar' ? 'اختيار كمينائي' : 'Choisir ce port'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Offline Persisted Notifications Log (Service Worker Queue) */}
      <div className="rounded-xl border border-[#f6f1e7]/10 bg-[#0b0908] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#e68a45] flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            {lang === 'ar'
              ? `سجل الإشعارات المحفوظة للعمل دون إنترنت (Service Worker Cache · ${notifications.length})`
              : lang === 'fr'
              ? `Journal des Alertes Persistées Hors-Ligne (Service Worker · ${notifications.length})`
              : `Offline Persisted Notification Log (Service Worker · ${notifications.length})`}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {notifications.slice(0, 4).map((n) => (
            <div
              key={n.id}
              className="rounded-lg border border-[#f6f1e7]/10 bg-[#14110f] p-3 text-xs space-y-1"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-amber-300">
                <span>{n.portName}</span>
                <span>
                  {n.windSpeedKnots} kt · {n.swellHeightMeters}m
                </span>
              </div>
              <div className="font-bold text-[#f6f1e7]">{n.title}</div>
              <p className="text-[11px] text-[#a69b8d] line-clamp-2">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  if (!isModal) return content

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto"
    >
      <div className="my-auto max-h-[92vh] w-full max-w-5xl overflow-y-auto">{content}</div>
    </div>
  )
}
