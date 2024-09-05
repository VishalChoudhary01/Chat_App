import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Home from './pages/Home';

function App() {
  return (
    <>
    <section className='w-full h-full absolute bg-gradient-to-br from-teal-200 from-5% via-teal-400 via-40% to-cyan-900 to-80% -z-10 '></section>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
