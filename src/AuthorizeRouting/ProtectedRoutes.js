import {useLocation} from "react-router-dom";
import ClientNavBar from "../Client/ClientNavBar";
import GetTasks from "../Task/ClientTasks";
import CreateTask from "../Task/CreateTask";
import Home from "../Main/Home";
import LogIn from "../Account/LogIn";

const useAuth = () => {
    const clientCrdt = JSON.parse(localStorage.getItem('Client'));
    const storedToken = JSON.parse(localStorage.getItem('Token'));

    return clientCrdt && storedToken;
}

const ProtectedRoutes = () => {
    const setAuth = useAuth();
    const location = useLocation();
    let currentUrl = "";
    
    if(setAuth)
    {
      console.log(location.pathname);
      currentUrl = location.pathname;
      if(currentUrl === "/TaskManager")
      {
        return(<>
          <ClientNavBar />
          <GetTasks />
        </>);
      }
      else if(currentUrl === "/AddTask")
      {
        return(<>
          <ClientNavBar />
          <CreateTask />
        </>);
      }
    }

    return (<>
    <Home mainText="Log In" />
    <LogIn />
  </>);
}

export default ProtectedRoutes;