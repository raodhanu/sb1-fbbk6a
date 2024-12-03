import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Parenting Pal has been a game-changer for our family. The AI advice is spot-on!",
      author: "Sarah M.",
      role: "Mother of two",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The vaccination tracking alone is worth it. Never missed a shot since we started using it.",
      author: "Michael P.",
      role: "Father of twins",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "As a first-time mom, having expert guidance at my fingertips is incredibly reassuring.",
      author: "Emily R.",
      role: "New parent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-primary mb-4">Parent Stories</h2>
          <p className="text-xl text-purple-primary/80">Hear from our amazing community</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-purple-primary">{testimonial.author}</div>
                  <div className="text-purple-primary/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-purple-primary/80 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;