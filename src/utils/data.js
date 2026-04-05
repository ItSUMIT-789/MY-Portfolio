export const portfolioData = {
  name: "Sumit Shidole",
  title: "Software Developer",
  tagline: "Building intelligent systems at the intersection of vision & code",
  bio: "Computer Engineering student (B.E. 2028) with a passion for real-time computer vision and machine learning. I build end-to-end ML systems that solve real problems — from gesture recognition to intelligent applications.",
  location: "Chembur, Mumbai 400017",
  email: "sumit.shidole@gmail.com",
  phone: "+91 9326226479",
  linkedin: "linkedin.com/in/sumit-shidole",
  github: "github.com/ItSUMIT-789",

  skills: [
    { name: "Python", category: "Programming", level: 92 },
    { name: "Java", category: "Programming", level: 78 },
    { name: "C++", category: "Programming", level: 70 },
    { name: "TensorFlow", category: "ML", level: 82 },
    { name: "MediaPipe", category: "ML", level: 88 },
    { name: "OpenCV", category: "Vision", level: 90 },
    { name: "Flask", category: "Backend", level: 80 },
    { name: "HTML/CSS/JS", category: "Web", level: 75 },
    { name: "Git & GitHub", category: "Tools", level: 85 },
    { name: "DSA", category: "CS", level: 78 },
  ],

  projects: [
    {
      id: 1,
      name: "Sign Language Translator",
      shortDesc: "Real-time hand gesture to text translation",
      description: "Developed a real-time hand gesture recognition system that translates sign language to text. Built a low-latency prediction pipeline for live webcam input with a Flask web interface that dynamically displays recognized characters and sentences.",
      tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow", "Flask"],
      color: "#00d4ff",
      planetColor: "#1a6fa8",
      highlights: [
        "Real-time gesture recognition at 30fps",
        "Low-latency prediction pipeline",
        "Dynamic Flask web interface",
        "End-to-end ML system"
      ]
    },
    {
      id: 2,
      name: "PaintVision App",
      shortDesc: "Hand-gesture virtual painting system",
      description: "A virtual painting application that uses computer vision to track finger movements and create digital art in real time. No physical input device required — just your hand in front of a webcam.",
      tech: ["Python", "OpenCV"],
      color: "#ff2d8d",
      planetColor: "#7b1a5a",
      highlights: [
        "Real-time finger tracking",
        "Multi-color brush support",
        "Zero-latency drawing",
        "Gesture-based tool switching"
      ]
    }
  ],

  experience: [
    {
      role: "Python Intern",
      company: "Live Coder",
      period: "Jun 2024 – Jul 2024",
      description: "Improved application workflow efficiency. Collaborated with the engineering team to implement new features and resolve production bugs.",
      type: "internship"
    }
  ],

  education: [
    {
      degree: "B.Tech Computer Engineering",
      institution: "Vidyalankar Institute of Technology, Mumbai",
      period: "2025 – 2028",
      type: "current"
    },
    {
      degree: "Diploma Computer Engineering",
      institution: "Shivajirao S. Jhondhle Polytechnic",
      period: "2022 – 2025",
      aggregate: "90.46%",
      type: "completed"
    }
  ],

  certifications: [
    { name: "Python Internship", issuer: "Live Coder" },
    { name: "CSS Course", issuer: "Infosys" },
    { name: "Introduction to Generative AI", issuer: "Google" }
  ],

  languages: ["English", "Hindi", "Marathi"]
}
