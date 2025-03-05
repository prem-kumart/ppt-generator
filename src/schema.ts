import { z } from "zod"


export const formSchema = z.object({
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