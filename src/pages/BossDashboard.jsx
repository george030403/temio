import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, IDEA_CATEGORIES } from '../lib/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileModal from '../components/ProfileModal';
import EvaluationModal from '../components/EvaluationModal';
import { 
  Lightbulb, 
  LogOut, 
  Heart, 
  MessageCircle, 
  CheckCircle, 
  XCircle,
  Star,
  TrendingUp,
  Clock,
  BarChart3,
  Tag,
  EyeOff,
  ClipboardCheck
} from 'lucide-react';

const BossDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [expandedIdea, setExpandedIdea] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [evaluatingIdea, setEvaluatingIdea] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIdeas(db.getIdeas());
    setFeedback(db.getFeedback());
  };

  const handleLogout = () => {
    logout();
    navigate('/demo/login');
  };

  const handleUpdateStatus = (ideaId, status) => {
    db.updateIdeaStatus(ideaId, status);
    loadData();
  };

  const handleEvaluateIdea = (ideaId, status, evaluation) => {
    db.updateIdeaStatus(ideaId, status);
    db.evaluateIdea(ideaId, {
      ...evaluation,
      evaluatorId: user.id,
      evaluatorName: user.name,
    });
    loadData();
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
      <Badge variant="outline" className={`${colorClasses[category?.color || 'gray']} border font-medium`}>
        <Tag className="w-3 h-3 mr-1" />
        {category?.label || 'Otro'}
      </Badge>
    );
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const stats = {
    totalIdeas: ideas.length,
    pendingIdeas: ideas.filter((i) => i.status === 'pending').length,
    approvedIdeas: ideas.filter((i) => i.status === 'approved').length,
    avgRating: feedback.length 
      ? (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1)
      : '0',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="header-professional sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2.5 rounded-xl shadow-sm">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Temio</span>
            <Badge className="bg-violet-100 text-violet-700 border-violet-200/50 font-medium">Admin</Badge>
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
                <p className="text-xs text-slate-500">Administrador</p>
              </div>
            </button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Panel de Administración</h1>
          <p className="text-slate-500 mt-1">Revisa y evalúa las ideas de tu equipo.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border border-slate-200/60 shadow-soft rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Ideas</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalIdeas}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200/60 shadow-soft rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pendientes</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{stats.pendingIdeas}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200/60 shadow-soft rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Aprobadas</p>
                  <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.approvedIdeas}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-slate-200/60 shadow-soft rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Rating Promedio</p>
                  <p className="text-3xl font-bold text-violet-600 mt-1">{stats.avgRating}</p>
                </div>
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="ideas" className="space-y-5">
          <TabsList className="bg-white border border-slate-200/60 shadow-soft p-1 rounded-xl">
            <TabsTrigger value="ideas" className="flex items-center gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">
              <Lightbulb className="w-4 h-4" />
              Ideas ({ideas.length})
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2 rounded-lg px-4 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all">
              <MessageCircle className="w-4 h-4" />
              Feedback ({feedback.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="space-y-5">
            {ideas.length === 0 ? (
              <Card className="border border-slate-200/60 shadow-soft rounded-2xl">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No hay ideas todavía</p>
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

                    {/* Show evaluation summary if exists */}
                    {idea.evaluation && (
                      <div className="mb-5 p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                            <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                            Evaluación realizada
                          </span>
                          <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-slate-100">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <span className="font-semibold text-slate-900">
                              {(Object.values(idea.evaluation.ratings).reduce((a, b) => a + b, 0) / 5).toFixed(1)}
                            </span>
                          </div>
                        </div>
                        {idea.evaluation.comment && (
                          <p className="text-sm text-slate-600 italic leading-relaxed">"{idea.evaluation.comment}"</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Heart className="w-4 h-4" />
                          {idea.likes.length} likes
                        </span>
                        <button 
                          onClick={() => setExpandedIdea(expandedIdea === idea.id ? null : idea.id)}
                          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {idea.comments.length} comentarios
                        </button>
                      </div>

                      {idea.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => setEvaluatingIdea(idea)}
                          className="h-9 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                        >
                          <ClipboardCheck className="w-4 h-4 mr-1.5" />
                          Evaluar
                        </Button>
                      )}
                    </div>

                    {/* Comments Preview */}
                    {expandedIdea === idea.id && idea.comments.length > 0 && (
                      <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                        <p className="text-sm font-medium text-slate-700">Comentarios:</p>
                        {idea.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 animate-fade-in">
                            <Avatar className="w-8 h-8 ring-1 ring-slate-100">
                              <AvatarFallback className="text-xs bg-slate-200 text-slate-600 font-medium">
                                {comment.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-slate-900">{comment.userName}</span>
                                <span className="text-xs text-slate-400">{formatDate(comment.createdAt)}</span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-5">
            {feedback.length === 0 ? (
              <Card className="border border-slate-200/60 shadow-soft rounded-2xl">
                <CardContent className="py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">No hay feedback todavía</p>
                </CardContent>
              </Card>
            ) : (
              feedback.map((item) => (
                <Card key={item.id} className="border border-slate-200/60 shadow-soft rounded-2xl overflow-hidden animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-11 h-11 ring-2 ring-slate-100">
                          <AvatarFallback className="bg-slate-700 text-white text-sm font-medium">
                            {item.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900">{item.userName}</p>
                          <p className="text-xs text-slate-400">{formatDate(item.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? 'text-amber-400 fill-current'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{item.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Profile Modal */}
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
      
      {/* Evaluation Modal */}
      <EvaluationModal 
        idea={evaluatingIdea} 
        open={!!evaluatingIdea} 
        onClose={() => setEvaluatingIdea(null)}
        onSubmit={handleEvaluateIdea}
      />
    </div>
  );
};

export default BossDashboard;
