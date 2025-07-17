import { KEY_MOTION, type Props } from "../layout.astro";
import { ControlsManager } from "./controls.js";
import { RotationManager } from "./rotation.js";

export class AstroCard extends HTMLElement {
	controlsManager: ControlsManager;
	motionDisabled: boolean;
	rotationManager: RotationManager;
	// readonly controls: HTMLDivElement = this.querySelector(".controls")!;
	readonly size: Props["size"];

	constructor() {
		super();

		this.size = this.dataset.size as Props["size"];
		const localStorageMotion = localStorage.getItem(KEY_MOTION) === "true";
		this.motionDisabled = localStorageMotion
			? globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches ||
				this.dataset.motion === "false"
			: true;

		// Initialize managers
		this.rotationManager = new RotationManager(this);
		this.controlsManager = new ControlsManager(this);
	}

	connectedCallback() {
		console.log("AstroCard connected", this.dataset.motion);
	}

	disconnectedCallback() {
		this.controlsManager.cleanup();
		this.rotationManager.cleanup();
	}
}

customElements.define("astro-card", AstroCard);
