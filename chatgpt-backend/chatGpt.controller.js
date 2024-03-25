const { OpenAI } = require("openai");
require("dotenv").config();

const askToChatGpt = async function (req, res) {
    const openai = _createOpenAIInstance();
  
    try {
        const conversationHistory = req.body.conversationHistory || [];
    
        if (conversationHistory.length === 0 && req.body.recipeDetails) {
            conversationHistory = await generateInitialRecipe(conversationHistory, req.body.recipeDetails, openai);
        } else {
            conversationHistory.push({ role: "user", content: req.body.message });
        }
    
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
  
const generateInitialRecipe = async (req, res) => {
    const openai = _createOpenAIInstance();
    console.log(req.body);
    const prompt = `Generate a recipe based on the following details: 
        Cuisine: ${req.body.categories}, 
        Leftovers: ${req.body.ingredients}, 
        Dietary Restrictions: ${req.body.dietaryRestrictions}.

        Please return the recipe in the example FORMAT BELOW, note that the information below are just examples:

        {
            "allergens": ["Diary", "Nuts"], 
            "categories": ["Italian", "Pasta"],
            "cook_time": "30 minutes", 
            "description": "Indulge in a delightful culinary creation with our Chicken Breast Pesto Pasta, 
                crafted from simple yet flavorful ingredients. Tender slices of seasoned chicken breast mingle with al dente pasta, 
                generously coated in a luscious pesto sauce. Quick to prepare yet satisfying to savor, 
                this dish strikes a perfect balance of savory and aromatic notes, making each bite a symphony of taste and texture.", 
            "directions": ["Cook pasta according to instructions", "Season the pasta", "eat it"], 
            "ingredients": ["chicken", "pasta"],
            "recipe_name": "Chicken Breast Pesto Pasta",
            "serving_size": 1
        }

        If any of the information above given is inappropriate and not suitable to make, please just return "ERROR" `;

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: [{ role: "system", content: prompt }],
    });

    const recipe = completion.choices[0].message.content;
    // const recipeObject = JSON.parse(recipe);

    // const imageResponse = await openai.createImage({
    //     model: "dall-e-3",
    //     prompt: recipeObject.description, 
    //     n: 1,
    //     size: "1024x1024",
    // });

    // const imageUrl = imageResponse.data.data[0].url;

    // const recipeWithImage = {
    //     ...recipeObject, 
    //     imageUrl: imageUrl
    // };

    // Add the generated recipe to the conversation history
    res.send({ role: "system", content: JSON.stringify(recipe) });
    console.log("Generated Recipe: ", recipe);
};

const _createOpenAIInstance = () => {
    const openai = new OpenAI({
        apiKey: process.env.CHATGPT_TOKEN,
    });
    return openai;
};

module.exports = {
    askToChatGpt,
    generateInitialRecipe,
};
