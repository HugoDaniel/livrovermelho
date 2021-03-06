import React, { useState } from "react"
import ReactHtmlParser from "react-html-parser"
import { graphql } from "gatsby"
import { contentTitle, twoColumns, specieStat } from "../../scripts/processors"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ImagesMenu from "../../components/menu"
import Modal from "../../components/modal"


const isHomePage = uri => console.log(uri)

const hasTwoColumns = uri => {
  const sectionPaths = uri.split("/")
  const pathIs = p => sectionPaths[0] === p
  return (sectionPaths.length > 2 && pathIs("mamiferos")) || pathIs("colabore")
}
const hasStats = uri => {
  const sectionPaths = uri.split("/")
  const isStat = sectionPaths.length > 2 && sectionPaths[0] === "mamiferos"
  return isStat;
}
const hasTable = uri => {
  return uri.includes("quando-e-que-tudo-vai-acontecer")
}


const nodeProcessor = pageContext => nodes => {
  let processed = nodes
  if (pageContext.isPost) return twoColumns(processed)
  if (hasTwoColumns(pageContext.section.uri)) {
    processed = twoColumns(processed, hasStats(pageContext.section.uri))
  }
  if (hasStats(pageContext.section.uri)) {
    processed = specieStat(processed)
  } else {
    processed = contentTitle(processed)
  }
  return processed
}

const Page = ({ pageContext, data }) => {
  const [showModal, setModal] = useState(false)
  const menu = pageContext.menu
  const section = pageContext.section
  const html = ReactHtmlParser(section.content, {
    preprocessNodes: nodeProcessor(pageContext),
  })
  const showPhotoModal = e => {
    if (
      e.target.classList.contains("wp-block-button__link") &&
      e.target.parentNode.classList.contains("modal")
    ) {
      e.preventDefault()
      setModal(true)
    }
  }
  const withStats = hasStats(pageContext.section.uri)
  const withTable = hasTable(pageContext.section.uri)
  const inHomePage = pageContext.section.uri === "projeto/"
  return (
    <Layout
      isPost={pageContext.isPost}
      hasTable={withTable}
      siteTitle={pageContext.section.title}
      menu={menu}
      imageTitle={pageContext.section.imageTitle}
      featuredImg={
        data && data.sitePage && data.sitePage.featuredImg
          ? data.sitePage.featuredImg
          : undefined
      }
    >
      <SEO title={section.title} />
      <div onClick={showPhotoModal} className={`Content pt0 dark-gray lh-copy measure-m mw8 center pa4 ph6-l ${withStats ? 'withStats' : ''}`}>
        {html}
      </div>
      {showModal ? <Modal onExit={e => setModal(false)} /> : null}
      {inHomePage ? 
      <div style={ { textAlign: "center"} }>
        <iframe className="mw-90"width="560" height="315" src="https://www.youtube.com/embed/G661aiEec5g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div> : null }
      <ImagesMenu
        allSitePage={data.allSitePage}
        sectionMenu={pageContext.sectionMenu}
      />
    </Layout>
  )
}

export const query = graphql`
  query PageQuery(
    $slug: String
    $width: Int
    $height: Int
    $subPages: [String!]!
  ) {
    sitePage(id: { eq: $slug }) {
      featuredImg {
        childImageSharp {
          fluid(maxWidth: $width, maxHeight: $height) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
    allSitePage(filter: { id: { in: $subPages } }) {
      nodes {
        context {
          section {
            imageTitle
            title
            uri
          }
        }
        featuredImg {
          childImageSharp {
            fluid(maxWidth: $width, maxHeight: $height, cropFocus: NORTH) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Page
