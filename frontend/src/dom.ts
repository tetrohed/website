type Tag = keyof JSX.IntrinsicElements;
type Attribute = string;
// TODO move to own library local package
const create = (
  tag: Tag,
  attributes: Attribute[],
  // TODO only accept WebApplication.node or string here types here
  ...children: any[]
): WebApplication.Node => {
  // TODO Custom Components will be functions
  const fragments = document.createDocumentFragment();
  const element = document.createElement(tag);
  console.log(tag, attributes, children);
  children.forEach((child) => {
    if (child instanceof HTMLElement) {
      fragments.appendChild(child);
    } else if (typeof child === 'string') {
      const textNode = document.createTextNode(child);
      fragments.appendChild(textNode);
    } else {
      console.log('not appendable', child);
    }
  });
  element.appendChild(fragments);
  Object.assign(element, attributes);

  return {
    element,
  };
};

export default { create };
