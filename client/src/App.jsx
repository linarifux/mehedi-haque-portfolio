import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Import Footer
import ArtworkGrid from './components/ArtworkGrid';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />
        
        {/* flex-grow pushes the footer to the bottom even if content is short */}
        <div className="grow">
          <Routes>
            <Route path="/" element={
              <>
                <header className="bg-gray-50 py-20 text-center px-4 border-b border-gray-100">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                    The Art of Mehedi Haque
                  </h2>
                  <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                     A digital archive spanning 20+ years of cartoons, comics, and satire.
                  </p>
                </header>
                <main>
                  <ArtworkGrid />
                </main>
              </>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;