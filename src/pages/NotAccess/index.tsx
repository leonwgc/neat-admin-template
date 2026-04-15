import { useMount } from 'ahooks';
import { useNavigate } from 'react-router';

export default function NoPermissionDemo() {
  const nav = useNavigate();
  useMount(() => {
    nav('/no-permission');
  });
  return null;
}
