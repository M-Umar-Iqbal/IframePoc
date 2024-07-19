import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Analytics from './pages/analytics';
import Services from './pages/services';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
      <Route path="/" element={<Analytics />} />
      <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
}

export default App;