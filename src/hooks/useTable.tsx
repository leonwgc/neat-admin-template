/**
 * @file src/hooks/useTable.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { useCallback, useMemo, useState } from 'react';
import { Form } from 'antd';
import { useAntdTable, useLatest } from 'ahooks';
import { AxiosPromise } from 'axios';
import { errorHandler } from './useFetch';
import { App } from '@derbysoft/neat-design';

type ListResult<T> = {
  list: T[];
  total: number;
};

const onBeforeRequestDefault = (v: ObjectType) => v;

type Options = Parameters<typeof useAntdTable>[1] & {
  getFormData?: (values: ObjectType) => ObjectType;
  getResponseData?: (
    data: ObjectType | ObjectType[],
  ) => ListResult<ObjectType>;
  onBeforeRequest?: (data: ObjectType) => ObjectType;
};

const useTable = (
  request: (data: ObjectType) => AxiosPromise<ResponseDataType>,
  options?: Options,
) => {
  const { toast, notification } = App.useApp();
  const [defaultForm] = Form.useForm();
  const form = options?.form ?? defaultForm;
  const req = useLatest(request);
  const [loading, setLoading] = useState(true);

  const service = useCallback(
    (
      {
        current,
        pageSize,
        sorter,
      }: {
        current: number;
        pageSize: number;
        sorter?: any;
        filters?: unknown;
        extra?: unknown;
      },
      formData = {},
    ): Promise<ListResult<ObjectType>> => {
      setLoading(true);
      const params: ObjectType = {
        pageNum: current - 1,
        pageSize,
      };

      let transformedData = formData;

      const { getFormData, getResponseData } = options ?? {};
      if (typeof getFormData === 'function') {
        transformedData = getFormData(formData);
      }

      Object.keys(transformedData).forEach((key) => {
        if (transformedData[key] !== undefined) {
          params[key] = transformedData[key];
        }
      });

      if (sorter?.order) {
        params.sorts = [
          {
            direction: sorter?.order === 'descend' ? 'DESC' : 'ASC',
            property: sorter?.columnKey,
          },
        ];
      }

      const requestFn = req.current;

      if (!requestFn) {
        return Promise.resolve({
          total: 0,
          list: [],
        });
      }

      const { onBeforeRequest = onBeforeRequestDefault } = options ?? {};
      const p = onBeforeRequest(params);

      return requestFn(p)
        .then(({ data: { data: resData, result } }) => {
          if (result === 'success') {
            if (typeof getResponseData === 'function') {
              return getResponseData(resData);
            }

            const result = resData as ListObjectType;

            return {
              total: result.totals,
              list: result.records,
            };
          } else {
            return {
              total: 0,
              list: [],
            };
          }
        })
        .catch((error) => {
          errorHandler(error, notification, true, toast);
          return {
            total: 0,
            list: [],
          };
        });
    },
    [notification, options, req, toast],
  );

  const {
    tableProps,
    search: { submit, reset, type, changeType },
  } = useAntdTable(service, {
    ...options,
    debounceWait: options?.debounceWait ?? 400,
    form,
    onFinally(...args) {
      setLoading(false);
      options?.onFinally?.(...args);
    },
  });

  const pagination = useMemo(() => {
    return {
      ...tableProps.pagination,
      // showTotal: (total, range) =>
      //   translate('components/paginationTotalNum')(range.join('-'), total),
      showQuickJumper: false,
      showSizeChanger: {
        variant: 'underlined',
        size: 'small',
      },
      pageSizeOptions: [10, 20, 30, 40, 50],
    };
  }, [tableProps]);

  return {
    tableProps: {
      ...tableProps,
      loading,
      pagination,
      scroll: { x: 'max-content' },
    },
    form,
    submit,
    reset,
    type,
    changeType,
  };
};

export default useTable;
