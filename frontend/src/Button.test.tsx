import { getByTestId } from '@testing-library/dom';
import { render } from '@utils/render';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders with text content', () => {
    const container = render(<Button textContent="test" />);

    expect(getByTestId(container, 'button')).toHaveTextContent('test');
  });
});
