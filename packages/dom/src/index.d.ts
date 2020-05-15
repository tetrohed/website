import { State } from './State';
import dom from './dom';

export { View, ViewComponent } from './View';
export { State };

export default dom;

declare global {
  namespace JSX {
    type EventKey = keyof HTMLElementEventMap;
    type EventListenerMap = {
      [key in EventKey]?: (
        element: HTMLElement,
        event: HTMLElementEventMap[key]
      ) => void;
    };

    interface Attribute {
      class?: string;
    }

    type AttributeKey = keyof Attribute & EventKey;

    type AttributeMap = {
      [key in AttributeKey]: string;
    };

    interface IntrinsicPropTypes extends EventListenerMap, Attribute {}

    interface StateFullIntrinsicPropTypes extends IntrinsicPropTypes {
      states?: State[];
    }

    interface IntrinsicElements {
      p: IntrinsicPropTypes;
      div: IntrinsicPropTypes;
      span: IntrinsicPropTypes;
    }
  }
}
