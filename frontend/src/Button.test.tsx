import { getByTestId, fireEvent } from '@testing-library/dom';
import { render } from '@utils/render';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders with text content', () => {
    const container = render(<Button textContent="test" />);

    expect(getByTestId(container, 'button')).toHaveTextContent('test');
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();

    const container = render(
      <Button textContent="test" onClick={handleClick} />
    );

    fireEvent(
      getByTestId(container, 'button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenCalled();
  });

  it('does not crash if onClick is not provided', () => {
    const container = render(<Button textContent="test" />);

    fireEvent(
      getByTestId(container, 'button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container).toBeTruthy();
  });
});
