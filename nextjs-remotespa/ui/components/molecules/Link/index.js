'use client';
import PropTypes from 'prop-types';
import * as React from 'react';
import cn from '../../../utils/classNames';
import Typography from '../../atoms/Typography';
import styles from './Link.module.css';

const Link = React.forwardRef(function Link(
  { className, component = 'a', underline = 'none', ...restProps },
  ref
) {
  return (
    <Typography
      ref={ref}
      component={component}
      className={cn(
        'link',
        styles.root,
        underline && styles[underline],
        className
      )}
      {...restProps}
    />
  );
});

Link.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  underline: PropTypes.oneOf(['always', 'hover', 'none']),
};

export default Link;
