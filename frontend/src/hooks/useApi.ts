import { useState, useCallback } from 'react';
import type { DashboardData, Pallet } from '../types';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiReturn<T> extends UseApiState<T> {
  request: (...args: unknown[]) => Promise<T>;
  reset: () => void;
}

/**
 * Hook personalizado para manejar peticiones a la API
 */
export function useApi<T>(
  apiFunction: (...args: unknown[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (...args: unknown[]) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const result = await apiFunction(...args);
        setState((prev) => ({ ...prev, data: result, loading: false }));
        return result;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
          data: null,
        }));
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    request,
    reset,
  };
}

/**
 * Type guard para verificar si un valor es un Error
 */
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Función auxiliar para obtener el mensaje de error de forma segura
 */
function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Error inesperado';
}

/**
 * Hook específico para operaciones CRUD de pallets
 */
export function usePallets() {
  const [palletsData, setPalletsData] = useState<UseApiState<Pallet[]>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(async () => {
    try {
      setPalletsData((prev) => ({ ...prev, loading: true, error: null }));
      const { obtenerPallets } = await import('../utils/api');
      const result = await obtenerPallets();
      setPalletsData((prev) => ({ ...prev, data: result, loading: false }));
      return result;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setPalletsData((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
        data: null,
      }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setPalletsData({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...palletsData,
    request,
    reset,
  };
}

/**
 * Hook específico para datos del dashboard
 */
export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<
    UseApiState<DashboardData>
  >({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true, error: null }));
      const { cargarDatosDashboard } = await import('../utils/api');
      const result = await cargarDatosDashboard();
      setDashboardData((prev) => ({ ...prev, data: result, loading: false }));
      return result;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setDashboardData((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
        data: null,
      }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setDashboardData({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...dashboardData,
    request,
    reset,
  };
}
