import {NextUIProvider} from '@nextui-org/react'
import { store } from "./redux/store"
import { Provider} from "react-redux"
import Route from "./Route"
const App = () => {
  return (
    <Provider store={store}>
      <NextUIProvider>
       <Route/>
      </NextUIProvider>
    </Provider>
  )
}

export default App
