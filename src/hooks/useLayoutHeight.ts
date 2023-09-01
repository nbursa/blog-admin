import { RefObject, useEffect, useCallback, useState } from 'react';

const useLayoutHeight = (
  navigationRef?: RefObject<HTMLDivElement>
): [number | null, number | null] => {
  const [bodyHeight, setBodyHeight] = useState<number | null>(null);
  const [navHeight, setNavHeight] = useState<number | null>(null);

  const updateLayoutHeight = useCallback(() => {
    const navHeight = navigationRef?.current?.offsetHeight || 56;
    // console.log(navHeight);
    if (navHeight) {
      const calculatedBodyHeight = window.innerHeight - navHeight;
      setBodyHeight(calculatedBodyHeight);
      setNavHeight(navHeight);
    }
  }, [navigationRef]);

  useEffect(() => {
    updateLayoutHeight();
    window.addEventListener('resize', updateLayoutHeight);
    return () => {
      window.removeEventListener('resize', updateLayoutHeight);
    };
  }, [updateLayoutHeight]);

  return [bodyHeight, navHeight];
};

export default useLayoutHeight;
