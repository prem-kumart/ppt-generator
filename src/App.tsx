
import './App.css'
import { Button } from './components/ui/button'
import PptxGenJS  from 'pptxgenjs'
import { Textarea } from './components/ui/textarea';
import Slide from './components/Slide';
import {useState, useRef } from 'react'
import { fontList } from './data';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Header from './components/Header';
import { Input } from './components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import { z } from "zod"
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

// type Inputs = {
//    fontSize : string
//    backgroundColor : string
//    fontFace : string
//    lyrics : string
// }

const formSchema = z.object({
  fontSize: z.string().min(1, {
    message: "Must select a number.",
  }),
  fontFace:z.string().min(1, {
    message: "Must enter a font face.",
  }),
  lyrics:z.string().min(10,{
    message:"Must add  lyrics."
  })
})

function App() {


  const [slides,setSlides] = useState([])
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fontSize: "16",
      fontFace : "",
      lyrics:""
    },
  })



  const pres = useRef(new PptxGenJS())

  //Creating the slides
  const createSlides:SubmitHandler<z.infer<typeof formSchema>> = (data: z.infer<typeof formSchema>) => {
      pres.current.defineSlideMaster({ 
        title: 'MASTER_SLIDE',
        background: { color: '#000000' },
      });

    console.log(data);
    const content = data.lyrics;

    let eachSlideText:string = "";
    content.split('\n').forEach((line: string,index) => {
             
             console.log(line)
             if(line.trim() == '' || index == content.split('\n').length - 1){
                console.log(eachSlideText)
                const slide = pres.current.addSlide({masterName : 'MASTER_SLIDE'});
                slide.addText(eachSlideText, { x: 0 , y: 3, w: "100%", color: "#FFFFFF", fontSize: Number(data.fontSize), align:'center' ,fontFace:data.fontFace});
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
      <Form {...form}>
      <form onSubmit={form.handleSubmit(createSlides)} className="w-2/3 space-y-6">


         <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font Size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {[...Array(61).keys()].map((fontSize)=>{
                           return  <SelectItem key={fontSize} value={`${fontSize}`}>{fontSize}</SelectItem>
                        })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="fontFace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Size</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font face" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {fontList.map((fontName)=>{
                           return  <SelectItem key={fontName} value={`${fontName}`}>{fontName}</SelectItem>
                        })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

           

           
          <FormField
          control={form.control}
          name="lyrics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lyrics to Slides</FormLabel>
              <FormControl>
              <Textarea placeholder={`${sampleLyrics}`} {...field}/>
              </FormControl>
              <FormDescription>
                *Follow the format after empty space new slide starts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}/>
          

           
         
      <Button className="w-28 mt-10" type="submit">Add Slides</Button>      
      
      
      </form>
      </Form>


      {/*Generate the Slides */}
      <Button onClick={generatePresentation} className='w-28 mt-2'>Generate PPT</Button>
      
      
       {/* slides preview */}
       {slides.length > 0 ? 
         <div>
            <h2>Slides Preview </h2>
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
