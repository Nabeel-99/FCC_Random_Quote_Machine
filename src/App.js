import { useState, useEffect, useRef } from "react";
import './App.css'

function App() { 

  const randomColors = [
    "#4facfe", // Blue
    "#2c3e50", // Dark Grey
    "#6610f2", // Indigo
    "#00b09b", // Dark Green
    "#833ab4", // Purple
    "#ffcf00", // Dark Yellow
    "#f093fb", // Orange
    "#ff416c", // Red
    "#8e5ea2", // Brown
    "#9d50bb" // Lavender
  ];
  

  const [quote, setQuote] = useState({
    text: "",
    author: ""
  })
  
  const getRandom = async() => {
      try {
        const response = await fetch ("https://type.fit/api/quotes")
        const data = await response.json()

        const randomIndex = Math.floor(Math.random() * data.length)
        const randomQuote = data[randomIndex]
        setQuote(randomQuote)

      } catch (error) {
          console.log(error)
      }

      // set the all colors to be the same 
      const randomColorIndex = Math.floor(Math.random() * randomColors.length)
      const randomColor = randomColors[randomColorIndex]

      document.body.style.backgroundColor = randomColor;
      document.getElementById('text').style.color = randomColor;
      document.getElementById("author").style.color = randomColor;
      
      const btnbg = document.querySelectorAll('.btn-bg')
      btnbg.forEach(btn => {
        btn.style.backgroundColor = randomColor
        btn.style.color = 'white'
      })
    }
  
  const effectRunRef = useRef(false);

  useEffect(() => {
    if (!effectRunRef.current) {
      effectRunRef.current = true;
      getRandom();
    }
  });

  // const twitterBtn = () => {
  //   window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(",")[0]}`)
  // }
  const tumblrBtn = () => {
    window.open(`https://www.tumblr.com/widgets/share/tool?posttype=quote&content=${encodeURIComponent(quote.text)} - ${encodeURIComponent(quote.author.split(",")[0])}`);

  }  
  return (
    <div className="App">
        <div className="container mx-auto d-flex flex-column justify-content-center align-items-center vh-100 col-md-5">
          <h1 className="fs-1 text-white mb-3">Random Quote Machine</h1>
        <div id="quote-box" className="bg-white p-5 rounded mb-5">
            <div id="text" className="fs-4 custom-color fw-semibold text-center text-style">"{quote.text}"</div>
            <p id="author" className="fs-5 fst-italic d-flex flex-column align-items-end custom-color text-style">{quote.author.split(",")[0]}</p>
            <div className="d-flex justify-content-between align-items-center"> 
                <div className="d-flex gap-2 "> 
                    <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" className="btn  btn-bg" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                    <button className="btn  btn-bg" onClick={tumblrBtn}> <i className="fab fa-tumblr"></i></button>
                </div>
                    <button id="new-quote" className="btn  btn-bg" onClick={getRandom}>New quote</button>
            </div>
        </div>
    </div>
    </div>
  );
}  

export default App;
