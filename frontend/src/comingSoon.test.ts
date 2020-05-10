import { render } from '../testing/render';
import { getByTestId } from '@testing-library/dom';
import { comingSoon } from './comingSoon';

describe('comingSoon', () => {
  it('renders without crashing', () => {
    const { element } = comingSoon({});
    const container = render(element);
    expect(getByTestId(container, 'comingSoon')).toBeTruthy();
  });

  it('renders coming soon text', () => {
    const { element } = comingSoon({});
    const container = render(element);
    expect(getByTestId(container, 'comingSoon')).toHaveTextContent(
      'Coming Soon!'
    );
  });
});
