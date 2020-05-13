import { render } from '@utils/render';
import { getByTestId, fireEvent } from '@testing-library/dom';
import { Navigation, NavigationItem } from './Navigation';

describe('<Navigation />', () => {
  it('renders without crashing', () => {
    const container = render(<Navigation onClick={jest.fn()} />);
    expect(getByTestId(container, 'navigation')).toBeTruthy();
  });

  it('clicks on Home', () => {
    const handleClick = jest.fn();
    const container = render(<Navigation onClick={handleClick} />);

    fireEvent(
      getByTestId(container, 'button-Home'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenNthCalledWith(1, NavigationItem.Home);
  });

  it('clicks on coming soon', () => {
    const handleClick = jest.fn();
    const container = render(<Navigation onClick={handleClick} />);

    fireEvent(
      getByTestId(container, 'button-Coming Soon'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenNthCalledWith(1, NavigationItem.ComingSoon);
  });

  it('clicks on App', () => {
    const handleClick = jest.fn();
    const container = render(<Navigation onClick={handleClick} />);

    fireEvent(
      getByTestId(container, 'button-App'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenNthCalledWith(1, NavigationItem.App);
  });
});
