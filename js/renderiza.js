import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * Renderiza una lista de playeras en un elemento HTML de lista.
 *
 * @param {HTMLUListElement} lista El elemento <ul> donde se renderizarán las playeras.
 * @param {import("./modelo/PLAYERA.js").PLAYERA[]} playeras Un array de objetos de playera.
 */
export function renderiza(lista, playeras) { // Cambiado 'pasatiempos' a 'playeras'
  let render = ""
  for (const modelo of playeras) { // Iterando sobre 'playeras'
    if (modelo.PLA_ID === undefined) // Cambiado PAS_ID a PLA_ID
      throw new Error(`Falta PLA_ID de ${modelo.PLA_NOMBRE}.`) // Cambiado PAS_ID y PAS_NOMBRE a PLA_ID y PLA_NOMBRE
    const nombre = htmlentities(modelo.PLA_NOMBRE) // Cambiado PAS_NOMBRE a PLA_NOMBRE
    const searchParams = new URLSearchParams([["id", modelo.PLA_ID]]) // Cambiado PAS_ID a PLA_ID
    const params = htmlentities(searchParams.toString())
    render += /* html */
      `<li>
        <p><a href="modifica.html?${params}">${nombre}</a></p>
      </li>`
  }
  lista.innerHTML = render
}

exportaAHtml(renderiza)
