import { useQuery } from "@tanstack/react-query"

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }
    return await response.json()
}

const Posts = () => {
    const data = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    if (data.isLoading) {
        return <div> posts are loading...</div>
    }

    if (data.error) {
        return <div> error fetching posts</div>
    }

    const posts = data.data

    console.log('posts:', posts)
  return (
    <div className="container mx-auto max-w-2xl mt-10 space-y-4 p-4 bg-gray-100 rounded-md">
        <h1 className="text-2xl font-bold text-center mb-4 mt-4 text-blue-500">Posts</h1>
        {
            posts?.map((post: any) => (
                <div key={post.id} className="bg-gray-100 p-4 rounded-md">
                    <h1 className="text-2xl font-bold">{post?.title}</h1>
                    <p className="text-gray-500">{post?.body}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Posts