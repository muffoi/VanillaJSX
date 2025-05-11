# VanillaJSX
JSX runtime for vanilla (non-react) javascript environments


## Features
- Function components support (`({...params, children}) => JSX`)
- JSX fragment support with `<></>` syntax
- Attach event listeners with `on:<EVENT>` attributes (actually calls `element.addEventListener` under the hood)
- Pass inline CSS styles as objects (`<div style={{ backgroundColor: "#f00" }}>Hello, world!</div>`)
- Set `class` attribute with `className` as string (array classes not supported)
- Pass `Node`s, strings, booleans, numbers, `null` or `undefined` as element children (see [rendering of various data types](#rendering-of-various-data-types))
- Accepts children in arrays of any depth
- Extendable with `PropPlugins` inside `jsx-runtime.ts` (see [building from source](#building-from-source))
- All this with full type support


## Using in your projects
Download following files from [releases](https://github.com/muffoi/VanillaJSX/releases):
- `jsx-runtime.js`,
- `jsx.d.ts`

Add the following to your `tsconfig.json`,

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "JSXRuntime.factory",
    "jsxFragmentFactory": "JSXRuntime.fragment"
  }
}
```

import `JSXRuntime` from your local copy of `jsx-runtime.js` to global scope,

```js
import { JSXRuntime } from "./jsx-runtime.js";
window/* or global */.JSXRuntime = JSXRuntime;
```

and include `jsx.d.ts` in your `tsconfig.json`.

---

## Exports of `jsx-runtime.js`
- `JSXRuntime.factory(tagName, properties [, children])` - JSX factory function
- `JSXRuntime.fragment({ children })` - Component function for JSX fragments
- **!DEPRECATED!** `JSXRuntime.fragmentFactory({ children })` - Old name for `JSXRuntime.fragment`
- `JSXRuntime.buildChildren(children)` - Utility function for transforming `props.children` in components to a flat array that can be appended directly by `HTMLElement.append`
- `JSXRuntime.flatten(children)` - Utility function for flattening `props.children` in components

## Rendering of various data types
VanillaJSX runtime allows passing any data as children to elements in JSX. Here's how:
1. If data is a `Node` or string, pass as it is,
2. If data is a boolean, `null` or `undefined`, remove,
3. If data is anything else, convert to sting by calling `data.toString()`.

---

## Building from source
Prerequisites:
- [Node.js 22](https://nodejs.org/en/download) or newer installed (possible untested compatibility with older versions, but ES6 required)
- NPM installed (installs together with Node.js)

To clone and install this repo, run:
```sh
git clone https://github.com/muffoi/VanillaJSX.git
cd VanillaJSX
npm install
```

Building with the following scripts will compile `jsx-runtime.ts` to root directory and tests to `./test/out`.
```sh
# Build only jsx-runtime.ts
npm run build

# Build tests and jsx-runtime.ts
npm run build:test
```
