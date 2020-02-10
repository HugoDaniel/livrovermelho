import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const getSitePage = (sitePages, uri) => {
  if (sitePages && sitePages.nodes) {
    const sitePage = sitePages.nodes.find(
      p =>
        p &&
        p.context &&
        p.context.section &&
        p.context.section.uri &&
        p.context.section.uri === uri
    )
    return sitePage
  }
  return null
}

const Menu = ({ allSitePage, sectionMenu }) => {
  let menu = sectionMenu
  if (!sectionMenu || sectionMenu.length === 0) {
    menu = allSitePage.nodes.map(p => ({
      label: p.context.section.title,
      uri: p.context.section.uri,
    }))
  }

  return (
    <div
      className="SectionsList mt5 w-100 flex-wrap-ns items-start-ns justify-center-ns flex-ns"
      style={{ flexBasis: "33%" }}
    >
      {menu.map(({ label, uri }, i) => {
        const page = getSitePage(allSitePage, uri)
        if (!page) return null
        return (
          <Link key={label + i} to={`/${uri}`} className="w-33-ns">
            <MenuItem label={label} image={page.featuredImg} />
          </Link>
        )
      })}
    </div>
  )
}

const MenuItem = ({ image, label }) => {
  return (
    <div className="ma2-ns link">
      <Img
        style={{ zIndex: -1 }}
        fluid={image.childImageSharp.fluid}
        className=""
      />
      <div className="bg-vermelho absolute br2 right-0 pr4 mt--200 static-ns pa0-ns ma0-ns br0-ns ph2-ns pv1-ns">
        <p className="white f4-ns f6 b ma0 ml4 mt3-ns mv2 ma0-ns">{label}</p>
        <p className="white dn db-ns f7 ml4 mv3 f6-ns ma0-ns mv2-ns">Saiba mais</p>
      </div>
    </div>
  )
}

export default Menu
