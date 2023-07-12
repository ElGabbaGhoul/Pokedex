import { writable, type Writable } from "svelte/store";
import type { IndexMonster } from "../routes/+page";

export const caughtMons: Writable<IndexMonster[]>= writable([])