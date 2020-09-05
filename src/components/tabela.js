import React, { useState, useEffect } from "react"

const TabelaEspecies = (props) => {
  const [isLoading, setLoading] = useState(typeof Image !== 'undefined')
  const [tabela, setTabela] = useState("")
  const imgClass = "dim"
  let img = "";
  const location = typeof window !== 'undefined' ? window.location.hash : '';

  switch(location) {
    case '#lebrescoelhos':
      img = "https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/wilder-Lebres-e-coelhos.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#roedores':
      img = "https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/wilder-roedores.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#morcegos':
      img = "https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/wilder-morcegos_22JUL-scaled.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#baleiasgolfinhos':
      img = "https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/wilder-Baleias-golfinhos-scaled.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#carnivorosfocas':
      img = "https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/wilder-carnivoros-e-focas.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    default:
      img = "https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/wilder-insectivoros.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
  }

  if (isLoading && typeof Image !== 'undefined') {
    const image = new Image()
    image.onload = () => setLoading(false)
    image.src = tabela;
  }
  return (
    <div className={props.className}>
      <nav className="tabela-menu">
        <a className={`${location === "#insectivoros" || location === "" ? "selected" : ""}`} c href="#insectivoros"><img className={imgClass} src="https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/ourico.png" alt="Insectivoros" /></a>
        <a className={`${location === "#lebrescoelhos" ? "selected" : ""}`} href="#lebrescoelhos"><img className={imgClass} src="https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/lebre.png" alt="Lebres e Coelhos" /></a>
        <a className={`${location === "#roedores" ? "selected" : ""}`} href="#roedores"><img className={imgClass} src="https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/esquilo.png" alt="Roedores" /></a>
        <a className={`${location === "#morcegos" ? "selected" : ""}`} href="#morcegos"><img className={imgClass} src="https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/morcego-e1595613663194.png" alt="Morcegos" /></a>
        <a className={`${location === "#baleiasgolfinhos" ? "selected" : ""}`} href="#baleiasgolfinhos"><img className={imgClass} src="https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/baleia.png" alt="Baleias, Golfinhos" /></a>
        <a className={`${location === "#carnivorosfocas" ? "selected" : ""}`} href="#carnivorosfocas"><img className={imgClass} src="https://admin.livrovermelhodosmamiferos.pt/wp-content/uploads/2020/07/lobo-e1595613631500.png" alt="Carnívoros, Focas" /></a>
      </nav>
      <img className={`${isLoading ? "tabela-loading" : ""}`} src={tabela} alt="Tabela dos estatutos" />
    </div>
  )
}

export default TabelaEspecies;
