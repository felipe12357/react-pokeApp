import './App.scss'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routing'
import { ContextAPIGlobalProvider } from './context/GlobalContext'

function App() {

  return (
    <>
      <ContextAPIGlobalProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ContextAPIGlobalProvider>
    </>
  )
}

export default App
