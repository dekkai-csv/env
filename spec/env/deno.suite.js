/* global Deno */
/* global chai */
import '../../node_modules/mocha/mocha.js';
import '../../node_modules/chai/chai.js';

import {isDeno} from '../../src/deno.ts';
import {isNodeJS} from '../../build/lib/node.js';
import {WorkerWrapper} from 'https://unpkg.com/@dekkai/workers@1.1.1';
import {EventEmitter} from 'https://unpkg.com/@dekkai/event-emitter@1.0.1/src/EventEmitter.ts';

import specEnvCheck from '../envCheck.spec.js';
import specModuleLoader from '../moduleLoader.spec.js';

async function main() {
    // setup mocha
    mocha.setup({ui: 'bdd', reporter: 'spec'});
    mocha.checkLeaks();

    function onCompleted(failures) {
        if (failures > 0) {
            Deno.exit(1);
        } else {
            Deno.exit(0);
        }
    }

    // Browser based Mocha requires `window.location` to exist.
    window.location = new URL('http://localhost:0');

    // create the environment
    const env = {
        chai,
        platform: 'Deno',
        envNode: false,
        envDeno: true,
        envBrowser: false,
        modulePaths: {
            default: {
                path: `${Deno.cwd()}/build/dist/mod.js`,
            },
            'a local JS module from URL': {
                path: new URL('../../build/lib/node.js', import.meta.url),
                compare: { isNodeJS },
            },
            'a local TS module': {
                path: `${Deno.cwd()}/src/deno.ts`,
                compare: { isDeno },
            },
            'a local TS module from URL': {
                path: new URL('../../src/deno.ts', import.meta.url),
                compare: { isDeno },
            },
            'a remote JS module': {
                path: 'https://unpkg.com/@dekkai/workers@1.1.1',
                compare: { WorkerWrapper },
            },
            'a remote JS module from URL': {
                path: new URL('https://unpkg.com/@dekkai/workers@1.1.1'),
                compare: { WorkerWrapper },
            },
            'a remote TS module': {
                path: 'https://unpkg.com/@dekkai/event-emitter@1.0.1/src/EventEmitter.ts',
                compare: { EventEmitter },
            },
            'a remote TS module from URL': {
                path: new URL('https://unpkg.com/@dekkai/event-emitter@1.0.1/src/EventEmitter.ts'),
                compare: { EventEmitter },
            },
        },
    };

    // register tests
    await specEnvCheck(env);
    await specModuleLoader(env);

    // run tests
    mocha.color(true);
    mocha.run(onCompleted).globals(['onerror']);
}

main();
