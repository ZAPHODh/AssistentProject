const handlePolos = require('./handlePolos');
const Polos = require('./Polos')
// const {}= require()

const handleCase1 = async (client,message)=>{
    const filter = (m) => m.from === message.from;
	const collector = client.createMessageCollector(message.from, filter, {
		max: 5,
		time: 1000 * 60 * 2,
	});
    await client.sendText(message.from,`Selecione o polo que deseja: ${Polos.map((polo)=>`\n${polo.id} - ${polo.polo}`)}`)
    collector.on('collect',async (m)=>{
        await  handlePolos(client,message,m.content,collector);

    })
    collector.on('end',async (AllCollected)=>{
        if(AllCollected.size===5){
            await client.sendText(message.from,"Encerrando o formulário. A *Equipe UNIG EAD* agradece seu contato!")

        }

    })
}

module.exports =handleCase1