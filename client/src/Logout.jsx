function Logout ({ address, balance, logout}) {
    return <form className="container wallet" onSubmit={logout}>
        <h1>Your Wallet</h1>

        <div className="address">Address: {address}</div>
        <div className="balance">Balance: {balance}</div>
        <input type="submit" className="button" value="Logout" />
    </form>
}

export default Logout;