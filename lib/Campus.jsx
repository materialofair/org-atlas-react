import React, { useEffect, useRef } from 'react'

// Orthographic architectural study, drawn locally so the artwork works offline.
export function Campus() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const scale = Math.min(window.devicePixelRatio || 1, 3)
    canvas.width = 540 * scale
    canvas.height = 240 * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(scale, scale)
    const point = (x, y, z = 0) => [284 + (x - y) * 0.92, 132 + (x + y) * 0.38 - z]
    function line(a, b, color, width = 0.65) {
      ctx.beginPath()
      ctx.moveTo(...point(...a))
      ctx.lineTo(...point(...b))
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.stroke()
    }
    function face(vertices, fill, stroke) {
      ctx.beginPath()
      vertices.forEach((p, i) => i ? ctx.lineTo(...point(...p)) : ctx.moveTo(...point(...p)))
      ctx.closePath()
      ctx.fillStyle = fill
      ctx.fill()
      if (stroke) {
        ctx.strokeStyle = stroke
        ctx.lineWidth = 0.85
        ctx.stroke()
      }
    }
    const ink = '#547d6e'
    const glass = ['#d7e9da', '#93b9a6', '#739d8c']
    const stone = ['#f1f1d8', '#cddac2', '#adbfaa']
    function box(x, y, w, d, z, h, colors, windows = false) {
      const r = x+w, b = y+d, t = z+h
      face([[x,b,t],[r,b,t],[r,b,z],[x,b,z]], colors[1], ink)
      face([[r,y,t],[r,b,t],[r,b,z],[r,y,z]], colors[2], ink)
      if (windows) {
        for (let i=x+5; i<r; i+=6) line([i,b,z+2],[i,b,t-2], '#537b6aa6')
        for (let i=y+5; i<b; i+=6) line([r,i,z+2],[r,i,t-2], '#486f60a6')
        for (let k=z+8; k<t; k+=9) {
          line([x,b,k],[r,b,k], '#e6efdb', 1.35)
          line([r,b,k],[r,y,k], '#c2d7bd', 1.35)
        }
      }
      face([[x,y,t],[r,y,t],[r,b,t],[x,b,t]], colors[0], ink)
    }
    for (let i=-360;i<380;i+=22) {
      line([i,-320],[i,360], '#71938420')
      line([-340,i],[380,i], '#71938420')
    }
    box(-99,-64,210,153,-4,4,['#dbe5cf','#b9cdb6','#a5bca7'])
    // The rear tower, atrium and two staggered laboratory wings.
    box(-33,-48,78,49,0,74,glass,true)
    box(-35,-50,82,53,74,3,stone)
    box(-24,-40,59,33,77,2,['#c5d8c6','#c0d1b6','#a7beab'])
    box(-17,-34,27,13,79,4,stone)
    box(-81,4,65,66,0,28,glass,true)
    box(-83,2,69,70,28,3,stone)
    box(-74,10,50,48,31,2,['#c5dac7','#c0d1b6','#a7beab'])
    box(-6,-1,48,45,0,21,stone)
    box(46,-31,48,91,0,42,glass,true)
    box(44,-33,52,95,42,3,stone)
    box(51,-23,38,73,45,2,['#cbddc9','#becdb9','#a7beab'])
    for (let i=0;i<4;i++) box(3+i*3,49+i*3,29,6,0,4-i*0.7,stone)
    function tree(x,y,size) {
      line([x,y,0],[x,y,12],ink,1.5)
      const [cx,cy] = point(x,y,15)
      ctx.beginPath()
      ctx.ellipse(cx,cy,size*0.67,size,0,0,Math.PI*2)
      ctx.fillStyle='#92b59b'
      ctx.fill()
      ctx.strokeStyle=ink
      ctx.stroke()
      line([x,y,7],[x,y,17],ink)
    }
    ;[[-87,78,7],[-70,80,8],[61,75,7],[79,76,9],[98,75,7],[102,52,8]].forEach(p=>tree(...p))
  }, [])
  return <canvas className="oe-campus" ref={ref} aria-hidden="true" />
}
