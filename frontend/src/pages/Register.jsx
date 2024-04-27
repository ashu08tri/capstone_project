import RegisterationForm from '../components/RegistrationForm';
import { Toaster } from 'sonner';

function Register() {
  return (
    <>
    <Toaster position="top-center" richColors closeButton/>
    <RegisterationForm/>
    </>
    
  )
}

export default Register;