import { type Props } from "../layout.astro";
import { ControlsManager } from "./controls";
import { RotationManager } from "./rotation";

export const KEY_MOTION = "astro-motion";

export class AstroCard extends HTMLElement {
	controlsManager: ControlsManager;
	motionDisabled: boolean;
	rotationManager: RotationManager;
	// readonly controls: HTMLDivElement = this.querySelector(".controls")!;
	readonly size: Props["size"];

	constructor() {
		super();

		this.size = this.dataset.size as Props["size"];
		const storage = globalThis.localStorage.getItem(KEY_MOTION);
		const canHaveMotion = storage === "true" || storage === null;
		this.motionDisabled = canHaveMotion
			? globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches ||
				this.dataset.motion === "false"
			: true;

		// Initialize managers
		this.rotationManager = new RotationManager(this);
		this.controlsManager = new ControlsManager(this);
	}

	disconnectedCallback() {
		this.controlsManager.cleanup();
		this.rotationManager.cleanup();
	}
}

customElements.define("astro-card", AstroCard);
