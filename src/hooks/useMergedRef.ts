import { useCallback, type Ref, type MutableRefObject } from 'react';

export function useMergedRef<T>(...refs: (Ref<T> | undefined)[]) {
    return useCallback(
        (node: T | null) => {
            for (const ref of refs) {
                if (typeof ref === 'function') ref(node);
                else if (ref) (ref as MutableRefObject<T | null>).current = node;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refs,
    );
}
