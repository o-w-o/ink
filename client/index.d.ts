import { PureComponent } from "react";
import { IPreloaderState } from "./src/store/reducers";

export interface ISite {
  siteMetadata: {
    [key: string]: string;
  };
}

declare global {
  export interface Window {
    __SITE_STATE__: ISite;
    __INITIAL_STATE__: IPreloaderState;
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    ParallaxLayer: { className?: string };
  }
  interface IntrinsicClassElements {
    className?: string;
  }
  interface ElementAttributesProperty {
    className?: string;
  }
  interface ParallaxLayerProps {
    className?: string;
  }
}

declare module "react-spring/renderprops-addons.cjs" {
  import { ParallaxLayerProps, ParallaxProps } from "react-spring/renderprops-addons.cjs";
  interface ParallaxPropsWithClassName extends ParallaxProps {
    className?: string;
  }
  interface ParallaxLayerPropsWithClassName extends ParallaxLayerProps {
    className?: string;
  }
  export class Parallax extends PureComponent<ParallaxPropsWithClassName> {}
  export class ParallaxLayer extends PureComponent<ParallaxLayerPropsWithClassName> {}
}
