/**
 * Declares the `Deno` variable for typescript without needing to import all of the deon types.
 * @internal
 */
declare const Deno: any;

/**
 * Caches the result of a  NodeJS environment check.
 * @internal
 */
const kIsDeno = Boolean(typeof Deno !== 'undefined');

/**
 * Checks if the current environment is Deno.
 */
export function isDeno(): boolean {
    return kIsDeno;
}
