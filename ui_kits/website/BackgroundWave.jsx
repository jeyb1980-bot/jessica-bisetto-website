/* global React */

/**
 * BackgroundWave — a slow, subtle water wave that drifts across the viewport.
 * Reinforces the surfing / wave metaphor without competing with content.
 * - Fixed position, behind everything (z-index: 0, pointer-events: none)
 * - Two waves at different heights, slightly different speeds, for depth
 * - Very low opacity (CSS) so type stays legible
 */
function BackgroundWave() {
  return (
    <div className="bg-wave" aria-hidden="true">
      <svg
        className="bg-wave__svg bg-wave__svg--a"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C200,40 400,160 600,100 C800,40 1000,160 1200,100 C1400,40 1600,160 1800,100 C2000,40 2200,160 2400,100 L2400,200 L0,200 Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="bg-wave__svg bg-wave__svg--b"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C250,60 450,180 700,120 C950,60 1150,180 1400,120 C1650,60 1850,180 2100,120 C2275,80 2350,140 2400,120 L2400,200 L0,200 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

window.BackgroundWave = BackgroundWave;
