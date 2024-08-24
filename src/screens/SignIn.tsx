import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigatorRoutesProps } from '@routes/public.routes';
import { VStack, Center, Heading, Text, ScrollView } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signInValidator } from '@validators/SignInValidator';

type SignInProps = {
    email: string;
    password: string;
}

export function SignIn() {

    const { signIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<SignInProps>({
        resolver: yupResolver(signInValidator)
    });

    const navigation = useNavigation<PublicNavigatorRoutesProps>();

    async function handleSignIn({ email, password }: SignInProps) {
        await signIn(email, password);
    }

    function handleCreateAccount() {
        navigation.navigate('signUp');
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1}}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} px={10} py={20} >
                <Center my={8} mb={16}>
                    <Heading color="gray.900" fontSize={'xl'} mb={6}> Acesse sua conta </Heading>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Informe seu e-mail"
                                placeholderTextColor="gray.900"
                                keyboardType="email-address"   
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />                            
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Informe sua senha"
                                placeholderTextColor="gray.900"
                                secureTextEntry   
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}  
                            />                          
                        )}
                    />
                    <Button onPress={handleSubmit(handleSignIn)} title="Entrar" />
                    
                </Center>

                <Center color="gray.900" fontSize="sm">
                    <Text color="gray.900" mb={4}> Ainda não possui conta ?</Text>
                    <Button 
                        title="Criar Conta" 
                        variant="outline"
                        onPress={handleCreateAccount}
                        mb={4}
                    />
                </Center>
            </VStack>
        </ScrollView>
    );
}