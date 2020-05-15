import { getByTestId, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { render as domRender } from '../src/render';
import StateFactory, { State, StateListener } from '../src/State';
import { View } from '../src';

type PropsWithState = {
  states: State[];
};

describe('dom', () => {
  it('renders jsx with div and text content', () => {
    const container = domRender(<p> Hello, world </p>);
    expect(container).toHaveTextContent('Hello, world');
  });

  it('renders jsx with functional component', () => {
    const FunctionalComponent = (): View => {
      return <div />;
    };
    const container = domRender(<FunctionalComponent />);

    expect(container).toBeTruthy();
  });

  it('renders jsx with functional component with text', () => {
    const FunctionalComponent = (): View => {
      return <div> some text</div>;
    };
    const container = domRender(<FunctionalComponent />);

    expect(container).toHaveTextContent('some text');
  });

  it('renders jsx exactly one time', () => {
    let times = 0;
    const FunctionalComponent = (): View => {
      times += 1;
      return <div> some text</div>;
    };
    domRender(<FunctionalComponent />);

    expect(times).toEqual(1);
  });

  it('renders jsx with functional component and children', () => {
    const FunctionalComponent = (): View => {
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
    const FunctionalComponent = (): View => {
      return <div />;
    };
    const func = (condition: boolean): number => {
      return condition ? 3 : 0;
    };
    const container = domRender(
      <FunctionalComponent> {func(true)} </FunctionalComponent>
    );

    expect(container).toHaveTextContent('3');
  });

  it('renders jsx with functional component and boolean as children', () => {
    const FunctionalComponent = (): View => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent> {true} </FunctionalComponent>
    );

    expect(container).toHaveTextContent('true');
  });

  it('renders jsx with functional component and text as children', () => {
    const FunctionalComponent = (): View => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent> sometext </FunctionalComponent>
    );

    expect(container).toHaveTextContent('sometext');
  });

  it('renders jsx with functional component and object as children', () => {
    const FunctionalComponent = (): View => {
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
    const FunctionalComponent = (): View => {
      return <div />;
    };

    const container = domRender(
      <FunctionalComponent>{['item1', 'item2']}</FunctionalComponent>
    );

    expect(container).toHaveTextContent('item1item2');
  });

  it('renders jsx with functional component and array of functional component as children', () => {
    const FunctionalComponent = (): View => {
      return <div />;
    };

    const items = [
      (): View => <FunctionalComponent />,
      (): View => <FunctionalComponent />,
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
    }): View => {
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

    const container = domRender(
      <div data-testid="someid" click={handleClick} />
    );

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with changing state', () => {
    const FunctionalComponent = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      const [clickState] = states;
      clickState.addListener(listener);

      const handleClick = (): void => {
        clickState.set(clickState.get() + 1);
      };

      return (
        <div
          data-testid="someid"
          click={handleClick}
          aria-label={clickState.get()}
        >
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

    expect(container).toHaveTextContent('1');

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
    const FunctionalComponent = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      const [clickState, irrelevantState] = states;
      states.forEach((s) => s.addListener(listener));

      const handleClick = (): void => {
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

    const container = domRender(
      <FunctionalComponent states={[state1, state2]} />
    );

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

  it('renders parent with child after state change', () => {
    const Child = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      const [clickState] = states;
      clickState.addListener(listener);

      const handleClick = (): void => {
        clickState.set(2);
      };

      return (
        <div data-testid="someid" click={handleClick}>
          {'childState' + clickState.get()}
        </div>
      );
    };

    const Parent = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      const [clickState] = states;
      clickState.addListener(listener);

      return <Child states={states}>{'parentState' + clickState.get()}</Child>;
    };

    const state = new StateFactory().create();

    const container = domRender(<Parent states={[state]} />);

    expect(container).toHaveTextContent('childState0');
    expect(container).toHaveTextContent('parentState0');

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(container).toHaveTextContent('childState2');
    expect(container).toHaveTextContent('parentState2');
  });

  it('renders state updates in siblings', () => {
    const FunctionalComponent = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      const [clickState] = states;
      clickState.addListener(listener);

      const handleClick = (): void => {
        clickState.set(2);
      };

      return (
        <div data-testid="someid" click={handleClick}>
          {clickState.get()}
        </div>
      );
    };

    const AnotherComponents = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      const [clickState] = states;
      clickState.addListener(listener);

      const handleClick = (): void => {
        clickState.set(3);
      };

      return (
        <div data-testid="anotherId" click={handleClick}>
          {clickState.get()}
        </div>
      );
    };

    const state = new StateFactory().create();

    const container = domRender(
      <div>
        <FunctionalComponent states={[state]} />
        <AnotherComponents states={[state]} />
      </div>
    );

    expect(getByTestId(container, 'anotherId')).toHaveTextContent('0');

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByTestId(container, 'anotherId')).toHaveTextContent('2');

    fireEvent(
      getByTestId(container, 'anotherId'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByTestId(container, 'anotherId')).toHaveTextContent('3');
    expect(getByTestId(container, 'anotherId')).not.toHaveTextContent('2');
    expect(getByTestId(container, 'someid')).toHaveTextContent('3');
    expect(getByTestId(container, 'someid')).not.toHaveTextContent('2');
  });

  it('rerenders child after state change, does not rerender stateless parent', () => {
    let childRenderTimes = 0;
    const Child = (
      { states }: PropsWithState,
      listener: StateListener
    ): void => {
      childRenderTimes += 1;
      const [clickState] = states;
      clickState.addListener(listener);
      const handleClick = (): void => {
        clickState.set(2);
      };

      return (
        <div data-testid="someid" click={handleClick}>
          {clickState.get()}
        </div>
      );
    };

    let parentRenderTimes = 0;
    const Parent = ({ states }: PropsWithState): View => {
      parentRenderTimes += 1;
      return <Child states={states} />;
    };

    const state = new StateFactory().create();

    const container = domRender(<Parent states={[state]} />);

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(parentRenderTimes).toEqual(1);
    expect(childRenderTimes).toEqual(2);
  });

  it('renders parent with child and grandchildren after state change', () => {
    let grandChildRenderTimes = 0;
    const GrandChild = (
      { states }: PropsWithState,
      listener: StateListener
    ): View => {
      grandChildRenderTimes += 1;
      const [clickState] = states;
      clickState.addListener(listener);
      const handleClick = (): void => {
        clickState.set(2);
      };

      return (
        <div data-testid="someid" click={handleClick}>
          {clickState.get()}
        </div>
      );
    };

    let childRenderTimes = 0;
    const Child = ({ states }: PropsWithState): View => {
      childRenderTimes += 1;
      return <GrandChild states={states} />;
    };

    let parentRenderTimes = 0;
    const Parent = ({ states }: PropsWithState): View => {
      parentRenderTimes += 1;
      return <Child states={states} />;
    };

    const state = new StateFactory().create();

    const container = domRender(<Parent states={[state]} />);

    fireEvent(
      getByTestId(container, 'someid'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(parentRenderTimes).toEqual(1);
    expect(childRenderTimes).toEqual(1);
    expect(grandChildRenderTimes).toEqual(2);
  });

  // TODO unmount then update ( async stuff) (removing listener)
  // TODO unmount then update ( async stuff) (removing listener)
  // TODO reconciliation
});
