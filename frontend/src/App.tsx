import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Módulo de Gestión de Almacén</h1>
        <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/login">Login</Link>
        </nav>

        <main style={{ paddingTop: '20px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
