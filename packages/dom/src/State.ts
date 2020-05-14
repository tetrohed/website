export interface State {
  set(to: number): void;
  get(): number;
  addListener(listener: StateListener): void;
}

export interface StateListener {
  update(): void;
}

export class StateImp implements State {
  constructor() {}

  public addListener(listener: StateListener): void {
    this.listener_ = listener;
  }

  public set(to: number): void {
    this.state_ = to;
    this.listener_!.update();
  }
  public get(): number {
    return this.state_;
  }

  public toJSON() {
    return {
      state: this.state_,
    };
  }

  private state_: number = 0;
  private listener_?: StateListener;
}

export default class StateFactory {
  public create(): State {
    return new StateImp();
  }
}
