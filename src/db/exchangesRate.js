import db from './data';

const exchangesRate = async () => {
  const cached = await db.exchangesRate.get('latestRate');
  const now = Date.now();

  if (!cached || now > new Date(cached.nextUpdate).getTime()) {
    const res = await fetch(
      'https://v6.exchangerate-api.com/v6/eb7e378c2f0c2d0d8b6d630b/latest/USD'
    );
    const data = await res.json();

    await db.exchangesRates.put({
      id: 'latestRates',
      base: 'USD',
      data: data.conversion_rates,
      lastFetchedAt: Date.now(),
      nextUpdate: data.time_update_utc,
    });
  }
};

export default exchangesRate;
