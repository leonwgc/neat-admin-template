import FadeIn from '../components/FadeIn';
import './Footer.scss';

const Footer = ({ menuCollapsed }) => {
  return (
    <div className="app-footer">
      {menuCollapsed ? (
        <div className="symbol" style={{ fontSize: 20 }}>
          ©
        </div>
      ) : (
        <FadeIn duration={300}>
          <div>© PAST - FUTURE</div>
        </FadeIn>
      )}
    </div>
  );
};

export default Footer;
