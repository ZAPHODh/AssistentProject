require('dotenv').config();
const Polos = require('./Polos');
const {handleIgnore}=require('./handleIgnore')

const handlePolos=async (client,message,content,collector)=>{
	const poloSelectedByID = Polos.filter(polo => polo.id == content);
	if(poloSelectedByID.length >0){
	 poloSelectedByID.map(async(polo)=>{
		await client.sendText(message.from,`Polo selecionado: ${polo.polo}. Você pode mandar um email para ${polo.email}. Se preferir, você pode mandar mensagem ou ligar para o contato https://wa.me/55${polo.tel}${polo.tel2?` ou para https://wa.me/55${polo.tel2}`:""}`)
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