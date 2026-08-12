/**
 * @file src/hooks/useTable.tsx
 * @author leon.wang(leon.wang@derbysoft.net)
 */

import { useCallback, useMemo, useState } from 'react';
import { Form } from 'antd';
import { useAntdTable, useLatest } from 'ahooks';
import { AxiosPromise } from 'axios';
import { errorHandler } from './useDsRequest';
import { App } from '@derbysoft/neat-design';

type ListResult<T> = {
  list: T[];
  total: number;
};

const useTable = (
  request: (data: ObjectType) => AxiosPromise<ResponseDataType>,
  formValuesTransform?: (values: ObjectType) => ObjectType,
  responseDataTransform?: (
    data: ObjectType | ObjectType[],
  ) => ListResult<ObjectType>,
) => {
  const { toast, notification } = App.useApp();
  const [form] = Form.useForm();
  const req = useLatest(request);
  const [loading, setLoading] = useState(true);

  const service = useCallback(
    ({ current, pageSize, sorter }, formData = {}) => {
      setLoading(true);
      const params: ObjectType = {
        pageNum: current - 1,
        pageSize,
      };

      let transformedData = formData;

      if (typeof formValuesTransform === 'function') {
        transformedData = formValuesTransform(formData);
      }

      Object.keys(transformedData).forEach((key) => {
        if (transformedData[key] !== '') {
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

      return requestFn(params)
        .then(({ data: { data: resData, result } }) => {
          if (result === 'success') {
            if (typeof responseDataTransform === 'function') {
              return responseDataTransform(resData);
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
        });
    },
    [formValuesTransform, notification, req, responseDataTransform, toast],
  );

  const {
    tableProps,
    search: { submit, reset },
  } = useAntdTable(service, {
    debounceWait: 400,
    form,
    onFinally() {
      setLoading(false);
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
  };
};

export default useTable;
