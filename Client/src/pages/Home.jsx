import { Link } from 'react-router-dom';
// import social from '/images/page1.png';
import Button from '../component/Button';

function Home() {
  return (
    <>
    <div   className={`h-screen relative w-full gap-x-3  flex items-center   justify-center px-4`}>
    
      <section className='lg:w-[40%] md:w-[60%] w-[90%] h-[50%] flex justify-center items-center bg-slate-50 bg-opacity-35 rounded-2xl backdrop-blur-lg'>
      <div className="bg-opacity-80 p-8 w-[90%] rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to ChatApp</h1>
        <p className="text-center mb-6 text-gray-700">
          Connect with your friends in <span className='font-semibold'>Real-time.</span> <span className='font-bold text-teal-950'>Sign in</span>   to  Start  Chatting! 
        </p>
        <Link to="/login">
          <section className="w-full flex justify-center items-center gap-x-3">
        <p className='text-gray-900 font-semibold text-[1.2rem]'>Go to</p>   
        <Button buttonContent={"LOGIN"} buttonStyle={"bg-teal-700 text-white w-[30%] min-w-[100px] px-3 py-2 rounded-lg"}/>
          </section>
        </Link>
      </div>
      </section>
    </div>
    </>
  );
}

export default Home;
