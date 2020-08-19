import chai from 'chai';
import path from 'path';
import url from 'url';

import specEnvCheck from '../envCheck.spec.js';
import specModuleLoader from '../moduleLoader.spec.js';

import {isNodeJS} from '../../build/lib/node.js';

async function main() {
    const env = {
        chai,
        platform: 'NodeJS',
        envNode: true,
        envDeno: false,
        envBrowser: false,
        modulePaths: {
            default: {
                path: path.resolve(path.dirname(''), 'build/dist/mod.js'),
            },
            'a local JS module from URL': {
                path: url.pathToFileURL(path.resolve(path.dirname(''), 'build/lib/node.js')),
                compare: { isNodeJS },
            },
            'a built-in module': {
                path: 'path',
                compare: { resolve: path.resolve },
            },
        },
    };

    await specEnvCheck(env);
    await specModuleLoader(env);
}

main();
