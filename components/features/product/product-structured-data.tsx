import { Product } from "@/types/entities.types"
import { calcDiscount } from "@/helpers/calc-price-discount"
import { createCEODescription } from "@/helpers/create-ceo-description"

export default function ProductStructuredData({ product }: { product?: Product }) {
  const priceValidUntil = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0]

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://cosmetychka.com.ua"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product ? `${product.name}` : "Товар не знайдено",
    description: product ? createCEODescription(product.name, product.description, product.price) : "Товар не знайдено",
    brand: product
      ? {
          "@type": "Brand",
          name: product.brand.name,
        }
      : undefined,
    category: product ? product.subcategories.name : undefined,
    // image: product ? [`${baseUrl}/${product.photos[0].image.url}`] : undefined,
    image: product?.photos?.[0]?.image?.url ? [`${baseUrl}/${product.photos[0].image.url}`] : undefined,
    offers: product
      ? {
          "@type": "Offer",
          price: product.hasDiscount ? calcDiscount(product.price, product.discount) : product.price,
          priceCurrency: "UAH",
          availability: "https://schema.org/" + (product.status === "in_stock" ? "InStock" : "OutOfStock"),
          seller: {
            "@type": "Organization",
            name: "Cosmetychka.com.ua",
          },
          priceValidUntil: priceValidUntil,
          shippingDetails: [
            {
              "@type": "OfferShippingDetails",
              name: "Доставка Укрпоштою по Україні",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "40",
                currency: "UAH",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "UA",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 2,
                  maxValue: 5,
                  unitCode: "DAY",
                },
              },
            },
            {
              "@type": "OfferShippingDetails",
              name: "Доставка Новою Поштою по Україні",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "79",
                currency: "UAH",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: "UA",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 3,
                  unitCode: "DAY",
                },
              },
            },
          ],
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/NonReturnable",
            applicableCountry: { "@type": "Country", name: "UA" },
          },
        }
      : undefined,
    // aggregateRating: product
    //   ? {
    //       "@type": "AggregateRating",
    //       ratingValue: 5,
    //       reviewCount: 5,
    //       bestRating: 5,
    //       worstRating: 1,
    //     }
    //   : undefined,

    // additionalProperty: product
    //   ? product.specs.map((spec) => ({
    //       "@type": "PropertyValue",
    //       name: spec.key,
    //       value: spec.value,
    //     }))
    //   : undefined,
    additionalProperty: product?.specs?.length
      ? product.specs.map((spec) => ({ "@type": "PropertyValue", name: spec.key, value: spec.value }))
      : undefined,
    url: `${baseUrl}/product/${product?.id}`,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
