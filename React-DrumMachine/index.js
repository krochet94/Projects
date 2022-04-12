const audioFiles = [
    {
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];


function App(){
    const [volume, setVolume]= React.useState('0.5');
    const [recording, setRecording]= React.useState("");
    const [speed, setSpeed]= React.useState(0.5);
    const playRecording= () => {
        let index = 0;
        let recordArray = recording.split(" ");
        const interval= setInterval(()=>{
            const audioTag = document.getElementById(recordArray[index]);
            audioTag.volume=volume;
            audioTag.currentTime = 0;
            audioTag.play();
            index++;    
        }, speed * 600);
        setTimeout(()=> clearInterval(interval), 600* speed *recordArray.length -1);
    };
    return (<div className="bg-dark min-vh-100 text-danger" id="drum-machine">
            <div className="text-center pt-5" id="display">
                <h2 className="display-2">Drum Machine</h2> <br/>
                <div className="d-flex justify-content-center">
                {audioFiles.map(clip=>(
                    <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
                ))}
                </div>
                
                <br/> <br/>
                <h4>Volume:</h4> <br/>
                <input  type="range" 
                        className="w-50"
                        step="0.01"
                        onChange={e=> setVolume(e.target.value)}
                        value={volume}
                        max="1"
                        min="0" 
                        />
                <h3>{recording}</h3>
                {recording && (
                    <>
                    <button className="btn btn-outline-success m-1" onClick={playRecording}>Play</button>
                    <button className="btn btn-outline-warning m-1" onClick={()=>setRecording('')}>Clear</button>
                    <br/><br/>
                    <h3>Speed:</h3><br/>
                    <input  type="range" 
                        className="w-50"
                        step="0.01"
                        onChange={e=> setSpeed(e.target.value)}
                        value={speed}
                        max="1.2"
                        min="0.1" 
                        />
                    </>
                )}
           
            </div>
            <div class="d-flex justify-content-end text-danger">krochet&nbsp;&nbsp;&nbsp;</div>
         </div>);
}
function Pad({clip, volume, setRecording}){   

    const [active, setActive]=React.useState(false);

    React.useEffect(()=> {
        document.addEventListener("keydown", keyPress);
        return () => {
            document.removeEventListener("keydown", keyPress);
        };  
    }, []);

    const keyPress= (e)=> {
        if(e.keyCode===clip.keyCode) { playButton(); }
    };

    const playButton = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout(()=> setActive(false), 300);
        audioTag.volume=volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setRecording(prev => prev + clip.keyTrigger + " ");
    };

    return (<div className={`btn btn-outline-danger p-4 m-3 ${active && "btn-danger text-white"} drum-pad`} onClick={playButton} id="drum-pad">
        <audio src={clip.url} className="clip" id={clip.keyTrigger}/>
        {clip.keyTrigger} <br/>
    </div>);
}
ReactDOM.render(<App/>, document.getElementById('app'));