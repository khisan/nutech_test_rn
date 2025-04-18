export const formatIndonesianDate = dateString => {
  const date = new Date(dateString);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatted = new Intl.DateTimeFormat('id-ID', options).format(date);
  return `${formatted} WIB`;
};
