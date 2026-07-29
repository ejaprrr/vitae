export function generateUnderline(w: number, h: number, loops: number = 2) {
  const r = (min: number, max: number) => Math.random() * (max - min) + min;
  
  let currentX = r(0, w * 0.05);
  let currentY = r(h * 0.4, h * 0.6);
  let d = `M ${currentX} ${currentY}`;
  
  for (let i = 0; i < loops; i++) {
    const isForward = i % 2 === 0;
    const c1x = isForward ? r(w * 0.2, w * 0.4) : r(w * 0.6, w * 0.8);
    const c2x = isForward ? r(w * 0.6, w * 0.8) : r(w * 0.2, w * 0.4);
    
    const c1y = r(h * 0.1, h * 0.9);
    const c2y = r(h * 0.1, h * 0.9);
    
    const endX = isForward ? r(w * 0.95, w) : r(0, w * 0.05);
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

export function generateArrow(w: number, h: number) {
  const r = (base: number, variance: number) => base + (Math.random() * variance * 2 - variance);
  
  const vx = w * 0.03; 
  const vy = h * 0.03; 
  
  const startX = r(w * 0.03, vx);
  const startY = r(h * 0.47, vy);
  
  const c1x = r(w * 0.31, vx);
  const c1y = r(h * 0.37, vy);
  const c2x = r(w * 0.62, vx);
  const c2y = r(h * 0.56, vy);
  const tipX = r(w * 0.87, vx);
  const tipY = r(h * 0.44, vy);
  
  // Top fin (sharper, swept back further left)
  const c3x = r(w * 0.75, vx);
  const c3y = r(h * 0.34, vy);
  const c4x = r(w * 0.55, vx);
  const c4y = r(h * 0.25, vy);
  const topFinX = r(w * 0.40, vx);
  const topFinY = r(h * 0.15, vy);
  
  // Return tip (slightly left of tip, shifted down)
  const c5x = r(w * 0.55, vx);
  const c5y = r(h * 0.25, vy);
  const c6x = r(w * 0.75, vx);
  const c6y = r(h * 0.37, vy);
  const returnTipX = r(w * 0.84, vx);
  const returnTipY = r(h * 0.50, vy);
  
  // Bottom fin (sharper, swept back further left)
  const c7x = r(w * 0.75, vx);
  const c7y = r(h * 0.62, vy);
  const c8x = r(w * 0.55, vx);
  const c8y = r(h * 0.81, vy);
  const botFinX = r(w * 0.40, vx);
  const botFinY = r(h * 0.85, vy);

  return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tipX} ${tipY} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${topFinX} ${topFinY} C ${c5x} ${c5y}, ${c6x} ${c6y}, ${returnTipX} ${returnTipY} C ${c7x} ${c7y}, ${c8x} ${c8y}, ${botFinX} ${botFinY}`;
}

export function generateArrowDown(w: number, h: number) {
  const r = (base: number, variance: number) => base + (Math.random() * variance * 2 - variance);
  
  const vx = w * 0.03; 
  const vy = h * 0.03; 
  
  const startX = r(w * 0.47, vx);
  const startY = r(h * 0.03, vy);
  
  const c1x = r(w * 0.37, vx);
  const c1y = r(h * 0.31, vy);
  const c2x = r(w * 0.56, vx);
  const c2y = r(h * 0.62, vy);
  const tipX = r(w * 0.44, vx);
  const tipY = r(h * 0.87, vy);
  
  // Left fin
  const c3x = r(w * 0.34, vx);
  const c3y = r(h * 0.75, vy);
  const c4x = r(w * 0.25, vx);
  const c4y = r(h * 0.55, vy);
  const leftFinX = r(w * 0.15, vx);
  const leftFinY = r(h * 0.40, vy);
  
  // Return tip
  const c5x = r(w * 0.25, vx);
  const c5y = r(h * 0.55, vy);
  const c6x = r(w * 0.37, vx);
  const c6y = r(h * 0.75, vy);
  const returnTipX = r(w * 0.50, vx);
  const returnTipY = r(h * 0.84, vy);
  
  // Right fin
  const c7x = r(w * 0.62, vx);
  const c7y = r(h * 0.75, vy);
  const c8x = r(w * 0.81, vx);
  const c8y = r(h * 0.55, vy);
  const rightFinX = r(w * 0.85, vx);
  const rightFinY = r(h * 0.40, vy);

  return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${tipX} ${tipY} C ${c3x} ${c3y}, ${c4x} ${c4y}, ${leftFinX} ${leftFinY} C ${c5x} ${c5y}, ${c6x} ${c6y}, ${returnTipX} ${returnTipY} C ${c7x} ${c7y}, ${c8x} ${c8y}, ${rightFinX} ${rightFinY}`;
}
