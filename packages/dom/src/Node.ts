export interface Node {
  readonly element: HTMLElement;
}

export interface NodeComponent<Props = {}> {
  (props: Props): Node;
}