import { FC } from "react"

import Title from "./title"
import Container from "../layout/container"
import { Product } from "@/types/entities.types"
import { ProductCard } from "./product/product-card"
import ProductCardSkeleton from "./product/product-card-skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

interface Props {
  title: string
  products: Product[]
}

const ProductsSlider: FC<Props> = ({ title, products }) => {
  return (
    <Container>
      <div className="mb-50 lg:mb-40">
        <Title>{title}</Title>

        <div className="flex justify-between mt-10 mb-20">
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {products.length
                ? products.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-1md:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <ProductCard key={product.id} product={product} />
                    </CarouselItem>
                  ))
                : [...Array(5)].map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1md:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <ProductCardSkeleton key={index} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </Container>
  )
}

export default ProductsSlider
