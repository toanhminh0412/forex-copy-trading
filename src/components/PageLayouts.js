export function Section({style="", children}) {
  return (
    <section className={`py-12 lg:py-24 px-12 lg:px-40 ${style}`}>{children}</section>
  )
}