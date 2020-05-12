export { Node, NodeComponent } from './Node';

export as namespace dom;

declare global {
  namespace JSX {
    type EventKey = keyof HTMLElementEventMap;

    type EventListenerList = {
      [key in EventKey]?: (
        element: HTMLElement,
        event: HTMLElementEventMap[key]
      ) => void;
    };

    interface Attribute {
      class?: string;
    }

    type AttributeKey = keyof Attribute;

    type AttributeMap = {
      [key in AttributeKey]: any;
    };

    interface IntrinsicPropTypes extends EventListenerList, Attribute {}

    interface IntrinsicElements {
      p: IntrinsicPropTypes;
      div: IntrinsicPropTypes;
      span: IntrinsicPropTypes;
    }
  }
}
