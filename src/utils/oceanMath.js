/**
 * Shared mathematical model for stylized anime ocean waves.
 * Both the Ocean mesh and the Pirate Ship sample this so the ship
 * rides the crests and troughs realistically.
 */

export function getWaveHeight(x, z, time) {
  // Primary rolling ocean swell (direction: angled across screen)
  const wave1 = Math.sin(x * 0.12 + z * 0.08 + time * 1.2) * 0.45;
  // Secondary cross-swell (adds natural irregularity)
  const wave2 = Math.cos(x * 0.22 - z * 0.14 + time * 1.6) * 0.25;
  // Faster chop / foam ripples
  const wave3 = Math.sin(x * 0.35 + z * 0.28 + time * 2.4) * 0.12;
  // Gentle ambient heave
  const wave4 = Math.cos(x * 0.05 + time * 0.8) * 0.3;

  return wave1 + wave2 + wave3 + wave4;
}

export function getWaveNormal(x, z, time, delta = 0.2) {
  const hL = getWaveHeight(x - delta, z, time);
  const hR = getWaveHeight(x + delta, z, time);
  const hD = getWaveHeight(x, z - delta, time);
  const hU = getWaveHeight(x, z + delta, time);

  // Normal vector approx
  const nx = (hL - hR) / (2 * delta);
  const nz = (hD - hU) / (2 * delta);
  const ny = 1.0;

  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  return [nx / len, ny / len, nz / len];
}
