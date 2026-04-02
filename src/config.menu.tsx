/**
 * @file src/config.menu.tsx
 * @author leon.wang
 */
import {
  ExperimentOutlined,
  FormOutlined,
  ApiOutlined,
  AppstoreOutlined,
  CodeOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { MenuProps } from '@derbysoft/neat-design';
import i18n from './i18n';

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
    key: 'dashboard',
    get label() {
      return t('menu.dashboard');
    },
    icon: <BarChartOutlined />,
    route: '/app/dashboard',
    permissions: [],
  },
  {
    key: 'css',
    get label() {
      return t('menu.cssFeature');
    },
    icon: <ExperimentOutlined />,
    permissions: [],
    children: [
      {
        key: 'css-filter',
        get label() {
          return t('menu.cssFilter');
        },
        route: '/app/components/css-filter',
        permissions: [],
      },
    ],
  },
  {
    key: 'form',
    get label() {
      return t('menu.forms');
    },
    icon: <FormOutlined />,
    permissions: [],
    children: [
      {
        key: 'form1',
        get label() {
          return t('menu.responsiveForm');
        },
        route: '/app/forms',
        permissions: [],
      },
    ],
  },
  {
    key: 'hooks',
    get label() {
      return t('menu.reactHooks');
    },
    icon: <ApiOutlined />,
    permissions: [],
    children: [
      {
        key: 'use-transition',
        get label() {
          return t('menu.useTransition');
        },
        route: '/app/hooks/use-transition',
        permissions: [],
      },
      {
        key: 'use-suspense',
        get label() {
          return t('menu.suspense');
        },
        route: '/app/hooks/use-suspense',
        permissions: [],
      },
      {
        key: 'use-ahooks-countdown',
        get label() {
          return t('menu.useCountdown');
        },
        route: '/app/hooks/use-ahooks-countdown',
        permissions: [],
      },
      {
        key: 'verification-code-countdown',
        get label() {
          return t('menu.verificationCodeCountdown');
        },
        route: '/app/hooks/verification-code-countdown',
        permissions: [],
      },
      {
        key: 'use-responsive',
        get label() {
          return t('menu.useResponsive');
        },
        route: '/app/hooks/use-responsive',
        permissions: [],
      },
      {
        key: 'use-ds-table',
        get label() {
          return t('menu.useDsTable');
        },
        route: '/app/hooks/use-ds-table',
        permissions: [],
      },
      {
        key: 'use-lock-async-func',
        get label() {
          return t('menu.useLockAsyncFunc');
        },
        route: '/app/hooks/use-lock-async-func',
        permissions: [],
      },
    ],
  },

  {
    key: 'components',
    get label() {
      return t('menu.components');
    },
    icon: <AppstoreOutlined />,
    permissions: [],
    children: [
      {
        key: 'animated',
        get label() {
          return t('menu.animated');
        },
        route: '/app/components/animated',
        permissions: [],
      },
      {
        key: 'dot-status',
        get label() {
          return t('menu.dotStatus');
        },
        route: '/app/components/dot-status',
        permissions: [],
      },
      {
        key: 'verification-code',
        get label() {
          return t('menu.verificationCode');
        },
        route: '/app/components/verification-code',
        permissions: [],
      },
      {
        key: 'contact-info',
        get label() {
          return t('menu.contactInfo');
        },
        route: '/app/components/contact-info',
        permissions: [],
      },
      {
        key: 'user-contact-card',
        get label() {
          return t('menu.userContactCard');
        },
        route: '/app/components/user-contact-card',
        permissions: [],
      },
      {
        key: 'email-success-modal',
        get label() {
          return t('menu.emailSuccessModal');
        },
        route: '/app/components/email-success-modal',
        permissions: [],
      },
      {
        key: 'verification-code-page',
        get label() {
          return t('menu.verificationCodePage');
        },
        route: '/app/components/verification-code-page',
        permissions: [],
      },
      {
        key: 'masonry',
        get label() {
          return t('menu.masonry');
        },
        route: '/app/components/masonry',
        permissions: [],
      },
      {
        key: 'chatbot',
        get label() {
          return t('menu.chatbot');
        },
        route: '/app/components/chatbot',
        permissions: [],
      },
      {
        key: 'image-upload',
        get label() {
          return t('menu.imageUpload');
        },
        route: '/app/components/image-upload',
        permissions: [],
      },
      {
        key: 'image-cropper',
        get label() {
          return t('menu.imageCropper');
        },
        route: '/app/components/image-cropper',
        permissions: [],
      },
      {
        key: 'rich-text-editor',
        get label() {
          return t('menu.richTextEditor');
        },
        route: '/app/components/rich-text-editor',
        permissions: [],
      },
      {
        key: 'number-roll',
        get label() {
          return t('menu.numberRoll');
        },
        route: '/app/components/number-roll',
        permissions: [],
      },
      {
        key: 'fade-in',
        get label() {
          return t('menu.fadeIn');
        },
        route: '/app/components/fade-in',
        permissions: [],
      },
      {
        key: 'text-ellipsis',
        get label() {
          return t('menu.textEllipsis');
        },
        route: '/app/components/text-ellipsis',
        permissions: [],
      },
      {
        key: 'error-boundary',
        get label() {
          return t('menu.errorBoundary');
        },
        route: '/app/components/error-boundary',
        permissions: [],
      },
      {
        key: 'error-test',
        get label() {
          return t('menu.errorTest');
        },
        route: '/app/components/error-test',
        permissions: [],
      },
      {
        key: 'error-monitor',
        get label() {
          return t('menu.errorMonitor');
        },
        route: '/app/components/error-monitor',
        permissions: [],
      },
    ],
  },
  {
    key: 'libs',
    get label() {
      return t('menu.libraries');
    },
    icon: <CodeOutlined />,
    permissions: [],
    children: [
      {
        key: 'react-hook-form',
        get label() {
          return t('menu.reactHookForm');
        },
        route: '/app/hooks/react-hook-form',
        permissions: [],
      },
      {
        key: 'use-form-field',
        get label() {
          return t('menu.reactFormFieldHook');
        },
        route: '/app/hooks/use-form-field',
        permissions: [],
      },
      {
        key: 'zustand-demo',
        get label() {
          return t('menu.zustand');
        },
        route: '/app/hooks/zustand-demo',
        permissions: [],
      },
      {
        key: 'use-global-state',
        get label() {
          return t('menu.zustandKit');
        },
        route: '/app/hooks/use-global-state',
        permissions: [],
      },
    ],
  },
];
