// // veritas-website\app\(public)\events\page.tsx
// import Link from "next/link";
// import { listPublicEvents } from "@/lib/events/public";
// import { ArrowUpRight, Calendar, MapPin, Clock } from "lucide-react";
// import MagneticCursor from "@/components/effects/MagneticCursor";
// import ParchmentBackground from "@/components/effects/ParchmentBackground";
// import Navbar from "@/components/navbar/Navbar";

// export default async function PublicEventsPage() {
//   const events = await listPublicEvents();
//   <>
//   <MagneticCursor />
//   <ParchmentBackground />
//   <Navbar />
// </>

//   return (
//     <main className="max-w-7xl mx-auto px-4 py-12 space-y-10">
//       {/* Header */}
//       <div className="space-y-2">
//         <h1 className="text-5xl font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
//           Events
//         </h1>
//         <p className="text-gray-400 text-lg">
//           Discover upcoming discussions, debates, and conversations
//         </p>
//       </div>

//       {events.length === 0 && (
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg">No events announced yet.</p>
//         </div>
//       )}

//       {/* Event Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <Link
//             key={event.id}
//             href={`/events/${event.id}`}
//             className="group relative block"
//           >
//             <div className="relative overflow-hidden rounded-2xl border border-gray-800/50 bg-linear-to-br from-gray-900 to-black shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover:-translate-y-1">
//               {/* Cover Image with Overlay */}
//               <div className="relative h-56 bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
//                 {event.coverImageLink ? (
//                   <>
//                     <img
//                       src={event.coverImageLink}
//                       alt={event.name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
//                   </>
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <div className="text-center space-y-2">
//                       <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center">
//                         <Calendar className="w-8 h-8 text-gray-600" />
//                       </div>
//                       <p className="text-gray-600 text-sm font-medium">
//                         {event.type.replace(/_/g, " ")}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Status Badge */}
//                 <div className="absolute top-3 left-3">
//                   <span
//                     className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
//                       event.status === "LIVE"
//                         ? "bg-green-500/20 text-green-300 ring-1 ring-green-500/40"
//                         : event.status === "UPCOMING"
//                         ? "bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/40"
//                         : "bg-gray-500/20 text-gray-300 ring-1 ring-gray-500/40"
//                     }`}
//                   >
//                     <span
//                       className={`inline-block w-1.5 h-1.5 rounded-full ${
//                         event.status === "LIVE"
//                           ? "bg-green-400 animate-pulse"
//                           : event.status === "UPCOMING"
//                           ? "bg-blue-400"
//                           : "bg-gray-400"
//                       }`}
//                     />
//                     {event.status}
//                   </span>
//                 </div>

//                 {/* Hover Action */}
//                 <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 text-sm">
//                   View More
//                   <ArrowUpRight className="w-4 h-4" />
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-5 space-y-4">
//                 {/* Title */}
//                 <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
//                   {event.name}
//                 </h2>

//                 {/* Meta Info */}
//                 <div className="space-y-2 text-sm text-gray-400">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="w-4 h-4 text-gray-500" />
//                     <span>
//                       {new Date(event.date).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Clock className="w-4 h-4 text-gray-500" />
//                     <span>{event.time}</span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-gray-500" />
//                     <span className="line-clamp-1">{event.venue}</span>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
//                   {event.description}
//                 </p>

//                 {/* Type Badge */}
//                 <div className="pt-2 border-t border-gray-800">
//                   <span className="inline-block px-2.5 py-1 rounded-md bg-gray-800/50 text-xs font-medium text-gray-400">
//                     {event.type.replace(/_/g, " ")}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }


// app/(public)/events/page.tsx

import { listPublicEvents } from "@/lib/events/public";
import MagneticCursor from "@/components/effects/MagneticCursor";
import ParchmentBackground from "@/components/effects/ParchmentBackground";
import Navbar from "@/components/navbar/Navbar";
import { EventsListClient } from "@/components/veritas/events/events-ui"; 

export default async function PublicEventsPage() {
  const events = await listPublicEvents();

  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-[#bc6c25] selection:text-white">
      <MagneticCursor />
      <ParchmentBackground />
      <Navbar />
      
      <EventsListClient events={events} />
    </main>
  );
}