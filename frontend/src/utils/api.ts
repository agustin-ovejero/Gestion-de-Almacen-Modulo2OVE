import type { DashboardData } from '../types';

/**
 * Obtiene los datos actuales del dashboard desde la API
 */
export const cargarDatosDashboard = async (): Promise<DashboardData> => {
  try {
    const response = await fetch('/api/dashboard');
    if (!response.ok) {
      throw new Error('Error al cargar los datos del dashboard');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error en cargarDatosDashboard:', error);
    throw error;
  }
};

/**
 * Agrega un nuevo movimiento a través de la API
 */
export const agregarMovimiento = async (
  tipo: 'entrada' | 'salida',
  producto: string,
  cantidad: number,
  usuario: string = 'usuario_prueba'
): Promise<DashboardData> => {
  try {
    const response = await fetch('/api/movimientos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo,
        producto,
        cantidad,
        usuario,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al agregar el movimiento');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error en agregarMovimiento:', error);
    throw error;
  }
};

// Re-exportar tipos para que estén disponibles donde se importe este módulo
export type { DashboardData, Movimiento } from '../types';
