/* global chai */
import specEnvCheck from '../envCheck.spec.js';
import specModuleLoader from '../moduleLoader.spec.js';

import {isNodeJS} from '../../build/dist/mod.js';
import {WorkerWrapper} from 'https://unpkg.com/@dekkai/workers@1.1.1';

async function main() {
    const env = {
        chai,
        platform: 'Browser',
        envNode: false,
        envDeno: false,
        envBrowser: true,
        modulePaths: {
            default: {
                path: '/base/build/dist/mod.js',
            },
            'a JS module from URL': {
                path: new URL('/base/build/dist/mod.js', window.location.href),
                compare: { isNodeJS },
            },
            'a cross-origin JS module': {
                path: 'https://unpkg.com/@dekkai/workers@1.1.1',
                compare: { WorkerWrapper },
            },
            'a cross-origin JS module from URL': {
                path: new URL('https://unpkg.com/@dekkai/workers@1.1.1'),
                compare: { WorkerWrapper },
            },
        },
    };

    await specEnvCheck(env);
    await specModuleLoader(env);
}

main();
