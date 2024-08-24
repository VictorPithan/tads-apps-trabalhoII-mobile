import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { PublicNavigatorRoutesProps } from '@routes/public.routes';
import { VStack, Center, Heading, Image, ScrollView, useToast } from 'native-base';
import LogoIF from '@assets/logo.png';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpValidator } from "@validators/SignUpValidator";
import { api } from '@services/Api';
import { AppError } from '@shared/AppError';
import { useState } from 'react';


export type SignUpProps = {
    email: string;
    password: string;
    password_confirm: string;
}

export function SignUp() {

    const [ isLoading, setIsLoading ] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpProps>({
        resolver: yupResolver(signUpValidator)
    });

    const navigation = useNavigation<PublicNavigatorRoutesProps>();

    function handleGoBackSignIn() {
        navigation.navigate('signIn');
    }

    const toast = useToast();

    async function handleSignUp({ email, password }: SignUpProps) {
        try {
            setIsLoading(true);
            await api.post("/users", { email, password });
            handleGoBackSignIn();
            
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a conta, Tente novamente mais tarde";
            setIsLoading(false);
        } 
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1}}
            showsVerticalScrollIndicator={false}
        >
            <VStack flex={1} px={10} py={20}>
                <Center >
                    <Heading color="gray.900" fontSize={'xl'} mb={6}> Crie sua conta </Heading>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Informe seu E-mail"
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
                            placeholder="Informe sua Senha"
                            placeholderTextColor="gray.900"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.password?.message}
                            />                            
                        )}
                    />

                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                            placeholder="Confirme sua Senha"
                            placeholderTextColor="gray.900"
                            secureTextEntry   
                            value={value}
                            onChangeText={onChange}
                            onSubmitEditing={handleSubmit(handleSignUp)}
                            returnKeyType="send"
                            errorMessage={errors.password_confirm?.message}
                            />                            
                        )}
                    />

                    <Button 
                        title="Criar conta"
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={isLoading}
                    />
                </Center>
                <Button 
                    mt={2}
                    title="Voltar para o login" 
                    variant="outline"
                    onPress={handleGoBackSignIn}
                />
            </VStack>
        </ScrollView>
    );
}