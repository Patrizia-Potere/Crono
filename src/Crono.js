import React, {useState,useEffect} from 'react';
import Reverse from './Reverse';
import FirstMsg from './FirstMsg';
import './App.css';



const Crono = () => {
    // const validNumber = /^\d{1,10}$/;    //Reg expression
    const validNumber= /^[0-9]*$/;
    const [timing, setTiming] = useState(()=> {
        const saved = localStorage.getItem("initialValue");  //Getting old value
        const Values = JSON.parse(saved);
        return Values || '';
    });
    
    const getMode = ()=> {   
        const initialMode= localStorage.getItem('mode');
            return initialMode || 'Balloons'; 
    }
    const [mode, setMode] = useState(getMode());           //mode is for background
    const [exp, setExp] = useState([0,0,0]);              // exp is for regular exp control
    const [callReverse, setCallReverse] = useState('');     // calling Reverse component
    const [start, setStart] = useState('');                 // starting countdown

    //----------------------------Regular expression checking------------------------------------------//

    const Submit = (e) => {
        e.preventDefault();
        let copy= exp;
        if (timing.num && timing.time && timing.rest) {
            copy[0]=1;
            setExp([...copy]);
        } else {
            alert('Please fill the form');
            copy[0]=0;
            setExp([...copy]);
        }
        if (timing.num.charAt(0)==="0" || timing.time.charAt(0)==="0" || timing.rest.charAt(0)==="0") {
            alert ("All numbers must be greater than zero and don't start with zero");
            copy[1]=0;
            setExp([...copy]);
        } else {
            copy[1]=1; 
            setExp([...copy])
            }
        if (timing.num>10 || timing.time>60 || timing.rest>60) {
            copy[2]=0;
            alert('Num of Set<=10 ; Workout<=60 ; Rest<=60');
            setExp([...copy]);
        } else {
            copy[2]=1;
            setExp([...copy])
            }
        if (exp[0]===1 && exp[1]===1 && exp[2]===1) {
            setCallReverse('call');
        }
    }

    const Change = (e) => {
        const {name,value} = e.target;
        if (value.length > 2) {
            return value.slice(0,2)                     //Check length of input
        }
        if (value.match(validNumber)) {                 //Check if input are numbers        
        setTiming({...timing,[name]:value})
        }
    }

    const MyImage = (e) => {                            //Changing background image
        const myBackground = e.target.value;
        setMode(myBackground)
    }

    useEffect(()=> {                                             
        localStorage.setItem('initialValue', JSON.stringify(timing));       //Setting old value
    },[timing])

    useEffect(()=> {
        document.documentElement.className = mode;                         //Setting background image
        localStorage.setItem('mode',mode);
    },[mode])

    return (
        <section className="flex-container">
            <form> 
                <div >
                <select name="image" id="image" onChange={MyImage} defaultValue={mode}>         {/*Selecting background}*/}
                    <option value="Balloons">Balloons</option>
                    <option value="Gear">Gear</option>
                    <option value="Beach">Beach</option>
                    <option value="Ligth-Mode">Light-Mode</option>
                    <option value="Dark-Mode">Dark-Mode</option>
                </select>
                </div>
            </form>
        <form>            {/*-------------------Input Form---------------------------*/}
            <div>
            <label htmlFor = "num">Number of Set :</label>
            <input name = "num" type = "number" value = {timing.num} onChange = {Change} max={10}/>
            </div>
            <div>
            <label htmlFor = "time">Workout Time : </label>
            <input name = "time" type = "number" value = {timing.time} onChange = {Change} max={60}/>
            </div>
            <div>
            <label htmlFor = "rest">Rest Time : </label>
            <input name = "rest" type = "number" value = {timing.rest} onChange = {Change} max={60}/>
            </div>
            <div>
            <button className="btn" onClick = {Submit}>Submit</button>
            </div>
        </form>
            {callReverse==='call' && 
                <div className="flex-item">
                    <button className="btn" onClick={()=> setStart('countdown')}>Start</button>
                    {start === 'countdown' && <Reverse {...timing} />}
                </div>
            }
            <FirstMsg/>     {/*-----------------Calling initial message*-----------------------------*/}
        </section>
    )
}

export default Crono;