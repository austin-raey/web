import type { AstroCard } from ".";

export interface RotationOptions {
	pointerX: number;
	pointerY: number;
	x: number;
	y: number;
}

type PendingFrame = RotationOptions | null;

export class RotationManager {
	#bounds?: DOMRectReadOnly;
	#isInitialized: boolean;
	#isLarge: boolean;
	#isRotatedViewport: boolean;
	#nextFrame?: PendingFrame;
	#rafId?: number;
	#resizeObserver?: ResizeObserver;
	#root: AstroCard;
	#rotateFactor: number;
	#rotation: HTMLDivElement;

	constructor(component: AstroCard) {
		this.#root = component;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.#rotation = this.#root.querySelector(".rotate")!;

		this.#isLarge = component.size === "large";
		this.#rotateFactor = this.#isLarge ? 256 : 64;
		this.#isInitialized = false;
		this.#isRotatedViewport = false;
		this.#nextFrame = undefined;

		if (this.#root.motionDisabled) return;

		this.initialize();
	}

	cleanup() {
		this.#isInitialized = false;
		this.#removeEventListeners();
		this.#resizeObserver?.disconnect();
		this.#bounds = undefined;
		this.#nextFrame = undefined;
		this.#setTransform();
		if (this.#rafId !== undefined) {
			cancelAnimationFrame(this.#rafId);
			this.#rafId = undefined;
		}
	}

	initialize() {
		if (this.#isInitialized) return;

		this.#isInitialized = true;
		this.#updateBounds();
		this.#resizeObserver ??= new ResizeObserver(this.#updateBounds);
		this.#resizeObserver.observe(this.#root);
		this.#addEventListeners();
	}

	#addEventListeners() {
		const config = { passive: true };
		this.#rotation.addEventListener("pointerenter", this.#updateBounds, config);
		this.#rotation.addEventListener("pointermove", this.#onPointerMove, config);
		this.#rotation.addEventListener(
			"pointerleave",
			this.#onPointerLeave,
			config
		);
	}

	#calculateRotation(cursorPosX: number, cursorPosY: number): [number, number] {
		const rect = this.#bounds;
		const halfWidth = (rect?.width ?? this.#root.offsetWidth) / 2;
		const halfHeight = (rect?.height ?? this.#root.offsetHeight) / 2;

		const x = (cursorPosX - halfWidth) / this.#rotateFactor;
		const y = (cursorPosY - halfHeight) / this.#rotateFactor;

		return this.#isRotatedViewport ? [-y, x] : [y, -x];
	}

	#getCursorPosition(clientX: number, clientY: number): [number, number] {
		const rect = this.#bounds ?? this.#root.getBoundingClientRect();

		if (this.#isRotatedViewport) {
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			return [
				clientY - centerY + rect.width / 2,
				-(clientX - centerX) + rect.height / 2
			];
		}

		return [clientX - rect.left, clientY - rect.top];
	}

	#onPointerLeave = () => {
		if (this.#root.motionDisabled) return;

		this.#scheduleTransform(null);
	};

	#onPointerMove = (event: PointerEvent) => {
		if (this.#root.motionDisabled) return;

		if (this.#isLarge && window.innerWidth < 768) {
			this.#scheduleTransform(null);
			return;
		}

		const { clientX, clientY } = event;
		this.#isRotatedViewport = !this.#isLarge && window.innerWidth <= 520;

		const [cursorPosX, cursorPosY] = this.#getCursorPosition(clientX, clientY);
		const [x, y] = this.#calculateRotation(cursorPosX, cursorPosY);

		this.#scheduleTransform({
			pointerX: clientX,
			pointerY: clientY,
			x,
			y
		});
	};

	#removeEventListeners() {
		this.#rotation.removeEventListener("pointerenter", this.#updateBounds);
		this.#rotation.removeEventListener("pointermove", this.#onPointerMove);
		this.#rotation.removeEventListener("pointerleave", this.#onPointerLeave);

		if (this.#rafId !== undefined) {
			cancelAnimationFrame(this.#rafId);
			this.#rafId = undefined;
		}
	}

	#updateBounds = () => {
		this.#bounds = this.#root.getBoundingClientRect();
	};

	#flushFrame = () => {
		const frame = this.#nextFrame;

		this.#nextFrame = undefined;
		this.#rafId = undefined;

		this.#setTransform(frame ?? undefined);
	};

	#scheduleTransform(frame: PendingFrame) {
		this.#nextFrame = frame;

		if (this.#rafId !== undefined) return;

		this.#rafId = requestAnimationFrame(this.#flushFrame);
	}

	#setTransform(options?: RotationOptions) {
		this.#root.style.setProperty("--rotate-x", `${options?.x ?? 0}deg`);
		this.#root.style.setProperty("--rotate-y", `${options?.y ?? 0}deg`);
		this.#root.style.setProperty(
			"--pointer-x",
			options?.pointerX === undefined ? "50%" : `${options.pointerX}px`
		);
		this.#root.style.setProperty(
			"--pointer-y",
			options?.pointerY === undefined ? "50%" : `${options.pointerY}px`
		);
	}
}
