import { useState } from 'react';
import {
  Home,
  Box,
  LogOut,
  Settings,
  Users,
  Book,
  MapPin,
  List,
  FileText,
  Filter,
  ClipboardList,
  Bell,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
  const [tipoReporte, setTipoReporte] = useState('Movimientos');
  const navigate = useNavigate();
  const handleLogout = () => {
    // Aquí podrías limpiar el estado global si lo tuvieras
    navigate('/login');
  };
  const handleReporteChange = (tipo: string) => {
    setTipoReporte(tipo);
  };

  return (
    <div className="flex h-screen bg-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-color text-white flex flex-col">
        <div className="p-4 font-bold text-lg border-b border-teal-700">
          WMS Pallets <br />
          <span className="text-sm font-light">Sistema de Gestión</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600"
            onClick={() => navigate('/dashboard')}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600"
            onClick={() => navigate('/inventario')}
          >
            <Box className="w-5 h-5" />
            <span>Inventario</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600"
            onClick={() => navigate('/entrada_salida')}
          >
            <Book className="w-5 h-5" />
            <span>Entrada/ Salida</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
            <MapPin className="w-5 h-5" />
            <span>Almacén</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-teal-600 w-full px-3 py-2 rounded"
            onClick={() => navigate('/reportes')}
          >
            <List className="w-5 h-5" />
            <span>Reportes</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600"
            onClick={() => navigate('/clientes_proveedores')}
          >
            <Users className="w-5 h-5" />
            <span>Clientes/prov</span>
          </button>
        </nav>

        <div className="p-4 space-y-2 border-t border-teal-700">
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-700">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        {/* Usuario */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            <span className="text-sm">Usuario1</span>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-semibold mb-4">Reportes</h2>

        {/* Generar Reporte */}
        <div className="bg-white border rounded-lg shadow p-4 mb-4">
          <h3 className="font-medium mb-3">Generar un Nuevo Reporte</h3>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => handleReporteChange('Movimientos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                tipoReporte === 'Movimientos'
                  ? 'bg-[#0d5c63] text-white'
                  : 'bg-gray-100'
              }`}
            >
              <ClipboardList size={18} /> Movimientos
            </button>
            <button
              onClick={() => handleReporteChange('Inventario')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                tipoReporte === 'Inventario'
                  ? 'bg-[#0d5c63] text-white'
                  : 'bg-gray-100'
              }`}
            >
              <FileText size={18} /> Inventario
            </button>
            <button
              onClick={() => handleReporteChange('Ocupación')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                tipoReporte === 'Ocupación'
                  ? 'bg-[#0d5c63] text-white'
                  : 'bg-gray-100'
              }`}
            >
              <FileText size={18} /> Ocupación
            </button>
            <button
              onClick={() => handleReporteChange('Alertas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                tipoReporte === 'Alertas'
                  ? 'bg-[#0d5c63] text-white'
                  : 'bg-gray-100'
              }`}
            >
              <Bell size={18} /> Alertas
            </button>
          </div>
          <button className="bg-[#0d5c63] text-white px-4 py-2 rounded-md float-right">
            Agregar Reporte
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white border rounded-lg shadow p-4 mb-4">
          <h3 className="font-medium mb-3">Filtros de Búsqueda</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Tipo de Reporte"
              className="border rounded-md px-3 py-2 w-1/4"
            />
            <input type="date" className="border rounded-md px-3 py-2 w-1/4" />
            <input type="date" className="border rounded-md px-3 py-2 w-1/4" />
            <button className="flex items-center gap-2 bg-[#0d5c63] text-white px-4 py-2 rounded-md">
              <Filter size={18} /> Filtrar
            </button>
          </div>
        </div>

        {/* Historial */}
        <div className="bg-white border rounded-lg shadow p-4">
          <h3 className="font-medium mb-3">Historial de Reportes</h3>
          <div className="flex flex-col gap-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
