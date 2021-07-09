import { useEffect } from "react";
import CodeEditor from "./code-editor"
import Preview from "./preview";
import Resizable from './resizable'
import { Cell } from "../state/cell";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import './code-cell.css'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {

  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells
    const orderedCells = order.map(id => data[id])

    const joinedCode = [
      `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        const show = (val) => { 
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
    ]
    for (let c of orderedCells) {
      if (c.type === 'code') { joinedCode.push(c.content) }
      if (c.id === cell.id) { break }
    }

    return joinedCode
  })

  const { updateCell, createBundle } = useActions()

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);
  
  return  (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell
