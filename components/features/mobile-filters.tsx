import { ListFilter as ListFilterIcon } from "lucide-react"

import { Button } from "../ui/button"
import CatalogSidebar from "./catalog/catalog-sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileFilters() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="border-input normal-case">
          <ListFilterIcon />
          Фільтри
        </Button>
      </SheetTrigger>

      <SheetContent className="py-2 px-4">
        <CatalogSidebar className="min-w-full" />
      </SheetContent>
    </Sheet>
  )
}
