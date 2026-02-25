"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { getUpcomingAppointments } from "@/actions/tenant";
import { formatTime } from "@/lib/utils";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  type UpcomingAppointment = Awaited<ReturnType<typeof getUpcomingAppointments>>[number];
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>([]);

  useEffect(() => {
    getUpcomingAppointments().then(setAppointments);
  }, [currentDate]);

  // Helper to go back/forward in weeks (simplified for demo)
  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Schedule grid generator
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8 AM to 6 PM
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Calendario de Citas
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Visualiza y administra tu agenda en tiempo real.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 shadow-sm">
            <button
              onClick={prevWeek}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-600 dark:text-zinc-400"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium px-2 dark:text-zinc-300">
              {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
            </span>
            <button
              onClick={nextWeek}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md text-zinc-600 dark:text-zinc-400"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button className="bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Nueva Cita
          </button>
        </div>
      </div>

      {/* Calendar Grid (Week View Real Data) */}
      <div className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black/40 shadow-sm overflow-hidden flex flex-col">
        {/* Header (Days) */}
        <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-black/20">
          <div className="p-4 border-r border-zinc-200 dark:border-zinc-900">
             {/* Empty corner */}
          </div>
          {days.map((day, i) => (
            <div key={day} className={`p-4 text-center ${i < days.length - 1 ? 'border-r border-zinc-200 dark:border-zinc-900' : ''}`}>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{day}</p>
            </div>
          ))}
        </div>

        {/* Hour Grid */}
        <div className="flex-1 overflow-y-auto min-h-[500px]">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-7 border-b border-zinc-100 dark:border-zinc-900/50">
              <div className="p-4 text-xs font-medium text-zinc-400 dark:text-zinc-500 border-r border-zinc-200 dark:border-zinc-900 text-right">
                {hour}:00
              </div>
              {days.map((day, i) => {
                // Determine if there is an appointment at this day & hour
                // For a real production app, we map the actual dates to the grid coordinates via Date() math
                // Since this is MVP, we render them based on real DB items dynamically overlapping the day/hour conceptually
                const cellAppts = appointments.filter((appointment) => {
                   const d = new Date(appointment.date);
                    // Simplified match: 1=Lunes, 2=Martes... and hours match
                    return d.getDay() === (i + 1) && d.getHours() === hour;
                });

                return (
                  <div 
                    key={`${day}-${hour}`} 
                    className={`p-1 min-h-[80px] hover:bg-zinc-50 dark:hover:bg-zinc-900/10 cursor-pointer ${i < days.length - 1 ? 'border-r border-zinc-200 dark:border-zinc-900' : ''}`}
                  >
                     {cellAppts.map((appt: UpcomingAppointment) => (
                        <div key={appt.id} className="bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/50 text-blue-800 dark:text-blue-300 p-2 rounded-lg text-xs font-medium shadow-sm h-full flex flex-col justify-between mb-1 overflow-hidden">
                           <div>
                             <div className="font-semibold truncate">{appt.service?.name || "Servicio"}</div>
                             <div className="text-[10px] mt-0.5 opacity-90 truncate">{appt.client?.name}</div>
                           </div>
                           <div className="text-[9px] mt-1 opacity-70 font-mono">{formatTime(appt.date)}</div>
                        </div>
                     ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
