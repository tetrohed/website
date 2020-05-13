import { render } from '../testing/render';
import { getByTestId } from '@testing-library/dom';
import { ComingSoon } from './ComingSoon';

describe('comingSoon', () => {
  it('renders without crashing', () => {
    const container = render(<ComingSoon />);
    expect(getByTestId(container, 'comingSoon')).toBeTruthy();
  });

  it('renders coming soon text', () => {
    const container = render(<ComingSoon />);
    expect(getByTestId(container, 'comingSoon')).toHaveTextContent(
      'Coming Soon!'
    );
  });
});
