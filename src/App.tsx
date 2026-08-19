import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Blog, BlogPost } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';

export function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              {/* <Route path="/shop" element={<Shop />} /> */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <WhatsAppButton />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}