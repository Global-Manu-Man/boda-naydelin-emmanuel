import React from "react";
import { MapPin } from "lucide-react";

const LocationMaps = () => {
  return (
    <div className="mb-12 sm:mb-16 px-2 sm:px-0">
      <h2
        className="text-3xl sm:text-4xl text-center mb-8 sm:mb-12"
        style={{
          fontFamily: "'Cormorant', serif",
          color: "#8b6f47",
          fontWeight: "500",
        }}
      >
        ¿Cómo Llegar?
      </h2>

      {/* Decorative divider */}
      <div className="flex items-center justify-center mb-10 sm:mb-12">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        <MapPin className="w-6 h-6 mx-4" style={{ color: "#8b6f47" }} />
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
      </div>

      {/* Maps Container */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Ceremony Map */}
        <div
          className="rounded-2xl overflow-hidden shadow-xl border-2"
          style={{
            borderColor: "#e8d5c4",
            background: "white",
          }}
        >
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,241,237,0.9) 0%, rgba(232,213,196,0.6) 100%)",
            }}
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
              style={{
                background: "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
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
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3
              className="text-xl sm:text-2xl mb-2"
              style={{
                fontFamily: "'Cormorant', serif",
                color: "#8b6f47",
                fontWeight: "600",
              }}
            >
              Ceremonia Religiosa
            </h3>
            <p
              className="text-base font-semibold mb-1"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: "#6b5d52",
              }}
            >
              Iglesia San Francisco de Asís
            </p>
            <p
              className="text-sm mb-3"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: "#9b8b7a",
              }}
            >
              94160, Hidalgo 35, Chocaman, Chocamán, Ver.
            </p>
            <p
              className="text-sm font-medium"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: "#8b6f47",
              }}
            >
              📅 1:00 PM
            </p>
          </div>

          {/* Map */}
          <div className="relative h-64 sm:h-80 bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.205875566676!2d-97.03359732068984!3d19.010647676917454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c4e0e117a773a7%3A0x5349cb46978c5788!2sParroquia%20San%20Francisco%20de%20As%C3%ADs!5e0!3m2!1ses-419!2smx!4v1764391281258!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Ceremonia"
            ></iframe>
          </div>

          {/* Footer with button */}
          <div
            className="p-4 text-center"
            style={{
              background:
                "linear-gradient(to bottom, rgba(245,241,237,0.3), transparent)",
            }}
          >
            <a
              href="https://maps.app.goo.gl/HrYoNsCGY4TeSyUM9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all transform hover:scale-105 text-sm font-medium shadow-md"
              style={{
                background: "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                color: "white",
                fontFamily: "'Crimson Text', serif",
              }}
            >
              <MapPin className="w-4 h-4" />
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>

        {/* Reception Map */}
        <div
          className="rounded-2xl overflow-hidden shadow-xl border-2"
          style={{
            borderColor: "#e8d5c4",
            background: "white",
          }}
        >
          {/* Header */}
          <div
            className="p-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,241,237,0.9) 0%, rgba(232,213,196,0.6) 100%)",
            }}
          >
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
              style={{
                background: "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
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
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3
              className="text-xl sm:text-2xl mb-2"
              style={{
                fontFamily: "'Cormorant', serif",
                color: "#8b6f47",
                fontWeight: "600",
              }}
            >
              Recepción
            </h3>
            <p
              className="text-base font-semibold mb-1"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: "#6b5d52",
              }}
            >
              Salón Social Tlachinoltepetl
            </p>
            <p
              className="text-sm mb-3"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: "#9b8b7a",
              }}
            >
              Guerrero, Chocaman, 94160 Chocamán, Ver.
            </p>
            <p
              className="text-sm font-medium"
              style={{
                fontFamily: "'Crimson Text', serif",
                color: "#8b6f47",
              }}
            >
              📅 7:30 PM
            </p>
          </div>

          {/* Map */}
          <div className="relative h-64 sm:h-80 bg-stone-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.1688939344144!2d-97.0302500241711!3d19.01227795396862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c4e1007646aea3%3A0x3069ecbfd3006396!2sSal%C3%B3n%20Social%20Tlachinoltepetl!5e0!3m2!1ses-419!2smx!4v1767566411996!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Salón Social Tlachinoltepetl"
            ></iframe>
          </div>

          {/* Footer with button */}
          <div
            className="p-4 text-center"
            style={{
              background:
                "linear-gradient(to bottom, rgba(245,241,237,0.3), transparent)",
            }}
          >
            <a
              href="https://maps.app.goo.gl/pRV7TUAx9p7N3gqH6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all transform hover:scale-105 text-sm font-medium shadow-md"
              style={{
                background: "linear-gradient(135deg, #8b6f47 0%, #6d5838 100%)",
                color: "white",
                fontFamily: "'Crimson Text', serif",
              }}
            >
              <MapPin className="w-4 h-4" />
              <span>Abrir en Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-8 text-center max-w-2xl mx-auto px-4">
        <div
          className="p-6 rounded-xl border-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(245,241,237,0.6) 100%)",
            borderColor: "#e8d5c4",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'Crimson Text', serif",
              color: "#6b5d52",
            }}
          >
            💡 <span className="font-semibold">Tip:</span> Haz clic en "Abrir en
            Google Maps" para obtener direcciones desde tu ubicación actual. Te
            recomendamos salir con anticipación para evitar contratiempos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMaps;
