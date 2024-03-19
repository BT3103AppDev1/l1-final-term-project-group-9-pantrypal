<template>
  <div class="chatbox-container">
    <div class="container">
      <h1>Chefbot</h1>
      <div class="messageBox mt-8">
        <template>
          <div class="community-page">
            <div class="recipe-list">
              <div v-for="recipe in recipes" :key="recipe.recipe_id" class="recipe-card">
                <div class="info">
                  <span>By {{ recipe.user_id }}</span>
                  <span>{{ recipe.categories.join(", ") }}</span>
                </div>
                <h2>{{ recipe.recipe_name }}</h2>
                <img :src="recipe.recipe_img_url" :alt="recipe.recipe_name" />
                <p>{{ recipe.description }}</p>
                <button @click="viewRecipe(recipe)">View Recipe</button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="inputContainer">
        <input
          v-model="currentMessage"
          type="text"
          class="messageInput"
          placeholder="Ask me anything..."
        />
        <button @click="sendMessage(currentMessage)" class="askButton">Ask</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Recipe Generator",
  data() {
    return {
      currentMessage: "",
      messages: [],
    };
  },
  methods: {
    async sendMessage(message) {
      this.messages.push({
        from: "user",
        data: message,
      });

      await axios
        .post("http://localhost:3000/chatbot", {
          message: message,
        })
        .then((response) => {
          this.messages.push({
            from: "chatGpt",
            data: response.data.data, // Access the 'data' property of the response object
          });
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

.chatbox-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.container {
  width: 360px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Roboto", sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #222;
  padding: 16px;
  margin: 0;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e7e7e7;
}

.messageBox {
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.messageFromUser,
.messageFromChatGpt {
  display: flex;
}

.messageBox {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 16px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  flex-grow: 1;
}

.messageFromUser,
.messageFromChatGpt {
  display: flex;
  margin-bottom: 8px;
}

.userMessageWrapper,
.chatGptMessageWrapper {
  display: flex;
  flex-direction: column;
}

.userMessageWrapper {
  align-self: flex-end;
}

.chatGptMessageWrapper {
  align-self: flex-start;
}

.userMessageContent,
.chatGptMessageContent {
  max-width: 60%;
  padding: 8px 12px;
  border-radius: 18px;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 1.4;
}

.userMessageContent {
  background-color: #1877f2;
  color: white;
  border-top-left-radius: 0;
}

.chatGptMessageContent {
  background-color: #ededed;
  color: #222;
  border-top-right-radius: 0;
}

.userMessageTimestamp,
.chatGptMessageTimestamp {
  font-size: 10px;
  color: #999;
  margin-top: 2px;
}

.userMessageTimestamp {
  align-self: flex-end;
}

.chatGptMessageTimestamp {
  align-self: flex-start;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f0f0f0;
}

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 16px;
  background-color: white;
  border-radius: 24px;

  <div class="recipeGenerator">
    <h1>Recipe Generator</h1>
    <CircleButton logo="src/assets/chefbot-button.png" @click="toggleChefBot" />
    <ChefBot v-if="showChefBot" @close="showChefBot = false" />
  </div>
</template>
  
  <script>
  import ChefBot from '@/components/ChefBot.vue';
  import CircleButton from '@/components/CircleButton.vue';
  
  export default {
    name: 'Recipe Generator',
    components: {
      ChefBot,
      CircleButton,
    },
    data() {
      return {
        showChefBot: false,
      };
    },
    methods: {
      toggleChefBot() {
        this.showChefBot = !this.showChefBot;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>  