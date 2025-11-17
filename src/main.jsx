import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Menu from './components/menu'

// import RestaurantMenu from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RestaurantMenu/> */}
    <Menu/>
  </StrictMode>,
)
