export function stringToNodes(keyword, value) {
  const nodes = []
  // startsWith判断字符串是否以指定字符或子字符串开头。
  if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
    const key1 = keyword.slice(0, value.length)
    const node1 = {
      name: "span",
      attrs: { style: "color:#26ce8a;" },
      children: [{ type: "text", text: key1 }]
    }
    nodes.push(node1)
    const key2 = keyword.slice(value.length)
    const node2 = {
      name: "span",
      attrs: { style: "color:#000;" },
      children: [{ type: "text", text: key2 }]
    }
    nodes.push(node2)
  } else {
    const node = {
      name: "span",
      attrs: { style: "color:#000;" },
      children: [{ type: "text", text: keyword }]
    }
    nodes.push(node)
  }
  return nodes
}