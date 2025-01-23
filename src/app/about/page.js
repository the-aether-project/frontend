"use client"

import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';

const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-background text-foreground' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8">About Aether</h1>
        <p className="text-xl text-center max-w-2xl mx-auto mb-12">
          Aether is a platform designed to seamlessly share desktop resources across devices with enterprise-grade security. Our mission is to provide a fast, secure, and easy-to-use solution for resource sharing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              At Aether, we aim to revolutionize the way resources are shared across devices. Our platform ensures minimal latency, high security, and ease of use, making it the perfect solution for both personal and enterprise use.
            </p>
          </div>
          <div className="flex justify-center">
            <Image src="/about1.webp" alt="Our Mission" width={500} height={300} className="rounded-lg shadow-lg bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex justify-center order-2 md:order-1">
            <Image src="/about-ku.jpeg" alt="Our Story" width={500} height={300} className="rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg">
              Aether was created as a semester project to address a local problem: helping students generate side income by renting their devices while in college. It also provides an opportunity for underprivileged students to use high-end devices for learning, which they otherwise couldn't afford. Our goal is to convert this solution into a sustainable business model.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-lg">
              Aether stands out with its 99.9% uptime, 10ms average latency, and 24/7 active support. We are committed to providing a reliable and efficient service to our users.
            </p>
          </div>
          <div className="flex justify-center">
            <Image src="/2nd_step.jpeg" alt="Why Choose Us" width={500} height={300} className="rounded-lg shadow-lg" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8">
            Connect with us on social media to stay updated with the latest features, tips, and community highlights.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#" className="group flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Facebook className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-sm mt-2 block">Facebook</span>
            </a>
            <a href="#" className="group flex flex-col items-center">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-sm mt-2 block">Discord</span>
            </a>
            <a href="#" className="group flex flex-col items-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Linkedin className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-sm mt-2 block">LinkedIn</span>
            </a>
            <a href="#" className="group flex flex-col items-center">
              <div className="h-16 w-16 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <Instagram className="h-8 w-8 text-pink-600" />
              </div>
              <span className="text-sm mt-2 block">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;