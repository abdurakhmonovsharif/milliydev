import { NextUIProvider } from '@nextui-org/react'
import { store } from "./redux/store"
import { Provider } from "react-redux"
import Route from "./Route"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <Provider store={store}>
      <NextUIProvider>
        <Route />
        <ToastContainer />
      </NextUIProvider>
    </Provider>
  )
}

export default App
