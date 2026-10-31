import React from 'react';

const SCENES = {
  shopping: { src: '/scenes/scene-shopping-v3.webp', label: 'Pasar tradisional yang ramai' },
  health: { src: '/scenes/scene-health-v3.webp', label: 'Ruang pemeriksaan rumah sakit' },
  travel: { src: '/scenes/scene-travel-v3.webp', label: 'Ruang keberangkatan bandara' },
  'hajj-umrah': { src: '/scenes/scene-hajj-umrah-v3.webp', label: 'Ruang persiapan keberangkatan jamaah haji' },
  technology: { src: '/scenes/scene-technology-v3.webp', label: 'Laboratorium komputer sekolah' },
  religions: { src: '/scenes/scene-religions-v3.webp', label: 'Pameran keberagaman Indonesia' },
  // Backward-compatible aliases for older saved sessions.
  cafeteria: { src: '/scenes/scene-shopping-v3.webp', label: 'Pasar tradisional yang ramai' },
  laboratory: { src: '/scenes/scene-health-v3.webp', label: 'Ruang pemeriksaan rumah sakit' },
  office: { src: '/scenes/scene-technology-v3.webp', label: 'Laboratorium komputer sekolah' },
  library: { src: '/scenes/scene-travel-v3.webp', label: 'Ruang keberangkatan bandara' }
};

export default function SceneArt({ sceneType, focusId = null, evidence = [], zoomScale = 2.65, className = '' }) {
  const scene = SCENES[sceneType] ?? SCENES.shopping;
  const focus = focusId ? evidence.find((item) => item.id === focusId)?.hotspot : null;
  const imageStyle = focus
    ? {
        '--zoom-width': `${zoomScale * 100}%`,
        '--zoom-height': `${zoomScale * 100}%`,
        '--zoom-left': `${50 - focus.left * zoomScale}%`,
        '--zoom-top': `${50 - focus.top * zoomScale}%`
      }
    : undefined;

  return (
    <img
      className={`scene-art scene-illustration ${focus ? 'scene-art-zoomed' : ''} ${className}`.trim()}
      src={scene.src}
      alt={`Ilustrasi ${scene.label}`}
      loading="lazy"
      decoding="async"
      draggable="false"
      style={imageStyle}
    />
  );
}
