'use client';

import { motion } from 'framer-motion';

export default function SalesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Sales Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage and track your sales data</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Revenue", value: "$24,567", change: "+12.5%" },
          { title: "Orders", value: "1,234", change: "+8.2%" },
          { title: "Customers", value: "892", change: "+5.7%" },
          { title: "Avg. Order Value", value: "$52.30", change: "+3.1%" },
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
        <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Sales</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: '#ORD-001', customer: 'John Doe', date: '2023-05-15', amount: '$120.00', status: 'Completed' },
                { id: '#ORD-002', customer: 'Jane Smith', date: '2023-05-14', amount: '$85.50', status: 'Completed' },
                { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-05-13', amount: '$210.75', status: 'Pending' },
                { id: '#ORD-004', customer: 'Emily Davis', date: '2023-05-12', amount: '$65.25', status: 'Completed' },
                { id: '#ORD-005', customer: 'Michael Wilson', date: '2023-05-11', amount: '$180.00', status: 'Processing' },
              ].map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
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