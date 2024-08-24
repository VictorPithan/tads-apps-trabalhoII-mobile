import React, { useCallback, useEffect, useState } from 'react';
import { Box, Center, FlatList, Heading, VStack, Text } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PublicNavigatorRoutesProps } from '@routes/public.routes';
import { HomeHeader } from '@components/HomeHeader';
import { Button } from '@components/Button';
import { usePost } from '@hooks/usePost';
import { Loading } from '@components/Loading';
import { LoadingList } from '@components/LoadingList';
import { useAuth } from '@hooks/useAuth';
import { PrivateNavigatorRoutesProps } from '@routes/private.routes';

export interface User {
  id: number;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  email: string;
}

export function Home() {
  const navigation = useNavigation<PrivateNavigatorRoutesProps>();
  const { user } = useAuth();
  const { loadListPosts } = usePost();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchPosts = async () => {
    try {
      if (!hasMoreData) return;
      const response = await loadListPosts(page);

      setPosts((prevData) => [...prevData, ...response.results]);
      if (response?.next) {
        setPage((prev) => prev + 1);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      setPosts([]);
      setHasMoreData(true);
      fetchPosts();
    }, [])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <Center flex={1} p={4}>
        <VStack space={4} flex={1}>
        <Heading color="gray.900" fontSize="md">POSTS</Heading>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <Box mb={4} p={4} borderWidth={1} borderRadius={5} borderColor={user.email === item.email ? 'blue.500' : 'black'}>
                <Text fontWeight="bold">{item.title}</Text>
                <Text>{item.content}</Text>
                <Text mt={2} fontStyle="italic">Postado por: {user.email === item.email ? 'mim' : item.email}</Text>
              </Box>
            )}
            onEndReached={fetchPosts}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<LoadingList loading={hasMoreData} />}
          />
        )}
        </VStack>
        <Button 
          title="Novo post" 
          variant="outline"
          onPress={() => navigation.navigate('createPost')}
        />
      </Center>
    </VStack>
  );
}
