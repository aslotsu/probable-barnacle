'use client';

import { motion } from 'framer-motion';

export default function BooksPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Books Management</h1>
        <p className="text-gray-600 mt-2">Manage your book inventory and content</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Books", value: "142", change: "+5.2%" },
          { title: "Published", value: "128", change: "+3.7%" },
          { title: "Drafts", value: "14", change: "+15.8%" },
          { title: "Avg. Rating", value: "4.7/5", change: "+0.2" },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-medium text-gray-700">{stat.title}</h3>
            <p className="mt-2 text-2xl font-bold text-indigo-600">{stat.value}</p>
            <p className="mt-2 text-sm text-green-500">{stat.change} from last month</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Book Inventory</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Add Book
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cover</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, title: 'The Silent Echo', author: 'Robert James', published: '2023-03-15', stock: 42, price: '$24.99', cover: 'https://placehold.co/40x60' },
                { id: 2, title: 'Midnight in Paris', author: 'Elena Rodriguez', published: '2023-01-20', stock: 28, price: '$19.99', cover: 'https://placehold.co/40x60' },
                { id: 3, title: 'The Last Chapter', author: 'Michael Thompson', published: '2022-11-30', stock: 56, price: '$29.99', cover: 'https://placehold.co/40x60' },
                { id: 4, title: 'Beyond the Horizon', author: 'Sophia Williams', published: '2023-05-10', stock: 31, price: '$22.99', cover: 'https://placehold.co/40x60' },
                { id: 5, title: 'Whispers of Time', author: 'David Chen', published: '2023-02-28', stock: 19, price: '$26.99', cover: 'https://placehold.co/40x60' },
              ].map((book, index) => (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-6 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-500">
                      Cover
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.published}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      book.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {book.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}