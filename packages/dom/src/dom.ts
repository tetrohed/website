import FunctionalNode from './FunctionalNode';
import HtmlNode from './HtmlNode';
import { NodeComponent, Node } from './Node';
import Children, { ChildrenTypes } from './Children';

type Tag = keyof JSX.IntrinsicElements | NodeComponent;

const create = (
  tag: Tag,
  attributes: JSX.AttributeMap,
  ...children: ChildrenTypes[]
): Node => {
  if (typeof tag === 'function') {
    if (attributes?.states) {
      const { states, ...other } = attributes;
      return new FunctionalNode(tag, new Children(children), other, states);
    }
    else {
      return new FunctionalNode(tag, new Children(children), attributes, []);
    }
  }
  return new HtmlNode(tag, new Children(children), attributes);
};

export default { create };
