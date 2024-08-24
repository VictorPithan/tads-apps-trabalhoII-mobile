import { Button as Btn, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
    title: string;
    variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...props}: Props) {
    return (
        <Btn 
            rounded="sm"
            width="full"
            height={12}
            backgroundColor={variant === "outline" ? "gray.500" : "blue.400"}
            background={variant === "outline" ? "gray.500" : "blue.800"}
            borderWidth={variant === "outline" ? 1 : 0}
            borderColor="gray.900"
            _pressed={{
                backgroundColor: variant === "outline" ? "gray.800" : "blue.600",
                background: variant === "outline" ? "gray.800" : "blue.600"
            }}
            { ...props }
        >
            <Text 
                color={variant === "outline" ? "white" : "white" }
                fontFamily="heading" 
                fontSize="sm"
            >
                { title }
            </Text>
        </Btn>
    );
}