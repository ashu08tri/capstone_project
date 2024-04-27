import { getAuthToken } from "../util/token";
import { useLoaderData, useNavigate, redirect, Link } from "react-router-dom";
import { Toaster, toast } from 'sonner';

function Requests() {

  const data = useLoaderData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate('/login?mode=admin')
  }

  const submitHandler = async (id, reqID, firstName, lastName, mobile, address) => {

    const token = getAuthToken();

    const reqData = {
      firstName,
      lastName,
      mobile,
      address,
      userId: id
    }
    let res = await fetch('http://localhost:8080/edit/' + id, {
      headers: {
        authorization: "Bearer " + token,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(reqData)
    });

    res = await res.json();
    res.ok ? toast.success('Update Successful!') : toast.error('something Went Wrong!');

    let delRes = await fetch('http://localhost:8080/request/' + reqID, {
      headers: {
        authorization: "Bearer " + token,
      },
      method: 'DELETE',
    });

    delRes = await delRes.json();

    setTimeout(() => {
      navigate('/requests')
    }, 1500)

  }

  const deleteHandler = async (reqID) => {

    const token = getAuthToken();

    let delRes = await fetch('http://localhost:8080/request/' + reqID, {
      headers: {
        authorization: "Bearer " + token,
      },
      method: 'DELETE',
    });

    delRes = await delRes.json();
    delRes.ok && toast.error('Deleted Successful!');

    setTimeout(() => {
      navigate('/requests')
    }, 1500)
  }

  return (
    <>
      <Toaster richColors closeButton />
      <nav className='h-24 flex justify-evenly px-8 items-center bg-gray-50 dark:bg-gray-800 text-white'>

        <Link to='/admin_dashboard' className='text-xl md:text-2xl'>Admin Dashboard</Link>
        <p className='hidden md:block text-3xl'>Banking Web App</p>

        <ul className='flex justify-between items-center gap-8'>
          <li className='cursor-pointer md:text-xl'><Link to='/requests'>Requests</Link></li>
          <li className='cursor-pointer md:text-xl' onClick={logoutHandler}>Logout</li>
        </ul>
      </nav>

      <div className="flex justify-center">
        <ul className="w-3/4 mt-12 flex flex-col justify-center gap-2">
          {data.length ? data.map((req, i) => <p key={i} className="flex w-full justify-between text-xl odd:bg-zinc-200 bg-zinc-300 rounded-lg rounded-tr-lg rounded-br-none">
            <li className="p-3">
              Name: {`${req.firstName} ${req.lastName}`}
            </li>
            <li className="p-3">Mobile: {req.mobile}</li>
            <li className="p-3">Address: {req.address}</li>
            <li>
              <button className="py-3 px-6 bg-green-400 mr-2"
                onClick={() => submitHandler(req.userId,
                  req._id,
                  req.firstName,
                  req.lastName,
                  req.mobile,
                  req.address)}>
                Update
              </button>
              <button className="py-3 px-6 bg-red-500 rounded-tr-lg rounded-b-none" onClick={() => deleteHandler(req._id)}>Delete</button>
            </li>
          </p>) : <p className=" h-[calc(100vh-10rem)] text-2xl flex items-center justify-center">No Requests!</p>}
        </ul>
      </div>

    </>
  )
}

export default Requests;

export const loader = async () => {

  const token = getAuthToken();

  if (!token) {
    return redirect('/login?mode=admin')
  }

  let res = await fetch('http://localhost:8080/requests', {
    headers: {
      authorization: "Bearer " + token,
    }
  })

  res = await res.json();

  if (res.status === 403) {
    return redirect('/customer_dashboard')
  }

  return res;
}


