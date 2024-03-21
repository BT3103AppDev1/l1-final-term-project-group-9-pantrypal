
<template>
    <div class="popup-container" @mousedown.self.prevent="this.$emit('close')">
        <div class="chatbox-container">
            <div class="container">
                <h1>Chefbot</h1>
                <div class="messageBox mt-8">
                    <template v-for="(message, index) in messages" :key="index">
                        <div :class="message.from == 'user' ? 'messageFromUser' : 'messageFromChatGpt'">
                            <div :class="message.from == 'user' ? 'userMessageWrapper' : 'chatGptMessageWrapper'">
                                <div :class="message.from == 'user' ? 'userMessageContent' : 'chatGptMessageContent'">{{ message.data }}</div>
                            </div>
                        </div>
                    </template>
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
                        Ask
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
            };
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
        
                const conversationHistory = this.messages.map(m => ({
                    role: m.from === 'user' ? 'user' : 'assistant',
                    content: m.data,
                }));
        
                await axios
                    .post('http://localhost:3000/chatbot', {
                        message,
                        conversationHistory, 
                    })
                .then((response) => {
                    this.messages.push({
                        from: 'chatGpt',
                        data: response.data.data, 
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
      font-family: 'Roboto', sans-serif;
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
      background-color: #1877F2;
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
    }
    
    .askButton {
      background-color: #1877F2;
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
      background-color: #145CB3;
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
    </style>