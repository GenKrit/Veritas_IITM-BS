// // veritas-website\app\(public)\events\[id]\page.tsx

// import { redirect } from "next/navigation";
// import { getEventById } from "@/lib/events/admin";
// import Link from "next/link";
// import { 
//   Calendar, 
//   Clock, 
//   MapPin, 
//   ArrowLeft, 
//   ExternalLink, 
//   Video, 
//   FileText, 
//   CheckCircle2, 
//   XCircle 
// } from "lucide-react";

// export default async function PublicEventDetails({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const event = await getEventById(id);

//   if (!event) {
//     redirect("/events");
//   }

//   // Helper for status colors
//   const isOpen = event.status?.toLowerCase() === "open" || event.status?.toLowerCase() === "upcoming";
  
//   return (
//     <main className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
//       {/* 1. AMBIENT BACKGROUND (Blurred version of event image) */}
//       <div className="fixed inset-0 z-0">
//         {event.coverImageLink && (
//           <div 
//             className="absolute inset-0 bg-cover bg-center opacity-20 blur-[100px] scale-110"
//             style={{ backgroundImage: `url('${event.coverImageLink}')` }}
//           />
//         )}
//         <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16">
        
//         {/* NAV BACK */}
//         <Link 
//           href="/events" 
//           className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
//           Back to Events
//         </Link>

//         {/* MAIN GRID LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
//           {/* LEFT COL: FULL IMAGE (No Cropping) */}
//           <div className="sticky top-8 space-y-6">
//             <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gray-900/50 shadow-2xl shadow-indigo-500/10 group">
//               {event.coverImageLink ? (
//                 <>
//                   {/* The visible image - Object Contain ensures NO CROPPING */}
//                   <img
//                     src={event.coverImageLink}
//                     alt={event.name}
//                     className="w-full h-auto max-h-[80vh] object-contain mx-auto"
//                   />
//                   {/* Shine effect */}
//                   <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//                 </>
//               ) : (
//                 <div className="h-96 flex flex-col items-center justify-center text-gray-500 bg-gray-900/50">
//                    <div className="w-16 h-16 border-2 border-dashed border-gray-700 rounded-xl mb-4" />
//                    <span>No visual asset available</span>
//                 </div>
//               )}
//             </div>

//             {/* Quick Actions (Desktop) */}
//             <div className="hidden lg:flex gap-4">
//                {event.registrationLink && (
//                 <a 
//                   href={event.registrationLink} 
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
//                 >
//                   Register Now <ExternalLink className="w-4 h-4" />
//                 </a>
//                )}
//             </div>
//           </div>

//           {/* RIGHT COL: DETAILS */}
//           <div className="space-y-8 bg-black/40 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/10">
            
//             {/* Header */}
//             <div className="space-y-4">
//                <div className="flex flex-wrap gap-3">
//                   <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${isOpen ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
//                     {isOpen ? <CheckCircle2 className="w-3 h-3 mr-2"/> : <XCircle className="w-3 h-3 mr-2"/>}
//                     {event.status}
//                   </span>
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-white/10">
//                     {event.type}
//                   </span>
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
//                     {event.access}
//                   </span>
//                </div>
               
//                <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400">
//                  {event.name}
//                </h1>
//             </div>

//             {/* Metadata Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                <div className="p-4 rounded-2xl bg-gray-900/50 border border-white/5 flex items-start gap-4">
//                   <div className="p-3 bg-gray-800 rounded-lg text-indigo-400">
//                     <Calendar className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Date</p>
//                     <p className="text-lg font-medium">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//                   </div>
//                </div>

//                <div className="p-4 rounded-2xl bg-gray-900/50 border border-white/5 flex items-start gap-4">
//                   <div className="p-3 bg-gray-800 rounded-lg text-indigo-400">
//                     <Clock className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Time</p>
//                     <p className="text-lg font-medium">{event.time}</p>
//                   </div>
//                </div>

//                <div className="md:col-span-2 p-4 rounded-2xl bg-gray-900/50 border border-white/5 flex items-start gap-4">
//                   <div className="p-3 bg-gray-800 rounded-lg text-indigo-400">
//                     <MapPin className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Venue</p>
//                     <p className="text-lg font-medium">{event.venue}</p>
//                   </div>
//                </div>
//             </div>

//             {/* Description */}
//             <div className="prose prose-invert max-w-none">
//               <h3 className="text-xl font-semibold text-white mb-4">About Event</h3>
//               <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
//                 {event.description}
//               </p>
//             </div>

//             {/* Links Section */}
//             <div className="space-y-3 pt-6 border-t border-white/10">
//               {event.meetLink && (
//                  <a href={event.meetLink} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-gray-900/30 border border-white/10 hover:border-indigo-500/50 hover:bg-gray-800/50 transition-all group">
//                     <div className="flex items-center gap-3">
//                         <Video className="w-5 h-5 text-indigo-400" />
//                         <span className="font-medium text-gray-200">Join Virtual Meet</span>
//                     </div>
//                     <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
//                  </a>
//               )}
              
//               {event.eventDocLink && (
//                  <a href={event.eventDocLink} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-gray-900/30 border border-white/10 hover:border-indigo-500/50 hover:bg-gray-800/50 transition-all group">
//                     <div className="flex items-center gap-3">
//                         <FileText className="w-5 h-5 text-indigo-400" />
//                         <span className="font-medium text-gray-200">View Event Document</span>
//                     </div>
//                     <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white" />
//                  </a>
//               )}

//               {/* Mobile Only Register Button */}
//               {event.registrationLink && (
//                 <div className="lg:hidden pt-4">
//                   <a 
//                     href={event.registrationLink} 
//                     target="_blank"
//                     className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2"
//                   >
//                     Register Now <ExternalLink className="w-4 h-4" />
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Footer Metdata */}
//             <div className="text-xs text-gray-300 pt-8 font-mono">
//                 ID: {id} • CREATED: {new Date(event.createdAt).toLocaleDateString()}
//             </div>
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// }

// app/(public)/events/[id]/page.tsx

import { redirect } from "next/navigation";
import { getEventById } from "@/lib/events/admin";
import { listPublicEvents } from "@/lib/events/public";
import MagneticCursor from "@/components/effects/MagneticCursor";
import ParchmentBackground from "@/components/effects/ParchmentBackground";
import Navbar from "@/components/navbar/Navbar";
import EventDetailsClient from "@/components/veritas/events/event-details-ui"; // Import client component


// to keep ISR off for this page until revalidated by admin actions
export async function generateStaticParams() {
  const events = await listPublicEvents();

  return events.map((event) => ({
    id: event.id,
  }));
}

export default async function PublicEventDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    redirect("/events");
  }

  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-[#bc6c25] selection:text-white">
      <MagneticCursor />
      <ParchmentBackground />
      <Navbar />
      
      {/* Delegate rendering to Client Component */}
      <EventDetailsClient event={event} />
    </main>
  );
}