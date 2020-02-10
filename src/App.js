import React, { useState } from "react";
import "./App.css";

function Chat({ chat, index, removeChat }) {
  let chatPeople = ["me", "myself", "I"];

  function random_reply(chatPeople) {
    if (chat.text.includes("Chuck") == true) {
      return "Fact";
    } else {
      return chatPeople[Math.floor(Math.random() * chatPeople.length)];
    }
  }

  console.log(chat.text);

  return (
    <div className="chat">
      <div>{random_reply(chatPeople)}</div>
      {chat.text}
      <div>
        <button onClick={() => removeChat(index)}>x</button>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

function ChatForm({ addChat, addJoke }) {
  const [value, setValue] = useState("");
  const [joke, setJoke] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addChat(value);
    setValue("");
  };

  const feelingLonely = () => {
    fetch("https://api.icndb.com/jokes/random")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setJoke(myJson.value.joke);
        addJoke(joke);
        // console.log(myJson.value.joke);
      });
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
      <button onClick={e => feelingLonely()}>Feeling Lonely</button>
    </div>
  );
}

function App() {
  const [chats, setChats] = useState([]);

  const addChat = text => {
    const newChats = [...chats, { text }];
    setChats(newChats);
  };

  const addJoke = text => {
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
        <ChatForm addJoke={addJoke} addChat={addChat} />
      </div>
    </div>
  );
}

export default App;
