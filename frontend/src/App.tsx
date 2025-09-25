import { HashRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventario';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Módulo de Gestión de Almacén</h1>
        {/* <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/login">Login</Link>
        </nav> */}

        <main style={{ paddingTop: '20px' }}>
          {/* Aquí se renderizará el componente de la página actual */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
