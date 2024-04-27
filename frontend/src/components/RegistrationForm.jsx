import { useState } from "react";
import { Form,Link,json,useNavigate } from "react-router-dom";
import {toast} from 'sonner';
import BeneficeryForm from "./BeneficeryForm";

function RegisterationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [beneficeryData, setBeneficeryData] = useState([]);
  const [address, setAddress] = useState("");
  const [amount,setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
 
  const modalStateHandler = () => {
    setShowModal(!showModal)
  }

  const getBeneficeryData = (data) => {
    setBeneficeryData(data)
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      firstName,
      lastName,
      address,
      credited:0,
      debited:0,
      amount,
      accountNo: Math.floor(Math.random()*10000000000).toString(),
      mobile,
      beneficery: beneficeryData
    };
    let res = await fetch("http://localhost:8080/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });

    
  if(!res.ok){
    toast.error('User Not Created!');
    throw json({ message: 'Could not create user.' }, { status: 500 });
  }

    res = await res.json();

    let userReg = await fetch("http://localhost:8080/register/user",{
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({email,password,firstName,lastName})
  })

  if(!userReg.ok){
    throw json({ message: 'User is not register' }, { status: 500 });
  }
     
  await userReg.json();
    
  toast.success('User Created');

  setTimeout(() => {
    navigate('/login?mode=customer');
  },1000)
    
  };

  return (
    <>
    {showModal && <BeneficeryForm stateHandler={modalStateHandler} onFormSubmit={getBeneficeryData}/>}
    <div className="h-screen w-screen flex items-center justify-center">

   <div className="w-1/3 h-full md:h-[calc(100vh-12rem)] flex items-center justify-center flex-col rounded shadow-lg">
    <p className="text-3xl font-semibold py-2">Register yourself!</p>
      <Form className="w-full px-2" onSubmit={SubmitHandler} method="POST">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 bg-transparent border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={email}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={password}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={firstName}
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={lastName}
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="mobile"
              pattern="[1-9]{1}[0-9]{9}"
              onChange={(e) => setMobile(e.target.value)}
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={mobile}
              minLength="10"
              maxLength="10"
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mobile number
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              id="floating_company"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={amount}
              min={2000}
              max={100000}
            />
            <label
              htmlFor="floating_company"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Amount &#x20B9;
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            id="floating_address"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 bg-transparent border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={address}
          />
          <label
            htmlFor="floating_address"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address
          </label>
        </div>
        <div className="w-full flex justify-center py-4">
              <button
                className="shadow w-10/12 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Register
              </button>
            </div>
      </Form>
      <div className="py-1 w-9/12 flex justify-between">
        <span onClick={modalStateHandler} className="cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Add Beneficery</span>
        <Link to="/login?mode=customer" className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">Login</Link>
        </div>
      </div>
      </div>
    </>
  );
}

export default RegisterationForm;
