"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { AxiosError } from "axios"
import { notFound } from "next/navigation"
import "yet-another-react-lightbox/styles.css"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
// import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html"

import Error from "@/app/error"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/useCart"
import Title from "@/components/features/title"
import { Button } from "@/components/ui/button"
import { useActions } from "@/hooks/useActions"
import SkeletonImage from "@/public/skeleton.jpg"
import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/layout/container"
import { calcDiscount } from "@/helpers/calc-price-discount"
import ShoppingCard from "@/components/features/shopping-card"
import ProductTag from "@/components/features/product/product-tag"
import ProductsSlider from "@/components/features/products-slider"
import ProductPrice from "@/components/features/product/product-price"
import { createCEODescription } from "@/helpers/create-ceo-description"
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

  // const priceValidUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]

  // const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://cosmetychka.com.ua"

  // const structuredData = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   name: product ? `${product.name}` : "Товар не знайдено",
  //   description: product ? createCEODescription(product.name, product.description, product.price) : "Товар не знайдено",
  //   brand: product
  //     ? {
  //         "@type": "Brand",
  //         name: product.brand.name,
  //       }
  //     : undefined,
  //   category: product ? product.subcategories.name : undefined,
  //   image: product ? [`${baseUrl}/${product.photos[0].image.url}`] : undefined,
  //   offers: product
  //     ? {
  //         "@type": "Offer",
  //         price: product.hasDiscount ? calcDiscount(product.price, product.discount) : product.price,
  //         priceCurrency: "UAH",
  //         availability: "https://schema.org/" + (product.status === "in_stock" ? "InStock" : "OutOfStock"),
  //         seller: {
  //           "@type": "Organization",
  //           name: "Cosmetychka.com.ua",
  //         },
  //         priceValidUntil: priceValidUntil,
  //         shippingDetails: [
  //           {
  //             "@type": "OfferShippingDetails",
  //             name: "Доставка Укрпоштою по Україні",
  //             shippingRate: {
  //               "@type": "MonetaryAmount",
  //               value: "40",
  //               currency: "UAH",
  //             },
  //             shippingDestination: {
  //               "@type": "DefinedRegion",
  //               addressCountry: "UA",
  //             },
  //             deliveryTime: {
  //               "@type": "ShippingDeliveryTime",
  //               handlingTime: {
  //                 "@type": "QuantitativeValue",
  //                 minValue: 0,
  //                 maxValue: 1,
  //                 unitCode: "DAY",
  //               },
  //               transitTime: {
  //                 "@type": "QuantitativeValue",
  //                 minValue: 2,
  //                 maxValue: 5,
  //                 unitCode: "DAY",
  //               },
  //             },
  //           },
  //           {
  //             "@type": "OfferShippingDetails",
  //             name: "Доставка Новою Поштою по Україні",
  //             shippingRate: {
  //               "@type": "MonetaryAmount",
  //               value: "79",
  //               currency: "UAH",
  //             },
  //             shippingDestination: {
  //               "@type": "DefinedRegion",
  //               addressCountry: "UA",
  //             },
  //             deliveryTime: {
  //               "@type": "ShippingDeliveryTime",
  //               handlingTime: {
  //                 "@type": "QuantitativeValue",
  //                 minValue: 0,
  //                 maxValue: 1,
  //                 unitCode: "DAY",
  //               },
  //               transitTime: {
  //                 "@type": "QuantitativeValue",
  //                 minValue: 1,
  //                 maxValue: 3,
  //                 unitCode: "DAY",
  //               },
  //             },
  //           },
  //         ],
  //         hasMerchantReturnPolicy: {
  //           "@type": "MerchantReturnPolicy",
  //           returnPolicyCategory: "https://schema.org/NonReturnable",
  //           applicableCountry: { "@type": "Country", name: "UA" },
  //         },
  //       }
  //     : undefined,
  //   // aggregateRating: product
  //   //   ? {
  //   //       "@type": "AggregateRating",
  //   //       ratingValue: 5,
  //   //       reviewCount: 5,
  //   //       bestRating: 5,
  //   //       worstRating: 1,
  //   //     }
  //   //   : undefined,
  //   additionalProperty: product
  //     ? product.specs.map((spec) => ({
  //         "@type": "PropertyValue",
  //         name: spec.key,
  //         value: spec.value,
  //       }))
  //     : undefined,
  //   url: `${baseUrl}/product/${product?.id}`,
  // }
console.log('product', product?.description)
  return (
    <Container>
      {/* <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /> */}

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
                      src={photo.image.url || SkeletonImage.src}
                      onClick={() => setCurrentPhotoIndex(index)}
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = SkeletonImage.src
                        ;(e.target as HTMLImageElement).srcset = SkeletonImage.src
                      }}
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
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = SkeletonImage.src
                    ;(e.target as HTMLImageElement).srcset = SkeletonImage.src
                  }}
                  onClick={() => setOpenLightbox(true)}
                  className="border cursor-pointer w-full h-full object-contain p-4"
                  src={product.photos[currentPhotoIndex]?.image.url || SkeletonImage.src}
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
              <Title className="mt-0 mb-1 xl:mb-2 text-center lg:text-left font-medium">{product.name}</Title>
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

            {product && product.hasVariations && (
              <div className="">
                <h5 className="font-light text-xl mb-1 xl:mb-4">Варіанти товару:</h5>
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center flex-col gap-2 mb-2">
                    <div className="border-2 border-primary rounded-full">
                      <div
                        title={product.variantInfo?.variantName}
                        className="w-[38px] h-[38px] rounded-full border-2 border-white"
                        style={{ background: product.variantInfo?.color }}
                      ></div>
                    </div>
                    <span className="max-w-16 truncate" title={product.variantInfo?.variantName}>
                      {product.variantInfo?.variantName}
                    </span>
                  </div>

                  {product.variantInfo?.relatedProducts.map((p) => (
                    <Link
                      className="flex items-center justify-center flex-col gap-2 mb-2 cursor-pointer"
                      key={p.id}
                      href={`/product/${p.id}`}
                    >
                      <div
                        title={p.variantInfo?.variantName}
                        className="w-[40px] h-[40px] rounded-full"
                        style={{ background: p.variantInfo?.color }}
                      ></div>
                      <span className="max-w-16 truncate" title={p.variantInfo?.variantName}>
                        {p.variantInfo?.variantName}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {product ? (
              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: product.description }}
                // dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({ data: product.description }) }}
              />
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
