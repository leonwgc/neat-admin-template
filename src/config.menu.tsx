/**
 * @file src/config.menu.tsx
 * @author leon.wang
 */
import {
  WidgetOutlined,
  TableOutlined,
  WrenchOutlined,
  APIOutlined,
  HomeOutlined,
  PersonaOutlined,
} from '@derbysoft/neat-design-icons';
import { MenuProps } from '@derbysoft/neat-design';
import i18n from './i18n';
import operations from './config.operations';

/** Get translated label */
const t = (key) => i18n.t(key);

export type MenuItem = Required<MenuProps>['items'][number] & {
  /**
   * menu item children
   */
  children?: MenuItem[];
  /**
   * menu item route
   */
  route?: string;
  /**
   * permissions needed to access this menu item
   */
  permissions?: string[];
  /**
   * whether to hide this menu item from menu display
   * (but still generate route for it)
   */
  hidden?: boolean;
};

/**
 * Defines the application's sidebar menu configuration.
 *
 * Each menu item can have:
 * - `key`: Unique identifier for the menu item.
 * - `label`: Display name of the menu item.
 * - `icon`: React element representing the menu icon.
 * - `permissions`: Array of permissions required to view the menu item.
 * - `children`: Nested menu items.
 * - `route`: (Optional) Route path for navigation.
 * - `hidden`: (Optional) If true, the item is excluded from the menu UI but included in routing.
 *
 * This structure is used to render navigation menus and control access based on permissions.
 */
export const menus: MenuItem[] = [
  {
    key: 'g1',
    get label() {
      return 'Customer Settlement File';
    },
    icon: <PersonaOutlined />,
    children: [
      {
        key: 'g1-1',
        get label() {
          return 'Settlement Account Info';
        },
        route: '/app/forms/table',
      },
      {
        key: 'g1-2',
        get label() {
          return 'Settlement Account Configuration';
        },
        route: '/app/forms/table',
      },
    ],
  },
  {
    key: 'g2',
    get label() {
      return 'Customer AR';
    },
    icon: <HomeOutlined />,
    children: [
      {
        key: 'g2-1',
        get label() {
          return 'AR Statements';
        },
        route: '/app/ar-statements',
      },
      {
        key: 'g2-1-1',
        get label() {
          return 'Dispute Audit List';
        },
        route: '/app/ar-statements/:statementId',
        hidden: true,
      },
      {
        key: 'g2-2',
        get label() {
          return 'AR Dispute Audit';
        },
        route: '/app/forms/table',
      },
    ],
  },
  {
    key: 'form',
    get label() {
      return t('menu.forms');
    },
    icon: <TableOutlined />,
    permissions: [],
    children: [
      {
        key: 'forms-table',
        get label() {
          return t('menu.table');
        },
        route: '/app/forms/table',
        permissions: [],
      },
      {
        key: 'form1',
        get label() {
          return t('menu.responsiveForm');
        },
        route: '/app/forms',
        permissions: [operations.formRead],
      },
    ],
  },
  {
    key: 'api-request',
    get label() {
      return t('menu.apiRequest');
    },
    icon: <APIOutlined />,
    permissions: [],
    children: [
      {
        key: 'api-demo',
        get label() {
          return t('menu.apiDemo');
        },
        route: '/app/api-request/api-demo',
        permissions: [],
      },
    ],
  },
  {
    key: 'result-page',
    get label() {
      return t('menu.resultPage');
    },
    icon: <WrenchOutlined />,
    permissions: [],
    children: [
      {
        key: 'no-permission',
        get label() {
          return t('menu.noPermission');
        },
        route: '/app/result-page/no-permission',
      },
      {
        key: 'not-found',
        get label() {
          return t('menu.notFound');
        },
        route: '/app/result-page/not-found',
      },
      {
        key: 'mantainance',
        get label() {
          return t('menu.mantainance');
        },
        route: '/app/result-page/mantainance',
      },
    ],
  },

  {
    key: 'components',
    get label() {
      return t('menu.components');
    },
    icon: <WidgetOutlined />,
    permissions: [],
    children: [
      {
        key: 'image-upload',
        get label() {
          return t('menu.imageUpload');
        },
        route: '/app/components/image-upload',
        permissions: [operations.imageUploadRead],
      },
      {
        key: 'image-cropper',
        get label() {
          return t('menu.imageCropper');
        },
        route: '/app/components/image-cropper',
        permissions: [operations.imageCropRead],
      },
      {
        key: 'select-ime-demo',
        get label() {
          return t('menu.selectIMEDemo');
        },
        route: '/app/components/select-ime-demo',
        permissions: [],
      },
    ],
  },
];
