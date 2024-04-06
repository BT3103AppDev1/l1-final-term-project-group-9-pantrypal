const { OpenAI } = require("openai");
require("dotenv").config();

const askToChatGpt = async function (req, res) {
    const openai = _createOpenAIInstance();

    try {
        const userConversationHistory = req.body.conversationHistory || [];
        const recipeDetails = req.body.selectedRecipe;

        const recipeContextMessage = {
            role: "system",
            content: `This is the given recipe: ${recipeDetails.recipe_name}. ${recipeDetails.description}. Ingredients: ${recipeDetails.ingredients.join(', ')}. Instructions: ${recipeDetails.directions}
            When answering questions, please refer specifically to this recipe and not any other recipe. Any questions that cannot be answered directly from the recipe should 
            be answered as per normal, do not mention how the given recipe does not contain this information.`
        };

        const apiConversationHistory = [recipeContextMessage, ...userConversationHistory];

        if (req.body.message) {
            apiConversationHistory.push({ role: "user", content: req.body.message });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: apiConversationHistory,
        });

        userConversationHistory.push({ role: "assistant", content: completion.choices[0].message.content });

        res.send({ 
            from: "chatGpt", 
            data: userConversationHistory.at(-1).content, 
            conversationHistory: userConversationHistory 
        });
    } catch (error) {
        console.log("Error caught:", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

  
const generateInitialRecipe = async (req, res) => {
    const openai = _createOpenAIInstance();
    console.log(req);
    const ingredientsText = req.body.ingredients
        .filter(ingredient => ingredient.name)
        .map(ingredient => `${ingredient.name}${ingredient.quantity ? ` (${ingredient.quantity})` : ''}`)
        .join(", ");
    let prompt = ``;
    if (req.body.first) {
        prompt = `Generate a recipe based on the following details: 
            Cuisine: ${req.body.categories}, 
            Leftovers: ${ingredientsText}, 
            Dietary Restrictions: ${req.body.dietaryRestrictions}.

            The recipe generation should strictly adhere to the provided ingredients, their estimated quantities and dietary restrictions. 
            If an ingredient is not suitable for consumption (for example, non-food items or inappropriate terms), 
            the system should return "ERROR" instead of a recipe. Suitable recipes should account for the cuisine type and any 
            dietary restrictions specified. If no specific cuisine or dietary restrictions are mentioned, those parameters should be 
            considered as open. The recipe given just has to meet at least one of the categories and at least one of the ingredients.

            Note that "cook_time" is to be returned as an integer only, representing the number of minutes. The "categories" can only be from 
            this pre-defined list: ["Asian", "Beverages", "Breakfast and Brunch", "Desserts and Snacks", "Fast Food", "Healthy Choices", "Late-night Eats", 
            "Local Delights", "Others", "Specialty", "Western"].

            The recipe should be formatted as shown below, with all elements filled according to the input details. The example provided 
            is for illustrative purposes only and should not influence the generated recipe beyond the structure:
            {
                "allergens": ["Diary", "Nuts"], 
                "categories": ["Western"],
                "cook_time": 30, 
                "description": "Indulge in a delightful culinary creation with our Chicken Breast Pesto Pasta,\n 
                    crafted from simple yet flavorful ingredients. Tender slices of seasoned chicken breast mingle with al dente pasta,\n 
                    generously coated in a luscious pesto sauce. Quick to prepare yet satisfying to savor,\n 
                    this dish strikes a perfect balance of savory and aromatic notes, making each bite a symphony of taste and texture.", 
                "directions": ["Cook pasta according to instructions", "Season the pasta", "eat it"], 
                "ingredients": ["100g chicken", "100g pasta"],
                "recipe_name": "Chicken Breast Pesto Pasta",
                "serving_size": 1
            }

            Strictly return the recipe in the JSON format above with no other text. If any ingredient provided is unsuitable for creating a recipe, return "ERROR".`;
    } else {
        prompt = `Generate a recipe based on the following details: 
            Cuisine: ${req.body.categories}, 
            Leftovers: ${ingredientsText}, 
            Dietary Restrictions: ${req.body.dietaryRestrictions}.

            The recipe generation should strictly adhere to the provided ingredients, their estimated quantities and dietary restrictions. 
            If an ingredient is not suitable for consumption (for example, non-food items or inappropriate terms), 
            the system should return "ERROR" instead of a recipe. Suitable recipes should account for the cuisine type and any 
            dietary restrictions specified. If no specific cuisine or dietary restrictions are mentioned, those parameters should be 
            considered as open. The recipe given just has to meet at least one of the categories and at least one of the ingredients.

            Note that "cook_time" is to be returned as an integer only, representing the number of minutes. The "categories" can only be from 
            this pre-defined list: ["Asian", "Beverages", "Breakfast and Brunch", "Desserts and Snacks", "Fast Food", "Healthy Choices", "Late-night Eats", 
            "Local Delights", "Others", "Specialty", "Western"].

            Do not generate the same recipe as this: ${req.body.prev_recipe_name}.

            The recipe should be formatted as shown below, with all elements filled according to the input details. The example provided 
            is for illustrative purposes only and should not influence the generated recipe beyond the structure:
            {
                "allergens": ["Diary", "Nuts"], 
                "categories": ["Western"],
                "cook_time": "30 minutes", 
                "description": "Indulge in a delightful culinary creation with our Chicken Breast Pesto Pasta,\n 
                    crafted from simple yet flavorful ingredients. Tender slices of seasoned chicken breast mingle with al dente pasta,\n 
                    generously coated in a luscious pesto sauce. Quick to prepare yet satisfying to savor,\n 
                    this dish strikes a perfect balance of savory and aromatic notes, making each bite a symphony of taste and texture.", 
                "directions": ["Cook pasta according to instructions", "Season the pasta", "eat it"], 
                "ingredients": ["100g chicken", "100g pasta"],
                "recipe_name": "Chicken Breast Pesto Pasta",
                "serving_size": 1
            }

            Strictly return the recipe in the JSON format above with no other text. If any ingredient provided is unsuitable for creating a recipe, return "ERROR".`;
    }
    const completion = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [{ role: "system", content: prompt }],
    });

    let recipe = completion.choices[0].message.content;

    const startIndex = recipe.indexOf('{');

    
    const endIndex = recipe.lastIndexOf('}');

  
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) { 
        recipe = recipe.substring(startIndex, endIndex + 1);
    }


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
     // const imageUrl = "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1";

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
