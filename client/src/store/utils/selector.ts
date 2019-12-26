import {
  createSelectorCreator,
  defaultMemoize,
  createSelector as c,
} from "reselect";
import { is, isImmutable } from "immutable";

function immutableEqualityValidator(prevState: any, nextState: any) {
  if (prevState === undefined) {
    return false;
  }

  if (nextState === undefined) {
    return true;
  }

  if (prevState === nextState) {
    console.log("ImmutableEqualityValidator [addr] >> equal ?", true);
    return true;
  }

  if (
    isImmutable(prevState) &&
    isImmutable(nextState) &&
    is(prevState, nextState)
  ) {
    console.log("ImmutableEqualityValidator [hash] >> equal ?", true);
    return true;
  }

  return false;
}

export const createSelector: typeof c = createSelectorCreator(
  defaultMemoize,
  immutableEqualityValidator
);
