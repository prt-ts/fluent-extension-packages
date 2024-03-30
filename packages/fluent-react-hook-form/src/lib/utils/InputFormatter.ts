// Mask for phone number
export function phoneMask(phone: string) {
    return phone.replace(/\D/g, '')
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
        return "";
    }
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}