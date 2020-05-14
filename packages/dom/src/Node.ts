// TODO rename to something else this confuses the ide with current Node from domlib
// the library might have to be renamed
import { State } from './State';

export interface Node {
  render(): Element;
}

type States = State[]

export interface NodeComponent<Props = {}> {
  (props: Props | States): Node;
}
