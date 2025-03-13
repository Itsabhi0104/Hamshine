interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  category: string
  tags: string[]
}

export async function fetchSolarBlogContent(query = ""): Promise<BlogPost[]> {
  // In a real implementation, this would fetch from an API or RSS feeds
  // For now, we'll simulate a search with our existing data

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Sample blog data (in a real implementation, this would come from an API)
  const allBlogs = [
    {
      id: 1,
      title: "The Future of Solar Energy in India",
      excerpt: "India's solar energy capacity has grown significantly in recent years, but what does the future hold?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 15, 2023",
      author: "Rajiv Sharma",
      category: "Industry Trends",
      tags: ["solar energy", "renewable energy", "india", "future trends"],
    },
    {
      id: 2,
      title: "How to Maintain Your Solar Panels for Maximum Efficiency",
      excerpt: "Regular maintenance of your solar panels is essential to ensure they operate at peak efficiency.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 22, 2023",
      author: "Priya Patel",
      category: "Maintenance",
      tags: ["solar panels", "maintenance", "efficiency", "cleaning"],
    },
    // Additional blog posts would be here
  ]

  if (!query) {
    return allBlogs
  }

  // Filter blogs based on search query
  const lowercaseQuery = query.toLowerCase()
  return allBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(lowercaseQuery) ||
      blog.excerpt.toLowerCase().includes(lowercaseQuery) ||
      blog.content.toLowerCase().includes(lowercaseQuery) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export function generateSEOTags(blogPost: BlogPost) {
  return {
    title: blogPost.title,
    description: blogPost.excerpt,
    keywords: blogPost.tags.join(", "),
    ogImage: blogPost.image,
    ogType: "article" as const,
  }
}

