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
  password: string; // Añadido para simular autenticación
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
