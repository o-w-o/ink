import * as IxOperators from "ix/iterable/operators";
import * as Ix$Operators from "ix/asynciterable/operators";

import { from as from$, of as of$ } from "ix/asynciterable";
import { from, of } from "ix/iterable";

export const IxOps = IxOperators;
export const Ix$Ops = Ix$Operators;

export const Ix = {
  from,
  of
};
export const Ix$ = {
  from: from$,
  of: of$
};
