import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import ProductCategories from "./pages/ProductCategories";
import Profil from "./pages/Profil";
import ProductsByCategory from "./pages/ProductsByCategory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NewNavbar from "./components/NewNavbar";
import Stock from "./pages/Stock";
import Occasion from "./pages/Occasion";


const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <NewNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/productcategories" element={<ProductCategories />} />
          <Route path="/category/:id" element={<ProductsByCategory />} />
          <Route path="/productpage/:id" element={<ProductPage />} />

          <Route path="/profil" element={<Profil />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/occas/" element={<Occasion />} />
          {/* <Route path="/stock/" element={<Stock />} /> */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
