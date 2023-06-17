function ClientNavBar(){
    const storedClient = JSON.parse(localStorage.getItem('Client'));

    return(
        <div className="Home-Bar">
            <h1>Hello, {storedClient.username}</h1>
            <div className="Home-Links">
            <a href="/TaskManager">Task Manager</a>
            <a href="/AddTask">Add Task</a>
            <a href="/">Log Out</a>
            </div>
        </div>
    );
}

export default ClientNavBar;