import React from 'react';
import { Button } from '@derbysoft/neat-design';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ErrorForbiddenDefaultLarge } from '@derbysoft/neat-design-illustrations';
import './NoPermission.scss';

const NoPermission: React.FC = () => {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="no-permission">
      <ErrorForbiddenDefaultLarge />

      <div className="no-permission__title">{t('noPermissionTitle')}</div>
      <div className="no-permission__description">
        {t('noPermissionDescription')}
      </div>

      <Button
        type="primary"
        className="no-permission__btn"
        onClick={() => nav('/app')}
      >
        {t('backHome')}
      </Button>
    </section>
  );
};

export default NoPermission;
