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

export interface Pallet {
  id: number;
  nombre: string; // Nombre del pallet
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'dañado';
  producto: string; // Nombre del producto
  productId: number; // ID del producto (para referencias)
  cantidad: number; // Cantidad de unidades
  locationId: number; // Ubicación en el almacén
  receivedAt: string; // Fecha de registro
  updatedAt?: string; // Fecha de última actualización (opcional)
}

// Exportar todos los tipos
// Los tipos están definidos directamente en este archivo
