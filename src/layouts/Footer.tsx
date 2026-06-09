/**
 * @file src/layouts/Footer.tsx
 * @author leon.wang
 */

import FadeIn from '../components/FadeIn';
import './Footer.scss';

const Footer = ({ menuCollapsed }) => {
  return (
    <div className="app-footer">
      {menuCollapsed ? (
        <FadeIn duration={300} key={'0'}>
          <div className="symbol" style={{ fontSize: 20 }}>
            ©
          </div>
        </FadeIn>
      ) : (
        <FadeIn duration={300} key={'1'}>
          <div>© 2002 - {new Date().getFullYear()} 德比软件 Inc.</div>
          <div>
            版权所有,
            <a
              target="_blank"
              href="https://www.derbysoft.com/cn/privacy-policy/"
              rel="noreferrer"
            >
              隐私政策
            </a>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default Footer;
