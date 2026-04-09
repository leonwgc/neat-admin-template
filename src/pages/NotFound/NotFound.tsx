/**
 * @file src/pages/NotFound/NotFound.tsx
 * @author leon.wang
 */

import React from 'react';
import { Button } from '@derbysoft/neat-design';
import { Error404errorScreenLarge } from '@derbysoft/neat-design-illustrations';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { defaultRoute } from '~/config';
import './NotFound.scss';

const App: React.FC = () => {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="not-found">
      <Error404errorScreenLarge className="not-found__illustration" />

      <div className="not-found__title">{t('notFoundTitle')}</div>
      <div className="not-found__description">{t('notFoundDescription')}</div>

      <Button
        type="primary"
        className="not-found__btn"
        onClick={() => nav(defaultRoute)}
      >
        {t('backHome')}
      </Button>
    </section>
  );
};

export default App;
