type Listener<T = any> = (...args: T[]) => void

class EventEmitter {
  private events: { [key: string]: Listener[] } = {}

  on<T>(eventName: string, listener: Listener<T>): void {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    if (!this.events[eventName].includes(listener)) {
      this.events[eventName].push(listener)
    }
  }

  emit<T>(eventName: string, ...args: T[]): void {
    const listeners = this.events[eventName]
    if (listeners) {
      listeners.forEach((listener) => listener(...args))
    }
  }

  off<T>(eventName: string, listener: Listener<T>): void {
    const listeners = this.events[eventName]
    if (listeners) {
      this.events[eventName] = listeners.filter((l) => l !== listener)
    }
  }
}

export default EventEmitter
