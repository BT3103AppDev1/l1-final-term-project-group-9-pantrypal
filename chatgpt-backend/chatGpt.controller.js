const { OpenAI } = require("openai");
require("dotenv").config();

const askToChatGpt = async function (req, res) {
  /**
   * 1. Create/configure OpenAI Instance
   */
  const openai = _createOpenAIInstance();

  /**
   * 2. Let's talk to chatGPT
   */
  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [
            { 
                role: "user", 
                content: req.body.message 
            }],
    });
    const repliedMessage = completion.choices[0].message.content;
    res.send({ from: "chatGpt", data: repliedMessage });
  } catch (error) {
    // Report error
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
