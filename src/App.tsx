
import './App.css'
import { Button } from './components/ui/button'
import PptxGenJS  from 'pptxgenjs'

function App() {
  
  const pres = new PptxGenJS();

  const createSlide = (e: any) => {
    e.preventDefault();

    const slide = pres.addSlide();
    const title = e.target.title.value;
    const subtitle = e.target.subtitle.value;
    //const content = e.target.content.value;
    
    slide.addText(title, { x: 0.5, y: 0.7, w: 3, color: "0000FF", fontSize: 64 });
    slide.addText(subtitle, { x: 2.7, y: 1.0, w: 5, color: "DDDD00", fontSize: 90 });
    
   

  }

  const generatePresentation = () => {
    pres.writeFile();
  }

 
  return (
    <>
       <form onSubmit={createSlide} className="flex flex-col gap-4">
        
        
        <label>
          Content:
          <input type="text" name="content" />
        </label>


        <div>
             <Button type="submit">Create Slide</Button>
        </div>
       
       </form>
      <Button onClick={generatePresentation} className='mt-2'>Generate Ppt</Button>
    </>
  )
}

export default App
