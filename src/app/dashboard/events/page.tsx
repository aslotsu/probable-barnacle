'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  event_type: string;
  status: string;
  start_date: string;
  end_date: string;
  venue_name: string;
  venue_address: string;
  is_virtual: boolean;
  virtual_link?: string;
  capacity: number;
  expected_guests: number;
  registered_count: number;
  actual_guests?: number;
  ticket_price: number;
  organizer_name: string;
  organizer_email: string;
  is_featured: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.monkreflections.com/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchEvents();
  };

  // Calculate statistics
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.start_date) > now);
  const pastEvents = events.filter(event => new Date(event.end_date) < now);
  const totalAttendees = events.reduce((sum, event) => sum + (event.actual_guests || event.registered_count), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl p-6"
    >
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events Management</h1>
          <p className="text-muted-foreground mt-2">Create, manage, and track your events</p>
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
          { title: "Total Events", value: isLoading ? "..." : events.length.toString(), change: "" },
          { title: "Upcoming", value: isLoading ? "..." : upcomingEvents.length.toString(), change: "" },
          { title: "Past Events", value: isLoading ? "..." : pastEvents.length.toString(), change: "" },
          { title: "Attendees", value: isLoading ? "..." : totalAttendees.toLocaleString(), change: "" },
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
          <h2 className="text-lg font-medium text-foreground">Upcoming Events</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Create Event
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No upcoming events. Click "Create Event" to add your first event.
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => {
              const startDate = new Date(event.start_date);
              const dateStr = startDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              });
              const timeStr = startDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
              });

              return (
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
                        <span>{dateStr} at {timeStr}</span>
                        <span>•</span>
                        <span>{event.is_virtual ? event.virtual_link || 'Virtual Event' : event.venue_name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {event.actual_guests || event.registered_count} / {event.capacity} attendees
                      </div>
                      <div className="mt-2">
                        <button className="text-sm text-foreground hover:text-muted-foreground">Edit</button>
                        <button className="ml-3 text-sm text-destructive hover:text-destructive/90">Delete</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}