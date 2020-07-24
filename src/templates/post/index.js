import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Post = ({ pageContext }) => {
  const post = pageContext.post

  return (
    <Layout>
      <SEO title={post.title} />

      <h1> {post.title} </h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="social flex">
        <a href="https://www.facebook.com/Livro-Vermelho-dos-Mam%C3%ADferos-de-Portugal-Continental-101873134715572/">
          Facebook
        </a>
        <a href="https://twitter.com/LivroPortugal">
          Twitter
        </a>
        <a href="https://www.instagram.com/livrovermelhomamiferos/">
          Instagram
        </a>
      </div>
    </Layout>
  )
}

export default Post
