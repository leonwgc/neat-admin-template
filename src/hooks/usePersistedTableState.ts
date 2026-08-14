/**
 * @file src/hooks/usePersistedTableState.ts
 * @author leon.wang
 */

import { useMemo } from 'react';
import useGlobalState from '@derbysoft/zustand-kit';

const TABLE_REQUEST_KEYS = ['pageNum', 'pageSize', 'sorts'];

export interface PersistedTableState {
  current: number;
  pageSize: number;
  formValues: Record<string, unknown>;
}

const usePersistedTableState = (storageKey: string) => {
  const [filters, setFilters] = useGlobalState(
    storageKey,
    {},
    { storage: 'sessionStorage' },
  );

  const restoredState = useMemo<PersistedTableState>(() => {
    const saved = (filters ?? {}) as Record<string, unknown>;
    const pageNum = Number(saved.pageNum ?? 0);
    const pageSize = Number(saved.pageSize ?? 10);

    const formValues = Object.fromEntries(
      Object.entries(saved).filter(([key]) => !TABLE_REQUEST_KEYS.includes(key)),
    );

    return {
      current: Math.max(pageNum + 1, 1),
      pageSize,
      formValues,
    };
  }, [filters]);

  return {
    filters,
    setFilters,
    restoredState,
  };
};

export default usePersistedTableState;
