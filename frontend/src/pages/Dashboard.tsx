import React, { useEffect, useState, useCallback } from 'react';
import { cargarDatosDashboard, agregarMovimiento } from '../utils/api';
import type { DashboardData } from '../types';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Ícono de tendencia
  const renderTrendIcon = (tendencia: 'arriba' | 'abajo' | 'estable') => {
    switch (tendencia) {
      case 'arriba':
        return <span className="text-green-500">↗</span>;
      case 'abajo':
        return <span className="text-red-500">↘</span>;
      default:
        return <span className="text-gray-500">→</span>;
    }
  };

  // Cargar datos del dashboard
  const cargarDatos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cargarDatosDashboard();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  // Manejar adición de movimientos
  const manejarAgregarMovimiento = async (
    tipo: 'entrada' | 'salida',
    producto: string,
    cantidad: number
  ) => {
    try {
      const data = await agregarMovimiento(tipo, producto, cantidad);
      setDashboardData(data);
      return data;
    } catch (error) {
      console.error('Error al agregar movimiento:', error);
      setError('Error al agregar el movimiento');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Cargando datos del dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>

        {/* Panel de pruebas - Solo visible en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Modo Pruebas
                </h3>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() =>
                      manejarAgregarMovimiento(
                        'entrada',
                        'Producto de Prueba',
                        10
                      )
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    + Entrada (10)
                  </button>
                  <button
                    onClick={() =>
                      manejarAgregarMovimiento(
                        'salida',
                        'Producto de Prueba',
                        5
                      )
                    }
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    - Salida (5)
                  </button>
                  <button
                    onClick={() => cargarDatos()}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    ↻ Recargar Datos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estado actual de las métricas (solo para depuración) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Estado Actual:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white p-3 rounded shadow">
              <div className="text-gray-500 text-xs">Movimientos Hoy</div>
              <div className="font-bold">{dashboardData.movimientosHoy}</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-gray-500 text-xs">Stock Total</div>
              <div className="font-bold">{dashboardData.stockTotal} u.</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-gray-500 text-xs">Ocupación</div>
              <div className="font-bold">{dashboardData.ocupacionAlmacen}%</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-gray-500 text-xs">Tendencia</div>
              <div className="font-bold">
                {dashboardData.tendenciaOcupacion}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">
              Total de Pallets
            </h3>
            <div className="text-blue-500">📦</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.totalPallets}
            </div>
            <div className="flex items-center text-green-500 text-sm">
              +2.5% <span className="ml-1">↑</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">
              Ocupación del Almacén
            </h3>
            <div className="text-green-500">🏭</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.ocupacionAlmacen}%
            </div>
            <div className="flex items-center text-sm">
              {renderTrendIcon(dashboardData.tendenciaOcupacion)}
              <span
                className={`ml-1 ${dashboardData.tendenciaOcupacion === 'arriba' ? 'text-green-500' : dashboardData.tendenciaOcupacion === 'abajo' ? 'text-red-500' : 'text-gray-500'}`}
              >
                {dashboardData.porcentajeCambio}%
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${dashboardData.ocupacionAlmacen}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">Stock Total</h3>
            <div className="text-yellow-500">📊</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.stockTotal}
            </div>
            <div className="text-sm text-gray-500">unidades</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 text-sm font-medium">
              Movimientos Hoy
            </h3>
            <div className="text-purple-500">🔄</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-800">
              {dashboardData.movimientosHoy}
            </div>
            <div className="text-sm text-gray-500">operaciones</div>
          </div>
        </div>
      </div>

      {/* Gráfico de movimientos por día */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Movimientos por Día
          </h2>
          <div className="text-gray-500">📅</div>
        </div>
        <div className="h-64">
          <div className="flex items-end h-48">
            {dashboardData.movimientosPorDia.slice(-7).map((dia, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center mx-1"
              >
                <div className="text-xs text-gray-500 mb-1">
                  {new Date(dia.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>
                <div className="w-full flex justify-center space-x-1 h-full">
                  <div
                    className="bg-green-500 w-4 rounded-t"
                    style={{ height: `${(dia.entradas / 20) * 100}%` }}
                    title={`${dia.entradas} entradas`}
                  ></div>
                  <div
                    className="bg-red-500 w-4 rounded-t"
                    style={{ height: `${(dia.salidas / 20) * 100}%` }}
                    title={`${dia.salidas} salidas`}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {dia.entradas + dia.salidas}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">Entradas</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">Salidas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Actividad Reciente
          </h2>
          <div className="text-gray-500">📅</div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {dashboardData.actividadReciente.map((movimiento) => (
            <div
              key={movimiento.id}
              className={`p-4 mb-2 rounded-lg border ${
                movimiento.tipo === 'entrada'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-800">
                    {movimiento.tipo === 'entrada' ? 'Entrada' : 'Salida'} de{' '}
                    {movimiento.cantidad} unidades
                  </div>
                  <div className="text-sm text-gray-600">
                    Producto: {movimiento.producto} •{' '}
                    {formatDate(movimiento.fecha)}
                  </div>
                </div>
                <div
                  className={`text-lg font-bold ${
                    movimiento.tipo === 'entrada'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {movimiento.tipo === 'entrada' ? '+' : '-'}
                  {movimiento.cantidad}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
