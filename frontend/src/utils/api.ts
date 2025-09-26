import type { DashboardData, Pallet } from '../types';

// Interfaz para la respuesta estandarizada
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
}

// Configuración base para las peticiones
const API_CONFIG = {
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

// Función de utilidad para manejar las respuestas HTTP
async function handleApiResponse<T>(
  response: Response
): Promise<ApiResponse<T>> {
  const data = await response.json();

  if (!response.ok) {
    const error = {
      ...data,
      statusCode: response.status,
      message: data.message || 'Error en la petición',
      success: false,
    };
    throw error;
  }

  return {
    ...data,
    statusCode: response.status,
    success: response.ok,
  };
}

// Función genérica para realizar peticiones
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return await handleApiResponse<T>(response);
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}

// Funciones específicas de la API

/**
 * Obtiene los datos actuales del dashboard
 */
export const cargarDatosDashboard = async (): Promise<DashboardData> => {
  try {
    const response = await apiRequest<DashboardData>('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error en cargarDatosDashboard:', error);
    throw error;
  }
};

/**
 * Agrega un nuevo movimiento
 */
export const agregarMovimiento = async (
  tipo: 'entrada' | 'salida',
  producto: string,
  cantidad: number,
  usuario: string = 'usuario_prueba'
): Promise<DashboardData> => {
  try {
    const response = await apiRequest<DashboardData>('/movimientos', {
      method: 'POST',
      body: JSON.stringify({
        tipo,
        producto,
        cantidad,
        usuario,
      }),
    });
    return response.data;
  } catch (error) {
    console.error('Error en agregarMovimiento:', error);
    throw error;
  }
};

/**
 * Obtiene todos los pallets del inventario
 */
export const obtenerPallets = async (): Promise<Pallet[]> => {
  try {
    const response = await apiRequest<Pallet[]>('/pallets');

    // Ahora que MSW devuelve el formato correcto, response.data debería ser directamente el array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.log(
        'obtenerPallets: response.data no es un array, devolviendo array vacío'
      );
      return [];
    }
  } catch (error) {
    console.error('obtenerPallets: Error recibido:', error);
    console.error('obtenerPallets: Error type:', typeof error);
    console.error(
      'obtenerPallets: Error message:',
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};

/**
 * Obtiene un pallet específico por ID
 */
export const obtenerPalletPorId = async (id: number): Promise<Pallet> => {
  try {
    const response = await apiRequest<{ pallet: Pallet }>(`/pallets/${id}`);
    return response.data.pallet;
  } catch (error) {
    console.error('Error en obtenerPalletPorId:', error);
    throw error;
  }
};

/**
 * Crea un nuevo pallet en el inventario
 */
export const crearPallet = async (
  pallet: Omit<Pallet, 'id' | 'receivedAt' | 'updatedAt'>
): Promise<Pallet> => {
  try {
    const response = await apiRequest<{ pallet: Pallet }>('/pallets', {
      method: 'POST',
      body: JSON.stringify(pallet),
    });
    return response.data.pallet;
  } catch (error) {
    console.error('Error en crearPallet:', error);
    throw error;
  }
};

/**
 * Actualiza un pallet existente
 */
export const actualizarPallet = async (
  id: number,
  pallet: Partial<Omit<Pallet, 'id' | 'receivedAt'>>
): Promise<Pallet> => {
  try {
    const response = await apiRequest<{ pallet: Pallet }>(`/pallets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pallet),
    });
    return response.data.pallet;
  } catch (error) {
    console.error('Error en actualizarPallet:', error);
    throw error;
  }
};

/**
 * Elimina un pallet del inventario
 */
export const eliminarPallet = async (id: number): Promise<boolean> => {
  try {
    const response = await apiRequest<{ success: boolean }>(`/pallets/${id}`, {
      method: 'DELETE',
    });
    return response.data.success;
  } catch (error) {
    console.error('Error en eliminarPallet:', error);
    throw error;
  }
};

// Funciones de utilidad adicionales

/**
 * Verifica si la respuesta es exitosa
 */
export function isApiResponse<T>(
  response: unknown
): response is ApiResponse<T> {
  return (
    response !== null &&
    typeof response === 'object' &&
    'success' in response &&
    typeof (response as Record<string, unknown>).success === 'boolean'
  );
}

/**
 * Extrae los datos de una respuesta de la API
 */
export function getApiData<T>(response: ApiResponse<T> | T): T {
  return isApiResponse(response) ? response.data : response;
}

// Re-exportar tipos para que estén disponibles donde se importe este módulo
export type { DashboardData, Movimiento, Pallet } from '../types';
