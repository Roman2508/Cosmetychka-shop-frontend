import { RichText } from "@/types/entities.types"

const BASE_STRING = "грн. Купити на Cosmetychka.com.ua. Товар в наявності. Рейтинг: 5/5"

export const createCEODescription = (name: string, description: RichText, price: number) => {
  if (!description || !description.root || !description.root.children) {
    return `${name}. Ціна: ${price} ${BASE_STRING}`
  }

  const productDescription = description.root.children
    .map((el) => {
      if (el.type === "paragraph" || el.type === "heading") {
        // @ts-ignore
        return el.children.map((p) => p.text).join(" ")
      }

      if (el.type === "list") {
        // @ts-ignore
        return el.children.map((li) => li.children.map((el) => el.text)).join(" ")
      }

      return ""
    })
    .join("")

  return `${productDescription}. Ціна: ${price} ${BASE_STRING}`
}

// export const createCEODescription = (name: string, description: RichText | null, price: number): string => {
//   // Базовый фолбэк
//   if (!description?.root?.children?.length) {
//     return `${name}. Ціна: ${price} ${BASE_STRING}`
//   }

//   const parts: string[] = []

//   for (const node of description.root.children) {
//     // @ts-ignore
//     if (!node.children?.length) continue

//     // Обработка заголовков
//     // @ts-ignore
//     if (node.type === "heading" && (node.tag === "h2" || node.tag === "h3" || node.tag === "h4")) {
//       const text = extractText(node).trim()
//       if (text) {
//         parts.push(text + " —") // добавляем как преимущество
//       }
//       continue
//     }

//     // Обработка параграфов
//     if (node.type === "paragraph") {
//       const text = extractText(node).trim()
//       if (text && parts.length < 3) {
//         // ограничиваем количество абзацев
//         parts.push(text)
//         continue
//       }

//       // Обработка списков
//       // @ts-ignore
//       if (node.type === "list" && node.listType === "bullet") {
//         // @ts-ignore
//         const items = node.children
//           .map((li: any) => {
//             // Некоторые пункты могут иметь вложенные children с bold и обычным текстом
//             return extractText(li).trim()
//           })
//           .filter(Boolean)

//         if (items.length > 0) {
//           parts.push("✓ " + items.slice(0, 4).join(". ✓ ") + ".")
//         }
//         continue
//       }
//     }
//   }

//   // Берём только первые 1-2 предложения + преимущества
//   let result = parts.join(" ").replace(/\s+/g, " ").trim()

//   // Обрезаем до ~155 символов (идеально для Google)
//   const maxLength = 155
//   if (result.length > maxLength) {
//     result = result.slice(0, maxLength).split(" ").slice(0, -1).join(" ") + "..."
//   }

//   return `${result} Ціна: ${price} ${BASE_STRING}`
// }

// // Вспомогательная функция для безопасного извлечения текста
// function extractText(node: any): string {
//   if (!node || !Array.isArray(node.children)) return ""

//   return node.children
//     .map((child: any) => {
//       if (child.text !== undefined) return child.text
//       if (child.children) return extractText(child)
//       return ""
//     })
//     .join("")
//     .trim()
// }
