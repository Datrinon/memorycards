import React, {useRef, useState} from "react";

/**
 * Creates a ref for a score variable and returns that, alongside a
 * method which accepts an argument for updating it. This update re-renders
 * as long as the value is different. Also, if using as a prop, pass the value in
 * as a prop and then reference the hook, passing the prop and 'true' in. This
 * will allow you to get the most recent value of the prop in that component.
 * @param {*} value 
 * @param {*} isProp 
 * @returns 
 */
 function useScore(value, isProp = false) {
  const ref = useRef(value);
  // ref by itself will not force a render, need to use this
  //  in order to force rerenders on changes in value.
  const [, forceRender] = useState(false);

  function updateState(newState) {
    if (!Object.is(ref.current, newState)) {
      ref.current = newState;
      forceRender(s => !s);
    }
  }

  return [ref, updateState];
}

export default useScore;