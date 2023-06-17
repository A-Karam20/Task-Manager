import {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function CreateAccount(){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleClick(sender){
        if(username == "" || password == "") return toast.warning("Please fill in all the required fields.");

        sender.preventDefault();
        const account = {
            username: username,
            password: password
        };

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/CreateAccount`, account)
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                if(data)
                {
                    toast.success("Account succesfully created.");
                    setUsername("");
                    setPassword("");
                }
                else
                {
                    toast.error("Name already taken.");
                    setUsername();
                }
            })
            .catch(error => {
                toast.error("Error in creating account. Please try again.");
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

            <button onClick={handleClick}>Sign Up</button>
        </form>
    </div>
    );
}

export default CreateAccount;