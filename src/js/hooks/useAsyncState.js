import React, {useRef, useState} from "react";

/**
 * Creates a ref which is used like a state variable. Use this for asynchronous 
 * methods that use state, since they may have stale closures. (An example of when this
 * will happen is if you assign handlers after the initial render through useEffect)
 * Refs will ensure the latest rendition of the state. Note that to reference
 * the value of the state, because it is a ref, you have to use the `.current`
 * property.
 * @param {*} value - The initial value.
 * @param {*} isProp - Is this state being used as a prop in another component?
 * If so, continue to pass the value as you would a normal state variable, but when
 * in the child component, call this method referencing the prop and 'true'. This
 * will allow the prop to get the most recent value of the state in that component.
 * 
 * @see https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/
 * 
 * @returns 
 */
 function useAsyncState(value, isProp = false) {
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

export default useAsyncState;