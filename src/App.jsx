import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/suryaaBookWebsite">
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
