import { Action } from './actions';

type Listener = (action: Action) => void;

class Dispatcher {
  private listeners: Listener[] = [];

  register(listener: Listener) {
    this.listeners.push(listener);
  }

  dispatch(action: Action) {
    for (const listener of this.listeners) {
      listener(action);
    }
  }
}

export const dispatcher = new Dispatcher();

