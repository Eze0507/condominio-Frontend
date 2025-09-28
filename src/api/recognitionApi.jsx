import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

// Convertir archivo a base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      console.log('Base64 generado:', result.substring(0, 50) + '...');
      console.log('Tamaño del archivo:', file.size, 'bytes');
      console.log('Tipo de archivo:', file.type);
      resolve(result);
    };
    reader.onerror = error => {
      console.error('Error al leer archivo:', error);
      reject(error);
    };
  });
};

// Enviar imagen para reconocimiento de placas
export const scanPlate = async (imageFile, cameraId = '') => {
  try {
    // Validar que sea un archivo de imagen
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      throw new Error('El archivo seleccionado no es una imagen válida.');
    }

    // Validar tamaño del archivo (máximo 10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      throw new Error('La imagen es demasiado grande. Máximo 10MB.');
    }

    console.log('Procesando imagen:', {
      name: imageFile.name,
      size: imageFile.size,
      type: imageFile.type
    });

    // Crear FormData para enviar archivo real
    const form = new FormData();
    form.append('upload', imageFile, imageFile.name); // <-- clave esperada por el backend
    form.append('camera_id', cameraId);
    form.append('regions', 'bo'); // Bolivia

    console.log('Enviando archivo como FormData...');
    const response = await apiClient.post('alpr/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error en scanPlate:', error);
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error al procesar la imagen para reconocimiento de placas.');
  }
};

// Enviar URL de imagen para reconocimiento de placas
export const scanPlateFromUrl = async (imageUrl, cameraId = '') => {
  try {
    const payload = {
      image_url: imageUrl,
      camera_id: cameraId,
      regions: 'bo' // Bolivia, ajusta según tu región
    };

    const response = await apiClient.post('alpr/', payload);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(JSON.stringify(error.response.data));
    }
    throw new Error('Error al procesar la URL de imagen para reconocimiento de placas.');
  }
};

// Obtener historial de lecturas de placas
export const fetchLecturasPlacas = async () => {
  try {
    const response = await apiClient.get('lecturas-placas/');
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el historial de lecturas de placas.');
  }
};
