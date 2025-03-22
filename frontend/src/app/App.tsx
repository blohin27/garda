import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FC } from 'react'
import { Home } from '../pages'
import { Provider } from 'react-redux'
import { store } from '../store'

export const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/products" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  )
}
