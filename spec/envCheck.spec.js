import {isNodeJS, isDeno, isBrowser} from '../build/dist/mod.js';

async function run(env) {
    const {
        chai,
        platform,
        envNode,
        envDeno,
        envBrowser,
    } = env;

    describe(`${platform} env check`, function () {
        it(`isNodeJS should return ${envNode}`, function () {
            chai.expect(isNodeJS()).to.equal(envNode);
        });

        it(`isDeno should return ${envDeno}`, function () {
            chai.expect(isDeno()).to.equal(envDeno);
        });

        it(`isBrowser should return ${envBrowser}`, function () {
            chai.expect(isBrowser()).to.equal(envBrowser);
        });
    });
}

export default run;
