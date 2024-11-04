import { run, HandlerContext } from "@xmtp/message-kit";
import * as dotenv from 'dotenv';
import { getMarketInsight, executeTransaction } from './brianApiHelper';

dotenv.config();

run(async (context: HandlerContext) => {
  const { content, sender } = context.message;
  console.log(`Message received from ${sender.address}: ${content}`);

  try {
    // Handle command for transaction execution
    if (content.toLowerCase().startsWith('/send')) {
      const transactionResponse = await executeTransaction(content, sender.address);
      if (transactionResponse) {
        await context.send(`Transaction executed successfully: ${JSON.stringify(transactionResponse)}`);
      } else {
        await context.send('Failed to process the transaction. Please check your input and try again.');
      }
    }
    // Handle command for market insights
    else if (content.toLowerCase().startsWith('/insight')) {
      const insightResponse = await getMarketInsight(content);
      if (insightResponse) {
        await context.send(`Market Insight: ${insightResponse.result}`);
      } else {
        await context.send('Unable to fetch market insight. Please try again later.');
      }
    }
    // Handle unrecognized commands
    else {
      await context.send('Unrecognized command. Please use /send or /insight followed by your query.');
    }
  } catch (error) {
    console.error('Error processing message:', error);
    await context.send('An error occurred while processing your request. Please try again.');
  }
}, { privateKey: process.env.KEY });
