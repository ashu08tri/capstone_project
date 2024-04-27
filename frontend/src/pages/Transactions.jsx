import { getAuthToken } from "../util/token";
import {useLoaderData,useParams} from "react-router-dom";
import Navigation from "../components/Navigation";

function Transactions() {
    
    const data = useLoaderData();

    const params = useParams();
    const id = params.id;
    
console.log(data)
  return (
    <>
    <Navigation id={id}/>
    <h1 className="text-center text-4xl my-3">Transaction History</h1>
    <ul>
     {data.length ? data.map((user,i) => 
        <li  key={i} className="flex justify-evenly text-xl p-3 odd:bg-zinc-200 bg-zinc-300"><span clas>Sent to: {user.reciever}</span><span>Debited: {user.amount}&#8377;</span><span>On: {user.date.split('T')[0]}</span></li>
     ):<li className="text-center text-3xl">No Transaction Data!</li>}
     </ul>
    </>
  )
}

export default Transactions;

export const loader = async({params}) => {
    const token = getAuthToken();

    if (!token) {
      return redirect('/login?mode=customer')
    }

    const id = params.id;
    try{
        let res = await fetch('http://localhost:8080/user_transaction/' + id);
        res = await res.json();
        return res;
    }catch(err){
        console.log(err)
    }
}