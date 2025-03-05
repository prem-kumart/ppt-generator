import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function CarouselSize({slides}) {
  
  console.log(slides)
  
  return (
    <>
    <div>
        <p>Total Number of slides : {slides.length}</p>
    </div>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent >
        {slides.map((slide) => (
          <CarouselItem  key={slide._name}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  
                  <span className="text-3xl font-semibold">{slide._slideObjects[0].text[0].text}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}

