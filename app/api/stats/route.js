import { dbconnection } from '@/lib/database';
import { Cryptocurrency } from '@/lib/model';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    console.log("hello");

    const url = new URL(req.url);
    const coin = url.searchParams.get('coin');

    if (!coin) {
        return NextResponse.json({ error: 'Please provide a valid coin parameter' }, { status: 400 });
    }

    await dbconnection();

    try {
        const cryptoData = await Cryptocurrency.findOne({ id: coin });

        if (!cryptoData) {
            return NextResponse.json({ error: 'Cryptocurrency data not found' }, { status: 404 });
        }

        const response = {
            price: cryptoData.current_price,
            marketCap: cryptoData.market_cap,
            "24hChange": cryptoData.price_change_24h,
        };

        // Return the response here
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        // Return the error response here
        return NextResponse.json({ error: 'An error occurred while fetching cryptocurrency data' }, { status: 500 });
    }
}
