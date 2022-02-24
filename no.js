const {
  Telegraf,
  session,
  Extra,
  Markup,
  Scenes,
  wizard,
} = require('telegraf');
const Web3 =  require('web3');


const { BaseScene, Stage } = Scenes;

const mongo = require('mongodb').MongoClient;
const { enter, leave } = Stage;
const stage = new Stage();
const Scene = BaseScene;
const bot = new Telegraf('5193714072:AAEctQ1L9NnGr7OJWi6l5IwO_dOSwK9HOd4') //enter bot token

let db;
function rndFloat(min, max) {
  return Math.random() * (max - min + 1) + min;
}
function rndInt(min, max) {
  return Math.floor(rndFloat(min, max));
}


// importing all the config variables



// const  bot = new Telegraf(data.bot_token)
// mongourl
mongo.connect("https://downloads.mongodb.com/compass/mongosh-1.2.1-win32-x64.zip",
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err);
    }

    db = client.db('tomoboss'); // db name 
    bot.telegram.deleteWebhook().then((success) => {
      success && console.log('🤖 is listening to your commands');
      bot.launch();
    });
  },
);

// Register The Task By Stages Here
bot.use(session());
bot.use(stage.middleware());

const adre = new Scene('adre');
stage.register(adre);


const amt = new Scene('amt');
stage.register(amt);





  bot.command('v' , async (ctx) => {
    
    var rem =110
    var ri = 'none'
    db.collection('forpay').updateOne({userId: ctx.from.id}, {$set: {balu: rem}}, {upsert: true})
    db.collection('forpay').updateOne({userId: ctx.from.id}, {$set: {adress: ri}}, {upsert: true})


  })


  bot.command('h', async (ctx) => {
    ctx.reply('Enter the address of user')
    ctx.scene.enter('adre')
  })

  adre.on('text' ,async ctx => {
    db.collection('forpay').updateOne({userId: ctx.from.id}, {$set: {adress: ctx.message.text}}, {upsert: true})
   ctx.scene.leave()
   ctx.reply('send amt')
   ctx.scene.enter('amt')
  })

  amt.on('text' ,async ctx => {
    db.collection('forpay').updateOne({userId: ctx.from.id}, {$set: {balu: ctx.message.text}}, {upsert: true})
    ctx.scene.leave('amt');
  })

  bot.command('f' ,async ctx=> {
    let maindata = await db

    .collection('forpay')
    .find({ userId: ctx.from.id })
    .toArray();
  
    let su = maindata[0].balu
    let cy = maindata[0].adress
  
    const finalbalance = Web3.utils.toWei(su, 'ether');


  } )

bot.command('hjj' ,async ctx => {

  let maindata = await db

  .collection('forpay')
  .find({ userId: ctx.from.id })
  .toArray();

  let su = maindata[0].balu
  let cy = maindata[0].adress
  const web3 = new Web3('https://rpc.tomochain.com');

  const finalbalance = web3.utils.toWei(su, 'ether');
  console.log(finalbalance)


 

// Unlock wallet by private key
const pkey = 'antique permit plate sand aware exact use quantum answer trial sustain menu' //enter private key of tomo wallet
const account = web3.eth.accounts.privateKeyToAccount(pkey)
const holder = account.address
web3.eth.accounts.wallet.add(account)
web3.eth.defaultAccount = holder
console.log(holder)
const trc20Abi = require('./TRC20.json')
const address = 'antique permit plate sand aware exact use quantum answer trial sustain menu' //enter  contract address
const trc20 = new web3.eth.Contract(trc20Abi,
        address, {gasPrice: 250000000, gas: 39002  })

        trc20.methods.balanceOf(holder).call()
.then((result) => {
    console.log(result)

}).catch(e => console.log(e))
const to = "" //enter reciever address

try {
trc20.methods.transfer(cy, finalbalance).send({
    from: holder,
    gas: 39002,
    gasPrice: 250000000,
    chainId: chainId
})
.then((resrult) => {
    console.log(resrult.transactionHash)
    ctx.reply(resrult)
})
}catch (e) {
console.log(e)}

trc20.methods.transfer(to, '10000000000000000000000').estimateGas({
  from: holder
})
.then((result) => {
  console.log(result)
}).catch(e => console.log(e))

})

bot.command('fg' , async ctx=> {
  // send 500000000000000000000 tokens to this address (e.g decimals 18)

})
//   const Web3 = require('web3')

// // Connect to TomoChain nodes
// const provider = new Web3.providers.HttpProvider('https://rpc.tomochain.com')
// const web3 = new Web3(provider)

// // Unlock wallet by private key
// const account = web3.eth.accounts.privateKeyToAccount(pkey)
// let coinbase = account.address
// web3.eth.accounts.wallet.add(account)
// web3.eth.defaultAccount = coinbase

// // Make a transaction using the promise
// web3.eth.sendTransaction({
//     from: coinbase,
//     to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
//     value: '1000000000000000'
// })
// .then(function(receipt){
//     console.log(receipt)
// });





const chainId = 88
