import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { getFormattedDate } from '../utils/contactMeta';

gsap.registerPlugin(ScrollTrigger);

// ─── EmailJS config (from environment variables — see .env.example) ────────
// These MUST be set in a .env file for sending to work. There is no
// fallback and no mock mode: if they're missing, the form tells the user
// sending isn't configured instead of lying about success.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// Recipient inbox — must also be set as the "To Email" field on the
// EmailJS template itself (EmailJS reads the recipient from the template,
// not from this client-side value, since a webpage can't set its own
// destination for security reasons). Kept here for documentation and so
// it can be sent along as {{to_email}} if the template references it.
const TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL || 'nitinmakwana623@gmail.com';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
];

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!values.subject.trim()) errors.subject = 'Subject is required';
  if (!values.message.trim()) errors.message = 'Message is required';
  return errors;
}

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      const elements = sectionRef.current.querySelectorAll('.animate-element');

      tl.fromTo(elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
    // Clear the field's error as soon as the user starts fixing it
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'loading') return; // prevent double submission

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error');
      setStatusMessage('❌ Contact form is not configured yet. Please try again later.');
      console.error(
        'EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file (see .env.example).'
      );
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          time: getFormattedDate(),
          to_email: TO_EMAIL,
        },
        { publicKey: PUBLIC_KEY }
      );

      setStatus('success');
      setStatusMessage('✅ Thank you! Your message has been sent successfully.');
      setValues({ name: '', email: '', subject: '', message: '' });
      formRef.current?.reset();
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
      setStatusMessage('❌ Failed to send your message. Please try again.');
    }
  };

  const isLoading = status === 'loading';

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Intense Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[800px] h-[500px] bg-yellow-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
      </div>

      <div className="max-w-2xl w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Header Block */}
        <div className="mb-12 animate-element">
          <p className="text-yellow-400 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Encrypted Channel ]
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white font-sans leading-none mb-6 drop-shadow-xl">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white font-serif italic pr-2">Connect</span>
          </h2>
          <p className="text-gray-400 font-light text-lg tracking-wide leading-relaxed max-w-xl mx-auto">
            Whether you have a mobile app idea, a web project to build, or just want to talk tech—my inbox is always open. Let's collaborate and build something great together.
          </p>
        </div>

        {/* Form Block */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="w-full flex flex-col space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FIELDS.map(({ id, label, type }) => (
              <div key={id} className="relative group animate-element text-left">
                <input
                  type={type}
                  id={id}
                  value={values[id]}
                  onChange={handleChange}
                  disabled={isLoading}
                  aria-invalid={Boolean(errors[id])}
                  aria-describedby={errors[id] ? `${id}-error` : undefined}
                  className={`peer w-full bg-white/5 border text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(250,204,21,0.2)] placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors[id]
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/5 focus:border-yellow-400/50'
                  }`}
                  placeholder={label}
                />
                <label htmlFor={id} className="absolute left-5 top-4 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-[#030303] px-1 rounded">
                  {label}
                </label>
                {errors[id] && (
                  <p id={`${id}-error`} className="mt-2 text-xs text-red-400 tracking-wide" role="alert">
                    {errors[id]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Subject Input */}
          <div className="relative group animate-element text-left">
            <input
              type="text"
              id="subject"
              value={values.subject}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className={`peer w-full bg-white/5 border text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(250,204,21,0.2)] placeholder-transparent disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.subject
                  ? 'border-red-500/60 focus:border-red-500'
                  : 'border-white/5 focus:border-yellow-400/50'
              }`}
              placeholder="Subject"
            />
            <label htmlFor="subject" className="absolute left-5 top-4 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-[#030303] px-1 rounded">
              Subject
            </label>
            {errors.subject && (
              <p id="subject-error" className="mt-2 text-xs text-red-400 tracking-wide" role="alert">
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div className="relative group animate-element text-left">
            <textarea 
              id="message"
              value={values.message}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              rows="5"
              className={`peer w-full bg-white/5 border text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(250,204,21,0.2)] placeholder-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.message
                  ? 'border-red-500/60 focus:border-red-500'
                  : 'border-white/5 focus:border-yellow-400/50'
              }`}
              placeholder="Message"
            ></textarea>
            <label htmlFor="message" className="absolute left-5 top-4 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-[#030303] px-1 rounded">
              Message
            </label>
            {errors.message && (
              <p id="message-error" className="mt-2 text-xs text-red-400 tracking-wide" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="animate-element pt-4 flex flex-col items-center gap-5">
            <button 
              type="submit" 
              disabled={isLoading}
              aria-busy={isLoading}
              className="relative group overflow-hidden rounded-full w-full md:w-auto px-12 py-4 border border-yellow-400/30 bg-black text-white text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:scale-[1.02] hover:border-yellow-400 shadow-[0_0_0_rgba(250,204,21,0)] hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 via-yellow-600/20 to-yellow-600/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <span className="relative z-10 flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-yellow-400">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </>
                )}
              </span>
            </button>

            {/* Status Message */}
            {status === 'success' && (
              <p className="text-sm tracking-wide text-emerald-400" role="status">
                {statusMessage}
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm tracking-wide text-red-400" role="alert">
                {statusMessage}
              </p>
            )}
          </div>
          
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}
