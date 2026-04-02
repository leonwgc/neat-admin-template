import cloneDeep from 'lodash/cloneDeep';
import { MenuItem } from '~/config.menu';

/**
 * Represents the result of a search operation within the menu structure.
 */
export type SearchResult = {
  /**
   * The paths of the menus, from the parent to the current item.
   */
  paths: MenuItem[];
  /**
   * Indicates whether the associated menu item was found.
   */
  found: boolean;
};

/**
 * Retrieves the menu paths based on the provided pathname and menus.
 *
 * This function searches through the given menus to find the paths that match
 * the provided pathname. It continues to search by progressively removing the
 * last segment of the pathname until a match is found or the root is reached.
 *
 * @param {string} pathname - The current pathname to search for in the menus.
 * @param {Array} menus - The list of menus to search through.
 * @returns {Array} An array of paths that match the provided pathname.
 */
export const getMenuPaths = (pathname, menus) => {
  const searchResult: SearchResult = {
    paths: [],
    found: false,
  };

  const func = (
    pathname: string,
    childItems: MenuItem[],
    item: MenuItem,
    searchResult: SearchResult
  ) => {
    if (!childItems || !childItems.length || searchResult.found) {
      return;
    }
    if (item) {
      // level 1 none.
      searchResult.paths.push(item);
    }

    for (const childItem of childItems) {
      if (childItem.route === pathname) {
        searchResult.paths.push(childItem);
        searchResult.found = true;
        return;
      } else {
        if (Array.isArray(childItem?.children)) {
          func(pathname, childItem?.children, childItem, searchResult);
        }
      }
    }
    if (!searchResult.found) {
      searchResult.paths.pop();
    }
  };

  let currentPath = pathname;

  while (!searchResult.found && currentPath) {
    func(currentPath, menus, null, searchResult);
    if (searchResult.found || currentPath === '/' || !currentPath) {
      break;
    }
    currentPath = currentPath.split('/').slice(0, -1).join('/');
  }

  return searchResult.paths;
};

export type LevelKeysProps = {
  key?: string;
  children?: LevelKeysProps[];
};

/**
 * Recursively generates a record of keys and their corresponding levels from a nested array of items.
 *
 * @param items1 - An array of items, each containing a key and optionally children.
 * @returns A record where each key is mapped to its level in the nested structure.
 */
export const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

/**
 * Get flat menu items from a nested array of menu items.
 * @param items the menu items to get
 * @returns all menu items
 */
export const getFlatMenus = (items: MenuItem[]) => {
  const result: MenuItem[] = [];

  items.reduce((acc: MenuItem[], item: MenuItem) => {
    if (item.children) {
      acc.push(...getFlatMenus(item.children));
    } else {
      acc.push(item);
    }
    return acc;
  }, result);

  return result;
};

/**
 * Check if the current user has the required permission
 * @param userPermissions
 * @param menuPermissions
 * @returns
 */
export const hasPermission = (
  userPermissions: string[] | undefined,
  menuPermissions: string[] | undefined
) => {
  if (!Array.isArray(menuPermissions) || !menuPermissions?.length) {
    return true;
  }

  if (!Array.isArray(userPermissions) || !userPermissions?.length) {
    return false;
  }

  return menuPermissions.every((item) => userPermissions.includes(item));
};

/**
 * Get the menu items according to the user's permissions and visible setting
 * @param operations The user's operations
 * @param menus The menu items to filter (default is allMenuData)
 * @returns The menu items that the user can see (excluding hidden items)
 */
export const getFilterMenus: (
  operations: string[],
  menus: MenuItem[]
) => MenuItem[] = (operations, menus = []) => {
  const filterMenus = (items: MenuItem[]) => {
    return items.filter((item) => {
      // Filter out hidden menu items
      if (item.hidden) {
        return false;
      }

      if (hasPermission(operations, item.permissions)) {
        if (Array.isArray(item.children)) {
          item.children = filterMenus(item.children);

          if (!item.children.length) {
            return false;
          }
        }
        return true;
      }
      return false;
    });
  };

  return filterMenus(cloneDeep(menus));
};
