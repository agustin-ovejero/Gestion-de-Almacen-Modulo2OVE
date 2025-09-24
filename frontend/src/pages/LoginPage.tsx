// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const LoginPage = () => {
  // Estados para manejar los inputs del formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para manejar la respuesta de la API (real o mock)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene que la página se recargue
    setLoading(true);
    setError(null);
    setLoggedInUser(null);

    try {
      // Hacemos la petición a nuestro endpoint (que será interceptado por MSW)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Si la respuesta no es 2xx, lanzamos un error con el mensaje del mock
        const errorData = data as { message?: string };
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      // Si llegamos aquí, la respuesta es exitosa, podemos tiparla como LoginResponse
      const responseData = data as LoginResponse;

      // Si todo va bien, guardamos los datos del usuario
      setLoggedInUser(responseData.user);
      console.log('Login exitoso:', responseData);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ocurrió un error inesperado';
      setError(errorMessage);
      console.error('Error en el login:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Si el usuario ya ha iniciado sesión, mostramos un mensaje de bienvenida
  if (loggedInUser) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600">
            ¡Bienvenido, {loggedInUser.username}!
          </h1>
          <p className="text-gray-600 mt-2">Tu rol es: {loggedInUser.role}</p>
          <button
            onClick={() => setLoggedInUser(null)}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Si no, mostramos el formulario de login
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="admin o operario1"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300"
            >
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};
// End of File ahre todo para el pr
