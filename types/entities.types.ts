export type ProductGender = "man" | "woman" | "both"
export type ProductStatus = "in_stock" | "coming_soon" | "out_of_stock" | "discontinued"
export type ProductTags = "hit" | "new" | "top"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  subcategories: Subcategory
  brand: Brand
  gender: ProductGender
  status: ProductStatus
  hasDiscount: boolean
  tags: ProductTags[]
  discount?: { type: "fixed" | "percent"; value: number }
  specs: { key: string; value: string; id?: string | null }[]
  photos: { id: string; image: Media; caption?: string | null }[]
  updatedAt: string
  createdAt: string
}

export interface Subcategory {
  id: number
  name: string
}

export interface Brand {
  id: number
  name: string
}

export interface Media {
  id: number
  url: string
  alt?: string | null
  filename?: string | null
  mimeType?: string | null
}

export interface Category {
  id: number
  name: string
  subcategories: Subcategory[]
}

// export interface Order {
//   id: number
//   status: "pending" | "processing" | "completed" | "cancelled"
//   username: string
//   phone: number
//   note: string | null
//   totalPrice: number | null
//   products: {
//         product: number | Product
//         quantity: number
//         id?: string | null
//       }[]
//   updatedAt: string
//   createdAt: string
// }
