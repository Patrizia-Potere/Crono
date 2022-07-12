import React, {useEffect, useState}  from 'react';


function FirstMsg() {
   
const getMsg = () => {                                                      //Saving value of checked box
    let saved = JSON.parse(localStorage.getItem('initial'));
    return  saved || false
}

const [showMsg,setShowMsg] = useState(getMsg);                              //showMsg is for checked box ticked
const [initialMsg, setInitialMsg]= useState(showMsg ? "none" : "block")     //Showing the initial Msg       

useEffect(()=>{
    localStorage.setItem('initial', JSON.stringify(showMsg));               //Setting value for checked box  
},[showMsg])

return (
    <article style={{display:initialMsg}}>
        <p>This App is for your HIIT workout. <br/>
        Just set the times and you are ready to start. <br/>
        You can have max 10 set of max 1min each. <br/>
        All input are in seconds. </p>
        <form > 
            <label htmlFor='show' className='message'>Don't show this message anymore</label>
            <input id="show" name='show' type='checkbox' checked={showMsg} onClick={()=> setShowMsg(!showMsg)}/>
            <input className='message' name='show' value='Got it' onClick={()=> setInitialMsg("none")}/>
        </form>
    </article>
)

}

export default FirstMsg;