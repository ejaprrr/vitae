export function generateUnderline(w: number, h: number, loops: number = 2) {
  const r = (min: number, max: number) => Math.random() * (max - min) + min;
  
  // Use absolute margins bounded by percentages so it doesn't leave huge gaps on large elements
  const marginX = Math.min(10, w * 0.05);
  
  const currentX = r(0, marginX);
  const currentY = r(h * 0.4, h * 0.6);
  let d = `M ${currentX} ${currentY}`;
  
  for (let i = 0; i < loops; i++) {
    const isForward = i % 2 === 0;
    const c1x = isForward ? r(w * 0.2, w * 0.4) : r(w * 0.6, w * 0.8);
    const c2x = isForward ? r(w * 0.6, w * 0.8) : r(w * 0.2, w * 0.4);
    
    const c1y = r(h * 0.1, h * 0.9);
    const c2y = r(h * 0.1, h * 0.9);
    
    const endX = isForward ? r(w - marginX, w) : r(0, marginX);
    const endY = r(h * 0.4, h * 0.6);
    
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
  }
  
  return d;
}

export function generateCircle(w: number, h: number, loops: number = 1) {
  const r = (min: number, max: number) => Math.random() * (max - min) + min;
  
  const minX = 0;
  const maxX = w;
  const minY = 0;
  const maxY = h;
  
  const startX = r(w * 0.4, w * 0.6);
  const startY = minY;
  
  let d = `M ${startX} ${startY}`;
  
  for (let i = 0; i < loops; i++) {
    const c1x = r(maxX - w * 0.2, maxX);
    const c1y = minY;
    const c2x = maxX;
    const c2y = r(minY + h * 0.2, h * 0.5);
    const p1x = maxX;
    const p1y = r(h * 0.4, h * 0.6);
    
    const c3x = maxX;
    const c3y = r(h * 0.5, maxY - h * 0.2);
    const c4x = r(maxX - w * 0.2, maxX);
    const c4y = maxY;
    const p2x = r(w * 0.4, w * 0.6);
    const p2y = maxY;
    
    const c5x = r(minX, minX + w * 0.2);
    const c5y = maxY;
    const c6x = minX;
    const c6y = r(h * 0.5, maxY - h * 0.2);
    const p3x = minX;
    const p3y = r(h * 0.4, h * 0.6);
    
    const c7x = minX;
    const c7y = r(minY + h * 0.2, h * 0.5);
    const c8x = r(minX, minX + w * 0.2);
    const c8y = minY;
    const endX = r(w * 0.4, w * 0.6);
    const endY = r(minY - h * 0.05, minY + h * 0.05); 
    
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p1x} ${p1y} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${p2x} ${p2y} C ${c5x} ${c5y}, ${c6x} ${c6y}, ${p3x} ${p3y} C ${c7x} ${c7y}, ${c8x} ${c8y}, ${endX} ${endY}`;
  }

  return d;
}

export function generateArrowDirectional(w: number, h: number, direction: 'up' | 'down' | 'left' | 'right') {
  const isVertical = direction === 'up' || direction === 'down';
  const W = isVertical ? h : w;
  const H = isVertical ? w : h;

  const r = (base: number, variance: number) => base + (Math.random() * variance * 2 - variance);
  
  // Zvýšená variance pro opravdový "hand-drawn" chaos
  const curveVx = W * 0.15; // Extrémní variance pro zakřivení samotné šipky
  const curveVy = H * 0.15;
  const px = W * 0.08;      // Větší variance pro pozice hrotů
  const py = H * 0.08;
  
  const p = (x: number, y: number) => {
    switch (direction) {
      case 'right': return { x, y };
      case 'left': return { x: w - x, y: h - y };
      case 'down': return { x: w - y, y: x };
      case 'up': return { x: y, y: h - x };
    }
  };

  const start = p(r(W * 0.05, px), r(H * 0.5, py));
  
  // Křivka letu šipky (velká náhodnost)
  const c1 = p(r(W * 0.3, curveVx), r(H * 0.3, curveVy));
  const c2 = p(r(W * 0.6, curveVx), r(H * 0.7, curveVy));
  const tip = p(r(W * 0.9, px), r(H * 0.5, py));
  
  // Horní ploutvička
  const c3 = p(r(W * 0.8, px), r(H * 0.3, py));
  const c4 = p(r(W * 0.6, px), r(H * 0.2, py));
  const topFin = p(r(W * 0.45, px), r(H * 0.15, py));
  
  // Návrat k hrotu
  const c5 = p(r(W * 0.55, px), r(H * 0.25, py));
  const c6 = p(r(W * 0.75, px), r(H * 0.4, py));
  const returnTip = p(r(W * 0.85, px), r(H * 0.5, py));
  
  // Spodní ploutvička
  const c7 = p(r(W * 0.75, px), r(H * 0.65, py));
  const c8 = p(r(W * 0.55, px), r(H * 0.8, py));
  const botFin = p(r(W * 0.45, px), r(H * 0.85, py));

  return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${tip.x} ${tip.y} C ${c3.x} ${c3.y}, ${c4.x} ${c4.y}, ${topFin.x} ${topFin.y} C ${c5.x} ${c5.y}, ${c6.x} ${c6.y}, ${returnTip.x} ${returnTip.y} C ${c7.x} ${c7.y}, ${c8.x} ${c8.y}, ${botFin.x} ${botFin.y}`;
}
