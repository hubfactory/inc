<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { gsap } from 'gsap'

/**
 * Nuxt Hero – 3 Circles Merge + Particle Burst → Idle Drift
 * - 出現位置を角度で指定（entryAnglesDeg）
 * - 出現時は opacity 0 → 1 フェードイン
 * - バーストは1回だけ、その後ドリフト
 * - 回転速度は orbitSec
 */

const props = withDefaults(defineProps<{
  aspect?: number
  radiusPct?: number
  colors?: { system: string; salon: string; cowork: string }
  headline?: string
  subline?: string
  glow?: boolean
  particleCount?: number
  idleAlpha?: number
  orbitSec?: number
  entryAnglesDeg?: number[] // 3つの出現角度（度数）
}>(), {
  aspect: 16/9,
  radiusPct: 0.18,
  colors: () => ({ system: '#1e90ff', salon: '#ff4d6d', cowork: '#00c49a' }),
  glow: true,
  particleCount: 700,
  idleAlpha: 0.28,
  orbitSec: 0.5,
  entryAnglesDeg: () => [225, 315, 45], // 左下, 右下, 右上（例）
})

const stage = ref<HTMLDivElement|null>(null)
const svg = ref<SVGSVGElement|null>(null)
const orbitGroup = ref<SVGGElement|null>(null)
const canvas = ref<HTMLCanvasElement|null>(null)
const c1 = ref<SVGCircleElement|null>(null)
const c2 = ref<SVGCircleElement|null>(null)
const c3 = ref<SVGCircleElement|null>(null)

const enableGlow = computed(() => props.glow)
const aspectPadding = computed(() => `${100/props.aspect}%`)

let ctx: CanvasRenderingContext2D | null = null
let rafId: number | null = null
let tl: gsap.core.Timeline | null = null
let resizeObs: ResizeObserver | null = null

let W = 1280, H = 720, R = 120
const r = computed(() => R)

function fit() {
  const el = stage.value!
  const rect = el.getBoundingClientRect()
  W = rect.width
  H = rect.width / props.aspect
  R = Math.min(W, H) * props.radiusPct

  if (canvas.value) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.value.width = Math.floor(W * dpr)
    canvas.value.height = Math.floor(H * dpr)
    canvas.value.style.width = W + 'px'
    canvas.value.style.height = H + 'px'
    ctx = canvas.value.getContext('2d')
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  if (svg.value) {
    svg.value.setAttribute('viewBox', `0 0 ${W} ${H}`)
    svg.value.setAttribute('width', String(W))
    svg.value.setAttribute('height', String(H))
  }
}

function orbitPoint(cx: number, cy: number, radius: number, angle: number) {
  return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius }
}

function fromAngleDeg(cx: number, cy: number, deg: number, dist: number) {
  const rad = (deg * Math.PI) / 180
  return { x: cx + Math.cos(rad) * dist, y: cy + Math.sin(rad) * dist }
}

// ---------------------- Particle System ----------------------
type Phase = 'burst' | 'drift'
interface P {
  x: number; y: number; vx: number; vy: number; size: number; col: string;
  life: number; max: number; phase: Phase; seed: number;
}
let particles: P[] = []

function burst(x: number, y: number) {
  const count = props.particleCount
  particles.length = 0
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2
    const sp = 2 + Math.random() * 5
    particles.push({
      x, y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      size: 1 + Math.random() * 2,
      col: [props.colors.system, props.colors.salon, props.colors.cowork][i % 3],
      life: 0,
      max: 0.6 + Math.random() * 1.0,
      phase: 'burst',
      seed: Math.random() * 1000,
    })
  }
}

function jitter(t: number, seed: number, amp = 0.15) {
  return Math.sin(t * 0.7 + seed) * amp
}

function renderParticles(dt: number, tSec: number) {
  if (!ctx) return

  const grd = ctx.createLinearGradient(0,0,0,H)
  grd.addColorStop(0, 'rgba(10,12,16,0.35)')
  grd.addColorStop(1, 'rgba(10,12,16,0.55)')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, W, H)

  for (const p of particles) {
    if (p.phase === 'burst') {
      p.life += dt
      p.vx *= 0.995
      p.vy *= 0.995
      p.x += p.vx
      p.y += p.vy

      const alpha = Math.max(0, 1 - (p.life / p.max))
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.fillStyle = p.col
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      if (p.life >= p.max) {
        p.phase = 'drift'
        p.vx *= 0.2
        p.vy *= 0.2
        p.size = 1 + Math.random() * 1.5
      }
    } else {
      p.vx += jitter(tSec, p.seed, 0.02) * dt
      p.vy += jitter(tSec + 100, p.seed, 0.02) * dt
      p.vx *= 0.998
      p.vy *= 0.998
      p.x += p.vx
      p.y += p.vy

      if (p.x < -5) p.x = W + 5
      if (p.x > W + 5) p.x = -5
      if (p.y < -5) p.y = H + 5
      if (p.y > H + 5) p.y = -5

      const breath = (Math.sin((tSec + p.seed) * 0.6) + 1) / 2
      const alpha = props.idleAlpha * (0.65 + 0.35 * breath)
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.fillStyle = p.col
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }
}

