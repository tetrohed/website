type Tag = 'div';
type Attribute = string;

const create = (
  tag: Tag,
  attributes: Attribute[],
  ...children: any[]
): WebApplication.Node => {
  // TODO Custom Components will be functions
  const fragments = document.createDocumentFragment();
  const element = document.createElement(tag);
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
