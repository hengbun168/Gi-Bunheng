import { Suspense, useState, useEffect, lazy } from 'react';
import CSSFallback from './CSSFallback';

const Scene3DCanvas = lazy(() => import('./Scene3DCanvas'));

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function isMobile() {
  return window.innerWidth < 768;
}

export default function Scene() {
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    return detectWebGL();
  });

  if (!hasWebGL) {
    return <CSSFallback />;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={<CSSFallback />}>
        <Scene3DCanvas mobile={isMobile()} />
      </Suspense>
    </div>
  );
}
