import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Phone } from 'lucide-react';

const SalesCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample appointments data - would come from your database
  const appointments = [
    {
      id: 1,
      businessName: "ABC Motors",
      date: "2025-01-07",
      time: "10:00 AM",
      address: "123 Main St, Austin, TX",
      contact: "John Smith",
      phone: "(555) 123-4567",
      status: "Confirmed"
    },
    // Add more appointments as needed
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    const dateStr = formatDate(date);
    return appointments.filter(apt => apt.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-6 space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-2xl font-bold">
                {getMonthName(currentDate)} {currentDate.getFullYear()}
              </h2>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium py-2">
                {day}
              </div>
            ))}
            {days.map((date, index) => (
              <div 
                key={index}
                className={`
                  min-h-24 border rounded-lg p-2 cursor-pointer
                  ${date && formatDate(date) === formatDate(new Date()) ? 'bg-blue-50' : ''}
                  ${date && selectedDate && formatDate(date) === formatDate(selectedDate) ? 'border-blue-500 border-2' : ''}
                  hover:border-blue-300
                `}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <>
                    <div className="font-medium">{date.getDate()}</div>
                    <div className="space-y-1">
                      {getAppointmentsForDate(date).map(apt => (
                        <div 
                          key={apt.id}
                          className="text-xs bg-blue-100 p-1 rounded truncate"
                        >
                          {apt.time} - {apt.businessName}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Appointments for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getAppointmentsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getAppointmentsForDate(selectedDate).map(apt => (
                  <div key={apt.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-lg">{apt.businessName}</h3>
                      <span className={`
                        px-2 py-1 rounded-full text-sm
                        ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      `}>
                        {apt.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {apt.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {apt.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {apt.contact}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} />
                        {apt.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No appointments scheduled for this day
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Add Appointment Button */}
      <button 
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => {/* Add appointment logic */}}
      >
        + Add Appointment
      </button>
    </div>
  );
};

export default SalesCalendar;
