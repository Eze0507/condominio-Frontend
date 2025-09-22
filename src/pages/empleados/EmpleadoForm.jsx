// src/pages/empleados/EmpleadoForm.jsx
import React, { useState, useEffect } from "react";
import StyledForm from "../../components/form";
import Button from "../../components/button";

const EmpleadoForm = ({ onSubmit, onCancel, initialData, cargos = [], loading }) => {
  const [formData, setFormData] = useState({
    // Datos de Persona
    persona: {
      nombre: "",
      apellido: "",
      telefono: "",
      foto: null,
      estado: "A",
      sexo: "",
      CI: "",
      fecha_nacimiento: "",
    },
    // Datos de Empleado
    direccion: "",
    sueldo: "",
    fecha_salida: null,
    estado_empleado: "A",
    cargo: "",
  });

  useEffect(() => {
    if (initialData) {
      console.log('Datos iniciales recibidos en EmpleadoForm:', initialData);
      setFormData({
        persona: {
          nombre: initialData.persona?.nombre || "",
          apellido: initialData.persona?.apellido || "",
          telefono: initialData.persona?.telefono || "",
          foto: initialData.persona?.foto || null,
          estado: initialData.persona?.estado || "A",
          sexo: initialData.persona?.sexo || "",
          CI: initialData.persona?.CI || "",
          fecha_nacimiento: initialData.persona?.fecha_nacimiento ? 
            initialData.persona.fecha_nacimiento.split('T')[0] : "",
        },
        direccion: initialData.direccion || "",
        sueldo: initialData.sueldo || "",
        fecha_salida: initialData.fecha_salida ? 
          initialData.fecha_salida.split('T')[0] : null,
        estado_empleado: initialData.estado_empleado || "A",
        cargo: initialData.cargo?.id || initialData.cargo || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (name.startsWith('persona.')) {
      const personaField = name.split('.')[1];
      setFormData({
        ...formData,
        persona: {
          ...formData.persona,
          [personaField]: type === 'file' ? files[0] : value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = !!initialData;

  return (
    <StyledForm title={isEditing ? "Editar Empleado" : "Registrar Empleado"} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Información Personal */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Información Personal</h3>
        
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.nombre">
              Nombre *
            </label>
            <input
              type="text"
              id="persona.nombre"
              name="persona.nombre"
              value={formData.persona.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.apellido">
              Apellido *
            </label>
            <input
              type="text"
              id="persona.apellido"
              name="persona.apellido"
              value={formData.persona.apellido}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Cédula de Identidad */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.CI">
              Cédula de Identidad *
            </label>
            <input
              type="text"
              id="persona.CI"
              name="persona.CI"
              value={formData.persona.CI}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.telefono">
              Teléfono
            </label>
            <input
              type="tel"
              id="persona.telefono"
              name="persona.telefono"
              value={formData.persona.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.fecha_nacimiento">
              Fecha de Nacimiento *
            </label>
            <input
              type="date"
              id="persona.fecha_nacimiento"
              name="persona.fecha_nacimiento"
              value={formData.persona.fecha_nacimiento}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.sexo">
              Sexo *
            </label>
            <select
              id="persona.sexo"
              name="persona.sexo"
              value={formData.persona.sexo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Selecciona el sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>

          {/* Estado de Persona */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.estado">
              Estado
            </label>
            <select
              id="persona.estado"
              name="persona.estado"
              value={formData.persona.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
          </div>

          {/* Foto */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="persona.foto">
              Foto (Opcional)
            </label>
            <input
              type="file"
              id="persona.foto"
              name="persona.foto"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selecciona una imagen para el perfil del empleado (opcional)
            </p>
          </div>
        </div>

        {/* Información Laboral */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Información Laboral</h3>
          
          {/* Cargo */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="cargo">
              Cargo *
            </label>
            <select
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Selecciona un cargo</option>
              {cargos.map(cargo =>
                cargo.id && cargo.nombre ? (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.nombre}
                  </option>
                ) : null
              )}
            </select>
          </div>

          {/* Sueldo */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="sueldo">
              Sueldo *
            </label>
            <input
              type="number"
              id="sueldo"
              name="sueldo"
              value={formData.sueldo}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Estado del Empleado */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="estado_empleado">
              Estado del Empleado
            </label>
            <select
              id="estado_empleado"
              name="estado_empleado"
              value={formData.estado_empleado}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
              <option value="V">Vacaciones</option>
              <option value="S">Suspendido</option>
            </select>
          </div>

          {/* Fecha de Salida */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="fecha_salida">
              Fecha de Salida
            </label>
            <input
              type="date"
              id="fecha_salida"
              name="fecha_salida"
              value={formData.fecha_salida || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Dirección */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 text-gray-700" htmlFor="direccion">
              Dirección
            </label>
            <textarea
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button variant="cancelar" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button variant="guardar" type="submit" disabled={loading}>
          {isEditing ? "Guardar Cambios" : "Guardar"}
        </Button>
      </div>
    </StyledForm>
  );
};

export default EmpleadoForm;
