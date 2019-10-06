function solve() {
   const sendButton = document.getElementById('send'); 
   const messageContainer = document.getElementById('chat_input');

   sendButton.addEventListener('click', sendMessage);

   function sendMessage() {
      let message = messageContainer.value;

      let newMessage = document.createElement('div');
      newMessage.classList.add('message', 'my-message');
      newMessage.textContent = message;

      document.getElementById('chat_messages').appendChild(newMessage);

      messageContainer.value = '';
   }
}
