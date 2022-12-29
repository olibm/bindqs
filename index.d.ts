import { Ref } from 'vue';
/** remove value from arrayRef */
export declare function popArrayRef<T>(arrayRef: Ref<T[]>, value: T): void;
/** add value to arrayRef if missing */
export declare function pushArrayRef<T>(arrayRef: Ref<T[]>, value: T): void;
/** pop/push value to/from arrayRef */
export declare function toggleArrayRef<T>(arrayRef: Ref<T[]>, value: T): void;
/** Get a synced ref stored in query string */
export declare function useQsPropString(key: string): import("vue").WritableComputedRef<string>;
/** Get a synced ref to string array stored in query string as sorted csv */
export declare function useQsPropStringArray(key: string | null | undefined): import("vue").WritableComputedRef<string[]>;
