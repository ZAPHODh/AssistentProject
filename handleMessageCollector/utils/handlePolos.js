require('dotenv').config();
const Polos = require('./Polos');
const {handleIgnore}=require('./handleIgnore')

const handlePolos=async (client,message,content,collector)=>{
	const poloSelectedByID = Polos.filter(polo => polo.id == content);
	if(poloSelectedByID.length >0){
	 poloSelectedByID.map(async(polo)=>{
		await client.sendText(message.from,`Polo selecionado: ${polo.polo}. Você pode mandar um email para ${polo.email}. Se preferir, você pode ${polo.WPP?'mandar  mensagem ou ligar para o contato https://wa.me/55'+polo.tel: 'ligar para o contato '+ polo.tel} para que o setor responsável possa analisar, orientar e/ou atender sua solicitação.`)
		collector.stop()
		handleIgnore('remove',message)
		return
	 })
	}else{
	  await client.sendText(message.from,"Opção inválida.")
	  return
	}
  }
  module.exports= handlePolos