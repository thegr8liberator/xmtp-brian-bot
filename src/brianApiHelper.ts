import axios from 'axios';

export async function getMarketInsight(prompt: string) {
  try {
    const response = await axios.post('https://api.brianknows.org/api/v0/knowledge', {
      prompt,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-brian-api-key': process.env.BRIAN_API_KEY!,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Brian API Error:', error.response?.data || error.message);
    return null;
  }
}

export async function executeTransaction(prompt: string, senderAddress: string) {
  try {
    const response = await axios.post('https://api.brianknows.org/api/v0/agent/transaction', {
      prompt,
      address: senderAddress,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-brian-api-key': process.env.BRIAN_API_KEY!,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Transaction API Error:', error.response?.data || error.message);
    return null;
  }
}
