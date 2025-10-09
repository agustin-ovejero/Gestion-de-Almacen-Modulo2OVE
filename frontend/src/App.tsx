import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventario';
import Reportes from './pages/Reportes';
import Entrada from './pages/Entrada_Salida';
import ClientesProveedores from './pages/Clientes_proveedores';
import Almacen from './pages/Almacen';
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/entrada_salida" element={<Entrada />} />
            <Route
              path="/clientes_proveedores"
              element={<ClientesProveedores />}
            />
            <Route path="/almacen" element={<Almacen />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
