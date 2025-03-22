import { Canceler } from 'axios'

export class QueryRace {
  public queryRace: Map<string, Canceler> = new Map()
  private readonly _message: string

  constructor(message: string = 'Race condition canceled') {
    this._message = message
  }

  public apply = (endpoint: string, cancel: Canceler) => {
    this.cancel(endpoint)
    this.queryRace.set(endpoint, cancel)
  }

  public has = (endpoint: string) => this.queryRace.has(endpoint)

  public cancel = (endpoint: string) => {
    if (this.has(endpoint)) {
      this.queryRace.get(endpoint)?.(this._message)
      this.delete(endpoint)
    }
  }

  public delete = (endpoint: string) => {
    this.queryRace.delete(endpoint)
  }
}
