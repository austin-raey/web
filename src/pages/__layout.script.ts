interface RotationOptions {
  pointerX: number;
  pointerY: number;
  x: number;
  y: number;
}

const DAMPEN_ROTATE_FACTOR = 120;
const MIN_MOTION_WIDTH = 768;
const ROTATED_VIEWPORT_WIDTH = 520;
const LISTENER_OPTIONS: AddEventListenerOptions = { passive: true };

export class WrenCard extends HTMLElement {
  motionDisabled: boolean;
  #bounds?: DOMRectReadOnly;
  #isInitialized = false;
  #isMotionViewport = true;
  #isReset = true;
  #isRotatedViewport = false;
  #nextFrame: RotationOptions | undefined;
  #rafId?: number;
  #resizeObserver?: ResizeObserver;

  constructor() {
    super();

    this.motionDisabled = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  connectedCallback() {
    if (this.motionDisabled) return;

    this.#initialize();
  }

  disconnectedCallback() {
    this.#isInitialized = false;
    this.#removeEventListeners();
    this.#resizeObserver?.disconnect();
    this.#cancelFrame();
    this.#bounds = undefined;
    this.#nextFrame = undefined;
    this.#setTransform();
  }

  #addEventListeners() {
    document.addEventListener("pointerenter", this.#updateBounds, LISTENER_OPTIONS);
    document.addEventListener("pointermove", this.#onPointerMove, LISTENER_OPTIONS);
    document.addEventListener("pointerleave", this.#onPointerLeave, LISTENER_OPTIONS);
  }

  #cancelFrame() {
    if (this.#rafId === undefined) return;

    cancelAnimationFrame(this.#rafId);
    this.#rafId = undefined;
  }

  #computeFrame(clientX: number, clientY: number): RotationOptions {
    const rect = this.#bounds ?? (this.#bounds = this.getBoundingClientRect());
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    let dx: number;
    let dy: number;

    if (this.#isRotatedViewport) {
      // Offset from center in a viewport rotated 90deg.
      dx = clientY - (rect.top + halfHeight);
      dy = -(clientX - (rect.left + halfWidth));
    } else {
      dx = clientX - rect.left - halfWidth;
      dy = clientY - rect.top - halfHeight;
    }

    const x = dx / DAMPEN_ROTATE_FACTOR;
    const y = dy / DAMPEN_ROTATE_FACTOR;

    return this.#isRotatedViewport
      ? { pointerX: Math.floor(clientX), pointerY: Math.floor(clientY), x: -y, y: x }
      : { pointerX: Math.floor(clientX), pointerY: Math.floor(clientY), x: y, y: -x };
  }

  #flushFrame = () => {
    const frame = this.#nextFrame;

    this.#nextFrame = undefined;
    this.#rafId = undefined;

    this.#setTransform(frame);
  };

  #initialize() {
    if (this.#isInitialized) return;

    this.#isInitialized = true;
    this.#updateBounds();
    this.#resizeObserver ??= new ResizeObserver(this.#updateBounds);
    this.#resizeObserver.observe(document.documentElement);
    this.#addEventListeners();
  }

  #onPointerLeave = () => {
    this.#scheduleTransform(undefined);
  };

  #onPointerMove = (event: PointerEvent) => {
    if (!this.#isMotionViewport) {
      this.#scheduleTransform(undefined);
      return;
    }

    this.#scheduleTransform(this.#computeFrame(event.clientX, event.clientY));
  };

  #removeEventListeners() {
    document.removeEventListener("pointerenter", this.#updateBounds);
    document.removeEventListener("pointermove", this.#onPointerMove);
    document.removeEventListener("pointerleave", this.#onPointerLeave);
  }

  #scheduleTransform(frame: RotationOptions | undefined) {
    // Avoid queueing redundant reset frames when already at rest.
    if (frame === undefined && this.#isReset && this.#nextFrame === undefined) return;

    this.#nextFrame = frame;

    if (this.#rafId !== undefined) return;

    this.#rafId = requestAnimationFrame(this.#flushFrame);
  }

  #setTransform(options?: RotationOptions) {
    const { style } = this;

    if (options === undefined) {
      if (this.#isReset) return;

      this.#isReset = true;
      style.setProperty("--r-x", "0deg");
      style.setProperty("--r-y", "0deg");
      style.setProperty("--pointer-x", "50%");
      style.setProperty("--pointer-y", "50%");
      return;
    }

    this.#isReset = false;
    style.setProperty("--r-x", `${options.x}deg`);
    style.setProperty("--r-y", `${options.y}deg`);
    style.setProperty("--pointer-x", `${options.pointerX}px`);
    style.setProperty("--pointer-y", `${options.pointerY}px`);
  }

  #updateBounds = () => {
    const width = window.innerWidth;

    this.#isMotionViewport = width >= MIN_MOTION_WIDTH;
    this.#isRotatedViewport = width <= ROTATED_VIEWPORT_WIDTH;
    this.#bounds = this.getBoundingClientRect();
  };
}

if (!customElements.get("wren-card")) {
  customElements.define("wren-card", WrenCard);
}
