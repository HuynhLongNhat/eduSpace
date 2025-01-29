import QuizList from "./QuizList";

const QuizPage = () => {
  const quizData = [
    {
      id: 1,
      title: "JavaScript Basics",
      description:
        "Learn the basics of JavaScript, including variables, loops, and functions.",
    },
    {
      id: 2,
      title: "React Fundamentals",
      description:
        "Dive into React and learn about components, state, and props.",
    },
    {
      id: 3,
      title: "CSS for Beginners",
      description: "Master the basics of CSS for styling web pages.",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz List</h1>
      <QuizList quizzes={quizData} />
    </div>
  );
};

export default QuizPage;
