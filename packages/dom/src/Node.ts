// TODO rename to something else this confuses the ide with current Node from domlib
// the library might have to be renamed
export interface Node {
  readonly element: HTMLElement;
}

export interface NodeComponent<Props = {}> {
  (props: Props): Node;
}