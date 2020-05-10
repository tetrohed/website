import { getByTestId } from '@testing-library/dom';
import { button } from './button';
import { render } from '../testing/render';

describe('button', () => {
  it('renders with text content', () => {
    const container = render(button({ textContent: 'test' }).element);

    expect(getByTestId(container, 'button')).toHaveTextContent('test');
  });
});
