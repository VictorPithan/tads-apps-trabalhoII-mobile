import React, { useState } from 'react';
import { Center, Heading, ScrollView, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPostValidator } from '@validators/CreatePostValidator';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/Api';
import { TextArea } from '@components/TextArea';
import { PrivateNavigatorRoutesProps } from '@routes/private.routes';

export interface User {
  id: number;
  email: string;
}

export interface Post {
  title: string;
  content: string;
  userId: string;
}

export function CreatePost() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  const { user} = useAuth()
  const [ isLoading, setIsLoading ] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<Post>({
    resolver: yupResolver(createPostValidator)
});

  async function handlePost({ title, content}: Post) {
    const userId = user.id
    try { 
      await api.post(
        '/posts',
        { title, content, userId},
      );
      reset()
      navigation.goBack();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <ScrollView
          contentContainerStyle={{ flexGrow: 1}}
          showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={10} py={20}>
          <Center flex={1} p={4} py={8}>
            <Heading py={10} color="gray.900" fontSize="xl">NOVO POST</Heading>
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="Informe um título"
                    placeholderTextColor="gray.900" 
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.title?.message}
                  />
              )}
            />
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, value } }) => (
                  <TextArea
                    placeholder="O que você está pensando?"
                    placeholderTextColor="gray.900" 
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.content?.message}
                  />
              )}
            />
            <Button
                title="Criar" 
                onPress={handleSubmit(handlePost)}
                isLoading={isLoading}
                my={2}
            />
          </Center>
        </VStack>
    </ScrollView>
  );
}
