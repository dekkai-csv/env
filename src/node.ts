/**
 * Caches the result of a  NodeJS environment check.
 * @internal
 */
const kIsNodeJS: boolean = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

/**
 * Checks if the current environment is NodeJS.
 */
export function isNodeJS(): boolean {
    return kIsNodeJS;
}
