import React, { useState } from 'react';
import { X, Image, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface ScreenshotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  onContactClick?: () => void;
}

const ScreenshotsModal: React.FC<ScreenshotsModalProps> = ({ isOpen, onClose, appName, onContactClick }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define screenshots for each app
  const appScreenshots: { [key: string]: string[] } = {
    'Mwenhu': [
      '/start.jpg',
      '/Geo Muenho Triagem.jpg',
      '/Geo Muenho Triagem 4.jpg',
      '/Geo Muenho Caminho.jpg'
    ],
    'Okwenda': [
      '/Okwenda 1.jpeg',
      '/Okwenda 2.jpeg',
      '/Okwenda 3.jpeg',
      '/Okwenda 4.jpeg',
      '/Okwenda 5.jpeg'
    ],
    'Kelesa Klean': [
      '/kelesa 1.png',
      '/kelesa 2.png',
      '/kelesa 3.png'
    ]
  };

  const screenshots = appScreenshots[appName] || [];
  const hasScreenshots = screenshots.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleContactClick = () => {
    onClose();
    if (onContactClick) {
      onContactClick();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
        >
          <X size={24} className="text-white" />
        </button>

        {/* Content */}
        {hasScreenshots ? (
          <div className="w-full flex flex-col items-center justify-center">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3">
                {t.currentLanguage === 'pt' ? 'Screenshots' : 'Screenshots'} - {appName}
              </h3>
              <p className="text-white/80 text-lg">
                {t.currentLanguage === 'pt' 
                  ? `${currentImageIndex + 1} de ${screenshots.length}` 
                  : `${currentImageIndex + 1} of ${screenshots.length}`
                }
              </p>
            </div>

            {/* Image Display - Centered */}
            <div className="relative flex items-center justify-center w-full mb-8">
              <div 
                className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto"
                style={{ 
                  width: 'min(400px, 90vw)', 
                  aspectRatio: '9/16',
                  maxHeight: '70vh'
                }}
              >
                <img
                  src={screenshots[currentImageIndex]}
                  alt={`${appName} Screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain bg-gray-50"
                />
              </div>
              
              {/* Navigation Arrows - Outside the image */}
              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation - Centered */}
            {screenshots.length > 1 && (
              <div className="flex justify-center items-center space-x-3 mb-8 overflow-x-auto pb-2 px-4">
                {screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-blue-400 ring-2 ring-blue-300/50 scale-110' 
                        : 'border-white/30 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={screenshot}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons - Centered */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                {t.currentLanguage === 'pt' ? 'Fechar' : 'Close'}
              </button>
              <button
                onClick={handleContactClick}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {t.currentLanguage === 'pt' ? 'Contactar para Mais Info' : 'Contact for More Info'}
              </button>
            </div>
          </div>
        ) : (
          // No Screenshots Available - Centered
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-12 shadow-2xl max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
              <Camera size={48} className="text-gray-400" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {t.currentLanguage === 'pt' ? 'Screenshots' : 'Screenshots'} - {appName}
            </h3>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-8 w-full">
              <Image size={40} className="text-orange-500 mx-auto mb-4" />
              <p className="text-xl text-orange-800 font-medium mb-3">
                {t.currentLanguage === 'pt' 
                  ? 'Screenshots não disponíveis no momento' 
                  : 'Screenshots are not available at the moment'
                }
              </p>
              <p className="text-orange-700">
                {t.currentLanguage === 'pt' 
                  ? 'Estamos a trabalhar para disponibilizar as imagens da aplicação em breve. Entre em contacto connosco para mais informações sobre o projeto.' 
                  : 'We are working to make the application images available soon. Contact us for more information about the project.'
                }
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                {t.currentLanguage === 'pt' ? 'Fechar' : 'Close'}
              </button>
              <button
                onClick={handleContactClick}
                className="px-8 py-3 bg-gradient-to-r from-blue-700 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {t.currentLanguage === 'pt' ? 'Contactar para Mais Info' : 'Contact for More Info'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenshotsModal;