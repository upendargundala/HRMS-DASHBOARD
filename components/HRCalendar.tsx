"use client";

import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Save,
  X,
  CalendarDays,
  Eye,
  Clock4,
  User,
} from "lucide-react";

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  color?: string;
  type: "attendance" | "leave" | "holiday" | "meeting";
  description?: string;
  employee?: string;
  department?: string;
  status?: "approved" | "pending" | "rejected";
  allDay?: boolean;
};

type EventTypeFilter = "all" | "attendance" | "leave" | "holiday" | "meeting";

export default function HRCalendar() {
  const calendarRef = useRef<any>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Present - John Doe",
      start: new Date().toISOString().split("T")[0],
      color: "#22c55e",
      type: "attendance",
      employee: "John Doe",
      department: "Engineering",
      status: "approved",
      allDay: true,
    },
    {
      id: "2",
      title: "Casual Leave",
      start: getDateString(2),
      end: getDateString(4),
      color: "#f97316",
      type: "leave",
      employee: "Jane Smith",
      department: "Sales",
      status: "pending",
      allDay: true,
    },
    {
      id: "3",
      title: "Sick Leave",
      start: getDateString(5),
      color: "#ef4444",
      type: "leave",
      employee: "Bob Johnson",
      department: "Design",
      status: "approved",
      allDay: true,
    },
    {
      id: "4",
      title: "Team Meeting",
      start: `${getDateString(0)}T10:00:00`,
      end: `${getDateString(0)}T11:30:00`,
      color: "#3b82f6",
      type: "meeting",
      description: "Monthly review meeting",
      allDay: false,
    },
    {
      id: "5",
      title: "Public Holiday",
      start: getDateString(7),
      color: "#8b5cf6",
      type: "holiday",
      description: "Company-wide holiday",
      allDay: true,
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventFilter, setEventFilter] = useState<EventTypeFilter>("all");
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [showEventModal, setShowEventModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [eventForm, setEventForm] = useState<Partial<CalendarEvent>>({
    title: "",
    type: "attendance",
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
    color: "#22c55e",
    description: "",
    employee: "",
    department: "",
    status: "pending",
    allDay: true,
  });

  function getDateString(daysFromNow: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split("T")[0];
  }

  // Navigate calendar
  const navigateCalendar = (action: "prev" | "next" | "today") => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      if (action === "prev") {
        calendarApi.prev();
      } else if (action === "next") {
        calendarApi.next();
      } else if (action === "today") {
        calendarApi.today();
      }
      updateCurrentDate(calendarApi);
    }
  };

  const changeView = (
    view: "dayGridMonth" | "timeGridWeek" | "timeGridDay"
  ) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
      if (view === "dayGridMonth") setViewMode("month");
      else if (view === "timeGridWeek") setViewMode("week");
      else if (view === "timeGridDay") setViewMode("day");
      updateCurrentDate(calendarApi);
    }
  };

  const updateCurrentDate = (calendarApi: any) => {
    const currentDate = calendarApi.getDate();
    setCurrentDate(currentDate.toISOString().split("T")[0]);
  };

  const handleDateClick = (arg: any) => {
    const clickedDate = arg.dateStr;
    setEventForm((prev) => ({
      ...prev,
      start: clickedDate,
      end: clickedDate,
      allDay: true,
    }));
    setModalMode("add");
    setShowEventModal(true);
  };

  const handleEventClick = (arg: any) => {
    const event = events.find((e) => e.id === arg.event.id);
    if (event) {
      setSelectedEvent(event);
    }
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEventForm({
      id: event.id,
      title: event.title,
      type: event.type,
      start: event.start.split("T")[0],
      end: event.end ? event.end.split("T")[0] : event.start.split("T")[0],
      color: event.color,
      description: event.description,
      employee: event.employee,
      department: event.department,
      status: event.status,
      allDay: event.allDay,
    });
    setModalMode("edit");
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      setSelectedEvent(null);
    }
  };

  const handleSaveEvent = () => {
    if (!eventForm.title?.trim()) {
      alert("Please enter a title");
      return;
    }

    const eventColor = getEventColor(eventForm.type || "attendance");

    const newEvent: CalendarEvent = {
      id: modalMode === "add" ? Date.now().toString() : eventForm.id!,
      title: eventForm.title!,
      type: eventForm.type!,
      start: eventForm.allDay
        ? eventForm.start!
        : `${eventForm.start}T00:00:00`,
      end:
        eventForm.end && eventForm.end !== eventForm.start
          ? eventForm.allDay
            ? eventForm.end
            : `${eventForm.end}T23:59:59`
          : undefined,
      color: eventColor,
      description: eventForm.description,
      employee: eventForm.employee,
      department: eventForm.department,
      status: eventForm.status as any,
      allDay: eventForm.allDay,
    };

    if (modalMode === "add") {
      setEvents((prev) => [...prev, newEvent]);
    } else {
      setEvents((prev) =>
        prev.map((e) => (e.id === eventForm.id ? newEvent : e))
      );
    }

    setEventForm({
      title: "",
      type: "attendance",
      start: new Date().toISOString().split("T")[0],
      end: new Date().toISOString().split("T")[0],
      color: "#22c55e",
      description: "",
      employee: "",
      department: "",
      status: "pending",
      allDay: true,
    });

    setShowEventModal(false);
    setSelectedEvent(newEvent);
  };

  const getEventColor = (type: CalendarEvent["type"]): string => {
    switch (type) {
      case "attendance":
        return "#22c55e";
      case "leave":
        return "#f97316";
      case "holiday":
        return "#8b5cf6";
      case "meeting":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  const filteredEvents = events.filter((event) => {
    if (eventFilter === "all") return true;
    return event.type === eventFilter;
  });

  const getStats = () => {
    const present = events.filter((e) => e.type === "attendance").length;
    const leaves = events.filter((e) => e.type === "leave").length;
    const pendingLeaves = events.filter(
      (e) => e.type === "leave" && e.status === "pending"
    ).length;

    return { present, leaves, pendingLeaves };
  };

  const stats = getStats();

  const exportCalendar = () => {
    const calendarData = {
      events: filteredEvents,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(calendarData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hr-calendar-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border rounded-xl shadow-sm">
      {/* Calendar Header */}
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h2 className="text-xs font-semibold">HR Calendar</h2>
            <span className="text-sm text-muted-foreground bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded">
              {formatDate(currentDate)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track attendance, leaves, and events
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Calendar Navigation */}
          <div className="flex bg-gray-100 dark:bg-neutral-800 rounded-lg">
            <button
              onClick={() => navigateCalendar("prev")}
              className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-l-lg"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateCalendar("today")}
              className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-neutral-700 text-sm"
            >
              Today
            </button>
            <button
              onClick={() => navigateCalendar("next")}
              className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-r-lg"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-neutral-800 rounded-lg p-1">
            <button
              onClick={() => changeView("dayGridMonth")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                viewMode === "month"
                  ? "bg-white dark:bg-neutral-700 shadow"
                  : "hover:bg-gray-200 dark:hover:bg-neutral-700"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => changeView("timeGridWeek")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                viewMode === "week"
                  ? "bg-white dark:bg-neutral-700 shadow"
                  : "hover:bg-gray-200 dark:hover:bg-neutral-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => changeView("timeGridDay")}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                viewMode === "day"
                  ? "bg-white dark:bg-neutral-700 shadow"
                  : "hover:bg-gray-200 dark:hover:bg-neutral-700"
              }`}
            >
              Day
            </button>
            <Button
              size="sm"
              onClick={() => {
                setEventForm({
                  title: "",
                  type: "attendance",
                  start: new Date().toISOString().split("T")[0],
                  end: new Date().toISOString().split("T")[0],
                  color: "#22c55e",
                  description: "",
                  employee: "",
                  department: "",
                  status: "pending",
                  allDay: true,
                });
                setModalMode("add");
                setShowEventModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Event
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border-b">
        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Present</p>
            <p className="text-xl font-semibold">{stats.present}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">On Leave</p>
            <p className="text-xl font-semibold">{stats.leaves}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
            <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending Leaves</p>
            <p className="text-xl font-semibold">{stats.pendingLeaves}</p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "all",
                "attendance",
                "leave",
                "holiday",
                "meeting",
              ] as EventTypeFilter[]
            ).map((filter) => (
              <button
                key={filter}
                onClick={() => setEventFilter(filter)}
                className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
                  eventFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
              >
                {filter === "all" ? "All Events" : filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          height="auto"
          events={filteredEvents}
          selectable={true}
          dayMaxEvents={2}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={(eventInfo) => (
            <div className="flex items-center gap-1 p-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: eventInfo.event.backgroundColor }}
              />
              <span className="text-xs truncate">{eventInfo.event.title}</span>
            </div>
          )}
        />
      </div>

      {/* Event Details Panel */}
      {selectedEvent && (
        <div className="border-t p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedEvent.color }}
              />
              <h3 className="font-semibold">{selectedEvent.title}</h3>
              {selectedEvent.status && (
                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    selectedEvent.status === "approved"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : selectedEvent.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {selectedEvent.status}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditEvent(selectedEvent)}
                className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                title="Edit event"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteEvent(selectedEvent.id)}
                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                title="Delete event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-muted-foreground hover:bg-gray-100 dark:hover:bg-neutral-800 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Event Details */}
              <div className="space-y-3">
                {selectedEvent.employee && (
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="w-3 h-3" /> Employee
                    </p>
                    <p className="font-medium">{selectedEvent.employee}</p>
                  </div>
                )}

                {selectedEvent.department && (
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedEvent.department}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" /> Date
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedEvent.start)}
                  </p>
                  {selectedEvent.end &&
                    selectedEvent.end !== selectedEvent.start && (
                      <p className="text-sm text-muted-foreground">
                        to {formatDate(selectedEvent.end)}
                      </p>
                    )}
                </div>
              </div>

              {/* Event Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Event Type</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedEvent.color }}
                    />
                    <span className="font-medium capitalize">
                      {selectedEvent.type}
                    </span>
                  </div>
                </div>

                {!selectedEvent.allDay && (
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock4 className="w-3 h-3" /> Time
                    </p>
                    <p className="font-medium">
                      {new Date(selectedEvent.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {selectedEvent.end &&
                        ` - ${new Date(selectedEvent.end).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}`}
                    </p>
                  </div>
                )}

                {selectedEvent.allDay && (
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">All Day</p>
                  </div>
                )}
              </div>
            </div>

            {selectedEvent.description && (
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Description
                </p>
                <p className="text-sm mt-1 p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg">
                  {selectedEvent.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {modalMode === "add" ? "Add New Event" : "Edit Event"}
              </h3>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setEventForm({
                    title: "",
                    type: "attendance",
                    start: new Date().toISOString().split("T")[0],
                    end: new Date().toISOString().split("T")[0],
                    color: "#22c55e",
                    description: "",
                    employee: "",
                    department: "",
                    status: "pending",
                    allDay: true,
                  });
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Type *
                </label>
                <select
                  value={eventForm.type}
                  onChange={(e) =>
                    setEventForm((prev) => ({
                      ...prev,
                      type: e.target.value as CalendarEvent["type"],
                      color: getEventColor(
                        e.target.value as CalendarEvent["type"]
                      ),
                    }))
                  }
                  className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                >
                  <option value="attendance">Attendance</option>
                  <option value="leave">Leave</option>
                  <option value="holiday">Holiday</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={eventForm.start}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        start: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={eventForm.end}
                    onChange={(e) =>
                      setEventForm((prev) => ({ ...prev, end: e.target.value }))
                    }
                    className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                    min={eventForm.start}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allDay"
                  checked={eventForm.allDay}
                  onChange={(e) =>
                    setEventForm((prev) => ({
                      ...prev,
                      allDay: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <label htmlFor="allDay" className="text-sm">
                  All Day Event
                </label>
              </div>

              {(eventForm.type === "leave" ||
                eventForm.type === "attendance") && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    value={eventForm.employee}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        employee: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                    placeholder="Enter employee name"
                  />
                </div>
              )}

              {(eventForm.type === "leave" ||
                eventForm.type === "attendance") && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department
                  </label>
                  <select
                    value={eventForm.department}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Sales">Sales</option>
                    <option value="Design">Design</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              )}

              {eventForm.type === "leave" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Leave Status
                  </label>
                  <select
                    value={eventForm.status}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        status: e.target.value as any,
                      }))
                    }
                    className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg dark:bg-neutral-800"
                  rows={3}
                  placeholder="Enter event description"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSaveEvent}
                className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {modalMode === "add" ? "Add Event" : "Save Changes"}
              </Button>
              {modalMode === "edit" && (
                <Button
                  variant="outline"
                  onClick={() => handleDeleteEvent(eventForm.id!)}
                  className="text-red-600 border-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
