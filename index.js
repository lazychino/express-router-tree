'use strict'

const archy = require('archy')

const routeRegExpParser = /^\/\^\\(\/[A-Za-z0-9:_\-]*)+(\\\/)?\?\(\?\=\\\/\|\$\)\/i$/

function getMethodString(methods) {
  return Object.keys(methods).map((name) => name.toUpperCase())
}

function routerTree(stack) {
  return stack.map((layer) => {

    if (layer.name === 'router') {
      return {
        label: layer.regexp.toString().replace(routeRegExpParser, '$1'),
        nodes: routerTree(layer.handle.stack)
      }

    } else if (layer.route) {
      return `${getMethodString(layer.route.methods)} ${layer.route.path}`

    } else {
      return layer.name
    }
  })
}

function expressRouterTree(rootName, routerStack) {

  const tree = {
    label: rootName,
    nodes: routerTree(routerStack)
  }

  console.log(archy(tree))
}

module.exports = expressRouterTree;
