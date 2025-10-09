import React from 'react';
import {
  Home,
  Box,
  Book,
  MapPin,
  List,
  Users,
  Settings,
  LogOut,
  Filter,
  Plus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientesProveedores: React.FC = () => {
  const navigate = useNavigate();

  const clientes = Array.from({ length: 10 }).map(() => ({
    nombre: 'Marcos br SRL',
    documento: '45024624',
    direccion: 'calle fake 123',
    telefono: '1122334455',
    email: 'mail.com',
    tipo: 'Cliente',
  }));

  const handleLogout = () => {
    console.log('Cerrar sesión');
    // lógica logout
  };

  return (
    <div className="flex h-screen bg-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-color text-white flex flex-col">
        <div className="p-4 font-bold text-lg border-b border-teal-600">
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
            onClick={() => navigate('/entrada-salida')}
          >
            <Book className="w-5 h-5" />
            <span>Entrada/ Salida</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
            <MapPin className="w-5 h-5" />
            <span>Almacén</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600"
            onClick={() => navigate('/reportes')}
          >
            <List className="w-5 h-5" />
            <span>Reportes</span>
          </button>
          <button className="flex items-center space-x-2 bg-teal-600 w-full px-3 py-2 rounded">
            <Users className="w-5 h-5" />
            <span>Clientes/prov</span>
          </button>
        </nav>

        <div className="p-4 space-y-2 border-t border-teal-600">
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
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

      {/* Contenido */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Usuario */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            <span className="text-sm">Usuario1</span>
          </div>
        </div>

        {/* Título */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Listado de Clientes/proveedores
          </h1>
          <button className="flex items-center gap-1 bg-[#0d5c63] text-white px-4 py-2 rounded-md hover:bg-[#09474d]">
            <Plus className="w-4 h-4" />
            Crear nuevo C/P
          </button>
        </div>

        {/* Botón Filtrar */}
        <button className="flex items-center gap-2 bg-[#0d5c63]/10 text-[#0d5c63] px-4 py-2 rounded-md mb-4 hover:bg-[#0d5c63]/20">
          <Filter className="w-4 h-4" />
          Filtrar
        </button>

        {/* Tabla */}
        <div className="bg-white border rounded-lg shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border-b">Nombre/Razón social</th>
                <th className="p-2 border-b">Documento</th>
                <th className="p-2 border-b">Dirección</th>
                <th className="p-2 border-b">Teléfono</th>
                <th className="p-2 border-b">Email</th>
                <th className="p-2 border-b">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c, i) => (
                <tr
                  key={i}
                  className={`hover:bg-gray-50 ${
                    i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                  }`}
                >
                  <td className="p-2 border-b">{c.nombre}</td>
                  <td className="p-2 border-b">{c.documento}</td>
                  <td className="p-2 border-b">{c.direccion}</td>
                  <td className="p-2 border-b">{c.telefono}</td>
                  <td className="p-2 border-b">{c.email}</td>
                  <td className="p-2 border-b">{c.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="p-3 text-center text-sm text-gray-500">1 ... 10</div>
        </div>
      </main>
    </div>
  );
};

export default ClientesProveedores;
