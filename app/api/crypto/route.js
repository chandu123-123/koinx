import axios from 'axios';
import { Cryptocurrency } from '@/lib/model';
import { dbconnection } from '@/lib/database';
import { NextResponse } from 'next/server';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price';

export async function POST(req, res) {
  await dbconnection();
  console.log('hello');
  const coinIds = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    const { data } = await axios.get(COINGECKO_URL, {
      params: {
        ids: coinIds.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });
    console.log(data);

    const cryptoUpdates = coinIds.map((coinId) => {
      const coinData = data[coinId];
      console.log(coinId);

      return {
        id: coinId,
        name: coinId === 'bitcoin' ? 'Bitcoin' : coinId === 'matic-network' ? 'Matic' : 'Ethereum',
        symbol: coinId === 'bitcoin' ? 'BTC' : coinId === 'matic-network' ? 'MATIC' : 'ETH',
        current_price: coinData.usd,
        market_cap: coinData.usd_market_cap,
        price_change_24h: coinData.usd_24h_change,
        createdAt: new Date()
      };
    });

    await Cryptocurrency.insertMany(cryptoUpdates);

    return NextResponse.json({ message: 'Data inserted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return NextResponse.json({ error: 'Error fetching cryptocurrency data' }, { status: 500 });
  }
}
