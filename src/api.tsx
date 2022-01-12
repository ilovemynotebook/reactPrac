
const BASE_URL = "https://api.coinpaprika.com/v1";

export async function fetchCoins()
{
    return fetch(`${BASE_URL}/coins`).then(response =>response.json())
}

export async function coinInfo(coinId: string)
{
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response =>response.json())
}

export async function coinPrice(coinId: string)
{
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response =>response.json())
}

export async function fetchCoinHistory(coinId: string)
{
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60*60*24*7*2;
    console.log(endDate);
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response =>response.json())
}