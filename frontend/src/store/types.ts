import { store } from './store.ts'

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
