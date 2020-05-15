export interface State {
  set(to: number): void;
  get(): number;
  addListener(listener: StateListener): void;
}

export interface StateListener {
  update(): void;
}

export class StateImp implements State {
  public addListener(listener: StateListener): void {
    this.listener_.push(listener);
  }

  public set(to: number): void {
    this.state_ = to;
    this.listener_.forEach((l) => l.update());
  }

  public get(): number {
    return this.state_;
  }

  private state_ = 0;

  private listener_: StateListener[] = [];
}

export default class StateFactory {
  public create(): State {
    return new StateImp();
  }
}
