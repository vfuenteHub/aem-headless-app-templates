'use client';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Transition } from 'react-transition-group';

const TRANSITION_STYLES = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const setTransitionStyle = state => TRANSITION_STYLES[state];

const Fade = React.forwardRef(function Fade(
  { children, in: inProp, timeout = 225, style = {}, ...restProps },
  ref
) {
  const nodeRef = React.useRef(
    (children.ref?.current ? children.ref : ref) || null
  );

  const styles = React.useMemo(
    () => ({
      opacity: 0,
      transition: `opacity ${timeout}ms ease-in-out`,
    }),
    [timeout]
  );

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      appear={true}
      timeout={timeout}
      {...restProps}
    >
      {(state, childProps) =>
        React.cloneElement(children, {
          ref: nodeRef,
          style: {
            opacity: 0,
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...styles,
            ...setTransitionStyle(state),
            ...style,
            ...children.props.style,
          },
          ...childProps,
        })
      }
    </Transition>
  );
});

Fade.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  in: PropTypes.bool,
  timeout: PropTypes.number,
};

export default Fade;
