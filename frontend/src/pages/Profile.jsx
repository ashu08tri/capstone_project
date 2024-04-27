import { useState } from "react";
import { Form, redirect, useLoaderData, useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { getAuthToken } from "../util/token";
import BeneficeryForm from "../components/BeneficeryForm";
import Navigation from "../components/Navigation";

function Profile() {

  const data = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState(data[0].firstName);
  const [lastName, setLastName] = useState(data[0].lastName);
  const [mobile, setMobile] = useState(data[0].mobile);
  const [address, setAddress] = useState(data[0].address);


  const submitHandler = async (e) => {
    e.preventDefault();

    const token = getAuthToken();

    const formData = {
      firstName,
      lastName,
      mobile,
      address,
      userId: id
    }

    if (firstName === data[0].firstName && lastName === data[0].lastName && mobile === data[0].mobile && address === data[0].address) {
      toast.error('Edit something first')
      return
    }else {

      try {
        let res = await fetch('http://localhost:8080/requests', {
          headers: {
            authorization: "Bearer " + token,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(formData)
        });

        res = await res.json();
        res.ok ? toast.success('Request sent to Admin!') : toast.error('something Went Wrong!');
        setTimeout(() => {
          navigate('/customer_dashboard')
        }, 1500)
        

      } catch (err) {
        console.log(err);
      }

    }
  }

  const beneficerySaveHandler = async (formData) => {
    try {
      let res = await fetch('http://localhost:8080/addBeneficery/' + id, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      res = await res.json()
    } catch (err) {
      console.log(err);
    }
  }

  const modalHandler = () => {
    setModal(!modal);
  }

  return (
    <>
      <Navigation id={data[0]._id} />
      <Toaster richColors closeButton />
      <div className="h-screen w-screen flex items-center justify-center flex-col md:flex-row">

        <div className="h-1/2 w-full overflow-hidden md:w-1/6 md:h-[calc(100vh-12rem)] md:ml-10 flex md:flex-col justify-center items-center rounded shadow-lg border-r-2 border-solid border-gray-200 text-gray-500">
          <p className="text-xl md:text-2xl font-semibold py-2 my-3 text-gray-600 pl-3 md:pl-0">{data[0].firstName}'s Details!</p>
          <p className="text-md md:text-xl font-semibold py-2 my-3 justify-self-end">Account No: {data[0].accountNo}</p>
          <p className="text-md md:text-xl font-semibold py-2 my-3">Balance: {data[0].totalAmount}&#8377;</p>
          <span onClick={modalHandler} className="cursor-pointer text-sm md:text-md transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 py-2 my-3">Add Beneficery</span>
        </div>

        <div className="w-screen h-screen md:w-1/2 md:h-[calc(100vh-12rem)] flex items-center justify-center flex-col rounded shadow-lg">
          {modal && <BeneficeryForm onFormSubmit={beneficerySaveHandler} stateHandler={modalHandler} />}

          <div className="hidden w-full h-1/4 border-b-2 border-solid border-gray-200 pl-6 md:flex flex-col gap-5">
            <h1 className="text-xl semi-bold text-gray-600">Personal Info</h1>
            <table className="w-3/4 text-left">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data[0].email}</td>
                  <td>{data[0].mobile}</td>
                  <td>{data[0].address}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full h-3/4 pl-6 flex flex-col justify-center gap-6">
            <h1 className="text-xl semi-bold text-gray-600">Edit Info</h1>
            <Form className="w-full p-2" onSubmit={submitHandler} method="POST">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                    value={firstName}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                    value={lastName}
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={mobile}
                    minLength="10"
                    maxLength="10"
                  />
                  <label
                    htmlFor="floating_phone"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Mobile number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    id="floating_address"
                    className="block py-2.5 px-0 w-full text-md text-gray-900 border-0 bg-transparent border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={address}
                  />
                  <label
                    htmlFor="floating_address"
                    className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address
                  </label>
                </div>
              </div>

              <div className="w-full flex justify-center py-4">
                <button
                  className="shadow w-10/12 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                  Request Update!
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;

export const loader = async ({ params }) => {

  const token = getAuthToken();

  if (!token) {
    return redirect('/login?mode=customer')
  }

  try {
    let res = await fetch('http://localhost:8080/customer/' + params.id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err)
  }
}