import { flex } from "@/styled-system/patterns";

export default function Nav() {
  return (
    <div className={flex({ direction: "row", alignItems: "flex-end", justifyContent: "space-between" })}>
        <h2>Exhibitions</h2>
        <h2>Biography</h2>
        <h2>Contact</h2>
    </div>
  )
}