// ---------------------- Lifecycle & Timeline ----------------------
let lastTime = 0
function loop(now: number) {
  const tSec = now / 1000
  const dt = Math.min(0.05, (now - lastTime) / 1000)
  lastTime = now
  renderParticles(dt, tSec)
  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  fit()
  resizeObs = new ResizeObserver(fit)
  resizeObs.observe(stage.value!)

  const cx = W / 2, cy = H / 2
  const orbitR = Math.min(W, H) * 0.22
  const startDist = Math.max(W, H) * 0.65 + R * 2

  // 角度指定で開始位置
  const startPos = props.entryAnglesDeg.slice(0, 3).map(deg =>
    fromAngleDeg(cx, cy, deg, startDist)
  )

  const nodes = [c1.value!, c2.value!, c3.value!]
  nodes.forEach((n, i) => {
    n.setAttribute('cx', String(startPos[i].x))
    n.setAttribute('cy', String(startPos[i].y))
    n.setAttribute('r', String(R))
    n.style.opacity = '0'
  })

  tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  // 1) 外から出てくる + フェードイン
  tl.fromTo(nodes[0],
    { attr: { cx: startPos[0].x, cy: startPos[0].y }, opacity: 0 },
    { duration: 0.9, attr: { cx: cx - orbitR, cy }, opacity: 1 }, 0
  )
  tl.fromTo(nodes[1],
    { attr: { cx: startPos[1].x, cy: startPos[1].y }, opacity: 0 },
    { duration: 0.9, attr: { cx: cx + orbitR, cy }, opacity: 1 }, 0
  )
  tl.fromTo(nodes[2],
    { attr: { cx: startPos[2].x, cy: startPos[2].y }, opacity: 0 },
    { duration: 0.9, attr: { cx, cy: cy - orbitR }, opacity: 1 }, 0
  )

  // 2) 軌道回転
  const orbitDummy = { t: 0 }
  const orbitUpdate = () => {
    const t = (gsap.getProperty(orbitDummy, 't') as number)
    const angle = t * Math.PI * 2
    const p1 = orbitPoint(cx, cy, orbitR, angle)
    const p2 = orbitPoint(cx, cy, orbitR, angle + (Math.PI * 2) / 3)
    const p3 = orbitPoint(cx, cy, orbitR, angle + (Math.PI * 4) / 3)
    nodes[0].setAttribute('cx', String(p1.x))
    nodes[0].setAttribute('cy', String(p1.y))
    nodes[1].setAttribute('cx', String(p2.x))
    nodes[1].setAttribute('cy', String(p2.y))
    nodes[2].setAttribute('cx', String(p3.x))
    nodes[2].setAttribute('cy', String(p3.y))
  }
  tl.to(orbitDummy, { t: 1, duration: props.orbitSec, ease: 'none', onUpdate: orbitUpdate }, 0.9)

  // 3) 合体
  tl.to(nodes.map(n => n), { duration: 0.6, attr: { cx, cy }, ease: 'power3.in' }, 0.9 + props.orbitSec)

  // 4) バースト（1回だけ）
  tl.add(() => {
    burst(cx, cy)
    lastTime = performance.now()
    if (!rafId) rafId = requestAnimationFrame(loop)
  }, 0.9 + props.orbitSec + 0.6)

  // 5) 装飾：縮めてホールド
  tl.to(nodes.map(n => n), { duration: 0.6, attr: { r: R * 0.9 }, ease: 'power1.out' }, 0.9 + props.orbitSec + 0.6 + 0.2)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (tl) tl.kill()
  if (resizeObs) resizeObs.disconnect()
})
</script>

<template>
  <section class="hero-section">
    <div ref="stage" class="stage" :style="{ paddingTop: aspectPadding }">
      <svg ref="svg" class="svg-layer">
        <defs>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g ref="orbitGroup" :filter="enableGlow ? 'url(#softGlow)' : undefined">
          <circle ref="c1" :r="r" :cx="-9999" :cy="-9999" :fill="colors.system" fill-opacity="0.9" />
          <circle ref="c2" :r="r" :cx="-9999" :cy="-9999" :fill="colors.salon" fill-opacity="0.9" />
          <circle ref="c3" :r="r" :cx="-9999" :cy="-9999" :fill="colors.cowork" fill-opacity="0.9" />
        </g>
      </svg>

      <canvas ref="canvas" class="canvas-layer"></canvas>

      <div class="copy-layer">
        <slot name="logo" />
        <!--eslint-disable-next-line vue/no-v-html -->
        <h1 v-if="headline" class="headline" v-html="headline" />
        <!--eslint-disable-next-line vue/no-v-html -->
        <p v-if="subline" class="subline" v-html="subline" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #000;
  border-radius: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (width <= $media-sp) {
    border-radius: 0;
  }
}
.stage {
  position: relative;
  width: 100%;
}
.svg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.canvas-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.copy-layer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.headline {
  margin-top: 0.5rem;
  color: #fff;
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: center;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}
@media (min-width: 768px) {
  .headline { font-size: 3rem; }
}
.subline {
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  text-align: center;
}
@media (min-width: 768px) {
  .subline { font-size: 1.125rem; }
}
.hero-section {
  background: radial-gradient(1200px 600px at 50% 40%, rgba(255,255,255,0.08), rgba(0,0,0,0)),
              linear-gradient(180deg, #0a0c10, #0a0c10 60%, #000 100%);
}
</style>
