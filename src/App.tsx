
import './App.css'
import { Button } from './components/ui/button'
import PptxGenJS  from 'pptxgenjs'
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import Slide from './components/Slide';
import {useState,useEffect, useRef } from 'react'


function App() {


  const [slides,setSlides] = useState([])

  const pres = useRef(new PptxGenJS())



  //Creating the slides
  const createSlide = (e: any) => {


 
      pres.current.defineSlideMaster({ 
        title: 'MASTER_SLIDE',
        background: { color: '#000000' },

      });

   
    e.preventDefault();
    const content = e.target.content.value;

    let eachSlideText:string = "";
    content.split('\n').forEach((line: string,index) => {
             
             console.log(line)
             if(line.trim() == '' || index == content.split('\n').length - 1){
                console.log(eachSlideText)
                const slide = pres.current.addSlide({masterName : 'MASTER_SLIDE'});
                slide.addText(eachSlideText, { x: 0 , y: 3, w: "100%", color: "#FFFFFF", fontSize: 40, align:'center' });
                eachSlideText = '';
             }else {
               eachSlideText += line + '\n';
             }
    });
    
    setSlides( (prevState)=>[...pres.current._slides]);
    console.log(pres)
  }

  const generatePresentation = () => {
    pres.current.writeFile();
  }


  return (
    
     
     <div className='flex flex-col gap-10'>
      <form onSubmit={createSlide}>
           <div className='flex flex-col gap-2 lg:w-[60%] '>
           <Label htmlFor="message">Convert the lyrics into slides :</Label>
           <Textarea   placeholder='Paste your lyrics here' name="content"/>
           </div>
        
      <Button className="mt-10" type="submit">Add Slides</Button>      
      </form>

      {/*Generate the Slides */}
      <Button onClick={generatePresentation} className='w-28 mt-2'>Generate PPT</Button>
      
      
       {/* slides preview */}
       {slides.length > 0 ? 
         <div>
            <h2>Slides Preview</h2>
            <div className="grid grid-cols-3 gap-2">
                 {slides.map((slide)=>{return <Slide key={slide._name} slide={slide}/> })}
            </div>
          </div>
          :
          <p>Paste the lyrics and generate slides</p>
        }
    </div>

  )
}

export default App
