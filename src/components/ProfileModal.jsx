import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User, Mail, Briefcase, Calendar, Shield, Camera, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfileModal = ({ open, onClose }) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const getRoleInfo = (role) => {
    if (role === 'boss') {
      return {
        label: 'Administrador',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Shield,
      };
    }
    return {
      label: 'Empleado',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: Briefcase,
    };
  };

  const roleInfo = getRoleInfo(user?.role);
  const RoleIcon = roleInfo.icon;

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona un archivo de imagen válido',
        variant: 'destructive',
      });
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'La imagen no debe superar los 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    // Convertir imagen a base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const updatedUser = updateProfile({ avatar: base64String });
      
      if (updatedUser) {
        toast({
          title: '¡Foto actualizada!',
          description: 'Tu foto de perfil se ha actualizado correctamente',
        });
      }
      setIsUploading(false);
    };

    reader.onerror = () => {
      toast({
        title: 'Error',
        description: 'Hubo un error al cargar la imagen',
        variant: 'destructive',
      });
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    const updatedUser = updateProfile({ avatar: null });
    if (updatedUser) {
      toast({
        title: 'Foto eliminada',
        description: 'Tu foto de perfil ha sido eliminada',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-slate-200/60 shadow-soft-lg rounded-2xl">
        {/* Header with gradient background */}
        <div className="relative h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-2 right-8 w-16 h-16 rounded-full bg-white/10 blur-lg"></div>
          </div>
        </div>

        {/* Avatar positioned to overlap header */}
        <div className="relative px-6 pb-6">
          <div className="flex justify-center -mt-14 mb-4">
            <div className="relative group">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg ring-4 ring-slate-100">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user?.name} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white text-3xl font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              {/* Upload button overlay */}
              <label 
                htmlFor="avatar-upload" 
                className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <div className="text-center">
                  <Camera className="w-8 h-8 text-white mx-auto mb-1" />
                  <span className="text-xs text-white font-medium">Cambiar foto</span>
                </div>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Remove photo button (if user has avatar) */}
          {user?.avatar && (
            <div className="flex justify-center -mt-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={removeAvatar}
                className="text-xs text-slate-500 hover:text-red-600 hover:bg-red-50"
              >
                Eliminar foto
              </Button>
            </div>
          )}

          {/* User name and role */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900">{user?.name}</h2>
            <Badge className={`mt-2 ${roleInfo.color} rounded-lg`}>
              <RoleIcon className="w-3 h-3 mr-1" />
              {roleInfo.label}
            </Badge>
          </div>

          {/* User info cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100">
                <Mail className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Correo electrónico</p>
                <p className="text-sm font-medium text-slate-700 truncate">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Nombre completo</p>
                <p className="text-sm font-medium text-slate-700">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-white rounded-lg shadow-sm border border-slate-100">
                <Briefcase className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Rol en la empresa</p>
                <p className="text-sm font-medium text-slate-700">{roleInfo.label}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
