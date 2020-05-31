import { render } from './render';
import { getByTestId, getByText } from '@testing-library/dom';
import { ComingSoon } from './ComingSoon';

describe('<ComingSoon/>', () => {
  it('renders without crashing', () => {
    const container = render(<ComingSoon />);
    expect(getByTestId(container, 'ComingSoon')).toBeTruthy();
  });

  it('renders coming soon text', () => {
    const container = render(<ComingSoon />);
    expect(getByText(container, 'Coming Soon!')).toBeTruthy();
  });
});
