/**
 * @file utils/flattenMenus.ts
 * @author leon.wang
 */
import { MenuItem } from '~/config.menu';

export interface FlatMenuItem {
  key: string;
  label: string;
  route?: string;
  icon?: React.ReactNode;
  permissions?: string[];
  /** 父级菜单路径，用于显示层级关系 */
  parentPath?: string[];
}

/**
 * 扁平化菜单树结构
 * 将嵌套的菜单结构转换为一维数组，方便搜索
 *
 * @param menus - 菜单配置数组
 * @param parentPath - 父级菜单路径（用于递归）
 * @returns 扁平化后的菜单数组
 */
export function flattenMenus(
  menus: MenuItem[],
  parentPath: string[] = [],
): FlatMenuItem[] {
  const result: FlatMenuItem[] = [];

  for (const menu of menus) {
    // 跳过分隔线
    if ('type' in menu && menu.type === 'divider') {
      continue;
    }

    // 获取 label（可能是 getter 函数）
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const labelValue = (menu as any).label;
    const label =
      typeof labelValue === 'function' ? labelValue() : labelValue;

    // 只处理有路由的菜单项
    if (menu.route) {
      result.push({
        key: menu.key as string,
        label: label as string,
        route: menu.route,
        icon: 'icon' in menu ? menu.icon : undefined,
        permissions: menu.permissions,
        parentPath: parentPath.length > 0 ? [...parentPath] : undefined,
      });
    }

    // 递归处理子菜单
    if (menu.children && menu.children.length > 0) {
      const newParentPath =
        menu.route || label ? [...parentPath, label as string] : parentPath;
      result.push(...flattenMenus(menu.children, newParentPath));
    }
  }

  return result;
}

/**
 * 根据权限过滤菜单
 *
 * @param menus - 扁平化后的菜单数组
 * @param userPermissions - 用户拥有的权限列表
 * @returns 过滤后的菜单数组
 */
export function filterMenusByPermissions(
  menus: FlatMenuItem[],
  userPermissions: string[],
): FlatMenuItem[] {
  return menus.filter((menu) => {
    // 如果没有权限要求，或者用户拥有所需权限，则显示
    if (!menu.permissions || menu.permissions.length === 0) {
      return true;
    }
    return menu.permissions.some((permission) =>
      userPermissions.includes(permission),
    );
  });
}
