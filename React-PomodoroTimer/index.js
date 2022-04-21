function App(){
    const [displayTime, setDisplayTime]= React.useState(25*60);
    const [breakTime, setBreakTime]= React.useState(5*60);
    const [sessionTime, setSessionTime] = React.useState(25*60); 
    const [timerOn, setTimerOn] = React.useState (false);
    const [onBreak, setOnBreak] = React.useState(false);
    const [breakAudio, setBreakAudio] = React.useState(new Audio("./breakTime.mp3"));


    const playSound = () =>{
        breakAudio.currentTime = 0;
        breakAudio.play();
    }

    const formatTime = time =>{
        let minutes = Math.floor(time/60);
        let seconds = time % 60;
        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        );
    };

    const changeTime = (amount, type)=>{
        if(!timerOn && (breakTime + amount)>0 && (sessionTime + amount)>0 && (breakTime + amount)<=3600 && (sessionTime + amount)<=3600){
            if(type==="break"){
                setBreakTime(prev => prev + amount);
            }
            else{
                setSessionTime(prev => prev + amount);
                setDisplayTime(sessionTime + amount);
            }
        }
    }


    const controlTime = () => {
        let second= 1000;
        let date= new Date().getTime();
        let nextDate= new Date().getTime() + second;
        let onBreakVar = onBreak;
        if(!timerOn){
            let interval = setInterval(()=> {
                date= new Date().getTime();
                if(date > nextDate){
                    setDisplayTime(prev => {
                        if( prev <= 0 && !onBreakVar){
                            playSound();
                            onBreakVar = true;
                            setOnBreak(true);
                            return breakTime;
                        }else if(prev <= 0 && onBreakVar){
                            playSound();
                            onBreakVar = false;
                            setOnBreak(false);
                            return sessionTime;
                        }
                        return prev-1;
                    });
                    nextDate+= second;
                }
            },1000);
            localStorage.clear();
            localStorage.setItem("interval-id", interval);
        }

        else if(timerOn){clearInterval(localStorage.getItem("interval-id"));}
        setTimerOn(!timerOn);
         
    }

    const resetTime = () => {
        clearInterval(localStorage.getItem("interval-id"));
        setTimerOn(false);
        setOnBreak(false);
        setDisplayTime(25*60);
        setBreakTime(5*60);
        setSessionTime(25*60);
        breakAudio.currentTime = 0;
    }

    return(
        <div className="center-align">
            <h1>Pomodoro Timer</h1>
            <h3>{onBreak? "Break" : "Session"}</h3>
            <h1 id="time-left"> {formatTime(displayTime)}</h1>
            <button className="btn-medium red accent-4 black-text" onClick={controlTime} id="start_stop">
                {timerOn
                ? <i className="material-icons medium">pause_circle_outline</i>
                : <i className="material-icons medium">play_circle_outline</i>
                }
            </button>
            <button className="btn-medium red accent-4 black-text" onClick={resetTime} id="reset">
                <i className="material-icons medium">autorenew</i>
            </button>
            <div className="dual-container">
                <Length
                    title={"Break Length"}
                    changeTime={changeTime}
                    type={"break"}
                    time={breakTime}
                />

                <Length
                    title={"Session Length"}
                    changeTime={changeTime}
                    type={"session"}
                    time={sessionTime}
                />      
            </div>
        </div>

    ); 
}

function Length({title, changeTime, type, time}){
    return (
        <div>
            <h3 id="timer-label">{title}</h3>
            <div className="time-sets" id={type==`break` ? `break-label` : `session-label`}>
                <button 
                    className="btn-medium red accent-4 black-text"
                    onClick={()=>changeTime(-60, type)}
                    id={type==`break`?`break-decrement`:`session-decrement`}>
                    <i className="material-icons">arrow_drop_down</i>
                </button>
                <h3 id={type==`break`?`break-length`:`session-length`}>
                    {Math.floor(time/60)}</h3>   
                <button className="btn-medium red accent-4 black-text"
                    onClick={()=>changeTime(60, type)}
                    id={type==`break`?`break-increment`:`session-increment`}>
                    <i className="material-icons">arrow_drop_up</i>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'));