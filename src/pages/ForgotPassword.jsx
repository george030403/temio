import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular envío de correo
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link 
          to="/demo/login" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al login
        </Link>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <Lightbulb className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Recuperar Contraseña</CardTitle>
            <CardDescription className="text-gray-600">
              Te enviaremos un enlace para restablecer tu contraseña
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {submitted ? (
              <div className="text-center py-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Correo enviado!</h3>
                <p className="text-gray-600 mb-6">
                  Si el correo <strong>{email}</strong> existe en nuestra base de datos, recibirás un enlace para restablecer tu contraseña.
                </p>
                <Alert className="bg-blue-50 border-blue-200 text-left">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 ml-2">
                    <strong>Nota:</strong> Este es un demo. En producción, recibirías un correo real.
                  </AlertDescription>
                </Alert>
                <Link to="/demo/login">
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Volver al login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar enlace de recuperación
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
