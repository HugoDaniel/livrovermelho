import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const subscribe = async (e, onDone) => {
  e.preventDefault()
  const email = document.getElementById("subscribe").value
  let formData = new FormData()
  formData.append("EMAIL", email)
  await fetch(
    "https://livrovermelhodosmamiferos.us4.list-manage.com/subscribe/post?u=398877473ece87c4ae052fe77&amp;id=a8cbbbacbc",
    {
      method: "POST",
      mode: "no-cors",
      body: formData,
    }
  )
  onDone(true)
}

const Card = ({ image, children, alt, showTitle }) => (
  <div className="ph2">
    <p className={`vermelho f7 ${showTitle ? "o-100" : "o-0"}`}>{children}</p>
    <Img width={128} fixed={image} alt={alt} />
  </div>
)

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      beneficiario: file(relativePath: { eq: "beneficiario.png" }) {
        childImageSharp {
          fixed(width: 142, height: 63) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      parceiro: file(relativePath: { eq: "parceiro.png" }) {
        childImageSharp {
          fixed(width: 123, height: 63) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cofinanciamento1: file(relativePath: { eq: "cofinanciamento1.png" }) {
        childImageSharp {
          fixed(width: 118, height: 63) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cofinanciamento2: file(relativePath: { eq: "cofinanciamento2.png" }) {
        childImageSharp {
          fixed(width: 106, height: 63) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cofinanciamento3: file(relativePath: { eq: "cofinanciamento3.png" }) {
        childImageSharp {
          fixed(width: 104, height: 63) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      cofinanciamento4: file(relativePath: { eq: "cofinanciamento4.png" }) {
        childImageSharp {
          fixed(width: 125, height: 63) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className="flex flex-column w-100 justify-center">
      <div className="Newsletter w-100 h4 pa3 mb3">
        <h3 className="w-100 tc">
          {subscribed
            ? "Em breve entraremos em contacto consigo"
            : "Fique a par das novidades"}
        </h3>
        {!subscribed ? (
          <div className="flex justify-center">
            <input
              className="pa1 w5 br2 mr2 ba"
              type="email"
              id="subscribe"
              placeholder="newsletter@email.pt"
            />
            <div
              className="Button w4 br3 tc"
              onClick={e => subscribe(e, setSubscribed)}
            >
              Subscreva
            </div>
          </div>
        ) : null}
      </div>
      <footer className="flex flex-row-l flex-column h4-l bt b--vermelho justify-around pt2 items-center">
        <Card
          image={data.beneficiario.childImageSharp.fixed}
          alt=""
          showTitle={true}
        >
          Beneficiário
        </Card>
        <Card
          image={data.parceiro.childImageSharp.fixed}
          alt=""
          showTitle={true}
        >
          Parceiro
        </Card>
        <Card
          image={data.cofinanciamento1.childImageSharp.fixed}
          alt=""
          showTitle={true}
        >
          Cofinanciamento
        </Card>
        <Card
          image={data.cofinanciamento2.childImageSharp.fixed}
          alt=""
          showTitle={false}
        >
          Cofinanciamento
        </Card>
        <Card
          image={data.cofinanciamento3.childImageSharp.fixed}
          alt=""
          showTitle={false}
        >
          Cofinanciamento
        </Card>
        <Card
          image={data.cofinanciamento4.childImageSharp.fixed}
          alt=""
          showTitle={false}
        >
          Cofinanciamento
        </Card>
      </footer>
    </div>
  )
}

export default Footer
