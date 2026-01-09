import React, { useState, useEffect } from "react";
import { MapPin, Clock, Calendar, Gift, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import ContactModal from './components/ContactModal';
import CountdownTimer from "./components/CountDown";
import LocationMaps from "./components/LocationMaps";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Estados para la API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // RSVP Form state
  const [rsvpForm, setRsvpForm] = useState({
    attending: "si",
    adultsCount: "1",
    adults: [{ name: "", allergies: "", menu: "carne" }],
    childrenCount: "0",
  });

  // Wedding date - 28 de Febrero 2025, 5:00 PM
  const weddingDate = new Date("2025-02-28T17:00:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        console.log("Fecha actual:", now);
        console.log("Fecha boda:", weddingDate);
        console.log("Diferencia (ms):", difference);
        console.log("Días:", Math.floor(difference / (1000 * 60 * 60 * 24)));

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
    const newAdults = Array(parseInt(count))
      .fill(null)
      .map(
        (_, i) =>
          rsvpForm.adults[i] || { name: "", allergies: "", menu: "carne" }
      );
    setRsvpForm({ ...rsvpForm, adultsCount: count, adults: newAdults });
  };

  const handleAdultChange = (index, field, value) => {
    const newAdults = [...rsvpForm.adults];
    newAdults[index] = { ...newAdults[index], [field]: value };
    setRsvpForm({ ...rsvpForm, adults: newAdults });
  };

  // Función para enviar a la API
  const handleSubmitRSVP = async (e) => {
    e.preventDefault();

    setSubmitStatus({ type: "", message: "" });
    setIsSubmitting(true);

    try {
      // Si NO va a asistir, solo mostrar mensaje y cerrar
      if (rsvpForm.attending === "no") {
        setSubmitStatus({
          type: "success",
          message: "Gracias por confirmar. ¡Esperamos verte en otra ocasión! 💕",
        });

        setTimeout(() => {
          setShowRSVPModal(false);
          setRsvpForm({
            attending: "si",
            adultsCount: "1",
            adults: [{ name: "", allergies: "", menu: "carne" }],
            childrenCount: "0",
          });
          setSubmitStatus({ type: "", message: "" });
        }, 3000);

        setIsSubmitting(false);
        return; // Salir de la función sin enviar al API
      }

      // Validación solo para los que SÍ van a asistir
      const allAdultsHaveNames = rsvpForm.adults.every(
        (adult) => adult.name.trim() !== ""
      );
      if (!allAdultsHaveNames) {
        setSubmitStatus({
          type: "error",
          message: "Por favor completa el nombre de todos los adultos",
        });
        setIsSubmitting(false);
        return;
      }

      // Preparar datos para el API (solo si attending === "si")
      const apiPayload = {
        attending: true,
        numberOfAdults: parseInt(rsvpForm.adultsCount),
        numberOfChildren: parseInt(rsvpForm.childrenCount),
        adults: rsvpForm.adults.map((adult, index) => ({
          fullName: adult.name.trim(),
          allergies: adult.allergies?.trim() || "Ninguna",
          menu: "CARNE",
          adultOrder: index + 1,
        })),
        contactEmail: "invitado@boda.com",
        contactPhone: "0000000000",
        notes: "",
      };

      console.log("📤 Enviando a Railway:", apiPayload);

      const response = await fetch(
        "https://weddingrsvp-production.up.railway.app/api/v1/guests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiPayload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Guardado exitosamente:", data);

        setSubmitStatus({
          type: "success",
          message:
            "¡Gracias por confirmar tu asistencia! Nos vemos el 28 de febrero 🎉",
        });

        setTimeout(() => {
          setShowRSVPModal(false);
          setRsvpForm({
            attending: "si",
            adultsCount: "1",
            adults: [{ name: "", allergies: "", menu: "carne" }],
            childrenCount: "0",
          });
          setSubmitStatus({ type: "", message: "" });
        }, 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Error de API:", errorData);

        setSubmitStatus({
          type: "error",
          message: errorData.message || "Hubo un problema. Intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
      setSubmitStatus({
        type: "error",
        message: "No se pudo conectar. Verifica tu conexión.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <circle cx="100" cy="50" r="15" fill="#e8d5c4" opacity="0.4" />
        <circle cx="100" cy="50" r="10" fill="#d4b5a0" opacity="0.5" />
        <circle cx="95" cy="48" r="8" fill="#c4b5a0" opacity="0.4" />
        <circle cx="105" cy="48" r="8" fill="#c4b5a0" opacity="0.4" />
        <path
          d="M85 55 Q75 65 65 70"
          stroke="#a89080"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <ellipse
          cx="60"
          cy="68"
          rx="6"
          ry="10"
          fill="#d4c4b0"
          opacity="0.4"
          transform="rotate(-30 60 68)"
        />
        <ellipse
          cx="70"
          cy="62"
          rx="5"
          ry="8"
          fill="#c4b5a0"
          opacity="0.4"
          transform="rotate(-20 70 62)"
        />
        <ellipse
          cx="80"
          cy="58"
          rx="4"
          ry="7"
          fill="#b5a090"
          opacity="0.3"
          transform="rotate(-15 80 58)"
        />
        <path
          d="M115 55 Q125 65 135 70"
          stroke="#a89080"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />
        <ellipse
          cx="140"
          cy="68"
          rx="6"
          ry="10"
          fill="#d4c4b0"
          opacity="0.4"
          transform="rotate(30 140 68)"
        />
        <ellipse
          cx="130"
          cy="62"
          rx="5"
          ry="8"
          fill="#c4b5a0"
          opacity="0.4"
          transform="rotate(20 130 62)"
        />
        <ellipse
          cx="120"
          cy="58"
          rx="4"
          ry="7"
          fill="#b5a090"
          opacity="0.3"
          transform="rotate(15 120 58)"
        />
        <ellipse
          cx="50"
          cy="75"
          rx="4"
          ry="6"
          fill="#9d8b7a"
          opacity="0.25"
          transform="rotate(-45 50 75)"
        />
        <ellipse
          cx="150"
          cy="75"
          rx="4"
          ry="6"
          fill="#9d8b7a"
          opacity="0.25"
          transform="rotate(45 150 75)"
        />
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
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            background: `rgba(${218 + Math.random() * 20}, ${165 + Math.random() * 30
              }, ${32 + Math.random() * 20}, ${0.2 + Math.random() * 0.3})`,
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 2 + "s",
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

        <div
          className="min-h-screen flex items-center justify-center p-4 sm:p-6"
          style={{
            background:
              "linear-gradient(135deg, #f5f1ed 0%, #ebe5df 50%, #f5f1ed 100%)",
          }}
        >
          <div
            onClick={() => setIsOpened(true)}
            className="relative max-w-md w-full bg-white overflow-hidden cursor-pointer transform transition-all duration-700 hover:scale-105"
            style={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              borderRadius: "8px",
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
              }}
            ></div>

            <GoldenConfetti />

            <div className="relative px-6 py-10 sm:px-12 sm:py-16 text-center">
              <div className="mb-6 sm:mb-8">
                <FloralTop />
              </div>

              <div className="mb-6 sm:mb-8">
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl mb-2 tracking-wide"
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    color: "#8b6f47",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  Naydelin
                </h1>

                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl tracking-wide"
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    color: "#8b6f47",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  &
                </h1>

                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl tracking-wide"
                  style={{
                    fontFamily: "'Alex Brush', cursive",
                    color: "#8b6f47",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  Emmanuel
                </h1>
              </div>

              <div
                className="mb-8 sm:mb-12"
                style={{ transform: "rotate(180deg)" }}
              >
                <FloralTop />
              </div>

              <div className="mt-6 sm:mt-8">
                <p
                  className="text-base sm:text-lg mb-2"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "#6b5d52",
                    fontWeight: "300",
                  }}
                >
                  Tenemos una noticia...
                </p>
                <p
                  className="text-xl sm:text-2xl font-semibold animate-pulse"
                  style={{
                    color: "#b8860b",
                    fontFamily: "'Cormorant', serif",
                  }}
                >
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

      {/* ============================================
          MODAL DE RSVP CON INTEGRACIÓN A LA API
          ============================================ */}
      {showRSVPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            }}
          >
            {/* Header del modal con borde inferior */}
            <div
              className="sticky top-0 bg-white rounded-t-2xl border-b-2 px-6 py-5"
              style={{
                borderColor: "#e8d5c4",
              }}
            >
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl sm:text-3xl font-bold"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "#8b6f47",
                  }}
                >
                  Confirmar Asistencia
                </h2>
                <button
                  onClick={() => {
                    setShowRSVPModal(false);
                    setSubmitStatus({ type: "", message: "" });
                  }}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-red-50"
                  style={{
                    color: "#8b6f47",
                    border: "2px solid #e8d5c4",
                  }}
                  aria-label="Cerrar modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 sm:p-8">
              {/* Mensaje de estado (éxito o error) */}
              {submitStatus.message && (
                <div
                  className={`mb-6 p-4 rounded-lg ${submitStatus.type === "success"
                    ? "bg-green-50 border-2 border-green-200"
                    : "bg-red-50 border-2 border-red-200"
                    }`}
                >
                  <p
                    className={`text-sm sm:text-base font-semibold ${submitStatus.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                      }`}
                    style={{
                      fontFamily: "'Crimson Text', serif",
                    }}
                  >
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmitRSVP} className="space-y-6">
                {/* ¿Asistirás? */}
                <div>
                  <label
                    className="block text-lg font-bold mb-4"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "#8b6f47",
                    }}
                  >
                    ¿Asistirás?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${rsvpForm.attending === "si"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-white hover:border-green-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="si"
                        checked={rsvpForm.attending === "si"}
                        onChange={(e) =>
                          setRsvpForm({
                            ...rsvpForm,
                            attending: e.target.value,
                          })
                        }
                        className="absolute opacity-0"
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${rsvpForm.attending === "si"
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                            }`}
                        >
                          {rsvpForm.attending === "si" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span
                          className={`text-base font-semibold ${rsvpForm.attending === "si"
                            ? "text-green-700"
                            : "text-gray-600"
                            }`}
                          style={{ fontFamily: "'Crimson Text', serif" }}
                        >
                          Sí
                        </span>
                      </div>
                    </label>

                    <label
                      className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${rsvpForm.attending === "no"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:border-red-300"
                        }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={rsvpForm.attending === "no"}
                        onChange={(e) =>
                          setRsvpForm({
                            ...rsvpForm,
                            attending: e.target.value,
                          })
                        }
                        className="absolute opacity-0"
                      />
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${rsvpForm.attending === "no"
                            ? "border-red-500 bg-red-500"
                            : "border-gray-300"
                            }`}
                        >
                          {rsvpForm.attending === "no" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span
                          className={`text-base font-semibold ${rsvpForm.attending === "no"
                            ? "text-red-700"
                            : "text-gray-600"
                            }`}
                          style={{ fontFamily: "'Crimson Text', serif" }}
                        >
                          No
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Campos condicionales si asiste */}
                {rsvpForm.attending === "si" && (
                  <>
                    {/* Número de adultos */}
                    <div>
                      <label
                        className="block text-base font-bold mb-3"
                        style={{
                          fontFamily: "'Cormorant', serif",
                          color: "#8b6f47",
                        }}
                      >
                        Número de adultos
                      </label>
                      <select
                        value={rsvpForm.adultsCount}
                        onChange={(e) =>
                          handleAdultsCountChange(e.target.value)
                        }
                        className="w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          fontSize: "16px",
                          borderColor: "#e8d5c4",
                          backgroundColor: "white",
                          color: "#6b5d52",
                        }}
                        required
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "adulto" : "adultos"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Nombres de adultos */}
                    {rsvpForm.adults.map((adult, index) => (
                      <div
                        key={index}
                        className="p-5 rounded-xl border-2 shadow-sm"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#e8d5c4",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                            style={{
                              background:
                                "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                              fontFamily: "'Cormorant', serif",
                              fontSize: "14px",
                            }}
                          >
                            {index + 1}
                          </div>
                          <h4
                            className="text-lg font-bold"
                            style={{
                              fontFamily: "'Cormorant', serif",
                              color: "#8b6f47",
                            }}
                          >
                            Adulto {index + 1}
                          </h4>
                        </div>

                        <div>
                          <label
                            className="block text-sm font-semibold mb-2"
                            style={{
                              fontFamily: "'Crimson Text', serif",
                              color: "#6b5d52",
                            }}
                          >
                            Nombre y apellido
                          </label>
                          <input
                            type="text"
                            value={adult.name}
                            onChange={(e) =>
                              handleAdultChange(index, "name", e.target.value)
                            }
                            placeholder="Nombre completo"
                            className="w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                            style={{
                              fontFamily: "'Crimson Text', serif",
                              fontSize: "16px",
                              borderColor: "#e8d5c4",
                              backgroundColor: "#f9fafb",
                              color: "#6b5d52",
                            }}
                            required
                          />
                        </div>
                      </div>
                    ))}

                    {/* Número de niños */}
                    <div>
                      <label
                        className="block text-base font-bold mb-3"
                        style={{
                          fontFamily: "'Cormorant', serif",
                          color: "#8b6f47",
                        }}
                      >
                        Número de niños
                      </label>
                      <select
                        value={rsvpForm.childrenCount}
                        onChange={(e) =>
                          setRsvpForm({
                            ...rsvpForm,
                            childrenCount: e.target.value,
                          })
                        }
                        className="w-full p-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          fontSize: "16px",
                          borderColor: "#e8d5c4",
                          backgroundColor: "white",
                          color: "#6b5d52",
                        }}
                      >
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num === 0
                              ? "Sin niños"
                              : `${num} ${num === 1 ? "niño" : "niños"}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {/* Botón de envío mejorado */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${isSubmitting
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
                      }`}
                    style={{
                      background: isSubmitting
                        ? "linear-gradient(135deg, #9b8b7a 0%, #8b7b6a 100%)"
                        : "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                      fontFamily: "'Cormorant', serif",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Enviando tu confirmación...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2.5"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>CONFIRMAR ASISTENCIA</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(135deg, #f5f1ed 0%, #ebe5df 50%, #f5f1ed 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto bg-white shadow-2xl relative">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundSize: "150px 150px",
            }}
          ></div>

          <GoldenConfetti />

          {/* Header with couple photo */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&h=600&fit=crop"
              alt="Naydelin y Emmanuel"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floral decoration under photo */}
          <div className="relative -mt-12 sm:-mt-16 z-20">
            <FloralTop />
          </div>

          {/* Names */}
          <div className="text-center px-4 sm:px-8 pb-4 pt-2 relative z-20">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl mb-2"
              style={{
                fontFamily: "'Alex Brush', cursive",
                color: "#8b6f47",
              }}
            >
              Naydelin & Emmanuel
            </h1>
          </div>

          {/* Main content */}
          <div className="relative px-4 sm:px-8 md:px-16 pb-12 sm:pb-16">
            {/* Welcome message */}
            <div className="text-center mb-10 sm:mb-12 mt-6 sm:mt-8">
              <p
                className="text-base sm:text-lg md:text-xl leading-relaxed px-2"
                style={{
                  fontFamily: "'Cormorant', serif",
                  color: "#6b5d52",
                  fontWeight: "300",
                }}
              >
                Con la bendición de Dios y la alegría en nuestros corazones,
                <br className="hidden sm:inline" />
                <span className="inline sm:hidden"> </span>
                queremos compartir contigo el día más especial de nuestras vidas
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center my-8 sm:my-12">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                className="mx-3 sm:mx-4"
              >
                <circle cx="15" cy="15" r="3" fill="#c4b5a0" opacity="0.5" />
                <circle
                  cx="15"
                  cy="15"
                  r="6"
                  fill="none"
                  stroke="#c4b5a0"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </svg>
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
            </div>

            {/* Ceremony details */}
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl mb-6 sm:mb-8"
                style={{
                  fontFamily: "'Cormorant', serif",
                  color: "#8b6f47",
                  fontWeight: "500",
                }}
              >
                Ceremonia de Bodas
              </h2>

              <div className="space-y-3 sm:space-y-4 max-w-md mx-auto px-4">
                <div
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: window.innerWidth < 640 ? "16px" : "18px",
                    color: "#6b5d52",
                  }}
                >
                  <p className="mb-2">Sabado, 28 de Febrero de 2026</p>
                  <p className="mb-4 sm:mb-6">1:00 PM</p>
                </div>

                <div className="pt-2">
                  <p
                    className="text-base sm:text-lg font-semibold mb-1"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "#8b6f47",
                    }}
                  >
                    Iglesia San Francisco de Asís
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      color: "#9b8b7a",
                    }}
                  >
                    94160, Hidalgo 35, Chocaman, Chocamán, Ver.
                  </p>
                </div>
              </div>
            </div>

            {/* Padrinos de Velación */}
            <div className="mb-12 px-4 sm:px-0">
              <div className="text-center mb-8">
                <div className="mb-4">
                  <FloralTop />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-3"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "#8b6f47",
                  }}
                >
                  Padrinos de Velación
                </h2>
                <p
                  className="text-base sm:text-lg mb-6"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    color: "#6b5d52",
                  }}
                >
                  Con mucho cariño nos acompañan
                </p>
              </div>

              {/* Nombres de los padrinos - SIN cuadro */}
              <div className="text-center space-y-6">
                <div>
                  <p
                    className="text-4xl sm:text-5xl mb-2"
                    style={{
                      fontFamily: "'Alex Brush', cursive",
                      color: "#8b6f47",
                    }}
                  >
                    J. Ramiro Pimentel Flores
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 py-3">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-700"></div>
                  <span
                    className="text-2xl"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "#8b6f47",
                    }}
                  >
                    &
                  </span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-700"></div>
                </div>

                <div>
                  <p
                    className="text-4xl sm:text-5xl"
                    style={{
                      fontFamily: "'Alex Brush', cursive",
                      color: "#8b6f47",
                    }}
                  >
                    Rosario Baigen Juarez
                  </p>
                </div>

                {/* Mensaje adicional */}
                <div className="mt-10 pt-6">
                  <p
                    className="text-center text-base sm:text-lg italic"
                    style={{
                      fontFamily: "'Alex Brush', cursive",
                      color: "#9b8b7a",
                      fontSize: "1.5rem",
                    }}
                  >
                    "Gracias por acompañarnos en este momento tan especial"
                  </p>
                </div>
              </div>
            </div>

            {/* Leaf divider */}
            <div className="flex justify-center my-8 sm:my-12">
              <svg
                width="80"
                height="30"
                viewBox="0 0 80 30"
                fill="none"
                className="max-w-full"
              >
                <path
                  d="M10 15 Q25 8 40 15 Q55 22 70 15"
                  stroke="#c4b5a0"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
                <ellipse
                  cx="20"
                  cy="12"
                  rx="3"
                  ry="5"
                  fill="#d4c4b0"
                  opacity="0.3"
                  transform="rotate(-30 20 12)"
                />
                <ellipse
                  cx="40"
                  cy="18"
                  rx="3"
                  ry="5"
                  fill="#d4c4b0"
                  opacity="0.3"
                  transform="rotate(30 40 18)"
                />
                <ellipse
                  cx="60"
                  cy="12"
                  rx="3"
                  ry="5"
                  fill="#d4c4b0"
                  opacity="0.3"
                  transform="rotate(-30 60 12)"
                />
              </svg>
            </div>

            {/* Reception details */}
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-2xl sm:text-3xl mb-6 sm:mb-8"
                style={{
                  fontFamily: "'Cormorant', serif",
                  color: "#8b6f47",
                  fontWeight: "500",
                }}
              >
                Recepción
              </h2>

              <div className="space-y-3 sm:space-y-4 max-w-md mx-auto px-4">
                <div
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: window.innerWidth < 640 ? "16px" : "18px",
                    color: "#6b5d52",
                  }}
                >
                  <p className="mb-4 sm:mb-6">15:00 PM</p>
                </div>

                <div className="pt-2">
                  <p
                    className="text-base sm:text-lg font-semibold mb-1"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "#8b6f47",
                    }}
                  >
                    Salón Social Tlachinoltepetl
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      color: "#9b8b7a",
                    }}
                  >
                    Guerrero, Chocaman, 94160 Chocamán, Ver.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal message box */}
            <div
              className="mb-12 sm:mb-16 p-6 sm:p-8 border border-stone-200 rounded mx-2 sm:mx-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(245,241,237,0.3))",
              }}
            >
              <p
                className="text-center leading-relaxed italic text-sm sm:text-base md:text-lg"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  color: "#6b5d52",
                }}
              >
                "Queremos que seas parte de este momento tan especial en
                nuestras vidas. Tu presencia hará que este día sea aún más
                memorable y lleno de amor. Esperamos celebrar junto a ti el
                inicio de nuestra vida juntos."
              </p>
              <p
                className="text-center mt-4 sm:mt-6 text-xl sm:text-2xl"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  color: "#8b6f47",
                }}
              >
                Con amor, Naydelin & Emmanuel
              </p>
            </div>

            {/* Itinerary */}
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2
                className="text-2xl sm:text-3xl mb-6 sm:mb-8"
                style={{
                  fontFamily: "'Cormorant', serif",
                  color: "#8b6f47",
                  fontWeight: "500",
                }}
              >
                Itinerario
              </h2>

              <div
                className="max-w-md mx-auto space-y-3 sm:space-y-4 text-sm sm:text-base"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  color: "#6b5d52",
                }}
              >
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>13:00 h</span>
                  <span>Ceremonia</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>15:00 h</span>
                  <span>Recepción</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>17:00 h</span>
                  <span>Entrega de regalos</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 px-2 sm:px-0">
                  <span>18:00 h</span>
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
              <h2
                className="text-2xl sm:text-3xl mb-4 sm:mb-6"
                style={{
                  fontFamily: "'Cormorant', serif",
                  color: "#8b6f47",
                  fontWeight: "500",
                }}
              >
                Confirma tu Asistencia
              </h2>

              {/* RSVP Form Instructions */}
              <div
                className="p-6 rounded-xl border-2 mb-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,241,237,0.7) 100%)",
                  borderColor: "#e8d5c4",
                }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d="M12 20v-6"></path>
                    <path d="M6 12h12"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>

                <h3
                  className="text-lg sm:text-xl font-bold text-center mb-4"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "#8b6f47",
                  }}
                >
                  ¿Cómo llenar correctamente el formulario?
                </h3>

                <ol
                  className="space-y-4 text-sm sm:text-base text-left"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    color: "#6b5d52",
                  }}
                >
                  <li className="flex gap-2">
                    <span
                      className="font-bold min-w-[20px]"
                      style={{ color: "#8b6f47" }}
                    >
                      1.
                    </span>
                    <span>
                      Selecciona si <strong>asistirás</strong> o{" "}
                      <strong>no asistirás</strong> al evento. Si eliges “No”,
                      el formulario se completará automáticamente.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span
                      className="font-bold min-w-[20px]"
                      style={{ color: "#8b6f47" }}
                    >
                      2.
                    </span>
                    <span>
                      En <strong>Número de adultos</strong>, selecciona cuántas
                      personas adultas asistirán contigo. El formulario generará
                      un campo para cada adulto.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span
                      className="font-bold min-w-[20px]"
                      style={{ color: "#8b6f47" }}
                    >
                      3.
                    </span>
                    <span>
                      Escribe el <strong>nombre y apellido completo</strong> de
                      cada adulto que hayas seleccionado. Asegúrate de que estén
                      escritos correctamente para tu registro.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span
                      className="font-bold min-w-[20px]"
                      style={{ color: "#8b6f47" }}
                    >
                      4.
                    </span>
                    <span>
                      En <strong>Número de niños</strong>, selecciona si
                      asistirán menores y cuántos. Si se elige una cantidad,
                      aparecerán los campos correspondientes.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span
                      className="font-bold min-w-[20px]"
                      style={{ color: "#8b6f47" }}
                    >
                      5.
                    </span>
                    <span>
                      Revisa que toda la información esté correcta y finalmente
                      presiona
                      <strong> “Confirmar Asistencia”</strong>.
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span
                      className="font-bold min-w-[20px]"
                      style={{ color: "#8b6f47" }}
                    >
                      6.
                    </span>
                    <span>
                      Una vez enviado, tu registro quedará guardado y nos
                      ayudará a organizar todos los detalles del evento.
                      ¡Gracias por confirmar!
                    </span>
                  </li>
                </ol>
              </div>
              <p
                className="mb-4 sm:mb-6 text-sm sm:text-base"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  color: "#6b5d52",
                }}
              >
                Por favor, confírmanos antes del 15 de Febrero
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowRSVPModal(true)}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3 rounded-full transition-all transform hover:scale-105 text-sm sm:text-base shadow-lg"
                  style={{
                    background: "#8b6f47",
                    color: "white",
                    fontFamily: "'Crimson Text', serif",
                  }}
                >
                  <span>✉️</span>
                  <span>Confirmar Asistencia</span>
                </button>
              </div>
            </div>

            <div className="App">
              <LocationMaps />
            </div>
            {/* Sección de Sobres de Regalo - BOTÓN */}
            <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
              <div className="mb-6">
                <FloralTop />
              </div>
              <button
                onClick={() => setShowGiftModal(true)}
                className="px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                  color: "white",
                  fontFamily: "'Cormorant', serif",
                  boxShadow: "0 10px 30px rgba(139, 111, 71, 0.3)",
                }}
              >
                🎁 Sobres de Regalo 🎁
              </button>
            </div>

            {/* MODAL de Sobres de Regalo */}
            {showGiftModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Header del modal */}
                  <div
                    className="sticky top-0 bg-white rounded-t-2xl border-b-2 px-6 py-5"
                    style={{
                      borderColor: "#e8d5c4",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h2
                        className="text-2xl sm:text-3xl font-bold"
                        style={{
                          fontFamily: "'Cormorant', serif",
                          color: "#8b6f47",
                        }}
                      >
                        🎁 Sobres de Regalo
                      </h2>
                      <button
                        onClick={() => setShowGiftModal(false)}
                        className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-red-50"
                        style={{
                          color: "#8b6f47",
                          border: "2px solid #e8d5c4",
                        }}
                        aria-label="Cerrar modal"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Contenido del modal */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Banner divertido */}
                    <div
                      className="p-6 rounded-2xl shadow-md"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 235, 205, 0.5) 0%, rgba(250, 224, 193, 0.4) 100%)",
                        border: "2px solid #e8d5c4",
                      }}
                    >
                      <div className="text-center space-y-4">
                        <div className="text-5xl mb-3">🎁</div>
                        <p
                          className="text-lg sm:text-xl font-bold mb-3"
                          style={{
                            fontFamily: "'Cormorant', serif",
                            color: "#8b6f47",
                          }}
                        >
                          ¡Tu presencia es el mejor regalo!
                        </p>
                        <p
                          className="text-base sm:text-lg leading-relaxed"
                          style={{
                            fontFamily: "'Crimson Text', serif",
                            color: "#6b5d52",
                          }}
                        >
                          <strong>Seamos honestos:</strong> lo que más queremos
                          es verte ahí con tu mejor baile 💃🕺. Pero si insistes
                          en darnos algo (y no te vamos a detener 😏),
                          preferimos cosas que nos sirvan para nuestra vida
                          juntos. Ya sabes, esas cosas aburridas de adultos como
                          sartenes, toallas o... ¡dinero! (sí, dijimos lo que
                          todos pensamos 💰). Los regalos son{" "}
                          <strong>100% opcionales</strong>, en serio. Pero si te
                          late la idea, aquí abajo está nuestra cuenta bancaria.
                          ¡No hay presión! 😊
                        </p>
                      </div>
                    </div>

                    {/* Tarjeta de cuenta bancaria */}
                    <div
                      className="p-6 sm:p-8 rounded-2xl shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #002D72 0%, #004B93 100%)",
                      }}
                    >
                      <div className="space-y-5">
                        {/* Logo/Título BBVA */}
                        <div className="text-center pb-4 border-b border-white/20">
                          <p
                            className="text-2xl sm:text-3xl font-bold text-white mb-1"
                            style={{
                              fontFamily: "'Cormorant', serif",
                              letterSpacing: "2px",
                            }}
                          >
                            BBVA
                          </p>
                          <p
                            className="text-sm text-white/80"
                            style={{
                              fontFamily: "'Crimson Text', serif",
                            }}
                          >
                            Transferencia Bancaria
                          </p>
                        </div>

                        {/* Datos de la cuenta */}
                        <div className="space-y-4">
                          {/* CLABE */}
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <p
                              className="text-xs sm:text-sm text-white/70 mb-2"
                              style={{
                                fontFamily: "'Crimson Text', serif",
                              }}
                            >
                              CLABE Interbancaria
                            </p>
                            <p
                              className="text-xl sm:text-2xl font-bold text-white tracking-wider"
                              style={{
                                fontFamily: "'Courier New', monospace",
                              }}
                            >
                              012 180 01587466419 3
                            </p>
                          </div>

                          {/* Información adicional */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                              <p
                                className="text-xs text-white/70 mb-1"
                                style={{
                                  fontFamily: "'Crimson Text', serif",
                                }}
                              >
                                Banco
                              </p>
                              <p
                                className="text-sm sm:text-base font-semibold text-white"
                                style={{
                                  fontFamily: "'Crimson Text', serif",
                                }}
                              >
                                BBVA México
                              </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                              <p
                                className="text-xs text-white/70 mb-1"
                                style={{
                                  fontFamily: "'Crimson Text', serif",
                                }}
                              >
                                Beneficiario
                              </p>
                              <p
                                className="text-sm sm:text-base font-semibold text-white"
                                style={{
                                  fontFamily: "'Crimson Text', serif",
                                }}
                              >
                                Naydelin Baijen Jarillo
                              </p>
                            </div>
                          </div>

                          {/* Botón para copiar */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                "012180015586754304"
                              );
                              alert("¡CLABE copiada al portapapeles! 💰");
                            }}
                            className="w-full py-3 px-4 rounded-xl font-semibold text-white transition-all hover:scale-105 active:scale-95"
                            style={{
                              background: "rgba(255, 255, 255, 0.15)",
                              border: "2px solid rgba(255, 255, 255, 0.3)",
                              fontFamily: "'Crimson Text', serif",
                              backdropFilter: "blur(10px)",
                            }}
                          >
                            📋 Copiar CLABE
                          </button>
                        </div>

                        {/* Nota adicional */}
                        <div className="pt-4 border-t border-white/20">
                          <p
                            className="text-xs sm:text-sm text-center text-white/70 italic"
                            style={{
                              fontFamily: "'Crimson Text', serif",
                            }}
                          >
                            También puedes entregar tu sobre el día de la boda
                            💝
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mensaje final */}
                    <div className="text-center p-4">
                      <p
                        className="text-sm sm:text-base italic"
                        style={{
                          fontFamily: "'Alex Brush', cursive",
                          color: "#9b8b7a",
                          fontSize: "1.3rem",
                        }}
                      >
                        "Lo que realmente nos importa es compartir este momento
                        contigo"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Photo sharing section - Diseño mejorado */}
            <div className="mb-12 sm:mb-16 px-2 sm:px-0">
              <div
                className="relative overflow-hidden rounded-2xl border-2 p-8 sm:p-12"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,241,237,0.9) 50%, rgba(255,255,255,0.95) 100%)",
                  borderColor: "#e8d5c4",
                  boxShadow: "0 10px 40px rgba(139, 111, 71, 0.1)",
                }}
              >
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
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 animate-pulse"
                      style={{
                        background:
                          "linear-gradient(135deg, #f5f1ed 0%, #e8d5c4 100%)",
                        boxShadow: "0 4px 15px rgba(139, 111, 71, 0.2)",
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#8b6f47"
                        strokeWidth="2"
                        className="sm:w-10 sm:h-10"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl mb-3"
                      style={{
                        fontFamily: "'Cormorant', serif",
                        color: "#8b6f47",
                        fontWeight: "500",
                      }}
                    >
                      Comparte tus Fotos
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    className="mb-8 text-sm sm:text-base leading-relaxed px-2 max-w-2xl mx-auto"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      color: "#6b5d52",
                    }}
                  >
                    Escanea el siguiente QR o haz clic en él y comparte las
                    fotos que tomes durante la boda.
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
                        <div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: "white",
                            boxShadow: "0 8px 30px rgba(139, 111, 71, 0.15)",
                            transform: "rotate(-2deg)",
                          }}
                        ></div>

                        {/* QR Code */}
                        <a
                          href=""
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <div className="relative w-48 h-48 sm:w-56 sm:h-56 transition-all duration-300 group-hover:scale-105">
                            {/* QR Background with shadow */}
                            <div
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                background: "white",
                                boxShadow:
                                  "0 8px 30px rgba(139, 111, 71, 0.15)",
                                transform: "rotate(-2deg)",
                              }}
                            ></div>

                            {/* QR Container */}
                            <div
                              className="relative w-full h-full rounded-2xl p-4 cursor-pointer border-2 transition-all duration-300 group-hover:border-amber-400"
                              style={{
                                background: "white",
                                borderColor: "#e8d5c4",
                                boxShadow: "0 4px 20px rgba(139, 111, 71, 0.1)",
                              }}
                            >
                              {/* IMAGEN DEL QR - Reemplaza la ruta con tu imagen */}
                              <img
                                src="https://pub-81bfb9260e2a480aa554ab719e15c0d9.r2.dev/qr.jpg"
                                alt="QR Code para compartir fotos"
                                className="w-full h-full object-contain rounded-xl"
                              />

                              {/* Corner decorations */}
                              <div
                                className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl"
                                style={{ borderColor: "#d4c4b0" }}
                              ></div>
                              <div
                                className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr"
                                style={{ borderColor: "#d4c4b0" }}
                              ></div>
                              <div
                                className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl"
                                style={{ borderColor: "#d4c4b0" }}
                              ></div>
                              <div
                                className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 rounded-br"
                                style={{ borderColor: "#d4c4b0" }}
                              ></div>
                            </div>

                            {/* Floating elements */}
                            <div
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-bounce"
                              style={{
                                background:
                                  "linear-gradient(135deg, #daa520 0%, #b8860b 100%)",
                                animationDuration: "3s",
                              }}
                            ></div>
                          </div>
                        </a>

                        {/* Floating elements */}
                        <div
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-bounce"
                          style={{
                            background:
                              "linear-gradient(135deg, #daa520 0%, #b8860b 100%)",
                            animationDuration: "3s",
                          }}
                        ></div>
                      </div>
                    </a>

                    {/* Code Section */}
                    <div className="flex flex-col items-center md:items-start">
                      <div
                        className="p-6 rounded-xl border-2 inline-block"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,241,237,0.6) 100%)",
                          borderColor: "#e8d5c4",
                          boxShadow: "0 4px 15px rgba(139, 111, 71, 0.08)",
                        }}
                      >
                        <p
                          className="text-xs mb-3 uppercase tracking-wider"
                          style={{
                            fontFamily: "'Crimson Text', serif",
                            color: "#9b8b7a",
                            fontWeight: "600",
                          }}
                        >
                          Código del álbum
                        </p>
                        <div className="flex items-center gap-3 mb-4">
                          <p
                            className="text-2xl sm:text-3xl font-mono font-bold tracking-wider"
                            style={{
                              color: "#8b6f47",
                              textShadow: "2px 2px 4px rgba(139, 111, 71, 0.1)",
                            }}
                          >
                            ES69a9d35b
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("ES69a9d35b");
                            alert("✅ ¡Código copiado al portapapeles!");
                          }}
                          className="w-full px-4 py-2.5 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 text-sm font-medium"
                          style={{
                            background:
                              "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                            color: "white",
                            fontFamily: "'Crimson Text', serif",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          <span>Copiar código</span>
                        </button>
                      </div>

                      {/* Instructions */}
                      <div className="mt-4 text-center md:text-left max-w-xs">
                        <p
                          className="text-xs italic leading-relaxed"
                          style={{
                            fontFamily: "'Crimson Text', serif",
                            color: "#9b8b7a",
                          }}
                        >
                          También puedes ingresar este código manualmente en tu
                          aplicación de fotos
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
                  <p
                    className="text-base sm:text-lg font-semibold mb-2"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "#8b6f47",
                    }}
                  >
                    ¡Nos hará muchísima ilusión verlas!
                  </p>
                  <p
                    className="text-xs sm:text-sm italic mb-6"
                    style={{
                      fontFamily: "'Crimson Text', serif",
                      color: "#9b8b7a",
                    }}
                  >
                    Tus fotos harán este recuerdo aún más especial 💕
                  </p>

                  {/* Instructions Section */}
                  <div className="mt-8 max-w-2xl mx-auto">
                    <h3
                      className="text-xl sm:text-2xl font-semibold mb-6 text-center"
                      style={{
                        fontFamily: "'Cormorant', serif",
                        color: "#8b6f47",
                      }}
                    >
                      ¿Cómo subir tus fotos?
                    </h3>

                    {/* Two column layout for methods */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Method 1: QR Code */}
                      <div
                        className="p-6 rounded-xl border-2"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,241,237,0.7) 100%)",
                          borderColor: "#e8d5c4",
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
                          style={{
                            background:
                              "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                          >
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                          </svg>
                        </div>
                        <h4
                          className="text-base font-bold mb-3 text-center"
                          style={{
                            fontFamily: "'Cormorant', serif",
                            color: "#8b6f47",
                          }}
                        >
                          Opción 1: Usando el QR
                        </h4>
                        <ol
                          className="space-y-2 text-left text-sm"
                          style={{
                            fontFamily: "'Crimson Text', serif",
                            color: "#6b5d52",
                          }}
                        >
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              1.
                            </span>
                            <span>
                              Descarga la app <strong>WedShoots</strong> (gratis
                              en App Store o Google Play)
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              2.
                            </span>
                            <span>
                              Abre la cámara de tu celular y apunta al QR de
                              arriba
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              3.
                            </span>
                            <span>Toca la notificación que aparece</span>
                          </li>
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              4.
                            </span>
                            <span>
                              ¡Listo! Ahora puedes subir tus fotos desde la app
                            </span>
                          </li>
                        </ol>
                      </div>

                      {/* Method 2: Manual Code */}
                      <div
                        className="p-6 rounded-xl border-2"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,241,237,0.7) 100%)",
                          borderColor: "#e8d5c4",
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
                          style={{
                            background:
                              "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                          }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                        </div>
                        <h4
                          className="text-base font-bold mb-3 text-center"
                          style={{
                            fontFamily: "'Cormorant', serif",
                            color: "#8b6f47",
                          }}
                        >
                          Opción 2: Con el código
                        </h4>
                        <ol
                          className="space-y-2 text-left text-sm"
                          style={{
                            fontFamily: "'Crimson Text', serif",
                            color: "#6b5d52",
                          }}
                        >
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              1.
                            </span>
                            <span>
                              Descarga la app <strong>WedShoots</strong> (gratis
                              en App Store o Google Play)
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              2.
                            </span>
                            <span>
                              Abre la app y toca{" "}
                              <strong>"Join an Album"</strong>
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              3.
                            </span>
                            <span>
                              Ingresa el código: <strong>ES69a9d35b</strong>
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span
                              className="font-bold min-w-[20px]"
                              style={{ color: "#8b6f47" }}
                            >
                              4.
                            </span>
                            <span>
                              ¡Listo! Ahora puedes subir tus fotos desde la app
                            </span>
                          </li>
                        </ol>
                      </div>
                    </div>

                    {/* Additional tip */}
                    <div
                      className="p-4 rounded-lg border-2 text-center"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(218,165,32,0.05) 0%, rgba(184,134,11,0.03) 100%)",
                        borderColor: "#e8d5c4",
                      }}
                    >
                      <p
                        className="text-xs sm:text-sm leading-relaxed"
                        style={{
                          fontFamily: "'Crimson Text', serif",
                          color: "#6b5d52",
                        }}
                      >
                        💡 <span className="font-semibold">Tip:</span> Una vez
                        dentro del álbum, solo toca el botón{" "}
                        <strong>"+"</strong> o <strong>"Agregar fotos"</strong>{" "}
                        para compartir tus mejores momentos de la boda.
                      </p>
                    </div>
                  </div>
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
              <p
                className="text-xs sm:text-sm"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  color: "#9b8b7a",
                }}
              >

              </p>
            </div>

            {/* Footer con botón de contacto */}
            <div
              className="text-center pt-8 sm:pt-12 border-t px-4"
              style={{ borderColor: "#e8d5c4" }}
            >
              <div className="mb-4">
                <FloralTop />
              </div>
              <p
                className="text-xl sm:text-2xl mb-2"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  color: "#8b6f47",
                }}
              >
                Naydelin & Emmanuel
              </p>
              <p
                className="text-xs sm:text-sm"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  color: "#9b8b7a",
                }}
              >
                28 de Febrero, 2026
              </p>
              <p
                className="text-xs mt-4 sm:mt-6"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  color: "#b5a090",
                }}
              >
                Con todo nuestro amor ♥
              </p>

              {/* Divisor decorativo */}
              <div className="flex items-center justify-center my-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
                <div className="mx-3 text-stone-300">✦</div>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
              </div>

              {/* Botón de contacto */}
              {/* Botón de contacto - Opción 1: Elegante con brillo */}
              <div className="mt-8 mb-6 px-4">
                <p
                  className="text-sm sm:text-base mb-5 animate-pulse"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    color: "#9b8b7a",
                  }}
                >
                  ¿Te gustó esta invitación digital?
                </p>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="group relative w-full sm:w-auto sm:min-w-[280px] px-8 py-4 rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-base sm:text-lg font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #8b6f47 0%, #6d5838 50%, #8b6f47 100%)',
                    backgroundSize: '200% 100%',
                    color: 'white',
                    fontFamily: "'Crimson Text', serif",
                    boxShadow: '0 10px 30px rgba(139, 111, 71, 0.4)'
                  }}
                >
                  {/* Efecto de brillo animado */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                    style={{
                      transform: 'translateX(-100%)',
                      animation: 'shine 3s infinite'
                    }}></span>

                  {/* Contenido del botón */}
                  <span className="relative flex items-center justify-center space-x-3">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-12 transition-transform duration-300">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="tracking-wide">Solicita la Tuya Aquí</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </span>
                </button>

                <p
                  className="text-xs sm:text-sm mt-4 italic leading-relaxed px-2"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    color: "#b5a090",
                  }}
                >
                  ✨ Creamos invitaciones digitales personalizadas para tu evento especial
                </p>
              </div>

              {/* Agregar este estilo en el <head> o en index.css */}
              <style>{`
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`}</style>



            </div>

            {/* Contact Modal */}
            <ContactModal
              isOpen={showContactModal}
              onClose={() => setShowContactModal(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
