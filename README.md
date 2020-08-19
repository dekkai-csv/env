<div align="center">

![@dekkai/env](https://raw.githubusercontent.com/dekkai-data/assets/master/svg/dekkai_env_banner_light.svg)  
![browser](https://github.com/dekkai-data/env/workflows/browser/badge.svg)
![node](https://github.com/dekkai-data/env/workflows/node/badge.svg)
![deno](https://github.com/dekkai-data/env/workflows/deno/badge.svg)
![opinion](https://img.shields.io/badge/badges_are-meaningless-blue)

</div>

# @dekkai/env

Utility methods to detect runtimes and load modules dynamically.

Check out the full [API Documentation](https://dekkai-data.github.io/env/)

## Installation

**Browser/NodeJS**
```shell script
$ yarn add @dekkai/env
```

**Deno**
```javascript
// import from directly from a CDN, like unpkg.com
import {isDeno, isBrowser, isNodeJS, loadModule} from 'https://unpkg.com/@dekkai/env';
```

## Usage

```javascript
// import the desired methods
import {isDeno, isBrowser, isNodeJS, loadModule} from '@dekkai/env';

// test for deno
const deno = isDeno();

// test for node
const node = isNodeJS();

// test for browser
const browser = isBrowser();

// import a module at runtime, this is generally the same as calling `await import(module)` but it is safe for all 
// platforms and should be able to survive bundlers, also wraps `require` for node environments where needed.
// The main advantage is to import modules needed for a specific platform at runtime, think importing `fs` for node
// at runtime but still being able to compile for all platforms.
let fs;
if (node) {
    fs = await loadModule('fs');
} else if (deno) {
    fs = await loadModule('https://deno.land/std/fs/mod.ts');
} else {
    fs = await loadModule('https://unpkg.com/browserfs');
}
// ...
```

Check out the full [API Documentation](https://dekkai-data.github.io/env/)
