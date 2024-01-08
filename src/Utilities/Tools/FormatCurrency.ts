/**
 * Format Number into Currency format
 * @param amount number
 * @returns symbol "Rp"
 * @returns whole "10.000"
 * @returns decimal ",00"
 * @returns format "Rp 10.000,00"
 */
export default (amount: number) => {
  const symbol = 'Rp';
  const [wholeNum, decimalNum] = amount.toString().split('.');

  const fixDecimal = decimalNum || '00';
  const decimal = ',' + fixDecimal;

  const whole = wholeNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  const format = `${symbol} ${whole}${decimal}`;

  const result = {symbol, whole, decimal, format};

  return result;
};
