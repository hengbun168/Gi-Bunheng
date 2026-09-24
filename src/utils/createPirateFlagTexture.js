import * as THREE from 'three';

/**
 * Generates an original high-resolution CanvasTexture for Gi Bunheng's custom pirate flag.
 * Combines:
 * - Abstract cyber-skull geometry
 * - Developer brackets { } and < / >
 * - Bold 'GB' monogram
 * - Digital circuit traces & starry pirate cosmos
 */
export function createPirateFlagCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  if (!ctx) return canvas;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Dark weathered pirate canvas background with deep ocean navy/obsidian
  const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w / 1.5);
  bgGrad.addColorStop(0, '#0a1626');
  bgGrad.addColorStop(0.6, '#060d17');
  bgGrad.addColorStop(1, '#020508');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Subtle canvas weave texture
  ctx.save();
  ctx.fillStyle = 'rgba(0, 217, 255, 0.02)';
  for (let x = 0; x < w; x += 8) {
    ctx.fillRect(x, 0, 1, h);
  }
  for (let y = 0; y < h; y += 8) {
    ctx.fillRect(0, y, w, 1);
  }
  ctx.restore();

  // Subtle cyber circuit lines in the background
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 255, 156, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  // Circuit tracks
  ctx.moveTo(80, 80);
  ctx.lineTo(240, 80);
  ctx.lineTo(290, 130);
  ctx.lineTo(400, 130);

  ctx.moveTo(w - 80, 80);
  ctx.lineTo(w - 240, 80);
  ctx.lineTo(w - 290, 130);
  ctx.lineTo(w - 400, 130);

  ctx.moveTo(80, h - 80);
  ctx.lineTo(240, h - 80);
  ctx.lineTo(290, h - 130);
  ctx.lineTo(400, h - 130);

  ctx.moveTo(w - 80, h - 80);
  ctx.lineTo(w - 240, h - 80);
  ctx.lineTo(w - 290, h - 130);
  ctx.lineTo(w - 400, h - 130);
  ctx.stroke();

  // Circuit contact nodes
  const nodes = [
    [80, 80], [240, 80], [290, 130], [400, 130],
    [w - 80, 80], [w - 240, 80], [w - 290, 130], [w - 400, 130],
    [80, h - 80], [240, h - 80], [290, h - 130], [400, h - 130],
    [w - 80, h - 80], [w - 240, h - 80], [w - 290, h - 130], [w - 400, h - 130],
  ];
  ctx.fillStyle = '#00ff9c';
  nodes.forEach(([nx, ny]) => {
    ctx.beginPath();
    ctx.arc(nx, ny, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // Flag Border / Cyber runes edge
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 217, 255, 0.35)';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, w - 60, h - 60);

  ctx.strokeStyle = 'rgba(0, 255, 156, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, w - 80, h - 80);
  ctx.restore();

  // 2. Crossed Developer Key-Swords (replacing traditional pirate crossbones)
  ctx.save();
  ctx.translate(w / 2, h / 2);

  const drawCrossBlade = (angle) => {
    ctx.save();
    ctx.rotate(angle);

    // Glowing cyan/green energy beam blade
    const swordGrad = ctx.createLinearGradient(-190, 0, 190, 0);
    swordGrad.addColorStop(0, '#00ff9c');
    swordGrad.addColorStop(0.5, '#00d9ff');
    swordGrad.addColorStop(1, '#00ff9c');

    ctx.shadowColor = '#00d9ff';
    ctx.shadowBlur = 18;

    // Center blade shaft
    ctx.fillStyle = swordGrad;
    ctx.beginPath();
    ctx.moveTo(-180, -5);
    ctx.lineTo(180, -5);
    ctx.lineTo(210, 0);
    ctx.lineTo(180, 5);
    ctx.lineTo(-180, 5);
    ctx.lineTo(-210, 0);
    ctx.closePath();
    ctx.fill();

    // Cross-guard brackets: < and >
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('<', -140, 0);
    ctx.fillText('>', 140, 0);

    ctx.restore();
  };

  drawCrossBlade(Math.PI / 4.2);
  drawCrossBlade(-Math.PI / 4.2);
  ctx.restore();

  // 3. Central Skull + Developer Shield Geometry
  ctx.save();
  const cx = w / 2;
  const cy = h / 2;

  // Outer energy glow aura
  const aura = ctx.createRadialGradient(cx, cy, 30, cx, cy, 180);
  aura.addColorStop(0, 'rgba(0, 255, 156, 0.2)');
  aura.addColorStop(0.5, 'rgba(0, 217, 255, 0.1)');
  aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(cx, cy, 190, 0, Math.PI * 2);
  ctx.fill();

  // Futuristic Skull Silhouette: Sharp anime angular plates
  ctx.shadowColor = '#00ff9c';
  ctx.shadowBlur = 24;

  ctx.fillStyle = '#e8f9ff';
  ctx.beginPath();
  // Forehead top curved apex
  ctx.moveTo(cx - 75, cy - 85);
  ctx.lineTo(cx, cy - 110);
  ctx.lineTo(cx + 75, cy - 85);
  // Temple flares
  ctx.lineTo(cx + 105, cy - 35);
  // Cheekbones
  ctx.lineTo(cx + 85, cy + 25);
  // Jaw tapering
  ctx.lineTo(cx + 45, cy + 85);
  ctx.lineTo(cx - 45, cy + 85);
  ctx.lineTo(cx - 85, cy + 25);
  ctx.lineTo(cx - 105, cy - 35);
  ctx.closePath();
  ctx.fill();

  // Inner dark face cavity
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#050c17';
  ctx.beginPath();
  ctx.moveTo(cx - 65, cy - 75);
  ctx.lineTo(cx, cy - 95);
  ctx.lineTo(cx + 65, cy - 75);
  ctx.lineTo(cx + 85, cy - 30);
  ctx.lineTo(cx + 70, cy + 20);
  ctx.lineTo(cx + 35, cy + 75);
  ctx.lineTo(cx - 35, cy + 75);
  ctx.lineTo(cx - 70, cy + 20);
  ctx.lineTo(cx - 85, cy - 30);
  ctx.closePath();
  ctx.fill();

  // Cyber Eye Sockets: Sharp angled hexagonal / visor slits
  ctx.fillStyle = '#00d9ff';
  ctx.shadowColor = '#00d9ff';
  ctx.shadowBlur = 15;

  // Left Eye Socket
  ctx.beginPath();
  ctx.moveTo(cx - 50, cy - 25);
  ctx.lineTo(cx - 20, cy - 32);
  ctx.lineTo(cx - 15, cy - 10);
  ctx.lineTo(cx - 40, cy - 5);
  ctx.closePath();
  ctx.fill();

  // Right Eye Socket
  ctx.beginPath();
  ctx.moveTo(cx + 50, cy - 25);
  ctx.lineTo(cx + 20, cy - 32);
  ctx.lineTo(cx + 15, cy - 10);
  ctx.lineTo(cx + 40, cy - 5);
  ctx.closePath();
  ctx.fill();

  // Forehead Developer Code: </ >
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillStyle = '#00ff9c';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#00ff9c';
  ctx.shadowBlur = 10;
  ctx.fillText('</>', cx, cy - 55);

  // Center Monogram: The bold "GB" Emblem in jaw/teeth area
  ctx.font = '900 48px "Outfit", "Inter", sans-serif';
  const gbGrad = ctx.createLinearGradient(cx - 50, cy + 10, cx + 50, cy + 55);
  gbGrad.addColorStop(0, '#ffffff');
  gbGrad.addColorStop(0.5, '#00ff9c');
  gbGrad.addColorStop(1, '#00d9ff');
  ctx.fillStyle = gbGrad;
  ctx.shadowColor = '#00d9ff';
  ctx.shadowBlur = 20;
  ctx.fillText('GB', cx, cy + 42);

  // Digital Teeth / Frequency bars at bottom jaw
  ctx.fillStyle = '#00ff9c';
  ctx.shadowBlur = 6;
  const teethWidth = 6;
  const startX = cx - 28;
  for (let i = 0; i < 7; i++) {
    const barH = 8 + (i % 2 === 0 ? 6 : 0);
    ctx.fillRect(startX + i * 8, cy + 62, teethWidth, barH);
  }

  // Cheekbone Curly Braces: { and }
  ctx.font = '600 36px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
  ctx.shadowColor = '#00d9ff';
  ctx.shadowBlur = 12;
  ctx.fillText('{', cx - 118, cy);
  ctx.fillText('}', cx + 118, cy);

  // Lower Subtitle: PIRATE // DEVELOPER
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.letterSpacing = '5px';
  ctx.fillStyle = 'rgba(125, 211, 252, 0.9)';
  ctx.fillText('• PIRATE DEV •', cx, cy + 120);

  ctx.restore();

  return canvas;
}

let cachedTexture = null;

export function getPirateFlagTexture() {
  if (cachedTexture) return cachedTexture;
  const canvas = createPirateFlagCanvas();
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  cachedTexture = texture;
  return texture;
}

export function getPirateFlagDataUrl() {
  if (typeof document === 'undefined') return '';
  const canvas = createPirateFlagCanvas();
  return canvas.toDataURL('image/png');
}
