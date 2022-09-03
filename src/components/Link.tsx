import { Link as ChakraLink, LinkProps } from "@chakra-ui/react"
import NextLink from "next/link"

export const Link: React.FC<
  LinkProps & { href: string; noDecor?: boolean }
> = ({ href, noDecor, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        _hover={{
          textDecoration: noDecor ? "none" : undefined,
        }}
        {...props}
      />
    </NextLink>
  )
}
