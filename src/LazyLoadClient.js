import React, { useState, useEffect, useRef, useCallback } from 'react';

function LazyLoadClient({ children, width, height, offset = window.innerHeight}) {
    console.log(width, height, offset);
    const [isVisible, setIsVisible] = useState(false);
    const el = useRef(null);

    const onScroll = useCallback(
        () => {
            console.log('onscroll executed');
            if (!el || !el.current) {
                return;
            }
            if ((window.innerHeight + window.pageYOffset + offset) > el.current.offsetTop) {
                setIsVisible(true);
            }
        },
        [offset],
    );

    const onDestroy = useCallback(
        () => {
            console.log('onDestroy executed');
            window.removeEventListener('scroll', onScroll);
        },
        [onScroll],
    );

    useEffect(() => {
        console.log('useEFfect executed');
        onScroll();
        if (isVisible) {
            onDestroy();
            return () => {};
        }
        window.addEventListener('scroll', onScroll);
        return onDestroy;
    }, [isVisible, onScroll, onDestroy]);

    return isVisible ?
        children :
        <div 
            style={{
                width,
                height,
            }}
            ref={el}
        />;
}

export default LazyLoadClient;
