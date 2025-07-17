import type { AstroCard } from ".";

export interface RotationOptions {
	pointerX: number;
	pointerY: number;
	x: number;
	y: number;
}

export class RotationManager {
	#isLarge: boolean;
	#isRotatedViewport: boolean;
	#rafId?: number;
	#root: AstroCard;
	#rotateFactor: number;
	#rotation: HTMLDivElement;

	constructor(component: AstroCard) {
		this.#root = component;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.#rotation = this.#root.querySelector(".rotate")!;

		this.#isLarge = component.size === "large";
		this.#rotateFactor = this.#isLarge ? 256 : 64;
		this.#isRotatedViewport = false;

		if (this.#root.motionDisabled) return;

		this.initialize();
	}

	cleanup() {
		this.#removeEventListeners();
		this.#setTransform();
		if (this.#rafId) {
			cancelAnimationFrame(this.#rafId);
		}
	}

	initialize() {
		this.#addEventListeners();
	}

	#addEventListeners() {
		const config = { passive: true };
		this.#rotation.addEventListener("pointermove", this.#onPointerMove, config);
		this.#rotation.addEventListener(
			"pointerleave",
			this.#onPointerLeave,
			config
		);
		this.#rotation.addEventListener("touchmove", this.#onPointerMove, config);
		this.#rotation.addEventListener("touchend", this.#onPointerLeave, config);
	}

	#calculateRotation(cursorPosX: number, cursorPosY: number): [number, number] {
		const halfWidth = this.#root.offsetWidth >> 1;
		const halfHeight = this.#root.offsetHeight >> 1;

		const x = (cursorPosX - halfWidth) / this.#rotateFactor;
		const y = (cursorPosY - halfHeight) / this.#rotateFactor;

		return this.#isRotatedViewport ? [-y, x] : [y, -x];
	}

	#getCursorPosition(clientX: number, clientY: number): [number, number] {
		if (this.#isRotatedViewport) {
			const rect = this.#root.getBoundingClientRect();
			const centerX = rect.left + (rect.width >> 1);
			const centerY = rect.top + (rect.height >> 1);

			return [
				clientY - centerY + (this.#root.offsetWidth >> 1),
				-(clientX - centerX) + (this.#root.offsetHeight >> 1)
			];
		}

		return [clientX - this.#root.offsetLeft, clientY - this.#root.offsetTop];
	}

	#onPointerLeave = () => {
		if (this.#root.motionDisabled || this.#rafId) return;

		this.#rafId = requestAnimationFrame(() => {
			this.#setTransform();
			this.#rafId = undefined;
		});
	};

	#onPointerMove = (event: PointerEvent | TouchEvent) => {
		if (
			this.#rafId ||
			this.#root.motionDisabled ||
			(this.#isLarge && window.innerWidth < 768)
		)
			return;

		const { clientX, clientY } = "touches" in event ? event.touches[0] : event;
		this.#isRotatedViewport = !this.#isLarge && window.innerWidth <= 520;

		const [cursorPosX, cursorPosY] = this.#getCursorPosition(clientX, clientY);
		const [x, y] = this.#calculateRotation(cursorPosX, cursorPosY);

		this.#rafId = requestAnimationFrame(() => {
			this.#setTransform({
				pointerX: clientX,
				pointerY: clientY,
				x,
				y
			});
			this.#rafId = undefined;
		});
	};

	#removeEventListeners() {
		this.#rotation.removeEventListener("pointermove", this.#onPointerMove);
		this.#rotation.removeEventListener("pointerleave", this.#onPointerLeave);
		this.#rotation.removeEventListener("touchmove", this.#onPointerMove);
		this.#rotation.removeEventListener("touchend", this.#onPointerLeave);

		if (this.#rafId) {
			cancelAnimationFrame(this.#rafId);
			this.#rafId = undefined;
		}
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
