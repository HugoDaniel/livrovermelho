import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Envio from './envio'
import Tabela from './tabela'

import Header from "./header"
import Footer from "./footer"

const click = (e) => {
  e.target.classList.toggle('accordion-open')
};

const Layout = ({
  className,
  menu,
  featuredImg,
  imageTitle,
  isPost,
  children,
  siteTitle,
}) => {
  const [displayForm, setDisplayForm] = useState(false)
  useEffect(() => {
    const form = document.getElementsByClassName('participe-formulario').length > 0
    if (form !== displayForm) {
      setDisplayForm(form)
    }
    var accordions = document.getElementsByClassName('accordion')
    for(const acc of accordions) {
      acc.addEventListener('click', click)
    }
    return () => {
    for(const acc of accordions) {
      acc.removeEventListener('click', click)
    }
    }
  });
  return (
    <>
      <Header
        headline="A trabalhar para saber como estão os nossos mamíferos"
        siteTitle={siteTitle}
        menu={menu}
        featuredImg={featuredImg}
        showTitle={isPost}
        imageTitle={imageTitle}
      />
      <div>

        <main className={`${className} ${isPost ? 'isPost' : '' }`}>
          {children}
    { window.location.pathname.includes("quando-e-que-tudo-vai-acontecer") ? <Tabela className="Tabela wp-block-group pt0 dark-gray lh-copy measure-m mw8 center pa4 ph6-l" /> : null }
      { isPost ?
      <div className="social flex items-center justify-center">
        <a href="https://www.facebook.com/Livro-Vermelho-dos-Mam%C3%ADferos-de-Portugal-Continental-101873134715572/" target="_blank">
          <img className="w2 h2 pa3" src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/facebook.png" alt="facebook" />
        </a>
        <a href="https://twitter.com/LivroPortugal" target="_blank">
          <img className="w2 h2 pa3" src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/twitter.png" alt="twitter" />
        </a>
        <a href="https://www.instagram.com/livrovermelhomamiferos/" target="_blank">
          <img className="w2 h2 pa3" src="https://www.livrovermelhodosmamiferos.pt/wordpress/wp-content/uploads/2020/07/instagram.png" alt="instagram" />
        </a>
      </div> : null }
        </main>
      { displayForm ?
      <div className="flex w-100 items-center justify-center">
        <Envio className="mb5 w6 bg-white br2 flex flex-column items-start justify-start ba" />
      </div> : null }
      </div>

      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
