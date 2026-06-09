/**
 * @file src/layouts/Footer.tsx
 * @author leon.wang
 */

import FadeIn from '../components/FadeIn';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

interface FooterProps {
  menuCollapsed: boolean;
}

const Footer = ({ menuCollapsed }: FooterProps) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.resolvedLanguage === 'zh';

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
          <div>
            © 2002 - {new Date().getFullYear()} {t('footer.company')}
          </div>
          <div>
            {t('footer.copyright')}
            <a
              target="_blank"
              href={
                isZh
                  ? 'https://www.derbysoft.com/cn/privacy-policy/'
                  : 'https://www.derbysoft.com/privacy-policy/'
              }
              rel="noreferrer"
            >
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

export default Footer;
