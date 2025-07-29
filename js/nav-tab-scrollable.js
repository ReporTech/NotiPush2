import { querySelector } from "../lib/js/querySelector.js";
import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js";

export class NavTabScrollable extends HTMLElement {
	connectedCallback() {
		this.classList.add("md-tab", "scrollable");

		this.innerHTML = /* HTML */ `
			<a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
				<span class="material-symbols-outlined">home</span>
				Inicio
			</a>

			<a id="navtabfixed" ${resaltaSiEstasEn(["/renderCliente.html"])} href="renderCliente.html">
				<span class="material-symbols-outlined">list</span>
				Lista de Chistes C
			</a>
			
			<a id="navtabfixed" ${resaltaSiEstasEn(["/renderServidor.html"])} href="renderServidor.html">
				<span class="material-symbols-outlined">list</span>
				Lista de Chistes S
			</a>

			<a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
				<span class="material-symbols-outlined">help</span>
				Ayuda
			</a>
		`;
	}
}

customElements.define("nav-tab-scrollable", NavTabScrollable);
