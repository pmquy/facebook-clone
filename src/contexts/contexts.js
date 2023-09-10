import { createContext } from "react";
import { useEffect } from "react";
export const CommonContexts = createContext({});

export const ClickOutSideContext = createContext((canClicks, cb, excepts=[]) => {
  useEffect(() => {
    const listener = event => {
      for(var e of excepts) {
        if(!e.current)
          return;
        if(e.current.contains(event.target)) {
          cb();
          return;
        }
      }
      for(var e of canClicks) {
        if(!e.current)
          return;
        if(e.current.contains(event.target))
          return;
      }
      cb();
    }

    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    }
  }, [canClicks, cb, excepts])

})