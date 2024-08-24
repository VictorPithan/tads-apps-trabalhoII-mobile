import { api } from "@services/Api";

export interface Post {
  id: number;
  title: string;
  content: string;
  email: string;
}

export function usePost() {
  async function loadListPosts(page: number) {
    try {
      const { data } = await api.get(`/posts?limit=4&page=${page}`);
      return data
    } catch (error) {
      throw error
    }
  };
  
  return { loadListPosts };
}
