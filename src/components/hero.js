import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Hero = ({ fluid, title }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "fundo.png" }) {
        childImageSharp {
          fluid(maxWidth: 1025, maxHeight: 513) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  const t = title && title.length > 0 && title[0] === '<' ? title.slice(3, title.lastIndexOf('<')) : title;
  return (
    <div>
    <Img
      style={{ zIndex: -1 }}
      fluid={fluid ? fluid : data.placeholderImage.childImageSharp.fluid}
      title={t}
    />
    <p className="white bg-black f7 absolute" style={{ marginTop: "-5%", maxWidth: "96px" }}>{t}</p>
    </div>
  )
}

export default Hero
