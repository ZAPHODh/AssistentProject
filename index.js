/* eslint-disable prettier/prettier */
const {create, Client} = require('@open-wa/wa-automate');
const handleMessageCollecttor = require('./handleMessageCollector/index');
const { handleIgnore } = require('./handleMessageCollector/utils/handleIgnore');
require('dotenv').config();

async function start(client = Client){
	
	client.onMessage(async (message) => {

		if(message.text.includes('!contact')){
			await client.sendContact(message.from,'5521927654000@c.us')
		}
		
		if (message.text.includes("!test")) {
			const ignoredPeople = handleIgnore();
			if (!ignoredPeople.includes(message.from)) {
				await handleMessageCollecttor(client, message);
			}
		}

	});
}
create({
}).then((client) => start(client));
