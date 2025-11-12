import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Gift, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import CountdownTimer from "./components/CountDown";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // RSVP Form state
  const [rsvpForm, setRsvpForm] = useState({
    attending: 'si',
    adultsCount: '1',
    adults: [{ name: '', allergies: '', menu: 'carne' }],
    childrenCount: '0'
  });

  // Wedding date - 28 de Febrero 2025, 5:00 PM
  const weddingDate = new Date('2025-02-28T17:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        console.log('Fecha actual:', now);
        console.log('Fecha boda:', weddingDate);
        console.log('Diferencia (ms):', difference);
        console.log('Días:', Math.floor(difference / (1000 * 60 * 60 * 24)));


        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Si la fecha ya pasó, mostrar ceros
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcular inmediatamente al cargar
    calculateTimeLeft();

    // Actualizar cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);

    // Limpiar el intervalo al desmontar
    return () => clearInterval(timer);
  }, []); // Array vacío para que solo se ejecute una vez

  // Handle RSVP form changes
  const handleAdultsCountChange = (count) => {
    const newAdults = Array(parseInt(count)).fill(null).map((_, i) =>
      rsvpForm.adults[i] || { name: '', allergies: '', menu: 'carne' }
    );
    setRsvpForm({ ...rsvpForm, adultsCount: count, adults: newAdults });
  };

  const handleAdultChange = (index, field, value) => {
    const newAdults = [...rsvpForm.adults];
    newAdults[index] = { ...newAdults[index], [field]: value };
    setRsvpForm({ ...rsvpForm, adults: newAdults });
  };

  const handleSubmitRSVP = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos a un backend o servicio
    console.log('RSVP Data:', rsvpForm);
    alert('¡Gracias por confirmar tu asistencia!');
    setShowRSVPModal(false);
  };

