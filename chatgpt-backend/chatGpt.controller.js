const { OpenAI } = require("openai");
require("dotenv").config();

const askToChatGpt = async function (req, res) {
    const openai = _createOpenAIInstance();
  
    try {
        let conversationHistory = req.body.conversationHistory || [];
    
        if (conversationHistory.length === 0 && req.body.recipeDetails) {
            const generatedRecipe = await generateInitialRecipe(conversationHistory, req.body.recipeDetails, openai);
            conversationHistory.push(generatedRecipe);
        } else {
            conversationHistory.push({ role: "user", content: req.body.message });
            const completion = await openai.chat.completions.create({
                model: "gpt-4-1106-preview",
                messages: conversationHistory,
            });
            conversationHistory.push({ role: "system", content: completion.choices[0].message.content });
        }
    
        res.send({ 
            from: "chatGpt", 
            data: conversationHistory.at(-1).content, 
            conversationHistory: conversationHistory 
        });
    } catch (error) {
        console.log("Error caught:", error.message);
        if (error.message === "ERROR") {
            console.log("correct thrown");
            res.status(400).send({ error: "ERROR" });
        } else {
            console.log("wrong thrown");
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
  };
  
const generateInitialRecipe = async (req, res) => {
    const openai = _createOpenAIInstance();
    console.log(req);
    const ingredientsText = req.body.ingredients
        .filter(ingredient => ingredient.name)
        .map(ingredient => `${ingredient.name}${ingredient.quantity ? ` (${ingredient.quantity})` : ''}`)
        .join(", ");
    const prompt = `Generate a recipe based on the following details: 
        Cuisine: ${req.body.categories}, 
        Leftovers: ${ingredientsText}, 
        Dietary Restrictions: ${req.body.dietaryRestrictions}.

        The recipe generation should strictly adhere to the provided ingredients and dietary restrictions. 
        If an ingredient is not suitable for consumption (for example, non-food items or inappropriate terms), 
        the system should return "ERROR" instead of a recipe. Suitable recipes should account for the cuisine type and any 
        dietary restrictions specified. If no specific cuisine or dietary restrictions are mentioned, those parameters should be 
        considered as open.

        The recipe should be formatted as shown below, with all elements filled according to the input details. The example provided 
        is for illustrative purposes only and should not influence the generated recipe beyond the structure:
        {
            "allergens": ["Diary", "Nuts"], 
            "categories": ["Italian", "Pasta"],
            "cook_time": "30 minutes", 
            "description": "Indulge in a delightful culinary creation with our Chicken Breast Pesto Pasta,\n 
                crafted from simple yet flavorful ingredients. Tender slices of seasoned chicken breast mingle with al dente pasta,\n 
                generously coated in a luscious pesto sauce. Quick to prepare yet satisfying to savor,\n 
                this dish strikes a perfect balance of savory and aromatic notes, making each bite a symphony of taste and texture.", 
            "directions": ["Cook pasta according to instructions", "Season the pasta", "eat it"], 
            "ingredients": ["chicken", "pasta"],
            "recipe_name": "Chicken Breast Pesto Pasta",
            "serving_size": 1
        }

        Strictly return the recipe in the JSON format above with no other text. If any ingredient provided is unsuitable for creating a recipe, return "ERROR".`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [{ role: "system", content: prompt }],
    });

    const recipe = completion.choices[0].message.content;

    if (recipe.trim().toUpperCase() === "ERROR") {
        return res.status(400).json({ error: "ERROR" });
    }

    const recipeObject = JSON.parse(recipe
        .replace(/(\r\n|\n|\r)/gm, " ") 
        .replace(/\s+/g, " ") 
        .trim()); 
    
    if (!recipeObject["description"]) {
        throw new Error("Recipe description is missing");
    }

    const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: recipeObject.description, 
        n: 1,
        size: "1024x1024",
    });

    const imageUrl = imageResponse.data[0].url;

    const recipeWithImage = {
        ...recipeObject, 
        recipe_img_url: imageUrl
    };

    // Add the generated recipe to the conversation history
    res.send({ role: "system", content: recipeWithImage });
    console.log("Generated Recipe: ", recipeWithImage);
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
