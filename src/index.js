import React from 'react';
// import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';
import { LazyLoadClient } from './LazyLoadClient';


// export const LazyLoad = () => ((
//   <div>test</div>
// ));

console.log(ExecutionEnvironment.canUseViewport);
export const LazyLoad = ({ children, ...props }) => (ExecutionEnvironment.canUseViewport
  ? (
    <LazyLoadClient
      {...props}
    >
      {children}
    </LazyLoadClient>
  )
  : children);
//
// LazyLoad.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default LazyLoad;
