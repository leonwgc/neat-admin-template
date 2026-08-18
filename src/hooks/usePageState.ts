/**
 * @file src/hooks/usePageState.ts
 * @author leon.wang
 */

import { Form } from 'antd';
import { useGlobalState } from '@derbysoft/zustand-kit';
import type { FormInstance } from 'antd';
import type { SetStateAction } from 'react';

export interface PageState {
  current: string | number;
  pageSize: string | number;
}

export interface PageStateOptions<
  StorageState extends PageState,
  FormValues,
> {
  key: string;
  initialState: StorageState;
  stateToFormValues: (state: Partial<StorageState>) => FormValues;
  formValuesToState: (values: Partial<FormValues>) => Partial<StorageState>;
  formValuesToRequest?: (values: FormValues) => ObjectType;
  requestToState?: (data: ObjectType) => Partial<StorageState>;
}

export interface PageStateInStorageResult<
  StorageState extends PageState,
  FormValues,
> {
  form: FormInstance;
  state: Partial<StorageState>;
  setState: (state: SetStateAction<Partial<StorageState>>) => void;
  formValues: FormValues;
  defaultParams: [ObjectType, FormValues];
  getFormData: (values: ObjectType) => ObjectType;
  onBeforeRequest: (data: ObjectType) => ObjectType;
  onValuesChange: (
    changedValues: Partial<FormValues>,
    allValues: FormValues,
  ) => void;
  urlState: Partial<StorageState>;
  setUrlState: (state: SetStateAction<Partial<StorageState>>) => void;
}

const usePageStateInStorage = <
  StorageState extends PageState,
  FormValues,
>(
  options: PageStateOptions<StorageState, FormValues>,
): PageStateInStorageResult<StorageState, FormValues> => {
  const [form] = Form.useForm();
  const [state, setState] = useGlobalState<Partial<StorageState>>(
    options.key,
    options.initialState as Partial<StorageState>,
    {
      storage: 'sessionStorage',
      storageKey: 'page-state',
    },
  ) as unknown as [
    Partial<StorageState>,
    (state: SetStateAction<Partial<StorageState>>) => void,
  ];

  const formValues = options.stateToFormValues(state);

  const updateState = (nextState: SetStateAction<Partial<StorageState>>) => {
    setState((previous) => {
      const resolvedState =
        typeof nextState === 'function'
          ? (
              nextState as (
                prev: Partial<StorageState>,
              ) => Partial<StorageState>
            )(previous)
          : nextState;

      return {
        ...previous,
        ...resolvedState,
      };
    });
  };

  return {
    form,
    state,
    setState: updateState,
    formValues,
    defaultParams: [
      {
        current: Number(state.current) || 1,
        pageSize: Number(state.pageSize) || 10,
      },
      formValues,
    ],
    getFormData: (values) =>
      options.formValuesToRequest
        ? options.formValuesToRequest(values as FormValues)
        : values,
    onBeforeRequest: (data) => {
      updateState((previous) => ({
        ...previous,
        ...(options.requestToState?.(data) ?? {}),
        current: String((Number(data.pageNum) || 0) + 1),
        pageSize: String(data.pageSize ?? 10),
      }));
      return data;
    },
    onValuesChange: (_changedValues, allValues) => {
      updateState((previous) => ({
        ...previous,
        ...options.formValuesToState(allValues),
      }));
    },
    urlState: state,
    setUrlState: updateState,
  };
};

export const usePageFilters = usePageStateInStorage;

export default usePageStateInStorage;
