import React from 'react';
import { Shield, Timer, Star } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="w-12 h-12 text-coral-primary" />,
      stat: "98%",
      title: "Parents Feel More Confident",
      description: "With AI-powered guidance and expert support"
    },
    {
      icon: <Timer className="w-12 h-12 text-coral-primary" />,
      stat: "3 Hours",
      title: "Saved Every Week",
      description: "Through smart automation and reminders"
    },
    {
      icon: <Star className="w-12 h-12 text-coral-primary" />,
      stat: "4.9/5",
      title: "User Rating",
      description: "From over 10,000 happy parents"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-primary mb-4">Why Parents Love Us</h2>
          <p className="text-xl text-purple-primary/80">Join thousands of happy families on their parenting journey</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <div className="text-4xl font-bold text-purple-primary mb-2">{benefit.stat}</div>
              <h3 className="text-xl font-bold text-purple-primary mb-2">{benefit.title}</h3>
              <p className="text-purple-primary/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;