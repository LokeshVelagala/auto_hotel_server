// IoT Device Types
export interface IoTDevice {
  id: string;
  name: string;
  type: 'sensor' | 'actuator' | 'controller';
  location: string;
  status: 'online' | 'offline' | 'error';
  lastSeen: Date;
  batteryLevel?: number;
  signalStrength?: number;
}

export interface SensorData {
  deviceId: string;
  timestamp: Date;
  value: number;
  unit: string;
  type: 'temperature' | 'humidity' | 'motion' | 'occupancy' | 'noise' | 'light';
  location: string;
}

export interface TableSensor {
  tableId: string;
  isOccupied: boolean;
  lastMotion: Date;
  temperature: number;
  noiseLevel: number;
  lightLevel: number;
}

export interface KitchenSensor {
  location: string;
  temperature: number;
  humidity: number;
  equipmentStatus: {
    oven: boolean;
    stove: boolean;
    refrigerator: boolean;
  };
  lastUpdated: Date;
}

export interface IoTAlert {
  id: string;
  type: 'temperature' | 'occupancy' | 'equipment' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  location: string;
  timestamp: Date;
  acknowledged: boolean;
  deviceId: string;
}

export interface IoTConfig {
  mqttBroker: string;
  mqttPort: number;
  mqttUsername?: string;
  mqttPassword?: string;
  updateInterval: number; // in milliseconds
  alertThresholds: {
    maxTemperature: number;
    minTemperature: number;
    maxNoiseLevel: number;
    maxHumidity: number;
  };
}


