import { z } from "zod"


export const formSchema = z.object({
  lyrics:z.string().min(10,{
    message:"Must add  lyrics."
  })
})



export const pptSchema = z.object({
  fontSize: z.string().min(1, {
    message: "Must select a number.",
  }),
  fontFace:z.string().min(1, {
    message: "Must enter a font face.",
  }),
  fontType:z.string().min(1, {
    message: "Select font type.",
  }),

})