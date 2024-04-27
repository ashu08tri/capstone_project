import { getAuthToken } from "../util/token";
import { useLoaderData, Link, useNavigate } from "react-router-dom";


function AdminTransview() {

    const navigate = useNavigate();

    const data = useLoaderData();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate('/login?mode=admin')
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

            {data.length > 0 && <h1 className="text-center text-3xl my-6">Transactions of {data[0].sender}</h1>}

            <ul>
                {data.length ? data.map((user, i) =>
                    <li key={i} className="flex justify-evenly text-xl p-3 odd:bg-zinc-200 bg-zinc-300"><span clas>Sent to: {user.reciever}</span><span>Debited: {user.amount}&#8377;</span><span>On: {user.date.split('T')[0]}</span></li>
                ) : <li className="text-center text-3xl">No Transaction Data!</li>}
            </ul>
        </>
    )
}

export default AdminTransview;

export const loader = async ({ params }) => {
    const token = getAuthToken();

    if (!token) {
        return redirect('/login?mode=admin')
    }

    const id = params.id;

    try {
        let res = await fetch('http://localhost:8080/user_transaction/' + id);
        res = await res.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}