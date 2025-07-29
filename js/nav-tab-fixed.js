import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js"

export class NavTabFixed extends HTMLElement {

  connectedCallback() {
    this.classList.add("md-tab", "fixed")

    this.innerHTML = /* HTML */`
   <a ${resaltaSiEstasEn(["/index.html", "/agrega.html", "/modifica.html"])} href="index.html">
    <span class="material-symbols-outlined">laundry
    </span>
    Playeras
   </a>

   <a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
    <span class="material-symbols-outlined">help</span>
    Ayuda
   </a>`

   
  }

}

customElements.define("nav-tab-fixed", NavTabFixed)