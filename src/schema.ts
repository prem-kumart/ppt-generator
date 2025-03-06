import { z } from "zod"

export const formSchema = z.object({
  lyrics:z.string().min(1,{
    message:"Must add  lyrics."
  }),
  insertAt : z.enum(["beginning","end","at"],{
     required_error:'Select where you want to insert the slides.'
  }),
  startPosition : z.optional(z.string().min(1,"Enter a valid value")),
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