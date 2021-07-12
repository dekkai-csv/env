import {isNodeJS} from './node';

/**
 * Checks if the current environment supports dynamic imports.
 * @internal
 */
function checkDynamicImport(): boolean {
    try {
        import(/* webpackIgnore: true */ `${null}`).catch(() => false);
        return true;
    } catch {
        return false;
    }
}

/**
 * Caches the result of a dynamic imports check.
 * @internal
 */
const kSupportsDynamicImport: boolean = checkDynamicImport();

/**
 * Returns a boolean that defines if the current environment supports dynamic imports.
 */
export function supportsDynamicImport(): boolean {
    return kSupportsDynamicImport;
}

/**
 * Type declaration for WebPack environments.
 * @internal
 */
// declare `__non_webpack_require__` for WebPack environments
// eslint-disable-next-line camelcase
declare const __non_webpack_require__: any;

// eslint-disable-next-line no-new-func
const requireFunc = new Function('mod', 'return require(mod)');

/**
 * Detects the environment and loads a module using either `require` or `import`.
 * @param mod - The name or path to the module to load.
 */
export async function loadModule(mod: string | URL): Promise<any> {
    if (kSupportsDynamicImport) {
        return await import(/* webpackIgnore: true */ mod.toString());
    } else if (isNodeJS()) {
        // return typeof module !== 'undefined' && typeof module.require === 'function' && module.require(mod.toString()) ||
        //     // eslint-disable-next-line camelcase
        //     typeof __non_webpack_require__ === 'function' && __non_webpack_require__(mod.toString()) ||
        //     typeof require === 'function' && require(mod.toString()); // eslint-disable-line
        return requireFunc(mod);
    }

    // not supported, a dynamic loader could be created for browser environments here, all modern browsers support
    // dynamic imports though so not implemented for now.
    throw 'ERROR: Can\'t load modules dynamically on this platform';
}
