import React, {useState,useEffect,useRef} from 'react';

const Reverse = ({num,time,rest}) => {
    const timer=useRef(time);                           //workout time
    const interval=useRef(rest);                        //rest time
    const counter= useRef(num);                         //number of set
    const toggle = useRef(true);                        //Switching between workout and rest time
    const [back, setBack] =useState(timer.current);
    //-------------------------------------Declaration of Songs--------------------------------------------------
    const [five]= useState(new Audio("5_4_3_2_1.mp3"));
    const [beep] = useState(new Audio("beep_censor_sound.mp3"));
    const [gong] = useState(new Audio("gong.mp3"));
    const soundbeep = useRef(beep);
    const sound_5= useRef(five);
    const soundgong = useRef(gong);

    
    useEffect(()=> {
        if (back>0 && counter.current>0) {
         if (back===5) {sound_5.current.play()}   
        let clock =setInterval(()=> {setBack(oldvalue=>oldvalue-1)},1000);
         return () => {clearInterval(clock)}
        }
        if (back===0) {
            if (counter.current===1) {soundgong.current.play()}
            else soundbeep.current.play()
        }
        setTimeout(()=> {
         if (toggle.current && counter.current>1) {
                setBack(interval.current);
                toggle.current= !toggle.current;
                    } else if (counter.current>1) {
                            setBack(timer.current);
                            toggle.current= !toggle.current;
                            counter.current= counter.current-1;
                           }
            },1000)
    },[back])
    
return (
<div className='count'>
    {back}
</div>
)
}

export default Reverse;