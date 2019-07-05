import React from 'react';
import LazyLoadClient from './LazyLoadClient';

const ExecutionEnvironment = require('exenv');

export const LazyLoad = ({ children, ...props }) => {
    return ExecutionEnvironment.canUseViewport ?
        <LazyLoadClient
            {...props}
        >
            {children}
        </LazyLoadClient>
        : children
};

export default LazyLoad;
