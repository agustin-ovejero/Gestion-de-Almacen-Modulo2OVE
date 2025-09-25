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

// Estado global del dashboard
const dashboardState: DashboardData = {
  totalPallets: 245,
  ocupacionAlmacen: 78, // porcentaje
  stockTotal: 1245,
  movimientosHoy: 30,
  tendenciaOcupacion: 'arriba',
  porcentajeCambio: 5,
  movimientosPorDia: generarMovimientosPorDia(),
  actividadReciente: movimientos.slice(0, 10), // Últimos 10 movimientos
};

// Función para actualizar el estado del dashboard
function actualizarDashboard(nuevoMovimiento: Movimiento): DashboardData {
  // Crear una copia del estado actual
  const estadoAnterior = { ...dashboardState };

  // Actualizar movimientos de hoy
  dashboardState.movimientosHoy += 1;

  // Actualizar stock total basado en el tipo de movimiento
  if (nuevoMovimiento.tipo === 'entrada') {
    dashboardState.stockTotal += nuevoMovimiento.cantidad;
  } else {
    dashboardState.stockTotal = Math.max(
      0,
      dashboardState.stockTotal - nuevoMovimiento.cantidad
    );
  }

  // Actualizar ocupación (ejemplo simplificado)
  const cambioOcupacion = nuevoMovimiento.tipo === 'entrada' ? 2 : -1;
  const nuevaOcupacion = Math.min(
    100,
    Math.max(0, dashboardState.ocupacionAlmacen + cambioOcupacion)
  );

  // Actualizar tendencia
  if (nuevaOcupacion > estadoAnterior.ocupacionAlmacen) {
    dashboardState.tendenciaOcupacion = 'arriba';
  } else if (nuevaOcupacion < estadoAnterior.ocupacionAlmacen) {
    dashboardState.tendenciaOcupacion = 'abajo';
  } else {
    dashboardState.tendenciaOcupacion = 'estable';
  }

  dashboardState.ocupacionAlmacen = nuevaOcupacion;

  // Actualizar actividad reciente (máximo 10 elementos)
  dashboardState.actividadReciente = [
    nuevoMovimiento,
    ...dashboardState.actividadReciente.slice(0, 9),
  ];

  // Actualizar movimientos por día
  const hoy = new Date().toISOString().split('T')[0];
  const diaActual = dashboardState.movimientosPorDia.find(
    (d) => d.fecha === hoy
  );

  if (diaActual) {
    if (nuevoMovimiento.tipo === 'entrada') {
      diaActual.entradas += 1;
    } else {
      diaActual.salidas += 1;
    }
  }

  return dashboardState;
}

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
  // Endpoint para obtener todos los datos del dashboard en una sola petición
  http.get('/api/dashboard', () => {
    return HttpResponse.json({
      success: true,
      data: dashboardState,
    });
  }),

  // Endpoint para agregar un nuevo movimiento
  http.post('/api/movimientos', async ({ request }) => {
    try {
      const nuevoMovimiento = (await request.json()) as Movimiento;

      // Validar el movimiento
      if (
        !nuevoMovimiento.tipo ||
        !nuevoMovimiento.producto ||
        !nuevoMovimiento.cantidad
      ) {
        return HttpResponse.json(
          { success: false, message: 'Datos de movimiento inválidos' },
          { status: 400 }
        );
      }

      // Asignar un ID y fecha si no están presentes
      nuevoMovimiento.id = nuevoMovimiento.id || Date.now();
      nuevoMovimiento.fecha = nuevoMovimiento.fecha || new Date().toISOString();

      // Actualizar el estado del dashboard
      const dashboardActualizado = actualizarDashboard(nuevoMovimiento);

      return HttpResponse.json({
        success: true,
        data: dashboardActualizado,
      });
    } catch (error) {
      console.error('Error al procesar el movimiento:', error);
      return HttpResponse.json(
        { success: false, message: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }),

  // Endpoint para obtener datos resumidos del dashboard
  http.get('/api/dashboard/estadisticas', () => {
    return HttpResponse.json({
      success: true,
      data: {
        totalPallets: dashboardState.totalPallets,
        ocupacionAlmacen: dashboardState.ocupacionAlmacen,
        stockTotal: dashboardState.stockTotal,
        movimientosHoy: dashboardState.movimientosHoy,
        tendenciaOcupacion: dashboardState.tendenciaOcupacion,
        porcentajeCambio: dashboardState.porcentajeCambio,
      },
    });
  }),

  // Endpoint para obtener movimientos por día
  http.get('/api/dashboard/movimientos-por-dia', () => {
    return HttpResponse.json({
      success: true,
      data: dashboardState.movimientosPorDia,
    });
  }),

  // Endpoint para obtener actividad reciente
  http.get('/api/dashboard/actividad-reciente', () => {
    return HttpResponse.json({
      success: true,
      data: dashboardState.actividadReciente,
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
