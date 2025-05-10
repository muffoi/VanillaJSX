# VanillaJSX
JSX runtime for vanilla (non-react) javascript environments

## Features
- Function components support (`({...params, children}) => JSX`)
- Attach event listeners with `on:<EVENT>` attributes (actually calls `element.addEventListener` under the hood)
- Pass inline CSS styles as objects (`<div style={{ backgroundColor: "#f00" }}>Hello, world!</div>`)
- Set `class` attribute with `className` as string (array classes not supported)
- Extendable with `PropPlugins` inside `jsx-runtime.ts` (see [building from source](#building-from-source))
- All this with full type support

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
    "jsxFragmentFactory": "JSXRuntime.fragmentFactory"
  }
}
```

import `JSXRuntime` from your local copy of `jsx-runtime.js` to global scope,

```js
import { JSXRuntime } from "./jsx-runtime.js";
window/* or global */.JSXRuntime = JSXRuntime;
```

and include `jsx.d.ts` in your `tsconfig.json`.
