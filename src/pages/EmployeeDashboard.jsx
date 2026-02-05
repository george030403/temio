import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, IDEA_CATEGORIES } from '../lib/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import ProfileModal from '../components/ProfileModal';
import IdeaDetailModal from '../components/IdeaDetailModal';
import { 
  Lightbulb, 
  LogOut, 
  Heart, 
  MessageCircle, 
  Send, 
  Plus,
  ChevronDown,
  ChevronUp,
  Sparkles,
  X,
  User,
  EyeOff,
  Tag,
  Eye,
  Star
} from 'lucide-react';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [showNewIdea, setShowNewIdea] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('otro');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [expandedComments, setExpandedComments] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = () => {
    setIdeas(db.getIdeas());
  };

  const handleLogout = () => {
    logout();
    navigate('/demo/login');
  };

  const handleSubmitIdea = (e) => {
    e.preventDefault();
    if (!user) return;

    db.addIdea({
      userId: user.id,
      userName: isAnonymous ? 'Anónimo' : user.name,
      title: newTitle,
      content: newContent,
      category: newCategory,
      isAnonymous: isAnonymous,
    });

    setNewTitle('');
    setNewContent('');
    setNewCategory('otro');
    setIsAnonymous(false);
    setShowNewIdea(false);
    loadIdeas();
  };

  const handleLike = (ideaId) => {
    if (!user) return;
    db.toggleLike(ideaId, user.id);
    loadIdeas();
  };

  const toggleComments = (ideaId) => {
    setExpandedComments((prev) =>
      prev.includes(ideaId)
        ? prev.filter((id) => id !== ideaId)
        : [...prev, ideaId]
    );
  };

  const handleAddComment = (ideaId) => {
    if (!user || !newComments[ideaId]?.trim()) return;

    db.addComment(ideaId, {
      userId: user.id,
      userName: user.name,
      content: newComments[ideaId],
    });

    setNewComments((prev) => ({ ...prev, [ideaId]: '' }));
    loadIdeas();
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { className: 'bg-amber-50 text-amber-700 border border-amber-200/50', label: 'Pendiente' },
      approved: { className: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50', label: 'Aprobada' },
      rejected: { className: 'bg-rose-50 text-rose-700 border border-rose-200/50', label: 'Rechazada' },
    };
    const { className, label } = config[status] || config.pending;
    return <Badge className={`${className} font-medium`}>{label}</Badge>;
  };

  const getCategoryBadge = (categoryId) => {
    const category = IDEA_CATEGORIES.find(c => c.id === categoryId) || IDEA_CATEGORIES.find(c => c.id === 'otro');
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200/50',
      green: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
      purple: 'bg-violet-50 text-violet-700 border-violet-200/50',
      indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/50',
      orange: 'bg-orange-50 text-orange-700 border-orange-200/50',
      pink: 'bg-pink-50 text-pink-700 border-pink-200/50',
      gray: 'bg-slate-100 text-slate-600 border-slate-200/50',
    };
    return (
      <Badge variant="outline" className={`${colorClasses[category.color]} border font-medium`}>
        <Tag className="w-3 h-3 mr-1" />
        {category.label}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="header-professional sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2.5 rounded-xl shadow-sm">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Temio</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowProfile(true)} className="flex items-center gap-3 hover:bg-slate-50 rounded-xl px-3 py-2 transition-colors">
              <Avatar className="w-9 h-9 ring-2 ring-slate-100">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-slate-700 text-white text-sm font-medium">
                  {user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">Empleado</p>
              </div>
            </button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Bienvenido, {user?.name.split(' ')[0]}
          </h1>
          <p className="text-slate-500 mt-1">Comparte tus ideas para mejorar el ambiente laboral.</p>
        </div>

        {/* New Idea Section */}
        <Card className="mb-8 border border-slate-200/60 shadow-soft rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            {showNewIdea ? (
              <form onSubmit={handleSubmitIdea} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Nueva idea
                  </h3>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowNewIdea(false)}
                    className="rounded-xl hover:bg-slate-100"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </Button>
                </div>
                <Input
                  placeholder="Título de tu idea"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 font-medium"
                />
                <Textarea
                  placeholder="Describe tu idea en detalle... ¿Qué problema resuelve? ¿Cómo beneficiaría al equipo?"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  required
                  className="px-4 py-3 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100 resize-none"
                />
                
                {/* Category Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-700">Categoría</Label>
                  <div className="flex flex-wrap gap-2">
                    {IDEA_CATEGORIES.map((cat) => {
                      const isSelected = newCategory === cat.id;
                      const colorClasses = {
                        blue: isSelected ? 'bg-blue-600 text-white ring-2 ring-blue-200' : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
                        green: isSelected ? 'bg-emerald-600 text-white ring-2 ring-emerald-200' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
                        purple: isSelected ? 'bg-violet-600 text-white ring-2 ring-violet-200' : 'bg-violet-50 text-violet-700 hover:bg-violet-100',
                        indigo: isSelected ? 'bg-indigo-600 text-white ring-2 ring-indigo-200' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
                        orange: isSelected ? 'bg-orange-600 text-white ring-2 ring-orange-200' : 'bg-orange-50 text-orange-700 hover:bg-orange-100',
                        pink: isSelected ? 'bg-pink-600 text-white ring-2 ring-pink-200' : 'bg-pink-50 text-pink-700 hover:bg-pink-100',
                        gray: isSelected ? 'bg-slate-600 text-white ring-2 ring-slate-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                      };
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setNewCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${colorClasses[cat.color]}`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-100">
                      <EyeOff className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Publicar anónimamente</p>
                      <p className="text-xs text-slate-500">Tu nombre no será visible</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`w-12 h-7 rounded-full transition-all duration-200 ${
                      isAnonymous ? 'bg-slate-900' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
                        isAnonymous ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowNewIdea(false)}
                    className="h-11 px-5 rounded-xl border-slate-200 hover:bg-slate-50"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-sm">
                    <Send className="w-4 h-4 mr-2" />
                    {isAnonymous ? 'Publicar anónimamente' : 'Publicar'}
                  </Button>
                </div>
              </form>
            ) : (
              <Button 
                onClick={() => setShowNewIdea(true)} 
                className="w-full h-14 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-sm text-base font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Compartir una idea
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Ideas Feed */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-slate-900">Ideas de la comunidad</h2>
          
          {ideas.length === 0 ? (
            <Card className="border border-slate-200/60 shadow-soft rounded-2xl">
              <CardContent className="py-16 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No hay ideas aún</p>
                <p className="text-slate-400 text-sm mt-1">¡Sé el primero en compartir!</p>
              </CardContent>
            </Card>
          ) : (
            ideas.map((idea) => (
              <Card key={idea.id} className="border border-slate-200/60 shadow-soft hover:shadow-soft-lg rounded-2xl transition-all duration-200 overflow-hidden animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-11 h-11 ring-2 ring-slate-100">
                        <AvatarFallback className={`${idea.isAnonymous ? 'bg-slate-400' : 'bg-slate-700'} text-white text-sm font-medium`}>
                          {idea.isAnonymous ? <EyeOff className="w-5 h-5" /> : idea.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-slate-900">
                          {idea.isAnonymous ? 'Anónimo' : idea.userName}
                        </p>
                        <p className="text-xs text-slate-400">{formatDate(idea.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getCategoryBadge(idea.category)}
                      {getStatusBadge(idea.status)}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-slate-900 mb-2">{idea.title}</h3>
                  <p className="text-slate-600 mb-5 leading-relaxed">{idea.content}</p>

                  {/* Show evaluation preview if user owns the idea */}
                  {idea.userId === user?.id && idea.evaluation && (
                    <div className="mb-5 p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="text-sm font-medium text-slate-700">
                            Puntuación: {(Object.values(idea.evaluation.ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1)}/5
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedIdea(idea)}
                          className="text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver evaluación
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Show pending message if user owns the idea and no evaluation */}
                  {idea.userId === user?.id && !idea.evaluation && idea.status === 'pending' && (
                    <div className="mb-5 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-sm text-amber-700 flex items-center gap-2 font-medium">
                        <Sparkles className="w-4 h-4" />
                        Tu idea está siendo revisada
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(idea.id)}
                      className={`gap-2 rounded-xl ${idea.likes.includes(user?.id) ? 'text-rose-500 hover:text-rose-600 hover:bg-rose-50' : 'text-slate-500 hover:text-rose-500 hover:bg-rose-50'}`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${idea.likes.includes(user?.id) ? 'fill-current' : ''}`} 
                      />
                      {idea.likes.length > 0 && <span>{idea.likes.length}</span>}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleComments(idea.id)}
                      className="gap-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {idea.comments.length > 0 && <span>{idea.comments.length}</span>}
                      {expandedComments.includes(idea.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                    
                    {/* View details button for own ideas */}
                    {idea.userId === user?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedIdea(idea)}
                        className="ml-auto gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                      >
                        <Eye className="w-4 h-4" />
                        Ver detalles
                      </Button>
                    )}
                  </div>

                  {/* Comments Section */}
                  {expandedComments.includes(idea.id) && (
                    <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                      {idea.comments.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-4">No hay comentarios aún</p>
                      ) : (
                        idea.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 animate-fade-in">
                            <Avatar className="w-8 h-8 ring-1 ring-slate-100">
                              <AvatarFallback className="text-xs bg-slate-200 text-slate-600 font-medium">
                                {comment.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-slate-900">{comment.userName}</span>
                                <span className="text-xs text-slate-400">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      )}

                      <div className="flex gap-3 pt-2">
                        <Avatar className="w-8 h-8 ring-1 ring-slate-100">
                          <AvatarFallback className="text-xs bg-slate-700 text-white font-medium">
                            {user?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Escribe un comentario..."
                            value={newComments[idea.id] || ''}
                            onChange={(e) =>
                              setNewComments((prev) => ({
                                ...prev,
                                [idea.id]: e.target.value,
                              }))
                            }
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(idea.id);
                              }
                            }}
                            className="flex-1 h-10 px-4 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-300"
                          />
                          <Button
                            size="icon"
                            onClick={() => handleAddComment(idea.id)}
                            disabled={!newComments[idea.id]?.trim()}
                            className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Profile Modal */}
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
      
      {/* Idea Detail Modal */}
      <IdeaDetailModal 
        idea={selectedIdea} 
        open={!!selectedIdea} 
        onClose={() => setSelectedIdea(null)} 
      />
    </div>
  );
};

export default EmployeeDashboard;
