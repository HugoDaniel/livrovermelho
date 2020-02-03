const path = require(`path`)
const { createRemoteFileNode } = require("gatsby-source-filesystem")

const getPageId = uri => `SitePage /${uri}`
const getPosts = (uri, posts) => {
  switch (uri.toLowerCase()) {
    case "novidades/":
      return posts
    case "pistas/":
      return posts.filter(p => p.categories.includes("Pistas"))
    default:
      return undefined
  }
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node &&
    node.context &&
    node.context.section &&
    node.context.section.imageUrl
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.context.section.imageUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id
    }
  }
}

const createPosts = ({ posts: { nodes } }) => {
  const getCategories = categories => categories.nodes.map(({ name }) => name)
  const nodeToPost = ({
    title,
    excerpt,
    uri,
    featuredImage,
    modifiedGmt,
    content,
    categories,
  }) => ({
    title,
    excerpt,
    uri,
    modifiedGmt,
    content,
    categories: getCategories(categories),
    imageUrl: featuredImage ? featuredImage.mediaItemUrl : undefined,
    imageWidth:
      featuredImage && featuredImage.mediaDetails
        ? featuredImage.mediaDetails.width
        : undefined,
    imageHeight:
      featuredImage && featuredImage.mediaDetails
        ? featuredImage.mediaDetails.height
        : undefined,
  })
  return nodes.map(nodeToPost)
}

const createSections = ({ pages: { nodes } }) => {
  const nodeToSection = ({
    id,
    pageId,
    title,
    uri,
    content,
    slug,
    featuredImage,
    childPages,
  }) => ({
    id,
    pageId,
    title,
    uri,
    content,
    slug,
    children:
      childPages && childPages.nodes
        ? childPages.nodes.map(child => getPageId(child.uri))
        : undefined,
    imageUrl: featuredImage ? featuredImage.mediaItemUrl : undefined,
    imageWidth:
      featuredImage && featuredImage.mediaDetails
        ? featuredImage.mediaDetails.width
        : undefined,
    imageHeight:
      featuredImage && featuredImage.mediaDetails
        ? featuredImage.mediaDetails.height
        : undefined,
  })
  let mainSections = nodes.map(nodeToSection)
  nodes.map(node => {
    if (node.childPages && node.childPages.nodes) {
      mainSections = mainSections.concat(
        node.childPages.nodes.map(nodeToSection)
      )
    }
  })
  return mainSections
}

const createMenu = ({ menus: { nodes } }, name = "Principal") => {
  const selected = nodes.find(n => n.name === name)
  if (!selected) return []
  return selected.menuItems.edges.map(
    ({
      node: {
        url,
        id,
        label,
        connectedObject: { uri },
      },
    }) => ({
      url,
      id,
      label,
      uri,
    })
  )
}

const createContext = result => {
  let menu = []
  let sections = []
  let posts = []
  if (result && result.menus && result.menus.nodes) {
    menu = createMenu(result)
  }
  if (result && result.pages && result.pages.nodes) {
    sections = createSections(result)
  }

  if (result && result.posts && result.posts.nodes) {
    posts = createPosts(result)
  }
  return {
    menu,
    sections,
    posts,
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      wpgraphql {
        posts {
          nodes {
            title
            excerpt
            uri
            featuredImage {
              slug
              uri
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            modifiedGmt
            content
            categories {
              nodes {
                name
              }
            }
          }
        }
        menus {
          nodes {
            name
            menuItems {
              edges {
                node {
                  label
                  url
                  id
                  connectedObject {
                    ... on WPGraphQL_Page {
                      uri
                    }
                  }
                }
              }
            }
          }
        }
        pages {
          nodes {
            id
            isFrontPage
            featuredImage {
              mediaItemUrl
              mediaDetails {
                height
                width
              }
            }
            title
            content
            pageId
            childPages {
              nodes {
                id
                menuOrder
                pageId
                title
                uri
                content
                slug
                featuredImage {
                  uri
                  slug
                  mediaItemUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
            }
            slug
            uri
            menuOrder
          }
        }
      }
    }
  `)
  // console.log(JSON.stringify(result, null, 4))
  const context = createContext(result.data.wpgraphql)
  // console.log(JSON.stringify(context, null, 4))
  // console.log(context.posts)

  ////////////////////
  // Build posts    //
  ////////////////////
  context.posts.map(post => {
    createPage({
      path: post.uri,
      component: path.resolve(`./src/templates/page/index.js`),
      context: {
        isPost: true,
        menu: context.menu,
        section: post,
        width: post.imageWidth,
        height: post.imageHeight,
        slug: getPageId(post.uri),
        subPages: [],
      },
    })
  })
  ////////////////////
  // Build sections //
  ////////////////////
  context.sections.forEach(section => {
    const posts = getPosts(section.uri, context.posts)
    const postIds = posts ? posts.map(p => getPageId(p.uri)) : []
    createPage({
      path: section.uri,
      component: path.resolve(`./src/templates/page/index.js`),
      context: {
        isPost: false,
        menu: context.menu,
        section,
        sectionMenu: createMenu(
          result.data.wpgraphql,
          section.uri.slice(0, -1)
        ),
        posts,
        width: section.imageWidth,
        height: section.imageHeight,
        slug: getPageId(section.uri),
        subPages: posts ? postIds : section.children || [],
      },
    })
  })
}
