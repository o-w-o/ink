import whyDidYouRender, {
  WhyDidYouRenderOptions
} from "@welldone-software/why-did-you-render";

export function configureWhyDidYouRender(
  React: any,
  option: WhyDidYouRenderOptions
) {
  React.PureComponent.whyDidYouRender = true;
  return whyDidYouRender(React, Object.assign(option));
}
