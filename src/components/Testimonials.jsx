const testimonials = [
  {
    name: "Alice Johnson",
    feedback:
      "This platform is amazing! The courses are well-structured and engaging.",
  },
  {
    name: "Mark Lee",
    feedback:
      "I learned so much in such a short time. Highly recommend EduSpace!",
  },
];

const Testimonials = () => {
  return (
    <div className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Students Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow rounded-lg text-center"
          >
            <p className="mb-4">{testimonial.feedback}</p>
            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
