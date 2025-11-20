import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/menu.jsx";
import ItemPage from "./pages/ItemPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
