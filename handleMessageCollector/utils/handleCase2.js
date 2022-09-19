const {handleIgnore}= require('./../utils/handleIgnore')
const responseCase2 = require('./responseCase2')

const handleCase2 = async (client,message)=>{
    await client.sendText(message.from,"Olá, em que podemos ajudar?\n1 – Processo Seletivo\n2 – Matrícula/Rematrícula\n3 – Financeiro\n\n\nSe você é da *EQUIPE/COLABORADOR* de um de nossos *Polos Parceiros*, por favor informe qual o setor da necessidade de contato");
    const filter = (m) => m.from === message.from;
	const collector = client.createMessageCollector(message.from, filter, {
		max: 4,
		time: 1000 * 60 * 2,
	});
    collector.on('collect',async(m)=>{
        let messagem = m.content;
        switch (messagem) {
            case "1":
                await client.sendText(message.from,responseCase2[0]);
                collector.stop()
                setTimeout(()=>{handleIgnore('remove',message)},1000 *60* 30);
                return;
            case "2":
                await client.sendText(message.from,responseCase2[0]);
                collector.stop()
                setTimeout(()=>{handleIgnore('remove',message)},1000 *60* 30);
                return;
            case "3":
                await client.sendText(message.from,responseCase2[1]);             
                collector.stop()
                handleIgnore('remove',message);
                return;
        
            default:
                await client.sendText(message.from, "Opção Inválida")
                return
        }
    })
    collector.on('end',async (m)=>{
        if(m.size===4){
            handleIgnore('remove',message)
            await client.sendText(message.from, "Numero de tentativas excedido, encerrando o atendimento.\nA *Equipe UNIG EAD* agradece seu contato!")
        }
    })
}

module.exports = handleCase2