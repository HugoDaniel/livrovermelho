let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})
console.log(`This WordPress Endpoint is used: '${process.env.WORDPRESS_URL}'`)
module.exports = {
  siteMetadata: {
    title: `Livro Vermelho dos Mamíferos de Portugal Continental`,
    description: `Este projeto pretende melhorar o conhecimento sobre todas as espécies de mamíferos de Portugal Continental. Queremos saber quais os animais que estão a perder terreno, quais os mais ameaçados e os que estão estáveis ou a prosperar..`,
    headline: `A trabalhar para saber como estão os nossos mamíferos`,
    author: `@wildermag`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        url:
        "https://admin.livrovermelhodosmamiferos.pt/index.php?graphql",
        //  "https://www.livrovermelhodosmamiferos.pt/wordpress/index.php?graphql",
        // "http://livrovermelho.local/index.php?graphql",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    /*
     {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "livrovermelho.local",
        protocol: "http",
        hostingWPCOM: false,
        useACF: false,
        perPage: 10,
        concurrentRequests: 20,
        verboseOutput: true,
      },
    },
    */
  ],
}
