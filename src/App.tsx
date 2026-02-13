import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star, Award, Zap, Lock } from 'lucide-react';

export default function App() {
  const [noAttempts, setNoAttempts] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [noSize, setNoSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHappyCat, setShowHappyCat] = useState(false);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [catVisible, setCatVisible] = useState(false);
  const [catPosition, setCatPosition] = useState<'top' | 'left' | 'right'>('top');
  const [screenShake, setScreenShake] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [catMessage, setCatMessage] = useState('Non ci provare!');
  const [sweetMessages, setSweetMessages] = useState<Array<{ id: number; text: string; x: number; y: number }>>([]);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [showReasons, setShowReasons] = useState(false);
  const [fallingPetals, setFallingPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [heartClicks, setHeartClicks] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState('');
  const [bgIntensity, setBgIntensity] = useState(0);
  const [shockwaves, setShockwaves] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [randomMessages, setRandomMessages] = useState<Array<{ id: number; text: string; x: number; y: number; rotation: number }>>([]);
  const [comboCounter, setComboCounter] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [secretMessage, setSecretMessage] = useState('');
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [catAngerLevel, setCatAngerLevel] = useState(0);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [cornerHeartClicks, setCornerHeartClicks] = useState(0);
  const [showRiddle, setShowRiddle] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [riddleSolved, setRiddleSolved] = useState(false);
  const [riddleError, setRiddleError] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const particleIdRef = useRef(0);
  const messageIdRef = useRef(0);
  const shockwaveIdRef = useRef(0);
  const randomMessageIdRef = useRef(0);
  const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const catMessages = [
    'Non ci provare!',
    'Te lo sconsiglio!',
    'Davvero?',
    'Ancora?!',
    'Smettila!',
    'Ci rinunci?',
    'Impossibile!',
    'Mai!',
    'Sto perdendo la pazienza!',
    'BASTA!!!',
  ];

  const sweetPhrases = [
    '💕',
    'Ti amo',
    'Sei speciale',
    '✨',
    'Amore mio',
    '💝',
    'Sei la mia vita',
    '🌹',
    'Sei il mio bimbo',
    '💖',
    'Voglio passare la vita con te',
    '🌟',
  ];

  const randomPhrases = [
    'Mi manchi!',
    'Sei mio!',
    'Sei bellissimo!',
    'Sei la mia felicità!',
    'Ti voglio!',
    'Sei il mio amore!',
    'Sono tua!',
    'Sono pazza di te!',
  ];

  const reasons = [
    'Perché ti amo',
    'Perché voglio scoprire ogni lato di me, con te',
    'Perché sei il mio posto sicuro',
    'Perché voglio provare ogni cosa con te',
    'Perché altrimenti sarei molto triste :(',
    'Perché voglio condividere le mie giornate con te',
    'Perché altrimenti niente più LP :P',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createSweetMessage = (x: number, y: number) => {
    const newMessage = {
      id: messageIdRef.current++,
      text: sweetPhrases[Math.floor(Math.random() * sweetPhrases.length)],
      x,
      y,
    };
    setSweetMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      setSweetMessages(prev => prev.filter(m => m.id !== newMessage.id));
    }, 2000);
  };

  const createShockwave = (x: number, y: number) => {
    const newShockwave = {
      id: shockwaveIdRef.current++,
      x,
      y,
    };
    setShockwaves(prev => [...prev, newShockwave]);
    
    setTimeout(() => {
      setShockwaves(prev => prev.filter(s => s.id !== newShockwave.id));
    }, 1000);
  };

  const createRandomMessage = (x: number, y: number) => {
    const newMessage = {
      id: randomMessageIdRef.current++,
      text: randomPhrases[Math.floor(Math.random() * randomPhrases.length)],
      x,
      y,
      rotation: Math.random() * 20 - 10,
    };
    setRandomMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      setRandomMessages(prev => prev.filter(m => m.id !== newMessage.id));
    }, 1500);
  };

  const showAchievementNotification = (text: string) => {
    setAchievementText(text);
    setShowAchievement(true);
    setTimeout(() => setShowAchievement(false), 3000);
  };

  const incrementCombo = () => {
    setComboCounter(prev => prev + 1);
    setShowCombo(true);
    
    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current);
    }
    
    comboTimeoutRef.current = setTimeout(() => {
      setComboCounter(0);
      setShowCombo(false);
    }, 2000);
  };

  const handleNoClick = () => {
    if (noAttempts === 0) {
      setNoAttempts(1);
      setYesSize(1.3);
    }
  };

  const handleNoMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
    
    createShockwave(e.clientX, e.clientY);
    
    // Random cat position
    const positions: Array<'top' | 'left' | 'right'> = ['top', 'left', 'right'];
    setCatPosition(positions[Math.floor(Math.random() * positions.length)]);
    
    // Random cat message
    setCatMessage(catMessages[Math.min(noAttempts, catMessages.length - 1)]);
    
    // Cat stays visible for 3 seconds
    setCatVisible(true);
    setTimeout(() => setCatVisible(false), 3000);
    
    // Increase background intensity
    setBgIntensity(Math.min(noAttempts * 10, 50));

    if (noAttempts === 0) {
      // First click: just shake, don't move
      setNoAttempts(1);
      setYesSize(1.5);
      setNoSize(0.9);
    } else {
      // Subsequent clicks: increase counter and grow Yes button
      setNoAttempts(noAttempts + 1);
      setYesSize(prev => Math.min(prev + 0.3, 3));
      setNoSize(prev => Math.max(prev - 0.1, 0.4));
      
      // Achievements
      if (noAttempts === 5) {
        showAchievementNotification(' BHOOOOO VEDI CHE NON MI VUOI? 5 TENTATIVI FALLITI!');
      } else if (noAttempts === 10) {
        showAchievementNotification('EVITABILE! 10 TENTATIVI FALLITI!');
      }
    }
  };

  const handleNoHover = () => {
    if (noAttempts >= 1) {
      setCatMessage('Non provarci nemmeno!');
      
      // Move the button when hovering (from second attempt onwards)
      if (noButtonRef.current) {
        // Calculate safe boundaries to keep button visible
        const buttonWidth = 150;
        const buttonHeight = 60;
        const margin = 20; // Safety margin from edges
        
        const maxX = window.innerWidth - buttonWidth - margin;
        const maxY = window.innerHeight - buttonHeight - margin;
        const minX = margin;
        const minY = margin;
        
        // Generate random position within safe boundaries
        const newX = minX + Math.random() * (maxX - minX);
        const newY = minY + Math.random() * (maxY - minY);
        
        setNoPosition({ x: newX, y: newY });
      }
    }
  };

  const handleYesClick = (e: React.MouseEvent) => {
    createShockwave(e.clientX, e.clientY);
    
    // Create falling petals
    const petals = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setFallingPetals(petals);
    
    // Achievement
    if (noAttempts === 0) {
      showAchievementNotification('Addirittura? Amore immediato!');
    } else if (noAttempts > 15) {
      showAchievementNotification('BHOOOOOOO CI HAI PROVATO PIÙ DI 15 VOLTE PRIMA DI DIRE SÌ!');
    }
    
    // Show confetti and final screen
    setTimeout(() => {
      setShowConfetti(true);
    }, 800);
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    setEasterEggClicks(prev => prev + 1);
    createSweetMessage(window.innerWidth / 2, 100);
    createShockwave(e.clientX, e.clientY);
    incrementCombo();
    
    if (easterEggClicks === 2) {
      setShowReasons(true);
      setTimeout(() => setShowReasons(false), 6000);
    } else if (easterEggClicks === 5) {
      showAchievementNotification('🎨 Esploratore curioso!');
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newClicks = heartClicks + 1;
    setHeartClicks(newClicks);
    
    createSweetMessage(e.clientX, e.clientY);
    createShockwave(e.clientX, e.clientY);
    createRandomMessage(e.clientX + 50, e.clientY - 30);
    incrementCombo();
    
    // Show reasons panel after 3 clicks on the heart
    if (newClicks === 3) {
      setShowReasons(true);
      setTimeout(() => setShowReasons(false), 15000);
    }
    
    // Create extra particles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const angle = (Math.PI * 2 * i) / 5;
        const radius = 30;
        const newParticle = {
          id: particleIdRef.current++,
          x: e.clientX + Math.cos(angle) * radius,
          y: e.clientY + Math.sin(angle) * radius,
        };
        setParticles(prev => [...prev, newParticle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, 1000);
      }, i * 50);
    }
    
    // Achievements
    if (newClicks === 10) {
      showAchievementNotification('Addirittura 10 click! Le vuoi proprio leggere tutte');
    } else if (newClicks === 25) {
      showAchievementNotification('Vai vai');
    } else if (newClicks === 50) {
      showAchievementNotification('Non serviva spammare dai');
    }
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    if (Math.random() > 0.8) {
      createRandomMessage(e.clientX, e.clientY);
    }
  };

  const handleRiddleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = 'eh'; // La risposta corretta
    
    if (riddleAnswer.toLowerCase().trim() === correctAnswer) {
      setRiddleSolved(true);
      setRiddleError(false);
      showAchievementNotification('🔓 HIHIHI');
      
      // Effetti speciali
      createShockwave(window.innerWidth / 2, window.innerHeight / 2);
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          createSweetMessage(
            window.innerWidth / 2 + (Math.random() - 0.5) * 200,
            window.innerHeight / 2 + (Math.random() - 0.5) * 200
          );
        }, i * 100);
      }
    } else {
      setRiddleError(true);
      setTimeout(() => setRiddleError(false), 1000);
    }
  };

  const getCatPositionStyles = () => {
    switch (catPosition) {
      case 'left':
        return 'top-1/2 left-20 -translate-y-1/2';
      case 'right':
        return 'top-1/2 right-20 -translate-y-1/2';
      default:
        return 'top-1/4 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <motion.div 
      animate={screenShake ? { x: [-10, 10, -10, 10, 0], y: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.5 }}
      className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100"
      style={{
        background: `linear-gradient(to bottom right, 
          rgb(250, 245, 255), 
          rgb(255, 255, 255), 
          hsl(280, 100%, ${Math.max(95 - bgIntensity, 75)}%))`
      }}
      onClick={handleScreenClick}
    >
      {/* Shockwaves */}
      {shockwaves.map(wave => (
        <motion.div
          key={wave.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed pointer-events-none z-20 border-4 border-purple-400 rounded-full"
          style={{ 
            left: wave.x - 25, 
            top: wave.y - 25,
            width: 50,
            height: 50,
          }}
        />
      ))}

      {/* Random messages */}
      {randomMessages.map(msg => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 1, scale: 0, rotate: msg.rotation }}
          animate={{ opacity: 0, scale: 1.2, y: -50 }}
          transition={{ duration: 1.5 }}
          className="fixed pointer-events-none z-40 text-2xl font-bold text-purple-600"
          style={{ left: msg.x, top: msg.y }}
        >
          {msg.text}
        </motion.div>
      ))}

      {/* Combo counter */}
      <AnimatePresence>
        {showCombo && comboCounter > 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-24 right-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-xl z-50 border-2 border-white"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <Zap size={24} fill="white" />
              <span className="text-2xl font-bold">{comboCounter}x COMBO!</span>
              <Zap size={24} fill="white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-b-2xl shadow-2xl z-50 border-4 border-yellow-300"
          >
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="flex items-center gap-3"
            >
              <Award size={32} className="text-yellow-300" />
              <span className="text-xl font-bold">{achievementText}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sweet messages */}
      {sweetMessages.map(msg => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 1, scale: 0, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -100 }}
          transition={{ duration: 2 }}
          className="fixed pointer-events-none z-50 text-4xl font-bold"
          style={{ left: msg.x - 40, top: msg.y }}
        >
          {msg.text}
        </motion.div>
      ))}

      {/* Falling petals */}
      <AnimatePresence>
        {fallingPetals.map(petal => (
          <motion.div
            key={petal.id}
            initial={{ y: -50, x: `${petal.x}vw`, rotate: 0, opacity: 1 }}
            animate={{ 
              y: window.innerHeight + 100, 
              rotate: 720,
              x: `${petal.x + (Math.random() - 0.5) * 20}vw`,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 4 + Math.random() * 2, 
              delay: petal.delay,
              ease: 'linear' 
            }}
            className="fixed pointer-events-none"
            style={{ top: 0 }}
          >
            <div className="text-pink-400 text-2xl">🌸</div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Reasons panel */}
      <AnimatePresence>
        {showReasons && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            className="fixed left-8 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-purple-300 z-40 max-w-xs"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-purple-600" size={24} />
              <h3 className="font-bold text-purple-800 text-lg">Perché dire Sì?</h3>
            </div>
            <ul className="space-y-2">
              {reasons.map((reason, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 1 }}
                  className="flex items-start gap-2 text-purple-700"
                >
                  <Heart size={16} fill="currentColor" className="mt-1 flex-shrink-0" />
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mouse follower hearts */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1, y: -50 }}
          transition={{ duration: 1 }}
          className="fixed pointer-events-none z-30"
          style={{ left: particle.x, top: particle.y }}
        >
          <Heart className="text-purple-400" size={16} fill="currentColor" />
        </motion.div>
      ))}

      {/* Subtle decorative hearts */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-purple-400"
            size={Math.random() * 30 + 15}
            fill="currentColor"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating hearts - clickable */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="fixed text-purple-300 opacity-40 cursor-pointer hover:opacity-100 hover:scale-125 transition-all z-20"
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${(i * 12) + 5}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          onClick={handleHeartClick}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
      ))}

      {/* Happy Cat Character */}
      <AnimatePresence>
        {showHappyCat && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.svg 
              width="220" 
              height="220" 
              viewBox="0 0 300 300" 
              className="drop-shadow-xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ellipse cx="150" cy="200" rx="80" ry="60" fill="#A78BFA" />
              <circle cx="150" cy="120" r="70" fill="#C4B5FD" />
              <path d="M 100 80 L 80 30 L 120 70 Z" fill="#A78BFA" />
              <path d="M 200 80 L 220 30 L 180 70 Z" fill="#A78BFA" />
              <path d="M 100 70 L 90 40 L 110 65 Z" fill="#DDD6FE" />
              <path d="M 200 70 L 210 40 L 190 65 Z" fill="#DDD6FE" />
              <g>
                <motion.path
                  d="M 110 105 Q 125 115 140 105"
                  stroke="#1F2937"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ scaleY: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
              <g>
                <motion.path
                  d="M 160 105 Q 175 115 190 105"
                  stroke="#1F2937"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ scaleY: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
              <path d="M 130 140 Q 150 150 170 140" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 150 130 L 145 137 L 155 137 Z" fill="#F472B6" />
              <ellipse cx="110" cy="130" rx="12" ry="8" fill="#F472B6" opacity="0.4" />
              <ellipse cx="190" cy="130" rx="12" ry="8" fill="#F472B6" opacity="0.4" />
              <line x1="85" y1="120" x2="115" y2="118" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="85" y1="130" x2="115" y2="128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="215" y1="120" x2="185" y2="118" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="215" y1="130" x2="185" y2="128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="120" cy="240" rx="18" ry="22" fill="#C4B5FD" />
              <ellipse cx="180" cy="240" rx="18" ry="22" fill="#C4B5FD" />
              <circle cx="120" cy="245" r="5" fill="#DDD6FE" />
              <circle cx="180" cy="245" r="5" fill="#DDD6FE" />
              <motion.path
                d="M 210 210 Q 260 190 270 230 Q 265 250 250 245"
                fill="#A78BFA"
                stroke="#A78BFA"
                strokeWidth="2"
                animate={{ rotate: [0, 10, 0] }}
                style={{ transformOrigin: '210px 210px' }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.svg>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl px-6 py-3 border-2 border-pink-400 shadow-lg"
            >
              <div className="text-purple-900 font-bold text-xl whitespace-nowrap flex items-center gap-2">
                <Heart size={20} fill="currentColor" className="text-pink-500" />
                YUPPIIIII! IL MIO BIMBO MI AMA!
                <Heart size={20} fill="currentColor" className="text-pink-500" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-purple-100"></div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-pink-400"></div>
            </motion.div>

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.2 
                }}
                style={{
                  left: `${110 + Math.cos(i * 45 * Math.PI / 180) * 130}px`,
                  top: `${100 + Math.sin(i * 45 * Math.PI / 180) * 130}px`,
                }}
              >
                <Sparkles className="text-yellow-400" size={20} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Angry Cat Character */}
      <AnimatePresence>
        {catVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: 0,
            }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className={`fixed z-50 ${getCatPositionStyles()}`}
          >
            <motion.svg 
              width="200" 
              height="200" 
              viewBox="0 0 300 300" 
              className="drop-shadow-xl"
              animate={{
                rotate: [-5, 5, -5, 5, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <ellipse cx="150" cy="200" rx="80" ry="60" fill="#7C3AED" />
              <circle cx="150" cy="120" r="70" fill="#8B5CF6" />
              <path d="M 100 80 L 80 30 L 120 70 Z" fill="#7C3AED" />
              <path d="M 200 80 L 220 30 L 180 70 Z" fill="#7C3AED" />
              <path d="M 100 70 L 90 40 L 110 65 Z" fill="#C4B5FD" />
              <path d="M 200 70 L 210 40 L 190 65 Z" fill="#C4B5FD" />
              <g>
                <ellipse cx="125" cy="110" rx="10" ry="16" fill="#1F2937" />
                <ellipse cx="127" cy="108" rx="3" ry="5" fill="#FFFFFF" />
                <line x1="112" y1="98" x2="135" y2="105" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
              </g>
              <g>
                <ellipse cx="175" cy="110" rx="10" ry="16" fill="#1F2937" />
                <ellipse cx="177" cy="108" rx="3" ry="5" fill="#FFFFFF" />
                <line x1="188" y1="98" x2="165" y2="105" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
              </g>
              <path d="M 135 142 Q 150 135 165 142" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 150 130 L 145 137 L 155 137 Z" fill="#A78BFA" />
              <line x1="85" y1="120" x2="115" y2="118" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="85" y1="130" x2="115" y2="128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="215" y1="120" x2="185" y2="118" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="215" y1="130" x2="185" y2="128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="120" cy="240" rx="18" ry="22" fill="#8B5CF6" />
              <ellipse cx="180" cy="240" rx="18" ry="22" fill="#8B5CF6" />
              <circle cx="120" cy="245" r="5" fill="#C4B5FD" />
              <circle cx="180" cy="245" r="5" fill="#C4B5FD" />
              <path d="M 210 210 Q 260 190 270 230 Q 265 250 250 245" fill="#7C3AED" stroke="#7C3AED" strokeWidth="2" />
            </motion.svg>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-5 py-2 border-2 border-purple-500 shadow-lg"
            >
              <div className="text-purple-900 font-semibold text-lg whitespace-nowrap">
                {catMessage}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-purple-500"></div>
            </motion.div>

            <motion.div
              className="absolute -right-6 top-16 text-2xl"
              animate={{ scale: [1, 1.5, 1], rotate: [0, 20, 0] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              💢
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attempt counter */}
      {noAttempts > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-purple-400 shadow-lg z-40"
        >
          <p className="text-purple-800 font-bold">
            Tentativi falliti: <span className="text-2xl">{noAttempts}</span>
          </p>
        </motion.div>
      )}

      {/* Heart click counter */}
      {heartClicks > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-24 right-8 bg-pink-100/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-pink-400 shadow-lg z-40"
        >
          <p className="text-pink-700 font-semibold flex items-center gap-2">
            <Heart size={20} fill="currentColor" />
            <span>{heartClicks}</span>
          </p>
        </motion.div>
      )}

      {/* Love letter easter egg */}
      <motion.button
        className="fixed bottom-8 left-8 text-purple-400 hover:text-purple-600 transition-colors cursor-pointer z-40"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowLoveLetter(true)}
      >
        <div className="text-4xl">💌</div>
      </motion.button>

      {/* Riddle button */}
      <motion.button
        className="fixed top-8 right-8 text-purple-400 hover:text-purple-600 transition-colors cursor-pointer z-40"
        whileHover={{ scale: 1.2, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowRiddle(true)}
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Lock size={40} />
      </motion.button>

      {/* Riddle Modal */}
      <AnimatePresence>
        {showRiddle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRiddle(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring' }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 max-w-md shadow-2xl border-4 border-purple-300 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {!riddleSolved ? (
                <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      🔐
                    </motion.div>
                    <h3 className="text-3xl font-bold text-purple-800 mb-4">Giochino</h3>
                    <div className="bg-white/80 rounded-2xl p-6 mb-6">
                      <p className="text-purple-900 text-lg leading-relaxed italic">
                        MA TU...<br/>
                      </p>
                    </div>
                    <form onSubmit={handleRiddleSubmit} className="space-y-4">
                      <motion.input
                        type="text"
                        value={riddleAnswer}
                        onChange={(e) => setRiddleAnswer(e.target.value)}
                        placeholder="Scrivi la tua risposta..."
                        className="w-full px-6 py-3 rounded-full border-2 border-purple-300 focus:border-purple-500 outline-none text-center text-lg font-medium"
                        animate={riddleError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        autoFocus
                      />
                      <div className="flex gap-3">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold"
                        >
                          Verifica 🔓
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowRiddle(false)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold"
                        >
                          Chiudi
                        </motion.button>
                      </div>
                    </form>
                    {riddleError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 font-semibold mt-3"
                      >
                        ❌ Risposta errata! Riprova...
                      </motion.p>
                    )}
                </div>
              ) : (
                <div className="text-center relative">
                  {/* Close button */}
                  <motion.button
                    onClick={() => {
                      setShowRiddle(false);
                      setRiddleAnswer('');
                      setRiddleSolved(false);
                    }}
                    className="absolute -top-4 -right-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 shadow-lg transition-colors z-[100]"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                  
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 1 }}
                    className="text-6xl mb-4"
                  >
                    🔓
                  </motion.div>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
                    <p className="text-2xl font-bold text-purple-700 mb-4">✨LO SAI CHE... ✨</p>
                    <p className="text-purple-600 text-lg italic">
                      Sei la persona che voglio vedere al mio fianco ogni volta che apro gli occhi!<br />
                      Sei la persona con cui voglio vivere e condividere la mia libertà.<br />
                      Sei la persona con cui voglio vivere i miei momenti felici, ma anche i miei silenzi.<br />
                      Sei la persona che mi ha fatto scoprire quanto amore il mio cuore possa provare. <br /><br />
                      Sei la mia persona!
                      💕
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Letter Modal */}
      <AnimatePresence>
        {showLoveLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoveLetter(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring' }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 max-w-md shadow-2xl border-4 border-pink-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  💝
                </motion.div>
                <h3 className="text-3xl font-bold text-purple-800 mb-4">Piccola dedica</h3>
                <div className="space-y-3 text-purple-700 text-lg leading-relaxed">
                  <p>So che è un modo un po' scemo</p>
                  <p>però ci tenevo a dirti quanto sei importante per me in un modo un po' diverso dal solito.</p>
                  <p className="text-2xl my-4">✨💜✨</p>
                  <p>So che a volte ti porto all'esasperazione, e anche che posso essere molto pesante senza volerlo. Scusami per questo,</p>
                  <p>però spero che starai sempre al mio fianco, così come io voglio stare al tuo.</p>
                  <p>Spero di poterti conoscere e amare ogni giorno sempre di più. </p>
                  <p className="text-3xl mt-6">Ti amo! 💕</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLoveLetter(false)}
                  className="mt-6 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full font-semibold"
                >
                  Chiudi
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed"
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2,
                  ease: 'easeOut',
                }}
                style={{
                  left: 0,
                  top: 0,
                }}
              >
                <Heart 
                  className="text-purple-400" 
                  size={20} 
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 z-40"
          >
            <div className="text-center relative">
              {/* Happy Cat */}
              <motion.svg 
                width="280" 
                height="280" 
                viewBox="0 0 300 300" 
                className="drop-shadow-xl mx-auto"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ellipse cx="150" cy="200" rx="80" ry="60" fill="#A78BFA" />
                <circle cx="150" cy="120" r="70" fill="#C4B5FD" />
                <path d="M 100 80 L 80 30 L 120 70 Z" fill="#A78BFA" />
                <path d="M 200 80 L 220 30 L 180 70 Z" fill="#A78BFA" />
                <path d="M 100 70 L 90 40 L 110 65 Z" fill="#DDD6FE" />
                <path d="M 200 70 L 210 40 L 190 65 Z" fill="#DDD6FE" />
                <g>
                  <motion.path
                    d="M 110 105 Q 125 115 140 105"
                    stroke="#1F2937"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ scaleY: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </g>
                <g>
                  <motion.path
                    d="M 160 105 Q 175 115 190 105"
                    stroke="#1F2937"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ scaleY: [1, 0.8, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </g>
                <path d="M 130 140 Q 150 150 170 140" stroke="#1F2937" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 150 130 L 145 137 L 155 137 Z" fill="#F472B6" />
                <ellipse cx="110" cy="130" rx="12" ry="8" fill="#F472B6" opacity="0.4" />
                <ellipse cx="190" cy="130" rx="12" ry="8" fill="#F472B6" opacity="0.4" />
                <line x1="85" y1="120" x2="115" y2="118" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="130" x2="115" y2="128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                <line x1="215" y1="120" x2="185" y2="118" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                <line x1="215" y1="130" x2="185" y2="128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="120" cy="240" rx="18" ry="22" fill="#C4B5FD" />
                <ellipse cx="180" cy="240" rx="18" ry="22" fill="#C4B5FD" />
                <circle cx="120" cy="245" r="5" fill="#DDD6FE" />
                <circle cx="180" cy="245" r="5" fill="#DDD6FE" />
                <motion.path
                  d="M 210 210 Q 260 190 270 230 Q 265 250 250 245"
                  fill="#A78BFA"
                  stroke="#A78BFA"
                  strokeWidth="2"
                  animate={{ rotate: [0, 10, 0] }}
                  style={{ transformOrigin: '210px 210px' }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </motion.svg>

              {/* Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-3 border-2 border-pink-400 shadow-xl mx-auto"
              >
                <div className="text-purple-900 font-bold text-xl flex items-center gap-2">
                  <Heart size={20} fill="currentColor" className="text-pink-500" />
                  YUPPIIIII! IL MIO BIMBO MI AMA! 
                  <Heart size={20} fill="currentColor" className="text-pink-500" />
                </div>
              </motion.div>

              {/* Attempts counter */}
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-purple-900 font-bold mt-4 bg-white/70 backdrop-blur-sm rounded-xl px-6 py-2 mx-auto shadow-lg inline-block"
              >
                {noAttempts > 0 ? `Ci hai messo ${noAttempts + 1} tentativi, ma ce l'hai fatta! 😸` : 'Hai detto subito di sì! 💕'}
              </motion.p>

              {/* Sparkles around - Fixed positioning */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const radius = 200;
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        rotate: 360,
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.2 
                      }}
                      style={{
                        left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                        top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <Sparkles className="text-yellow-400" size={20} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-8 max-w-2xl">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <Heart 
                size={60} 
                className="text-purple-600 mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform" 
                fill="currentColor"
                onClick={handleHeartClick}
              />
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl font-light text-purple-900 mb-4"
              animate={{ 
                textShadow: noAttempts > 3 ? '0 0 20px rgba(147, 51, 234, 0.5)' : '0 0 0px rgba(147, 51, 234, 0)'
              }}
            >
              Do you want to be my
            </motion.h1>
            <motion.h2
              className="text-6xl md:text-7xl font-bold text-purple-700 mb-10"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Valentine forever?
            </motion.h2>
            
            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 shadow-sm mb-10"
              animate={noAttempts > 0 ? {
                borderColor: ['rgb(233, 213, 255)', 'rgb(147, 51, 234)', 'rgb(233, 213, 255)']
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <p className="text-lg text-purple-700 font-medium">
                Guai a te se dici di no!
              </p>
            </motion.div>
          </motion.div>

          <div className="flex gap-6 items-center justify-center relative">
            {/* Yes Button */}
            <motion.button
              animate={{ scale: yesSize }}
              whileHover={{ scale: yesSize * 1.05 }}
              whileTap={{ scale: yesSize * 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={handleYesClick}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all relative overflow-hidden z-50"
            >
              <motion.span 
                className="text-xl relative z-10"
                animate={yesSize > 1.5 ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                Sì!
              </motion.span>
              {yesSize > 2 && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.button>

            {/* No Button */}
            <motion.button
              ref={noButtonRef}
              style={
                noAttempts >= 1
                  ? {
                      position: 'fixed',
                      left: noPosition.x,
                      top: noPosition.y,
                    }
                  : {}
              }
              animate={
                noAttempts > 0
                  ? {
                      rotate: [-3, 3, -3, 3, 0],
                      scale: noSize,
                    }
                  : { scale: noSize }
              }
              whileHover={{ scale: noSize * 1.05 }}
              whileTap={{ scale: noSize * 0.95 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
              onMouseEnter={handleNoHover}
              onMouseDown={handleNoMouseDown}
              onClick={handleNoClick}
              className="bg-white hover:bg-gray-50 text-purple-700 font-semibold py-4 px-10 rounded-full shadow-lg border border-purple-300 transition-all cursor-pointer"
            >
              <span className="text-xl">No</span>
            </motion.button>
          </div>

          {/* Secret hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 text-purple-700 text-sm font-medium bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-block"
          >
            💡 Clicca ovunque per scoprire sorprese...
          </motion.p>
        </div>
      </div>

      {/* Corner decoration */}
      <motion.div
        className="fixed bottom-4 right-4 opacity-30 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Heart size={40} className="text-purple-400" fill="currentColor" />
      </motion.div>

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="fixed text-yellow-300 pointer-events-none"
          initial={{ x: -50, y: Math.random() * window.innerHeight / 2, opacity: 0 }}
          animate={{ 
            x: window.innerWidth + 50, 
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            delay: i * 4,
            ease: 'linear'
          }}
        >
          <Star size={20} fill="currentColor" />
        </motion.div>
      ))}
    </motion.div>
  );
}