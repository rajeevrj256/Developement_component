import React, { useEffect, useState } from 'react'

const Stopwatch = () => {
    const [hour,setHour]=useState(0);
    const [minute,setMinute]=useState(0);
    const [second,setsecond]=useState(0);
    const [running,setrunnning]=useState(false);

    const handletime=()=>{
        setrunnning((prev)=>!prev);
    }

    useEffect(()=>{
        let interval;
        if(running){
        interval=setInterval(()=>{

       
         
            setsecond(prevsec=>{
                if(prevsec==59){
                    setMinute((prevmin)=>{
                        if(prevmin==59){

                            setHour(prevhour=>prevhour+1);
                            return 0;
                        }

                        return prevmin+1;
                    });
                    return 0;
                }
                return prevsec+1;
            });
        },1000)
    }else{
        clearInterval(interval);
    }
     return () => clearInterval(interval);

    },[running]);

    
  return (
    <div>
        <p>{hour} : {minute} : {second}</p>
        <button onClick={handletime}>{!running?"start":"stop"}</button>
        <button onClick={()=>{
            setHour(0);
            setMinute(0);
            setsecond(0);
            setrunnning(false);

        }}>Reset</button>
      
    </div>
  )
}

export default Stopwatch
