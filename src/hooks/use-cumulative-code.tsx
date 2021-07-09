import { useTypedSelector } from "./use-typed-selector"

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells
    const orderedCells = order.map(id => data[id])

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (val) => { 
        if (typeof val === 'object') {
          if (val.$$typeof && val.props) {
            _ReactDOM.render(val, root);
          } else {
            document.querySelector('#root').innerHTML = JSON.stringify(val)
          }
        } else {
          document.querySelector('#root').innerHTML = val
        }
      }
    `
    const showFuncNoop = `var show = () => {}`
    const joinedCode = []
    for (let c of orderedCells) {
      if (c.type === 'code') { 
        if (c.id === cellId) {
          joinedCode.push(showFunc)
        } else {
          joinedCode.push(showFuncNoop)
        }
        joinedCode.push(c.content) 
      }
      if (c.id === cellId) { break }
    }

    return joinedCode
  }).join('\n')
}