import type { AstroCard } from ".";

import { KEY_MOTION } from "../js";

export class ControlsManager {
	#controls: HTMLDivElement;
	#root: AstroCard;

	constructor(component: AstroCard) {
		this.#root = component;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		this.#controls = this.#root.querySelector(".controls")!;
		this.#controls.addEventListener("click", this.#handleClick);
	}

	cleanup() {
		this.#controls.removeEventListener("click", this.#handleClick);
	}

	#handleClick = () => {
		this.#root.motionDisabled = !this.#root.motionDisabled;
		this.#root.dataset.motion = (!this.#root.motionDisabled).toString();
		localStorage.setItem(KEY_MOTION, this.#root.dataset.motion || "true");

		if (this.#root.motionDisabled) {
			this.#root.rotationManager.cleanup();
		} else {
			this.#root.rotationManager.initialize();
		}
	};
}
