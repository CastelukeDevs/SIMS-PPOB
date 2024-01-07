export default (text: string) => {
  const sanitized = text
    .replace('Pajak', '')
    .replace('Berlangganan', '')
    .replace('Paket', '')
    .replace('Voucher', '')
    .replace(' ', '');
  return sanitized;
};
