const { OpenAI } = require("openai");
require("dotenv").config();

const askToChatGpt = async function (req, res) {
    const openai = _createOpenAIInstance();
  
    try {
        const conversationHistory = req.body.conversationHistory || [];
    
        conversationHistory.push({ role: "user", content: req.body.message });
    
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: conversationHistory,
        });
    
        const repliedMessage = completion.choices[0].message.content;
    
        res.send({ 
            from: "chatGpt", 
            data: repliedMessage, 
            conversationHistory: conversationHistory 
        });
        } catch (error) {
        console.log("Error ", error);
        res.status(500).send({ error: "Internal Server Error" });
        }
  };
  

const _createOpenAIInstance = () => {
    const openai = new OpenAI({
        apiKey: process.env.CHATGPT_TOKEN,
    });
    return openai;
};

module.exports = {
    askToChatGpt,
};
