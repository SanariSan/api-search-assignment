function formatPhoneNumber(str = '') {
  return str.replace(/\D+/g, '').replace(/(\d)(\d{3})(\d{3})(\d+)/, '+$1-$2-$3-$4');
}

export { formatPhoneNumber };
