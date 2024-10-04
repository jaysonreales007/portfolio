import { useState, useEffect } from "react"
import { CalendarDays, Globe, MapPin, MessageCircle, Repeat2, Heart, IdCard, CheckCircle, Award } from "lucide-react"
import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from "axios"
import Marquee from 'react-fast-marquee';
import { FaReact, FaNodeJs, FaFacebook  } from 'react-icons/fa';
import { SiJavascript, SiGraphql, SiTailwindcss, SiFarcaster  } from 'react-icons/si';
import { ClipLoader } from "react-spinners"; // Add this import
import { Code, Server, Smartphone, Palette, Database, Cloud } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export default function DevPortfolio() {
  const [activeTab, setActiveTab] = useState("home")
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      content: "I started playing Cat Town - Welcome to Cat Town, an idle game built on Base, driven by a self-sustainable, fair economy. Purchase cats and combine floofs to increase your ETH yield and $KIBBLE rewards.",
      likes: 15,
      comments: 3,
      reposts: 5,
      /* images: ["./images/cat-town.jpg"] */
    },
    {
      id: 2,
      content: "Just started using Farcaster - A protocol for building sufficiently decentralized social networks.",
      likes: 10,
      comments: 8,
      reposts: 2,
      /* images: ["./images/farcast.jpg", "./images/farcast-notif.jpg"] */
    }
  ])
  const [projects] = useState([
    { id: 1, title: "E-commerce Platform", description: "A full-stack e-commerce solution with React and Node.js", technologies: ["React", "Node.js", "MongoDB"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "Weather App", description: "Real-time weather forecasting app using OpenWeatherMap API", technologies: ["JavaScript", "API Integration"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 3, title: "Task Manager", description: "A Kanban-style task management application", technologies: ["Vue.js", "Vuex", "Firebase"], size: "md", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "Portfolio Website", description: "A Kanban-style task management application", technologies: ["Vue.js", "Vuex", "Firebase"], size: "md", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 5, title: "Blogging Platform", description: "A full-featured blogging system with user authentication", technologies: ["Django", "PostgreSQL"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 6, title: "Fitness Tracker", description: "Mobile app for tracking workouts and nutrition", technologies: ["React Native", "Redux"], size: "md", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 7, title: "Chat Application", description: "Real-time chat app with websockets", technologies: ["Socket.io", "Express"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 8, title: "Movie Database", description: "Web app for browsing and rating movies", technologies: ["Angular", "TMDb API"], size: "md", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 9, title: "Recipe Finder", description: "App to find recipes based on available ingredients", technologies: ["React", "Spoonacular API"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 10, title: "Budget Tracker", description: "Personal finance management application", technologies: ["Vue.js", "Chart.js"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 11, title: "Social Media Dashboard", description: "Analytics dashboard for social media accounts", technologies: ["React", "D3.js"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 12, title: "News Aggregator", description: "Personalized news feed from multiple sources", technologies: ["Python", "Flask", "News API"], size: "lg", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage, setProjectsPerPage] = useState(5)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setProjectsPerPage(window.innerWidth >= 1024 ? 9 : 5)
      setCurrentPage(1); // Reset to first page on resize
    }

    window.addEventListener('resize', handleResize)
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/jaysonreales007/repos')
        const repos = response.data.map(repo => ({
          id: repo.id,
          title: repo.name,
          description: repo.description,
          technologies: repo.topics,
          githubLink: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language
        }))
        setProjects(repos)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching repositories:", error)
        setError("Failed to fetch repositories. Please try again later.")
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])
  const isMobile = window.innerWidth <= 768;
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;
    const file = e.target[3].files[0]; // Get the attached file

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    if (file) {
      formData.append('file', file); // Append the file if it exists
    }

    emailjs.send('service_qorqqe9', 'template_mmaedd6', formData, 'R2a8WVrnM9AfD8Ayx')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      e.target.reset(); // Reset the form after successful submission
      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully.',
        position: isMobile ? 'top' : 'top-end',
        timer: 2000,
        toast: true
      });
    }, (err) => {
      console.error('FAILED...', err);
      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Message Failed!',
        text: 'There was an error sending your message. Please try again later.',
        position: isMobile ? 'top' : 'top-end',
        timer: 2000,
        toast: true
      });
    });
  };

  const skills = [
    { name: 'React', icon: FaReact },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'GraphQL', icon: SiGraphql },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
  ];

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ClipLoader color="#3B82F6" size={50} />
      </div>
    )
  }

  return (
    <>
      <SimpleBar className="scrollbar-thin scrollbar-thumb-custom scrollbar-track-gray-lighter" style={{ maxHeight: '100vh' }}>
      <div className="container mx-auto max-w-3xl px-4">
        <header className="py-2">
          <div className="relative">
            <img
              src="./images/cover.png"
              alt="Cover"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <img src="./images/photo1.jpg" alt="@developer" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mt-16 flex justify-between items-start px-4">
            <div>
              <div className="flex flex-col items-start justify-center">
                <div className="flex flex-row items-center justify-center gap-2 mt-3">
                  <h1 className="text-lg lg:text-2xl font-bold text-white">Jayson N. Reales</h1>
                  <RiVerifiedBadgeFill className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-500">@senpaiii-kun.base.eth</p>
              </div>

              <div className="flex flex-col mt-6 gap-2">
                <p className="text-gray-100 flex items-center gap-2 text-sm">
                  <IdCard className="w-4 h-4" /> Developer
                </p>
                <p className="text-gray-100 flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4" /> Albay, PH
                </p>
                <p className="text-gray-100 flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4" /> <a href="https://jayson-dev.vercel.app/" target="_blank" rel="noopener noreferrer">jayson.dev</a>
                </p>
                <p className="text-gray-100 flex items-center gap-2 text-sm">
                  <FaFacebook className="w-4 h-4" /> <a href="https://www.facebook.com/jaysonsenpai18" target="_blank" rel="noopener noreferrer">jaysonsenpai18</a>
                </p>
                <p className="text-gray-100 flex items-center gap-2 text-sm">
                  <SiFarcaster  className="w-4 h-4" /> <a href="https://warpcast.com/swenpai" target="_blank" rel="noopener noreferrer">swenpai</a>
                </p>
                <p className="text-gray-100 flex items-center gap-2 text-sm">
                  <CalendarDays className="w-4 h-4" /> Joined September 2021
                </p>
              </div>
            </div>
            <a
              href="./docs/Jayson Reales Resume.pdf"
              target="_blank"
              download="JaysonReales_Resume.pdf"
              className="py-3 px-3 lg:px-4 lg:py-2 bg-blue-500 text-sm text-white rounded-full hover:bg-blue-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Resume
            </a>
          </div>
        </header>

        <div className="mt-2">
          <div className="flex items-center justify-start border-b text-sm w-full overflow-x-auto lg:justify-start lg:gap-5">
            {["Home", "Projects", "Skills", "Services", "About", "Contact"].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`relative px-4 py-2 flex-shrink-0 ${
                  activeTab === tab.toLowerCase()
                    ? "border-b-4 border-blue-500 font-bold text-gray-200"
                    : "text-gray-600"
                } ${index >= 4 ? "lg:flex" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-2">
            {activeTab === "home" && (
              <div>
                <div className="space-y-4 px-4">
                  <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">Recent Posts</h2>
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
                      <div className="flex items-start space-x-3">
                        <img src="./images/photo1.jpg" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between space-x-2">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Jayson N. Reales</h3>
                            <span className="text-gray-500 dark:text-gray-400">1h</span>
                          </div>
                          <p className="mt-2 text-gray-900 dark:text-white text-sm text-start">{post.content}</p>
                          {post.images && post.images.length > 0 && (
                            <div className="mt-2 grid grid-cols-1 gap-2">
                              {post.images.map((image, index) => (
                                <div key={index} className="rounded-lg overflow-hidden" style={{ height: '400px' }}>
                                  <img 
                                    src={image} 
                                    alt={`Post image ${index + 1}`} 
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-3 text-gray-500 dark:text-gray-400">
                            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                              <Repeat2 className="w-5 h-5" />
                              <span>{post.reposts}</span>
                            </button>
                            <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                              <Heart className="w-5 h-5" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4-2.47a3.027 3.027 0 000-.74l4-2.47C13.456 7.68 14.19 8 15 8z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "projects" && (
              <div className="px-4">
                <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">Projects</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                  {currentProjects.map((project) => (
                    <div 
                      key={project.id} 
                      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 mb-6 break-inside-avoid ${
                        project.size === 'sm' ? 'h-96' :
                        project.size === 'md' ? 'h-112' :
                        'h-128'
                      }`}
                    >
                      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                      <div className="p-4 h-full flex flex-col">
                        <h3 className="text-sm lg:text-lg font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 border border-gray-300 text-sm font-medium ${
                          currentPage === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(projects.length / projectsPerPage)}
                      className="px-3 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            )}
            {activeTab === "skills" && (
              <div className="px-4">
                <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">Skills</h2>
               
                {/* Marquee section */}
                <div className="relative overflow-hidden mb-8">
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                  <Marquee gradient={false} speed={40}>
                    <div className="flex items-center py-2 gap-4 px-4">
                      {skills.map((skill) => (
                        <div key={skill.name} className="flex items-center bg-blue-500 text-white px-2 py-2 text-sm lg:px-4 lg:py-2 rounded-full lg:text-sm">
                          <skill.icon className="w-5 h-5 mr-2" />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </Marquee>
                </div>

                {/* Skill categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-white text-lg font-semibold mb-4">Frontend Development</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        React.js & React Native
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Vue.js
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        HTML5, CSS3, JavaScript (ES6+)
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Responsive Web Design
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-white text-lg font-semibold mb-4">Backend Development</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Node.js & Express.js
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Python & Django
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        RESTful API Design
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Database Management (SQL & NoSQL)
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Skill progress bars */}
                <div className="mt-8">
                  <h3 className="text-white text-lg font-semibold mb-4">Proficiency</h3>
                  <div className="space-y-4">
                    {[
                      { skill: "JavaScript", proficiency: 90 },
                      { skill: "React", proficiency: 85 },
                      { skill: "Node.js", proficiency: 80 },
                      { skill: "Python", proficiency: 75 },
                      { skill: "GraphQL", proficiency: 70 },
                    ].map((item) => (
                      <div key={item.skill}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-white">{item.skill}</span>
                          <span className="text-sm font-medium text-white">{item.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${item.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-8">
                  <h3 className="text-white text-lg font-semibold mb-4">Certifications</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-300 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      AWS Certified Developer - Associate
                    </li>
                    <li className="text-gray-300 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      Google Cloud Certified - Professional Cloud Developer
                    </li>
                    <li className="text-gray-300 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-500" />
                      MongoDB Certified Developer Associate
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "services" && (
              <div className="px-4">
                <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">Services</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Code className="w-8 h-8 text-blue-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Web Development</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Custom web applications built with modern frameworks like React, Vue.js, and Angular. Responsive design and seamless user experiences.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Server className="w-8 h-8 text-green-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Backend Development</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Robust server-side solutions using Node.js, Express, and Python. API development, database design, and server management.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Smartphone className="w-8 h-8 text-purple-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Mobile App Development</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Cross-platform mobile applications using React Native. Native-like performance with code reusability for iOS and Android.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Palette className="w-8 h-8 text-yellow-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">UI/UX Design</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Intuitive and visually appealing interfaces. User-centered design approach with a focus on usability and accessibility.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Database className="w-8 h-8 text-red-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Database Design</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Efficient database architectures for SQL and NoSQL systems. Data modeling, optimization, and migration services.
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <Cloud className="w-8 h-8 text-indigo-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cloud Solutions</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Deployment and management of applications on cloud platforms like AWS, Google Cloud, and Azure. Scalable and cost-effective solutions.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Why Choose My Services?</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                    <li>Tailored solutions to meet your specific business needs</li>
                    <li>Expertise in the latest technologies and best practices</li>
                    <li>Commitment to delivering high-quality, scalable, and maintainable code</li>
                    <li>Clear communication and collaborative approach throughout the project</li>
                    <li>Ongoing support and maintenance after project completion</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "about" && (
              <div className="px-4">
                <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">About</h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                  <p className="text-gray-700 dark:text-gray-300 text-justify text-sm">
                    Hi there! I'm Jayson, a passionate developer from Albay, PH. I love creating web applications and exploring new technologies. When I'm not coding, you can find me playing with my cats or trying out new coffee shops. Let's connect and build something awesome together!
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">Updated portfolio website</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <Repeat2 className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">Contributed to open-source project</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">1 week ago</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "contact" && (
              <div className="px-4">
                <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">Contact</h2>
                <form className="space-y-4" onSubmit={handlePostSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  ></textarea>

                  {/* File Upload Section */}
                  <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const fileName = e.target.files[0]?.name;
                          if (fileName) {
                            setFileName(fileName); // Assuming you have a state to hold the file name
                          }
                        }}
                      />
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        Choose File
                      </span>
                      
                      <span className="ml-2 text-white">Upload a file</span>
                    </label>
                    {fileName && (
                      <span className="text-gray-600">{fileName}</span> // Display the selected file name
                    )}
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <footer className="bg-gray-800 text-white py-2 mt-6">
          <div className="flex flex-col gap-1 container mx-auto text-center">
            <p className="text-sm">© {new Date().getFullYear()} Jayson N. Reales.</p>
            <p className="text-sm"> All rights reserved.</p>
          </div>
        </footer>
      </div>
    </SimpleBar>
    </>
  )
}