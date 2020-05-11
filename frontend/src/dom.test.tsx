import { render } from '../testing/render';

describe('dom', () => {
  it('renders jsx with div and text content', () => {
    const container = render(<p>Hello, world</p>);
    expect(container).toHaveTextContent('Hello, world');
  });
});
