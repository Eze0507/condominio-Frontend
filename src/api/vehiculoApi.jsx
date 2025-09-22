import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/residencial/',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchAllVehiculos = async () => {
  try {
    const response = await apiClient.get('/vehiculos/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los vehículos.');
  }
};

export const fetchVehiculoById = async (vehiculoId) => {
  try {
    const response = await apiClient.get(`/vehiculos/${vehiculoId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el vehículo.');
  }
};

export const createVehiculo = async (vehiculoData) => {
  try {
    const response = await apiClient.post('/vehiculos/', vehiculoData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al crear el vehículo.');
  }
};

export const updateVehiculo = async (vehiculoId, vehiculoData) => {
  try {
    const response = await apiClient.put(`/vehiculos/${vehiculoId}/`, vehiculoData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al actualizar el vehículo.');
  }
};

export const deleteVehiculo = async (vehiculoId) => {
  try {
    await apiClient.delete(`/vehiculos/${vehiculoId}/`);
  } catch (error) {
    throw new Error('Error al eliminar el vehículo.');
  }
};