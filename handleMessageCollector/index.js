const {handleIgnore}  = require('./utils/handleIgnore')
const Order = require('./utils/firstMessage')

const handleMessageCollecttor= async (client,message)=>{
    handleIgnore("add",message)
    const filter = (m)=> m.from === message.from;
    const collector = client.createMessageCollector(message.from,filter,{max:1,time: 1000 * 60 * 2 })
    await client.sendButtons(message.from,Order, [{
        "id": "eyJhZ2VfcmFuZ2UiOiIwLTE1In0=",
        "text" : "SIM"
    },{
        "id": "eyJhZ2VfcmFuZ2UiOiIxNi0yMiJ9",
        "text": "NÃO"
}])

    collector.on('start', async ()=>{});
    collector.on('collect', async (m)=>{
           let mensagem = m.content;
            switch (mensagem) {
                case "":
                    return;
                case "2":
                    
                    return;
                default:
                    break;
            }


    })

}

module.exports= handleMessageCollecttor