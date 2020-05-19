import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Hero = ({ fluid }) => {
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
    <Img
      style={{ zIndex: -1 }}
      fluid={fluid ? fluid : data.placeholderImage.childImageSharp.fluid}
    />
  )
}

export default Hero
