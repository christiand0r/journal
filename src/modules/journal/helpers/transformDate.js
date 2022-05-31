export default (stamp) => {
  const date = new Date(stamp);

  const days = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const number = date.getDate();
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const monthNumber = date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    day,
    month,
    monthNumber,
    number,
    year,
  };
};
