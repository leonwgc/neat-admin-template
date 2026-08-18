/**
 * @file src/hooks/usePageFilters.ts
 * @author leon.wang
 */

import { Form } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import type { FormInstance } from 'antd';
import type { SetStateAction } from 'react';

export interface PageFilterUrlState {
  current: string | number;
  pageSize: string | number;
}

export interface PageFiltersOptions<UrlState extends PageFilterUrlState, FormValues> {
  initialState: UrlState;
  urlToFormValues: (state: Partial<UrlState>) => FormValues;
  formValuesToUrl: (values: Partial<FormValues>) => Partial<UrlState>;
  formValuesToRequest?: (values: FormValues) => ObjectType;
  requestToUrl?: (data: ObjectType) => Partial<UrlState>;
}

export interface PageFiltersResult<UrlState extends PageFilterUrlState, FormValues> {
  form: FormInstance;
  urlState: Partial<UrlState>;
  setUrlState: (
    state: SetStateAction<Partial<UrlState>>,
  ) => void;
  formValues: FormValues;
  defaultParams: [ObjectType, FormValues];
  getFormData: (values: ObjectType) => ObjectType;
  onBeforeRequest: (data: ObjectType) => ObjectType;
  onValuesChange: (
    changedValues: Partial<FormValues>,
    allValues: FormValues,
  ) => void;
}

const usePageFilters = <UrlState extends PageFilterUrlState, FormValues>(
  options: PageFiltersOptions<UrlState, FormValues>,
): PageFiltersResult<UrlState, FormValues> => {
  const [form] = Form.useForm();
  const [urlState, setUrlState] = useUrlState(
    options.initialState as Record<string, unknown>,
    { navigateMode: 'replace' },
  ) as [
    Partial<UrlState>,
    (state: SetStateAction<Partial<UrlState>>) => void,
  ];
  const formValues = options.urlToFormValues(urlState);

  return {
    form,
    urlState,
    setUrlState,
    formValues,
    defaultParams: [
      {
        current: Number(urlState.current) || 1,
        pageSize: Number(urlState.pageSize) || 10,
      },
      formValues,
    ],
    getFormData: (values) =>
      options.formValuesToRequest
        ? options.formValuesToRequest(values as FormValues)
        : values,
    onBeforeRequest: (data) => {
      setUrlState((previous) => ({
        ...previous,
        ...(options.requestToUrl?.(data) ?? {}),
        current: String((Number(data.pageNum) || 0) + 1),
        pageSize: String(data.pageSize ?? 10),
      }));
      return data;
    },
    onValuesChange: (_changedValues, allValues) => {
      setUrlState((previous) => ({
        ...previous,
        ...options.formValuesToUrl(allValues),
      }));
    },
  };
};

export default usePageFilters;
