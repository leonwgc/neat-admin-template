/**
 * @file src/ds.d.ts
 * @author leon.wang
 */

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

interface BelongProductItem {
  productId: string;
  productName: string;
}

interface JoinedCompanyItem {
  id: string;
  name: string;
  role: string;
  status: number;
}

interface TimeZoneDTO {
  name: string;
  nameCN: string;
  timezone: number;
}

interface UserInfo {
  belongProductList: BelongProductItem[];
  companyName: string[];
  createTime: number;
  currentCompanyId: string;
  currentRole: string;
  email: string;
  familyName: string;
  givenName: string;
  joinedCompanies: JoinedCompanyItem[];
  lastUpdateTimestamp: number;
  photo: string;
  preferredLanguage: string;
  privilegeActions: ObjectType[];
  registrationChannel: string;
  role: string;
  status: boolean;
  timeZoneDTO: TimeZoneDTO;
  userId: string;
}
