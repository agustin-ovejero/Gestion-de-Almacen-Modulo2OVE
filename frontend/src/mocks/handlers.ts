// frontend/src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

// --- Interfaces ---
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
    firstName: string;
    lastName: string;
  };
}

interface ErrorResponse {
  message: string;
}

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface Pallet {
  id: number;
  productId: number;
  locationId: number;
  quantity: number;
  receivedAt: string;
}

interface Movimiento {
  id: number;
  tipo: 'entrada' | 'salida';
  producto: string;
  cantidad: number;
  fecha: string;
  usuario: string;
}

interface DashboardData {
  totalPallets: number;
  ocupacionAlmacen: number;
  stockTotal: number;
  movimientosHoy: number;
  tendenciaOcupacion: 'arriba' | 'abajo' | 'estable';
  porcentajeCambio: number;
  movimientosPorDia: Array<{
    fecha: string;
    entradas: number;
    salidas: number;
  }>;
  actividadReciente: Movimiento[];
}

// --- Datos Mock ---
const productos = [
  { id: 1, nombre: 'Producto A' },
  { id: 2, nombre: 'Producto B' },
  { id: 3, nombre: 'Producto C' },
  { id: 4, nombre: 'Producto D' },
];

const usuarios = [
  { id: 1, nombre: 'admin' },
  { id: 2, nombre: 'operario1' },
  { id: 3, nombre: 'supervisor' },
];

// Generar movimientos aleatorios para los últimos 7 días
const generarMovimientos = (): Movimiento[] => {
  const movimientos: Movimiento[] = [];
  const hoy = new Date();

  for (let i = 0; i < 20; i++) {
    const diasAtras = Math.floor(Math.random() * 7);
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() - diasAtras);

    movimientos.push({
      id: i + 1,
      tipo: Math.random() > 0.5 ? 'entrada' : 'salida',
      producto: productos[Math.floor(Math.random() * productos.length)].nombre,
      cantidad: Math.floor(Math.random() * 100) + 1,
      fecha: fecha.toISOString(),
      usuario: usuarios[Math.floor(Math.random() * usuarios.length)].nombre,
    });
  }

  return movimientos.sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
};

const movimientos = generarMovimientos();

// Generar datos de movimientos por día para la última semana
const generarMovimientosPorDia = () => {
  const hoy = new Date();
  const dias = [];

  for (let i = 6; i >= 0; i--) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() - i);
    const fechaStr = fecha.toISOString().split('T')[0];

    dias.push({
      fecha: fechaStr,
      entradas: Math.floor(Math.random() * 20) + 5,
      salidas: Math.floor(Math.random() * 15) + 3,
    });
  }

  return dias;
};

// Datos mock para el dashboard
const dashboardData: DashboardData = {
  totalPallets: 245,
  ocupacionAlmacen: 78, // porcentaje
  stockTotal: 1245,
  movimientosHoy: 28,
  tendenciaOcupacion: 'arriba',
  porcentajeCambio: 5,
  movimientosPorDia: generarMovimientosPorDia(),
  actividadReciente: movimientos.slice(0, 10), // Últimos 10 movimientos
};

// --- Base de Datos Falsa ---
const mockPallets: Pallet[] = [
  {
    id: 1,
    productId: 101,
    locationId: 1,
    quantity: 50,
    receivedAt: new Date().toISOString(),
  },
  {
    id: 2,
    productId: 102,
    locationId: 2,
    quantity: 120,
    receivedAt: new Date().toISOString(),
  },
  {
    id: 3,
    productId: 101,
    locationId: 3,
    quantity: 75,
    receivedAt: new Date().toISOString(),
  },
];

// Usuarios de prueba con contraseñas (en un caso real, esto estaría hasheado)
const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    id: 2,
    username: 'operario1',
    password: 'operario123',
    role: 'operator',
    firstName: 'Juan',
    lastName: 'Perez',
  },
];

// --- Definición de los Endpoints Falsos ---
export const handlers = [
  // Endpoint para obtener datos del dashboard
  http.get('/api/dashboard/estadisticas', () => {
    return HttpResponse.json({
      success: true,
      data: {
        totalPallets: dashboardData.totalPallets,
        ocupacionAlmacen: dashboardData.ocupacionAlmacen,
        stockTotal: dashboardData.stockTotal,
        movimientosHoy: dashboardData.movimientosHoy,
        tendenciaOcupacion: dashboardData.tendenciaOcupacion,
        porcentajeCambio: dashboardData.porcentajeCambio,
      },
    });
  }),

  // Endpoint para obtener movimientos por día
  http.get('/api/dashboard/movimientos-por-dia', () => {
    return HttpResponse.json({
      success: true,
      data: dashboardData.movimientosPorDia,
    });
  }),

  // Endpoint para obtener actividad reciente
  http.get('/api/dashboard/actividad-reciente', () => {
    return HttpResponse.json({
      success: true,
      data: dashboardData.actividadReciente,
    });
  }),

  // Manejador para el login (POST)
  http.post<Record<string, never>, LoginRequest, LoginResponse | ErrorResponse>(
    '/api/login',
    async ({ request }) => {
      const { username, password } = (await request.json()) as LoginRequest;

      // Simulamos un pequeño retardo para hacerlo más realista
      await new Promise((resolve) => setTimeout(resolve, 500));

      const user = mockUsers.find((u) => u.username === username);

      // Verificamos si el usuario existe y si la contraseña coincide
      if (user && user.password === password) {
        // Generamos un token simulado (en producción, usaríamos JWT o similar)
        const token = `fake-jwt-${Date.now()}`;

        const response: LoginResponse = {
          token,
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };

        // Simulamos un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 300));

        return HttpResponse.json(response);
      } else {
        // Devuelve un error 401 (No autorizado) si las credenciales son incorrectas
        const errorResponse: ErrorResponse = {
          message: 'Usuario o contraseña incorrectos',
        };

        // Simulamos un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 300));

        return HttpResponse.json(errorResponse, { status: 401 });
      }
    }
  ),

  // Manejador para obtener todos los pallets (GET)
  http.get('/api/pallets', () => {
    return HttpResponse.json(mockPallets);
  }),

  // Manejador para obtener un pallet por su ID (GET con parámetros)
  http.get<{ id: string }>('/api/pallets/:id', ({ params }) => {
    const { id } = params;
    const pallet = mockPallets.find((p) => p.id === Number(id));

    if (pallet) {
      return HttpResponse.json(pallet);
    } else {
      // Devuelve un error 404 si el pallet no se encuentra
      return HttpResponse.json(
        { message: 'Pallet not found' },
        { status: 404 }
      );
    }
  }),

  // ... aquí puedes añadir más manejadores para productos, órdenes, etc.
];
