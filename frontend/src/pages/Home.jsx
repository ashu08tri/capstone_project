import { Link } from "react-router-dom";

function Home() {
 
  
  return (
    <>
    <div className="h-screen flex justify-center items-center flex-col">
    <h1 className="text-3xl">Welcome to Banking App</h1>
    <div className="mt-4">
    <button className="px-5 py-2 bg-cyan-200 m-2"><Link to='/login?mode=customer'>Login</Link></button>
    <button className="px-5 py-2 bg-cyan-200 m-2"><Link to='/register'>Register</Link></button>
    </div>
    </div>
    
    </>
  )
}

export default Home;