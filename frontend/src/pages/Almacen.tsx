import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Settings,
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Calendar,
  User,
} from 'lucide-react';

type StatusType = 'available' | 'occupied' | 'maintenance';
type Subdivision = 'A' | 'B';

interface PalletData {
  palletId: string;
  product: string;
  quantity: number;
}

interface LocationStatus {
  zone: string;
  label: string;
  status: StatusType | [StatusType, StatusType];
  inventory?: PalletData;
  inventoryB?: PalletData;
}

interface SelectedLocation extends LocationStatus {
  subdivision?: Subdivision;
}

interface MaintenanceEvent {
  zone: string;
  description: string;
  date: string;
}

const initialLocations: LocationStatus[] = [
  { zone: 'A-01-01', label: 'A 1', status: 'available' },
  {
    zone: 'B-01-01',
    label: 'B 1',
    status: 'occupied',
    inventory: { palletId: 'PLT004', product: 'Producto D', quantity: 200 },
  },
  { zone: 'C-01-01', label: 'C 4', status: 'occupied' },
  { zone: 'D-01-01', label: 'D 1', status: 'maintenance' },
  { zone: 'E-01-01', label: 'E 1', status: 'available' },

  { zone: 'A-02-01', label: 'A 2', status: 'available' },
  {
    zone: 'B-02-01',
    label: 'B 2',
    status: ['available', 'occupied'],
    inventory: { palletId: 'PLT007', product: 'Producto G', quantity: 10 },
  },
  { zone: 'C-02-01', label: 'C 2', status: ['available', 'maintenance'] },
  { zone: 'D-02-01', label: 'D 2', status: 'available' },
  {
    zone: 'E-02-01',
    label: 'E 2',
    status: 'occupied',
    inventory: { palletId: 'PLT009', product: 'Producto I', quantity: 5 },
  },

  {
    zone: 'A-03-01',
    label: 'A 3',
    status: 'occupied',
    inventory: { palletId: 'PLT001', product: 'Producto A', quantity: 150 },
  },
  { zone: 'B-03-01', label: 'B 3', status: 'occupied' },
  { zone: 'C-03-01', label: 'C 3', status: 'maintenance' },
  { zone: 'D-03-01', label: 'D 3', status: 'available' },
  { zone: 'E-03-01', label: 'E 3', status: 'available' },
];

const maintenanceSchedule: MaintenanceEvent[] = [
  {
    zone: 'Zona A',
    description: 'Mantenimiento preventivo',
    date: '20 Dic 2025 14:00',
  },
  {
    zone: 'Zona B',
    description: 'Revisión de estructuras',
    date: '10 Dic 2025 14:00',
  },
  {
    zone: 'Zona C',
    description: 'Limpieza profunda',
    date: '02 Ene 2026 14:00',
  },
];

const getStatusColorClass = (status: StatusType) => {
  switch (status) {
    case 'available':
      return 'bg-green-600';
    case 'occupied':
      return 'bg-red-600';
    case 'maintenance':
      return 'bg-gray-500';
    default:
      return 'bg-gray-300';
  }
};

