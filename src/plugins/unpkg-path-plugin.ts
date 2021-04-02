import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import * as localForage from 'localforage';

// initiating the localforage IndexedDB database
const fileCache = localForage.createInstance({
  name: 'whateverNameIWant'
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react';
              console.log(React, useState);
            `,
          };
        }

        // check with localForage to see if we already fetched this file
        const cachedResult = localForage.getItem(args.path)

        // if cached, return it 
        if (cachedResult) {
          return cachedResult
        }

        const { data, request } = await axios.get(args.path);

        // store response in cache
        const result = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        localForage.setItem(args.path, result)

        return result
      });
    },
  };
};