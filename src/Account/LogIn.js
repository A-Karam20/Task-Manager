import axios from "axios";
import {useState, useContext} from "react";
import { useNavigate } from "react-router-dom"
import { ClientCredentials } from "../Client/Client";
import { toast } from 'react-toastify';

function LogIn(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const clientCrdt = useContext(ClientCredentials);

    const navigate = useNavigate();

    function handleClick(event){
      event.preventDefault();
      if(username === "" || password === "") return toast.warning("Please fill in all the required fields.");

        const account = {
            username: username,
            password: password,
            id : -1
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/LogIn`, account)
            .then((response) => {
                return response.data;
            })
            .then(data => {
                if(!data) return toast.error("Account not found.");
                
                clientCrdt.username = data.Client.Username;
                clientCrdt.password = data.Client.Password;
                clientCrdt.id = data.Client.Id;

                const token = data.Token;
                
                clientCrdt.isLoggedIn = true;

                localStorage.setItem('Client', JSON.stringify(clientCrdt));
                localStorage.setItem('Token', JSON.stringify(token));
                navigate("/TaskManager");
            })
            .catch(error => {
              toast.error("An error occured.");
            })
    }

    return(
      <div className="LogIn">
      <form>
          <div className="Username">
          <label>Username:</label>
          <input
          type="text"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
          maxLength={15}
          ></input>
          </div>

          <div className="Password">
          <label>Password:</label>
          <input
          type="password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          maxLength={40}
          ></input>
          </div>
          <button onClick={handleClick}>Log In</button>
      </form>
  </div>
  );
}

export default LogIn;