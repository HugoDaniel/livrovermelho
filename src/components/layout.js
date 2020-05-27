import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

const Layout = ({
  className,
  menu,
  featuredImg,
  imageTitle,
  isPost,
  children,
  siteTitle,
}) => {
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
