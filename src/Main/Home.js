function Home({mainText}){
    localStorage.clear();
    return(
        <div className="Home-Bar">
            <h1>{mainText}</h1>
            <div className="Home-Links">
            <a href="/LogIn">Log In</a>
            <a href="/CreateAccount">Create Account</a>
            <a href="/">Menu</a>
            </div>
        </div>
    );
}

export default Home;