import { Button } from "@/components/ui/button"


const ButtonWidget = ({ className, type="button", children, onClick, disabled = false }) => {
  return (
    <Button type={type} className={className} onClick={onClick} disabled={disabled}>{children}</Button>
  )
}
export default ButtonWidget