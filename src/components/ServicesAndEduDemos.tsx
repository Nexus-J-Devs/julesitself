import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock, AlertTriangle, ShieldCheck, BookOpen } from 'lucide-react';
import { SERVICES_AND_EDU_DATA } from '../data/servicesAndEdu';
import { formatNaira } from '../demo-engine/DemoContext';
import { getWhatsAppLink, CONTACT } from '../config/site';
import type { DemoProps } from './DemoWebsites';

// 1. SALON DEMO
export const SalonDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedService, setSelectedService] = useState(SERVICES_AND_EDU_DATA.salon.services[0]);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [booked, setBooked] = useState(false);

  return (
    <div className="bg-[#FAF7F2] text-neutral-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-neutral-200 bg-[#FAF7F2]/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase tracking-wider">{businessName}</Link>
          <nav className="hidden md:flex gap-6 font-semibold uppercase tracking-wider text-neutral-600">
            <Link to={`/demo/${templateSlug}`} className="hover:text-black">Home</Link>
            <Link to={`/demo/${templateSlug}/services`} className="hover:text-black">Services</Link>
            <Link to={`/demo/${templateSlug}/booking`} className="hover:text-black">Book Appointment</Link>
            <Link to={`/demo/${templateSlug}/about`} className="hover:text-black">About</Link>
            <Link to={`/demo/${templateSlug}/contact`} className="hover:text-black">Contact</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/booking`} className="px-5 py-2 bg-neutral-900 text-white font-bold uppercase tracking-wider">Book Hair Slot</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-bold uppercase tracking-widest text-amber-900">Premier Hair Lounge</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-light">{businessName}</h1>
            <p className="text-neutral-600 max-w-lg mx-auto">{tagline}</p>
            <div className="pt-4">
              <Link to={`/demo/${templateSlug}/booking`} className="px-8 py-3 bg-neutral-900 text-white font-bold uppercase">Book Hair Styling</Link>
            </div>
          </section>
        )}

        {activePage === 'services' && (
          <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center">Salon Services & Pricing</h1>
            <div className="space-y-4">
              {SERVICES_AND_EDU_DATA.salon.services.map((s) => (
                <div key={s.id} className="p-5 bg-white border border-neutral-200 rounded flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-base">{s.name}</h3>
                    <span className="text-neutral-500">Duration: {s.duration}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-amber-900 text-sm">{formatNaira(s.price)}</span>
                    <Link to={`/demo/${templateSlug}/booking`} className="px-4 py-2 bg-neutral-900 text-white">Book</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'booking' && (
          <section className="max-w-md mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center">Book Salon Appointment</h1>
            {booked ? (
              <div className="p-6 bg-white border text-center space-y-3">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold">Styling Session Booked!</h3>
                <p>{selectedService.name} on {date}</p>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like to confirm a salon appointment:\n- Service: ${selectedService.name}\n- Date: ${date}\n- Name: ${name}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-700 text-white font-bold">
                  Confirm via WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="bg-white p-6 border space-y-4">
                <div>
                  <label className="block font-bold mb-1">Select Service</label>
                  <select value={selectedService.id} onChange={(e) => setSelectedService(SERVICES_AND_EDU_DATA.salon.services.find((s) => s.id === e.target.value) || SERVICES_AND_EDU_DATA.salon.services[0])} className="w-full p-2 border">
                    {SERVICES_AND_EDU_DATA.salon.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({formatNaira(s.price)})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Appointment Date</label>
                  <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Your Full Name</label>
                  <input type="text" required placeholder="e.g. Joy Adeleke" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Phone / WhatsApp</label>
                  <input type="tel" required placeholder="+234 812 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" />
                </div>
                <button type="submit" className="w-full py-3 bg-neutral-900 text-white font-bold uppercase">Reserve Hair Slot ({formatNaira(selectedService.price)})</button>
              </form>
            )}
          </section>
        )}

        {(activePage === 'about' || activePage === 'contact') && (
          <section className="py-16 px-6 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif">Victoria Island Salon</h1>
            <p>14 Admiralty Way, Victoria Island, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-neutral-900 text-neutral-400 py-6 text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 2. FITNESS DEMO
export const FitnessDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedMembership, setSelectedMembership] = useState(SERVICES_AND_EDU_DATA.fitness.memberships[0]);
  const [memberName, setMemberName] = useState('');
  const [phone, setPhone] = useState('');
  const [joined, setJoined] = useState(false);

  return (
    <div className="bg-zinc-950 text-zinc-100 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase tracking-wider text-white">{businessName}</Link>
          <nav className="hidden md:flex gap-6 uppercase tracking-wider text-zinc-400">
            <Link to={`/demo/${templateSlug}`} className="hover:text-white">Home</Link>
            <Link to={`/demo/${templateSlug}/timetable`} className="hover:text-white">Timetable</Link>
            <Link to={`/demo/${templateSlug}/memberships`} className="hover:text-white">Memberships</Link>
            <Link to={`/demo/${templateSlug}/trainers`} className="hover:text-white">Trainers</Link>
            <Link to={`/demo/${templateSlug}/contact`} className="hover:text-white">Contact</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/memberships`} className="px-5 py-2 bg-zinc-100 text-zinc-950 font-bold uppercase">Get Pass</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-emerald-400 uppercase">Reformer Pilates & Conditioning</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold uppercase">{businessName}</h1>
            <p className="text-zinc-400 max-w-xl mx-auto">{tagline}</p>
            <div className="pt-4">
              <Link to={`/demo/${templateSlug}/timetable`} className="px-8 py-3 bg-zinc-100 text-zinc-950 font-bold uppercase">View Class Timetable</Link>
            </div>
          </section>
        )}

        {activePage === 'timetable' && (
          <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center text-white">Weekly Reformer Class Timetable</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES_AND_EDU_DATA.fitness.classes.map((c) => (
                <div key={c.id} className="p-5 bg-zinc-900 border border-zinc-800 rounded space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm text-white">{c.name}</h3>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px]">{c.day}</span>
                  </div>
                  <p className="text-zinc-400 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {c.time} • Trainer: {c.instructor}</p>
                  <p className="text-zinc-500 text-[10px]">{c.capacity}</p>
                  <Link to={`/demo/${templateSlug}/memberships`} className="block text-center py-2 bg-zinc-800 text-white font-bold hover:bg-zinc-700 mt-2">Book Class</Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'memberships' && (
          <section className="max-w-2xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center text-white">Join Studio Membership</h1>
            {joined ? (
              <div className="p-6 bg-zinc-900 border border-zinc-800 text-center space-y-3">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Membership Plan Selected!</h3>
                <p className="text-zinc-300">{selectedMembership.name} ({formatNaira(selectedMembership.price)})</p>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI want to register for membership:\n- Plan: ${selectedMembership.name}\n- Price: ${formatNaira(selectedMembership.price)}\n- Name: ${memberName}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold">
                  Complete on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setJoined(true); }} className="bg-zinc-900 p-6 border border-zinc-800 space-y-4">
                <div>
                  <label className="block font-bold mb-1 text-zinc-300">Select Membership Plan</label>
                  <select value={selectedMembership.name} onChange={(e) => setSelectedMembership(SERVICES_AND_EDU_DATA.fitness.memberships.find((m) => m.name === e.target.value) || SERVICES_AND_EDU_DATA.fitness.memberships[0])} className="w-full p-2 bg-zinc-950 border border-zinc-800 text-white">
                    {SERVICES_AND_EDU_DATA.fitness.memberships.map((m, idx) => (
                      <option key={idx} value={m.name}>{m.name} ({formatNaira(m.price)})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-zinc-300">Full Name</label>
                  <input type="text" required placeholder="e.g. Babatunde Raji" value={memberName} onChange={(e) => setMemberName(e.target.value)} className="w-full p-2 bg-zinc-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-zinc-300">Phone / WhatsApp</label>
                  <input type="tel" required placeholder="+234 812 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 bg-zinc-950 border border-zinc-800 text-white" />
                </div>
                <button type="submit" className="w-full py-3 bg-zinc-100 text-zinc-950 font-bold uppercase">Activate Membership ({formatNaira(selectedMembership.price)})</button>
              </form>
            )}
          </section>
        )}

        {(activePage === 'trainers' || activePage === 'contact') && (
          <section className="py-16 px-6 text-center max-w-2xl mx-auto space-y-4 text-zinc-400">
            <h1 className="text-3xl font-serif text-white">Lekki Phase 1 Studio</h1>
            <p>Block 12 Admiralty Way, Lekki Phase 1, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-zinc-900 text-zinc-500 py-6 text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 3. HOME SERVICES DEMO
export const HomeServicesDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedService, setSelectedService] = useState(SERVICES_AND_EDU_DATA.homeServices.services[0]);
  const [isEmergency, setIsEmergency] = useState(false);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-slate-200 bg-white sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase text-slate-900">{businessName}</Link>
          <nav className="hidden md:flex gap-6 font-semibold uppercase text-slate-600">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/services`}>Maintenance Services</Link>
            <Link to={`/demo/${templateSlug}/request`}>Request Artisan</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Contact</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/request`} className="px-5 py-2 bg-blue-700 text-white font-bold uppercase">Request Technician</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-bold text-blue-700 uppercase">24/7 Verified Artisans in Lagos</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold">{businessName}</h1>
            <p className="text-slate-600 max-w-lg mx-auto">{tagline}</p>
            <div className="pt-4">
              <Link to={`/demo/${templateSlug}/request`} className="px-8 py-3 bg-blue-700 text-white font-bold uppercase">Request Emergency Repair</Link>
            </div>
          </section>
        )}

        {activePage === 'services' && (
          <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center">Maintenance Services & Standard Pricing</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES_AND_EDU_DATA.homeServices.services.map((s) => (
                <div key={s.id} className="p-5 bg-white border border-slate-200 rounded space-y-2">
                  <h3 className="font-bold text-base">{s.name}</h3>
                  <p className="text-slate-500">Response Time: {s.time}</p>
                  <p className="font-bold text-blue-700 text-sm">{formatNaira(s.price)} standard fee</p>
                  <Link to={`/demo/${templateSlug}/request`} className="block text-center py-2 bg-slate-900 text-white font-bold mt-2">Request Technician</Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'request' && (
          <section className="max-w-md mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center">Request Maintenance Technician</h1>
            {submitted ? (
              <div className="p-6 bg-white border text-center space-y-3">
                <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto" />
                <h3 className="text-lg font-bold">Technician Request Prepared!</h3>
                <p>{selectedService.name} {isEmergency ? '(URGENT 2-HOUR RESPONSE)' : ''}</p>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI need a technician:\n- Service: ${selectedService.name}\n- Emergency: ${isEmergency ? 'YES' : 'No'}\n- Address: ${address}\n- Name: ${name}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-700 text-white font-bold">
                  Send Location on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white p-6 border space-y-4">
                <div>
                  <label className="block font-bold mb-1">Select Required Service</label>
                  <select value={selectedService.id} onChange={(e) => setSelectedService(SERVICES_AND_EDU_DATA.homeServices.services.find((s) => s.id === e.target.value) || SERVICES_AND_EDU_DATA.homeServices.services[0])} className="w-full p-2 border">
                    {SERVICES_AND_EDU_DATA.homeServices.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({formatNaira(s.price)})</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded flex items-center justify-between">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Emergency Dispatch</span>
                  <input type="checkbox" checked={isEmergency} onChange={(e) => setIsEmergency(e.target.checked)} className="w-4 h-4" />
                </div>

                <div>
                  <label className="block font-bold mb-1">Lagos Property Address</label>
                  <input type="text" required placeholder="e.g. 24 Isaac John, Ikeja GRA" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold mb-1">Full Name</label>
                    <input type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Phone</label>
                    <input type="tel" required placeholder="+234 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-blue-700 text-white font-bold uppercase">Dispatch Technician ({formatNaira(selectedService.price)})</button>
              </form>
            )}
          </section>
        )}

        {activePage === 'contact' && (
          <section className="py-16 px-6 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif">24/7 Lagos Dispatch Center</h1>
            <p>Ikeja GRA & Lekki Phase 1 Stations • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};

// 4. EDUCATION DEMO
export const EducationDemo: React.FC<DemoProps> = ({ businessName, tagline, templateSlug, activePage }) => {
  const [selectedCourse, setSelectedCourse] = useState(SERVICES_AND_EDU_DATA.education.courses[0]);
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className="bg-sky-50 text-slate-900 font-sans min-h-screen flex flex-col justify-between text-xs">
      <div>
        <header className="p-6 border-b border-sky-200 bg-white sticky top-0 z-30 flex justify-between items-center">
          <Link to={`/demo/${templateSlug}`} className="font-serif text-2xl font-bold uppercase text-sky-950">{businessName}</Link>
          <nav className="hidden md:flex gap-6 font-semibold uppercase text-slate-600">
            <Link to={`/demo/${templateSlug}`}>Home</Link>
            <Link to={`/demo/${templateSlug}/courses`}>Bootcamp Courses</Link>
            <Link to={`/demo/${templateSlug}/enroll`}>Enrollment</Link>
            <Link to={`/demo/${templateSlug}/contact`}>Contact</Link>
          </nav>
          <Link to={`/demo/${templateSlug}/enroll`} className="px-5 py-2 bg-sky-800 text-white font-bold uppercase">Apply Now</Link>
        </header>

        {(activePage === 'home' || !activePage) && (
          <section className="py-20 px-6 text-center max-w-3xl mx-auto space-y-4">
            <span className="font-bold text-sky-800 uppercase">Yaba Tech Talent Incubator</span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-sky-950">{businessName}</h1>
            <p className="text-slate-600 max-w-lg mx-auto">{tagline}</p>
            <div className="pt-4">
              <Link to={`/demo/${templateSlug}/courses`} className="px-8 py-3 bg-sky-800 text-white font-bold uppercase">Explore Courses</Link>
            </div>
          </section>
        )}

        {activePage === 'courses' && (
          <section className="max-w-4xl mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center text-sky-950">Tech Bootcamps & Cohorts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICES_AND_EDU_DATA.education.courses.map((c) => (
                <div key={c.id} className="p-6 bg-white border border-sky-100 rounded space-y-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-sky-950">{c.name}</h3>
                    <p className="text-slate-500 mt-1">Duration: {c.duration} • {c.schedule}</p>
                    <span className="inline-block mt-2 font-bold text-sky-900 text-sm">{formatNaira(c.price)} tuition</span>
                  </div>
                  <Link to={`/demo/${templateSlug}/enroll`} className="block text-center py-2.5 bg-sky-900 text-white font-bold rounded">Apply for Cohort</Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {activePage === 'enroll' && (
          <section className="max-w-md mx-auto px-6 py-12 space-y-6">
            <h1 className="text-3xl font-serif text-center text-sky-950">Cohort Enrollment Application</h1>
            {enrolled ? (
              <div className="p-6 bg-white border text-center space-y-3">
                <BookOpen className="w-8 h-8 text-sky-700 mx-auto" />
                <h3 className="text-lg font-bold">Application Received!</h3>
                <p>{selectedCourse.name} ({formatNaira(selectedCourse.price)})</p>
                <a href={getWhatsAppLink(`Hello ${businessName}!\nI'd like to complete enrollment:\n- Course: ${selectedCourse.name}\n- Student Name: ${studentName}\n- Phone: ${phone}`)} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-emerald-700 text-white font-bold">
                  Complete Admissions on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setEnrolled(true); }} className="bg-white p-6 border space-y-4">
                <div>
                  <label className="block font-bold mb-1">Select Target Course</label>
                  <select value={selectedCourse.id} onChange={(e) => setSelectedCourse(SERVICES_AND_EDU_DATA.education.courses.find((c) => c.id === e.target.value) || SERVICES_AND_EDU_DATA.education.courses[0])} className="w-full p-2 border">
                    {SERVICES_AND_EDU_DATA.education.courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({formatNaira(c.price)})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Student Full Name</label>
                  <input type="text" required placeholder="e.g. David Okon" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full p-2 border" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Phone / WhatsApp</label>
                  <input type="tel" required placeholder="+234 812 ..." value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border" />
                </div>
                <button type="submit" className="w-full py-3 bg-sky-900 text-white font-bold uppercase">Submit Application ({formatNaira(selectedCourse.price)})</button>
              </form>
            )}
          </section>
        )}

        {activePage === 'contact' && (
          <section className="py-16 px-6 text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-serif">Yaba Innovation Campus</h1>
            <p>Commercial Avenue, Yaba, Lagos • WhatsApp {CONTACT.whatsappDisplay}</p>
          </section>
        )}
      </div>

      <footer className="bg-sky-950 text-sky-200 py-6 text-center">
        <p>{businessName} • WhatsApp {CONTACT.whatsappDisplay}</p>
      </footer>
    </div>
  );
};
