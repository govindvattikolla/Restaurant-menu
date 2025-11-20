import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/menu.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
