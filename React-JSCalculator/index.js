function App(){
    const [expression, setExpression]= React.useState("");
    const [answer, setAnswer]= React.useState(0);
    const [screen, setScreen]= React.useState("");

    const display = symbol =>{
        setExpression(prev => (prev+symbol)
        .replace(/--+?-/g,'--')
        .replace(/-+?-/g,'+')
        .replace(/([*/+-])([*/+])/g, '$2')
        .replace(/\.+([\d]*)+\./g,'.$1')
        .replace(/^00/g,'0')
        );

        if(expression[expression.length-1]=="="){
            if(/[0-9.]/.test(symbol)){
                setExpression(symbol);
                setScreen(symbol);
                
            }else{
                setExpression(answer+symbol);
                symbol==="/"? setScreen(answer+"\u00f7")
                :symbol==="*"? setScreen(answer+"\u00d7")
                :symbol==="-"? setScreen(answer+"\u2212")
                :setScreen(answer+symbol);
            }
        }
        else{
            setScreen((expression+symbol)
            .replace(/--+?-/g,'--')
            .replace(/-+?-/g,'+')
            .replace(/([*/+-])([*/+])/g, '$2')
            .replace(/\.+([\d]*)+\./g,'.$1')
            .replace(/^0/g,'')
            .split("")
            .map(x=>{
            return x==="/"? x="\u00f7"
                :x==="*"? x="\u00d7"
                :x==="-"? x="\u2212" 
                :x
            }).join(""));
         }
         setAnswer(symbol==="/"? "\u00f7"
         :symbol==="*"? "\u00d7"
         :symbol==="-"? "\u2212"
         :symbol);     
    };


    const calculate= () => {
        setAnswer(eval(expression));
        setExpression(prev=> prev+"=");
        setScreen(eval(expression));
    };

    const allClear= () =>{
        setExpression("");
        setScreen(0);
        setAnswer(0);

    };

    const clear= () =>{
        setExpression(prev=>prev.split("").slice(0, prev.length -1).join(""));
        setScreen(prev=>prev.split("").slice(0, prev.length -1).join(""));
        setAnswer(0);
    };

    return (<div className="container">
                    <div className="grid">
                        <div className="dis">
                            <input type="text" value={screen} placeholder="0" disabled  id="display"/>
                            <div className="total">{answer}</div>
                        </div>
                        <div className="padButton AC fnKeys" onClick={allClear} id="clear">AC</div>
                        <div className="padButton C fnKeys" onClick={clear}>C</div>
                        <div className="padButton div fnKeys" onClick={()=>display("/")} id="divide">&divide;</div>
                        <div className="padButton mul fnKeys" onClick={()=>display("*")} id="multiply">&times;</div>
                        <div className="padButton syete" onClick={()=>display("7")} id="seven">7</div>
                        <div className="padButton otso" onClick={()=>display("8")} id="eight">8</div>
                        <div className="padButton nwebe" onClick={()=>display("9")} id="nine">9</div>
                        <div className="padButton min fnKeys" onClick={()=>display("-")} id="subtract">&minus;</div>
                        <div className="padButton kwatro" onClick={()=>display("4")} id="four">4</div>
                        <div className="padButton singko" onClick={()=>display("5")} id="five">5</div>
                        <div className="padButton sais" onClick={()=>display("6")} id="six">6</div>
                        <div className="padButton add fnKeys" onClick={()=>display("+")} id="add">+</div>
                        <div className="padButton uno" onClick={()=>display("1")} id="one">1</div>
                        <div className="padButton dos" onClick={()=>display("2")} id="two">2</div>
                        <div className="padButton tres" onClick={()=>display("3")} id="three">3</div>
                        <div className="padButton eql" onClick={calculate} id="equals">=</div>
                        <div className="padButton cero" onClick={()=>display("0")} id="zero">0</div>
                        <div className="padButton dot" onClick={()=>display(".")} id="decimal">.</div>
                        
                    </div>
                </div>
                );
}
ReactDOM.render(<App/>, document.getElementById('app'));