import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EVALUATION_CRITERIA, IDEA_CATEGORIES } from '../lib/database';
import { 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Calendar,
  User,
  Lightbulb,
  Tag
} from 'lucide-react';

const IdeaDetailModal = ({ idea, open, onClose }) => {
  if (!idea) return null;

  const getStatusConfig = (status) => {
    const config = {
      pending: { 
        className: 'bg-amber-50 text-amber-700 border-amber-200', 
        label: 'Pendiente',
        icon: Clock,
        description: 'Tu idea está siendo revisada por el equipo de administración.'
      },
      approved: { 
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
        label: 'Aprobada',
        icon: CheckCircle,
        description: '¡Felicidades! Tu idea ha sido aprobada.'
      },
      rejected: { 
        className: 'bg-red-50 text-red-700 border-red-200', 
        label: 'Rechazada',
        icon: XCircle,
        description: 'Tu idea no fue aprobada en esta ocasión.'
      },
    };
    return config[status] || config.pending;
  };

  const getCategoryInfo = (categoryId) => {
    return IDEA_CATEGORIES.find(c => c.id === categoryId) || IDEA_CATEGORIES.find(c => c.id === 'otro');
  };

  const statusConfig = getStatusConfig(idea.status);
  const StatusIcon = statusConfig.icon;
  const category = getCategoryInfo(idea.category);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAverageRating = () => {
    if (!idea.evaluation?.ratings) return null;
    const values = Object.values(idea.evaluation.ratings);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto border-slate-200/60 shadow-soft-lg rounded-2xl">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <DialogTitle className="flex items-center gap-2 text-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            Detalle de tu Idea
          </DialogTitle>
          <DialogDescription className="text-slate-500 mt-1">
            Revisa el estado y evaluación de tu idea
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Idea Info */}
          <div className="space-y-3 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800">{idea.title}</h3>
            <p className="text-slate-600 leading-relaxed">{idea.content}</p>
            
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Badge className={`bg-${category?.color}-100 text-${category?.color}-700 rounded-lg`}>
                <Tag className="w-3 h-3 mr-1" />
                {category?.label}
              </Badge>
              {idea.isAnonymous && (
                <Badge variant="outline" className="text-slate-500 rounded-lg border-slate-200">
                  <User className="w-3 h-3 mr-1" />
                  Anónima
                </Badge>
              )}
              <span className="flex items-center gap-1 text-slate-500 text-sm">
                <Calendar className="w-4 h-4" />
                {formatDate(idea.createdAt)}
              </span>
            </div>
          </div>

          {/* Status Card */}
          <div className={`rounded-xl p-5 border ${
            idea.status === 'approved' ? 'bg-emerald-50/80 border-emerald-200' :
            idea.status === 'rejected' ? 'bg-red-50/80 border-red-200' : 'bg-amber-50/80 border-amber-200'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                idea.status === 'approved' ? 'bg-emerald-100' :
                idea.status === 'rejected' ? 'bg-red-100' : 'bg-amber-100'
              }`}>
                <StatusIcon className={`w-6 h-6 ${
                  idea.status === 'approved' ? 'text-emerald-600' :
                  idea.status === 'rejected' ? 'text-red-600' : 'text-amber-600'
                }`} />
              </div>
              <div>
                <Badge className={`${statusConfig.className} rounded-lg font-semibold`}>
                  {statusConfig.label}
                </Badge>
                <p className="text-sm text-slate-600 mt-1.5">{statusConfig.description}</p>
              </div>
            </div>
          </div>

          {/* Evaluation Section */}
          {idea.evaluation ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-800">Evaluación</h4>
                <div className="flex items-center gap-2 bg-slate-700 text-white px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{getAverageRating()}</span>
                  <span className="text-slate-300 text-sm">promedio</span>
                </div>
              </div>

              {/* Criteria Ratings */}
              <div className="space-y-3">
                {EVALUATION_CRITERIA.map((criterion) => {
                  const rating = idea.evaluation.ratings[criterion.id] || 0;
                  return (
                    <div key={criterion.id} className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-sm font-medium text-slate-700">{criterion.label}</span>
                        <p className="text-xs text-slate-500">{criterion.description}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Evaluator Comment */}
              {idea.evaluation.comment && (
                <div className="bg-slate-100/80 rounded-xl p-4 space-y-2 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-700">
                      Comentario de {idea.evaluation.evaluatorName}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{idea.evaluation.comment}"
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatDate(idea.evaluation.evaluatedAt)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">
                Tu idea aún no ha sido evaluada.
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Te notificaremos cuando haya una actualización.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-5 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaDetailModal;
