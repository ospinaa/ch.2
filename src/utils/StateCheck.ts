
import type { AppState as State } from "../flux/Store.ts";

export function isStateValid(state: State): boolean {
    return state !== null && state !== undefined;
}

