import {isNodeJS} from './node';
import {isDeno} from './deno';

/**
 * Checks if the current environment is a browser.
 * NOTE: The current implementation assumes that if the environment is not NodeJS or Deno then it must be a browser.
 */
export function isBrowser(): boolean {
    return !isNodeJS() && !isDeno();
}
