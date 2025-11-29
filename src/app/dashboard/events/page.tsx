'use client';

import { motion } from 'framer-motion';

export default function EventsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl p-6"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Events Management</h1>
        <p className="text-muted-foreground mt-2">Create, manage, and track your events</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { title: "Total Events", value: "24", change: "+8.7%" },
          { title: "Upcoming", value: "8", change: "+12.5%" },
          { title: "Past Events", value: "16", change: "+5.2%" },
          { title: "Attendees", value: "1,342", change: "+18.3%" },
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-foreground">Upcoming Events</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Create Event
          </button>
        </div>
        <div className="space-y-4">
          {[
            { 
              id: 1, 
              title: "Book Launch: The New Chapter", 
              date: "June 15, 2023", 
              time: "6:00 PM",
              location: "Main Library",
              attendees: 120
            },
            { 
              id: 2, 
              title: "Author Meet & Greet", 
              date: "June 20, 2023", 
              time: "2:00 PM",
              location: "City Bookstore",
              attendees: 85
            },
            { 
              id: 3, 
              title: "Writing Workshop", 
              date: "June 25, 2023", 
              time: "10:00 AM",
              location: "Community Center",
              attendees: 60
            },
          ].map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{event.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>{event.date} at {event.time}</span>
                    <span>•</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-foreground font-medium">{event.attendees} attendees</div>
                  <div className="mt-2">
                    <button className="text-sm text-foreground hover:text-muted-foreground">Edit</button>
                    <button className="ml-3 text-sm text-destructive hover:text-destructive/90">Delete</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}