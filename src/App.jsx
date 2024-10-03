import { useState, useEffect } from "react"
import { CalendarDays, Link as LinkIcon, MapPin, MessageCircle, Repeat2, Heart, IdCard } from "lucide-react"
import { RiVerifiedBadgeFill } from "react-icons/ri";
import axios from "axios"
import Marquee from 'react-fast-marquee';
import { FaReact, FaNodeJs, FaFacebook  } from 'react-icons/fa';
import { SiJavascript, SiGraphql, SiTailwindcss, SiFarcaster  } from 'react-icons/si';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function DevPortfolio() {
  const [activeTab, setActiveTab] = useState("home")
  const [posts, setPosts] = useState([
    /* { id: 1, content: "Just launched a new React project! Check it out: https://example.com", likes: 15, comments: 3, reposts: 5 },
    { id: 2, content: "Excited to start learning Rust this week. Any recommended resources?", likes: 10, comments: 7, reposts: 2 }, */
    { 
      id: 3, 
      content: "I started playing Cat Town - Welcome to Cat Town, an idle game built on Base, driven by a self-sustainable, fair economy. Purchase cats and combine floofs to increase your ETH yield and $KIBBLE rewards.",
      likes: 15,
      comments: 3,
      reposts: 5,
      /* images: ["./images/cat-town.jpg"] */
    },
    {
      id: 4,
      content: "Just started using Farcaster - A protocol for building sufficiently decentralized social networks.",
      likes: 10,
      comments: 8,
      reposts: 2,
      /* images: ["./images/farcast.jpg", "./images/farcast-notif.jpg"] */
    }
  ])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const handlePostSubmit = (e) => {
    e.preventDefault()
    const content = e.target.post.value
    setPosts([{ id: posts.length + 1, content, likes: 0, comments: 0, reposts: 0 }, ...posts])
    e.target.reset()
  }

  const skills = [
    { name: 'React', icon: FaReact },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'GraphQL', icon: SiGraphql },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
  ];

  return (
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
              <div className="flex flex-col gap-2 items-start justify-center">
                <div className="flex flex-row items-center justify-center gap-2">
                  <h1 className="text-2xl font-bold text-white">Jayson N. Reales</h1>
                  <RiVerifiedBadgeFill className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-gray-500">@senpaiii-kun.base.eth</p>
              </div>

              <div className="flex flex-col gap-1 mt-6">
                <p className="text-gray-100 flex items-center gap-2">
                  <IdCard className="w-4 h-4" /> Developer | Cat Town Resident
                </p>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <p className="mt-2 text-gray-100 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Albay, PH
                </p>
                <p className="text-gray-100 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> johndoe.dev
                </p>
                <p className="text-gray-100 flex items-center gap-2">
                  <FaFacebook className="w-4 h-4" /> <a href="https://www.facebook.com/jaysonsenpai18" target="_blank" rel="noopener noreferrer">@jaysonsenpai18</a>
                </p>
                <p className="text-gray-100 flex items-center gap-2">
                  <SiFarcaster  className="w-4 h-4" /> <a href="https://warpcast.com/swenpai" target="_blank" rel="noopener noreferrer">@swenpai</a>
                </p>
                <p className="text-gray-100 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Joined September 2021
                </p>
              </div>
            </div>
            <a
              href="./docs/Jayson Reales Resume.pdf"
              target="_blank"
              download="JaysonReales_Resume.pdf"
              className="px-4 py-2 bg-blue-500 -mt-12 mr-4 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Resume/CV
            </a>
          </div>
        </header>

        <div className="mt-2">
          <div className="flex items-center justify-between border-b lg:border-b lg:justify-start">
            {["Home", "Projects", "Skills", "About", "Contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 ${
                  activeTab === tab.toLowerCase()
                    ? "border-b-4 border-blue-500 font-bold text-gray-200"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-2">
            {activeTab === "home" && (
              <div>
                <div className="space-y-4 px-4">
                  <h2 className="text-white text-2xl font-bold mb-6 mt-6">Recent Posts</h2>
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <div className="flex items-start space-x-3">
                        <img src="./images/photo1.jpg" alt="User Avatar" className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-gray-900 dark:text-white">Jayson N. Reales</h3>
                            <span className="text-gray-500 dark:text-gray-400">@senpaiii-kun.base.eth</span>
                            <span className="text-gray-500 dark:text-gray-400">· 1h</span>
                          </div>
                          <p className="mt-1 text-gray-900 dark:text-white">{post.content}</p>
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
                <h2 className="text-white text-2xl font-bold mb-6 mt-6">Projects</h2>
                {loading ? (
                  <p className="text-white">Loading projects...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description || "No description available"}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                {tech}
                              </span>
                            ))}
                            {project.language && (
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                {project.language}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-600 dark:text-gray-400">⭐ {project.stars}</span>
                              <span className="text-gray-600 dark:text-gray-400">🍴 {project.forks}</span>
                            </div>
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "skills" && (
              <div className="px-4">
                <h2 className="text-white text-2xl font-bold mb-6 mt-6">Skills</h2>
                <div className="relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                  <Marquee gradient={false} speed={40}>
                    <div className="flex items-center py-2 gap-4 px-4">
                      {skills.map((skill) => (
                        <div key={skill.name} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
                          <skill.icon className="w-5 h-5 mr-2" />
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </Marquee>
                </div>
              </div>
            )}
            {activeTab === "about" && (
              <div className="px-4">
                <h2 className="text-white text-2xl font-bold mb-6 mt-6">About</h2>
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <p className="text-gray-700 text-justify">
                    👋 Hi there! I'm Jayson, a passionate developer from Albay, PH. I love creating web applications and exploring new technologies. When I'm not coding, you can find me playing with my cats or trying out new coffee shops. Let's connect and build something awesome together!
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <LinkIcon className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Updated portfolio website</p>
                        <p className="text-sm text-gray-500">2 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Repeat2 className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Contributed to open-source project</p>
                        <p className="text-sm text-gray-500">1 week ago</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "contact" && (
              <div className="px-4">
                <h2 className="text-white text-2xl font-bold mb-6 mt-6">Contact</h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  ></textarea>
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
      </div>
    </SimpleBar>
  )
}