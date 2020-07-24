import React, { useState, useEffect } from "react"

const TabelaEspecies = (props) => {
  const [isLoading, setLoading] = useState(true)
  const [tabela, setTabela] = useState("")
  const imgClass = "dim"
  let img = "";

  switch(window.location.hash) {
    case '#lebrescoelhos':
      img = "https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/wilder-Lebres-e-coelhos.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#roedores':
      img = "https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/wilder-roedores.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#morcegos':
      img = "https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/wilder-morcegos_22JUL-scaled.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#baleiasgolfinhos':
      img = "https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/wilder-Baleias-golfinhos-scaled.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    case '#carnivorosfocas':
      img = "https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/wilder-carnivoros-e-focas.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
    break;
    default:
      img = "https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/wilder-insectivoros.jpg"
      if(tabela !== img) {
        setTabela(img)
        setLoading(true)
      }
  }
  console.log('IS LOADING', isLoading)
  if (isLoading) {
    const image = new Image()
    image.onload = () => setLoading(false)
    image.src = tabela;
  }
  return (
    <div className={props.className}>
      <nav className="tabela-menu">
        <a className={`${window.location.hash === "#insectivoros" || window.location.hash === "" ? "selected" : ""}`} c href="#insectivoros"><img className={imgClass} src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/ourico.png" alt="Insectivoros" /></a>
        <a className={`${window.location.hash === "#lebrescoelhos" ? "selected" : ""}`} href="#lebrescoelhos"><img className={imgClass} src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/lebre.png" alt="Lebres e Coelhos" /></a>
        <a className={`${window.location.hash === "#roedores" ? "selected" : ""}`} href="#roedores"><img className={imgClass} src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/esquilo.png" alt="Roedores" /></a>
        <a className={`${window.location.hash === "#morcegos" ? "selected" : ""}`} href="#morcegos"><img className={imgClass} src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/morcego.png" alt="Morcegos" /></a>
        <a className={`${window.location.hash === "#baleiasgolfinhos" ? "selected" : ""}`} href="#baleiasgolfinhos"><img className={imgClass} src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/baleia.png" alt="Baleias, Golfinhos" /></a>
        <a className={`${window.location.hash === "#carnivorosfocas" ? "selected" : ""}`} href="#carnivorosfocas"><img className={imgClass} src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/lobo.png" alt="Carnívoros, Focas" /></a>
      </nav>
      <img className={`${isLoading ? "tabela-loading" : ""}`} src={tabela} alt="Tabela dos estatutos" />
    </div>
  )
}

export default TabelaEspecies;
