import {
  Home,
  Box,
  LogOut,
  Settings,
  Users,
  Book,
  MapPin,
  List,
  AlertTriangle,
  User2,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
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
          <button className="flex items-center space-x-2 bg-teal-600 w-full px-3 py-2 rounded">
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

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-semibold mb-5">Dashboard</h1>
          <div className="bg-white px-3 py-1 rounded-full flex items-center space-x-2 shadow">
            <div className="bg-teal-500 p-1 rounded-full flex">
              <User2 className="w-5 h-5 text-dark" />
            </div>
            <span className="text-gray-800 font-bold">Usuario1</span>
          </div>
        </header>

        {/* Cards resumen */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 h-30 rounded-lg shadow-blue-500 shadow">
            <span className="text-dark flex">
              Total Pallets
              <div className="bg-blue-400 p-1 rounded-full h-10 w-10 flex ml-15 items-center justify-center">
                <Box className="w-7 h-7 text-white justify-center" />
              </div>
            </span>
            <h2 className="text-3xl font-bold justify-self-start">2,803</h2>
            <span className="text-gray-700 flex text-sm">
              {' '}
              +12% desde el mes pasado{' '}
            </span>
          </div>
          <div className="bg-white p-4 h-30 rounded-lg shadow-yellow-500 shadow">
            <span className="text-dark flex">
              Ocupación
              <div className="bg-yellow-600 p-1 rounded-full h-10 w-10 flex ml-15 items-center justify-center">
                <ArrowUpRight className="w-7 h-7 text-white justify-center" />
              </div>
            </span>
            <h2 className="text-3xl font-bold justify-self-start">65%</h2>
            <span className="text-gray-700 flex text-sm">
              {' '}
              1,936 / 2,847 posiciones
            </span>
          </div>
          <div className="bg-white p-4 h-30 rounded-lg shadow-red-700 shadow">
            <span className="text-dark flex">
              Stock
              <div className="bg-red-700 p-1 rounded-full h-10 w-10 flex ml-15 items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-white justify-center" />
              </div>
            </span>
            <h2 className="text-3xl font-bold justify-self-start">3</h2>
            <span className="text-gray-700 flex text-sm">
              {' '}
              Productos necesitan revisión
            </span>
          </div>
          <div className="bg-white p-4 h-30 rounded-lg shadow-green-700 shadow">
            <span className="text-dark flex">
              Movimientos Hoy
              <div className="bg-green-700 p-1 rounded-full h-10 w-10 flex ml-15 items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white justify-center" />
              </div>
            </span>
            <h2 className="text-3xl font-bold justify-self-start">156</h2>
            <span className="text-gray-700 flex text-sm">
              {' '}
              89 entradas // 67 salidas
            </span>
          </div>
        </div>

        {/* Contenido inferior */}
        <div className="grid grid-cols-3 gap-4">
          {/* Informe de Ventas */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Informe de Ventas</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">
              [Gráfico aquí]
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="justify-self-start text-xl font-semibold mb-2">
              Actividad Reciente
            </h3>
            <ul className="justify-items-start space-y-2 text-sm">
              <li>✅ Proveedor Marcon entregó 25 pallets</li>
              <li>⚠️ Proyecto X sin stock</li>
              <li>➕ Se agregó cliente Martínez</li>
            </ul>
          </div>

          <div className="col-span-2 bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Informe de Ventas</h3>
            <div className="h-48 flex items-center justify-center text-gray-400">
              [Gráfico aquí]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
