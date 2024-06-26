

const jackSelectorBtn = document.querySelector('#jack-selector')
const jimmySelectorBtn = document.querySelector('#jimmy-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Jack' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'Jack'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'Jack') {
    jackSelectorBtn.classList.add('active-person')
    jimmySelectorBtn.classList.remove('active-person')
  }
  if (name === 'Jimmy') {
    jimmySelectorBtn.classList.add('active-person')
    jackSelectorBtn.classList.remove('active-person')
  }


  chatInput.focus()
}

jackSelectorBtn.onclick = () => updateMessageSender('Jack')
jimmySelectorBtn.onclick = () => updateMessageSender('Jimmy')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }


  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

 
  chatMessages.innerHTML += createChatMessageElement(message)


  chatInputForm.reset()


  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})