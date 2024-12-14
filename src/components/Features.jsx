const features = [
  {
    title: "Interactive Courses",
    description: "Engage in hands-on learning with interactive courses.",
  },
  {
    title: "Expert Instructors",
    description: "Learn from industry-leading instructors.",
  },
  {
    title: "Affordable Pricing",
    description: "Get access to high-quality education at an affordable price.",
  },
];

const Features = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Choose EduSpace?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
