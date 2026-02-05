import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ThumbsUp, MessageSquare, Plus, TrendingUp, Users, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const InteractiveDemo = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'Horario flexible', category: 'cultura', votes: 24, comments: 8, status: 'En revisión', author: 'María G.', description: 'Permitir horarios flexibles para mejorar balance vida-trabajo' },
    { id: 2, title: 'Programa de mentoría', category: 'innovación', votes: 18, comments: 5, status: 'Aprobada', author: 'Carlos R.', description: 'Sistema de mentores para empleados nuevos' },
    { id: 3, title: 'Presupuesto para formación', category: 'procesos', votes: 32, comments: 12, status: 'Implementada', author: 'Ana M.', description: '€1000 anuales para cursos y certificaciones' },
    { id: 4, title: 'Mejora de cafetería', category: 'cultura', votes: 15, comments: 6, status: 'En revisión', author: 'Pedro L.', description: 'Opciones veganas y saludables en el menú' },
    { id: 5, title: 'Teletrabajo flexible', category: 'procesos', votes: 41, comments: 15, status: 'Aprobada', author: 'Laura S.', description: '3 días remotos por semana' }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleVote = (id) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ));
    toast({
      title: "¡Voto registrado!",
      description: "Has apoyado esta idea exitosamente.",
    });
  };

  const handleSubmitIdea = (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "¡Idea enviada!",
      description: "Tu propuesta ha sido recibida y será revisada pronto.",
    });
  };

  const filteredIdeas = selectedCategory === 'all' 
    ? ideas 
    : ideas.filter(idea => idea.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'Todas' },
    { value: 'innovación', label: 'Innovación' },
    { value: 'procesos', label: 'Procesos' },
    { value: 'cultura', label: 'Cultura' }
  ];

  const statusColors = {
    'En revisión': 'bg-amber-100 text-amber-700',
    'Aprobada': 'bg-green-100 text-green-700',
    'Implementada': 'bg-blue-100 text-blue-700'
  };

  return (
    <section id="demo" className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prueba Temio en acción
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experimenta cómo funciona la plataforma desde ambas perspectivas
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="employee" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="employee" className="text-base">Vista Empleado</TabsTrigger>
              <TabsTrigger value="company" className="text-base">Vista Empresa</TabsTrigger>
            </TabsList>

            {/* Employee View */}
            <TabsContent value="employee" className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <h3 className="text-2xl font-bold text-gray-900">Ideas de la comunidad</h3>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Proponer idea
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Proponer nueva idea</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmitIdea} className="space-y-4">
                        <div>
                          <Label htmlFor="title">Título de la idea</Label>
                          <input
                            id="title"
                            type="text"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            placeholder="Ej: Programa de teletrabajo"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Categoría</Label>
                          <select
                            id="category"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                          >
                            <option value="innovación">Innovación</option>
                            <option value="procesos">Procesos</option>
                            <option value="cultura">Cultura</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="description">Descripción</Label>
                          <textarea
                            id="description"
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            rows={4}
                            placeholder="Describe tu idea en detalle..."
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                          Enviar idea
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex gap-2 mb-6 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {filteredIdeas.map((idea, index) => (
                    <motion.div
                      key={idea.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{idea.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[idea.status]}`}>
                              {idea.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{idea.description}</p>
                          <p className="text-sm text-gray-500">Por {idea.author}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleVote(idea.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
                        >
                          <ThumbsUp className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">{idea.votes}</span>
                        </button>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageSquare className="w-4 h-4" />
                          <span>{idea.comments}</span>
                        </div>
                        <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                          {idea.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Company View */}
            <TabsContent value="company" className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Panel de control</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: TrendingUp, label: 'Ideas activas', value: '15', color: 'blue' },
                    { icon: Users, label: 'Participación', value: '68%', color: 'green' },
                    { icon: CheckCircle, label: 'Implementadas', value: '3', color: 'purple' },
                    { icon: Clock, label: 'Satisfacción', value: '92%', color: 'amber' }
                  ].map((metric, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                      <metric.icon className={`w-8 h-8 text-${metric.color}-600 mb-3`} />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">Gestión de ideas</h4>
                  {ideas.map((idea) => (
                    <div key={idea.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h5 className="text-lg font-semibold text-gray-900 mb-1">{idea.title}</h5>
                          <p className="text-gray-600 mb-2">{idea.description}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{idea.votes} votos</span>
                            <span>•</span>
                            <span>{idea.comments} comentarios</span>
                          </div>
                        </div>
                        <select
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={idea.status}
                          onChange={(e) => {
                            setIdeas(ideas.map(i => 
                              i.id === idea.id ? { ...i, status: e.target.value } : i
                            ));
                            toast({
                              title: "Estado actualizado",
                              description: `La idea ahora está "${e.target.value}"`,
                            });
                          }}
                        >
                          <option value="En revisión">En revisión</option>
                          <option value="Aprobada">Aprobada</option>
                          <option value="Implementada">Implementada</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA to Full Demo */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">¿Quieres probar la experiencia completa?</h3>
              <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                Accede a la demo interactiva con todas las funcionalidades. Inicia sesión como empleado o jefe para ver las diferentes vistas.
              </p>
              <Link to="/demo/login">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  Probar Demo Completa
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;