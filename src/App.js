import React, { useState } from "react";
import "./App.css";

function Chat({ chat, index, removeChat }) {
  let chatPeople = ["me", "myself", "I"];
  const [joke, setJoke] = useState("");

  function random_reply(chatPeople) {
    return chatPeople[Math.floor(Math.random() * chatPeople.length)];
  }

  const feelingLonely = () => {
    fetch("https://api.icndb.com/jokes/random")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setJoke(myJson.value.joke);
        console.log(myJson.value.joke);
      });
  };

  return (
    <div className="chat">
      <button onClick={() => feelingLonely()}>Feeling Lonely</button>

      <div>{random_reply(chatPeople)}</div>
      {chat.text}
      {joke}

      <div>
        <button onClick={() => removeChat(index)}>x</button>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

function ChatForm({ addChat }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addChat(value);
    setValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}

function App() {
  const [chats, setChats] = useState([]);

  const addChat = text => {
    const newChats = [...chats, { text }];
    setChats(newChats);
  };

  const removeChat = index => {
    const newChats = [...chats];
    newChats.splice(index, 1);
    setChats(newChats);
  };

  return (
    <div className="app">
      <h1>The Lonely Chat Room - Using React Hooks!</h1>
      <div className="chat-list">
        {chats.map((chat, index) => (
          <Chat key={index} index={index} chat={chat} removeChat={removeChat} />
        ))}
        <ChatForm addChat={addChat} />
      </div>
    </div>
  );
}

export default App;
