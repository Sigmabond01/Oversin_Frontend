import React, { useState } from 'react';
import { CheckCircle, Users, ArrowRight } from 'lucide-react';

export default function FitnessProgram() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black p-4 md:p-0">
            <span className="text-red-600 text-6xl">
            FITNESS PROGRAM
          </span>
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12">
          <div className="space-y-6">
            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026729/es_lyfibr.jpg" 
                  alt="Fitness training"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300">
                <div className="h-full relative">
                  <img 
                    src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026737/me_kxktxo.jpg" 
                    alt="Strength training"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-all duration-300"></div>
                </div>
              </div>
              
              <div className="aspect-square rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300">
                <div className="h-full relative">
                  <img 
                    src="https://res.cloudinary.com/dcdqkzmfi/image/upload/v1758026722/ba_ycjeaf.png" 
                    alt="Workout session"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-all duration-300"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-black border-2 border-white shadow-lg"></div>
                <div className="w-12 h-12 rounded-full bg-red-600 border-2 border-white shadow-lg"></div>
                <div className="w-12 h-12 rounded-full bg-red-900 border-2 border-white shadow-lg"></div>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5" />
                <span className="font-medium">Join <span className="font-bold text-red-600">2,500+</span> members</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                Transform your{' '}
                <span className="text-red-600">
                  physique
                </span>{' '}
                with our fitness plan
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Join our community and achieve your fitness goals with personalized workout plans and expert guidance.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Increase Muscle and Strength',
                'Be Healthier than before',
                'Increase Stamina'
              ].map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-red-600/20 backdrop-blur-sm border border-red-500/30 px-4 py-4 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="group relative overflow-hidden bg-red-600 hover:from-red-700 hover:to-red-700 text-white text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3"
              >
                <span className="relative z-10">Join now</span>
                <ArrowRight 
                  className={`w-5 h-5 relative z-10 transition-transform duration-300 ${
                    hovered ? 'translate-x-1' : ''
                  }`} 
                />
                <div className="absolute inset-0 bg-red-900 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}