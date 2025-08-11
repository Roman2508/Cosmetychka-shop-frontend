"use client"

import Image from "next/image"
import { useState } from "react"
import { AxiosError } from "axios"
import { notFound } from "next/navigation"
import "yet-another-react-lightbox/styles.css"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"

import Error from "@/app/error"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/useCart"
import Title from "@/components/features/title"
import { Button } from "@/components/ui/button"
import { useActions } from "@/hooks/useActions"
import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/layout/container"
import ShoppingCard from "@/components/features/shopping-card"
import ProductTag from "@/components/features/product/product-tag"
import ProductsSlider from "@/components/features/products-slider"
import ProductPrice from "@/components/features/product/product-price"
import ProductStatus from "@/components/features/product/product-status"
import AddToFavouriteIcon from "@/components/features/add-to-favourite-icon"
import { useGetOneProduct, useProductsByCategory } from "@/hooks/queries/products-queries"

export default function FullProductPage() {
  const { product, error } = useGetOneProduct()
  const { products: sameCategoryProducts } = useProductsByCategory(product?.subcategories.id)

  const { items: cartItems } = useCart()
  const { addToCart, removeFromCart } = useActions()

  const currentCartElement = cartItems.find((cartItem) => cartItem.product.id === product?.id)

  const onToggleItemToCart = () => {
    if (!product) return
    if (currentCartElement) {
      removeFromCart({ id: currentCartElement.product.id })
      return
    }
    addToCart({ product, quantity: 1, price: product.price })
  }

  const oneClickBuy = () => {
    if (!product) return
    if (!currentCartElement) {
      addToCart({ product, quantity: 1, price: product.price })
    }
  }

  const [openLightbox, setOpenLightbox] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  if (error && (error as AxiosError).status !== 404) {
    return notFound()
  }

  if (error) {
    return <Error />
  }

  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5 xl:gap-10 my-15">
        <div className="flex flex-col-reverse sm:flex-row gap-2 items-center sm:items-start lg:gap-4 w-full justify-center">
          <div className="flex flex-row sm:flex-col gap-2 sm:gap-4 max-w-[90vw] sm:w-[80px] xl:w-[100px] max-h-[400px] xl:max-h-[520px] overflow-auto">
            {product
              ? product.photos.map((photo, index) => (
                  <div key={index}>
                    <Image
                      width={100}
                      height={100}
                      alt="Product"
                      src={photo.image.url}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={cn(
                        index === currentPhotoIndex ? "border-primary" : "",
                        "border cursor-pointer min-w-[80px] sm:min-w-full w-[80px] sm:w-full h-[80px] xl:h-[100px] object-contain p-2",
                      )}
                    />
                  </div>
                ))
              : [...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="w-[80px] h-[80px] xl:w-[100px] xl:h-[100px] mb-2" />
                ))}
          </div>

          <div className="w-full 2xs:w-[400px] h-[400px] xl:w-[520px] xl:h-[520px] sm:m-0 relative">
            {product ? (
              <>
                <Image
                  width={1000}
                  height={1000}
                  alt="Product"
                  onClick={() => setOpenLightbox(true)}
                  src={product.photos[currentPhotoIndex].image.url || ""}
                  className="border cursor-pointer w-full h-full object-contain p-4"
                />

                <div className="absolute right-2 top-2 flex flex-col gap-1">
                  {product.tags.map((tag) => (
                    <ProductTag key={tag} tag={tag} />
                  ))}
                </div>
              </>
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
        </div>

        {/* повноекранна галерея */}
        <Lightbox
          open={openLightbox}
          index={currentPhotoIndex}
          plugins={[Zoom, Thumbnails]}
          zoom={{ maxZoomPixelRatio: 3 }}
          close={() => setOpenLightbox(false)}
          on={{ view: ({ index }) => setCurrentPhotoIndex(index) }}
          slides={product?.photos.map((p) => ({ src: p.image.url })) || []}
        />

        <div className="w-full flex flex-col-reverse xl:flex-row items-center lg:items-start gap-2 xl:gap-0">
          <div className="flex flex-col items-center lg:items-start flex-1">
            {product ? <ProductStatus status={product.status} /> : <Skeleton className="w-[120px] h-[24px]" />}

            {product ? (
              <Title className="mt-0 mb-1 xl:mb-2 text-left font-medium">{product.name}</Title>
            ) : (
              <Skeleton className="w-[50%] h-[36px] my-1 xl:my-2" />
            )}

            {product ? (
              <h5 className="font-light text-xl mb-1 xl:mb-4">{product.subcategories.name}</h5>
            ) : (
              <Skeleton className="w-[30%] h-[28px] mb-1 xl:mb-4" />
            )}

            {product ? (
              <div className="flex gap-2 [&>p]:text-2xl font-semibold mb-4">
                <ProductPrice price={product.price} discount={product.discount} hasDiscount={product.hasDiscount} />
              </div>
            ) : (
              <Skeleton className="w-[100px] h-[32px] mb-4" />
            )}

            {product ? (
              <p className="font-light text-justify lg:text-left">{product?.description}</p>
            ) : (
              <div>
                <Skeleton className="w-[50vw] lg:w-[40vw] h-[24px] mb-1" />
                <Skeleton className="w-[50vw] lg:w-[30vw] h-[24px] mb-1" />
                <Skeleton className="w-[50vw] lg:w-[35vw] h-[24px]" />
              </div>
            )}

            {product ? (
              <div className="flex flex-col w-[240px] my-4 xl:my-8">
                <Button variant="outline" onClick={onToggleItemToCart}>
                  {currentCartElement ? "Вже в корзині" : "Додати до корзини"}
                </Button>

                <ShoppingCard onClick={oneClickBuy} />
              </div>
            ) : (
              <div className="flex gap-1 flex-col w-[240px] my-4 xl:my-8">
                <Skeleton className="w-full h-[48px]" />
                <Skeleton className="w-full h-[48px]" />
              </div>
            )}
          </div>

          <div className="">
            {product ? <AddToFavouriteIcon product={product} /> : <Skeleton className="w-10 h-10 rounded-full" />}
          </div>
        </div>
      </div>

      <div className="mb-15">
        {product ? (
          <Title className="mt-0 mb-6">Характеристики</Title>
        ) : (
          <Skeleton className="w-[240px] h-[36px] mb-6 mx-auto" />
        )}

        <div className="border p-4">
          {product ? (
            <>
              <div className="flex justify-between flex-col md:flex-row p-2 odd:bg-muted">
                <div className="font-bold md:font-regular">Бренд:</div>
                <div>{product?.brand.name}</div>
              </div>

              <div className="flex justify-between flex-col md:flex-row p-2 odd:bg-muted">
                <div className="font-bold md:font-regular">Стать:</div>
                <div>
                  {product?.gender === "man" ? "Для чоловіків" : product?.gender === "woman" ? "Для жінок" : "Унісекс"}
                </div>
              </div>

              {product.specs.map((spec) => (
                <div className="flex justify-between flex-col md:flex-row p-2 odd:bg-muted" key={spec.key}>
                  <div className="font-bold md:font-regular">{spec.key}</div>
                  <div>{spec.value}</div>
                </div>
              ))}
            </>
          ) : (
            [...Array(5)].map((_, index) => <Skeleton key={index} className="w-full h-[40px] mb-2" />)
          )}
        </div>
      </div>

      <ProductsSlider title="Ще товари категорії" products={sameCategoryProducts ? sameCategoryProducts.docs : []} />
    </Container>
  )
}
