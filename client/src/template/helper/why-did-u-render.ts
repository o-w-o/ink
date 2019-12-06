import { WhyDidYouRenderOptions } from "@welldone-software/why-did-you-render";

// @ts-ignore
import whyDidYouRender from "@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.js";

export function configureWhyDidYouRender(React: any, option: WhyDidYouRenderOptions) {
  React.PureComponent.whyDidYouRender = true;
  return whyDidYouRender(React, Object.assign(option));
}
