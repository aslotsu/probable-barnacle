'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  subtitle?: string;
  author: string;
  isbn?: string;
  description: string;
  publisher?: string;
  publication_date?: string;
  pages: number;
  language: string;
  category: string;
  price: number;
  sale_price?: number;
  stock_quantity: number;
  status: string;
  cover_image?: string;
  is_featured: boolean;
  is_published: boolean;
  total_sales: number;
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.monkreflections.com/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch books');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchBooks();
  };

  // Calculate statistics
  const publishedBooks = books.filter(book => book.is_published);
  const draftBooks = books.filter(book => !book.is_published);
  const avgRating = books.length > 0
    ? (books.reduce((sum, book) => sum + book.average_rating, 0) / books.length).toFixed(1)
    : '0.0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl p-6"
    >
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Books Management</h1>
          <p className="text-muted-foreground mt-2">Manage your book inventory and content</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Books", value: isLoading ? "..." : books.length.toString(), change: "" },
          { title: "Published", value: isLoading ? "..." : publishedBooks.length.toString(), change: "" },
          { title: "Drafts", value: isLoading ? "..." : draftBooks.length.toString(), change: "" },
          { title: "Avg. Rating", value: isLoading ? "..." : `${avgRating}/5`, change: "" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-medium text-muted-foreground">{stat.title}</h3>
            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
            {stat.change && <p className="mt-2 text-sm text-muted-foreground">{stat.change} from last month</p>}
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-foreground">Book Inventory</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Add Book
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No books in inventory. Click "Add Book" to add your first book.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cover</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {books.map((book, index) => (
                  <motion.tr
                    key={book.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {book.cover_image ? (
                        <img
                          src={book.cover_image}
                          alt={book.title}
                          className="h-12 w-8 object-cover rounded border border-border"
                        />
                      ) : (
                        <div className="h-12 w-8 bg-muted rounded border border-border flex items-center justify-center text-xs text-muted-foreground">
                          No cover
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground max-w-xs truncate">
                      {book.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {book.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.stock_quantity > 20 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        book.stock_quantity > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {book.stock_quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      ${book.sale_price || book.price}
                      {book.sale_price && (
                        <span className="ml-1 line-through text-xs">${book.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        book.is_published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {book.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-foreground hover:text-muted-foreground mr-3">Edit</button>
                      <button className="text-destructive hover:text-destructive/90">Delete</button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}