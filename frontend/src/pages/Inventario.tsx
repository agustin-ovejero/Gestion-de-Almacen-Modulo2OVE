import {
  Home,
  Box,
  LogOut,
  Settings,
  Users,
  Book,
  MapPin,
  List,
  User2,
} from 'lucide-react';
import { FiSearch, FiFilter, FiDownload, FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Componente para un item de la barra de navegación
export default function Inventario() {
  const navigate = useNavigate();
  const inventoryData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const handleLogout = () => {
    // Aquí podrías limpiar el estado global si lo tuvieras
    navigate('/login');
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
          <button className="flex items-center space-x-2 bg-teal-600 w-full px-3 py-2 rounded">
            <Box className="w-5 h-5" />
            <span>Inventario</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
            <Book className="w-5 h-5" />
            <span>Entrada/ Salida</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
            <MapPin className="w-5 h-5" />
            <span>Almacén</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
            <List className="w-5 h-5" />
            <span>Reportes</span>
          </button>
          <button className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600">
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

      {/* Contenido Principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-semibold mb-5">Inventario</h1>
          <div className="bg-white px-3 py-1 rounded-full flex items-center space-x-2 shadow">
            <div className="bg-teal-500 p-1 rounded-full flex">
              <User2 className="w-5 h-5 text-dark" />
            </div>
            <span className="text-gray-800 font-bold">Usuario1</span>
          </div>
        </header>

        {/* Área de Contenido */}
        <div className="flex-1 p-8">
          {/* Selector de Depósito */}
          <div className="mb-4 justify-self-start">
            <div className="relative inline-block w-64">
              <select
                defaultValue="deposito"
                className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm"
              >
                <option value="deposito">Depósito</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>

          {/* Filtros de Búsqueda */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4 justify-self-start">
              Filtros de Búsqueda
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Buscar por producto o almacén"
                  className="w-full bg-gray-100 border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button className="flex items-center bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                <FiFilter className="mr-2" />
                Buscar
              </button>
            </div>
          </div>

          {/* Lista de Inventario */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-700">
                Lista de Inventario
              </h2>
              <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                <FiDownload className="mr-2" />
                Descargar todo
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Producto</th>
                    <th className="p-3">Cantidad</th>
                    <th className="p-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 h-14">
                      <td className="p-3">
                        <div className="bg-gray-200 h-6 rounded-md"></div>
                      </td>
                      <td className="p-3">
                        <div className="bg-gray-200 h-6 rounded-md"></div>
                      </td>
                      <td className="p-3">
                        <div className="bg-gray-200 h-6 rounded-md"></div>
                      </td>
                      <td className="p-3">
                        <div className="bg-gray-200 h-6 rounded-md"></div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-4">
                          <button className="text-gray-500 hover:text-blue-600 transition-colors">
                            <FiEdit size={20} />
                          </button>
                          <button className="text-gray-500 hover:text-green-600 transition-colors">
                            <FiDownload size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
