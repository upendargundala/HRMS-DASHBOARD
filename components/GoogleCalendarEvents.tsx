// "use client";

// import { useEffect, useState } from "react";
// import { Calendar } from "lucide-react";

// type CalendarEvent = {
//   id: string;
//   summary: string;
//   start: {
//     dateTime?: string;
//     date?: string;
//   };
// };

// export default function GoogleCalendarEvents() {
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadEvents = async () => {
//       try {
//         const res = await fetch("/api/google-calendar");

//         if (!res.ok) {
//           throw new Error(`API error: ${res.status}`);
//         }

//         const text = await res.text();

//         // 🛡️ Prevent JSON parse crash
//         if (!text) {
//           setEvents([]);
//           return;
//         }

//         const data = JSON.parse(text);
//         setEvents(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load calendar events");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadEvents();
//   }, []);

//   return (
//     <div className="bg-white rounded-xl border shadow-sm p-5">
//       <h3 className="font-semibold mb-4 flex items-center gap-2">
//         <Calendar className="w-5 h-5 text-blue-600" />
//         Google Calendar – Latest Events
//       </h3>

//       {loading ? (
//         <p className="text-sm text-muted-foreground">Loading events...</p>
//       ) : error ? (
//         <p className="text-sm text-red-500">{error}</p>
//       ) : events.length === 0 ? (
//         <p className="text-sm text-muted-foreground">No upcoming events</p>
//       ) : (
//         <div className="space-y-3 text-sm">
//           {events.map(event => (
//             <div
//               key={event.id}
//               className="p-3 rounded-lg bg-gray-50 border"
//             >
//               <p className="font-medium">{event.summary}</p>
//               <p className="text-xs text-muted-foreground">
//                 {new Date(
//                   event.start.dateTime || event.start.date!
//                 ).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
