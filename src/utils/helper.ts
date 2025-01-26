export function formatCurrency(number?: number, currency: string = 'JPY'): string {
    //number check if it's a number
    if (!number || isNaN(number)) {
        return JSON.stringify(number);
    }

    return number.toLocaleString('ja-JP', {
        style: 'currency',
        currency: currency,
    });


}