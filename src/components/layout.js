import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

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
  useEffect(() => {
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
        <main className={className}>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
