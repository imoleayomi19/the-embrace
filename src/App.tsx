import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
// import { HelmetProvider } from 'react-helmet-async';
import { Cart } from './pages/Cart';
import { LandingPage } from './pages/LandingPage';

// Inner component so we can use useLocation inside Router context
function AppShell() {
  const { pathname } = useLocation();
  const isLandingPage = pathname === '/landing';

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hide main nav & footer on the ad landing page */}
      {!isLandingPage && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          {/* Ad landing page — not in main menu, noindex */}
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </div>
      {!isLandingPage && <WhatsAppButton />}
      {!isLandingPage && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <Router>
        <AppShell />
      </Router>
    </CartProvider>
  );
}