const Almacen: React.FC = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(null);

  const handleSelectLocation = (
    loc: LocationStatus,
    subdivision?: Subdivision
  ) => {
    setSelectedLocation({ ...loc, subdivision });
  };

  const mapRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < initialLocations.length; i += 5) {
      rows.push(initialLocations.slice(i, i + 5));
    }
    return rows;
  }, []);

  return (
    <div className="flex h-screen bg-[#e5ded1] font-sans text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-[#14555c] text-white flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center space-x-2 mb-8 p-2">
            <span className="text-xl font-bold">WMS Pallets</span>
          </div>
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#0e3f46]"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#0e3f46]"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Inventario</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#0e3f46]"
            >
              <Truck className="w-5 h-5" />
              <span>Entrada/ Salida</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg bg-[#0e3f46]"
            >
              <MapPin className="w-5 h-5" />
              <span>Almacén</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#0e3f46]"
            >
              <Calendar className="w-5 h-5" />
              <span>Reportes</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#0e3f46]"
            >
              <User className="w-5 h-5" />
              <span>Clientes/prov</span>
            </a>
          </nav>
        </div>
        <div>
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#0e3f46]"
          >
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-[#0e3f46]"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#d9d2c3] p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold">Mapa del Almacén</h1>
          <div className="flex space-x-3">
            <button className="px-3 py-2 bg-[#0e3f46] text-white rounded">
              Intercambio de pallets
            </button>
            <button className="px-3 py-2 bg-green-600 text-white rounded">
              Crear Pallet
            </button>
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="mr-2">Usuario1</span>
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                U
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex p-6 space-x-4">
          {/* Mapa */}
          <div className="flex-1 bg-white p-6 rounded shadow-sm">
            <h2 className="text-lg font-bold mb-4">Distribución del Almacén</h2>
            <div className="space-y-4">
              {mapRows.map((row, i) => (
                <div key={i} className="grid grid-cols-5 gap-2">
                  {row.map((loc) => {
                    const isMixed = Array.isArray(loc.status);
                    if (isMixed) {
                      const [a, b] = loc.status;
                      return (
                        <div
                          key={loc.zone}
                          className="flex h-20 shadow border rounded overflow-hidden text-white text-center text-sm cursor-pointer"
                        >
                          <div
                            className={`flex-1 flex flex-col justify-center ${getStatusColorClass(a as StatusType)}`}
                            onClick={() => handleSelectLocation(loc, 'A')}
                          >
                            {loc.label.split(' ')[0]} {loc.label.split(' ')[1]}A
                          </div>
                          <div
                            className={`flex-1 flex flex-col justify-center ${getStatusColorClass(b as StatusType)}`}
                            onClick={() => handleSelectLocation(loc, 'B')}
                          >
                            {loc.label.split(' ')[0]} {loc.label.split(' ')[1]}B
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={loc.zone}
                        className={`h-20 flex items-center justify-center rounded shadow text-white cursor-pointer ${getStatusColorClass(loc.status as StatusType)}`}
                        onClick={() => handleSelectLocation(loc)}
                      >
                        {loc.label}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-6 flex space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>Ocupado</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span>Mantenimiento</span>
              </div>
            </div>
          </div>

          {/* Panel Derecho */}
          <div className="w-80 space-y-4">
            <div className="bg-white border border-gray-300 rounded p-4">
              <h3 className="text-md font-bold mb-2">Detalles de Ubicación</h3>
              {selectedLocation ? (
                <div>
                  <p className="font-bold">{selectedLocation.zone}</p>
                  {selectedLocation.inventory && (
                    <div className="mt-2 text-sm">
                      <p>
                        <b>Pallet ID:</b> {selectedLocation.inventory.palletId}
                      </p>
                      <p>
                        <b>Producto:</b> {selectedLocation.inventory.product}
                      </p>
                      <p>
                        <b>Cantidad:</b> {selectedLocation.inventory.quantity}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Seleccione una ubicación
                </p>
              )}
            </div>

            <div className="bg-white border border-gray-300 rounded p-4">
              <h3 className="text-md font-bold mb-2">Ocupación</h3>
              <p>65% Ocupado</p>
              <p>18% Disponible</p>
              <p>16% Mantenimiento</p>
            </div>

            <div className="bg-white border border-gray-300 rounded p-4">
              <h3 className="text-md font-bold mb-2">
                Próximos Mantenimientos
              </h3>
              {maintenanceSchedule.map((m, idx) => (
                <div key={idx} className="text-sm mb-2">
                  <p className="font-semibold">{m.zone}</p>
                  <p>{m.description}</p>
                  <p className="text-gray-500">{m.date}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Almacen;
