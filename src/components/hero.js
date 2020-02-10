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

  return (
    <div>
    <Img
      style={{ zIndex: -1 }}
      fluid={fluid ? fluid : data.placeholderImage.childImageSharp.fluid}
      title={title}
    />
    <p className="white bg-black f7 absolute" style={{ marginTop: "-2rem" }}>{title}</p>
    </div>
  )
}

export default Hero
