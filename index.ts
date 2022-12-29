import { computed, ref, watch, Ref } from 'vue';
import { useRouter } from 'vue-router';

/** remove value from arrayRef */
export function popArrayRef<T>(arrayRef: Ref<T[]>, value: T) {
    arrayRef.value = arrayRef.value.filter((x: T) => x !== value);
}

/** add value to arrayRef if missing */
export function pushArrayRef<T>(arrayRef: Ref<T[]>, value: T) {
    if (!arrayRef.value.includes(value)) {
        arrayRef.value = [...arrayRef.value, value].sort();
    }
}

/** pop/push value to/from arrayRef */
export function toggleArrayRef<T>(arrayRef: Ref<T[]>, value: T) {
    if (arrayRef.value.includes(value)) {
        popArrayRef(arrayRef, value);
    } else {
        pushArrayRef(arrayRef, value);
    }
}

/** Get a synced ref stored in query string */
export function useQsPropString(key: string) {
    const router = useRouter();
    const { currentRoute } = router;
    const fixQsVal = (v: unknown) => (v?.toString() || '') as string;
    const qsval = ref('');

    // Keep qsvval in sync (querystring -> qsval)
    watch(() => currentRoute.value.query[key], (qsv: any) => {
        qsval.value = fixQsVal(qsv);
    }, { immediate: true });

    // Keep route in sync (qsval -> querystring)
    watch(qsval, (qsv: string) => {
        const cur = fixQsVal(currentRoute.value.query[key]);
        qsv = fixQsVal(qsv);
        if (qsv !== cur) {
            router.replace({
                query: {
                    ...currentRoute.value.query,
                    [key]: qsv,
                },
            });
        }
    });

    const output = computed({
        get: () => qsval.value,
        set: (v: string) => qsval.value = fixQsVal(v),
    });

    return output;
}

/** Get a synced ref to string array stored in query string as sorted csv */
export function useQsPropStringArray(key: string | null | undefined) {
    if (!key || typeof key !== 'string') throw new Error('useQsPropStringArray: key must be non-empty string');
    const sep = ',';
    const qsval = useQsPropString(key);
    const fixArray = (arr: string[]) => arr.filter((x) => x !== '').sort();
    return computed({
        get: () => fixArray(qsval.value.split(sep)),
        set: (v: string[]) => qsval.value = fixArray(v ?? []).join(sep),
    });
}
