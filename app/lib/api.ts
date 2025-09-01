// Создаем типы для данных
export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// Функции для получения данных с сервера
export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 3600 }, // Кэширование на час
    })

    if (!res.ok) {
      throw new Error("Failed to fetch posts")
    }

    const data = await res.json()
    return data.slice(0, 12) // Ограничиваем количество постов
  } catch (error) {
    console.error("Error fetching posts:", error)
    return [] // Возвращаем пустой массив в случае ошибки
  }
}

export async function fetchPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch post ${id}`)
    }

    return res.json()
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error)
    return null
  }
}

export async function fetchComments(postId: string): Promise<Comment[]> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch comments for post ${postId}`)
    }

    return res.json()
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error)
    return []
  }
}

