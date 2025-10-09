export default function formatearEmpleado(empleado) {
  return {
    id_empleado: empleado.id_empleado,
    nombres: empleado.nombres,
    apellidos: empleado.apellidos,
    dui: empleado.dui,
    contacto: {
      email: empleado.email,
      telefono: empleado.telefono,
    },
    direccion: {
      pais: empleado.pais,
      departamento: empleado.departamento,
      municipio: empleado.municipio,
      detalle: empleado.detalle_direccion,
    },
    puesto: empleado.puesto,
    departamento: empleado.area_departamento,
    fecha_contratacion: empleado.fecha_contratacion,
    salario: {
      moneda: empleado.salario_moneda,
      monto: empleado.salario_monto,
    },
    estado: empleado.estado,
    fecha_registro: empleado.fecha_registro,
  }
}
