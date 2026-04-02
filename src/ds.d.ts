// ds data structures

type ObjectType = Record<string, unknown>;

type ListObjectType = {
  pageSize?: number;
  pageNum?: number;
  totals: number;
  totalPages?: number;
  records: ObjectType[];
};

type ResponseDataType = {
  result: 'success' | 'fail';
  timestamp: number;
  data: ObjectType | ObjectType[] | ListObjectType;
};

type ListResult<T> = {
  list: T[];
  total: number;
};
