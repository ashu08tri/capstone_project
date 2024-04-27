import { Form, json, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster, toast } from "sonner";

function SendMoney({ user, sender, reciever, recieverAcc, total, stateHandlerMain, stateHandlerMoney }) {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      user,
      sender,
      reciever,
      total,
      amount,
      recieverAcc,
    };

    let res = await fetch("http://localhost:8080/transaction", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    });


    if (!res.ok) {
      throw json({ message: 'Could not send money.' }, { status: 500 });
    }

    res = await res.json();

    let debRes = await fetch("http://localhost:8080/debited", {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'PUT',
      body: JSON.stringify({ user, amount, total })
    })

    if (!debRes.ok) {
      toast.error('Failed to send money!')
      throw json({ message: 'Could not send monry.' }, { status: 500 });
    }

    debRes = await debRes.json();

    toast.success('Transaction Successfull 😉')

    setAmount("");

    setTimeout(() => {
      stateHandlerMain(false);
      stateHandlerMoney(false);
      navigate('/customer_dashboard')
    }, 1500)
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <Toaster richColors closeButton />
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="w-full flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">Send money to {reciever}</h3>
              <button
                className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={stateHandlerMoney}
              >
                <img src="/cross.png" alt="" className="h-6 w-6" />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <Form
                className="w-full px-2"
                onSubmit={SubmitHandler}
                method="POST"
              >
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    pattern="[1-9]{1}[0-9]{9}"
                    name="reciverAcc"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={recieverAcc}
                    onChange={() => { }}
                    minLength={10}
                    maxLength={10}
                  />
                  <label
                    htmlFor="floating_company"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Account No:
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="hidden">
                    <input type="text" name="user" required value={user} onChange={() => { }} />
                  </div>
                  <div className="hidden">
                    <input type="text" name="sender" required value={sender} onChange={() => { }} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="reciever"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 bg-transparent border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={reciever}
                      onChange={() => { }}
                    />
                    <label
                      htmlFor="floating_address"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="amount"
                      onChange={(e) => setAmount(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 border-0 bg-transparent border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      max={25000}
                      value={amount}
                    />
                    <label
                      htmlFor="floating_address"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Amount
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-center py-4">
                  <button className="shadow w-10/12 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                    Pay
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendMoney;
