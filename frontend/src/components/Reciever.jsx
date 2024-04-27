import { useState } from "react";
import SendMoney from "./SendMoney";

function Reciever({ user, sender, reciever, stateHandler,total }) {
 
    const [ifBeneficiery, setIfBeneficery] = useState(false);
    const [bname, setBname] = useState("")
    const [baccount, setBaccount] = useState("")


    const modalStateHandler = () => {
        setIfBeneficery(!ifBeneficiery)
      }
   
      const valueHandler = (e) => {
        setBname(e.target.innerText.split(" ")[0]);
        setBaccount(e.target.innerText.split(" ")[1]);
        setIfBeneficery(!ifBeneficiery);
      }
   


    return (
        <>
          
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="w-full flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-2xl font-semibold">Beneficeries</h3>
                            <button
                                className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                onClick={stateHandler}
                            >
                                <img src="/cross.png" alt="" className="h-6 w-6" />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto w-96">
                        {ifBeneficiery && <SendMoney user={user} sender={sender} reciever={bname} total={total} recieverAcc={baccount} stateHandlerMain={stateHandler} stateHandlerMoney={modalStateHandler}/>}
                        <ul>
                        <li className="flex justify-between"><span>Name</span><span>Account No.</span></li>
                        {reciever.map((user,i) => <li onClick={valueHandler} key={i} className="flex justify-between my-2 hover:bg-gray-200 cursor-pointer rounded" style={{wordSpacing: "195px"}}>{user.firstName} {user.accountNo}</li>)}
                        </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Reciever;














