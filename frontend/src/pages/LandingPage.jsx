import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to TaskMa</h1>
        <p className="text-lg text-gray-600">Your Ultimate Task Manager App</p>
      </header>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Organize Your Life, One Task at a Time</h2>
        <p className="text-lg text-gray-700">TaskMa is more than just a task manager app — it's your personal assistant in staying organized and productive. Whether you're managing personal projects, team tasks, or daily errands, TaskMaster is designed to simplify your life.</p>
      </section>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Key Features:</h2>
        <ul className="list-disc list-inside text-lg text-gray-700">
          <li><strong>Intuitive Task Creation:</strong> Easily create, edit, and prioritize tasks with a user-friendly interface.</li>
          <li><strong>Smart Reminders:</strong> Stay on top of deadlines with customizable reminders and notifications.</li>
          <li><strong>Collaboration Tools:</strong> Seamlessly collaborate with teams by assigning tasks and tracking progress.</li>
          <li><strong>Progress Tracking:</strong> Monitor your productivity with visual progress indicators and insightful analytics.</li>
          <li><strong>Cross-Platform Access:</strong> Access your tasks anytime, anywhere, on your desktop or mobile device.</li>
        </ul>
      </section>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Why TaskMa ?</h2>
        <p className="text-lg text-gray-700">TaskMa stands out with its robust features designed to streamline your workflow and enhance efficiency. Whether you're a freelancer, student, or professional, TaskMaster adapts to your unique needs.</p>
      </section>
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
        <p className="text-lg text-gray-700">Join thousands of users who have improved their productivity with TaskMa.</p>
        <Link to={"/signup"}>
          <button className="w-[100px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4 mr-4">Sign Up</button>
        </Link>
        <Link to={"/signin"}>
          <button className="w-[100px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4 mr-4">Sign In</button>
        </Link>
      </section>
    </div>
  );
}