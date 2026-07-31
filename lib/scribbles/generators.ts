export function generateUnderline(w: number, h: number, loops = 2) {
  const r = (min: number, max: number) => Math.random() * (max - min) + min;

  // absolutni okraje omezene procenty, aby nevznikly obrovske mezery na velkych elementech
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

export function generateCircle(w: number, h: number, loops = 1) {
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

export function generateArrowDirectional(
  w: number,
  h: number,
  direction: "up" | "down" | "left" | "right"
) {
  const isVertical = direction === "up" || direction === "down";
  const W = isVertical ? h : w;
  const H = isVertical ? w : h;

  const r = (base: number, variance: number) => base + (Math.random() * variance * 2 - variance);

  // zvysena variance pro opravdovy hand-drawn chaos
  const curveVx = W * 0.15; // extremni variance pro zakriveni samotne sipky
  const curveVy = H * 0.15;
  const px = W * 0.08; // vetsi variance pro pozice hrotu
  const py = H * 0.08;

  const p = (x: number, y: number) => {
    switch (direction) {
      case "right":
        return { x, y };
      case "left":
        return { x: w - x, y: h - y };
      case "down":
        return { x: w - y, y: x };
      case "up":
        return { x: y, y: h - x };
    }
  };

  const start = p(r(W * 0.05, px), r(H * 0.5, py));

  // krivka letu sipky (velka nahodnost)
  const c1 = p(r(W * 0.3, curveVx), r(H * 0.3, curveVy));
  const c2 = p(r(W * 0.6, curveVx), r(H * 0.7, curveVy));
  const tip = p(r(W * 0.9, px), r(H * 0.5, py));

  // horni ploutvicka
  const c3 = p(r(W * 0.8, px), r(H * 0.3, py));
  const c4 = p(r(W * 0.6, px), r(H * 0.2, py));
  const topFin = p(r(W * 0.45, px), r(H * 0.15, py));

  // navrat k hrotu
  const c5 = p(r(W * 0.55, px), r(H * 0.25, py));
  const c6 = p(r(W * 0.75, px), r(H * 0.4, py));
  const returnTip = p(r(W * 0.85, px), r(H * 0.5, py));

  // spodni ploutvicka
  const c7 = p(r(W * 0.75, px), r(H * 0.65, py));
  const c8 = p(r(W * 0.55, px), r(H * 0.8, py));
  const botFin = p(r(W * 0.45, px), r(H * 0.85, py));

  return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${tip.x} ${tip.y} C ${c3.x} ${c3.y}, ${c4.x} ${c4.y}, ${topFin.x} ${topFin.y} C ${c5.x} ${c5.y}, ${c6.x} ${c6.y}, ${returnTip.x} ${returnTip.y} C ${c7.x} ${c7.y}, ${c8.x} ${c8.y}, ${botFin.x} ${botFin.y}`;
}

export function generateStar(w: number, h: number, loops = 1) {
  const r = (min: number, max: number) => Math.random() * (max - min) + min;
  const cx = w / 2;
  const cy = h / 2;
  const radius = (Math.min(w, h) / 2) * 0.95;

  let d = "";

  for (let l = 0; l < loops; l++) {
    const rotOffset = r(-0.1, 0.1);
    const points: { x: number; y: number }[] = [];

    // peticipy pentagram kresleny skokem o 2 vrcholy
    for (let i = 0; i < 5; i++) {
      // krok o 2 * (2pi/5) = 144 stupnu
      const angle = -Math.PI / 2 + (i * 2 * Math.PI * 2) / 5 + rotOffset;
      // jemnejsi odchylka polomeru
      const currentRadius = radius + r(-radius * 0.1, radius * 0.1);

      const varX = r(-w * 0.05, w * 0.05);
      const varY = r(-h * 0.05, h * 0.05);
      points.push({
        x: cx + Math.cos(angle) * currentRadius + varX,
        y: cy + Math.sin(angle) * currentRadius + varY,
      });
    }

    if (l === 0) {
      d += `M ${points[0].x} ${points[0].y}`;
    } else {
      // volnejsi napojeni mezi smyckami, ale s mirou
      const c1x = cx + r(-w * 0.15, w * 0.15);
      const c1y = cy + r(-h * 0.15, h * 0.15);
      d += ` Q ${c1x} ${c1y} ${points[0].x} ${points[0].y}`;
    }

    for (let i = 1; i <= 5; i++) {
      const p = points[i % 5];
      const prev = points[i - 1];
      // vetsi chaos u car spojujicich cipy, ale drzi tvar
      const c1x = prev.x + (p.x - prev.x) * 0.5 + r(-w * 0.08, w * 0.08);
      const c1y = prev.y + (p.y - prev.y) * 0.5 + r(-h * 0.08, h * 0.08);
      d += ` Q ${c1x} ${c1y} ${p.x} ${p.y}`;
    }
  }
  return d;
}

export function generateHeart(w: number, h: number, loops = 1) {
  const r = (min: number, max: number) => Math.random() * (max - min) + min;
  let d = "";

  let currentCleft = {
    x: w * 0.5 + r(-w * 0.05, w * 0.05),
    y: h * 0.2 + r(-h * 0.1, h * 0.1),
  };

  for (let l = 0; l < loops; l++) {
    // velka asymetrie laloku (sisatost)
    const rightLobeTop = {
      x: w * 0.9 + r(-w * 0.1, w * 0.15),
      y: h * 0.05 + r(-h * 0.15, h * 0.2),
    };
    const rightEdge = { x: w * 0.95 + r(-w * 0.1, w * 0.05), y: h * 0.4 + r(-h * 0.1, h * 0.1) };

    // protazena spicka na jedne strane (overshoot)
    const bottomTipRight = {
      x: w * 0.5 + r(-w * 0.1, w * 0.15),
      y: h * 0.9 + r(0, h * 0.2), // spodek casto pretahne dolu
    };

    // druha pulka zacina mirne vedle, cimz vznikne prekrizeni tahu na spicce
    const bottomTipLeft = {
      x: bottomTipRight.x + r(-w * 0.15, w * 0.05),
      y: bottomTipRight.y + r(-h * 0.1, h * 0.05),
    };

    const leftEdge = { x: w * 0.05 + r(-w * 0.05, w * 0.1), y: h * 0.4 + r(-h * 0.1, h * 0.1) };
    const leftLobeTop = { x: w * 0.1 + r(-w * 0.15, w * 0.1), y: h * 0.05 + r(-h * 0.15, h * 0.2) };

    // konec tahu se nemusi trefit presne do vychoziho bodu
    const endCleft = {
      x: currentCleft.x + r(-w * 0.15, w * 0.15),
      y: currentCleft.y + r(-h * 0.1, h * 0.15),
    };

    if (l === 0) {
      d += `M ${currentCleft.x} ${currentCleft.y}`;
    } else {
      // volne navazani dalsiho tahu
      d += ` Q ${w * 0.5 + r(-w * 0.1, w * 0.1)} ${h * 0.5} ${currentCleft.x} ${currentCleft.y}`;
    }

    // prava pulka dolu
    d += ` C ${rightLobeTop.x} ${currentCleft.y - h * 0.2}, ${rightEdge.x} ${rightLobeTop.y}, ${rightEdge.x} ${rightEdge.y}`;
    d += ` C ${rightEdge.x} ${h * 0.7}, ${w * 0.7} ${h * 0.8}, ${bottomTipRight.x} ${bottomTipRight.y}`;

    // ostry zlom na spicce (prekrizeni tahu)
    d += ` L ${bottomTipLeft.x} ${bottomTipLeft.y}`;

    // leva pulka nahoru
    d += ` C ${w * 0.3} ${h * 0.8}, ${leftEdge.x} ${h * 0.7}, ${leftEdge.x} ${leftEdge.y}`;
    d += ` C ${leftEdge.x} ${leftLobeTop.y}, ${leftLobeTop.x} ${endCleft.y - h * 0.2}, ${endCleft.x} ${endCleft.y}`;

    currentCleft = endCleft;
  }

  return d;
}
