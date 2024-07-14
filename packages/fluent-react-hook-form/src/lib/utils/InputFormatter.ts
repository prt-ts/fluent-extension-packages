// Mask for phone number
export function phoneMask(phone: string) {
  return phone
    .replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{3})(\d)/, '$1) $2')
    .replace(/(\d{3})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

// Mask for Currency
export function currencyMask(currency: string, currencySymbol = '$') {
  const value = currency.replace(/\D/g, '');
  const number = Number(value) / 100;
  if (number === 0) {
    return '';
  }
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// mask for credit card
export function creditCardMask(creditCard: string) {
  return creditCard
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3')
    .replace(/(\d{4} \d{4}) (\d{4})(\d)/, '$1 $2 $3')
    .replace(/(\d{4} \d{4} \d{4}) (\d{4})/, '$1 $2');
}

// capatilize first letter of the sentence
export function capatilizeSentense(value: string) {
  if (!value?.length) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// capatilize first letter of each word
export function capatilizeEachWord(value: string) {
  if (!value?.length) return value;
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const mask = {
  phone: phoneMask,
  currency: currencyMask,
  creditCard: creditCardMask,
  capatilizeSentense: capatilizeSentense,
  capatilizeEachWord: capatilizeEachWord,
} as const;
