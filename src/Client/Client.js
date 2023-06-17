import {createContext} from "react";

export const ClientCredentials = createContext({
    username : "null",
    password : null,
    id : 0,
    isLoggedIn : false
});

export const ClientTasks = createContext({
  tasks: [] 
  });
