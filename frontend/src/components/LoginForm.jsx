import { Form,Link,useSearchParams } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  const isAdminLogin = searchParams.get('mode') === 'admin'


  return (
    <>
     {/*text container */}
     <div className="mt-9">
          <h1 className="text-3xl font-bold text-center">
            Welcome to the Banking App
          </h1>
        </div>
      {/*main container*/}
      <div className="h-screen flex justify-center items-center flex-col">
       
        {/*Form Container */}
        <div className="w-96 h-96 flex items-center justify-center flex-col rounded shadow-lg">
          <p className="text-xl font-bold py-2">{isAdminLogin ? "Admin's Login" : "Customer's Login"}</p>
        <Form className="w-full max-w-sm flex flex-col items-center" method="POST">
          <div className="w-10/12">
            <div className="m-2">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="m-2">
              <input
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                required
              />
            </div>
          </div>
          <div className="mb-4 w-10/12">
            <div className="m-2">
              <label
                className="block text-gray-500 font-bold"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="m-2">
              <input
                name="password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                placeholder="******************"
                required
              />
            </div>
          </div>
          <div className="w-10/12">
              <button
                className="shadow w-full bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Login 
              </button>
            </div>
        </Form>
        <div className="mt-4 w-9/12 flex justify-between">
          <Link to={`?mode=${isAdminLogin ? "customer": "admin"}`} className="transition-all hover:scale-110">{isAdminLogin ? "Customer" : "Admin"}</Link>
          <Link to="/register" className="transition-all hover:scale-110">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
