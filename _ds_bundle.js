/* @ds-bundle: {"format":4,"namespace":"JessicaBisettoDesignSystem_019e13","components":[],"sourceHashes":{"slides/deck-stage.js":"aa08491f8fd6","ui_kits/blog/App.jsx":"1cd23b4fb9c9","ui_kits/blog/BlogArticle.jsx":"eb9264deb6ea","ui_kits/blog/BlogList.jsx":"e96469390ffa","ui_kits/booking/App.jsx":"dbe37a875250","ui_kits/booking/BookingFlow.jsx":"155469af88e2","ui_kits/website/App.jsx":"d39aca4c96f3","ui_kits/website/BackgroundWave.jsx":"013c32785cbd","ui_kits/website/Footer.jsx":"d8ba4753a10b","ui_kits/website/Header.jsx":"f4142feae3b0","ui_kits/website/Kontakt.jsx":"539a12d997d3","ui_kits/website/Screens.jsx":"66efa6f45c10","ui_kits/website/Sections.jsx":"ab39e314971f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JessicaBisettoDesignSystem_019e13 = window.JessicaBisettoDesignSystem_019e13 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// slides/deck-stage.js
try { (() => {
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *  (g) thumbnail rail — resizable left-hand column of per-slide thumbnails
 *      (static clones). Click to navigate; ↑/↓ with a thumbnail focused to
 *      step between slides; drag to reorder; right-click for
 *      Skip / Move up / Move down / Delete (opens a Cancel/Delete confirm
 *      dialog). Drag the rail's right edge to resize; width persists to
 *      localStorage. Skipped slides carry `data-deck-skip`, are dimmed in
 *      the rail, omitted from prev/next navigation, and hidden at print.
 *      The rail is suppressed in presenting mode, on `noscale`, and via
 *      the `no-rail` attribute. Rail mutations dispatch a `deckchange`
 *      CustomEvent on the element: detail = {action, from, to, slide}.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: none at the deck level. The host app keeps the current slide
 * in its own URL (?slide=) and re-delivers it via location.hash on load, so a
 * bare load with no hash always starts at slide 1.
 *
 * Usage:
 *   <style>deck-stage:not(:defined){visibility:hidden}</style>
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *   <script src="deck-stage.js"></script>
 *
 * The :not(:defined) rule prevents a flash of the first slide at its
 * authored styles before this script runs and attaches the shadow root.
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const pad2 = n => String(n).padStart(2, '0');
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Thumbnail rail ──────────────────────────────────────────────────
       Fixed column on the left; each thumbnail is a static deep-clone of
       the light-DOM slide scaled into a 16:9 (or design-aspect) frame. The
       stage re-fits around it (see _fit); hidden during present / noscale
       / print so capture geometry and fullscreen output are unchanged. */
    .rail {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: var(--deck-rail-w, 188px);
      background: #141414;
      border-right: 1px solid rgba(255,255,255,0.08);
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 2147482500;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.18) transparent;
    }
    .rail::-webkit-scrollbar { width: 8px; }
    .rail::-webkit-scrollbar-track { background: transparent; margin: 2px; }
    .rail::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 4px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .rail::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.28);
      border: 2px solid transparent;
      background-clip: content-box;
    }
    :host([no-rail]) .rail,
    :host([noscale]) .rail { display: none; }
    .rail[data-presenting] { display: none; }
    /* User-driven show/hide (the TweaksPanel toggle) slides instead of
       popping. Transitions are gated on :host([data-rail-anim]) — set only
       for the 200ms around the toggle — so window-resize and rail-width
       drag (which also call _fit) don't lag behind the cursor. */
    .rail[data-user-hidden] { transform: translateX(-100%); }
    :host([data-rail-anim]) .rail { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .stage { transition: left 200ms cubic-bezier(.3,.7,.4,1); }
    :host([data-rail-anim]) .canvas { transition: transform 200ms cubic-bezier(.3,.7,.4,1); }
    /* transition shorthand replaces rather than merges — repeat the base
       .overlay opacity/transform/filter transitions so visibility changes
       during the 200ms toggle window still fade instead of popping. */
    :host([data-rail-anim]) .overlay {
      transition: margin-left 200ms cubic-bezier(.3,.7,.4,1),
                  opacity 260ms ease,
                  transform 260ms cubic-bezier(.2,.8,.2,1),
                  filter 260ms ease;
    }
    :host([data-rail-anim]) .tapzones { transition: left 200ms cubic-bezier(.3,.7,.4,1); }

    .thumb {
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      cursor: pointer;
      user-select: none;
    }
    .thumb .num {
      width: 16px;
      flex-shrink: 0;
      font-size: 11px;
      font-weight: 500;
      text-align: right;
      color: rgba(255,255,255,0.55);
      padding-top: 2px;
      font-variant-numeric: tabular-nums;
    }
    .thumb .frame {
      position: relative;
      flex: 1;
      min-width: 0;
      aspect-ratio: var(--deck-aspect);
      background: #fff;
      border-radius: 4px;
      outline: 2px solid transparent;
      outline-offset: 0;
      overflow: hidden;
      transition: outline-color 120ms ease;
    }
    .thumb:hover .frame { outline-color: rgba(255,255,255,0.25); }
    .thumb { outline: none; }
    .thumb:focus-visible .frame { outline-color: rgba(255,255,255,0.5); }
    .thumb[data-current] .num { color: #fff; }
    .thumb[data-current] .frame { outline-color: #D97757; }
    .thumb[data-dragging] { opacity: 0.35; }
    .thumb::before {
      content: '';
      position: absolute;
      left: 24px;
      right: 0;
      height: 3px;
      border-radius: 2px;
      background: #D97757;
      opacity: 0;
      pointer-events: none;
    }
    .thumb[data-drop="before"]::before { top: -8px; opacity: 1; }
    .thumb[data-drop="after"]::before { bottom: -8px; opacity: 1; }
    .thumb[data-skip] .frame { opacity: 0.35; }
    .thumb[data-skip] .frame::after {
      content: 'Skipped';
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.45);
      color: #fff;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.04em;
    }

    .ctxmenu {
      position: fixed;
      min-width: 150px;
      padding: 4px;
      background: #242424;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 7px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      z-index: 2147483100;
      display: none;
      font-size: 12px;
    }
    .ctxmenu[data-open] { display: block; }
    .ctxmenu button {
      display: block;
      width: 100%;
      appearance: none;
      border: 0;
      background: transparent;
      color: #e8e8e8;
      font: inherit;
      text-align: left;
      padding: 6px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .ctxmenu button:hover:not(:disabled) { background: rgba(255,255,255,0.08); }
    .ctxmenu button:disabled { opacity: 0.35; cursor: default; }
    .ctxmenu hr {
      border: 0;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin: 4px 2px;
    }

    .rail-resize {
      position: fixed;
      left: calc(var(--deck-rail-w, 188px) - 3px);
      top: 0;
      bottom: 0;
      width: 6px;
      cursor: col-resize;
      z-index: 2147482600;
      touch-action: none;
    }
    .rail-resize:hover,
    .rail-resize[data-dragging] { background: rgba(255,255,255,0.12); }
    :host([no-rail]) .rail-resize,
    :host([noscale]) .rail-resize,
    .rail[data-presenting] + .rail-resize,
    .rail[data-user-hidden] + .rail-resize { display: none; }

    /* Delete-confirm popup — matches the SPA's ConfirmDialog layout
       (title + message body, depressed footer with Cancel / Delete). */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 2147483200;
      display: none;
      align-items: center;
      justify-content: center;
    }
    .confirm-backdrop[data-open] { display: flex; }
    .confirm {
      width: 320px;
      max-width: calc(100vw - 32px);
      background: #2a2a2a;
      color: #e8e8e8;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      overflow: hidden;
      font-family: inherit;
      animation: deck-confirm-in 0.18s ease;
    }
    @keyframes deck-confirm-in {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm .body { padding: 20px 20px 16px; }
    .confirm .title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
    .confirm .msg { font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.65); }
    .confirm .footer {
      padding: 14px 20px;
      background: #1f1f1f;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .confirm button {
      appearance: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .confirm .cancel {
      background: transparent;
      border: 0;
      color: rgba(255,255,255,0.8);
    }
    .confirm .cancel:hover { background: rgba(255,255,255,0.08); }
    .confirm .danger {
      background: #c96442;
      border: 1px solid rgba(0,0,0,0.15);
      color: #fff;
      box-shadow: 0 1px 3px rgba(166,50,68,0.3), 0 2px 6px rgba(166,50,68,0.18);
    }
    .confirm .danger:hover { background: #b5563a; }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      /* :last-child alone isn't enough once data-deck-skip hides the
         trailing slide(s) — the last *visible* slide still carries
         break-after:page and prints a blank sheet. _markLastVisible()
         maintains data-deck-last-visible on the last non-skipped slide. */
      ::slotted(*:last-child),
      ::slotted([data-deck-last-visible]) {
        break-after: auto;
        page-break-after: auto;
      }
      ::slotted([data-deck-skip]) { display: none !important; }
      .overlay, .tapzones, .rail, .rail-resize, .ctxmenu, .confirm-backdrop { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale', 'no-rail'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._menuIndex = -1;
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
      this._onMessage = this._onMessage.bind(this);
      // Capture-phase close so a click anywhere dismisses the menu, but
      // ignore clicks that land inside the menu itself — otherwise the
      // capture handler runs before the menu's own (bubble) handler and
      // clears _menuIndex out from under it.
      this._onDocClick = e => {
        if (this._menu && e.composedPath && e.composedPath().includes(this._menu)) return;
        this._closeMenu();
      };
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      // Presenter-view popup loads deckUrl?_snthumb=...#N for its prev/cur/
      // next thumbnails — the rail has no business rendering inside those
      // (wrong scale, and it offsets the stage so the thumb shows a gutter).
      if (/[?&]_snthumb=/.test(location.search)) this.setAttribute('no-rail', '');
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      window.addEventListener('message', this._onMessage);
      window.addEventListener('click', this._onDocClick, true);
      // Rail is off until the host posts __omelette_rail_enabled (feature-
      // flagged during soft-launch). Observers and thumbnail DOM are not
      // created until then, so flag-off decks pay only the parse cost of
      // the rail code, not its runtime.
      this._railEnabled = false;
      // Initial collection + layout happens via slotchange, which fires on mount.
    }
    _enableRail() {
      if (this._railEnabled) return;
      this._railEnabled = true;
      // Per-viewer preference — restored alongside rail width. Default on;
      // only a stored '0' (from the TweaksPanel toggle) hides it.
      this._railVisible = true;
      try {
        if (localStorage.getItem('deck-stage.railVisible') === '0') this._railVisible = false;
      } catch (e) {}
      // Live thumbnail updates: watch the light-DOM slides for content
      // edits and re-clone just the affected thumb(s), debounced. Ignore
      // the data-deck-* / data-screen-label / data-om-validate attributes
      // this component itself writes so nav and skip don't trigger
      // spurious refreshes.
      const OWN_ATTRS = /^data-(deck-|screen-label$|om-validate$)/;
      this._liveDirty = new Set();
      this._liveObserver = new MutationObserver(records => {
        for (const r of records) {
          if (r.type === 'attributes' && OWN_ATTRS.test(r.attributeName || '')) continue;
          let n = r.target;
          while (n && n.parentElement !== this) n = n.parentElement;
          if (n && this._slideSet && this._slideSet.has(n)) this._liveDirty.add(n);
        }
        if (this._liveDirty.size && !this._liveTimer) {
          this._liveTimer = setTimeout(() => {
            this._liveTimer = null;
            this._liveDirty.forEach(s => this._refreshThumb(s));
            this._liveDirty.clear();
          }, 200);
        }
      });
      this._liveObserver.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      // Lazy thumbnail materialization — clone the slide only when its
      // frame scrolls into (or near) the rail viewport. rootMargin gives
      // ~4 thumbs of pre-load so fast scrolling doesn't flash blanks.
      this._railObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting && e.target.__deckThumb) {
            this._materialize(e.target.__deckThumb);
          }
        });
      }, {
        root: this._rail,
        rootMargin: '400px 0px'
      });
      // Tweaks typically change CSS vars / attrs OUTSIDE <deck-stage>
      // (on <html>, <body>, a wrapper div, or a <style> tag), which
      // _liveObserver can't see. Re-snapshot author CSS (constructable
      // sheet is shared by reference, so one replaceSync updates every
      // thumb shadow root) and re-sync each thumb host's attrs + custom
      // properties. In-slide DOM mutations are _liveObserver's job.
      // Debounced so slider drags don't thrash.
      this._onTweakChange = () => {
        clearTimeout(this._tweakTimer);
        this._tweakTimer = setTimeout(() => {
          this._snapshotAuthorCss();
          // One getComputedStyle for the whole batch — each
          // getPropertyValue read below reuses the same computed style
          // as long as nothing invalidates layout between thumbs.
          const cs = getComputedStyle(this);
          (this._thumbs || []).forEach(t => {
            if (t.host) this._syncThumbHostAttrs(t.host, cs);
          });
        }, 120);
      };
      window.addEventListener('tweakchange', this._onTweakChange);
      this._snapshotAuthorCss();
      // Build the rail now that it's enabled — slotchange already fired,
      // so _renderRail's early-return skipped the initial build.
      this._syncRailHidden();
      this._renderRail();
      this._fit();
    }

    /** Snapshot document stylesheets into a constructable sheet that each
     *  thumbnail's nested shadow root adopts — so author CSS styles the
     *  cloned slide content without touching this component's chrome.
     *  Cross-origin sheets throw on .cssRules — skip them. Re-callable:
     *  the existing constructable sheet is reused via replaceSync so every
     *  already-adopted shadow root picks up the fresh CSS without re-adopt. */
    _snapshotAuthorCss() {
      // :root in an adopted sheet inside a shadow root matches nothing
      // (only the document root qualifies), so author rules like
      // `:root[data-voice="modern"] .serif` never reach the clones.
      // Rewrite :root → :host and mirror <html>'s data-*/class/lang onto
      // each thumb host (see _syncThumbHostAttrs) so the same selectors
      // match inside the thumbnail's shadow tree.
      const authorCss = Array.from(document.styleSheets).map(sh => {
        try {
          return Array.from(sh.cssRules).map(r => r.cssText).join('\n');
        } catch (e) {
          return '';
        }
      }).join('\n')
      // The shadow host is featureless outside the functional :host(...)
      // form, so any compound on :root — [attr], .class, #id, :pseudo —
      // must become :host(<compound>) not :host<compound>. Same for the
      // html type selector (Tailwind class-strategy dark mode emits
      // html.dark; Pico uses html[data-theme]), which has nothing to
      // match inside the thumb's shadow tree.
      .replace(/:root((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)/g, ':host($1)').replace(/:root\b/g, ':host').replace(/(^|[\s,>~+(}])html((?:\[[^\]]*\]|[.#][-\w]+|:[-\w]+(?:\([^)]*\))?)+)(?![-\w])/g, '$1:host($2)').replace(/(^|[\s,>~+(}])html(?![-\w])/g, '$1:host');
      // Every custom property the author references. _syncThumbHostAttrs
      // mirrors each one's *computed* value at <deck-stage> onto the
      // thumb host so the live value wins over the :host default above
      // regardless of which ancestor the tweak wrote to (<html>, <body>,
      // a wrapper div, or the deck-stage element itself all inherit
      // down to getComputedStyle(this)).
      this._authorVars = new Set(authorCss.match(/--[\w-]+/g) || []);
      try {
        if (!this._adoptedSheet) this._adoptedSheet = new CSSStyleSheet();
        this._adoptedSheet.replaceSync(authorCss);
      } catch (e) {
        this._adoptedSheet = null;
        this._authorCss = authorCss;
      }
    }
    _syncThumbHostAttrs(host, cs) {
      const de = document.documentElement;
      // setAttribute overwrites but can't delete — an attr removed from
      // <html> (toggleAttribute off, classList emptied) would linger on
      // the host and :host([data-*]) / :host(.foo) rules would keep
      // matching. Remove stale mirrored attrs first; iterate backward
      // because removeAttribute mutates the live NamedNodeMap.
      for (let i = host.attributes.length - 1; i >= 0; i--) {
        const n = host.attributes[i].name;
        if ((n.startsWith('data-') || n === 'class' || n === 'lang') && !de.hasAttribute(n)) {
          host.removeAttribute(n);
        }
      }
      for (const a of de.attributes) {
        if (a.name.startsWith('data-') || a.name === 'class' || a.name === 'lang') {
          host.setAttribute(a.name, a.value);
        }
      }
      // The :root→:host rewrite in _snapshotAuthorCss pins each custom
      // property to its stylesheet default on the thumb host, shadowing
      // the live value that would otherwise inherit. Tweaks can write the
      // live value on any ancestor — <html>, <body>, a wrapper div, the
      // deck-stage element — so read it as the *computed* value at
      // <deck-stage> (which sees the whole inheritance chain) rather than
      // trying to guess which element the author wrote to. Inline on the
      // host beats the :host{} rule. remove-stale covers vars dropped
      // from the stylesheet between snapshots.
      const vars = this._authorVars || new Set();
      for (let i = host.style.length - 1; i >= 0; i--) {
        const p = host.style[i];
        if (p.startsWith('--') && !vars.has(p)) host.style.removeProperty(p);
      }
      const live = cs || getComputedStyle(this);
      vars.forEach(p => {
        const v = live.getPropertyValue(p);
        if (v) host.style.setProperty(p, v.trim());else host.style.removeProperty(p);
      });
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      window.removeEventListener('message', this._onMessage);
      window.removeEventListener('click', this._onDocClick, true);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
      if (this._liveTimer) clearTimeout(this._liveTimer);
      if (this._tweakTimer) clearTimeout(this._tweakTimer);
      if (this._railAnimTimer) clearTimeout(this._railAnimTimer);
      if (this._scaleRaf) cancelAnimationFrame(this._scaleRaf);
      if (this._liveObserver) this._liveObserver.disconnect();
      if (this._railObserver) this._railObserver.disconnect();
      if (this._onTweakChange) window.removeEventListener('tweakchange', this._onTweakChange);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        if (this._rail) {
          this._rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
        }
        this._fit();
        this._scaleThumbs();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      tapzones.setAttribute('data-noncommentable', '');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.setAttribute('data-noncommentable', '');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._advance(-1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._advance(1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));

      // Thumbnail rail + context menu. Thumbnails are populated in
      // _renderRail() after _collectSlides().
      const rail = document.createElement('div');
      rail.className = 'rail export-hidden';
      rail.setAttribute('data-noncommentable', '');
      rail.style.setProperty('--deck-aspect', this.designWidth + '/' + this.designHeight);
      // Edge auto-scroll while dragging a thumb near the rail's top/bottom
      // so off-screen drop targets are reachable. Native dragover fires
      // continuously while the pointer is stationary, so a per-event nudge
      // (ramped by edge proximity) is enough — no rAF loop needed.
      rail.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        const r = rail.getBoundingClientRect();
        const EDGE = 40;
        const dt = e.clientY - r.top;
        const db = r.bottom - e.clientY;
        if (dt < EDGE) rail.scrollTop -= Math.ceil((EDGE - dt) / 3);else if (db < EDGE) rail.scrollTop += Math.ceil((EDGE - db) / 3);
      });
      const menu = document.createElement('div');
      menu.className = 'ctxmenu export-hidden';
      menu.setAttribute('data-noncommentable', '');
      menu.innerHTML = `
        <button type="button" data-act="skip">Skip slide</button>
        <button type="button" data-act="up">Move up</button>
        <button type="button" data-act="down">Move down</button>
        <hr>
        <button type="button" data-act="delete">Delete slide</button>
      `;
      menu.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        const i = this._menuIndex;
        this._closeMenu();
        if (act === 'skip') this._toggleSkip(i);else if (act === 'up') this._moveSlide(i, i - 1);else if (act === 'down') this._moveSlide(i, i + 1);else if (act === 'delete') this._openConfirm(i);
      });
      menu.addEventListener('contextmenu', e => e.preventDefault());

      // Rail resize handle — drag to set --deck-rail-w, persisted to
      // localStorage so the width survives reloads.
      const resize = document.createElement('div');
      resize.className = 'rail-resize export-hidden';
      resize.setAttribute('data-noncommentable', '');
      resize.addEventListener('pointerdown', e => {
        e.preventDefault();
        resize.setPointerCapture(e.pointerId);
        resize.setAttribute('data-dragging', '');
        const move = ev => this._setRailWidth(ev.clientX);
        const up = () => {
          resize.removeEventListener('pointermove', move);
          resize.removeEventListener('pointerup', up);
          resize.removeEventListener('pointercancel', up);
          resize.removeAttribute('data-dragging');
          try {
            localStorage.setItem('deck-stage.railWidth', String(this._railPx));
          } catch (err) {}
        };
        resize.addEventListener('pointermove', move);
        resize.addEventListener('pointerup', up);
        resize.addEventListener('pointercancel', up);
      });

      // Delete-confirm dialog — mirrors the SPA's ConfirmDialog layout.
      const confirm = document.createElement('div');
      confirm.className = 'confirm-backdrop export-hidden';
      confirm.setAttribute('data-noncommentable', '');
      confirm.innerHTML = `
        <div class="confirm" role="dialog" aria-modal="true">
          <div class="body">
            <div class="title">Delete slide?</div>
            <div class="msg">This slide will be removed from the deck.</div>
          </div>
          <div class="footer">
            <button type="button" class="cancel">Cancel</button>
            <button type="button" class="danger">Delete</button>
          </div>
        </div>
      `;
      confirm.addEventListener('click', e => {
        if (e.target === confirm) this._closeConfirm();
      });
      confirm.querySelector('.cancel').addEventListener('click', () => this._closeConfirm());
      confirm.querySelector('.danger').addEventListener('click', () => {
        const i = this._confirmIndex;
        this._closeConfirm();
        this._deleteSlide(i);
      });
      this._root.append(style, rail, resize, stage, tapzones, overlay, menu, confirm);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._tapzones = tapzones;
      this._rail = rail;
      this._resize = resize;
      this._menu = menu;
      this._confirm = confirm;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');

      // Restore persisted rail width.
      let rw = 188;
      try {
        const s = localStorage.getItem('deck-stage.railWidth');
        if (s) rw = parseInt(s, 10) || rw;
      } catch (err) {}
      this._setRailWidth(rw);
      this._syncRailHidden();
    }
    _setRailWidth(px) {
      const w = Math.max(120, Math.min(360, Math.round(px)));
      this._railPx = w;
      this.style.setProperty('--deck-rail-w', w + 'px');
      this._fit();
      // _scaleThumbs forces a sync layout (frame.offsetWidth) then writes
      // N transforms. During a resize drag this runs per-pointermove;
      // coalesce to one per frame.
      if (!this._scaleRaf) {
        this._scaleRaf = requestAnimationFrame(() => {
          this._scaleRaf = null;
          this._scaleThumbs();
        });
      }
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }
    _onSlotChange() {
      // Rail mutations (delete/move) already reconcile synchronously and
      // emit slidechange with reason 'api'; skip the async slotchange that
      // would otherwise re-broadcast with reason 'init'.
      if (this._squelchSlotChange) {
        this._squelchSlotChange = false;
        return;
      }
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slideSet = new Set(this._slides);
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        // Determine a label for comment flow: prefer explicit data-label,
        // then an existing data-screen-label, then first heading, else "Slide".
        let label = slide.getAttribute('data-label');
        if (!label) {
          const existing = slide.getAttribute('data-screen-label');
          if (existing) {
            // Strip any leading number the author may have included.
            label = existing.replace(/^\s*\d+\s*/, '').trim() || existing;
          }
        }
        if (!label) {
          const h = slide.querySelector('h1, h2, h3, [data-title]');
          if (h) label = (h.textContent || '').trim().slice(0, 40);
        }
        if (!label) label = 'Slide';
        slide.setAttribute('data-screen-label', `${pad2(n)} ${label}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
      this._markLastVisible();
      this._renderRail();
    }

    /** Tag the last non-skipped slide so print CSS can drop its
     *  break-after (see the @media print comment above — :last-child
     *  alone matches a hidden skipped slide). */
    _markLastVisible() {
      let last = null;
      this._slides.forEach(s => {
        s.removeAttribute('data-deck-last-visible');
        if (!s.hasAttribute('data-deck-skip')) last = s;
      });
      if (last) last.setAttribute('data-deck-last-visible', '');
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      // The host's ?slide= param is delivered as a #<int> hash (1-indexed) on
      // the iframe src. No hash → slide 1; the deck itself keeps no position
      // state across loads.
      const h = (location.hash || '').match(/^#(\d+)$/);
      if (h) {
        const n = parseInt(h[1], 10) - 1;
        if (n >= 0 && n < this._slides.length) this._index = n;
      }
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      // Keep the iframe's own hash in sync so an in-iframe location.reload()
      // (reload banner path in viewer-handle.ts) lands on the current slide,
      // not the stale deep-link hash from initial load.
      try {
        history.replaceState(null, '', '#' + (curr + 1));
      } catch (e) {}
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      // Follow-scroll on every navigation (init deep-link, keyboard, click,
      // tap, external goTo) — the only time we *don't* want the rail to
      // track current is after a rail-internal mutation, where _renderRail
      // has already restored the user's scroll position and yanking back to
      // current would undo it.
      this._syncRail(reason !== 'mutation');
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr,
            deckTotal: this._slides.length,
            deckSkipped: this._skippedIndices()
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      // Host posts __omelette_presenting while in fullscreen/tab presentation
      // mode — suppress the nav footer entirely (both hover and slide-change
      // flash) so the audience sees clean slides.
      if (!this._overlay || this._presenting) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _railWidth() {
      // State-based, no offsetWidth: the first _fit() can run before the
      // rail has had layout on some load paths, and a 0 there paints the
      // slide full-width for one frame before the post-slotchange _fit()
      // corrects it.
      if (!this._railEnabled || !this._railVisible || this.hasAttribute('no-rail') || this.hasAttribute('noscale') || this._presenting) return 0;
      return this._railPx || 0;
    }
    _fit() {
      if (!this._canvas) return;
      const stage = this._canvas.parentElement;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        if (stage) stage.style.left = '0';
        if (this._overlay) this._overlay.style.marginLeft = '0';
        if (this._tapzones) this._tapzones.style.left = '0';
        return;
      }
      const rw = this._railWidth();
      if (stage) stage.style.left = rw + 'px';
      // Overlay is centred on the viewport via left:50% + translate(-50%);
      // marginLeft shifts the centre by rw/2 so it lands in the middle of
      // the [rw, innerWidth] stage region. Tapzones just inset from rw.
      if (this._overlay) this._overlay.style.marginLeft = rw / 2 + 'px';
      if (this._tapzones) this._tapzones.style.left = rw + 'px';
      const vw = window.innerWidth - rw;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onMessage(e) {
      const d = e.data;
      if (d && typeof d.__omelette_presenting === 'boolean') {
        this._presenting = d.__omelette_presenting;
        if (this._presenting && this._overlay) {
          this._overlay.removeAttribute('data-visible');
          if (this._hideTimer) clearTimeout(this._hideTimer);
        }
        this._syncRailHidden();
        this._closeMenu();
        this._closeConfirm();
        this._fit();
        this._scaleThumbs();
      }
      // Per-viewer show/hide, driven by the TweaksPanel's auto-injected
      // "Thumbnail rail" toggle (or any author script). Independent of
      // whether the Tweaks panel itself is open — closing the panel
      // doesn't change rail visibility. Persists alongside rail width.
      if (d && d.type === '__deck_rail_visible' && typeof d.on === 'boolean') {
        if (d.on === this._railVisible) return;
        this._railVisible = d.on;
        try {
          localStorage.setItem('deck-stage.railVisible', d.on ? '1' : '0');
        } catch (e) {}
        // Arm the transition, commit it, then flip state — otherwise the
        // browser coalesces both writes and nothing animates on show.
        this.setAttribute('data-rail-anim', '');
        void (this._rail && this._rail.offsetHeight);
        this._syncRailHidden();
        this._fit();
        this._scaleThumbs();
        clearTimeout(this._railAnimTimer);
        this._railAnimTimer = setTimeout(() => this.removeAttribute('data-rail-anim'), 220);
      }
      if (d && d.type === '__omelette_rail_enabled') this._enableRail();
    }
    _syncRailHidden() {
      if (!this._rail) return;
      // data-presenting is the hard hide (display:none) for flag-off and
      // presentation mode — instant, no transition. data-user-hidden is
      // the soft hide (translateX(-100%)) for the viewer's rail toggle,
      // so show/hide slides under :host([data-rail-anim]).
      const hard = !this._railEnabled || this._presenting;
      if (hard) this._rail.setAttribute('data-presenting', '');else this._rail.removeAttribute('data-presenting');
      if (!this._railVisible) this._rail.setAttribute('data-user-hidden', '');else this._rail.removeAttribute('data-user-hidden');
      // translateX hide leaves thumbs (tabIndex=0) in the tab order —
      // inert keeps them unfocusable while the rail is off-screen.
      this._rail.inert = hard || !this._railVisible;
    }
    _onTapBack(e) {
      e.preventDefault();
      this._advance(-1, 'tap');
    }
    _onTapForward(e) {
      e.preventDefault();
      this._advance(1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      // Confirm dialog swallows nav keys while open; Escape cancels. Enter
      // is left to the focused button's native activation so Tab→Cancel
      // →Enter activates Cancel, not the window-level confirm path.
      if (this._confirm && this._confirm.hasAttribute('data-open')) {
        if (e.key === 'Escape') {
          this._closeConfirm();
          e.preventDefault();
        }
        return;
      }
      if (e.key === 'Escape' && this._menu && this._menu.hasAttribute('data-open')) {
        this._closeMenu();
        e.preventDefault();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._advance(1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._advance(-1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    /** Step forward/back skipping any slide marked data-deck-skip. Falls
     *  back to _go's clamp-at-ends behaviour (flash overlay) when there's
     *  nothing further in that direction. */
    _advance(dir, reason) {
      if (!this._slides.length) return;
      let i = this._index + dir;
      while (i >= 0 && i < this._slides.length && this._slides[i].hasAttribute('data-deck-skip')) {
        i += dir;
      }
      if (i < 0 || i >= this._slides.length) {
        this._flashOverlay();
        return;
      }
      this._go(i, reason);
    }

    // ── Thumbnail rail ────────────────────────────────────────────────────
    //
    // Thumbs are keyed by slide element and reused across _renderRail()
    // calls, so a reorder/delete is an O(changed) DOM shuffle instead of an
    // O(N) teardown-and-re-clone. Each thumb starts as a lightweight shell
    // (num + empty frame); the clone is materialized lazily by an
    // IntersectionObserver when the frame scrolls into (or near) view, so
    // only visible-ish slides pay the clone + image-decode cost.

    _renderRail() {
      if (!this._rail || !this._railEnabled) {
        this._thumbs = [];
        return;
      }
      // FLIP: record each *materialized* thumb's top before the reconcile.
      // Off-screen (non-materialized) thumbs don't need the animation and
      // skipping their getBoundingClientRect saves a forced layout per
      // off-screen thumb on large decks.
      const prevTops = new Map();
      (this._thumbs || []).forEach(({
        thumb,
        slide,
        host
      }) => {
        if (host) prevTops.set(slide, thumb.getBoundingClientRect().top);
      });
      const st = this._rail.scrollTop;

      // Reconcile: reuse thumbs that already exist for a slide, create
      // shells for new slides, drop thumbs for removed slides.
      const bySlide = new Map();
      (this._thumbs || []).forEach(t => bySlide.set(t.slide, t));
      const next = [];
      this._slides.forEach(slide => {
        let t = bySlide.get(slide);
        if (t) bySlide.delete(slide);else t = this._makeThumb(slide);
        next.push(t);
      });
      // Orphans — slides removed since last render.
      bySlide.forEach(t => {
        if (this._railObserver) this._railObserver.unobserve(t.frame);
        t.thumb.remove();
      });
      // Put thumbs into document order to match _slides. insertBefore on
      // an already-correctly-placed node is a no-op, so this is cheap
      // when nothing moved.
      next.forEach((t, i) => {
        const want = t.thumb;
        const at = this._rail.children[i];
        if (at !== want) this._rail.insertBefore(want, at || null);
        t.i = i;
        t.num.textContent = String(i + 1);
        if (t.slide.hasAttribute('data-deck-skip')) t.thumb.setAttribute('data-skip', '');else t.thumb.removeAttribute('data-skip');
      });
      this._thumbs = next;
      this._rail.scrollTop = st;
      if (prevTops.size) {
        const moved = [];
        this._thumbs.forEach(({
          thumb,
          slide
        }) => {
          const old = prevTops.get(slide);
          if (old == null) return;
          const dy = old - thumb.getBoundingClientRect().top;
          if (Math.abs(dy) < 1) return;
          thumb.style.transition = 'none';
          thumb.style.transform = `translateY(${dy}px)`;
          moved.push(thumb);
        });
        if (moved.length) {
          // Commit the inverted positions before flipping the transition
          // on — otherwise the browser coalesces both style writes and
          // nothing animates.
          void this._rail.offsetHeight;
          moved.forEach(t => {
            t.style.transition = 'transform 180ms cubic-bezier(.2,.7,.3,1)';
            t.style.transform = '';
          });
          setTimeout(() => moved.forEach(t => {
            t.style.transition = '';
          }), 220);
        }
      }
      requestAnimationFrame(() => this._scaleThumbs());
      this._syncRail(false);
    }

    /** Create a lightweight thumb shell for one slide. The clone is
     *  materialized later by the IntersectionObserver. Event handlers
     *  look up the thumb's *current* index (via _thumbs.indexOf) so the
     *  same element can be reused across reorders. */
    _makeThumb(slide) {
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.tabIndex = 0;
      const num = document.createElement('div');
      num.className = 'num';
      const frame = document.createElement('div');
      frame.className = 'frame';
      thumb.append(num, frame);
      const entry = {
        thumb,
        num,
        frame,
        slide,
        clone: null,
        host: null,
        i: -1
      };
      // entry.i is refreshed on every _renderRail reconcile pass, so
      // handlers read the thumb's current position without an O(N) scan.
      const idx = () => entry.i;
      thumb.addEventListener('click', () => this._go(idx(), 'click'));
      // ↑/↓ step through the rail when a thumb has focus. _go clamps at the
      // ends and _applyIndex→_syncRail scrolls the new current thumb into
      // view; we move focus to it (preventScroll — _syncRail already
      // scrolled) so a held key walks the whole list. stopPropagation keeps
      // this out of the window-level _onKey nav handler.
      thumb.addEventListener('keydown', e => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        e.preventDefault();
        e.stopPropagation();
        this._go(idx() + (e.key === 'ArrowDown' ? 1 : -1), 'keyboard');
        const cur = this._thumbs && this._thumbs[this._index];
        if (cur) cur.thumb.focus({
          preventScroll: true
        });
      });
      thumb.addEventListener('contextmenu', e => {
        e.preventDefault();
        this._openMenu(idx(), e.clientX, e.clientY);
      });
      thumb.draggable = true;
      thumb.addEventListener('dragstart', e => {
        this._dragFrom = idx();
        thumb.setAttribute('data-dragging', '');
        e.dataTransfer.effectAllowed = 'move';
        try {
          e.dataTransfer.setData('text/plain', String(this._dragFrom));
        } catch (err) {}
      });
      thumb.addEventListener('dragend', () => {
        thumb.removeAttribute('data-dragging');
        this._clearDrop();
        this._dragFrom = null;
      });
      thumb.addEventListener('dragover', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const r = thumb.getBoundingClientRect();
        this._setDrop(idx(), e.clientY < r.top + r.height / 2 ? 'before' : 'after');
      });
      thumb.addEventListener('drop', e => {
        if (this._dragFrom == null) return;
        e.preventDefault();
        const i = idx();
        const r = thumb.getBoundingClientRect();
        let to = e.clientY >= r.top + r.height / 2 ? i + 1 : i;
        if (this._dragFrom < to) to--;
        const from = this._dragFrom;
        this._clearDrop();
        this._dragFrom = null;
        if (to !== from) this._moveSlide(from, to);
      });
      if (this._railObserver) this._railObserver.observe(frame);
      frame.__deckThumb = entry;
      return entry;
    }

    /** Lazily build the clone for a thumb that has scrolled into view. */
    _materialize(entry) {
      if (entry.host) return;
      const dw = this.designWidth,
        dh = this.designHeight;
      let clone = entry.slide.cloneNode(true);
      clone.removeAttribute('id');
      clone.removeAttribute('data-deck-active');
      clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
      // Neuter heavy media; replace <video> with its poster so the box
      // keeps a visual. <iframe>/<audio> become empty placeholders.
      clone.querySelectorAll('iframe, audio, object, embed').forEach(el => {
        el.removeAttribute('src');
        el.removeAttribute('srcdoc');
        el.removeAttribute('data');
        el.innerHTML = '';
      });
      clone.querySelectorAll('video').forEach(el => {
        if (!el.poster) {
          el.removeAttribute('src');
          el.innerHTML = '';
          return;
        }
        const img = document.createElement('img');
        img.src = el.poster;
        img.alt = '';
        img.style.cssText = el.style.cssText + ';object-fit:cover;width:100%;height:100%;';
        img.className = el.className;
        el.replaceWith(img);
      });
      // Images: defer decode and let the browser pick the smallest
      // srcset candidate for the ~140px thumb. Same-URL clones reuse the
      // slide's decoded bitmap (URL-keyed cache), so the remaining cost
      // is paint/composite — lazy+async keeps that off the main thread.
      clone.querySelectorAll('img').forEach(el => {
        el.loading = 'lazy';
        el.decoding = 'async';
        if (el.srcset) el.sizes = (this._railPx || 188) + 'px';
      });
      // Custom elements inside the slide would have their
      // connectedCallback fire when the clone is appended. Replace them
      // with inert boxes so a component-heavy deck doesn't run N copies
      // of each component's mount logic in the rail. Children are
      // preserved so layout-wrapper elements (<my-column><h2>…</h2>)
      // still show their authored content; the querySelectorAll NodeList
      // is static, so nested custom elements in the moved subtree are
      // still visited on later iterations.
      const neuter = el => {
        const box = document.createElement('div');
        box.style.cssText = (el.getAttribute('style') || '') + ';background:rgba(0,0,0,0.06);border:1px dashed rgba(0,0,0,0.15);';
        box.className = el.className;
        // Preserve theming/i18n hooks so [data-*] / :lang() / [dir]
        // descendant selectors still match the neutered root.
        for (const a of el.attributes) {
          const n = a.name;
          if (n.startsWith('data-') || n.startsWith('aria-') || n === 'lang' || n === 'dir' || n === 'role' || n === 'title') {
            box.setAttribute(n, a.value);
          }
        }
        while (el.firstChild) box.appendChild(el.firstChild);
        return box;
      };
      // querySelectorAll('*') returns descendants only — a custom-element
      // slide root (<my-slide>…</my-slide>) would slip through and upgrade
      // on append. Swap the root first.
      if (clone.tagName.includes('-')) clone = neuter(clone);
      clone.querySelectorAll('*').forEach(el => {
        if (el.tagName.includes('-')) el.replaceWith(neuter(el));
      });
      clone.style.cssText += ';position:absolute;top:0;left:0;transform-origin:0 0;' + 'pointer-events:none;width:' + dw + 'px;height:' + dh + 'px;' + 'box-sizing:border-box;overflow:hidden;visibility:visible;opacity:1;';
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;';
      this._syncThumbHostAttrs(host);
      const sr = host.attachShadow({
        mode: 'open'
      });
      if (this._adoptedSheet) sr.adoptedStyleSheets = [this._adoptedSheet];else {
        const st = document.createElement('style');
        st.textContent = this._authorCss || '';
        sr.appendChild(st);
      }
      sr.appendChild(clone);
      entry.frame.appendChild(host);
      entry.host = host;
      entry.clone = clone;
      if (this._thumbScale) clone.style.transform = 'scale(' + this._thumbScale + ')';
      // Once materialized the IO callback is a no-op early-return —
      // unobserve so scroll doesn't keep firing it.
      if (this._railObserver) this._railObserver.unobserve(entry.frame);
    }

    /** Re-clone a single thumb (live-update path). No-op if the thumb
     *  hasn't been materialized yet — it'll pick up current content when
     *  it scrolls into view. */
    _refreshThumb(slide) {
      const entry = (this._thumbs || []).find(t => t.slide === slide);
      if (!entry || !entry.host) return;
      entry.host.remove();
      entry.host = entry.clone = null;
      this._materialize(entry);
    }
    _scaleThumbs() {
      if (!this._thumbs || !this._thumbs.length) return;
      // Every frame is the same width; if it reads 0 the rail is
      // display:none (noscale / no-rail / presenting / print) — leave the
      // clones as-is and re-run when the rail is revealed.
      const fw = this._thumbs[0].frame.offsetWidth;
      if (!fw) return;
      this._thumbScale = fw / this.designWidth;
      this._thumbs.forEach(({
        clone
      }) => {
        if (clone) clone.style.transform = 'scale(' + this._thumbScale + ')';
      });
    }
    _setDrop(i, where) {
      // dragover fires at pointer-event rate; touch only the previous
      // and new target rather than sweeping all N thumbs.
      const t = this._thumbs && this._thumbs[i];
      if (this._dropOn && this._dropOn !== t) {
        this._dropOn.thumb.removeAttribute('data-drop');
      }
      if (t) t.thumb.setAttribute('data-drop', where);
      this._dropOn = t || null;
    }
    _clearDrop() {
      if (this._dropOn) this._dropOn.thumb.removeAttribute('data-drop');
      this._dropOn = null;
    }
    _syncRail(follow) {
      if (!this._thumbs) return;
      this._thumbs.forEach(({
        thumb
      }, i) => {
        if (i === this._index) {
          thumb.setAttribute('data-current', '');
          if (follow && typeof thumb.scrollIntoView === 'function') {
            thumb.scrollIntoView({
              block: 'nearest'
            });
          }
        } else {
          thumb.removeAttribute('data-current');
        }
      });
    }
    _openMenu(i, x, y) {
      if (!this._menu) return;
      this._menuIndex = i;
      const slide = this._slides[i];
      const skip = slide && slide.hasAttribute('data-deck-skip');
      this._menu.querySelector('[data-act="skip"]').textContent = skip ? 'Unskip slide' : 'Skip slide';
      this._menu.querySelector('[data-act="up"]').disabled = i <= 0;
      this._menu.querySelector('[data-act="down"]').disabled = i >= this._slides.length - 1;
      this._menu.querySelector('[data-act="delete"]').disabled = this._slides.length <= 1;
      // Place, then clamp to viewport after it's measurable.
      this._menu.style.left = x + 'px';
      this._menu.style.top = y + 'px';
      this._menu.setAttribute('data-open', '');
      const r = this._menu.getBoundingClientRect();
      const nx = Math.min(x, window.innerWidth - r.width - 4);
      const ny = Math.min(y, window.innerHeight - r.height - 4);
      this._menu.style.left = Math.max(4, nx) + 'px';
      this._menu.style.top = Math.max(4, ny) + 'px';
    }
    _closeMenu() {
      if (this._menu) this._menu.removeAttribute('data-open');
      this._menuIndex = -1;
    }
    _openConfirm(i) {
      if (!this._confirm) return;
      this._confirmIndex = i;
      this._confirm.querySelector('.title').textContent = 'Delete slide ' + (i + 1) + '?';
      this._confirm.setAttribute('data-open', '');
      const btn = this._confirm.querySelector('.danger');
      if (btn && btn.focus) btn.focus();
    }
    _closeConfirm() {
      if (this._confirm) this._confirm.removeAttribute('data-open');
      this._confirmIndex = -1;
    }
    _emitDeckChange(detail) {
      this.dispatchEvent(new CustomEvent('deckchange', {
        detail,
        bubbles: true,
        composed: true
      }));
    }
    _deleteSlide(i) {
      const slide = this._slides[i];
      if (!slide || this._slides.length <= 1) return;
      const wasCurrent = i === this._index;
      if (i < this._index || wasCurrent && i === this._slides.length - 1) this._index--;
      this._squelchSlotChange = true;
      slide.remove();
      this._emitDeckChange({
        action: 'delete',
        from: i,
        slide
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason: 'mutation'
      });
    }
    _toggleSkip(i) {
      const slide = this._slides[i];
      if (!slide) return;
      const on = !slide.hasAttribute('data-deck-skip');
      if (on) slide.setAttribute('data-deck-skip', '');else slide.removeAttribute('data-deck-skip');
      if (this._thumbs && this._thumbs[i]) {
        if (on) this._thumbs[i].thumb.setAttribute('data-skip', '');else this._thumbs[i].thumb.removeAttribute('data-skip');
      }
      this._markLastVisible();
      this._emitDeckChange({
        action: on ? 'skip' : 'unskip',
        from: i,
        slide
      });
      // Re-broadcast so the presenter popup's prev/next thumbnails re-pick
      // the nearest non-skipped slide without waiting for a nav event.
      try {
        window.postMessage({
          slideIndexChanged: this._index,
          deckTotal: this._slides.length,
          deckSkipped: this._skippedIndices()
        }, '*');
      } catch (e) {}
    }
    _skippedIndices() {
      const out = [];
      for (let i = 0; i < this._slides.length; i++) {
        if (this._slides[i].hasAttribute('data-deck-skip')) out.push(i);
      }
      return out;
    }
    _moveSlide(i, j) {
      if (j < 0 || j >= this._slides.length || j === i) return;
      const slide = this._slides[i];
      const ref = j < i ? this._slides[j] : this._slides[j].nextSibling;
      // Track the active slide across the reorder so the same content
      // stays on screen.
      const cur = this._index;
      if (cur === i) this._index = j;else if (i < cur && j >= cur) this._index = cur - 1;else if (i > cur && j <= cur) this._index = cur + 1;
      this._squelchSlotChange = true;
      this.insertBefore(slide, ref);
      this._emitDeckChange({
        action: 'move',
        from: i,
        to: j,
        slide
      });
      this._collectSlides();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'mutation'
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._advance(1, 'api');
    }
    prev() {
      this._advance(-1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/deck-stage.js", error: String((e && e.message) || e) }); }

// ui_kits/blog/App.jsx
try { (() => {
/* global React, Header, Footer, BlogList, BlogArticle, NewsletterCTA */

const NAV_MAP = {
  home: "../website/index.html",
  angebote: "../website/index.html#angebote",
  kurse: "../website/index.html#kurse",
  ueber: "../website/index.html#ueber",
  kontakt: "../booking/index.html",
  blog: "index.html"
};
function BlogApp() {
  const [post, setPost] = React.useState(null);
  const nav = (page, sub) => {
    if (page === "blog") {
      setPost(null);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }
    const target = NAV_MAP[page];
    if (target) window.location.href = target + (sub ? "?aud=" + sub : "");
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BackgroundWave, null), /*#__PURE__*/React.createElement(Header, {
    current: "blog",
    onNav: nav
  }), post ? /*#__PURE__*/React.createElement(BlogArticle, {
    post: post,
    onBack: () => setPost(null)
  }) : /*#__PURE__*/React.createElement(BlogList, {
    onOpen: setPost
  }), /*#__PURE__*/React.createElement(Footer, {
    onNav: nav
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(BlogApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/BlogArticle.jsx
try { (() => {
/* global React, POSTS */

function BlogArticle({
  post,
  onBack
}) {
  const related = POSTS.filter(p => p.id !== post.id).slice(0, 2);
  return /*#__PURE__*/React.createElement("main", {
    className: "blog-article"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "back-link",
    onClick: e => {
      e.preventDefault();
      onBack();
    }
  }, "\u2190 Alle Beitr\xE4ge"), /*#__PURE__*/React.createElement("header", {
    className: "article-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow blog-card__eb--" + post.tone
  }, post.eb), /*#__PURE__*/React.createElement("h1", {
    className: "h-display"
  }, post.title), /*#__PURE__*/React.createElement("p", {
    className: "article-meta"
  }, "Von Jessica Bisetto \xB7 ", post.date, " \xB7 ", post.readtime)), /*#__PURE__*/React.createElement("div", {
    className: "article-cover",
    style: {
      backgroundImage: `url(${post.cover})`
    }
  }), /*#__PURE__*/React.createElement("article", {
    className: "article-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Es gibt diesen Moment am Abend, in dem du dich aufs Sofa setzt und denkst: Heute habe ich nichts wirklich getan, was mir geh\xF6rt. Den Tag haben andere bekommen \u2014 Kollegen, Familie, das Handy. Und du bist m\xFCde, ohne zu wissen, wovon."), /*#__PURE__*/React.createElement("p", null, "Das ist nicht dein Versagen. Es ist die Logik eines Alltags, der pausenlos Aufmerksamkeit verlangt und keine Pausen mitliefert. Was hilft, ist nicht eine neue Disziplin \u2014 sondern drei sehr kleine, sehr konkrete Verschiebungen. Ich nenne sie unten."), /*#__PURE__*/React.createElement("h2", null, "1. Ein einziger Anfangsmoment, der dir geh\xF6rt."), /*#__PURE__*/React.createElement("p", null, "Bevor du das Handy entsperrst, bevor du den Kaffee machst, bevor du irgendwen ansprichst: drei\xDFig Sekunden, in denen du nichts tust. Augen offen oder zu. Atem z\xE4hlen oder schauen. Es geht nicht um Meditation. Es geht darum, einmal am Tag nicht von au\xDFen gestartet zu werden."), /*#__PURE__*/React.createElement("h2", null, "2. Ein Wort f\xFCr deinen Zustand."), /*#__PURE__*/React.createElement("p", null, "\u201EMir geht's gut\" ist keine Auskunft. \u201EIch bin \xFCberfordert, aber nicht ersch\xF6pft\" ist eine. Je pr\xE4ziser du benennen kannst, was gerade los ist, desto eher wei\xDFt du, was hilft."), /*#__PURE__*/React.createElement("blockquote", null, "\u201EEs geht darum, die Welle zu surfen und sich nicht von ihr \xFCberrollen zu lassen.\""), /*#__PURE__*/React.createElement("h2", null, "3. Ein Ende, das du markierst."), /*#__PURE__*/React.createElement("p", null, "Der Arbeitstag endet nicht, wenn die Mails leer sind. Er endet, wenn du ihn endest. Ein Spaziergang um den Block, das Zuklappen des Laptops mit beiden H\xE4nden, ein Satz, den du dir leise sagst. Egal welches Ritual \u2014 Hauptsache, du machst eine Naht zwischen Arbeit und dir."), /*#__PURE__*/React.createElement("p", null, "Wenn du mehr dar\xFCber sprechen willst, was bei dir gerade zu viel ist: ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Schreib mir"), ". Das Erstgespr\xE4ch ist kostenfrei.")), /*#__PURE__*/React.createElement(NewsletterCTA, {
    variant: "compact"
  }), /*#__PURE__*/React.createElement("section", {
    className: "related"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Weiterlesen"), /*#__PURE__*/React.createElement("div", {
    className: "blog-grid"
  }, related.map(p => /*#__PURE__*/React.createElement("a", {
    key: p.id,
    href: "#",
    className: "blog-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "blog-card__img",
    style: {
      backgroundImage: `url(${p.cover})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "blog-card__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow blog-card__eb--" + p.tone
  }, p.eb), /*#__PURE__*/React.createElement("h3", {
    className: "blog-card__t"
  }, p.title)))))));
}
window.BlogArticle = BlogArticle;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/BlogArticle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/blog/BlogList.jsx
try { (() => {
/* global React */

const POSTS = [{
  id: "ruhe-im-alltag",
  eb: "Erwachsene",
  tone: "erwachsene",
  title: "Wie du Ruhe in einen lauten Alltag holst — ohne Yoga-Retreat.",
  excerpt: "Drei kleine Veränderungen, die wirklich etwas bewegen. Keine App, kein 5-Uhr-Aufstehen, keine Affirmationen.",
  date: "12. April 2026",
  readtime: "6 Min Lesezeit",
  cover: "../../assets/hero-bg.jpg"
}, {
  id: "kind-traurig",
  eb: "Kinder & Eltern",
  tone: "kinder",
  title: "Mein Kind ist traurig und ich weiß nicht warum.",
  excerpt: "Was Eltern oft hilft, wenn sie nicht weiterwissen — und was eher schadet, auch wenn es gut gemeint ist.",
  date: "28. März 2026",
  readtime: "8 Min",
  cover: "../../assets/kinder.jpg"
}, {
  id: "team-konflikt",
  eb: "Unternehmen",
  tone: "unternehmen",
  title: "Konflikte im Team: Warum Aussprechen allein nicht reicht.",
  excerpt: "Was wirklich gebraucht wird, damit ein Team nicht nur Frieden schließt, sondern weiterkommt.",
  date: "9. März 2026",
  readtime: "10 Min",
  cover: "../../assets/unternehmen.jpg"
}, {
  id: "perfektionismus",
  eb: "Erwachsene",
  tone: "erwachsene",
  title: "Perfektionismus ist keine Stärke. Was er wirklich ist.",
  excerpt: "Und wie du anfangen kannst, dich davon zu lösen — ohne dich danach „nicht mehr engagiert\u201C zu fühlen.",
  date: "21. Februar 2026",
  readtime: "7 Min",
  cover: "../../assets/portrait.jpg"
}];
function BlogList({
  onOpen
}) {
  const [filter, setFilter] = React.useState("alle");
  const filtered = POSTS.filter(p => filter === "alle" || p.tone === filter);
  return /*#__PURE__*/React.createElement("main", {
    className: "screen blog-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Blog"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display"
  }, "Texte zum Mitnehmen."), /*#__PURE__*/React.createElement("p", {
    className: "lede page-head__lede"
  }, "Reflexionen, Methoden, kleine Impulse f\xFCr zwischendurch \u2014 aus zehn Jahren Coaching-Praxis.")), /*#__PURE__*/React.createElement("div", {
    className: "aud-tabs blog-filter"
  }, [["alle", "Alle Beiträge"], ["erwachsene", "Erwachsene"], ["kinder", "Kinder & Eltern"], ["unternehmen", "Unternehmen"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "aud-tab" + (filter === k ? " is-active" : ""),
    onClick: () => setFilter(k)
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "blog-grid"
  }, filtered.map((p, i) => /*#__PURE__*/React.createElement("a", {
    key: p.id,
    href: "#",
    className: "blog-card" + (i === 0 ? " blog-card--lead" : ""),
    onClick: e => {
      e.preventDefault();
      onOpen(p);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "blog-card__img",
    style: {
      backgroundImage: `url(${p.cover})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "blog-card__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow blog-card__eb blog-card__eb--" + p.tone
  }, p.eb), /*#__PURE__*/React.createElement("h2", {
    className: "blog-card__t"
  }, p.title), /*#__PURE__*/React.createElement("p", {
    className: "blog-card__d"
  }, p.excerpt), /*#__PURE__*/React.createElement("p", {
    className: "blog-card__meta"
  }, p.date, " \xB7 ", p.readtime))))));
}
window.BlogList = BlogList;
window.POSTS = POSTS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/blog/BlogList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booking/App.jsx
try { (() => {
/* global React, ReactDOM, Header, Footer, BookingFlow */

const NAV_MAP = {
  home: "../website/index.html",
  angebote: "../website/index.html#angebote",
  kurse: "../website/index.html#kurse",
  ueber: "../website/index.html#ueber",
  kontakt: "index.html",
  blog: "../blog/index.html"
};
function App() {
  const nav = page => {
    const target = NAV_MAP[page];
    if (target) window.location.href = target;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BackgroundWave, null), /*#__PURE__*/React.createElement(Header, {
    current: "kontakt",
    onNav: nav
  }), /*#__PURE__*/React.createElement(BookingFlow, null), /*#__PURE__*/React.createElement(Footer, {
    onNav: nav
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booking/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booking/BookingFlow.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
const STEPS = ["Anliegen", "Zeit", "Daten", "Bestätigung"];
const CONCERNS = [{
  id: "erwachsene",
  label: "Für mich selbst",
  sub: "Erwachsenen-Coaching · 1:1",
  tone: "erwachsene"
}, {
  id: "kinder",
  label: "Für mein Kind",
  sub: "Kinder & Jugendliche",
  tone: "kinder"
}, {
  id: "unternehmen",
  label: "Für mein Team",
  sub: "Workshop · Unternehmen",
  tone: "unternehmen"
}, {
  id: "offen",
  label: "Erstmal nur fragen",
  sub: "Ich bin mir noch nicht sicher",
  tone: "neutral"
}];
const WEEKDAYS = [{
  id: "mo",
  label: "Mo",
  long: "Montag"
}, {
  id: "di",
  label: "Di",
  long: "Dienstag"
}, {
  id: "mi",
  label: "Mi",
  long: "Mittwoch"
}, {
  id: "do",
  label: "Do",
  long: "Donnerstag"
}, {
  id: "fr",
  label: "Fr",
  long: "Freitag"
}];
const TIMES = [{
  id: "09",
  label: "09:00 Uhr"
}, {
  id: "10",
  label: "10:00 Uhr"
}, {
  id: "11",
  label: "11:00 Uhr"
}, {
  id: "13",
  label: "13:00 Uhr"
}, {
  id: "14",
  label: "14:00 Uhr"
}, {
  id: "15",
  label: "15:00 Uhr"
}, {
  id: "16",
  label: "16:00 Uhr"
}];
function Stepper({
  step
}) {
  return /*#__PURE__*/React.createElement("ol", {
    className: "bk-steps"
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement("li", {
    key: s,
    className: "bk-step" + (i === step ? " is-current" : i < step ? " is-done" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-step__n"
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    className: "bk-step__l"
  }, s))));
}
function StepConcern({
  value,
  onPick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Schritt 1 von 4"), /*#__PURE__*/React.createElement("h1", {
    className: "h1"
  }, "Worum geht es?"), /*#__PURE__*/React.createElement("p", {
    className: "lede bk-lede"
  }, "W\xE4hle, was am ehesten passt. Du kannst es sp\xE4ter noch genauer beschreiben."), /*#__PURE__*/React.createElement("div", {
    className: "bk-options"
  }, CONCERNS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    type: "button",
    className: "bk-option bk-option--" + c.tone + (value === c.id ? " is-selected" : ""),
    onClick: () => onPick(c.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-option__l"
  }, c.label), /*#__PURE__*/React.createElement("span", {
    className: "bk-option__s"
  }, c.sub)))));
}
function StepTime({
  value,
  onChange
}) {
  const days = value?.days || [];
  const times = value?.times || [];
  const toggle = (key, id) => {
    const current = value?.[key] || [];
    const next = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
    onChange({
      ...value,
      [key]: next
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Schritt 2 von 4"), /*#__PURE__*/React.createElement("h1", {
    className: "h1"
  }, "Wann passt es dir?"), /*#__PURE__*/React.createElement("p", {
    className: "lede bk-lede"
  }, "Das Erstgespr\xE4ch ist f\xFCr dich kostenfrei und unverbindlich."), /*#__PURE__*/React.createElement("div", {
    className: "bk-pref"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bk-pref__l"
  }, "An welchen Wochentagen erreiche ich dich am besten?"), /*#__PURE__*/React.createElement("div", {
    className: "bk-pref__chips"
  }, WEEKDAYS.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    type: "button",
    className: "bk-chip bk-chip--day" + (days.includes(d.id) ? " is-selected" : ""),
    onClick: () => toggle("days", d.id),
    "aria-pressed": days.includes(d.id),
    "aria-label": d.long
  }, d.label)))), /*#__PURE__*/React.createElement("div", {
    className: "bk-pref"
  }, /*#__PURE__*/React.createElement("p", {
    className: "bk-pref__l"
  }, "Welche Uhrzeiten passen dir?"), /*#__PURE__*/React.createElement("div", {
    className: "bk-pref__chips"
  }, TIMES.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    type: "button",
    className: "bk-chip bk-chip--time" + (times.includes(t.id) ? " is-selected" : ""),
    onClick: () => toggle("times", t.id),
    "aria-pressed": times.includes(t.id)
  }, t.label))), /*#__PURE__*/React.createElement("p", {
    className: "bk-pref__hint"
  }, "Mehrfachauswahl m\xF6glich. Gespr\xE4che finden bis sp\xE4testens 17 Uhr statt.")), /*#__PURE__*/React.createElement("div", {
    className: "bk-note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-note__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/clock.svg",
    width: "18",
    height: "18",
    alt: ""
  })), /*#__PURE__*/React.createElement("p", null, "Ich melde mich innerhalb von zwei Werktagen bei dir \u2014 mit einem konkreten Terminvorschlag, der zu deiner Auswahl passt.")));
}
function StepDetails({
  data,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Schritt 3 von 4"), /*#__PURE__*/React.createElement("h1", {
    className: "h1"
  }, "Deine Daten"), /*#__PURE__*/React.createElement("p", {
    className: "lede bk-lede"
  }, "Ich brauche nur das N\xF6tigste, um dich zu erreichen."), /*#__PURE__*/React.createElement("div", {
    className: "bk-form"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bk-field"
  }, /*#__PURE__*/React.createElement("span", null, "Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.name,
    onChange: e => onChange({
      name: e.target.value
    }),
    placeholder: "Vor- und Nachname"
  })), /*#__PURE__*/React.createElement("label", {
    className: "bk-field"
  }, /*#__PURE__*/React.createElement("span", null, "E-Mail"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: data.email,
    onChange: e => onChange({
      email: e.target.value
    }),
    placeholder: "dein.name@example.de"
  })), /*#__PURE__*/React.createElement("label", {
    className: "bk-field"
  }, /*#__PURE__*/React.createElement("span", null, "Telefon ", /*#__PURE__*/React.createElement("em", null, "\xB7 optional")), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: data.phone,
    onChange: e => onChange({
      phone: e.target.value
    }),
    placeholder: "0152 \u2014 \u2014 \u2014"
  })), /*#__PURE__*/React.createElement("label", {
    className: "bk-field bk-field--full"
  }, /*#__PURE__*/React.createElement("span", null, "Was besch\xE4ftigt dich? ", /*#__PURE__*/React.createElement("em", null, "\xB7 optional")), /*#__PURE__*/React.createElement("textarea", {
    rows: "4",
    value: data.note,
    onChange: e => onChange({
      note: e.target.value
    }),
    placeholder: "Ein paar S\xE4tze reichen. Wir sprechen alles weitere im Gespr\xE4ch."
  })), /*#__PURE__*/React.createElement("label", {
    className: "bk-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: data.consent,
    onChange: e => onChange({
      consent: e.target.checked
    })
  }), /*#__PURE__*/React.createElement("span", null, "Ich bin einverstanden, dass meine Angaben zur Terminvereinbarung verwendet werden. ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Datenschutz")))));
}
function StepDone({
  concern,
  slot,
  data
}) {
  const c = CONCERNS.find(x => x.id === concern);
  const dayLabels = (slot?.days || []).map(id => WEEKDAYS.find(w => w.id === id)?.long).filter(Boolean).join(", ");
  const timeLabels = (slot?.times || []).map(id => TIMES.find(t => t.id === id)?.label).filter(Boolean).join(", ");
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-card bk-done"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-done__seal"
  }, "\u2713"), /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Schritt 4 von 4"), /*#__PURE__*/React.createElement("h1", {
    className: "h1"
  }, "Danke, ", data.name.split(" ")[0] || "schön", "."), /*#__PURE__*/React.createElement("p", {
    className: "lede bk-lede"
  }, "Ich melde mich innerhalb von zwei Werktagen mit einem konkreten Terminvorschlag."), /*#__PURE__*/React.createElement("dl", {
    className: "bk-summary"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Anliegen"), /*#__PURE__*/React.createElement("dd", null, c ? c.label : "—")), dayLabels && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Wochentage"), /*#__PURE__*/React.createElement("dd", null, dayLabels)), timeLabels && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Uhrzeiten"), /*#__PURE__*/React.createElement("dd", null, timeLabels)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "E-Mail"), /*#__PURE__*/React.createElement("dd", null, data.email)), data.phone && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Telefon"), /*#__PURE__*/React.createElement("dd", null, data.phone))), /*#__PURE__*/React.createElement("p", {
    className: "bk-aside"
  }, "Du erh\xE4ltst eine Eingangsbest\xE4tigung an ", /*#__PURE__*/React.createElement("strong", null, data.email), ". Sollte sie nicht ankommen, pr\xFCfe den Spam-Ordner oder schreib mir direkt an ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:kontakt@jessica-bisetto.de"
  }, "kontakt@jessica-bisetto.de"), "."));
}
function BookingFlow() {
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState(null);
  const [slot, setSlot] = useState({
    days: [],
    times: []
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
    consent: false
  });
  const update = patch => setData(d => ({
    ...d,
    ...patch
  }));
  const canNext = [!!concern, slot?.days?.length > 0 && slot?.times?.length > 0, data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email) && data.consent, true][step];
  return /*#__PURE__*/React.createElement("main", {
    className: "bk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Erstgespr\xE4ch vereinbaren"), /*#__PURE__*/React.createElement("h2", {
    className: "h-display"
  }, "In vier ruhigen Schritten.")), /*#__PURE__*/React.createElement(Stepper, {
    step: step
  }), step === 0 && /*#__PURE__*/React.createElement(StepConcern, {
    value: concern,
    onPick: setConcern
  }), step === 1 && /*#__PURE__*/React.createElement(StepTime, {
    value: slot,
    onChange: setSlot
  }), step === 2 && /*#__PURE__*/React.createElement(StepDetails, {
    data: data,
    onChange: update
  }), step === 3 && /*#__PURE__*/React.createElement(StepDone, {
    concern: concern,
    slot: slot,
    data: data
  }), step < 3 && /*#__PURE__*/React.createElement("div", {
    className: "bk-nav"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-ghost",
    disabled: step === 0,
    onClick: () => setStep(s => Math.max(0, s - 1))
  }, "\u2190 Zur\xFCck"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-pri",
    disabled: !canNext,
    onClick: () => setStep(s => s + 1)
  }, step === 2 ? "Anfrage senden" : "Weiter", /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2192"))), step === 3 && /*#__PURE__*/React.createElement("div", {
    className: "bk-nav bk-nav--center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-ghost",
    onClick: () => {
      setStep(0);
      setConcern(null);
      setSlot({
        days: [],
        times: []
      });
      setData({
        name: "",
        email: "",
        phone: "",
        note: "",
        consent: false
      });
    }
  }, "Neue Anfrage stellen")));
}
window.BookingFlow = BookingFlow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booking/BookingFlow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
/* global React, Header, Hero, AudienceCards, AboutTeaser, Testimonials, Partners, Downloads, NewsletterCTA, Footer, AngeboteScreen, UeberMichScreen, KontaktScreen */
const {
  useState: useStateApp,
  useEffect: useEffectApp
} = React;
const HASH_TO_PAGE = {
  "#home": "home",
  "#angebote": "angebote",
  "#kurse": "kurse",
  "#ueber": "ueber",
  "#blog": "blog",
  "#kontakt": "kontakt"
};
function readRoute() {
  const hash = window.location.hash || "#home";
  const page = HASH_TO_PAGE[hash] || "home";
  return {
    page
  };
}
function App() {
  const [route, setRoute] = useStateApp(readRoute());
  useEffectApp(() => {
    const onHash = () => {
      setRoute(readRoute());
      window.scrollTo({
        top: 0
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const nav = (page, sub) => {
    // Cross-file kits
    if (page === "blog") {
      window.location.href = "../blog/index.html";
      return;
    }
    // Internal hash routing
    setRoute({
      page,
      sub
    });
    if (page !== route.page) window.location.hash = "#" + page;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BackgroundWave, null), /*#__PURE__*/React.createElement(Header, {
    current: route.page,
    onNav: nav
  }), route.page === "home" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onCta: nav
  }), /*#__PURE__*/React.createElement(AudienceCards, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(AboutTeaser, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Partners, null), /*#__PURE__*/React.createElement(Downloads, null), /*#__PURE__*/React.createElement(NewsletterCTA, null)), route.page === "angebote" && /*#__PURE__*/React.createElement(AngeboteScreen, {
    initial: route.sub,
    onNav: nav
  }), route.page === "ueber" && /*#__PURE__*/React.createElement(UeberMichScreen, null), route.page === "kontakt" && /*#__PURE__*/React.createElement(KontaktScreen, null), (route.page === "kurse" || route.page === "blog") && /*#__PURE__*/React.createElement("main", {
    className: "screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Kurse"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display"
  }, "Aktuelle Kurse"), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Gruppenkurse f\xFCr Kinder, Erwachsene und Unternehmen \u2014 pr\xE4senz und online."), /*#__PURE__*/React.createElement("p", {
    className: "body-sm",
    style: {
      marginTop: 24,
      opacity: 0.6
    }
  }, "(Im UI-Kit als Platzhalter \u2014 Daten werden aus dem CMS gezogen.)"))), /*#__PURE__*/React.createElement(Footer, {
    onNav: nav
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BackgroundWave.jsx
try { (() => {
/* global React */

/**
 * BackgroundWave — a slow, subtle water wave that drifts across the viewport.
 * Reinforces the surfing / wave metaphor without competing with content.
 * - Fixed position, behind everything (z-index: 0, pointer-events: none)
 * - Two waves at different heights, slightly different speeds, for depth
 * - Very low opacity (CSS) so type stays legible
 */
function BackgroundWave() {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-wave",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "bg-wave__svg bg-wave__svg--a",
    viewBox: "0 0 2400 200",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,100 C200,40 400,160 600,100 C800,40 1000,160 1200,100 C1400,40 1600,160 1800,100 C2000,40 2200,160 2400,100 L2400,200 L0,200 Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("svg", {
    className: "bg-wave__svg bg-wave__svg--b",
    viewBox: "0 0 2400 200",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,120 C250,60 450,180 700,120 C950,60 1150,180 1400,120 C1650,60 1850,180 2100,120 C2275,80 2350,140 2400,120 L2400,200 L0,200 Z",
    fill: "currentColor"
  })));
}
window.BackgroundWave = BackgroundWave;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BackgroundWave.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* global React */

function Footer({
  onNav
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ft-col ft-col--brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand brand--ft"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    width: "48",
    height: "48",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "brand__wm"
  }, "Jessica Bisetto")), /*#__PURE__*/React.createElement("p", {
    className: "body-sm ft-blurb"
  }, "Coaching f\xFCr Kinder,", /*#__PURE__*/React.createElement("br", null), "Erwachsene und Unternehmen.")), /*#__PURE__*/React.createElement("div", {
    className: "ft-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow ft-eb"
  }, "Praxis"), /*#__PURE__*/React.createElement("p", {
    className: "body-sm"
  }, "Stuttgarter Stra\xDFe 3", /*#__PURE__*/React.createElement("br", null), "73525 Schw\xE4bisch Gm\xFCnd")), /*#__PURE__*/React.createElement("div", {
    className: "ft-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow ft-eb"
  }, "Kontakt"), /*#__PURE__*/React.createElement("p", {
    className: "body-sm"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:+4915253636003",
    className: "ft-a"
  }, "0152 / 536 360 03"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
    href: "mailto:kontakt@jessica-bisetto.de",
    className: "ft-a"
  }, "kontakt@jessica-bisetto.de"))), /*#__PURE__*/React.createElement("div", {
    className: "ft-col"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow ft-eb"
  }, "Mehr"), /*#__PURE__*/React.createElement("ul", {
    className: "ft-list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ft-a",
    onClick: () => onNav("angebote")
  }, "Angebote")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ft-a",
    onClick: () => onNav("ueber")
  }, "\xDCber mich")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ft-a",
    onClick: () => onNav("blog")
  }, "Blog")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ft-a",
    href: "index.html#elternbibliothek"
  }, "Elternbibliothek")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    className: "ft-a",
    onClick: () => onNav("kontakt")
  }, "Kontakt"))))), /*#__PURE__*/React.createElement("div", {
    className: "site-footer__legal"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " Jessica Bisetto"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    className: "ft-a"
  }, "Impressum"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    className: "ft-a"
  }, "Datenschutz"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    className: "ft-a"
  }, "AGB")));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* global React */
const {
  useState
} = React;
function Logo({
  size = 36,
  inverted = false
}) {
  return /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Jessica Bisetto",
    width: size,
    height: size,
    style: {
      width: size,
      height: size,
      filter: inverted ? "invert(1)" : "none",
      display: "block"
    }
  });
}
function Header({
  current,
  onNav
}) {
  const [open, setOpen] = useState(false);
  const items = [{
    id: "home",
    label: "Home"
  }, {
    id: "angebote",
    label: "Angebote"
  }, {
    id: "kurse",
    label: "Kurse"
  }, {
    id: "ueber",
    label: "Über mich"
  }, {
    id: "blog",
    label: "Blog"
  }, {
    id: "kontakt",
    label: "Kontakt"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "site-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 48
  }), /*#__PURE__*/React.createElement("span", {
    className: "brand__wm"
  }, "Jessica Bisetto")), /*#__PURE__*/React.createElement("nav", {
    className: "nav-desk"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: "#",
    className: "nav-link" + (current === it.id ? " is-current" : ""),
    onClick: e => {
      e.preventDefault();
      onNav(it.id);
    }
  }, it.label)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-pri btn-sm",
    onClick: e => {
      e.preventDefault();
      onNav("kontakt");
    }
  }, "Erstgespr\xE4ch", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192"))), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    "aria-label": "Men\xFC",
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/menu.svg",
    width: "22",
    height: "22"
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.id,
    href: "#",
    className: "nav-link",
    onClick: e => {
      e.preventDefault();
      onNav(it.id);
      setOpen(false);
    }
  }, it.label))));
}
window.Logo = Logo;
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Kontakt.jsx
try { (() => {
/* global React */
const {
  useState: useStateK
} = React;
function KontaktScreen() {
  const [stage, setStage] = useStateK("form");
  const [audience, setAudience] = useStateK("erwachsene");
  const formal = audience === "unternehmen";
  if (stage === "sent") {
    return /*#__PURE__*/React.createElement("main", {
      className: "screen screen--kontakt"
    }, /*#__PURE__*/React.createElement("div", {
      className: "kontakt-done"
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/icons/check.svg",
      width: "40",
      height: "40"
    }), /*#__PURE__*/React.createElement("h1", {
      className: "h1"
    }, formal ? "Danke für Ihre Anfrage." : "Danke. Ich hab's bekommen."), /*#__PURE__*/React.createElement("p", {
      className: "lede"
    }, formal ? "Ich melde mich innerhalb von zwei Werktagen bei Ihnen — telefonisch oder per E-Mail." : "Ich melde mich innerhalb von zwei Werktagen bei dir. Falls etwas dringend ist, ruf gerne direkt an."), /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "btn btn-sec",
      onClick: e => {
        e.preventDefault();
        setStage("form");
      }
    }, "Zur\xFCck")));
  }
  return /*#__PURE__*/React.createElement("main", {
    className: "screen screen--kontakt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display"
  }, formal ? "Schreiben Sie mir." : "Schreib mir."), /*#__PURE__*/React.createElement("p", {
    className: "lede page-head__lede"
  }, formal ? "Erzählen Sie mir kurz, worum es geht — ich melde mich innerhalb von zwei Werktagen." : "Erzähl mir kurz, was dich beschäftigt. Du kannst so kurz oder ausführlich schreiben, wie du magst.")), /*#__PURE__*/React.createElement("div", {
    className: "kontakt-grid"
  }, /*#__PURE__*/React.createElement("form", {
    className: "kontakt-form",
    onSubmit: e => {
      e.preventDefault();
      setStage("sent");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fld-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl"
  }, "Anliegen"), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, [["kinder", "Für mein Kind"], ["erwachsene", "Für mich"], ["unternehmen", "Für mein Team / Unternehmen"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    className: "seg-btn" + (audience === k ? " is-on" : ""),
    onClick: () => setAudience(k)
  }, l)))), /*#__PURE__*/React.createElement("div", {
    className: "fld-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fld-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    className: "fld",
    placeholder: formal ? "Vor- und Nachname" : "Wie heißt du?"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fld-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl"
  }, "E-Mail"), /*#__PURE__*/React.createElement("input", {
    className: "fld",
    type: "email",
    placeholder: "name@beispiel.de"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fld-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl"
  }, "Telefon \xB7 optional"), /*#__PURE__*/React.createElement("input", {
    className: "fld",
    placeholder: "Falls Sie lieber telefonieren"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fld-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl"
  }, formal ? "Worum geht es?" : "Was beschäftigt dich gerade?"), /*#__PURE__*/React.createElement("textarea", {
    className: "fld",
    rows: "5",
    placeholder: formal ? "Anlass, Zielgruppe, gewünschter Rahmen, gewünschter Termin …" : "So kurz oder ausführlich, wie du magst."
  })), /*#__PURE__*/React.createElement("label", {
    className: "cbox"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", null, formal ? "Ich habe die Datenschutzhinweise gelesen." : "Ich hab die Datenschutzhinweise gelesen.")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-pri btn-block"
  }, formal ? "Anfrage senden" : "Nachricht abschicken", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192"))), /*#__PURE__*/React.createElement("aside", {
    className: "kontakt-side"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "h3"
  }, "Direkt erreichen"), /*#__PURE__*/React.createElement("p", {
    className: "kontakt-line"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/map-pin.svg",
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement("span", null, "Stuttgarter Stra\xDFe 3", /*#__PURE__*/React.createElement("br", null), "73525 Schw\xE4bisch Gm\xFCnd")), /*#__PURE__*/React.createElement("p", {
    className: "kontakt-line"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/phone.svg",
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement("a", {
    href: "tel:+4915253636003"
  }, "0152 / 536 360 03")), /*#__PURE__*/React.createElement("p", {
    className: "kontakt-line"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/mail.svg",
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:kontakt@jessica-bisetto.de"
  }, "kontakt@jessica-bisetto.de")), /*#__PURE__*/React.createElement("div", {
    className: "kontakt-aside-note"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Erstgespr\xE4ch"), /*#__PURE__*/React.createElement("p", {
    className: "body-sm"
  }, "Kostenfrei \xB7 20 Minuten \xB7 am Telefon. Damit wir herausfinden, ob es passt \u2014 ganz ohne Verpflichtung.")))));
}
window.KontaktScreen = KontaktScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Kontakt.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Screens.jsx
try { (() => {
/* global React */
const {
  useState: useStateScreens
} = React;
function AngeboteScreen({
  initial,
  onNav
}) {
  const [active, setActive] = useStateScreens(initial || "kinder");
  const data = {
    kinder: {
      eb: "Kinder & Jugendliche",
      tone: "kinder",
      photo: "../../assets/kinder.jpg",
      title: "Du bist gut, so wie du bist.",
      address: "du",
      lede: "Manchmal ist Schule schwer. Manchmal ist zuhause viel los. Manchmal weiß man nicht warum, aber irgendwas drückt. Ich höre dir zu — und wir finden zusammen heraus, was hilft.",
      bullets: ["Bei Stress in Schule, Familie oder Freundeskreis", "Wenn dir oft alles zu viel wird oder du blockierst", "Für mehr Mut, dich selbst zu zeigen", "Spielerische Methoden, altersgerecht — keine Therapie"],
      note: "Das erste Gespräch ist natürlich unverbindlich und kostenlos."
    },
    erwachsene: {
      eb: "Erwachsene",
      tone: "erwachsene",
      photo: "../../assets/erwachsene.jpg",
      title: "Wenn alles zu viel wird.",
      address: "du",
      lede: "Vielleicht funktioniert gerade alles — und trotzdem stimmt etwas nicht. Wir schauen gemeinsam hin, ohne Druck, in deinem Tempo. Und finden Schritte, die sich wirklich gut anfühlen.",
      bullets: ["Bei Blockaden, Triggern, Belastung", "In Lebensübergängen (Beruf, Familie, Trennung)", "Gegen Perfektionismus und ständige Anerkennungssuche", "Einzelcoaching · 60 oder 90 Minuten"],
      note: "Das erste Gespräch ist natürlich unverbindlich und kostenlos."
    },
    unternehmen: {
      eb: "Unternehmen & Kommunen",
      tone: "unternehmen",
      photo: "../../assets/unternehmen.jpg",
      title: "Teams stärken, Strukturen halten.",
      address: "sie",
      lede: "Ich arbeite mit Schulen, Verwaltungen und Unternehmen an Themen, die Menschen tragfähig machen — Resilienz, Konflikt, Kommunikation. Praxisnah, ohne Buzzwords.",
      bullets: ["Halbtags- und Tagesworkshops", "Begleitprozesse über mehrere Termine", "Vor Ort in Süddeutschland oder hybrid", "Referenzen u. a. Stadt Schwäbisch Gmünd, VHS, Triumph (Heubach)"],
      note: "Antwort innerhalb von zwei Werktagen."
    }
  };
  const d = data[active];
  return /*#__PURE__*/React.createElement("main", {
    className: "screen screen--angebote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Angebote"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display page-head__h"
  }, "Drei Wege, ein Ziel."), /*#__PURE__*/React.createElement("p", {
    className: "lede page-head__lede"
  }, "Wachstum sieht f\xFCr jeden anders aus. W\xE4hle den Weg, der zu dir passt \u2014 oder schreib mir, wenn du unsicher bist.")), /*#__PURE__*/React.createElement("div", {
    className: "aud-tabs"
  }, Object.entries(data).map(([k, v]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "aud-tab aud-tab--" + v.tone + (active === k ? " is-active" : ""),
    onClick: () => setActive(k)
  }, v.eb))), /*#__PURE__*/React.createElement("article", {
    className: "ang-panel ang-panel--" + d.tone
  }, /*#__PURE__*/React.createElement("div", {
    className: "ang-panel__photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: d.photo,
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "ang-panel__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow ang-panel__eb"
  }, d.eb), /*#__PURE__*/React.createElement("h2", {
    className: "h1"
  }, d.title), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, d.lede), /*#__PURE__*/React.createElement("ul", {
    className: "check-list"
  }, d.bullets.map((b, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    width: "18",
    height: "18"
  }), /*#__PURE__*/React.createElement("span", null, b)))), /*#__PURE__*/React.createElement("div", {
    className: "ang-panel__cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-pri",
    onClick: e => {
      e.preventDefault();
      onNav("kontakt");
    }
  }, d.address === "sie" ? "Anfrage senden" : "Erstgespräch vereinbaren", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")), /*#__PURE__*/React.createElement("span", {
    className: "ang-panel__note body-sm"
  }, d.note)), active === "kinder" && /*#__PURE__*/React.createElement("p", {
    className: "ang-panel__link body-sm"
  }, "Tipp: In der ", /*#__PURE__*/React.createElement("a", {
    href: "../website/index.html#elternbibliothek"
  }, "Elternbibliothek"), " findest du kostenfreie Mal- und Bastelvorlagen f\xFCr zuhause."))), active === "kinder" && /*#__PURE__*/React.createElement("article", {
    className: "ang-project"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ang-project__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow ang-project__eb"
  }, "Schulprojekt \xB7 Pr\xE4vention"), /*#__PURE__*/React.createElement("h2", {
    className: "h1 ang-project__h"
  }, /*#__PURE__*/React.createElement("em", null, "Mut tut gut"), " \u2014 Projekt zur Pr\xE4vention von sexueller Gewalt in den 4. Klassen.")), /*#__PURE__*/React.createElement("div", {
    className: "ang-project__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ang-project__badge"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mut-tut-gut-logo.png",
    alt: "Mut tut gut"
  }), /*#__PURE__*/React.createElement("p", {
    className: "ang-project__traeger"
  }, "Ein Projekt von ", /*#__PURE__*/React.createElement("strong", null, "Frauen helfen Frauen Schw\xE4bisch Gm\xFCnd e.\xA0V."))), /*#__PURE__*/React.createElement("div", {
    className: "ang-project__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg"
  }, "\u201EMut tut gut\" ist ein bew\xE4hrtes Pr\xE4ventionsprojekt f\xFCr Viertkl\xE4sslerinnen und Viertkl\xE4ssler. Kinder lernen \u2014 ohne Angst, ohne Druck \u2014 gute und schlechte Geheimnisse zu unterscheiden, eigene Grenzen zu sp\xFCren und im Ernstfall zu sagen: ", /*#__PURE__*/React.createElement("em", null, "Stopp. Ich hole mir Hilfe.")), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Als freie Mitarbeiterin im Bereich Pr\xE4vention bringe ich das Projekt im Auftrag des Tr\xE4gervereins direkt an Ihre Schule. Spielerisch, altersgerecht und mit gro\xDFer Sensibilit\xE4t f\xFCr die Lebenswelt der Kinder."), /*#__PURE__*/React.createElement("p", {
    className: "body ang-project__hint"
  }, /*#__PURE__*/React.createElement("strong", null, "Anfragen laufen direkt \xFCber den Verein."), "Frauen helfen Frauen Schw\xE4bisch Gm\xFCnd e.\xA0V. koordiniert die Anmeldung und die Terminvergabe f\xFCr alle Schulen."), /*#__PURE__*/React.createElement("ul", {
    className: "check-list ang-project__bullets"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    width: "18",
    height: "18",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "Zwei Termine \xE0 90 Minuten in der Schulklasse")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    width: "18",
    height: "18",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "Optional ein begleitender Elternabend")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    width: "18",
    height: "18",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "Konzept des Vereins Frauen helfen Frauen, langj\xE4hrig erprobt")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    width: "18",
    height: "18",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "F\xFCr Grundschulen im Ostalbkreis und Umgebung"))), /*#__PURE__*/React.createElement("div", {
    className: "ang-project__price"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ang-project__price-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ang-project__price-l"
  }, "Klassenworkshop"), /*#__PURE__*/React.createElement("span", {
    className: "ang-project__price-r"
  }, /*#__PURE__*/React.createElement("strong", null, "180\xA0\u20AC"), " \xB7 2\xA0\xD7\xA090\xA0Minuten")), /*#__PURE__*/React.createElement("div", {
    className: "ang-project__price-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ang-project__price-l"
  }, "Elternabend \xB7 optional"), /*#__PURE__*/React.createElement("span", {
    className: "ang-project__price-r"
  }, /*#__PURE__*/React.createElement("strong", null, "60\xA0\u20AC"), " \xB7 zus\xE4tzlich"))), /*#__PURE__*/React.createElement("div", {
    className: "ang-project__cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://frauenhelfenfrauen-schwaebischgmuend.de/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "btn btn-pri"
  }, "Beim Verein anfragen", /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2197")), /*#__PURE__*/React.createElement("span", {
    className: "ang-panel__note body-sm"
  }, "Anmeldung & Termine direkt \xFCber Frauen helfen Frauen Schw\xE4bisch Gm\xFCnd e.\xA0V."))))));
}
function UeberMichScreen() {
  return /*#__PURE__*/React.createElement("main", {
    className: "screen screen--ueber"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ueber-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ueber-hero__photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/portrait.jpg",
    alt: "Jessica Bisetto"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ueber-hero__text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "\xDCber mich"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display"
  }, "Hallo, ich bin ", /*#__PURE__*/React.createElement("em", null, "Jessi"), "."), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Coach im Ostalbkreis und Surferin im \xFCbertragenen Sinn. Meine Expertise: andere auf ihr Board zu bringen."))), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-lg"
  }, "Vor vielen Jahren habe ich gemerkt: Das, was uns wirklich weiterbringt, steht selten in Ratgebern. Es passiert im Gespr\xE4ch, in der Begegnung, im ehrlichen Hinschauen \u2014 auf das, was uns ausmacht, und auf das, was uns gerade im Weg steht."), /*#__PURE__*/React.createElement("p", {
    className: "body"
  }, "Seitdem begleite ich Menschen \u2014 Kinder, Erwachsene, ganze Teams \u2014 auf ihren ganz eigenen Wegen. Ich helfe ihnen quasi dabei, ihr eigenes Surfbrett zu gestalten \u2014 das, was sie tr\xE4gt, wenn die Welle hochkommt. Mit Methoden, die wirklich etwas bewegen, aber ohne dass du in irgendein System hineinpassen musst. Mit Empathie, aber auch mit Klarheit. Mit Ruhe \u2014 und mit Schwung, wenn er gebraucht wird."), /*#__PURE__*/React.createElement("h2", {
    className: "h2"
  }, "Meine drei S\xE4ulen"), /*#__PURE__*/React.createElement("p", {
    className: "body",
    style: {
      marginTop: -8
    }
  }, "Drei Dinge tragen mich seit Jahren \u2014 und tragen auch das, was ich tue:"), /*#__PURE__*/React.createElement("div", {
    className: "pillars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/sparkles.svg",
    width: "22",
    height: "22"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "h3"
  }, "Innovation"), /*#__PURE__*/React.createElement("p", {
    className: "body-sm"
  }, "Methoden, die wirklich helfen \u2014 auch wenn sie nicht im Lehrbuch stehen. Keine Dogmen, keine Auswendig-S\xE4tze.")), /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/wind.svg",
    width: "22",
    height: "22"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "h3"
  }, "Leichtigkeit"), /*#__PURE__*/React.createElement("p", {
    className: "body-sm"
  }, "Ver\xE4nderung darf sich gut anf\xFChlen. Lachen ist erlaubt \u2014 manchmal ist das genau, was fehlt.")), /*#__PURE__*/React.createElement("div", {
    className: "pillar"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/leaf.svg",
    width: "22",
    height: "22"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "h3"
  }, "Balance"), /*#__PURE__*/React.createElement("p", {
    className: "body-sm"
  }, "Nicht \u201Ebesser werden m\xFCssen\" \u2014 sondern dahin kommen, wo du dich wieder sp\xFCrst. Im Gleichgewicht."))), /*#__PURE__*/React.createElement("p", {
    className: "about__sig",
    style: {
      marginTop: 8
    }
  }, "\u2014 Jessi"), /*#__PURE__*/React.createElement("details", {
    className: "ref-box"
  }, /*#__PURE__*/React.createElement("summary", {
    className: "ref-box__summary"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ref-box__label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow ref-box__eb"
  }, "Referenzen"), /*#__PURE__*/React.createElement("span", {
    className: "ref-box__hint"
  }, "Meine Ausbildungen & Qualifikationen \u2014 zum Aufklappen")), /*#__PURE__*/React.createElement("span", {
    className: "ref-box__chev",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "4 6 8 10 12 6"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ref-box__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ref-grp"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ref-grp__l"
  }, "Trauma & EMDR"), /*#__PURE__*/React.createElement("ul", {
    className: "ref-grp__list"
  }, /*#__PURE__*/React.createElement("li", null, "EMDR \u2014 PAPB Andreas Zimmermann"), /*#__PURE__*/React.createElement("li", null, "Pragmatische Traumatherapie \u2014 PAPB Andreas Zimmermann"), /*#__PURE__*/React.createElement("li", null, "Traumatherapie \u2014 E-Learning Kinderschutz, Universit\xE4tsklinikum Ulm"))), /*#__PURE__*/React.createElement("div", {
    className: "ref-grp"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ref-grp__l"
  }, "Kinder- & Jugendcoaching \xB7 IPE"), /*#__PURE__*/React.createElement("ul", {
    className: "ref-grp__list"
  }, /*#__PURE__*/React.createElement("li", null, "Kinder- & Jugendcoach \u2014 Grundausbildung"), /*#__PURE__*/React.createElement("li", null, "Kinder- & Jugendcoach \u2014 Erweiterung"), /*#__PURE__*/React.createElement("li", null, "Kinder- & Jugendcoach \u2014 Professional"), /*#__PURE__*/React.createElement("li", null, "Lerncoach / Themenneutrale Pr\xFCfungsvorbereitung"))), /*#__PURE__*/React.createElement("div", {
    className: "ref-grp"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ref-grp__l"
  }, "Erwachsenencoaching"), /*#__PURE__*/React.createElement("ul", {
    className: "ref-grp__list"
  }, /*#__PURE__*/React.createElement("li", null, "AMR \u2014 Advanced Movement Reprocessing (nach Daniel Paasch)"))), /*#__PURE__*/React.createElement("div", {
    className: "ref-grp"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ref-grp__l"
  }, "Selbstbehauptung & Pr\xE4vention"), /*#__PURE__*/React.createElement("ul", {
    className: "ref-grp__list"
  }, /*#__PURE__*/React.createElement("li", null, "Trainerin f\xFCr Selbstbehauptung und Resilienz (Stark auch ohne Muckis)"), /*#__PURE__*/React.createElement("li", null, "Beraterin f\xFCr einheitlichen Umgang mit Mobbing und Konflikten (Stark auch ohne Muckis)"))), /*#__PURE__*/React.createElement("div", {
    className: "ref-grp"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ref-grp__l"
  }, "Reflexintegration \xB7 RIT"), /*#__PURE__*/React.createElement("ul", {
    className: "ref-grp__list"
  }, /*#__PURE__*/React.createElement("li", null, "RIT-Reflexintegration I \u2014 Grundausbildung"), /*#__PURE__*/React.createElement("li", null, "RIT-Reflexintegration II \u2014 Lese-/Rechtschreibschw\xE4che, Legasthenie"), /*#__PURE__*/React.createElement("li", null, "RIT-Reflexintegration III \u2014 an Kitas und Schulen"), /*#__PURE__*/React.createElement("li", null, "RIT-Reflexintegration VI \u2014 im Breitensport"))), /*#__PURE__*/React.createElement("div", {
    className: "ref-grp"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ref-grp__l"
  }, "Lehrt\xE4tigkeit"), /*#__PURE__*/React.createElement("ul", {
    className: "ref-grp__list"
  }, /*#__PURE__*/React.createElement("li", null, "Dozentin VHS Schw\xE4bisch Gm\xFCnd"), /*#__PURE__*/React.createElement("li", null, "Dozentin VHS Crailsheim"), /*#__PURE__*/React.createElement("li", null, "Dozentin VHS Schw\xE4bisch Hall (Frauenakademie)")))))));
}
window.AngeboteScreen = AngeboteScreen;
window.UeberMichScreen = UeberMichScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* global React */

function Hero({
  onCta
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero-bg.jpg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__veil"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hero__inner"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow hero__eyebrow"
  }, "Coaching \xB7 Schw\xE4bisch Gm\xFCnd"), /*#__PURE__*/React.createElement("h1", {
    className: "h-display hero__h"
  }, "Du bist der wichtigste", /*#__PURE__*/React.createElement("br", null), "Mensch in ", /*#__PURE__*/React.createElement("em", null, "deinem"), " Leben."), /*#__PURE__*/React.createElement("p", {
    className: "lede hero__lede"
  }, "Manchmal reicht ein Gespr\xE4ch \u2014 manchmal braucht es mehr."), /*#__PURE__*/React.createElement("div", {
    className: "hero__cta"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-pri",
    onClick: e => {
      e.preventDefault();
      onCta("kontakt");
    }
  }, "Erstgespr\xE4ch vereinbaren", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-ghost",
    onClick: e => {
      e.preventDefault();
      onCta("angebote");
    }
  }, "Angebote ansehen"))));
}
function AudienceCards({
  onNav
}) {
  const cards = [{
    id: "kinder",
    eb: "Kinder & Jugendliche",
    t: "Spielen, fragen, wachsen.",
    d: "Begleitung bei Schul- und Familienthemen, Selbstwert, Konzentration — altersgerecht und behutsam.",
    photo: "../../assets/kinder.jpg",
    tone: "kinder"
  }, {
    id: "erwachsene",
    eb: "Erwachsene",
    t: "Ruhig hinschauen.",
    d: "Coaching bei Blockaden, Belastung, Lebensübergängen. Wir schauen, was wirklich gerade dran ist.",
    photo: "../../assets/erwachsene.jpg",
    tone: "erwachsene"
  }, {
    id: "unternehmen",
    eb: "Unternehmen & Kommunen",
    t: "Gemeinsam tragen.",
    d: "Workshops und Trainings für Teams, Schulen und Verwaltungen — zu Resilienz, Kommunikation, Konflikt.",
    photo: "../../assets/unternehmen.jpg",
    tone: "unternehmen"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "aud"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aud__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Drei Wege, ein Ziel"), /*#__PURE__*/React.createElement("h2", {
    className: "h1"
  }, "F\xFCr wen ich da bin.")), /*#__PURE__*/React.createElement("div", {
    className: "aud__grid"
  }, cards.map(c => /*#__PURE__*/React.createElement("a", {
    key: c.id,
    href: "#",
    className: "aud-card aud-card--" + c.tone,
    onClick: e => {
      e.preventDefault();
      onNav("angebote", c.id);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "aud-card__img",
    style: {
      backgroundImage: `url(${c.photo})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "aud-card__body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow aud-card__eb"
  }, c.eb), /*#__PURE__*/React.createElement("h3", {
    className: "aud-card__t"
  }, c.t), /*#__PURE__*/React.createElement("p", {
    className: "aud-card__d"
  }, c.d), /*#__PURE__*/React.createElement("div", {
    className: "aud-card__more"
  }, "Mehr erfahren ", /*#__PURE__*/React.createElement("span", {
    className: "arr"
  }, "\u2192")))))));
}
function AboutTeaser({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about__photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/portrait.jpg",
    alt: "Portr\xE4t Jessica Bisetto"
  })), /*#__PURE__*/React.createElement("div", {
    className: "about__text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "\xDCber mich"), /*#__PURE__*/React.createElement("h2", {
    className: "h1"
  }, "Drei S\xE4ulen: Innovation, Leichtigkeit, Balance."), /*#__PURE__*/React.createElement("p", {
    className: "body-lg"
  }, "Ich begleite Menschen dabei, ihr eigenes \u201ESurfbrett\" zu gestalten \u2014 das, was sie tr\xE4gt, wenn die Wellen des Lebens hoch werden. Wachstum ist individuell. Mein Job: erkennen, was gebraucht wird, und es so vermitteln, dass es umgesetzt werden kann."), /*#__PURE__*/React.createElement("p", {
    className: "about__sig"
  }, "\u2014 Jessi"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-sec",
    onClick: e => {
      e.preventDefault();
      onNav("ueber");
    }
  }, "Mehr \xFCber mich")));
}
function Testimonials() {
  const items = [{
    q: "Liebe Frau Bisetto, vielen herzlichen Dank. Sie haben mir mit ganz viel Empathie und mit super wirksamen Methoden, die langfristig wirken, sehr geholfen. Ich freue mich nun über ganz viel neu gewonnene Leichtigkeit, Freude und Kraft in meinem Leben. Zusammen mit Ihnen habe ich mich endlich getraut die Themen zu be- und verarbeiten, die mich schon sehr lange belasteten. Diese Themen waren Mobbing in meiner Jugend, daraus resultierender Perfektionismus und der ständige Drang nach Anerkennung. Seit dem Coaching mit Ihnen geht es mir endlich wieder gut. Ich bin Ihnen sehr dankbar!",
    who: "Nadine S.",
    ctx: "Erwachsenen-Coaching"
  }, {
    q: "Im Sommer 2021 sind mein Sohn Julius und ich zum ersten Mal bei Jessi gewesen. Das Erstgespräch war sehr angenehm und stiftete viel Vertrauen, auch Julius fühlte sich sehr wohl und gut aufgehoben. Wir entschieden uns für eine Reflexintegration und zusätzlich für ein Kinder- und Jugendcoaching. Das Coaching half Julius sehr schnell in der Schule selbstbewusster mit schwierigen Situationen umzugehen. Das Reflexintegrationstraining dauerte etwa ein Jahr, aber durch Jessis wunderbare Art war Julius immer motiviert, ging gerne zu den Stunden und machte auch zu Hause die Übungen regelmäßig. Vielen Dank, liebe Jessi, mach weiter so.",
    who: "Mutter von Julius",
    ctx: "Kinder- & Jugendcoaching · 2021"
  }, {
    q: "Liebe Jessi, von Herzen danke für das tolle Webinar: ‚Stark auf dem Schulhof — wie schütze ich mein Kind vor Mobbing?\u2018 Was für ein AHA-Effekt! So wertvolle Tipps, die eigentlich einfach umsetzbar sind, wenn man sie weiß. Meiner Meinung nach sollten alle Eltern und Pädagogen dein Webinar besuchen! Ich hätte dir noch stundenlang zuhören können!",
    who: "Andrea B.",
    ctx: "Webinar — Stark auf dem Schulhof"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "testi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "testi__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Kundenstimmen"), /*#__PURE__*/React.createElement("h2", {
    className: "h1"
  }, "Was Menschen mitnehmen.")), /*#__PURE__*/React.createElement("div", {
    className: "testi__grid"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    className: "testi-card"
  }, /*#__PURE__*/React.createElement("blockquote", {
    className: "testi-card__q"
  }, it.q), /*#__PURE__*/React.createElement("figcaption", {
    className: "testi-card__sig"
  }, /*#__PURE__*/React.createElement("strong", null, it.who, it.placeholder && /*#__PURE__*/React.createElement("em", {
    className: "testi-card__ph"
  }, " \xB7 Platzhalter")), /*#__PURE__*/React.createElement("span", null, it.ctx))))));
}
function Partners() {
  const groups = [{
    label: "Städte & Kommunen",
    items: ["Stadt Schwäbisch Gmünd", "Stadt Lorch", "Stadtbibliothek Heidenheim"]
  }, {
    label: "Volkshochschulen",
    items: ["VHS Schwäbisch Gmünd", "VHS Schwäbisch Hall · IWK", "VHS Aalen", "VHS Crailsheim", "VHS Gerlingen"]
  }, {
    label: "Schulen",
    items: ["GSS Crailsheim", "Parler-Gymnasium Schwäbisch Gmünd", "Heideschule Mutlangen", "Gymnasium bei St. Michael, Schwäbisch Hall"],
    more: "und weitere Schulen",
    moreItems: ["Realschule zur Flügelau Crailsheim", "Theodor-Heuss-Schule Herlikofen", "Mozartschule Hussenhofen", "Karl-Stirner-Schule Rosenberg", "Rauchbeinschule, Schwäbisch Gmünd", "St.-Josef-Schule, Schwäbisch Gmünd", "Uhlandschule Schwäbisch Gmünd"]
  }, {
    label: "Soziale Einrichtungen",
    items: ["Mundi", "Frauen helfen Frauen e.V."]
  }, {
    label: "Unternehmen",
    items: ["Triumph, Heubach"]
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "partners"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow partners__eb"
  }, "Vertraut von"), /*#__PURE__*/React.createElement("div", {
    className: "partners__groups"
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label,
    className: "partners__group"
  }, /*#__PURE__*/React.createElement("p", {
    className: "partners__glabel"
  }, g.label), /*#__PURE__*/React.createElement("ul", {
    className: "partners__list"
  }, g.items.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    className: "partners__cell"
  }, p)), g.more && (g.moreItems ? /*#__PURE__*/React.createElement("li", {
    className: "partners__cell partners__more partners__more--has-pop",
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "partners__more-label"
  }, g.more, /*#__PURE__*/React.createElement("svg", {
    className: "partners__more-chev",
    width: "11",
    height: "11",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "4 6 8 10 12 6"
  }))), /*#__PURE__*/React.createElement("ul", {
    className: "partners__pop",
    role: "list"
  }, g.moreItems.map(m => /*#__PURE__*/React.createElement("li", {
    key: m
  }, m)))) : /*#__PURE__*/React.createElement("li", {
    className: "partners__cell partners__more"
  }, g.more)))))));
}
window.Hero = Hero;
window.AudienceCards = AudienceCards;
window.AboutTeaser = AboutTeaser;
window.Testimonials = Testimonials;
window.Partners = Partners;
const DOWNLOADS = [{
  eb: "Allgemein",
  tone: "neutral",
  title: "Coaching im Überblick",
  desc: "Ein einseitiger Flyer, den du Freunden, Eltern oder Kolleginnen weitergeben kannst — Methoden, Zielgruppen, Kontakt.",
  file: "downloads/flyer-coaching-ueberblick.html",
  meta: "A4 · zum Drucken oder als PDF"
}, {
  eb: "Kinder & Eltern",
  tone: "kinder",
  title: "Malvorlage — Wutmonster",
  desc: "Eine Vorlage, mit der dein Kind seiner Wut ein Gesicht geben kann — auf Papier statt im Wohnzimmer. Ausdrucken, ausmalen, drüber reden.",
  file: "downloads/malvorlage-wutmonster.pdf",
  meta: "PDF · A4 · 325 KB"
}, {
  eb: "Kinder & Eltern",
  tone: "kinder",
  title: "Papierpuppe — Löwe",
  desc: "Eine Bastelvorlage zum Ausschneiden. Mit kleinen Fragen für nebenher: Was macht dich mutig? Wann brüllst du, wann schmust du?",
  file: "downloads/papierpuppe-loewe.pdf",
  meta: "PDF · A4 · 230 KB"
}, {
  eb: "Unternehmen & Schulen",
  tone: "unternehmen",
  title: "Workshop-Übersicht",
  desc: "Alle Workshop-Formate auf einen Blick — mit Dauer, Themen, möglichen Rahmenbedingungen für Schulen, Verwaltungen und Unternehmen.",
  file: "downloads/workshops-uebersicht.pdf",
  meta: "PDF · 6 Seiten · 1.4 MB"
}];
function Downloads() {
  return /*#__PURE__*/React.createElement("section", {
    className: "dl",
    id: "elternbibliothek"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl__head"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow"
  }, "Material zum Mitnehmen \xB7 Elternbibliothek"), /*#__PURE__*/React.createElement("h2", {
    className: "h1"
  }, "Geschenkt, ohne Anmeldung."), /*#__PURE__*/React.createElement("p", {
    className: "lede dl__lede"
  }, "Vorlagen, Reflexionshilfen und \xDCbersichten \u2014 alles direkt zum Herunterladen. Wenn dir etwas davon hilft, freue ich mich, wenn du es weitergibst.")), /*#__PURE__*/React.createElement("div", {
    className: "dl__grid"
  }, DOWNLOADS.map((d, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "../../" + d.file,
    download: true,
    className: "dl-card dl-card--" + d.tone
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl-card__corner",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "40",
    viewBox: "0 0 32 40",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 2 L22 2 L30 10 L30 38 L4 38 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 2 L22 10 L30 10"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "eyebrow dl-card__eb"
  }, d.eb), /*#__PURE__*/React.createElement("h3", {
    className: "dl-card__t"
  }, d.title), /*#__PURE__*/React.createElement("p", {
    className: "dl-card__d"
  }, d.desc), /*#__PURE__*/React.createElement("div", {
    className: "dl-card__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dl-card__meta"
  }, d.meta), /*#__PURE__*/React.createElement("span", {
    className: "dl-card__cta"
  }, "Herunterladen", /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2193")))))));
}
window.Downloads = Downloads;
function NewsletterCTA({
  variant
}) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const isCompact = variant === "compact";
  const submit = e => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return;
    setSubmitted(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "nl" + (isCompact ? " nl--compact" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nl__text"
  }, /*#__PURE__*/React.createElement("p", {
    className: "eyebrow nl__eb"
  }, "Newsletter"), /*#__PURE__*/React.createElement("h2", {
    className: isCompact ? "h2" : "h1"
  }, "Bleib in Kontakt."), !isCompact && /*#__PURE__*/React.createElement("p", {
    className: "lede nl__lede"
  }, "Ab und an schicke ich dir, was es Neues bei mir gibt \u2014 kommende Kurse, freie Termine, Events und kleine Impulse zum Nachdenken. Ohne Druck, ohne festen Rhythmus. Du kannst dich jederzeit wieder austragen."), isCompact && /*#__PURE__*/React.createElement("p", {
    className: "body nl__lede"
  }, "Hat dich der Beitrag ber\xFChrt? Bleib dran \u2014 ab und an schicke ich dir, was bei mir los ist: Kurse, Angebote, Events und kleine Impulse. Jederzeit abbestellbar.")), submitted ? /*#__PURE__*/React.createElement("div", {
    className: "nl__done"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/check.svg",
    width: "20",
    height: "20",
    alt: ""
  }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Danke, sch\xF6n, dass du da bist."), /*#__PURE__*/React.createElement("br", null), "Du bekommst gleich eine kurze Best\xE4tigung an ", /*#__PURE__*/React.createElement("em", null, email), ".")) : /*#__PURE__*/React.createElement("form", {
    className: "nl__form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("label", {
    className: "nl__field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "visually-hidden"
  }, "E-Mail-Adresse"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "deine E-Mail-Adresse",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "nl__submit"
  }, "Anmelden", /*#__PURE__*/React.createElement("span", {
    className: "arr",
    "aria-hidden": "true"
  }, "\u2192")), /*#__PURE__*/React.createElement("p", {
    className: "nl__fineprint"
  }, "Mit der Anmeldung stimmst du den ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Datenschutzhinweisen"), " zu."))));
}
window.NewsletterCTA = NewsletterCTA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

})();
