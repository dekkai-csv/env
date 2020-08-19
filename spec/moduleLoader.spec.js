import {loadModule, isBrowser, isDeno, isNodeJS} from '../build/dist/mod.js';

async function run(env) {
    const {
        chai,
        modulePaths,
    } = env;

    describe('Module loader', function() {
        it('can load a JS module at runtime', async function() {
            const module = await loadModule(modulePaths.default.path);
            chai.expect(module.loadModule.toString()).to.equal(loadModule.toString());
            chai.expect(module.isBrowser.toString()).to.equal(isBrowser.toString());
            chai.expect(module.isDeno.toString()).to.equal(isDeno.toString());
            chai.expect(module.isNodeJS.toString()).to.equal(isNodeJS.toString());
        });

        const keys = Object.keys(modulePaths);
        for (let i = 0, n = keys.length; i < n; ++i) {
            if (keys[i] !== 'default') {
                const key = keys[i];
                const modInfo = modulePaths[key];
                it(`can load ${keys[i]} at runtime`, async function() {
                    const module = await loadModule(modInfo.path);
                    const compareKeys = Object.keys(modInfo.compare);
                    for (let ii = 0, nn = compareKeys.length; ii < nn; ++ii) {
                        chai.expect(modInfo.compare[compareKeys[ii]].toString()).to.equal(module[compareKeys[ii]].toString());
                    }
                });
            }
        }
    });
}

export default run;
