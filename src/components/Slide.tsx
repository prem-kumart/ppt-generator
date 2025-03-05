import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SlideType } from "@/types"

const Slide = ({ slide }: { slide: SlideType }) => {

  return (

      <Card >
          <CardHeader>
            <CardTitle>{slide.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-ellipsis text-center">
             <p>{slide.text}</p>
          </CardContent>
      </Card>
  )
}

export default Slide

