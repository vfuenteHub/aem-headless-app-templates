'use client';
import PropTypes from 'prop-types';
import * as React from 'react';
import cn from '../../../utils/classNames';

const Typography = React.forwardRef(function Typography(
  { className, component: Cmp = 'div', ...restProps },
  ref
) {
  if (!React.isValidElement(<Cmp />)) {
    throw new Error('Attention Typography needs a valid component property');
  }

  return (
    <Cmp ref={ref} className={cn('typography', className)} {...restProps} />
  );
});

Typography.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  component: PropTypes.elementType,
};

export default Typography;
