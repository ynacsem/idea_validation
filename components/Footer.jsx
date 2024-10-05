'use client'

import { Mail, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export function FooterComponent() {
  return (
    (<footer className="w-full py-6 bg-gradient-to-r from-yellow-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">Soualem Yacine</h2>
            <p className="text-gray-600">Idea Validation Expert</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="mailto:yacineyacine520@gmail.com"
              className="text-gray-600 hover:text-yellow-500 transition-colors duration-300">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://github.com/ynacsem"
              className="text-gray-600 hover:text-yellow-500 transition-colors duration-300">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/"
              className="text-gray-600 hover:text-yellow-500 transition-colors duration-300">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div
          className="mt-4 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Quick Idea Validation. All rights reserved.</p>
        </div>
      </div>
    </footer>)
  );
}