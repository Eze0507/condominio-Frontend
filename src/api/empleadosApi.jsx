import axios from 'axios';

// Creamos una instancia de Axios que se usará para todas las llamadas a la API.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para añadir el token de autenticación a cada solicitud.
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

export const fetchAllEmpleados = async () => {
  try {
    const response = await apiClient.get('empleados/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los empleados.');
  }
};

export const fetchAllCargos = async () => {
  try {
    const response = await apiClient.get('cargos/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los cargos.');
  }
};

export const createEmpleado = async (empleadoData) => {
  try {
    console.log('Datos recibidos para crear empleado:', empleadoData);
    
    // Si hay archivo, usar FormData, si no, usar JSON
    const hasFile = empleadoData.imagen && empleadoData.imagen instanceof File;
    
    if (hasFile) {
      // Crear FormData para manejar archivos
      const formData = new FormData();
      
      // Agregar todos los campos directamente (sin anidar en persona)
      Object.keys(empleadoData).forEach(key => {
        if (empleadoData[key] !== null && empleadoData[key] !== undefined) {
          formData.append(key, empleadoData[key]);
          console.log(`Agregando ${key}:`, empleadoData[key]);
        }
      });

      // Log de todos los datos en FormData
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await apiClient.post('empleados/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Usar JSON para datos sin archivos
      console.log('Enviando como JSON:', empleadoData);
      const response = await apiClient.post('empleados/', empleadoData);
      return response.data;
    }
  } catch (error) {
    console.error('Error completo:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al registrar el empleado.');
  }
};

export const updateEmpleado = async (empleadoId, empleadoData) => {
  try {
    console.log('Datos recibidos para actualizar empleado:', empleadoData);
    
    // Si hay archivo, usar FormData, si no, usar JSON
    const hasFile = empleadoData.imagen && empleadoData.imagen instanceof File;
    
    if (hasFile) {
      // Crear FormData para manejar archivos
      const formData = new FormData();
      
      // Agregar todos los campos directamente
      Object.keys(empleadoData).forEach(key => {
        if (empleadoData[key] !== null && empleadoData[key] !== undefined) {
          formData.append(key, empleadoData[key]);
          console.log(`Agregando ${key}:`, empleadoData[key]);
        }
      });

      const response = await apiClient.put(`empleados/${empleadoId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Usar JSON para datos sin archivos
      console.log('Enviando como JSON:', empleadoData);
      const response = await apiClient.put(`empleados/${empleadoId}/`, empleadoData);
      return response.data;
    }
  } catch (error) {
    console.error('Error completo:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al actualizar el empleado.');
  }
};

export const deleteEmpleado = async (empleadoId) => {
  try {
    await apiClient.delete(`empleados/${empleadoId}/`);
  } catch (error) {
    throw new Error('Error al eliminar el empleado.');
  }
};

export const getEmpleadoStats = async () => {
  try {
    const response = await apiClient.get('empleados/stats/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las estadísticas de empleados.');
  }
};