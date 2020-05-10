declare namespace WebApplication {
  interface Node {
    element: Element;
  }

  type NodeFunction<Props = {}> = (props: Props) => WebApplication.Node;
}
