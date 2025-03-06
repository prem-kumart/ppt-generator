
import './App.css'
import { Button } from './components/ui/button'
import PptxGenJS  from 'pptxgenjs'
import { Textarea } from './components/ui/textarea';
import Slide from './components/Slide';
import {useState, useRef } from 'react'
import { fontList,sampleLyrics } from './data';
import { formSchema,pptSchema } from './schema';
import { SlideType } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler } from "react-hook-form"
import { z}from "zod";
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Input } from './components/ui/input';



function App() {


  const [slides,setSlides] = useState<SlideType[]>([])


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lyrics:"",
      insertAt:"beginning",
      startPosition:"1",
    },
  })

  const pptForm = useForm<z.infer<typeof pptSchema>>({
    resolver: zodResolver(pptSchema),
    defaultValues: {
      fontSize: "16",
      fontFace : "",
      fontType : "",
    },
  })

  const insertAt = form.watch("insertAt");


  const pres = useRef(new PptxGenJS())

  //Creating the slides
  const createSlides:SubmitHandler<z.infer<typeof formSchema>> = (data: z.infer<typeof formSchema>) => {
 
    const content = data.lyrics;

    let eachSlideText:string = "";
    
    const newSlides: SlideType[] = [];
    content.split('\n').forEach((line: string,index) => {
             
             if( (line.trim() == '' || index == content.split('\n').length - 1) && eachSlideText.trim() != "" ){
                newSlides.push({ id: slides.length + newSlides.length + 1, text: eachSlideText });
                eachSlideText = '';
             }else {
               eachSlideText += line + '\n';
             }
    });

    if(data.insertAt == "end"){
        setSlides((prevSlides) => [...prevSlides, ...newSlides]);
        return 
    }

    if(data.insertAt =="beginning"){
       const nextState = [...newSlides,...slides].map((slide,index)=>{ return {...slide,id:index+1} })
       setSlides(nextState);
       return;
    }

    if(data.insertAt == "at"){
      const prevState = slides;
      const nextState = insertAtIndex(prevState,newSlides,Number(data.startPosition)).map((slide,index)=>{return {...slide,id:index+1}})
      setSlides(nextState);

      return;
    }
    
   

  }

  function insertAtIndex(originalArray:SlideType[],newArray:SlideType[],index:number){
    originalArray.splice(index,0,...newArray)
    return originalArray

  }

  const removeSlide = (id:number)=>{
      const nextState  = slides.filter((slide)=> slide.id!=id).map((slide,index)=> {
                                                          return {...slide,id:index+1}
                                                    })
      setSlides(nextState);
      
  }


  //Generating the Presentation slides and creating the file
  const generatePresentation:SubmitHandler<z.infer<typeof pptSchema>> = (data: z.infer<typeof pptSchema>) => {

    pres.current.defineSlideMaster({ 
      title: 'MASTER_SLIDE',
      background: { color: '#000000' },
    });
   
    slides.forEach((slideData)=>{
      const slide = pres.current.addSlide({masterName : 'MASTER_SLIDE'});
      slide.addText(slideData.text, { x: 0 , y: 3, w: "100%", color: "#FFFFFF", fontSize: Number(data.fontSize), align:'center' ,fontFace:data.fontFace ,bold: data.fontType=='bold' ? true : false , italic :data.fontType=='italic' ? true : false});
    })

    if (pres.current) {
      pres.current.writeFile();
    }
  }

  return (

    <>
    <Header />
  
     <div className='flex flex-col gap-10 m-auto pl-40 pr-40 pb-40'>
      <div className='flex gap-10'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(createSlides)} className=" flex  flex-col w-2/3 space-y-6">
          <div className='flex gap-20 items-center'>
          <div className='flex-1/3'>
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
          </div>

          <div className='flex flex-col gap-10'>
             
                      <FormField
                      control={form.control}
                      name="insertAt"
                      render={({ field }) => (
             <FormItem className="space-y-3">
               <FormLabel>Insert Slides</FormLabel>
               <FormControl>
                 <RadioGroup
                   onValueChange={field.onChange}
                   defaultValue={field.value}
                   className="flex flex-col space-y-1"
                 >
                   <FormItem className="flex items-center space-x-3 space-y-0">
                     <FormControl>
                       <RadioGroupItem value="beginning" />
                     </FormControl>
                     <FormLabel className="font-normal">
                       Beginning
                     </FormLabel>
                   </FormItem>
                   <FormItem className="flex items-center space-x-3 space-y-0">
                     <FormControl>
                       <RadioGroupItem value="end" />
                     </FormControl>
                     <FormLabel className="font-normal">
                       End
                     </FormLabel>
                   </FormItem>
                   <FormItem className="flex items-center space-x-3 space-y-0">
                     <FormControl>
                       <RadioGroupItem value="at" />
                     </FormControl>
                     <FormLabel className="font-normal">At</FormLabel>
                   </FormItem>
                 </RadioGroup>
               </FormControl>
               <FormMessage />
             </FormItem>
            
                      )}
                    />
              
                     {insertAt == "at" &&
                               <FormField
                                   control={form.control}
                                   name="startPosition"
                                   render={({ field }) => (
                                     <FormItem>
                                       <FormLabel>Where to insert Slide</FormLabel>
                                       <FormControl>
                                         <Input className='w-40' type="number" placeholder="enter the slide number..." {...field} />
                                       </FormControl>
                                       <FormMessage />
                                     </FormItem>
                                   )}
                                 />
                
                      }
          </div>
          </div>  
       
        
              <Button className="w-40 self-center" type="submit">Generate Slides</Button>
              </form>
        </Form>
      </div>

      <hr />

       {/* slides preview */}
       {slides.length > 0 ? 
         <div>
            <h2>Slides Preview </h2>
            <div className="grid grid-cols-3 gap-2">
                 {slides.map((slide)=>{return <Slide key={slide.id} id={slide.id}  text={slide.text} removeSlide={removeSlide}/> })}
            </div>
            <Button className="w-28 p-4" onClick={()=>setSlides([])}>Delete All Slides</Button>
          </div>
          :
          <p>Slides Preview</p>
        }

 
      <hr />
      {/*Generate the Slides */}
      <Form {...pptForm}>
      <form onSubmit={pptForm.handleSubmit(generatePresentation)} className="w-2/3 space-y-6">

        <div className='flex gap-10'>
         <FormField
          control={pptForm.control}
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
          control={pptForm.control}
          name="fontFace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Face</FormLabel>
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
          control={pptForm.control}
          name="fontType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectItem  value="bold">Bold</SelectItem>
                <SelectItem value="italic">Italic</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
              )}
           />          
      </div>
          <Button type="submit" className='w-28 bg-red-700'>Generate PPT</Button> 
      </form>
      </Form>

      <footer>
           <a href="https://www.flaticon.com/free-icons/quit" title="quit icons">Quit icons created by Pixel perfect - Flaticon</a>
      </footer>
      
     </div>
    </>

  )
}

export default App
