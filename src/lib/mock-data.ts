export interface Course {
  id: string;
  title: string;
  code: string;
  credits: number;
  description: string;
  prerequisites: string[];
  semester: number;
}

export interface DegreeProgram {
  name: string;
  courses: Course[];
}

export const computerScienceProgram: DegreeProgram = {
  name: "Bachelor of Science in Computer Science",
  courses: [
    {
      id: "cs101",
      title: "Introduction to Programming",
      code: "CS 101",
      credits: 3,
      description: "Fundamental concepts of programming using Python. Covers variables, control structures, functions, and basic data structures.",
      prerequisites: [],
      semester: 1,
    },
    {
      id: "math101",
      title: "Calculus I",
      code: "MATH 101",
      credits: 4,
      description: "Introduction to differential calculus. Limits, continuity, derivatives, and applications of derivatives.",
      prerequisites: [],
      semester: 1,
    },
    {
      id: "cs102",
      title: "Data Structures",
      code: "CS 102",
      credits: 3,
      description: "Study of fundamental data structures including lists, stacks, queues, trees, and graphs.",
      prerequisites: ["cs101"],
      semester: 2,
    },
    {
      id: "math102",
      title: "Discrete Mathematics",
      code: "MATH 102",
      credits: 3,
      description: "Covers logic, set theory, functions, relations, combinatorics, and graph theory.",
      prerequisites: [],
      semester: 2,
    },
    {
      id: "cs201",
      title: "Algorithms",
      code: "CS 201",
      credits: 3,
      description: "Design and analysis of algorithms. Topics include sorting, searching, graph algorithms, and complexity theory.",
      prerequisites: ["cs102", "math102"],
      semester: 3,
    },
    {
      id: "cs202",
      title: "Computer Architecture",
      code: "CS 202",
      credits: 3,
      description: "Structure and function of computer systems. Topics include digital logic, processor design, memory hierarchy, and I/O systems.",
      prerequisites: ["cs102"],
      semester: 3,
    },
    {
      id: "cs203",
      title: "Operating Systems",
      code: "CS 203",
      credits: 3,
      description: "Principles of operating systems, including process management, memory management, file systems, and concurrency.",
      prerequisites: ["cs201", "cs202"],
      semester: 4,
    },
    {
      id: "cs204",
      title: "Software Engineering",
      code: "CS 204",
      credits: 3,
      description: "Introduction to software development lifecycle models, requirements engineering, design, testing, and project management.",
      prerequisites: ["cs201"],
      semester: 4,
    },
    {
      id: "cs301",
      title: "Database Systems",
      code: "CS 301",
      credits: 3,
      description: "Concepts and design of database systems. SQL, relational algebra, database design, and transaction management.",
      prerequisites: ["cs201"],
      semester: 5,
    },
    {
      id: "cs302",
      title: "Computer Networks",
      code: "CS 302",
      credits: 3,
      description: "Study of computer network architectures, protocols, and applications. OSI model, TCP/IP, routing, and network security.",
      prerequisites: ["cs203"],
      semester: 6,
    },
  ],
};
