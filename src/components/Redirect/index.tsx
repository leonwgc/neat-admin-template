/**
 * @file: src/components/Redirect/index.tsx
 * @author leon.wang
 */

import { useEffect } from 'react';
import useNavTo from '~/hooks/useNavTo';

const Redirect = ({ to }) => {
  const navTo = useNavTo();
  useEffect(() => {
    navTo(to);
  }, [navTo, to]);
  return null;
};

export default Redirect;
