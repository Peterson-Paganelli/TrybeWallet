const fetchCurrenciesAPI = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch {
    return {};
  }
};

export default fetchCurrenciesAPI;
