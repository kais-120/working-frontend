
import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook pour détecter quand un élément entre dans le viewport
 * @param {IntersectionObserverOptions} options - Options pour IntersectionObserver
 * @returns {[RefObject<T>, boolean]} - [ref à attacher à l'élément, boolean indiquant si l'élément est visible]
 */
export const useIntersectionObserver = <T extends Element>(options: IntersectionObserverOptions = {}): [RefObject<T>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = false } = options;

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      
      // Si l'élément est visible et que l'option triggerOnce est active, 
      // ne plus changer l'état une fois qu'il est visible
      if (!isVisible && isElementIntersecting && triggerOnce) {
        setIsVisible(true);
        observer.disconnect();
        return;
      }
      
      setIsVisible(isElementIntersecting);
    }, { threshold, root, rootMargin });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, root, rootMargin, triggerOnce, isVisible]);

  return [ref, isVisible];
};

export default useIntersectionObserver;
