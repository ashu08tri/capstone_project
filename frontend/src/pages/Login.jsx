import { json, redirect } from "react-router-dom";
import { Toaster, toast } from "sonner";
import LoginForm from "../components/LoginForm";

function Login() {
  return(
  <>
  <Toaster position="top-center" richColors closeButton/>
  <LoginForm />
  </>
  )
}

export default Login;

export async function action({ request }) {

  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "customer";

  if(mode != "customer" && mode != "admin"){
    throw json({message: "Unsupported mode"}, {status: 422})
  }

  const data = await request.formData();
  const loginData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/login/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  
  
  if (!response.ok) {
    toast.error('Could not authenticate user!', {
      description: 'Check your credentials again.',
    })
  }
  
  const resData = await response.json();
  const token = resData.accessToken;

  if(resData.status === 401){
    toast.error('Wrong Email or Password!')
  }
  
  localStorage.setItem("token", token);

  if(mode === 'customer'){
    return redirect("/customer_dashboard");
  }else{
    return redirect("/admin_dashboard");
  }
}
