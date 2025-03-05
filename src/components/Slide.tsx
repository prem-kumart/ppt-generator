import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SlideProps {
  slide: {
    _name: string;
    _slideObjects: {
      text: {
        text: string;
      }[];
    }[];
  };
}

const Slide: React.FC<SlideProps> = ({ slide }) => {

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

