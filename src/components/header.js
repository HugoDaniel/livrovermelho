import { Link } from "gatsby"
import React from "react"
import Logo from "./logo.js"
import Hero from "./hero.js"
import VerticalLine from "./line.js"

const classStr =
  "hover-bg-vermelho ttu ph2 black hover-white pv3half no-underline"
const classSelected = classStr + " bg-vermelho white"

const Header = ({ headline, menu, featuredImg, showTitle, siteTitle }) => {
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
        <Link to="/" className="ml5 mt5">
          <Logo />
        </Link>
        <div className="mr5">
          {menu.map(({ url, id, label }) => (
            <Link
              key={id}
              to={`/${url.split("/")[3]}`}
              className={id === selectedId ? classSelected : classStr}
            >
              {label}
            </Link>
          ))}
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
      />
      <div className="tc white bg-vermelho br4 ph4 pv3 f6 pill z-1">
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