// Watercolor floral SVG component - fully responsive
const FloralTop = () => (
  <svg 
    width="200" 
    height="100"
    viewBox="0 0 200 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="mx-auto max-w-[150px] sm:max-w-[200px]"
  >
    <g opacity="0.5">
      <circle cx="100" cy="50" r="15" fill="#e8d5c4" opacity="0.4"/>
      <circle cx="100" cy="50" r="10" fill="#d4b5a0" opacity="0.5"/>
      <circle cx="95" cy="48" r="8" fill="#c4b5a0" opacity="0.4"/>
      <circle cx="105" cy="48" r="8" fill="#c4b5a0" opacity="0.4"/>
      <path d="M85 55 Q75 65 65 70" stroke="#a89080" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <ellipse cx="60" cy="68" rx="6" ry="10" fill="#d4c4b0" opacity="0.4" transform="rotate(-30 60 68)"/>
      <ellipse cx="70" cy="62" rx="5" ry="8" fill="#c4b5a0" opacity="0.4" transform="rotate(-20 70 62)"/>
      <ellipse cx="80" cy="58" rx="4" ry="7" fill="#b5a090" opacity="0.3" transform="rotate(-15 80 58)"/>
      <path d="M115 55 Q125 65 135 70" stroke="#a89080" strokeWidth="1.5" fill="none" opacity="0.3"/>
      <ellipse cx="140" cy="68" rx="6" ry="10" fill="#d4c4b0" opacity="0.4" transform="rotate(30 140 68)"/>
      <ellipse cx="130" cy="62" rx="5" ry="8" fill="#c4b5a0" opacity="0.4" transform="rotate(20 130 62)"/>
      <ellipse cx="120" cy="58" rx="4" ry="7" fill="#b5a090" opacity="0.3" transform="rotate(15 120 58)"/>
      <ellipse cx="50" cy="75" rx="4" ry="6" fill="#9d8b7a" opacity="0.25" transform="rotate(-45 50 75)"/>
      <ellipse cx="150" cy="75" rx="4" ry="6" fill="#9d8b7a" opacity="0.25" transform="rotate(45 150 75)"/>
    </g>
  </svg>
);

  // Golden confetti particles
  const GoldenConfetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            background: `rgba(${218 + Math.random() * 20}, ${165 + Math.random() * 30}, ${32 + Math.random() * 20}, ${0.2 + Math.random() * 0.3})`,
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 2 + 's'
          }}
        />
      ))}
    </div>
  );

  if (!isOpened) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant:wght@300;400;500;600&family=Crimson+Text:wght@400;600&display=swap');
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-15px) rotate(180deg); opacity: 0.8; }
          }
        `}</style>

        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6" style={{
          background: 'linear-gradient(135deg, #f5f1ed 0%, #ebe5df 50%, #f5f1ed 100%)'
        }}>
          <div
            onClick={() => setIsOpened(true)}
            className="relative max-w-md w-full bg-white overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-105"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              borderRadius: '8px'
            }}
          >
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundSize: '150px 150px'
            }}></div>

            <GoldenConfetti />

            <div className="relative px-6 py-10 sm:px-12 sm:py-16 text-center">
              <div className="mb-6 sm:mb-8">
                <FloralTop />
              </div>

              <div className="mb-6 sm:mb-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-2 tracking-wide" style={{
                  fontFamily: "'Alex Brush', cursive",
                  color: '#8b6f47',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
                }}>
                  Emmanuel
                </h1>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-wide" style={{
                  fontFamily: "'Alex Brush', cursive",
                  color: '#8b6f47',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.05)'
                }}>
                  Naydelin
                </h1>
              </div>

              <div className="mb-8 sm:mb-12" style={{ transform: 'rotate(180deg)' }}>
                <FloralTop />
              </div>

              <div className="mt-6 sm:mt-8">
                <p className="text-base sm:text-lg mb-2" style={{
                  fontFamily: "'Cormorant', serif",
                  color: '#6b5d52',
                  fontWeight: '300'
                }}>
                  Tenemos una noticia...
                </p>
                <p className="text-xl sm:text-2xl font-semibold animate-pulse" style={{
                  color: '#b8860b',
                  fontFamily: "'Cormorant', serif"
                }}>
                  ¡HAZ CLIC!
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant:wght@300;400;500;600&family=Crimson+Text:wght@400;600&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.8; }
        }
      `}</style>

      {/* RSVP Modal */}
      {showRSVPModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowRSVPModal(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
              backgroundSize: '150px 150px'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowRSVPModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
              style={{ color: '#8b6f47' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal content */}
            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl mb-2" style={{
                  fontFamily: "'Cormorant', serif",
                  color: '#8b6f47',
                  fontWeight: '500'
                }}>
                  Confirmar Asistencia
                </h2>
                <div className="w-16 h-px bg-amber-300 mx-auto mt-4"></div>
              </div>

              <form onSubmit={handleSubmitRSVP} className="space-y-6">
                {/* ¿Asistirás? */}
                <div>
                  <label className="block mb-3 font-semibold" style={{
                    fontFamily: "'Crimson Text', serif",
                    color: '#6b5d52',
                    fontSize: '18px'
                  }}>
                    ¿Asistirás?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="si"
                        checked={rsvpForm.attending === 'si'}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                        className="w-4 h-4 mr-2"
                        style={{ accentColor: '#8b6f47' }}
                      />
                      <span style={{ fontFamily: "'Crimson Text', serif", color: '#6b5d52' }}>Sí</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={rsvpForm.attending === 'no'}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, attending: e.target.value })}
                        className="w-4 h-4 mr-2"
                        style={{ accentColor: '#8b6f47' }}
                      />
                      <span style={{ fontFamily: "'Crimson Text', serif", color: '#6b5d52' }}>No</span>
                    </label>
                  </div>
                </div>

                {rsvpForm.attending === 'si' && (
                  <>
                    {/* Número de adultos */}
                    <div>
                      <label className="block mb-2 font-semibold" style={{
                        fontFamily: "'Crimson Text', serif",
                        color: '#6b5d52',
                        fontSize: '18px'
                      }}>
                        Número de adultos
                      </label>
                      <select
                        value={rsvpForm.adultsCount}
                        onChange={(e) => handleAdultsCountChange(e.target.value)}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-amber-400"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          color: '#6b5d52',
                          borderColor: '#e8d5c4'
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    {/* Adults details */}
                    {rsvpForm.adults.map((adult, index) => (
                      <div key={index} className="p-4 rounded-lg border-2" style={{
                        background: 'rgba(245,241,237,0.3)',
                        borderColor: '#e8d5c4'
                      }}>
                        <h3 className="mb-4 font-semibold" style={{
                          fontFamily: "'Crimson Text', serif",
                          color: '#8b6f47',
                          fontSize: '16px'
                        }}>
                          Adulto {index + 1}
                        </h3>

                        {/* Nombre y apellido */}
                        <div className="mb-4">
                          <label className="block mb-2 text-sm" style={{
                            fontFamily: "'Crimson Text', serif",
                            color: '#6b5d52'
                          }}>
                            Nombre y apellido
                          </label>
                          <input
                            type="text"
                            value={adult.name}
                            onChange={(e) => handleAdultChange(index, 'name', e.target.value)}
                            required
                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-amber-400"
                            style={{
                              fontFamily: "'Crimson Text', serif",
                              color: '#6b5d52',
                              borderColor: '#e8d5c4'
                            }}
                          />
                        </div>

                        {/* Alergias / Intolerancias */}
                        <div className="mb-4">
                          <label className="block mb-2 text-sm" style={{
                            fontFamily: "'Crimson Text', serif",
                            color: '#6b5d52'
                          }}>
                            Alergias / Intolerancias
                          </label>
                          <input
                            type="text"
                            value={adult.allergies}
                            onChange={(e) => handleAdultChange(index, 'allergies', e.target.value)}
                            placeholder="(Rellenar solo si procede)"
                            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-amber-400"
                            style={{
                              fontFamily: "'Crimson Text', serif",
                              color: '#6b5d52',
                              borderColor: '#e8d5c4'
                            }}
                          />
                        </div>

                        {/* Menú */}
                        <div>
                          <label className="block mb-3 text-sm font-semibold" style={{
                            fontFamily: "'Crimson Text', serif",
                            color: '#6b5d52'
                          }}>
                            Menú
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-start cursor-pointer">
                              <input
                                type="radio"
                                name={`menu-${index}`}
                                value="carne"
                                checked={adult.menu === 'carne'}
                                onChange={(e) => handleAdultChange(index, 'menu', e.target.value)}
                                className="w-4 h-4 mr-3 mt-1"
                                style={{ accentColor: '#8b6f47' }}
                              />
                              <span className="text-sm" style={{ fontFamily: "'Crimson Text', serif", color: '#6b5d52' }}>
                                Carne de ternera con paté de patata
                              </span>
                            </label>
                            <label className="flex items-start cursor-pointer">
                              <input
                                type="radio"
                                name={`menu-${index}`}
                                value="salmon"
                                checked={adult.menu === 'salmon'}
                                onChange={(e) => handleAdultChange(index, 'menu', e.target.value)}
                                className="w-4 h-4 mr-3 mt-1"
                                style={{ accentColor: '#8b6f47' }}
                              />
                              <span className="text-sm" style={{ fontFamily: "'Crimson Text', serif", color: '#6b5d52' }}>
                                Lomo de salmón con champiñones
                              </span>
                            </label>
                            <label className="flex items-start cursor-pointer">
                              <input
                                type="radio"
                                name={`menu-${index}`}
                                value="vegano"
                                checked={adult.menu === 'vegano'}
                                onChange={(e) => handleAdultChange(index, 'menu', e.target.value)}
                                className="w-4 h-4 mr-3 mt-1"
                                style={{ accentColor: '#8b6f47' }}
                              />
                              <span className="text-sm" style={{ fontFamily: "'Crimson Text', serif", color: '#6b5d52' }}>
                                Tartar de remolacha con crema de aguacate y nueces (Vegano)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Número de niños */}
                    <div>
                      <label className="block mb-2 font-semibold" style={{
                        fontFamily: "'Crimson Text', serif",
                        color: '#6b5d52',
                        fontSize: '18px'
                      }}>
                        Número de niños
                      </label>
                      <select
                        value={rsvpForm.childrenCount}
                        onChange={(e) => setRsvpForm({ ...rsvpForm, childrenCount: e.target.value })}
                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-amber-400"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          color: '#6b5d52',
                          borderColor: '#e8d5c4'
                        }}
                      >
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Submit button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                    style={{
                      background: '#8b6f47',
                      color: 'white',
                      fontFamily: "'Crimson Text', serif",
                      fontSize: '18px'
                    }}
                  >
                    <span>✉️</span>
                    <span>Clic aquí para enviar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #f5f1ed 0%, #ebe5df 50%, #f5f1ed 100%)'
      }}>
        <div className="max-w-2xl mx-auto bg-white shadow-2xl relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}></div>

          <GoldenConfetti />

          {/* Header with couple photo */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&h=600&fit=crop"
              alt="Emmanuel y Naydelin"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floral decoration under photo */}
          <div className="relative -mt-12 sm:-mt-16 z-20">
            <FloralTop />
          </div>

          {/* Names */}
          <div className="text-center px-4 sm:px-8 pb-4 pt-2 relative z-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-2" style={{
              fontFamily: "'Alex Brush', cursive",
              color: '#8b6f47'
            }}>
              Emmanuel & Naydelin
            </h1>
          </div>

          {/* Main content */}
          <div className="relative px-4 sm:px-8 md:px-16 pb-12 sm:pb-16">
            {/* Welcome message */}
            <div className="text-center mb-10 sm:mb-12 mt-6 sm:mt-8">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed px-2" style={{
                fontFamily: "'Cormorant', serif",
                color: '#6b5d52',
                fontWeight: '300'
              }}>
                Con la bendición de Dios y la alegría en nuestros corazones,
                <br className="hidden sm:inline" />
                <span className="inline sm:hidden"> </span>
                queremos compartir contigo el día más especial de nuestras vidas
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center my-8 sm:my-12">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
              <svg width="30" height="30" viewBox="0 0 30 30" className="mx-3 sm:mx-4">
                <circle cx="15" cy="15" r="3" fill="#c4b5a0" opacity="0.5" />
                <circle cx="15" cy="15" r="6" fill="none" stroke="#c4b5a0" strokeWidth="0.5" opacity="0.3" />
              </svg>
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            </div>

            {/* Ceremony details */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8" style={{
                fontFamily: "'Cormorant', serif",
                color: '#8b6f47',
                fontWeight: '500'
              }}>
                Ceremonia de Bodas
              </h2>

              <div className="space-y-3 sm:space-y-4 max-w-md mx-auto px-4">
                <div style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: window.innerWidth < 640 ? '16px' : '18px',
                  color: '#6b5d52'
                }}>
                  <p className="mb-2">Viernes, 28 de Febrero de 2025</p>
                  <p className="mb-4 sm:mb-6">5:00 PM</p>
                </div>

                <div className="pt-2">
                  <p className="text-base sm:text-lg font-semibold mb-1" style={{
                    fontFamily: "'Cormorant', serif",
                    color: '#8b6f47'
                  }}>
                    Iglesia San Francisco de Asís
                  </p>
                  <p className="text-sm" style={{
                    fontFamily: "'Crimson Text', serif",
                    color: '#9b8b7a'
                  }}>
                    Av. Principal 123, Centro
                  </p>
                </div>
              </div>
            </div>

            {/* Leaf divider */}
            <div className="flex justify-center my-8 sm:my-12">
              <svg width="80" height="30" viewBox="0 0 80 30" fill="none" className="max-w-full">
                <path d="M10 15 Q25 8 40 15 Q55 22 70 15" stroke="#c4b5a0" strokeWidth="1.5" fill="none" opacity="0.4" />
                <ellipse cx="20" cy="12" rx="3" ry="5" fill="#d4c4b0" opacity="0.3" transform="rotate(-30 20 12)" />
                <ellipse cx="40" cy="18" rx="3" ry="5" fill="#d4c4b0" opacity="0.3" transform="rotate(30 40 18)" />
                <ellipse cx="60" cy="12" rx="3" ry="5" fill="#d4c4b0" opacity="0.3" transform="rotate(-30 60 12)" />
              </svg>
            </div>

            {/* Reception details */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8" style={{
                fontFamily: "'Cormorant', serif",
                color: '#8b6f47',
                fontWeight: '500'
              }}>
                Recepción
              </h2>

              <div className="space-y-3 sm:space-y-4 max-w-md mx-auto px-4">
                <div style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: window.innerWidth < 640 ? '16px' : '18px',
                  color: '#6b5d52'
                }}>
                  <p className="mb-4 sm:mb-6">7:30 PM</p>
                </div>

                <div className="pt-2">
                  <p className="text-base sm:text-lg font-semibold mb-1" style={{
                    fontFamily: "'Cormorant', serif",
                    color: '#8b6f47'
                  }}>
                    Jardín Los Olivos
                  </p>
                  <p className="text-sm" style={{
                    fontFamily: "'Crimson Text', serif",
                    color: '#9b8b7a'
                  }}>
                    Camino Real 456, Valle Verde
                  </p>
                </div>
              </div>
            </div>

            {/* Dress code */}
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{
                fontFamily: "'Cormorant', serif",
                color: '#8b6f47',
                fontWeight: '500'
              }}>
                Formal
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#9b8b7a'
              }}>
                El honor de su presencia es lo más importante para nosotros.
                <br />
                Si deseas vestir de acuerdo al código formal, será bienvenido.
              </p>
              <div className="mt-4 flex justify-center space-x-6 sm:space-x-8 text-2xl sm:text-3xl opacity-60">
                <span>👔</span>
                <span>👗</span>
              </div>
            </div>

            {/* Personal message box */}
            <div className="mb-12 sm:mb-16 p-6 sm:p-8 border border-stone-200 rounded mx-2 sm:mx-0" style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(245,241,237,0.3))'
            }}>
              <p className="text-center leading-relaxed italic text-sm sm:text-base md:text-lg" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52'
              }}>
                "Queremos que seas parte de este momento tan especial en nuestras vidas.
                Tu presencia hará que este día sea aún más memorable y lleno de amor.
                Esperamos celebrar junto a ti el inicio de nuestra vida juntos."
              </p>
              <p className="text-center mt-4 sm:mt-6 text-xl sm:text-2xl" style={{
                fontFamily: "'Alex Brush', cursive",
                color: '#8b6f47'
              }}>
                Con amor, Emmanuel & Naydelin
              </p>
            </div>

            {/* Itinerary */}
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-8" style={{
                fontFamily: "'Cormorant', serif",
                color: '#8b6f47',
                fontWeight: '500'
              }}>
                Itinerario
              </h2>

              <div className="max-w-md mx-auto space-y-3 sm:space-y-4 text-sm sm:text-base" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52'
              }}>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>17:00 h</span>
                  <span>Ceremonia</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>19:00 h</span>
                  <span>Cóctel</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>20:00 h</span>
                  <span>Cena</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>21:30 h</span>
                  <span>Vals y Fiesta</span>
                </div>
              </div>
            </div>

            {/* Sunset photo */}
            <div className="mb-12 sm:mb-16 px-2 sm:px-0">
              <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=400&fit=crop"
                  alt="Emmanuel y Naydelin silueta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
              </div>
            </div>

            {/* RSVP */}
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl mb-4 sm:mb-6" style={{
                fontFamily: "'Cormorant', serif",
                color: '#8b6f47',
                fontWeight: '500'
              }}>
                Confirma tu Asistencia
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52'
              }}>
                Por favor, confírmanos antes del 15 de Febrero
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowRSVPModal(true)}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-full transition-all transform hover:scale-105 text-sm sm:text-base shadow-lg"
                  style={{
                    background: '#8b6f47',
                    color: 'white',
                    fontFamily: "'Crimson Text', serif"
                  }}
                >
                  <span>✉️</span>
                  <span>Confirmar Asistencia</span>
                </button>
                <a
                  href="https://wa.me/521234567890"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-all transform hover:scale-105 text-sm sm:text-base"
                  style={{
                    background: '#25D366',
                    color: 'white',
                    fontFamily: "'Crimson Text', serif"
                  }}
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Gift registry */}
            <div className="text-center mb-12 sm:mb-16 p-6 sm:p-8 border border-stone-200 rounded mx-2 sm:mx-0" style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(245,241,237,0.2))'
            }}>
              <Gift className="w-8 sm:w-10 h-8 sm:h-10 mx-auto mb-4" style={{ color: '#8b6f47' }} />
              <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4" style={{
                fontFamily: "'Cormorant', serif",
                color: '#8b6f47',
                fontWeight: '500'
              }}>
                Mesa de Regalos
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52'
              }}>
                Tu presencia es nuestro mejor regalo,
                <br />
                pero si deseas obsequiarnos algo:
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3">
                <button className="px-4 sm:px-5 py-2 border-2 rounded-full transition-all hover:shadow-md text-sm sm:text-base" style={{
                  borderColor: '#c4b5a0',
                  color: '#8b6f47',
                  fontFamily: "'Crimson Text', serif"
                }}>
                  Liverpool
                </button>
                <button className="px-4 sm:px-5 py-2 border-2 rounded-full transition-all hover:shadow-md text-sm sm:text-base" style={{
                  borderColor: '#c4b5a0',
                  color: '#8b6f47',
                  fontFamily: "'Crimson Text', serif"
                }}>
                  Palacio de Hierro
                </button>
                <button className="px-4 sm:px-5 py-2 border-2 rounded-full transition-all hover:shadow-md text-sm sm:text-base" style={{
                  borderColor: '#c4b5a0',
                  color: '#8b6f47',
                  fontFamily: "'Crimson Text', serif"
                }}>
                  Sobres de Regalo
                </button>
              </div>
            </div>
            {/* Photo sharing section - Diseño mejorado */}
            <div className="mb-12 sm:mb-16 px-2 sm:px-0">
              <div className="relative overflow-hidden rounded-2xl border-2 p-8 sm:p-12" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,241,237,0.9) 50%, rgba(255,255,255,0.95) 100%)',
                borderColor: '#e8d5c4',
                boxShadow: '0 10px 40px rgba(139, 111, 71, 0.1)'
              }}>
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-20 h-20 opacity-10">
                  <svg viewBox="0 0 100 100" fill="#8b6f47">
                    <circle cx="0" cy="0" r="100" />
                  </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10">
                  <svg viewBox="0 0 100 100" fill="#8b6f47">
                    <circle cx="100" cy="100" r="100" />
                  </svg>
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                  {/* Icon and title */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 animate-pulse" style={{
                      background: 'linear-gradient(135deg, #f5f1ed 0%, #e8d5c4 100%)',
                      boxShadow: '0 4px 15px rgba(139, 111, 71, 0.2)'
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b6f47" strokeWidth="2" className="sm:w-10 sm:h-10">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl mb-3" style={{
                      fontFamily: "'Cormorant', serif",
                      color: '#8b6f47',
                      fontWeight: '500'
                    }}>
                      Comparte tus Fotos
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mb-8 text-sm sm:text-base leading-relaxed px-2 max-w-2xl mx-auto" style={{
                    fontFamily: "'Crimson Text', serif",
                    color: '#6b5d52'
                  }}>
                    Escanea el siguiente QR o haz clic en él y comparte las fotos que tomes durante la boda.
                  </p>

                  {/* QR Code Container */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                    {/* QR Code */}
                    <a
                      href="https://pub-81bfb9260e2a480aa554ab719e15c0d9.r2.dev/qr.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 transition-all duration-300 group-hover:scale-105">
                        {/* QR Background with shadow */}
                        <div className="absolute inset-0 rounded-2xl" style={{
                          background: 'white',
                          boxShadow: '0 8px 30px rgba(139, 111, 71, 0.15)',
                          transform: 'rotate(-2deg)'
                        }}></div>

                        {/* QR Code */}
                        <a
                          href="https://pub-81bfb9260e2a480aa554ab719e15c0d9.r2.dev/qr.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <div className="relative w-48 h-48 sm:w-56 sm:h-56 transition-all duration-300 group-hover:scale-105">
                            {/* QR Background with shadow */}
                            <div className="absolute inset-0 rounded-2xl" style={{
                              background: 'white',
                              boxShadow: '0 8px 30px rgba(139, 111, 71, 0.15)',
                              transform: 'rotate(-2deg)'
                            }}></div>

                            {/* QR Container */}
                            <div className="relative w-full h-full rounded-2xl p-4 cursor-pointer border-2 transition-all duration-300 group-hover:border-amber-400" style={{
                              background: 'white',
                              borderColor: '#e8d5c4',
                              boxShadow: '0 4px 20px rgba(139, 111, 71, 0.1)'
                            }}>
                              {/* IMAGEN DEL QR - Reemplaza la ruta con tu imagen */}
                              <img
                                src="https://pub-81bfb9260e2a480aa554ab719e15c0d9.r2.dev/qr.jpg"
                                alt="QR Code para compartir fotos"
                                className="w-full h-full object-contain rounded-xl"
                              />

                              {/* Corner decorations */}
                              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl" style={{ borderColor: '#d4c4b0' }}></div>
                              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr" style={{ borderColor: '#d4c4b0' }}></div>
                              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl" style={{ borderColor: '#d4c4b0' }}></div>
                              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br" style={{ borderColor: '#d4c4b0' }}></div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-bounce" style={{
                              background: 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)',
                              animationDuration: '3s'
                            }}></div>
                          </div>
                        </a>

                        {/* Floating elements */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-bounce" style={{
                          background: 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)',
                          animationDuration: '3s'
                        }}></div>
                      </div>
                    </a>

                    {/* Code Section */}
                    <div className="flex flex-col items-center md:items-start">
                      <div className="p-6 rounded-xl border-2 inline-block" style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,241,237,0.6) 100%)',
                        borderColor: '#e8d5c4',
                        boxShadow: '0 4px 15px rgba(139, 111, 71, 0.08)'
                      }}>
                        <p className="text-xs mb-3 uppercase tracking-wider" style={{
                          fontFamily: "'Crimson Text', serif",
                          color: '#9b8b7a',
                          fontWeight: '600'
                        }}>
                          Código del álbum
                        </p>
                        <div className="flex items-center gap-3 mb-4">
                          <p className="text-2xl sm:text-3xl font-mono font-bold tracking-wider" style={{
                            color: '#8b6f47',
                            textShadow: '2px 2px 4px rgba(139, 111, 71, 0.1)'
                          }}>
                            ES69a9d35b
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('ES69a9d35b');
                            alert('✅ ¡Código copiado al portapapeles!');
                          }}
                          className="w-full px-4 py-2.5 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm font-medium"
                          style={{
                            background: 'linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)',
                            color: 'white',
                            fontFamily: "'Crimson Text', serif"
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          <span>Copiar código</span>
                        </button>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4 text-center md:text-left max-w-xs">
                        <p className="text-xs italic leading-relaxed" style={{
                          fontFamily: "'Crimson Text', serif",
                          color: '#9b8b7a'
                        }}>
                          También puedes ingresar este código manualmente en tu aplicación de fotos
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center my-6">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                    <span className="mx-4 text-2xl">✨</span>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                  </div>

                  {/* Bottom message */}
                  <p className="text-base sm:text-lg font-semibold mb-2" style={{
                    fontFamily: "'Cormorant', serif",
                    color: '#8b6f47'
                  }}>
                    ¡Nos hará muchísima ilusión verlas!
                  </p>
                  <p className="text-xs sm:text-sm italic" style={{
                    fontFamily: "'Crimson Text', serif",
                    color: '#9b8b7a'
                  }}>
                    Tus fotos harán este recuerdo aún más especial 💕
                  </p>
                </div>
              </div>
            </div>

            {/* Additional photo */}
            <div className="mb-12 sm:mb-16 px-2 sm:px-0">
              <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=400&fit=crop"
                  alt="Emmanuel y Naydelin"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent"></div>
              </div>
            </div>

            <div className="App">
             <CountdownTimer />
            </div>

            {/* Social media */}
            <div className="text-center mb-10 sm:mb-12 px-4">
              <p className="mb-4 text-sm sm:text-base" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#6b5d52'
              }}>
                Comparte este momento especial con nosotros
              </p>
              <div className="flex justify-center space-x-4 mb-4">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110" style={{
                  background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
                }}>
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110" style={{
                  background: '#1877f2'
                }}>
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#9b8b7a'
              }}>
                <span className="font-semibold" style={{ color: '#8b6f47' }}>#EmmanuelYNaydelin2025</span>
              </p>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 sm:pt-12 border-t px-4" style={{ borderColor: '#e8d5c4' }}>
              <div className="mb-4">
                <FloralTop />
              </div>
              <p className="text-xl sm:text-2xl mb-2" style={{
                fontFamily: "'Alex Brush', cursive",
                color: '#8b6f47'
              }}>
                Emmanuel & Naydelin
              </p>
              <p className="text-xs sm:text-sm" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#9b8b7a'
              }}>
                28 de Febrero, 2025
              </p>
              <p className="text-xs mt-4 sm:mt-6" style={{
                fontFamily: "'Crimson Text', serif",
                color: '#b5a090'
              }}>
                Con todo nuestro amor ♥
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;