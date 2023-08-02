function Unlock ({ password, setPassword, unlock, setValue }) {
    return <div>
      <form className="container wallet" onSubmit={unlock}>
        <h1>Please sign in with your password</h1>
  
        <label>
          Password:
          <input 
            placeholder="Type a password:" 
            value={password}
            onChange={setValue(setPassword)} ></input>
        </label>
  
        <input type="submit" className="button" value="Unlock" />
      </form>
    </div>   
}

export default Unlock