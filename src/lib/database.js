// Initial demo data
const initialUsers = [
  {
    id: '1',
    email: 'empleado@demo.com',
    password: 'demo123',
    name: 'Juan Pérez',
    role: 'employee',
    avatar: null,
  },
  {
    id: '2',
    email: 'jefe@demo.com',
    password: 'demo123',
    name: 'María García',
    role: 'boss',
    avatar: null,
  },
];

// Categories for ideas
export const IDEA_CATEGORIES = [
  { id: 'comunicacion', label: 'Comunicación', color: 'blue' },
  { id: 'productividad', label: 'Productividad', color: 'green' },
  { id: 'bienestar', label: 'Bienestar', color: 'purple' },
  { id: 'tecnologia', label: 'Tecnología', color: 'indigo' },
  { id: 'procesos', label: 'Procesos', color: 'orange' },
  { id: 'cultura', label: 'Cultura', color: 'pink' },
  { id: 'otro', label: 'Otro', color: 'gray' },
];

// Evaluation criteria
export const EVALUATION_CRITERIA = [
  { id: 'creatividad', label: 'Creatividad', description: 'Originalidad y novedad de la idea' },
  { id: 'viabilidad', label: 'Viabilidad', description: 'Factibilidad de implementación' },
  { id: 'impacto', label: 'Impacto', description: 'Beneficio potencial para la empresa' },
  { id: 'costoTiempo', label: 'Costo/Tiempo', description: 'Relación costo-beneficio y tiempo de implementación' },
  { id: 'innovacion', label: 'Innovación', description: 'Nivel de innovación y diferenciación' },
];

const initialIdeas = [
  {
    id: '1',
    userId: '1',
    userName: 'Juan Pérez',
    title: 'Mejorar el sistema de comunicación',
    content: 'Propongo implementar un chat interno para mejorar la comunicación entre departamentos. Esto facilitaría la colaboración y reduciría los tiempos de respuesta.',
    category: 'comunicacion',
    isAnonymous: false,
    likes: ['2'],
    comments: [
      {
        id: '1',
        userId: '2',
        userName: 'María García',
        content: '¡Excelente idea! Lo consideraremos para el próximo trimestre.',
        createdAt: '2026-01-30T10:00:00Z',
      },
    ],
    createdAt: '2026-01-29T09:00:00Z',
    status: 'pending',
    evaluation: null,
  },
  {
    id: '2',
    userId: '1',
    userName: 'Juan Pérez',
    title: 'Horarios flexibles',
    content: 'Sería beneficioso implementar horarios flexibles para mejorar el balance vida-trabajo. Muchos empleados podrían ser más productivos con esta flexibilidad.',
    category: 'bienestar',
    isAnonymous: false,
    likes: [],
    comments: [],
    createdAt: '2026-01-28T14:00:00Z',
    status: 'approved',
    evaluation: {
      evaluatorId: '2',
      evaluatorName: 'María García',
      ratings: {
        creatividad: 4,
        viabilidad: 5,
        impacto: 5,
        costoTiempo: 4,
        innovacion: 3,
      },
      comment: '¡Gran propuesta! El horario flexible puede aumentar significativamente la productividad y satisfacción del equipo. Implementaremos un piloto el próximo mes.',
      evaluatedAt: '2026-01-29T10:00:00Z',
    },
  },
  {
    id: '3',
    userId: '1',
    userName: 'Juan Pérez',
    title: 'Área de descanso mejorada',
    content: 'Propongo crear un espacio de descanso más cómodo con sillones, plantas y una máquina de café de calidad.',
    category: 'bienestar',
    isAnonymous: true,
    likes: ['2'],
    comments: [],
    createdAt: '2026-01-27T11:00:00Z',
    status: 'pending',
    evaluation: null,
  },
];

const initialFeedback = [
  {
    id: '1',
    userId: '1',
    userName: 'Juan Pérez',
    content: 'El ambiente laboral ha mejorado mucho este mes. Se siente más colaborativo.',
    rating: 5,
    createdAt: '2026-01-27T11:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    userName: 'Juan Pérez',
    content: 'Me gustaría más transparencia en las decisiones de la empresa.',
    rating: 3,
    createdAt: '2026-01-25T09:00:00Z',
  },
];

