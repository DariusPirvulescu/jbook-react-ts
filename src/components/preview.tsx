import { useRef, useEffect } from 'react'
import './preview.css'

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
    <head>
      <style> html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root')
          root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>'
          console.log(err)
        }

        window.addEventListener('error', (event) => {
          event.preventDefault()
          handleError(event.error)
        })


        window.addEventListener('message', (event) => {
          // console.log(event.data)
          try {
            eval(event.data)
          } catch (err) {
            handleError(err)
          }
        }, false)
      </script>
    </body>
    </html>
  `

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  return <div className="preview-wrapper">
    <iframe title="iframe code preview" ref={iframeRef}
            sandbox="allow-scripts" srcDoc={html}/>
    {err && <div className="preview-error">{err}</div>}
  </div>
}

export default Preview