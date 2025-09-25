/**
 * Tipos de datos para la aplicación
 */

export interface Movimiento {
  id: number;
  tipo: 'entrada' | 'salida';
  producto: string;
  cantidad: number;
  fecha: string;
  usuario: string;
}

export interface MovimientoPorDia {
  fecha: string;
  entradas: number;
  salidas: number;
}

export interface DashboardData {
  totalPallets: number;
  ocupacionAlmacen: number; // porcentaje
  stockTotal: number;
  movimientosHoy: number;
  tendenciaOcupacion: 'arriba' | 'abajo' | 'estable';
  porcentajeCambio: number;
  movimientosPorDia: MovimientoPorDia[];
  actividadReciente: Movimiento[];
}

// Exportar todos los tipos
// Los tipos están definidos directamente en este archivo
