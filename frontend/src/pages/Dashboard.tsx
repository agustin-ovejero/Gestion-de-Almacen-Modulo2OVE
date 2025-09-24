import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Tipos para TypeScript
type Movimiento = {
  id: number;
  tipo: 'entrada' | 'salida';
  producto: string;
  cantidad: number;
  fecha: string;
  usuario: string;
};

type Metrica = {
  titulo: string;
  valor: number | string;
  icono: string;
  color: string;
  tendencia?: 'arriba' | 'abajo' | 'neutro';
  porcentaje?: string;
};

const Dashboard: React.FC = () => {
  // Datos mockeados
  const [movimientos] = useState<Movimiento[]>([
    {
      id: 1,
      tipo: 'entrada',
      producto: 'Producto A',
      cantidad: 10,
      fecha: '2025-09-24 10:30:00',
      usuario: 'usuario1',
    },
    {
      id: 2,
      tipo: 'salida',
      producto: 'Producto B',
      cantidad: 5,
      fecha: '2025-09-24 09:15:00',
      usuario: 'usuario2',
    },
    {
      id: 3,
      tipo: 'entrada',
      producto: 'Producto C',
      cantidad: 20,
      fecha: '2025-09-23 16:45:00',
      usuario: 'usuario1',
    },
    {
      id: 4,
      tipo: 'salida',
      producto: 'Producto A',
      cantidad: 8,
      fecha: '2025-09-23 14:20:00',
      usuario: 'usuario3',
    },
    {
      id: 5,
      tipo: 'entrada',
      producto: 'Producto B',
      cantidad: 15,
      fecha: '2025-09-22 11:10:00',
      usuario: 'usuario2',
    },
  ]);

  // Datos para las tarjetas de métricas
  const [metricas] = useState<Metrica[]>([
    {
      titulo: 'Total de Pallets',
      valor: '245',
      icono: '📦',
      color: 'bg-blue-100 text-blue-600',
      tendencia: 'arriba',
      porcentaje: '12%',
    },
    {
      titulo: 'Ocupación del Almacén',
      valor: '78%',
      icono: '🏭',
      color: 'bg-green-100 text-green-600',
      tendencia: 'arriba',
      porcentaje: '5%',
    },
    {
      titulo: 'Stock Total',
      valor: '1,245',
      icono: '📊',
      color: 'bg-purple-100 text-purple-600',
      tendencia: 'neutro',
    },
    {
      titulo: 'Movimientos Hoy',
      valor: '28',
      icono: '🔄',
      color: 'bg-yellow-100 text-yellow-600',
      tendencia: 'abajo',
      porcentaje: '8%',
    },
  ]);

  // Datos para el gráfico de movimientos por día
  const movimientosPorDia = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Entradas',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Salidas',
        data: [8, 15, 5, 8, 3, 5, 9],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de ocupación (actualmente no se usa, se muestra un indicador visual simple)
  // Se mantiene comentado en caso de necesitarlo en el futuro
  /*
  const ocupacionAlmacen = {
    labels: ['Ocupado', 'Disponible'],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: ['#4F46E5', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };
  */

  const optionsMovimientos = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Movimientos por Día',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Opciones para el gráfico de ocupación (actualmente no se usa)
  // Se mantiene comentado en caso de necesitarlo en el futuro
  /*
  const optionsOcupacion = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ocupación del Almacén',
      },
    },
  };
  */

  // Formatear fecha para mostrar en la tabla
  const formatearFecha = (fechaString: string) => {
    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Panel de Control
      </h1>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map((metrica, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  {metrica.titulo}
                </p>
                <p className="text-2xl font-bold mt-1">{metrica.valor}</p>
                {metrica.porcentaje && (
                  <div
                    className={`flex items-center mt-2 text-sm ${metrica.tendencia === 'arriba' ? 'text-green-600' : metrica.tendencia === 'abajo' ? 'text-red-600' : 'text-gray-600'}`}
                  >
                    {metrica.tendencia === 'arriba'
                      ? '↑'
                      : metrica.tendencia === 'abajo'
                        ? '↓'
                        : '→'}
                    <span className="ml-1">
                      {metrica.porcentaje}{' '}
                      {metrica.tendencia === 'arriba'
                        ? 'más'
                        : metrica.tendencia === 'abajo'
                          ? 'menos'
                          : ''}{' '}
                      que ayer
                    </span>
                  </div>
                )}
              </div>
              <div
                className={`p-3 rounded-full ${metrica.color} bg-opacity-30`}
              >
                <span className="text-2xl">{metrica.icono}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Gráfico de Movimientos */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <Bar data={movimientosPorDia} options={optionsMovimientos} />
        </div>

        {/* Gráfico de Ocupación */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold">78%</p>
                  <p className="text-gray-500 text-sm">Ocupado</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold">Ocupación del Almacén</h3>
            <p className="text-sm text-gray-500">
              Capacidad total: 1,000 pallets
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de Actividad Reciente */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Actividad Reciente
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cantidad
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movimientos.map((movimiento) => (
                  <tr key={movimiento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${movimiento.tipo === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {movimiento.tipo === 'entrada' ? 'Entrada' : 'Salida'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {movimiento.producto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movimiento.cantidad} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(movimiento.fecha)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movimiento.usuario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Ver todos los movimientos →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
