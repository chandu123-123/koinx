const cron = require('node-cron');
const axios = require('axios');

// '0 */2 * * *'
cron.schedule('*/2 * * * *', async () => {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_LOCALURL}/api/crypto`);
    console.log('Crypto data fetched and updated');
  } catch (error) {
    console.error('Error in scheduled job:', error);
  }
});
