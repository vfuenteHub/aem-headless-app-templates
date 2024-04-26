'use client';
import PropTypes from 'prop-types';
import * as React from 'react';
import cn from '../../../utils/classNames';
import Fade from '../../atoms/Fade';
import styles from './Backdrop.module.css';

const Backdrop = React.forwardRef(function Backdrop(
  { className, open, component: Cmp = 'div', zIndex, style = {}, ...restProps },
  ref
) {
  if (!React.isValidElement(<Cmp />)) {
    throw new Error('Attention Backdrop needs a valid component property');
  }

  return (
    <Fade in={open}>
      <Cmp
        ref={ref}
        className={cn('Backdrop', styles.root, className)}
        aria-hidden="true"
        style={{
          ...style,
          zIndex,
        }}
        {...restProps}
      />
    </Fade>
  );
});

Backdrop.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  component: PropTypes.elementType,
  open: PropTypes.bool.isRequired,
  zIndex: PropTypes.number,
};

export default Backdrop;
