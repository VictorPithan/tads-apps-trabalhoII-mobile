import { TextArea as In, ITextAreaProps, FormControl, Text, HStack } from "native-base";

type Props = ITextAreaProps & {
    errorMessage?: string | null;
    label?: string | null;
}

export function TextArea({ errorMessage = null, isInvalid, label, ...props }: Props) {
    const invalid = !!errorMessage || isInvalid;
    return (
        <FormControl flexDirection="column" isInvalid={invalid} mb={4}>

            <HStack>

            {label && (
            <FormControl.Label alignItems="center">  
            <Text color="blue.900" fontSize={16} marginRight="3">
                {label}
            </Text>
            </FormControl.Label>
            )}
                
            <In 
                backgroundColor="gray.50"
                height={14}
                px={4}
                width="full"
                borderWidth={0}
                fontSize="md"
                color="gray.900"
                autoCompleteType="off"
                placeholderTextColor="gray.400"
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                focusOutlineColor="gray.500"
                _focus={{
                    bg: "gray.800",
                    borderWidth: 1, 
                }}
                { ...props }
            />
            </HStack>
            <FormControl.ErrorMessage>
                { errorMessage }
            </FormControl.ErrorMessage>
        </FormControl>
    );
}