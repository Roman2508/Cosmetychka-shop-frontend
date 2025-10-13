import { SITE_NAME } from "@/constants/constants"

const Footer = () => {
  return (
    <footer className="py-4 border-t flex justify-center items-center">
      {SITE_NAME} &copy; Всі права захищені.
    </footer>
  )
}

export default Footer
