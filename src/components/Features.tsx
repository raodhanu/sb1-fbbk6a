import React from 'react';
import { Brain, Calendar, Camera, MessageCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      title: "Smart\nGuidance",
      description: "AI-powered parenting advice",
      bgColor: "bg-purple-primary",
      image: "https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Calendar className="w-8 h-8 text-white" />,
      title: "Growth\nTracking",
      description: "Monitor milestones easily",
      bgColor: "bg-blue-primary",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Camera className="w-8 h-8 text-white" />,
      title: "Memory\nCapture",
      description: "Save precious moments",
      bgColor: "bg-coral-primary",
      image: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: "Expert\nCommunity",
      description: "Connect with professionals",
      bgColor: "bg-green-primary",
      image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="features" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-primary mb-4">Magical Features</h2>
          <p className="text-xl text-purple-primary/80">Everything you need for your parenting journey</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Content Container */}
              <div className={`${feature.bgColor} p-6 min-h-[160px]`}>
                <div className="mb-4">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white whitespace-pre-line leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/90">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-8 h-8">
                <div className="w-full h-full border-4 border-white/30 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;