import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Logo from "./logo.js"
import Hero from "./hero.js"
import VerticalLine from "./line.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const classStr =
  "hover-bg-vermelho ttu ph2 black hover-white pv3half no-underline"
const classSelected = classStr + " bg-vermelho white"

const hamburgerClassStr=
  "hover-bg-vermelho ttu ph5 black hover-white pv3half no-underline db"

const Header = ({ headline, menu, featuredImg, showTitle, siteTitle, imageTitle }) => {
  const [isMenuOpen, setMenu] = useState(true)
  useEffect(() => {
    setMenu(false)
  }, []);
  let curSlug = ""
  let selectedId
  try {
    curSlug = window.location.href.split("/")[3]
    if (curSlug && menu) {
      const urlEntry = menu.find(({ url }) =>
        url ? url.split("/")[3] === curSlug : null
      )
      if (urlEntry) {
        selectedId = urlEntry.id
      }
    }
  } catch (e) {
    selectedId = ""
  }
  return (
    <header className="">
      <nav className="bg-white w-100 h3 flex justify-between items-center sticky top-0 z-2">
        <Link to="/" className="ml5-l mt5-l ml0 mt5 relative" style={{ top: 6 }}>
          <Logo />
        </Link>
        <div className="mr5 dn db-l">
          {menu ? menu.map(({ url, id, label }) => (
            <Link
              key={id}
              to={`/${url.split("/")[3]}`}
              className={id === selectedId ? classSelected : classStr}
            >
              {label}
            </Link>
          )) : null}
        </div>
        <div className="pointer pa2 w2 dn-l db mr3"
          onClick={() => setMenu(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={ isMenuOpen ? faTimes : faBars} />
          { isMenuOpen ?
            <div className="fixed top3 bg-white db"
            style={{ right: "0rem", top: "4rem" }} >
              {menu ? menu.map(({ url, id, label }) => (
                <Link
                  key={id}
                  to={`/${url.split("/")[3]}`}
                  className={hamburgerClassStr}
                >
                  {label}
                </Link>
              )) : null}
            </div>
          : null
          }
        </div>
      </nav>
      <Hero
        fluid={
          featuredImg &&
          featuredImg.childImageSharp &&
          featuredImg.childImageSharp.fluid
            ? featuredImg.childImageSharp.fluid
            : undefined
        }
        title={ imageTitle }
      />
      <div className="flex items-center justify-center tc white bg-vermelho br-100 w4 h4 ph3 pv3 w-100-l h-100-l br4-l ph4-l pv3-l f6-l f7 pill z-1">
        {headline}
      </div>
      <VerticalLine />
      {showTitle ? (
        <h1 className="pa0 ma0 w-80 tc mauto">{siteTitle}</h1>
      ) : null}
    </header>
  )
}

export default Header
