// TODO move to dom library
declare namespace WebApplication {
  interface Node {
    readonly element: Element;
  }

  interface NodeFunction<Props = {}> {
    (props: Props): Node;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    p: {}
  }
}
