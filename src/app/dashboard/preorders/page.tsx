'use client';

import { motion } from 'framer-motion';

export default function PreordersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Preorders Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage and track your preorder data</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Preorders", value: "842", change: "+15.2%" },
          { title: "Pending", value: "127", change: "-3.4%" },
          { title: "Confirmed", value: "689", change: "+18.7%" },
          { title: "Estimated Revenue", value: "$42,100", change: "+22.1%" },
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
            <p className="mt-2 text-sm text-muted-foreground">{stat.change} from last month</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-medium text-foreground mb-4">Recent Preorders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {[
                { id: '#PRE-001', customer: 'Sarah Johnson', product: 'Premium Book', date: '2023-05-15', amount: '$45.00', status: 'Confirmed' },
                { id: '#PRE-002', customer: 'David Wilson', product: 'Deluxe Edition', date: '2023-05-14', amount: '$75.00', status: 'Pending' },
                { id: '#PRE-003', customer: 'Lisa Chen', product: 'Standard Book', date: '2023-05-13', amount: '$35.00', status: 'Confirmed' },
                { id: '#PRE-004', customer: 'James Brown', product: 'Collector\'s Edition', date: '2023-05-12', amount: '$120.00', status: 'Confirmed' },
                { id: '#PRE-005', customer: 'Maria Garcia', product: 'Limited Edition', date: '2023-05-11', amount: '$95.00', status: 'Pending' },
              ].map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 * index }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
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