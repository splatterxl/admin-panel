import { StackProps, VStack } from "@chakra-ui/react";

export default function FormBody(props: FormBodyProps) {
  return <VStack mb={5} mt={2} spacing={2} w="full" {...props} />;
}

interface FormBodyProps extends StackProps {}
