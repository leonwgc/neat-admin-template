/**
 * @file src/pages/Maintenance/Maintenance.tsx
 * @author leon.wang
 */

import React from 'react';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import Error from './Error';

const Maintenance: React.FC = () => {
  return (
    <section className="maintenance">
      <ErrorBoundary>
        <Error />
      </ErrorBoundary>
    </section>
  );
};

export default Maintenance;
