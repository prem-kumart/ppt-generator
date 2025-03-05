import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Slide = ({slide}) => {

  return (

      <Card >
          <CardHeader>
            <CardTitle>{slide._name}</CardTitle>
          </CardHeader>
          <CardContent className="text-ellipsis text-center">
             <p>{slide._slideObjects[0].text[0].text}</p>
          </CardContent>
      </Card>
  )
}

export default Slide

