import { Link, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../util/token';

function AdminDashBoard() {

  const navigate = useNavigate();

  const data = useLoaderData();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate('/login?mode=admin')
}

const transactionHandler = (id) => {
  navigate(`/admintransview/${id}`)
}

  return (
    <>
      <nav className='h-24 flex justify-evenly px-8 items-center bg-gray-50 dark:bg-gray-800 text-white'>

        <Link to='/admin_dashboard' className='text-xl md:text-2xl'>Admin Dashboard</Link>
        <p className='hidden md:block text-3xl'>Banking Web App</p>

        <ul className='flex justify-between items-center gap-8'>
          <li className='cursor-pointer md:text-xl'><Link to='/requests'>Requests</Link></li>
          <li className='cursor-pointer md:text-xl' onClick={logoutHandler}>Logout</li>
        </ul>
      </nav>

      <div className='flex justify-center m-4'>
        <table className='w-screen md:w-1/2 text-left'>
          <thead>
          <tr>
            <th className='border-solid border-2 border-gray-200 p-3'>
              Account Number
            </th>
            <th className='border-solid border-2 border-gray-200 p-3'>
              Customer Name
            </th>
            <th className='border-solid border-2 border-gray-200 p-3'>
              Balance
            </th>
            <th className='border-solid border-2 border-gray-200 p-3'>
              Address
            </th>
            <th className='border-solid border-2 border-gray-200 p-3'>
              Transactions
            </th>
          </tr>
          </thead>
          
          <tbody>
          {data.map((user,i)=><tr key={i} className='odd:bg-zinc-200 border-solid border-2 border-gray-200'>
            <td className='border-solid border-2 border-gray-300 p-2'>{user.accountNo}</td>
            <td className='border-solid border-2 border-gray-300 p-2'>{`${user.firstName} ${user.lastName}`}</td>
            <td className='border-solid border-2 border-gray-300 p-2'>{user.totalAmount}&#8377;</td>
            <td className='border-solid border-2 border-gray-300 p-2'>{user.address}</td>
            <td className='border-solid border-2 border-gray-300 p-2 text-center cursor-pointer hover:scale-110 transition-all' onClick={(e) => transactionHandler(user._id)}>View</td>
          </tr>)}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default AdminDashBoard;

export async function loader() {

  const token = getAuthToken();

  if (!token) {
    return redirect('/login?mode=admin')
  }

  let res = await fetch('http://localhost:8080/dashboard',
    {
      headers: {
        authorization: "Bearer " + token,
      }
    })
  res = await res.json();
  return res.allCustomer

}