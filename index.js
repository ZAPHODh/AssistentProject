const wa = require('@open-wa/wa-automate');
const handleMessageCollecttor = require('./handleMessageCollector/index')
const {handleIgnore}= require('./handleMessageCollector/utils/handleIgnore')
require('dotenv').config();

wa.create({
  sessionId: "Assistent-UNIG",
}).then(client => start(client));

async function start(client) {
  const ignoredPeople = handleIgnore(); 
  client.onMessage(async message => {
    if (message) {
        if(!ignoredPeople.includes(message.from)){
            await handleMessageCollecttor( client , message);
        }
    }
  });
}