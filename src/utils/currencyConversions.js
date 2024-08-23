const API_KEY = 'fca_live_5NP6GRyFhHRj0a9LrRR1FXoiIuoJROuI5S2M8Og2';
const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest';

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}`,
    );
    const data = await response.json();
    console.log('Fetched exchange rates:', data.data); // Log the fetched rates
    return data.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {};
  }
};

export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (!rates || !rates[fromCurrency] || !rates[toCurrency]) {
    console.error('Currency rates are not available for conversion.');
    return amount; // Return the original amount if rates are not available
  }
  if (fromCurrency === toCurrency) return amount;
  const rate = rates[toCurrency] / rates[fromCurrency];
  return (amount * rate).toFixed(2);
};
