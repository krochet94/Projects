 

function App(){
    const [quotes, setQuotes]= React.useState([]);
    const [randomQuote, setRandomQuote]= React.useState("");
    const [color, setColor]= React.useState("#111");
    
    React.useEffect(()=>{
      async function fetchData(){
            const response = await fetch("https://type.fit/api/quotes") 
            const data = await response.json();
            setQuotes(data);
            setRandomQuote(data[Math.floor(Math.random() * data.length)]);
        }
     fetchData();
    },[])

   

    const getNewQuote = () =>{
        const colors = [
            '#16a085',
            '#27ae60',
            '#2c3e50',
            '#f39c12',
            '#e74c3c',
            '#9b59b6',
            '#FB6964',
            '#342224',
            '#472E32',
            '#BDBB99',
            '#77B1A9',
            '#73A857'
          ];
        setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setColor(colors[Math.floor(Math.random() * colors.length)]);

    }

    return (
        <div style={{backgroundColor: color, minHeight: '100vh'}}>
        <div className='container p-5'>
            <div className='jumbotron' id='quote-box'>
                <div className='card' align='center'>
                    <div className="card-header"><h3 style={{color:color, fontWeight:'bolder'}}>Very Inspirational Quotes</h3></div>
                    <div className="card-body" >
                        {randomQuote ?(
                            <>
                            <h2 className="card-text" id='text' style={{color:color}}>&quot;{randomQuote.text}&quot;</h2><br/>
                            <h3 className="card-title" id='author' style={{color:color, fontWeight:'bold'}}>- {randomQuote.author||"Anonymous"}</h3><br/><br/>
                            </>
                        )                      
                        :(<h3 style={{color:color, fontWeight:'bold'}}>Loading<br/><i className='fa fa-spinner'></i><br/><br/></h3>)}
                        <button onClick={getNewQuote} className="btn btn-lg ml-3" id='new-quote' style={{backgroundColor:color, color:'white', fontWeight:'bold'}}>Another Quote</button>
                    </div>
                    <div className='card-footer'>
                    <div className="row d-flex justify-content-center">
                                <a href={"https://twitter.com/intent/tweet?hastags=quotes&related=freecodecamp&text="
                                 + encodeURIComponent('"'+ randomQuote.text + '"' +randomQuote.author)}
                                target='_blank' className='btn' id='tweet-quote'>
                                    <i className="fa fa-twitter" style={{fontSize:'30px', color:color}}></i>
                                </a>
                                    
                                <a href={"https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="
                                 + encodeURIComponent(randomQuote.author) + "&content=" + encodeURIComponent(randomQuote.text)
                                 + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                                } 
                                 target='_blank' className='btn' id='tumblr-quote'>
                                    <i className="fa fa-tumblr" style={{fontSize:'28px',color:color}}></i>
                                </a>
                                
                        </div>
                    </div>
                </div>
            </div>   
        </div>
        </div>
     
    );
   
    
    

}

ReactDOM.render(<App/>, document.getElementById('app'));


