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
  const cx = " Stats w-100 mv3 mv0-l h5-l bg-black flex justify-around-l justify-center items-center white pv3 flex-column flex-row-l"
  return nodes.map((n, i) => {
    const processIt = !done &&
      n.type === "tag" &&
      n.attribs &&
      n.attribs.class === "wp-block-columns"
    if (processIt) {
      n.attribs.class += cx
      n.children = stat(n.children)
      done = true
    }
    return n
  })
}

export const twoColumns = (nodes, hasStats) => {
  const cx = " TwoColumns w-100 flex justify-around pv2 flex-row-l flex-column"
  let isFirst = true;
  return nodes.map((n, i) => {
    const hasTwoColumns = n.type === "tag" && n.attribs && (n.attribs.class === "wp-block-columns alignfull" || n.attribs.class === "wp-block-columns")
    if (hasTwoColumns) {
      if (hasStats && !isFirst) n.attribs.class += cx
      else if(!hasStats && isFirst) n.attribs.class += cx
      if (isFirst) isFirst = false;
    }
    return n
  })
}

export const contentTitle = nodes => {
  const h2cx = " mt0 w-100 tc ttu f2"
  const pcx = " mb1 f6 f5-l tc w6-ns w5 center"
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
