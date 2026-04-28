// const useThrottle = (func:any, delay:number) => {
//   let timeout :any = null;
//   return (...args :any) => {
//     if (timeout) {
//       return;
//     }
//     func(...args);
//     timeout = setTimeout(() => {
//       timeout = null;
//     }, delay);
//   };
// };

// export default useThrottle;


import { useRef } from "react";

const useThrottling = (fn: any, delay: number) => {
  const lastTime = useRef(0);

  return (...args: any) => {
    const now = Date.now();

    if (now - lastTime.current < delay) return;

    lastTime.current = now;
    return fn(...args);
  };
};

export default useThrottling;