// Database helper functions
export const db = {
  // Initialize database
  init: () => {
    if (!localStorage.getItem('temio_users')) {
      localStorage.setItem('temio_users', JSON.stringify(initialUsers));
    }
    if (!localStorage.getItem('temio_ideas')) {
      localStorage.setItem('temio_ideas', JSON.stringify(initialIdeas));
    }
    if (!localStorage.getItem('temio_feedback')) {
      localStorage.setItem('temio_feedback', JSON.stringify(initialFeedback));
    }
  },

  // Reset database to initial state
  reset: () => {
    localStorage.setItem('temio_users', JSON.stringify(initialUsers));
    localStorage.setItem('temio_ideas', JSON.stringify(initialIdeas));
    localStorage.setItem('temio_feedback', JSON.stringify(initialFeedback));
    localStorage.removeItem('temio_current_user');
  },

  // Users
  getUsers: () => {
    return JSON.parse(localStorage.getItem('temio_users') || '[]');
  },

  getUserByEmail: (email) => {
    const users = db.getUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  getUserById: (id) => {
    const users = db.getUsers();
    return users.find((u) => u.id === id);
  },

  // Ideas
  getIdeas: () => {
    return JSON.parse(localStorage.getItem('temio_ideas') || '[]');
  },

  addIdea: (idea) => {
    const ideas = db.getIdeas();
    const newIdea = {
      ...idea,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: [],
      comments: [],
      status: 'pending',
      evaluation: null,
    };
    ideas.unshift(newIdea);
    localStorage.setItem('temio_ideas', JSON.stringify(ideas));
    return newIdea;
  },

  toggleLike: (ideaId, userId) => {
    const ideas = db.getIdeas();
    const idea = ideas.find((i) => i.id === ideaId);
    if (idea) {
      const likeIndex = idea.likes.indexOf(userId);
      if (likeIndex > -1) {
        idea.likes.splice(likeIndex, 1);
      } else {
        idea.likes.push(userId);
      }
      localStorage.setItem('temio_ideas', JSON.stringify(ideas));
    }
  },

  addComment: (ideaId, comment) => {
    const ideas = db.getIdeas();
    const idea = ideas.find((i) => i.id === ideaId);
    if (idea) {
      idea.comments.push({
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('temio_ideas', JSON.stringify(ideas));
    }
  },

  updateIdeaStatus: (ideaId, status) => {
    const ideas = db.getIdeas();
    const idea = ideas.find((i) => i.id === ideaId);
    if (idea) {
      idea.status = status;
      localStorage.setItem('temio_ideas', JSON.stringify(ideas));
    }
  },

  // Evaluate idea with criteria ratings and comment
  evaluateIdea: (ideaId, evaluation) => {
    const ideas = db.getIdeas();
    const idea = ideas.find((i) => i.id === ideaId);
    if (idea) {
      idea.evaluation = {
        ...evaluation,
        evaluatedAt: new Date().toISOString(),
      };
      localStorage.setItem('temio_ideas', JSON.stringify(ideas));
    }
  },

  // Update user profile
  updateUserProfile: (userId, updates) => {
    const users = db.getUsers();
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('temio_users', JSON.stringify(users));
      // Also update current user in localStorage if it's the same user
      const currentUser = localStorage.getItem('temio_current_user');
      if (currentUser) {
        const parsed = JSON.parse(currentUser);
        if (parsed.id === userId) {
          localStorage.setItem('temio_current_user', JSON.stringify(users[userIndex]));
        }
      }
      return users[userIndex];
    }
    return null;
  },

  // Feedback
  getFeedback: () => {
    return JSON.parse(localStorage.getItem('temio_feedback') || '[]');
  },

  addFeedback: (feedback) => {
    const feedbacks = db.getFeedback();
    const newFeedback = {
      ...feedback,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    feedbacks.unshift(newFeedback);
    localStorage.setItem('temio_feedback', JSON.stringify(feedbacks));
    return newFeedback;
  },
};
