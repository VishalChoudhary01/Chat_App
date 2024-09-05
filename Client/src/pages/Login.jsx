import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import greatday from '/images/greatday.jpg'
import Input from '../component/Input'

function Login() {
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && profilePic && gender) {
      navigate('/chat', { state: { username, profilePic, gender } });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex w-full items-center gap-x-3 justify-center h-screen">
      <section className='lg:w-[40%] hidden  lg:flex justify-end p-5'>
        <img src={greatday} alt="" className='w-[70%] rounded-xl shadow-2xl shadow-teal-900  h-[10%]'/>
      </section>
      <section className='lg:w-[60%] w-[90%]  lg:ml-32'>
      <div className="bg-teal-200 shadow-2xl border-r border-b p-8 rounded-lg  w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center ">ChatApp</h2>
        <Input  inputType={"text"} inputStyle={"border-2 placeholder:text-teal-800 placeholder:font-mediumbold border-teal-500 transition-all rounded-xl focus:border-teal-700 outline-none bg-transparent  p-2 w-full mb-4"} inputValue={username} inputChange={(e) => setUsername(e.target.value)} placeholderText={"Enter Your Username"} />
        <Input  inputType={"file"} inputStyle={"border-2  border-teal-500 rounded-xl  bg-transparent  p-2 w-full mb-4"} inputChange={handleFileChange} />
        
        {profilePic && (
          <img
            src={profilePic}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full mb-4 mx-auto"
          />
        )}
        <div className="mb-4">
          <label className="block text-teal-900 font-semibold mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border-2 border-teal-500 focus:border-teal-600 outline-none rounded-full p-2 w-full bg-transparent"
          >
            <option value="" >Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          onClick={handleLogin}
          className="bg-teal-900 font-medium tracking-wider uppercase text-white p-2 rounded w-full"
        >
          Login
        </button>
      </div>
      </section>
    </div>
  );
}

export default Login;
