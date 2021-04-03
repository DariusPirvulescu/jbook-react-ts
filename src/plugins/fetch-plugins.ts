import * as esbuild from 'esbuild-wasm'
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'whateverNameIWant',
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
    build.onLoad({ filter: /.*/ }, async (args: any) => {
      console.log('onLoad', args);
    
      if (args.path === 'index.js') {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      }
    
      // // check with localForage to see if we already fetched this file
      // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
      //   args.path
      // );
      
      // // if cached, return it 
      // if (cachedResult) {
      //   return cachedResult;
      // }
    
      // if not, make the request and store the response in IndexedDB, then return the response
      const { data, request } = await axios.get(args.path);

      const loader = args.path.match(/.css$/) ? 'css' : 'jsx'

      const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'")

      const contents = loader === 'css' 
          ? `
            const style = document.createElement('style')
            style.innerText = '${escaped}'

            document.head.appendChild(style) 
          `
          : data

      const result: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents,
        resolveDir: new URL('./', request.responseURL).pathname,
      };
      await fileCache.setItem(args.path, result);
    
      return result;
    });
    }
  }
} 


