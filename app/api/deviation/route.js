
import { Cryptocurrency } from '@/lib/model';
import { dbconnection } from '@/lib/database';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbconnection();
console.log("hello")
  const { searchParams } = new URL(req.url);
  const coin = searchParams.get('coin');

  if (!coin) {
    return NextResponse.json({ error: 'Coin parameter is required' }, { status: 400 });
  }

  try {

    const records = await Cryptocurrency.find({ id: coin })
      .sort({ createdAt: -1 }) 
      .limit(100); 

    if (records.length === 0) {
      return NextResponse.json({ error: 'No records found for this cryptocurrency' }, { status: 404 });
    }

    const prices = records.map(record => record.current_price);
    const deviation = calculateStandardDeviation(prices);

    return NextResponse.json({ deviation }, { status: 200 });
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return NextResponse.json({ error: 'Error fetching cryptocurrency data' }, { status: 500 });
  }
}


function calculateStandardDeviation(values) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance).toFixed(2); 
}
