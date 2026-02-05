import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EVALUATION_CRITERIA } from '../lib/database';
import { Star, CheckCircle, XCircle, Sparkles } from 'lucide-react';

const EvaluationModal = ({ idea, open, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({
    creatividad: 0,
    viabilidad: 0,
    impacto: 0,
    costoTiempo: 0,
    innovacion: 0,
  });
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('approved');

  const handleRatingChange = (criterionId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [criterionId]: rating,
    }));
  };

  const handleSubmit = () => {
    onSubmit(idea.id, status, {
      ratings,
      comment,
    });
    onClose();
    // Reset form
    setRatings({
      creatividad: 0,
      viabilidad: 0,
      impacto: 0,
      costoTiempo: 0,
      innovacion: 0,
    });
    setComment('');
    setStatus('approved');
  };

  const allRated = Object.values(ratings).every((r) => r > 0);

  const getAverageRating = () => {
    const values = Object.values(ratings);
    const sum = values.reduce((acc, val) => acc + val, 0);
    return values.every((v) => v > 0) ? (sum / values.length).toFixed(1) : '—';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto border-slate-200/60 shadow-soft-lg rounded-2xl">
        <DialogHeader className="pb-4 border-b border-slate-100">
          <DialogTitle className="flex items-center gap-2 text-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            Evaluar Idea
          </DialogTitle>
          <DialogDescription className="text-slate-500 mt-1">
            Evalúa "{idea?.title}" según los siguientes criterios
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Criteria Ratings */}
          <div className="space-y-4">
            {EVALUATION_CRITERIA.map((criterion) => (
              <div key={criterion.id} className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-semibold text-slate-700">{criterion.label}</Label>
                    <p className="text-xs text-slate-500 mt-0.5">{criterion.description}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-200">
                    {ratings[criterion.id] > 0 ? ratings[criterion.id] : '—'}/5
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(criterion.id, star)}
                      className="p-1.5 hover:scale-110 transition-all duration-200 rounded-lg hover:bg-amber-50"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          star <= ratings[criterion.id]
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 hover:text-amber-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Average Rating */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-5 flex items-center justify-between shadow-soft">
            <span className="font-medium text-slate-200">Promedio General</span>
            <div className="flex items-center gap-3">
              <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
              <span className="text-3xl font-bold text-white">{getAverageRating()}</span>
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-slate-700 font-medium">Comentario para el empleado</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe un comentario sobre esta idea... (opcional)"
              rows={3}
              className="border-slate-200 focus:border-slate-400 focus:ring-slate-400/20 rounded-xl resize-none"
            />
          </div>

          {/* Decision */}
          <div className="space-y-3">
            <Label className="text-slate-700 font-medium">Decisión</Label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStatus('approved')}
                className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                  status === 'approved'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-soft'
                    : 'border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50'
                }`}
              >
                <CheckCircle className={`w-10 h-10 ${status === 'approved' ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span className="font-semibold">Aprobar</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus('rejected')}
                className={`p-5 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                  status === 'rejected'
                    ? 'border-red-500 bg-red-50 text-red-700 shadow-soft'
                    : 'border-slate-200 hover:border-red-200 hover:bg-red-50/50'
                }`}
              >
                <XCircle className={`w-10 h-10 ${status === 'rejected' ? 'text-red-500' : 'text-slate-300'}`} />
                <span className="font-semibold">Rechazar</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-5 border-t border-slate-100">
          <Button variant="outline" onClick={onClose} className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!allRated}
            className={`rounded-xl font-semibold ${status === 'approved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {status === 'approved' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprobar Idea
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Rechazar Idea
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationModal;
