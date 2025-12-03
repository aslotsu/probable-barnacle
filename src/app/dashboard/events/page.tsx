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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: '',
    status: 'draft',
    start_date: '',
    end_date: '',
    venue_name: '',
    venue_address: '',
    is_virtual: false,
    virtual_link: '',
    timezone: 'America/New_York',
    capacity: 0,
    expected_guests: 0,
    registered_count: 0,
    waitlist_enabled: false,
    allow_walkins: true,
    ticket_price: 0,
    early_bird_price: undefined as number | undefined,
    organization_budget: 0,
    expenses: 0,
    revenue: 0,
    registration_open_date: '',
    registration_close_date: '',
    registration_form_url: '',
    requires_approval: false,
    featured_image: '',
    video_url: '',
    livestream_url: '',
    organizer_name: '',
    organizer_email: '',
    organizer_phone: '',
    is_featured: false,
    is_public: true,
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? 0 : parseFloat(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: '',
      status: 'draft',
      start_date: '',
      end_date: '',
      venue_name: '',
      venue_address: '',
      is_virtual: false,
      virtual_link: '',
      timezone: 'America/New_York',
      capacity: 0,
      expected_guests: 0,
      registered_count: 0,
      waitlist_enabled: false,
      allow_walkins: true,
      ticket_price: 0,
      early_bird_price: undefined,
      organization_budget: 0,
      expenses: 0,
      revenue: 0,
      registration_open_date: '',
      registration_close_date: '',
      registration_form_url: '',
      requires_approval: false,
      featured_image: '',
      video_url: '',
      livestream_url: '',
      organizer_name: '',
      organizer_email: '',
      organizer_phone: '',
      is_featured: false,
      is_public: true,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.monkreflections.com/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      await fetchEvents();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
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

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-foreground">Create New Event</h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Event Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Event Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="event_type"
                        value={formData.event_type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select type</option>
                        <option value="conference">Conference</option>
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="retreat">Retreat</option>
                        <option value="service">Church Service</option>
                        <option value="meeting">Meeting</option>
                        <option value="fundraiser">Fundraiser</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Date & Time</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Start Date & Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        End Date & Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Timezone</label>
                      <input
                        type="text"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 mb-2">
                        <input
                          type="checkbox"
                          name="is_virtual"
                          checked={formData.is_virtual}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-foreground">Virtual Event</span>
                      </label>
                    </div>

                    {formData.is_virtual ? (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-foreground mb-1">Virtual Link</label>
                        <input
                          type="text"
                          name="virtual_link"
                          value={formData.virtual_link}
                          onChange={handleInputChange}
                          placeholder="https://zoom.us/..."
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1">Venue Name</label>
                          <input
                            type="text"
                            name="venue_name"
                            value={formData.venue_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-1">Venue Address</label>
                          <textarea
                            name="venue_address"
                            value={formData.venue_address}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Capacity & Registration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Capacity & Registration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Capacity</label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Expected Guests</label>
                      <input
                        type="number"
                        name="expected_guests"
                        value={formData.expected_guests}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Ticket Price</label>
                      <input
                        type="number"
                        name="ticket_price"
                        value={formData.ticket_price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="waitlist_enabled"
                        checked={formData.waitlist_enabled}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Enable Waitlist</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="allow_walkins"
                        checked={formData.allow_walkins}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Allow Walk-ins</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="requires_approval"
                        checked={formData.requires_approval}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Requires Approval</span>
                    </label>
                  </div>
                </div>

                {/* Organizer Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Organizer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Organizer Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organizer_name"
                        value={formData.organizer_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Organizer Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="organizer_email"
                        value={formData.organizer_email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Organizer Phone</label>
                      <input
                        type="tel"
                        name="organizer_phone"
                        value={formData.organizer_phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Additional Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Featured Image URL</label>
                      <input
                        type="text"
                        name="featured_image"
                        value={formData.featured_image}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Livestream URL</label>
                      <input
                        type="text"
                        name="livestream_url"
                        value={formData.livestream_url}
                        onChange={handleInputChange}
                        placeholder="https://youtube.com/..."
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_featured"
                        checked={formData.is_featured}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Featured Event</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_public"
                        checked={formData.is_public}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">Public Event</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}