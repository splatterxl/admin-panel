import { Button, ButtonProps } from "@chakra-ui/react"

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="solid"
      colorScheme="green"
      _dark={{
        bgColor: "green.700",
        color: "white",
        _hover: {
          bgColor: "green.800",
        },
        _active: {
          bgColor: "green.900",
        },
      }}
      _light={{
        bgColor: "green.700",
        color: "white",
        _hover: {
          bgColor: "green.800",
        },
        _active: {
          bgColor: "green.900",
        },
      }}
      {...props}
    />
  )
}
