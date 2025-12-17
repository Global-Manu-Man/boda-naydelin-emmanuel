import React, { useState } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // Validación simple
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor completa todos los campos'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Construir Basic Auth
      const username = 'user';
      const password = 'password';
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      console.log('🔐 PASO 1: Obteniendo token CSRF...');
      console.log('📍 URL CSRF:', 'https://form.myinvitacion.com.mx/api/csrf');
      console.log('🔑 Authorization:', basicAuth);

      // PASO 1: Obtener el token CSRF
      const csrfResponse = await fetch(
        'https://form.myinvitacion.com.mx/api/csrf',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth
          }
        }
      );

      console.log('📡 CSRF Response Status:', csrfResponse.status);
      console.log('📡 CSRF Response Status Text:', csrfResponse.statusText);
      console.log('📡 CSRF Response OK:', csrfResponse.ok);
      console.log('📡 CSRF Response Headers:', {
        contentType: csrfResponse.headers.get('content-type'),
        contentLength: csrfResponse.headers.get('content-length')
      });

      if (!csrfResponse.ok) {
        const errorText = await csrfResponse.text();
        console.error('❌ Error al obtener CSRF - Status:', csrfResponse.status);
        console.error('❌ Error al obtener CSRF - Response:', errorText);
        throw new Error(`Error ${csrfResponse.status}: ${errorText || 'No se pudo obtener el token CSRF'}`);
      }

      const csrfData = await csrfResponse.json();
      console.log('✅ CSRF Response completo:', csrfData);
      
      const csrfToken = csrfData.csrfToken;
      const headerName = csrfData.headerName;
      
      console.log('✅ Token CSRF obtenido:', csrfToken);
      console.log('📋 Header name:', headerName);
      console.log('📋 Parameter name:', csrfData.parameterName);

      if (!csrfToken) {
        throw new Error('El token CSRF está vacío o undefined');
      }

      // PASO 2: Enviar el formulario con el token CSRF
      console.log('📤 PASO 2: Enviando formulario con token CSRF...');

      const apiPayload = {
        email: formData.email,
        fullName: formData.name,
        description: formData.message,
        country: "México"
      };

      console.log('📦 Payload:', JSON.stringify(apiPayload, null, 2));
      console.log('📍 URL Formulario:', 'https://form.myinvitacion.com.mx/api/blog-forms');
      console.log('📋 Headers que se enviarán:', {
        'Content-Type': 'application/json',
        'Authorization': basicAuth,
        'X-XSRF-TOKEN': csrfToken
      });

      const response = await fetch(
        'https://form.myinvitacion.com.mx/api/blog-forms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': basicAuth,
            'X-XSRF-TOKEN': csrfToken
          },
          body: JSON.stringify(apiPayload)
        }
      );

      console.log('📡 Form Response Status:', response.status);
      console.log('📡 Form Response Status Text:', response.statusText);
      console.log('📡 Form Response OK:', response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Formulario guardado exitosamente:', data);
        console.log('📊 ID generado:', data.id);

        setSubmitStatus({
          type: 'success',
          message: '¡Mensaje enviado! Nos pondremos en contacto pronto.'
        });

        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setSubmitStatus({ type: '', message: '' });
          onClose();
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('❌ Error al enviar formulario - Status:', response.status);
        console.error('❌ Error al enviar formulario - Response:', errorText);

        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }

        setSubmitStatus({
          type: 'error',
          message: `Error ${response.status}: ${errorData.message || 'Hubo un error al enviar el formulario.'}`
        });
      }
    } catch (error) {
      console.error('❌ ERROR COMPLETO:', error);
      console.error('❌ Error type:', error.constructor.name);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);

      let errorMessage = error.message;
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage = 'Error de red o CORS. No se pudo conectar con el servidor.';
      }

      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors z-10"
          style={{ color: '#8b6f47' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 border-b" style={{ borderColor: '#e8d5c4' }}>
          <h2 className="text-2xl sm:text-3xl mb-3" style={{
            fontFamily: "'Cormorant', serif",
            color: '#8b6f47',
            fontWeight: '600'
          }}>
            ¿Te gustó esta invitación?
          </h2>
          <p className="text-sm leading-relaxed" style={{
            fontFamily: "'Crimson Text', serif",
            color: '#6b5d52'
          }}>
            Completa los siguientes datos y nos pondremos en contacto a la brevedad para cotizar tu proyecto.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Nombre */}
          <div>
            <label className="block mb-2 text-sm font-semibold" style={{
              fontFamily: "'Crimson Text', serif",
              color: '#8b6f47'
            }}>
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52',
                borderColor: '#e8d5c4'
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold" style={{
              fontFamily: "'Crimson Text', serif",
              color: '#8b6f47'
            }}>
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-amber-400 transition-colors"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52',
                borderColor: '#e8d5c4'
              }}
            />
          </div>

          {/* Mensaje */}
          <div>
            <label className="block mb-2 text-sm font-semibold" style={{
              fontFamily: "'Crimson Text', serif",
              color: '#8b6f47'
            }}>
              Escribe aquí tu mensaje
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Cuéntanos sobre tu evento y lo que andas buscando..."
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-amber-400 transition-colors resize-none"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52',
                borderColor: '#e8d5c4'
              }}
            ></textarea>
          </div>

          {/* Status Messages */}
          {submitStatus.message && (
            <div 
              className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <p className={`text-sm ${
                submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`} style={{
                fontFamily: "'Crimson Text', serif"
              }}>
                {submitStatus.message}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg transition-all text-sm font-medium"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: '#8b6f47',
                border: '2px solid #e8d5c4',
                background: 'white'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 rounded-lg transition-all transform hover:scale-105 text-sm font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: "'Crimson Text', serif",
                background: isSubmitting 
                  ? '#9b8b7a' 
                  : 'linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)',
                color: 'white'
              }}
            >
              {isSubmitting ? 'Enviando...' : 'Sí, enviar ahora'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;