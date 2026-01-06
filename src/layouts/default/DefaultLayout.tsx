import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import "./DefaultLayout.css";
import { usePortfolioData } from "../../services/portfolioData";

const DefaultLayout = () => {
  const { data, isLoading, error } = usePortfolioData();
  const [activeSection, setActiveSection] = useState("about");
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const sections = scrollContainer.querySelectorAll("section[id]");
      const scrollTop = scrollContainer.scrollTop;

      sections.forEach((section) => {
        const offsetTop = (section as HTMLElement).offsetTop - 100;
        const height = (section as HTMLElement).offsetHeight;

        if (scrollTop >= offsetTop && scrollTop < offsetTop + height) {
          setActiveSection((section as HTMLElement).id);
        }
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && scrollContainerRef.current) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="portfolio-container">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="portfolio-container">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500">Failed to load data</p>
        </div>
      </div>
    );
  }

  const { profile, experiences, projects, blog } = data;

  return (
    <div className="portfolio-container">
      {/* Left Sidebar - Static */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className={`profile-section ${isLoaded ? "loaded" : ""}`}>
            {/* Profile Picture */}
            <div className="profile-picture">
              <div className="profile-image">
                <div className="profile-placeholder">
                  <span>{profile.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="profile-info">
              <h1 className="name">{profile.name}</h1>
              <p className="title">{profile.title}</p>
              <div className="location">
                <MapPin className="location-icon" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            {[
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "blog", label: "Blog" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-item ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="social-links">
            <a
              href={profile.socials.github}
              className="social-link"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="social-icon" />
            </a>
            <a
              href={profile.socials.linkedin}
              className="social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="social-icon" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-link"
              aria-label="Email"
            >
              <Mail className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Content - Scrollable */}
      <div className="content" ref={scrollContainerRef}>
        {/* About Section */}
        <section id="about" className="section">
          <div className="section-content">
            <h2 className="section-title">About Me</h2>

            <div className="about-content">
              {profile.about.map((paragraph, index) => (
                <p key={index} className="about-text">
                  {paragraph}
                </p>
              ))}

              {profile.resumeUrl && (
                <button className="resume-button">
                  <a
                    href={profile.resumeUrl}
                    download
                    className="resume-link"
                  >
                    <Download className="resume-icon" />
                    <span>Download Resume</span>
                  </a>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <div className="section-content">
            <h2 className="section-title">Experience</h2>

            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="experience-header">
                      <h3 className="experience-role">{exp.role}</h3>
                      <div className="experience-company">{exp.company}</div>
                      <div className="experience-period">{exp.period}</div>
                    </div>

                    <p className="experience-description">{exp.description}</p>

                    <div className="technologies">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="technology-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="section-content">
            <h2 className="section-title">Some Things I've Built</h2>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-header">
                    <div className="project-year">{project.year}</div>
                    <div className="project-links">
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          className="project-link"
                          aria-label="Live Demo"
                        >
                          <ArrowUpRight className="link-icon" />
                        </a>
                      )}
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          className="project-link"
                          aria-label="GitHub"
                        >
                          <Github className="link-icon" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="section">
          <div className="section-content">
            <h2 className="section-title">Latest Blog Posts</h2>

            <div className="blog-posts">
              {blog.map((post, index) => (
                <article key={index} className="blog-post">
                  <div className="post-meta">
                    <time className="post-date">{post.date}</time>
                    <span className="post-separator">•</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>

                  <h3 className="post-title">
                    <a href={post.url} className="post-link">
                      {post.title}
                      <ArrowUpRight className="post-arrow" />
                    </a>
                  </h3>

                  <p className="post-excerpt">{post.excerpt}</p>

                  <div className="post-tags">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="blog-footer">
              <a
                href="#"
                className="view-all-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View all posts
                <ArrowUpRight className="view-all-arrow" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DefaultLayout;
