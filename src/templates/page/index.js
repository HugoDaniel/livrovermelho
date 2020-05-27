import React, { useState } from "react"
import ReactHtmlParser from "react-html-parser"
import { graphql } from "gatsby"
import { contentTitle, twoColumns, specieStat } from "../../scripts/processors"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import ImagesMenu from "../../components/menu"
import Modal from "../../components/modal"

const hasTwoColumns = uri => {
  const sectionPaths = uri.split("/")
  const pathIs = p => sectionPaths[0] === p
  return (sectionPaths.length > 2 && pathIs("mamiferos")) || pathIs("colabore")
}
const hasStats = uri => {
  const sectionPaths = uri.split("/")
  return sectionPaths.length > 2 && sectionPaths[0] === "mamiferos"
}

const nodeProcessor = pageContext => nodes => {
  let processed = nodes
  if (pageContext.isPost) return twoColumns(processed)
  if (hasTwoColumns(pageContext.section.uri)) {
    processed = twoColumns(processed)
  }
  if (hasStats(pageContext.section.uri)) {
    console.log('HAS STATS');
    processed = specieStat(processed)
  } else {
    console.log('NO STATS');
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
  console.log('PAGE CONTEXT', pageContext)
  const showPhotoModal = e => {
    if (
      e.target.classList.contains("wp-block-button__link") &&
      e.target.parentNode.classList.contains("modal")
    ) {
      e.preventDefault()
      setModal(true)
    }
  }
  return (
    <Layout
      isPost={pageContext.isPost}
      siteTitle={pageContext.section.title}
      menu={menu}
      featuredImg={
        data && data.sitePage && data.sitePage.featuredImg
          ? data.sitePage.featuredImg
          : undefined
      }
    >
      <SEO title={section.title} />
      <div onClick={showPhotoModal} className="ph5">
        {html}
      </div>
      {showModal ? <Modal onExit={e => setModal(false)} /> : null}
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
            title
            imageTitle
            uri
          }
        }
        featuredImg {
          childImageSharp {
            fluid(maxWidth: $width, maxHeight: $height) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default Page
