const stat = nodes => {
  const cx = " Stat flex flex-column items-center justify-center tc"
  return nodes.map((n, i) => {
    if (
      n.type === "tag" &&
      n.attribs &&
      n.attribs.class === "wp-block-column"
    ) {
      n.attribs.class += cx
    }
    return n
  })
}
export const specieStat = nodes => {
  let done = false
  const cx = " w-100 h5 bg-black flex justify-around white"
  return nodes.map((n, i) => {
    if (
      !done &&
      n.type === "tag" &&
      n.attribs &&
      n.attribs.class === "wp-block-columns"
    ) {
      n.attribs.class += cx
      n.children = stat(n.children)
      done = true
    }
    return n
  })
}

export const twoColumns = nodes => {
  const cx = " w-100 flex justify-around pv2 flex-row-l flex-column"
  return nodes.map((n, i) => {
    if (
      n.type === "tag" &&
      n.attribs &&
      (n.attribs.class === "wp-block-columns alignfull" ||
        n.attribs.class === "wp-block-columns")
    ) {
      n.attribs.class += cx
    }
    return n
  })
}

export const contentTitle = nodes => {
  const h2cx = " mt0 w-100 tc ttu f2"
  const pcx = " mb1 f5 tc w6 center"
  return nodes.map((n, i) => {
    if (n.type === "tag") {
      switch (n.name) {
        case "h2":
          n.attribs.class += h2cx
          break
        case "p":
          n.attribs.class += pcx
          break
        default:
          break
      }
    }
    return n
  })
}
