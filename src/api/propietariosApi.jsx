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

export const fetchAllPropietarios = async () => {
  try {
    const response = await apiClient.get('propietarios/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los propietarios.');
  }
};

export const createPropietario = async (propietarioData) => {
  try {
    console.log('Datos recibidos para crear propietario:', propietarioData);
    
    // Reestructurar datos para enviar campos de persona en nivel raíz
    const dataToSend = {
      // Campos de persona en nivel raíz (como espera PropietarioCreateSerializer)
      nombre: propietarioData.persona?.nombre || '',
      apellido: propietarioData.persona?.apellido || '',
      telefono: propietarioData.persona?.telefono || '',
      foto: propietarioData.persona?.foto || null,
      sexo: propietarioData.persona?.sexo || '',
      CI: propietarioData.persona?.CI || '',
      fecha_nacimiento: propietarioData.persona?.fecha_nacimiento || '',
      // Campos de propietario
      estado_propietario: propietarioData.estado_propietario || 'A',
      observaciones: propietarioData.observaciones || ''
    };
    
    // Si hay archivo, usar FormData, si no, usar JSON
    const hasFile = dataToSend.foto;
    
    if (hasFile) {
      // Crear FormData para manejar archivos
      const formData = new FormData();
      
      // Agregar todos los campos directamente
      Object.keys(dataToSend).forEach(key => {
        if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
          formData.append(key, dataToSend[key]);
          console.log(`Agregando ${key}:`, dataToSend[key]);
        }
      });

      // Log de todos los datos en FormData
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await apiClient.post('propietarios/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } else {
      // Usar JSON para datos sin archivos
      console.log('Enviando como JSON:', dataToSend);
      const response = await apiClient.post('propietarios/', dataToSend);
      return response.data;
    }
  } catch (error) {
    console.error('Error completo:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al registrar el propietario.');
  }
};

export const updatePropietario = async (propietarioId, propietarioData) => {
  try {
    // Reestructurar datos para enviar campos de persona en nivel raíz
    const dataToSend = {
      // Campos de persona en nivel raíz
      nombre: propietarioData.persona?.nombre || '',
      apellido: propietarioData.persona?.apellido || '',
      telefono: propietarioData.persona?.telefono || '',
      foto: propietarioData.persona?.foto || null,
      sexo: propietarioData.persona?.sexo || '',
      CI: propietarioData.persona?.CI || '',
      fecha_nacimiento: propietarioData.persona?.fecha_nacimiento || '',
      // Campos de propietario
      estado_propietario: propietarioData.estado_propietario || 'A',
      observaciones: propietarioData.observaciones || ''
    };
    
    // Crear FormData para manejar archivos
    const formData = new FormData();
    
    // Agregar todos los campos directamente
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] !== null && dataToSend[key] !== undefined) {
        formData.append(key, dataToSend[key]);
      }
    });

    const response = await apiClient.put(`propietarios/${propietarioId}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error de conexión al actualizar el propietario.');
  }
};

export const deletePropietario = async (propietarioId) => {
  try {
    await apiClient.delete(`propietarios/${propietarioId}/`);
  } catch (error) {
    throw new Error('Error al eliminar el propietario.');
  }
};