import { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { TiThMenu } from "react-icons/ti";
import { BiArrowFromRight } from "react-icons/bi";


function Navigation({id}) {

    const navigate = useNavigate();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate('/login?mode=customer')
    }

    //console.log(user.id)

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 mt-2 ms-3 text-2xl text-black-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
            >


                <TiThMenu />
            </button>

            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarVisible ? '' : '-translate-x-full'
                } sm:translate-x-0`}>

                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li className="text-right text-white md:hidden cursor-pointer" onClick={toggleSidebar}>
                            x
                        </li>
                        <li>
                            <Link
                                to='/customer_dashboard'
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <MdOutlineSpaceDashboard />{" "}
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/customer/${id}/transaction`}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <GrTransaction />{" "}
                                <span className="flex-1 ms-3 whitespace-nowrap">
                                    Transactions
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/customer/${id}`}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <CiUser />{" "}
                                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                            </Link>
                        </li>
                        <li onClick={logoutHandler}>
                            <Link
                                to=''
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <BiArrowFromRight />{" "}
                                <span className="flex-1 ms-3 whitespace-nowrap">LogOut</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    )
}

export default Navigation