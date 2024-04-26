'use client';
import PropTypes from 'prop-types';
import * as React from 'react';
import cn from '../../../utils/classNames';
import styles from './Loader.module.css';

const Loader = ({ className, component: Cmp = 'div', ...restProps }) => {
  if (!React.isValidElement(<Cmp />)) {
    throw new Error('Attention Loader needs a valid component property');
  }

  return (
    <Cmp
      className={cn('loader', styles.root, className)}
      role="status"
      aria-label="Loading"
      {...restProps}
    />
  );
};

Loader.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  component: PropTypes.elementType,
};

export default Loader;
