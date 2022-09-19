/* eslint-disable prettier/prettier */
const { handleIgnore } = require('./utils/handleIgnore');
const Order = require('./utils/firstMessage');
const handleCase1 = require('./utils/handleCase1');
const handleCase2 = require('./utils/handleCase2');

const handleMessageCollecttor = async (client, message) => {
	handleIgnore('add', message);
	const filter = (m) => m.from === message.from;
	const collector = client.createMessageCollector(message.from, filter, {
		max: 1,
		time: 1000 * 60 * 2,
	});
	await client.sendText(message.from, Order);

	collector.on('start', async () => {});
	collector.on('collect', async (m) => {
		const mensagem = m.content;
		switch (mensagem) {
			case '1':
				await handleCase1(client, message);
				return;
			case '2':
				await handleCase2(client, message);
				return;
			default:
				await client.sendText(message.from, 'Você escolheu uma opção inválida');
				handleIgnore('remove', message);
				
		}
	});

	collector.on('end',async (m)=>{
		if(m.size<1){
			await client.sendText(message.from,"Você não respondeu, encerrando o formulário. A *Equipe UNIG EAD* agradece seu contato!")
		}

	})
};

module.exports = handleMessageCollecttor;
