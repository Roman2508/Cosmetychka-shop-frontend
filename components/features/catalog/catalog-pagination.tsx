import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { useSetQueryString } from "@/hooks/useSetQueryString"
import { useParseQueryString } from "@/hooks/useParseQuertString"
import { useGetProducts } from "@/hooks/queries/products-queries"
import { calcPaginationPages } from "@/helpers/calc-pagination-pages"

const CatalogPagination = () => {
  const { products } = useGetProducts()

  const { pagination } = useParseQueryString()
  const { setQueryString } = useSetQueryString()

  const currentPage = pagination.page !== 1 ? pagination.page : products?.page || 1
  const totalPages = products?.totalPages || 1

  const onClickPrev = () => {
    if (!products) return
    if (products.hasPrevPage) {
      setQueryString("page", String(products.page - 1))
    }
  }

  const onClickNext = () => {
    if (!products) return
    if (products.hasNextPage) {
      setQueryString("page", String(products.page + 1))
    }
  }

  const pageNumbers = calcPaginationPages(currentPage, totalPages)

  if (totalPages === 1) return

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem onClick={onClickPrev} className="border">
          <PaginationPrevious disabled={products ? !products.hasPrevPage : true} />
        </PaginationItem>

        {totalPages > 5 && pageNumbers[0] > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pageNumbers.map((pageNumber) => (
          <PaginationItem
            key={pageNumber}
            onClick={() => setQueryString("page", String(pageNumber))}
            className={cn("border", currentPage === pageNumber && "text-secondary font-bold border-secondary")}
          >
            <PaginationLink>{pageNumber}</PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && pageNumbers[pageNumbers.length - 1] < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem onClick={onClickNext} className="border">
          <PaginationNext disabled={products ? !products.hasNextPage : true} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CatalogPagination
