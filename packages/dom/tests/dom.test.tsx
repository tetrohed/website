import { getByTestId, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render as domRender } from '../src/render';
import StateFactory, { State } from '../src/State';

type PropsWithState = {
  states: State[]
}

describe('dom', () => {
  it('renders jsx with div and text content', () => {
    const container = domRender(<p> Hello, world </p>);
    expect(container).toHaveTextContent('Hello, world');
  });

  it('renders jsx with functional component', () => {
    const FunctionalComponent = () => {
      return <div />;
    };
    const container = domRender(<FunctionalComponent />);

    expect(container).toBeTruthy();
  });

  it('renders jsx with functional component with text', () => {
    const FunctionalComponent = () => {
      return <div> some text</div>;
    };
    const container = domRender(<FunctionalComponent />);

    expect(container).toHaveTextContent('some text');
  });

  it('renders jsx with functional component and children', () => {
    const FunctionalComponent = () => {
      return (
        <div>
          <p>some text</p>
        </div>
      );
    };
    const container = domRender(<FunctionalComponent />);

    expect(container).toHaveTextContent('some text');
  });

  it('renders jsx with functional component and children as number', () => {
    const FunctionalComponent = () => {
      return <div />;
    };
    const func = (condition: boolean) => {
      return condition ? 3 : 0;
    };
    const container = domRender(
      <FunctionalComponent> {func(true)} </FunctionalComponent>
    );

    expect(container).toHaveTextContent('3');
  });

  it('renders jsx with functional component and boolean as children', () => {
    const FunctionalComponent = () => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent> {true} </FunctionalComponent>
    );

    expect(container).toHaveTextContent('true');
  });

  it('renders jsx with functional component and text as children', () => {
    const FunctionalComponent = () => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent> sometext </FunctionalComponent>
    );

    expect(container).toHaveTextContent('sometext');
  });

  it('renders jsx with functional component and object as children', () => {
    const FunctionalComponent = () => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent>
        {{ key: 'value', anotherKey: 'value' }}
      </FunctionalComponent>
    );

    expect(container).toHaveTextContent('{"key":"value","anotherKey":"value"}');
  });

  it('renders jsx with functional component and array as children', () => {
    const FunctionalComponent = () => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent>{['item1', 'item2']}</FunctionalComponent>
    );

    expect(container).toHaveTextContent('item1item2');
  });

  it('renders jsx with functional component and array of functional component as children', () => {
    const FunctionalComponent = () => {
      return <div />;
    };

    const items = [
      () => <FunctionalComponent />,
      () => <FunctionalComponent />,
    ];

    const container = domRender(
      <FunctionalComponent>{items.map((i) => i())}</FunctionalComponent>
    );

    expect(container).toBeTruthy();
  });

  it('renders jsx with functional component with attributes', () => {
    const FunctionalComponent = ({
      'data-testid': dataTestId,
    }: {
      'data-testid': string;
    }) => {
      return <div>{dataTestId}</div>;
    };

    const container = domRender(<FunctionalComponent data-testid="someid" />);

    expect(container).toHaveTextContent('someid');
  });

  it('renders jsx with div with data-testid attribute', () => {
    const container = domRender(<div data-testid="someid" />);

    expect(getByTestId(container, 'someid')).toBeTruthy();
  });

  it('renders jsx with div with multiple attributes', () => {
    const container = domRender(
      <div data-testid="someid" data-another="someOtherId" />
    );

    expect(getByTestId(container, 'someid')).toHaveAttribute(
      'data-another',
      'someOtherId'
    );
  });

  it('renders jsx with div with classNames', () => {
    const container = domRender(
      <div data-testid="someid" class="someClassName someOtherClassName" />
    );

    expect(getByTestId(container, 'someid')).toHaveClass('someClassName');
    expect(getByTestId(container, 'someid')).toHaveClass('someOtherClassName');
  });

  it('renders jsx with div with onClick listener', () => {
    const handleClick = jest.fn<void, [HTMLElement, MouseEvent]>();

    const container = domRender(<div data-testid="someid" click={handleClick} />);

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with state', () => {
    const FunctionalComponent = ({ states }: PropsWithState) => {
      const [clickState] = states;
      const handleClick = () => {
        clickState.set(2);
      };

      return (
        <div data-testid="someid" click={handleClick}>
          {clickState.get()}
        </div>
      );
    };

    const state = new StateFactory().create();

    const container = domRender(<FunctionalComponent states={[state]} />);

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container).toHaveTextContent('2');
  });

  it('renders with multiple states', () => {
    const FunctionalComponent = ({ states }: PropsWithState) => {
      const [clickState, irrelevantState] = states;
      const handleClick = () => {
        clickState.set(2);
      };

      return (
        <div data-testid="someid" click={handleClick}>
          {clickState.get()}
          {irrelevantState.get()}
        </div>
      );
    };

    const state1 = new StateFactory().create();
    const state2 = new StateFactory().create();

    const container = domRender(<FunctionalComponent states={[state1, state2]} />);

    expect(container).toHaveTextContent('00');

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container).toHaveTextContent('20');
  });
  // TODO test multiple functional components
  // TODO test multiple functional components as children
  // TODO unmount then update ( async stuff) (removing listener)
  // TODO unmount then update ( async stuff) (removing listener)
  // TODO reconciliation
});
