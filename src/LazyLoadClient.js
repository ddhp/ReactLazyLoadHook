import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';

export function LazyLoadClient({
  children, width = '100%', height = '100%', offset = 0,
}) {
  // console.log(width, height, offset);
  const [isVisible, setIsVisible] = useState(false);
  const el = useRef(null);

  const onScroll = useCallback(
    () => {
      // console.log('onscroll executed');
      if (!el || !el.current) {
        return;
      }
      if ((window.innerHeight + window.pageYOffset + offset)
        > el.current.getBoundingClientRect().top
      ) {
        // console.log(window.innerHeight, window.pageYOffset, window.innerHeight,
        //   el.current.offsetTop);
        setIsVisible(true);
      }
    },
    [],
  );

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  useEffect(() => {
    if (isVisible) {
      window.removeEventListener('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isVisible, onScroll]);

  return isVisible
    ? children
    : (
      <div
        style={{
          width,
          height,
        }}
        ref={el}
      />
    );
}

LazyLoadClient.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  offset: PropTypes.number,
};

LazyLoadClient.defaultProps = {
  width: '100%',
  height: '100%',
  offset: 0,
};

export default LazyLoadClient;
