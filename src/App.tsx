
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
import {z} from "zod";



function App() {


  const [slides,setSlides] = useState<SlideType[]>([])
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lyrics:"",
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

  const pres = useRef(new PptxGenJS())

  //Creating the slides
  const createSlides:SubmitHandler<z.infer<typeof formSchema>> = (data: z.infer<typeof formSchema>) => {
    const content = data.lyrics;

    let eachSlideText:string = "";
    
    const newSlides: SlideType[] = [];
    content.split('\n').forEach((line: string,index) => {
             console.log(eachSlideText)
             if( (line.trim() == '' || index == content.split('\n').length - 1) && eachSlideText.trim() != "" ){
                newSlides.push({ name: `Slide ${slides.length + newSlides.length + 1}`, text: eachSlideText });
                eachSlideText = '';
             }else {
               eachSlideText += line + '\n';
             }
    });
    
    setSlides((prevSlides) => [...prevSlides, ...newSlides]);

  }



  //Generating the Presentation slides and creating the file
  const generatePresentation:SubmitHandler<z.infer<typeof pptSchema>> = (data: z.infer<typeof pptSchema>) => {

    console.log(data)
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
      <Form {...form}>
      <form onSubmit={form.handleSubmit(createSlides)} className="w-2/3 space-y-6">
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
          <Button className="w-28 " type="submit">Generate Slides</Button>      
      </form>
      </Form>

       {/* slides preview */}
       {slides.length > 0 ? 
         <div>
            <h2>Slides Preview </h2>
            <div className="grid grid-cols-3 gap-2">
                 {slides.map((slide)=>{return <Slide key={slide.name} slide={slide}/> })}
            </div>
          </div>
          :
          <p>Paste the lyrics and generate slides</p>
        }


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
          <Button type="submit" className='w-28  bg-red-700'>Generate PPT</Button> 
      </form>
      </Form>
      
     </div>
    </>

  )
}

export default App
