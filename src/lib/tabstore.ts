import { writable, type derived, type Writable } from "svelte/store";

class TabStore {
    constructor(
        public tab: Writable<number> = writable(0)
    ) {}

}

export const tabStore = new TabStore();