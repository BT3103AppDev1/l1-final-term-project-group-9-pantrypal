<template>
    <div class="popup-container" @mousedown.self.prevent="this.$emit('close')">
        <div class="chatbox-container">
            <div class="container">
                <div class="chefbot-icon-container">
                    <img src="../assets/chefbot-icon.png" height="85px" width="85px"/>
                </div>
                <div class="messageBox mt-8" ref="messageBox">
                    <template v-for="(message, index) in messages" :key="index">
                        <div :class="message.from == 'user' ? 'messageFromUser' : 'messageFromChatGpt'">
                            <div :class="message.from == 'user' ? 'userMessageWrapper' : 'chatGptMessageWrapper'">
                                <div :class="message.from == 'user' ? 'userMessageContent' : 'chatGptMessageContent'">{{ message.data }}</div>
                            </div>
                        </div>
                    </template>
                    <div v-if="isTyping" class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <form v-on:submit.prevent="sendMessage" class="inputContainer">
                    <input
                        v-model="currentMessage"
                        type="text"
                        class="messageInput"
                        placeholder="Ask me anything..."
                    />
                    <button
                        type="submit"
                        class="askButton"
                    >
                        <img src="../assets/send-icon.png" height="20px">
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
    
    
    <script>
    import axios from 'axios';
    
    export default {
        name: 'ChefBot',
        data() {
            return {
            currentMessage: '',
            messages: [],
            isTyping: false,
            };
        },
        props: {
          selectedRecipe: {
            type: Object,
            required: true,
          },
        },
        mounted() {
            console.log(this.selectedRecipe);
            console.log("mounted");
          const initialMessage = `Welcome to ChefBot! Let's get cooking with your selected recipe: ${this.selectedRecipe.recipe_name}. Do you have any questions?`;

          this.messages.push({
              from: 'chatGpt',
              data: initialMessage,
          });
        },
        methods: {
            async sendMessage() {
                const message = this.currentMessage.trim();

                if (!message) return;

                this.currentMessage = null;
                
                this.messages.push({
                    from: 'user',
                    data: message,
                });
        
                this.scrollToBottom();
                this.isTyping = true;

                const conversationHistory = this.messages.map(m => ({
                    role: m.from === 'user' ? 'user' : 'assistant',
                    content: m.data,
                }));
        
                await axios
                    .post('https://us-central1-pantrypal-e1225.cloudfunctions.net/api/chatbot', {
                        message,
                        conversationHistory, 
                        selectedRecipe: this.selectedRecipe,
                    })
                .then((response) => {
                    this.isTyping = false;
                    this.messages.push({
                        from: 'chatGpt',
                        data: response.data.data, 
                    });
                    this.scrollToBottom();
                });
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    const messageBox = this.$refs.messageBox;
                    messageBox.scrollTo({
                        top: messageBox.scrollHeight,
                        behavior: 'smooth'
                    });
                });
            },
        },
    };
    </script>
    
<style scoped>    
.popup-container {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
}

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
}

.chefbot-icon-container {
    display: flex;
    justify-content: center;
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
transition: scroll-behavior 0.5s ease-in-out;
}

.messageFromUser,
.messageFromChatGpt {
display: flex; }

.messageFromUser,
.userMessageWrapper {
    justify-content: right;
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
background-color: #9bb35f;
color: white;
border-top-right-radius: 0;
}

.chatGptMessageContent {
background-color: #EDEDED;
color: #222;
border-top-left-radius: 0;
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
margin-right: 8px;
font-family: 'DM Sans', sans-serif;
}

.askButton {
background-color: #9bb35f;
color: white;
font-size: 16px;
padding: 8px 16px;
border: none;
outline: none;
cursor: pointer;
border-radius: 24px;
transition: background-color 0.3s ease-in-out;
}

.askButton:hover {
background-color: #8da551;
}

@media (max-width: 480px) {
.container {
    width: 100%;
    max-width: none;
    border-radius: 0;
}
}
.chatbox-container {
position: fixed;
bottom: 24px;
right: 24px;
z-index: 1000;
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

.typing-indicator {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
}

.typing-indicator span {
  height: 10px;
  width: 10px;
  background-color: #999;
  border-radius: 50%;
  margin: 0 5px;
  animation: typing-indicator 0.8s infinite ease-in-out;
}

.typing-indicator span:nth-of-type(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-of-type(3) {
  animation-delay: 0.4s;
}

@keyframes typing-indicator {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0);
  }
}
</style>