import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import Input from '../component/Input';
import Button from '../component/Button';
import { IoSend } from "react-icons/io5";

const socket = io('http://localhost:5000');

function Chat() {
  const location = useLocation();
  const { username, profilePic } = location.state || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    socket.emit('registerUser', username);

    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', { to: recipient, text: message, from: username });
    setMessage('');
  };

  return (
    <section className='w-full flex justify-center items-center h-screen'>
      <div className="flex flex-col lg:w-[65%] lg:max-w-[440px] h-[650px] w-[400px] lg:h-[650px] lg:max-h-[95%] rounded-2xl border-r-2 border-b-2 shadow-lg shadow-teal-800 border-teal-600 bg-gray-800 bg-opacity-30">
        <div className=" md:p-3 p-2 border-b flex items-center">
          <img
            src={profilePic}
            alt="Profile"
            className="lg:w-12 md:h-10 md:w-10 h-8 w-8 lg:h-12 rounded-full mr-4"
          />
          <h1 className="lg:text-lg md:text-[1em] text-[0.9em] font-bold text-white">{username}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 z-10">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${msg.from === username ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-3 max-w-xs rounded-lg ${msg.from === username ? 'bg-cyan-700 text-white' : 'bg-neutral-600 text-white'}`}>
                <strong>{msg.from}: </strong>{msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-teal-200 ">
          <Input
            inputType="text"
            inputStyle="p-2 placeholder:text-teal-100 text-white rounded-xl w-full bg-teal-700 bg-opacity-50 border border-teal-500 outline-none mb-2"
            inputValue={recipient}
            inputChange={(e) => setRecipient(e.target.value)}
            placeholderText="Enter Recipient Username"
          />
          <Input
            inputType="text"
            inputStyle="p-2 placeholder:text-teal-100 text-white rounded-xl w-full bg-teal-700 bg-opacity-50 border border-teal-500 outline-none mb-2"
            inputValue={message}
            inputChange={(e) => setMessage(e.target.value)}
            placeholderText="Type a message here..."
          />
          <Button
            buttonType="submit"
            buttonContent={
              <p className="flex justify-center items-center gap-x-2">
                <span>Send Message</span>
                <span><IoSend /></span>
              </p>
            }
            buttonStyle="bg-stone-900 text-white p-2 rounded w-full"
          />
        </form>
      </div>
    </section>
  );
}

export default Chat;
