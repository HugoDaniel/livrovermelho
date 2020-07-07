import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Envio from './envio'

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

        <main className={className}>
          {children}
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
