/**
 * @file src/hooks/useNav.tsx
 * @author leon.wang
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import URI from 'urijs';

export default function useNavTo() {
  const nav = useNavigate();

  const navTo = useCallback(
    (path, qs = {}, keepSearch = true) => {
      const uri = URI();
      const search = uri.search(true) || {};
      nav(
        URI(path)
          .setSearch(
            keepSearch
              ? {
                  ...search,
                  ...qs,
                }
              : {
                  ...qs,
                }
          )
          .valueOf()
      );
    },
    [nav]
  );

  return navTo;
}
