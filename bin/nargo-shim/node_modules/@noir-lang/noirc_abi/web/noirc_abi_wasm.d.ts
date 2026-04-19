/* tslint:disable */
/* eslint-disable */

export type ABIError = Error;



import { Field, InputValue, InputMap, Visibility, Sign, AbiType, AbiParameter, Abi, WitnessMap, RawAssertionPayload } from "@noir-lang/types";
export { Field, InputValue, InputMap, Visibility, Sign, AbiType, AbiParameter, Abi, WitnessMap, RawAssertionPayload } from "@noir-lang/types";



export function abiDecode(abi: Abi, witness_map: WitnessMap): any;

export function abiDecodeError(abi: Abi, raw_error: RawAssertionPayload): any;

export function abiEncode(abi: Abi, inputs: InputMap, return_value?: InputValue | null): WitnessMap;

export function serializeWitness(witness_map: WitnessMap): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly abiEncode: (a: any, b: any, c: number) => [number, number, number];
    readonly abiDecode: (a: any, b: any) => [number, number, number];
    readonly serializeWitness: (a: any) => [number, number, number, number];
    readonly abiDecodeError: (a: any, b: any) => [number, number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h7270c8092a2ce551: (a: number, b: number, c: any, d: any) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
