import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
interface SlideProps {
  id: number;
  text: string;
  removeSlide: (id:number) => void;
}



const Slide:React.FC<SlideProps> = ({ id,text,removeSlide }) => {

  return (
    <>
   
      <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center" >
               <p>{`Slide ${id}`}</p>
               <img className="w-6 h-6" src="./assets/remove.png" alt="delete-icon" onClick={()=>removeSlide(id)}/>
              </CardTitle>
          </CardHeader>
          <CardContent className="text-ellipsis text-center">
             <p>{text}</p>
          </CardContent>
      </Card>
      </>
  )
}

export default Slide

