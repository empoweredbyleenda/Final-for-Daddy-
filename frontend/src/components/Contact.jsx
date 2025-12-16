import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { businessInfo } from '../data/mock';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-600 mb-4">
            <span className="w-12 h-px bg-amber-600" />
            <span className="text-sm font-semibold tracking-wider uppercase">Get In Touch</span>
            <span className="w-12 h-px bg-amber-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-stone-900 mb-4">
            Visit Us or
            <span className="block text-amber-600 font-semibold">Book an Appointment</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Location</p>
                    <p className="text-stone-600">{businessInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Phone</p>
                    <a href={`tel:${businessInfo.phone}`} className="text-amber-600 hover:underline">
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Email</p>
                    <a href={`mailto:${businessInfo.email}`} className="text-amber-600 hover:underline">
                      {businessInfo.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Business Hours</p>
                    <p className="text-stone-600">{businessInfo.hours.weekday}</p>
                    <p className="text-stone-600">{businessInfo.hours.weekend}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <p className="font-medium text-stone-900 mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href={businessInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href={businessInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href={businessInfo.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center hover:bg-amber-100 hover:text-amber-600 transition-colors"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Visual */}
          <div className="relative">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm h-full min-h-[400px]">
              {/* Embed Google Map */}
              <iframe
                title="Snatched Beauties Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.9!2d-118.39!3d33.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5710+W+Manchester+Ave%2C+Los+Angeles%2C+CA+90045!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Floating CTA */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-stone-900">Ready to Visit?</p>
                  <p className="text-sm text-stone-500">Book your appointment now</p>
                </div>
                <Button
                  asChild
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full"
                >
                  <a href={businessInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Book Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
