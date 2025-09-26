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
  nombre: string; // Nombre del pallet
  estado: 'disponible' | 'en_uso' | 'mantenimiento' | 'dañado';
  producto: string; // Nombre del producto
  productId: number; // ID del producto (para referencias)
  cantidad: number; // Cantidad de unidades
  locationId: number; // Ubicación en el almacén
  receivedAt: string; // Fecha de registro
  updatedAt?: string; // Fecha de última actualización
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
    nombre: 'PALLET-001',
    estado: 'disponible',
    producto: 'Producto A',
    productId: 101,
    cantidad: 50,
    locationId: 1,
    receivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    nombre: 'PALLET-002',
    estado: 'en_uso',
    producto: 'Producto B',
    productId: 102,
    cantidad: 120,
    locationId: 2,
    receivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    nombre: 'PALLET-003',
    estado: 'mantenimiento',
    producto: 'Producto A',
    productId: 101,
    cantidad: 75,
    locationId: 3,
    receivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    nombre: 'PALLET-004',
    estado: 'dañado',
    producto: 'Producto A',
    productId: 101,
    cantidad: 75,
    locationId: 3,
    receivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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

  // Manejador para obtener todos los pallets (GET) - FIXED FORMAT FOR API RESPONSE HANDLER COMPATIBILITY
  http.get('/api/pallets', () => {
    console.log('MSW: Handler /api/pallets llamado');
    console.log('MSW: Devolviendo pallets:', mockPallets.length, 'pallets');
    return HttpResponse.json({
      success: true,
      data: mockPallets,
      message: 'Pallets obtenidos exitosamente',
      statusCode: 200,
    });
  }),

  // Manejador para obtener un pallet por su ID (GET con parámetros) - FIXED FORMAT
  http.get<{ id: string }>('/api/pallets/:id', ({ params }) => {
    const { id } = params;
    const pallet = mockPallets.find((p) => p.id === Number(id));

    if (pallet) {
      return HttpResponse.json({
        success: true,
        data: pallet,
        message: 'Pallet encontrado exitosamente',
        statusCode: 200,
      });
    } else {
      // Devuelve un error 404 si el pallet no se encuentra
      return HttpResponse.json(
        {
          success: false,
          message: 'Pallet no encontrado',
          statusCode: 404,
        },
        { status: 404 }
      );
    }
  }),

  // Endpoint para registrar entrada de pallets
  http.post('/api/pallets/entrada', async ({ request }) => {
    try {
      const entradaData = (await request.json()) as Omit<
        Pallet,
        'id' | 'receivedAt' | 'updatedAt'
      >;
      const timestamp = new Date().toISOString();

      // Validar datos requeridos
      if (
        !entradaData.nombre ||
        !entradaData.estado ||
        !entradaData.producto ||
        !entradaData.cantidad
      ) {
        return HttpResponse.json(
          {
            success: false,
            message:
              'Faltan campos requeridos: nombre, estado, producto, cantidad',
          },
          { status: 400 }
        );
      }

      // Validar que el estado sea válido
      const estadosValidos = [
        'disponible',
        'en_uso',
        'mantenimiento',
        'dañado',
      ];
      if (!estadosValidos.includes(entradaData.estado)) {
        return HttpResponse.json(
          {
            success: false,
            message:
              'Estado inválido. Los valores permitidos son: ' +
              estadosValidos.join(', '),
          },
          { status: 400 }
        );
      }

      // Validar que la cantidad sea un número positivo
      if (entradaData.cantidad <= 0) {
        return HttpResponse.json(
          {
            success: false,
            message: 'La cantidad debe ser un número positivo',
          },
          { status: 400 }
        );
      }

      // Crear nuevo pallet
      const nuevoPallet: Pallet = {
        id:
          mockPallets.length > 0
            ? Math.max(...mockPallets.map((p) => p.id)) + 1
            : 1,
        nombre: entradaData.nombre,
        estado: entradaData.estado as
          | 'disponible'
          | 'en_uso'
          | 'mantenimiento'
          | 'dañado',
        producto: entradaData.producto,
        productId: entradaData.productId || 0, // Valor por defecto si no se proporciona
        cantidad: entradaData.cantidad,
        locationId: entradaData.locationId || 0, // Valor por defecto si no se proporciona
        receivedAt: timestamp,
        updatedAt: timestamp,
      };

      // Agregar a la lista de pallets
      mockPallets.push(nuevoPallet);

      // Registrar el movimiento
      const movimiento: Movimiento = {
        id: Date.now(),
        tipo: 'entrada',
        producto: entradaData.producto,
        cantidad: entradaData.cantidad,
        fecha: timestamp,
        usuario: 'usuario_actual', // En un caso real, esto vendría del token de autenticación
      };

      // Actualizar el dashboard con el nuevo movimiento
      const dashboardActualizado = actualizarDashboard(movimiento);

      return HttpResponse.json({
        success: true,
        data: {
          pallet: nuevoPallet,
          dashboard: dashboardActualizado,
          message: 'Pallet registrado exitosamente',
        },
      });
    } catch (error) {
      console.error('Error al registrar entrada de pallet:', error);
      return HttpResponse.json(
        { success: false, message: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }),

  // Endpoint para registrar salida de pallets
  http.post('/api/pallets/salida', async ({ request }) => {
    try {
      const salidaData = (await request.json()) as {
        palletId: number;
        cantidad: number;
      };
      const timestamp = new Date().toISOString();

      // Validar datos requeridos
      if (!salidaData.palletId || !salidaData.cantidad) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Faltan campos requeridos: palletId, cantidad',
          },
          { status: 400 }
        );
      }

      // Validar que la cantidad sea un número positivo
      if (salidaData.cantidad <= 0) {
        return HttpResponse.json(
          {
            success: false,
            message: 'La cantidad debe ser un número positivo',
          },
          { status: 400 }
        );
      }

      // Buscar el pallet
      const palletIndex = mockPallets.findIndex(
        (p) => p.id === salidaData.palletId
      );

      if (palletIndex === -1) {
        return HttpResponse.json(
          {
            success: false,
            message: 'Pallet no encontrado',
            errorCode: 'PALLET_NOT_FOUND',
          },
          { status: 404 }
        );
      }

      const pallet = mockPallets[palletIndex];

      // Validar que el pallet esté disponible
      if (pallet.estado !== 'disponible') {
        return HttpResponse.json(
          {
            success: false,
            message: `El pallet no está disponible. Estado actual: ${pallet.estado}`,
            errorCode: 'PALLET_NOT_AVAILABLE',
            estadoActual: pallet.estado,
          },
          { status: 400 }
        );
      }

      // Validar que haya suficiente stock
      if (pallet.cantidad < salidaData.cantidad) {
        return HttpResponse.json(
          {
            success: false,
            message: `Cantidad insuficiente. Stock actual: ${pallet.cantidad}`,
            errorCode: 'INSUFFICIENT_STOCK',
            stockActual: pallet.cantidad,
          },
          { status: 400 }
        );
      }

      // Actualizar la cantidad del pallet
      pallet.cantidad -= salidaData.cantidad;
      pallet.updatedAt = timestamp;

      // Si la cantidad llega a cero, eliminar el pallet
      let palletEliminado = false;
      if (pallet.cantidad <= 0) {
        mockPallets.splice(palletIndex, 1);
        palletEliminado = true;
      }

      // Registrar el movimiento
      const movimiento: Movimiento = {
        id: Date.now(),
        tipo: 'salida',
        producto: pallet.producto,
        cantidad: salidaData.cantidad,
        fecha: timestamp,
        usuario: 'usuario_actual', // En un caso real, esto vendría del token de autenticación
      };

      // Actualizar el dashboard con el nuevo movimiento
      const dashboardActualizado = actualizarDashboard(movimiento);

      return HttpResponse.json({
        success: true,
        data: {
          pallet: !palletEliminado ? pallet : null,
          dashboard: dashboardActualizado,
          message: !palletEliminado
            ? `Salida registrada. Stock restante: ${pallet.cantidad}`
            : 'Pallet agotado y eliminado del inventario',
          palletEliminado,
        },
      });
    } catch (error) {
      console.error('Error al registrar salida de pallet:', error);
      return HttpResponse.json(
        { success: false, message: 'Error interno del servidor' },
        { status: 500 }
      );
    }
  }),
];
