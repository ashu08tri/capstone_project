import { useState } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { getAuthToken } from "../util/token";
import { Toaster,toast } from "sonner";
import Reciever from "../components/Reciever";
import Navigation from "../components/Navigation";

function CustomerDashBoard() {
  const data = useLoaderData();
  
  const [ifBeneficiery, setIfBeneficery] = useState(false);

  

  const modalStateHandler = () => {
    setIfBeneficery(!ifBeneficiery)
    toast.error('Add a benicifery first!')
  }

  

  return (
    <>
      {data ? (
        data.map((user, i) => (
          <div className="h-screen " key={i}>
            
            {ifBeneficiery && user.beneficery.length ? <Reciever user={user._id} sender={user.firstName}
              reciever={user.beneficery}
              total={user.totalAmount}
              stateHandler={modalStateHandler}/> : <Toaster richColors closeButton/>}

            <Navigation id={user._id}/>
            <div className="p-4 sm:ml-64">
              <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-3xl md:text-4xl text-white">The Banking App
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="text-2xl md:text-3xl text-white mb-2">{user.firstName + " " + user.lastName}
                    </p>
                    <p className="text-2xl md:text-3xl text-white">Account Number: {user.accountNo}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-xl md:text-3xl text-white">Credited Amout: {user.credited}&#8377;
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-xl md:text-3xl text-white">Debited Amout: {user.debited}&#8377;
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                    <p className="text-xl md:text-3xl text-white">Balance: {user.totalAmount}&#8377;
                    </p>
                  </div>
                  <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800 active:scale-90" onClick={modalStateHandler}>
                    <p className="text-xl md:text-3xl text-white cursor-pointer">Send Money
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p key={i}></p>
      )}
    </>
  );
}

export default CustomerDashBoard;

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/login?mode=customer')
  }

  let res = await fetch("http://localhost:8080/dashboard", {
    headers: {
      authorization: "Bearer " + token,
    },
  });
  res = await res.json();
  return res.customer;
}
