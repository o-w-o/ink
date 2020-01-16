import { is } from "immutable";

export const shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
  const props = this.props || {},
    state = this.state || {};

  if (
    Object.keys(nextProps).length !== Object.keys(props).length ||
    Object.keys(nextState).length !== Object.keys(state).length
  ) {
    return true;
  }

  for (const key in nextProps) {
    if (!is(props[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (state[key] !== nextState[key] || !is(state[key], nextState[key])) {
      return true;
    }
  }
  return false;
};
