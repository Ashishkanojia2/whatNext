import { useState } from 'react';
const usePullDownToRefresh = () => {
  const [refresh, setRefresh] = useState(false);

  type RefreshFunction = () => Promise<void> | void;
  const refreshPageHandler = (fun: RefreshFunction) => {
    setRefresh(true);
    setTimeout(() => {
      fun();
      setRefresh(false)
    }, 2000);
  };

  return { refresh, setRefresh, refreshPageHandler };
};

export default usePullDownToRefresh;
