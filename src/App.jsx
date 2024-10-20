import { useState, useEffect } from "react"
import { Link } from  "react-router-dom"
import { MessageCircle, Repeat2, Heart, CheckCircle, Award } from "lucide-react"
import axios from "axios"
import Marquee from 'react-fast-marquee';
import { FaReact, FaNodeJs  } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiPython, SiHtml5, SiCss3, SiBootstrap, SiPhp, SiMysql, SiExpress, SiCanva,SiAdobephotoshop,SiGoogle } from 'react-icons/si';
import { ClimbingBoxLoader } from "react-spinners";
import { Code, Server, Smartphone, Palette, Database, Cloud } from 'lucide-react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Header from './Components/Header';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { X } from 'lucide-react';

export default function DevPortfolio() {
  const [activeTab, setActiveTab] = useState("home")
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [toolCategories, setToolCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1)
  const [projectsPerPage, setProjectsPerPage] = useState(5)
  const [fileName, setFileName] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [activeToolCategory, setActiveToolCategory] = useState("Development");
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to format the creation time
  const formatCreationTime = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks}w ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months}mo ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years}y ago`;
    }
  };

  // Sort the posts in descending order
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, projectsResponse, categoriesResponse] = await Promise.all([
          axios.get('https://portfolio-api-murex-psi.vercel.app/api/v1/posts'),
          axios.get('https://portfolio-api-murex-psi.vercel.app/api/v1/projects'),
          axios.get('https://portfolio-api-murex-psi.vercel.app/api/v1/categories')
        ]);

        setPosts(postsResponse.data);
        setProjects(projectsResponse.data);
        
        // Process the categories data
        const categoriesData = categoriesResponse.data[0];
        delete categoriesData._id;
        delete categoriesData.tools;
        setToolCategories(categoriesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setProjectsPerPage(window.innerWidth >= 1024 ? 6 : 5)
      setCurrentPage(1); // Reset to first page on resize
    }

    window.addEventListener('resize', handleResize)
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = window.innerWidth <= 768;
  
  const handlePostSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    emailjs.send('service_qorqqe9', 'template_mmaedd6', templateParams, 'R2a8WVrnM9AfD8Ayx')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        form.reset(); // Reset the form after successful submission
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
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'React Native', icon: FaReact, color: '#61DAFB' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', icon: SiCss3, color: '#1572B6' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
    { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { name: 'Express', icon: SiExpress, color: '#F7DF1E' }, // Changed to match JavaScript's color
    { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
    { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
    { name: 'Google Workspace', icon: SiGoogle, color: '#4285F4' },
  ];

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleNextImage = (postId, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setCurrentImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % posts.find(post => post.id === postId).images.length
    }));
  };

  const handlePrevImage = (postId, e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setCurrentImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + posts.find(post => post.id === postId).images.length) % posts.find(post => post.id === postId).images.length
    }));
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ClimbingBoxLoader color="#3B82F6" loading={loading} />
      </div>
    )
  }

  return (
    <>
      <SimpleBar className="scrollbar-thin scrollbar-thumb-custom scrollbar-track-gray-lighter" style={{ maxHeight: '100vh' }}>
        <div className="container mx-auto max-w-3xl px-4">
          <Header />
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
                    {loading ? (
                      <p className="text-white">Loading posts...</p>
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      posts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
                          <div className="flex items-start space-x-3">
                            <img src="./images/photo1.jpg" alt="User Avatar" className="w-12 h-12 rounded-full pointer-events-none" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between space-x-2">
                                <h3 className="font-bold text-gray-900 dark:text-white lg:text-lg sm:text-sm">Jayson N. Reales</h3>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">{formatCreationTime(post.createdAt)}</span>
                              </div>
                              <p className="mt-2 text-gray-900 dark:text-white text-sm text-start">{post.content}</p>
                              {post.images && post.images.length > 0 && (
                                <div className="mt-2 relative">
                                  <img 
                                    src={`/images/${post.images[currentImageIndex[post.id] || 0]}`} 
                                    alt={`Post image ${(currentImageIndex[post.id] || 0) + 1}`} 
                                    className="w-full h-auto object-cover pointer-events-none rounded-lg cursor-pointer"
                                    onClick={() => openModal(post.images[currentImageIndex[post.id] || 0])}
                                  />
                                  {post.images.length > 1 && (
                                    <div className="absolute inset-0 flex items-center justify-between">
                                      <button 
                                        onClick={(e) => handlePrevImage(post.id, e)}
                                        className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                                      >
                                        <ChevronLeft className="w-6 h-6" />
                                      </button>
                                      <button 
                                        onClick={(e) => handleNextImage(post.id, e)}
                                        className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                                      >
                                        <ChevronRight className="w-6 h-6" />
                                      </button>
                                    </div>
                                  )}
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
                      ))
                    )}
                  </div>
                </div>
              )}
              {activeTab === "projects" && (
                <div className="px-4">
                  <h2 className="text-white text-lg lg:text-2xl font-bold mb-6 mt-6">Projects</h2>
                  {loading ? (
                    <p className="text-white">Loading projects...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentProjects.map((project) => (
                        <div 
                          key={project.id} 
                          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col`}
                        >
                          <div className="relative pb-[56.25%]">
                            <img 
                              src={`/images${project.image}`}
                              alt={project.title} 
                              className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-sm lg:text-lg font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-auto mb-2">
                              {project.technologies.map((tech) => (
                                <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center mt-2 text-sm text-white"
                              >
                                Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
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
                          <div 
                            key={skill.name} 
                            className={`flex items-center px-3 py-2 rounded-full text-sm lg:text-base transition-all duration-300 ease-in-out`}
                            style={{
                              backgroundColor: `${skill.color}22`,
                              boxShadow: `0 0 5px ${skill.color}`,
                              border: `2px solid ${skill.color}`,
                              color: skill.color
                            }}
                          >
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
                          React.js
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
                          Python & PHP
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

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Design & UI/UX</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Adobe Photoshop
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Figma
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                         Canva
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Database Management</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          SQL (MySQL)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          NoSQL (MongoDB, Firebase)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Database Design & Optimization
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Collaboration & Version Control</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Git & GitHub
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Code Review & Pair Programming
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">API Development & Integration</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          RESTful API Design
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Microservices Architecture
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Third-party API Integration
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Productivity & Office Tools</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Google Workspace (Docs, Sheets, Slides, Drive)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Microsoft Office Suite (Word, Excel, PowerPoint)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Project management tools (Trello, Asana)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Time management and productivity apps
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Soft Skills & Communication</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Effective written and verbal communication
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Team leadership and collaboration
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Problem-solving and critical thinking
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Time management and organization
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Blockchain & Cryptocurrency</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Smart contract development (Solidity)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Web3.js and Ethereum development
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Cryptocurrency trading and analysis
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-white text-lg font-semibold mb-4">Continuous Learning</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Staying updated with latest tech trends
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Online course completion (Udemy, Coursera)
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Participation in coding challenges
                        </li>
                        <li className="text-gray-300 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Attending tech conferences and workshops
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Tools I Used */}
                  <div className="mt-8">
                    <h3 className="text-white text-lg font-semibold mb-4">Tools I Used</h3>
                    <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                      {Object.keys(toolCategories).map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveToolCategory(category)}
                          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                            activeToolCategory === category
                              ? "bg-blue-600 text-white"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto max-h-96">
                      {toolCategories[activeToolCategory] && toolCategories[activeToolCategory].map((item) => (
                        <div key={item.tool} className="bg-gray-700 rounded-lg p-4 flex items-center space-x-3">
                          <img src={item.icon} alt={item.tool} className="w-8 h-8" />
                          <span className="text-sm font-medium text-white">{item.tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-8">
                    <h3 className="text-white text-lg font-semibold mb-4">Certifications</h3>
                    <ul className="space-y-2">
                      <li className="text-gray-300 flex items-center">
                          <a href="https://bit.ly/ojt-certificate" className="flex flex-row">
                            <Award className="w-4 h-4 mr-2 text-yellow-500" />
                            UI/UX Certificate
                          </a>
                      </li>
                        <li className="text-gray-300 flex items-center">
                          <a href="https://bit.ly/dict-certificate" className="flex flex-row">
                            <Award className="w-4 h-4 mr-2 text-yellow-500" />
                            Image Identification Using Convolutional Neural Network
                          </a>
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <a href="https://bit.ly/zuit-certificate" className="flex flex-row">
                          <Award className="w-4 h-4 mr-2 text-yellow-500" />
                          Soft Skills for Software Developers
                        </a>
                      </li>
                      <li className="text-gray-300 flex items-center">
                        <a href="https://bit.ly/upskills-certificate" className="flex flex-row">
                          <Award className="w-4 h-4 mr-2 text-yellow-500" />
                          Ethical Hacking Webinar    
                        </a>
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
                        Custom web applications built with modern framework like React. Responsive design and seamless user experiences.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <Server className="w-8 h-8 text-green-500 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Backend Development</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Robust server-side solutions using PHP, Node.js, Express, and Python. API development, database design, and server management.
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
                      Hello! I'm <b className="text-blue-500">Jayson</b>, a passionate developer hailing from the beautiful province of Albay, Philippines. I thrive on crafting dynamic web applications and continuously exploring the latest technologies that push the boundaries of innovation.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-justify text-sm mt-3">
                      When I'm not immersed in code, you can find me enjoying quality time with my pets or grinding through cryptocurrency airdrops. I'm also dedicated to expanding my knowledge in cryptocurrency trading and keeping up with emerging tech trends. On days when I need to recharge, I pick up my guitar to strum away the stress and find inspiration in music.
                    </p>

                    <p className="text-gray-700 dark:text-gray-300 text-justify text-sm mt-3">
                      I love stepping outside my comfort zone, whether it's taking a leisurely walk to clear my mind or embarking on new adventures. I'm always eager to explore fresh ideas and collaborate with others who share a similar passion for creativity and technology.
                    </p>
                          
                    <p className="text-gray-700 dark:text-gray-300 text-justify text-sm mt-3">
                      Let's connect and build something extraordinary together!📧
                    </p>
                    <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Work Experience</h3>
                    
                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 border border-white dark:border-gray-900 animate-pulse"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">August 2024 - present</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">IT Instructor</h3>
                        <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">Computer Arts & Technological College, Inc.</p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 border border-white dark:border-gray-900 animate-pulse"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">October 2022 - August 2024</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Web Developer</h3>
                        <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">Computer Arts & Technological College, Inc.</p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 border border-white dark:border-gray-900 animate-pulse"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2021 - January 2022</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">UI/UX Designer - Intern</h3>
                        <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">Pixel 8 Academy</p>
                      </li>
                      <li className="mb-6 ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 border border-white dark:border-gray-900 animate-pulse"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">November 2019 - Janauary 2020</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Waitress</h3>
                        <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">BlueLight Bar</p>
                      </li>
                      <li className="ml-4">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 border border-white dark:border-gray-900 animate-pulse"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 2016 - September 2018</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Representative</h3>
                        <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">Bitis Shoe Legazpi</p>
                      </li>
                    </ol>
                  </div>
                </div>
              )}
              {activeTab === "contact" && (
                <div className="px-4 shadow-lg">
                  <h2 className="text-white text-2xl font-bold mb-6 mt-6">Get in Touch</h2>

                      <form className="space-y-6" onSubmit={handlePostSubmit}>
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Your Email</label>
                          <input
                            type="email"
                            id="email"
                            placeholder="example@example.com"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                          <textarea
                            id="message"
                            placeholder="Write your message here..."
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                          >
                            Send Message
                          </button>
                        </div>
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
        
        {/* Modal moved inside SimpleBar */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative max-w-3xl max-h-[90vh] overflow-auto">
              <img src={modalImage} alt="Enlarged post image" className="max-w-full h-auto" />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </SimpleBar>
    </>
  );
}
