
import './App.css'
import { Button } from './components/ui/button'
import PptxGenJS  from 'pptxgenjs'
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import Slide from './components/Slide';
import {useState, useRef } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Header from './components/Header';
import { Input } from './components/ui/input';
import {useForm, SubmitHandler} from 'react-hook-form';
import { create } from 'domain';
const sampleLyrics = 
`
--- Paste your lyrics here ---

--- Sample Format ---
You were the Word at the beginning
One with  God the  Lord Most High
Your hidden glory in creation
Now revealed in You our Christ

What a beautiful Name it is
What a beautiful Name it is 
The Name of Jesus Christ my King
 
What a beautiful Name it is
Nothing compares to this
What a beautiful Name it is 
The Name of Jesus

You didn’t want heaven without us
So Jesus You brought heaven down
My sin was great Your love was greater
What could separate us now?
`

type Inputs = {
   fontSize : string
   backgroundColor : string
   fontFace : string
   lyrics : string
}


function App() {


  const [slides,setSlides] = useState([])
  const {register,handleSubmit,watch,formState:{errors}} = useForm<Inputs>();



  const pres = useRef(new PptxGenJS())

  //Creating the slides
  const createSlides:SubmitHandler<Inputs> = (e: any) => {
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
                slide.addText(eachSlideText, { x: 0 , y: 3, w: "100%", color: "#FFFFFF", fontSize: 40, align:'center' ,fontFace:'Arial'});
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

    <>
    <Header />
  
     <div className='flex flex-col gap-10 ml-48'>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(createSlides)}>
       
           <div className="flex gap-2">
             <Label htmlFor="font-size">Font Size</Label>
             <Select {...register("fontSize", {required:"Select the font-size"})} >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="font-size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select the size</SelectLabel>
                        {[...Array(61).keys()].map((fontSize)=>{
                           return  <SelectItem key={fontSize} value={`${fontSize}`}>{fontSize}</SelectItem>
                        })}
                       
                        </SelectGroup>
                      </SelectContent>
             </Select>
           </div>
           {errors.fontSize && <span className='text-red-700'>{errors.fontSize.message}</span>}

           <div className="flex gap-2">
             <Label htmlFor="font-size">Font-color</Label>
             <div className='h-10 w-20 border-2 rounded-md border-black'>
                 
             </div>
        
           </div>

           <div className="flex gap-2 items-center ">
             <Label htmlFor="font-size">Font-face</Label>
             <Input {...register("fontFace",{required : 'Enter the font face'})} className="w-60" placeholder='font face' />
             <span className='text-sm ml-2' >Default : Arial</span>
           </div>
           {errors.fontFace && <span className='text-red-700'>{errors.fontFace.message}</span>}
        
           
           <div className='flex flex-col gap-2 lg:w-[60%] '>
           <Label htmlFor="lyrics-text">Add Song lyrics</Label>
           <Textarea {...register("lyrics", {required:"Add some lyrics to generate slides"})} id="lyrics-text"  placeholder={`${sampleLyrics}`} name="content"/>
           </div>
           {errors.lyrics && <span className='text-red-700'>{errors.lyrics.message}</span>}
        
      <Button className="w-28 mt-10" type="submit">Add Slides</Button>      
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


    </>

  )
}

export default App
