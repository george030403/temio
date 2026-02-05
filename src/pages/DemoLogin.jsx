import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const DemoLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (result.success) {
      navigate('/demo/dashboard');
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'employee') {
      setEmail('empleado@demo.com');
      setPassword('demo123');
    } else {
      setEmail('jefe@demo.com');
      setPassword('demo123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Lightbulb className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Temio Demo</CardTitle>
            <CardDescription className="text-gray-600">
              Inicia sesión para probar la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                Iniciar Sesión
              </Button>

              <div className="text-center">
                <Link 
                  to="/demo/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm font-semibold text-gray-700 mb-3">Credenciales de prueba:</p>
              <div className="space-y-2">
                <button
                  onClick={() => fillDemoCredentials('employee')}
                  className="w-full text-left p-3 bg-white rounded-md border hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <p className="text-sm font-medium text-gray-900">👤 Empleado</p>
                  <p className="text-xs text-gray-500">empleado@demo.com / demo123</p>
                </button>
                <button
                  onClick={() => fillDemoCredentials('boss')}
                  className="w-full text-left p-3 bg-white rounded-md border hover:border-purple-300 hover:bg-purple-50 transition-all"
                >
                  <p className="text-sm font-medium text-gray-900">👔 Jefe</p>
                  <p className="text-xs text-gray-500">jefe@demo.com / demo123</p>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoLogin;
