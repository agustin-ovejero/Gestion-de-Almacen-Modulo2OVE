import React, { useState } from 'react';
import {
  Home,
  Box,
  Book,
  MapPin,
  List,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EntradaSalida: React.FC = () => {
  const navigate = useNavigate();

  // Vista activa
  const [view, setView] = useState<'entrada' | 'salida'>('entrada');

  // --- Estados comunes para Entrada ---
  const [producto, setProducto] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [cantidad, setCantidad] = useState<number>(0);
  const [tipoCantidad, setTipoCantidad] = useState<
    'Pallet' | 'Bulto' | 'Unidad'
  >('Pallet');
  const [ubicacion, setUbicacion] = useState('');
  const [entradas, setEntradas] = useState<
    {
      producto: string;
      proveedor: string;
      cantidad: number;
      tipo: string;
      ubicacion: string;
    }[]
  >([]);

  // --- Estados para Salida ---
  const [cliente, setCliente] = useState('');
  const [salidas, setSalidas] = useState<
    {
      producto: string;
      cliente: string;
      cantidad: number;
      tipo: string;
      ubicacion: string;
    }[]
  >([]);

  // Registrar Entrada
  const registrarEntrada = () => {
    if (!producto || !proveedor || cantidad <= 0 || !ubicacion) return;

    const nuevaEntrada = {
      producto,
      proveedor,
      cantidad,
      tipo: tipoCantidad,
      ubicacion,
    };
    setEntradas([nuevaEntrada, ...entradas]);

    // Reset
    setProducto('');
    setProveedor('');
    setCantidad(0);
    setUbicacion('');
    setTipoCantidad('Pallet');
  };

  // Registrar Salida
  const registrarSalida = () => {
    if (!producto || !cliente || cantidad <= 0 || !ubicacion) return;

    const nuevaSalida = {
      producto,
      cliente,
      cantidad,
      tipo: tipoCantidad,
      ubicacion,
    };
    setSalidas([nuevaSalida, ...salidas]);

    // Reset
    setProducto('');
    setCliente('');
    setCantidad(0);
    setUbicacion('');
    setTipoCantidad('Pallet');
  };

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
          <button className="flex items-center space-x-2 bg-teal-600 w-full px-3 py-2 rounded">
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
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 rounded hover:bg-teal-600"
            onClick={() => navigate('/clientes_proveedores')}
          >
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

        {/* Tabs Entrada / Salida */}
        <div className="flex gap-6 mb-6">
          <button
            onClick={() => setView('entrada')}
            className={`text-lg font-semibold pb-1 ${
              view === 'entrada'
                ? 'text-[#0d5c63] border-b-4 border-[#0d5c63]'
                : 'text-gray-600'
            }`}
          >
            Entrada
          </button>
          <button
            onClick={() => setView('salida')}
            className={`text-lg font-semibold pb-1 ${
              view === 'salida'
                ? 'text-[#0d5c63] border-b-4 border-[#0d5c63]'
                : 'text-gray-600'
            }`}
          >
            Salida
          </button>
        </div>

        {/* Vista dinámica */}
        {view === 'entrada' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Formulario Entrada */}
            <div className="bg-white border border-green-500 rounded-lg shadow p-6">
              <h3 className="flex items-center gap-2 font-medium mb-4">
                <span className="text-green-600 text-xl">＋</span> Registro de
                Entrada
              </h3>

              <input
                type="text"
                placeholder="Nombre Producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className="w-full mb-3 border rounded-md px-3 py-2 outline-green-500"
              />
              <input
                type="text"
                placeholder="Proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                className="w-full mb-3 border rounded-md px-3 py-2 outline-green-500"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full mb-3 border rounded-md px-3 py-2 outline-green-500"
              />

              {/* Botones tipo cantidad */}
              <div className="flex gap-2 mb-3">
                {['Pallet', 'Bulto', 'Unidad'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() =>
                      setTipoCantidad(tipo as 'Pallet' | 'Bulto' | 'Unidad')
                    }
                    className={`px-4 py-1 border rounded-md ${
                      tipoCantidad === tipo
                        ? 'bg-[#0d5c63] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Ubicación (Depósito)"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full mb-4 border rounded-md px-3 py-2 outline-green-500"
              />

              <button
                onClick={registrarEntrada}
                className="w-full bg-[#0d5c63] text-white py-2 rounded-md hover:bg-[#09474d]"
              >
                Registrar Entrada
              </button>
            </div>

            {/* Últimas Entradas */}
            <div className="bg-white border rounded-lg shadow p-6">
              <h3 className="font-medium mb-4">Últimas Entradas</h3>
              <div className="flex flex-col gap-2">
                {entradas.length === 0 && (
                  <p className="text-sm text-gray-500">No hay registros aún.</p>
                )}
                {entradas.map((e, i) => (
                  <div key={i} className="p-2 border rounded-md bg-gray-50">
                    <p className="font-medium">{e.producto}</p>
                    <p className="text-sm text-gray-600">
                      {e.cantidad} {e.tipo} - {e.proveedor}
                    </p>
                    <p className="text-xs text-gray-500">
                      Ubicación: {e.ubicacion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'salida' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Formulario Salida */}
            <div className="bg-white border border-red-500 rounded-lg shadow p-6">
              <h3 className="flex items-center gap-2 font-medium mb-4">
                <span className="text-red-600 text-xl">－</span> Registro de
                Salida
              </h3>

              <input
                type="text"
                placeholder="Nombre Producto"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className="w-full mb-3 border rounded-md px-3 py-2 outline-red-500"
              />
              <input
                type="text"
                placeholder="Cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full mb-3 border rounded-md px-3 py-2 outline-red-500"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full mb-3 border rounded-md px-3 py-2 outline-red-500"
              />

              {/* Botones tipo cantidad */}
              <div className="flex gap-2 mb-3">
                {['Pallet', 'Bulto', 'Unidad'].map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() =>
                      setTipoCantidad(tipo as 'Pallet' | 'Bulto' | 'Unidad')
                    }
                    className={`px-4 py-1 border rounded-md ${
                      tipoCantidad === tipo
                        ? 'bg-[#0d5c63] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Ubicación (Depósito)"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full mb-4 border rounded-md px-3 py-2 outline-red-500"
              />

              <button
                onClick={registrarSalida}
                className="w-full bg-[#0d5c63] text-white py-2 rounded-md hover:bg-[#09474d]"
              >
                Registrar Salida
              </button>
            </div>

            {/* Últimas Salidas */}
            <div className="bg-white border rounded-lg shadow p-6">
              <h3 className="font-medium mb-4">Últimas Salidas</h3>
              <div className="flex flex-col gap-2">
                {salidas.length === 0 && (
                  <p className="text-sm text-gray-500">No hay registros aún.</p>
                )}
                {salidas.map((s, i) => (
                  <div key={i} className="p-2 border rounded-md bg-gray-50">
                    <p className="font-medium">{s.producto}</p>
                    <p className="text-sm text-gray-600">
                      {s.cantidad} {s.tipo} - {s.cliente}
                    </p>
                    <p className="text-xs text-gray-500">
                      Ubicación: {s.ubicacion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EntradaSalida;
