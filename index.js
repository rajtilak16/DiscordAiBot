require("dotenv").config();

const {Client, GatewayIntentBits} = require("discord.js");

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG
});


const openai = new OpenAIApi(configuration);
client.on('messageCreate', async function(message) {
    try {
      if (message.author.bot) return;


      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Hey give me a response for this : ${message.content}`,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        //   stop: ["You:"],
        });
        const botResponse = response.data.choices[0].text;
        message.reply(botResponse); // Send the response back to the channel
        } catch (error) {
        console.log(error);
    }
  });

  client.login(process.env.DISCORD_KEY)