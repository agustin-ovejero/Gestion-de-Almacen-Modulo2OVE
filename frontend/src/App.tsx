import { HashRouter, Routes, Route, Link } from 'react-router-dom';

const HomePage = () => <h2>Dashboard Principal</h2>;
const MapPage = () => <h2>Mapa de Ubicaciones</h2>;
const NotFoundPage = () => <h2>404 - Página no encontrada</h2>;

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Módulo de Gestión de Almacén</h1>
        <nav style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>
            Dashboard
          </Link>
          <Link to="/map">Mapa</Link>
          <li>aaa</li>
        </nav>

        <main style={{ paddingTop: '20px' }}>
          {/* Aquí se renderizará el componente de la página actual */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
