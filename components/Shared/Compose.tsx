interface Props {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}

export const Compose = ({
  components = [],
  children
}: Props) => {
  return (
    <>
      {
        components.reduceRight(
          (acc, Comp) => (<Comp>{acc}</Comp>),
          children
        )
      }
    </>
  )
}