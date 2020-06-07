import FunctionView from './FunctionView';
import HtmlView from './HtmlView';
import { ViewComponent, View } from './View';
import Children, { ChildrenTypes } from './Children';

type Tag = keyof JSX.IntrinsicElements | ViewComponent;

const create = (
  tag: Tag,
  attributes: JSX.IntrinsicPropTypes,
  ...children: ChildrenTypes[]
): View => {
  if (typeof tag === 'function') {
    return new FunctionView(tag, new Children(children), attributes);
  }
  return new HtmlView(tag, new Children(children), attributes);
};

export default { create };
