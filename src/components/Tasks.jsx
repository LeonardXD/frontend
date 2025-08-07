import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import { useTitle } from '../hooks/useTitle';

const Tasks = () => {
  useTitle('Tasks | DemoTasker');
  const [mode, setMode] = useState('equation');
  const [coins, setCoins] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [eqSolved, setEqSolved] = useState(0);
  const [capSolved, setCapSolved] = useState(0);
  const [memoryGameCompleted, setMemoryGameCompleted] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const savedCoins = localStorage.getItem('coinBalance');
    if (savedCoins) {
      setCoins(parseFloat(savedCoins));
    }
  }, []);

  const updateCoins = (amount) => {
    const newCoins = coins + amount;
    setCoins(newCoins);
    localStorage.setItem('coinBalance', newCoins);
  };

  const triggerAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
    setAlertType('info');
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      {showAlert && <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Your Coins</h2>
            <div className="flex items-center mt-2">
              <img src="/doggy-coin.png" alt="Coin" className="w-12 h-12 mr-4" />
              <p className="text-4xl font-bold">{coins}</p>
            </div>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Daily Tasks</h2>
            <p className="text-lg mt-2">{tasksCompleted} Tasks Completed</p>
            <button className="mt-4 bg-white text-red-500 font-bold py-2 px-4 rounded-full">View</button>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button onClick={() => setMode('equation')} className={`px-4 py-2 rounded-full font-semibold ${mode === 'equation' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Equation</button>
            <button onClick={() => setMode('captcha')} className={`px-4 py-2 rounded-full font-semibold ${mode === 'captcha' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Captcha</button>
            <button onClick={() => setMode('dailyReward')} className={`px-4 py-2 rounded-full font-semibold ${mode === 'dailyReward' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Daily Reward</button>
            <button onClick={() => setMode('numberEncoding')} className={`px-4 py-2 rounded-full font-semibold ${mode === 'numberEncoding' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Number Encoding</button>
            <button onClick={() => setMode('memory')} className={`px-4 py-2 rounded-full font-semibold ${mode === 'memory' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Memory</button>
          </div>

          {/* Game Mode Containers */}
          {mode === 'equation' && <EquationMode updateCoins={updateCoins} setEqSolved={setEqSolved} triggerAlert={triggerAlert} />}
          {mode === 'captcha' && <CaptchaMode updateCoins={updateCoins} setCapSolved={setCapSolved} triggerAlert={triggerAlert} />}
          {mode === 'dailyReward' && <DailyRewardMode updateCoins={updateCoins} triggerAlert={triggerAlert} />}
          {mode === 'numberEncoding' && <NumberEncodingMode updateCoins={updateCoins} triggerAlert={triggerAlert} />}
          {mode === 'memory' && <MemoryMode updateCoins={updateCoins} setMemoryGameCompleted={setMemoryGameCompleted} triggerAlert={triggerAlert} />}
        </div>
      </div>
    </div>
  );
};

// Placeholder components for game modes
const EquationMode = ({ updateCoins, setEqSolved, triggerAlert }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');

  const generateEquation = () => {
    const operators = ['+', '-', '*'];
    const newOperator = operators[Math.floor(Math.random() * operators.length)];

    let newNum1, newNum2;

    if (newOperator === '*') {
      newNum1 = Math.floor(Math.random() * 127) + 1;
      newNum2 = Math.floor(Math.random() * 4) + 1;
    } else {
      newNum1 = Math.floor(Math.random() * 127) + 1;
      newNum2 = Math.floor(Math.random() * 64) + 1;
    }

    setNum1(newNum1);
    setNum2(newNum2);
    setOperator(newOperator);
  };

  useEffect(() => {
    generateEquation();
  }, []);

  const handleSubmit = () => {
    let correctAnswer;
    if (operator === '+') correctAnswer = num1 + num2;
    if (operator === '-') correctAnswer = num1 - num2;
    if (operator === '*') correctAnswer = num1 * num2;

    if (parseInt(answer) === correctAnswer) {
      updateCoins(3);
      setEqSolved(prev => prev + 1);
      triggerAlert('Correct! You earned 3 coins.', 'success');
    } else {
      triggerAlert('Incorrect. Try again.', 'error');
    }
    generateEquation();
    setAnswer('');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold mb-8">{num1} {operator} {num2} = ?</div>
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md w-1/2 mb-4" placeholder="Enter Answer" />
      <button onClick={handleSubmit} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Submit</button>
    </div>
  );
};

const CaptchaMode = ({ updateCoins, setCapSolved, triggerAlert }) => {
  const [captcha, setCaptcha] = useState('');
  const [input, setInput] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = () => {
    if (input === captcha) {
      updateCoins(4);
      setCapSolved(prev => prev + 1);
      triggerAlert('Correct! You earned 4 coins.', 'success');
    } else {
      triggerAlert('Incorrect. Try again.', 'error');
    }
    generateCaptcha();
    setInput('');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl font-bold mb-8 bg-gray-200 p-4 rounded-md select-none">{captcha}</div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md w-1/2 mb-4" placeholder="Enter Captcha" />
      <button onClick={handleSubmit} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Submit</button>
    </div>
  );
};

const DailyRewardMode = ({ updateCoins, triggerAlert }) => {
  const [canClaim, setCanClaim] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');

  const getPHTDate = (date) => {
    const offset = 8 * 60; // UTC+8
    const localDate = new Date(date.getTime() + offset * 60 * 1000);
    return localDate;
  };

  useEffect(() => {
    const checkClaimStatus = () => {
      const lastClaimedTimestamp = localStorage.getItem('lastClaimedTimestamp');
      if (lastClaimedTimestamp) {
        const lastClaimDate = new Date(parseInt(lastClaimedTimestamp, 10));
        const now = new Date();

        const lastClaimDatePHT = new Date(lastClaimDate.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
        const nowDatePHT = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));

        if (lastClaimDatePHT.getFullYear() < nowDatePHT.getFullYear() ||
            lastClaimDatePHT.getMonth() < nowDatePHT.getMonth() ||
            lastClaimDatePHT.getDate() < nowDatePHT.getDate()) {
          setCanClaim(true);
        } else {
          setCanClaim(false);
          startCountdown();
        }
      } else {
        setCanClaim(true);
      }
    };

    const startCountdown = () => {
      const interval = setInterval(() => {
        const now = new Date();
        const nowDatePHT = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
        
        const tomorrowPHT = new Date(nowDatePHT);
        tomorrowPHT.setDate(nowDatePHT.getDate() + 1);
        tomorrowPHT.setHours(0, 0, 0, 0);

        const diff = tomorrowPHT.getTime() - nowDatePHT.getTime();

        if (diff <= 0) {
          setCanClaim(true);
          setTimeRemaining('');
          clearInterval(interval);
          return;
        }

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
      }, 1000);

      return () => clearInterval(interval);
    };

    checkClaimStatus();
  }, []);

  const handleClaim = () => {
    if (canClaim) {
      const reward = Math.floor(Math.random() * 951) + 50;
      updateCoins(reward);
      triggerAlert(`You claimed ${reward} coins!`, 'success');
      localStorage.setItem('lastClaimedTimestamp', Date.now().toString());
      setCanClaim(false);
      // Immediately start the countdown after claiming
      const interval = setInterval(() => {
        const now = new Date();
        const nowDatePHT = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
        
        const tomorrowPHT = new Date(nowDatePHT);
        tomorrowPHT.setDate(nowDatePHT.getDate() + 1);
        tomorrowPHT.setHours(0, 0, 0, 0);

        const diff = tomorrowPHT.getTime() - nowDatePHT.getTime();

        if (diff <= 0) {
          setCanClaim(true);
          setTimeRemaining('');
          clearInterval(interval);
          return;
        }

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeRemaining(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
      }, 1000);
    }
  };

  return (
    <div className="text-center">
      <p className="text-lg mb-4">Reward Range: 50 - 1000 coins</p>
      <button onClick={handleClaim} disabled={!canClaim} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed">
        {canClaim ? 'Claim' : 'Claimed'}
      </button>
      {!canClaim && timeRemaining && (
        <div className="mt-4 text-lg">
          <p>Next reward in: <span className="font-bold">{timeRemaining}</span></p>
        </div>
      )}
    </div>
  );
};

const NumberEncodingMode = ({ updateCoins, triggerAlert }) => {
  const [option, setOption] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [userInput, setUserInput] = useState('');

  const options = [
    { count: 3, coins: 1 },
    { count: 5, coins: 3 },
    { count: 10, coins: 5 },
  ];

  const handleOptionSelect = (selectedOption) => {
    setOption(selectedOption);
    const newNumbers = Array.from({ length: selectedOption.count }, () => Math.floor(Math.random() * 10));
    setNumbers(newNumbers);
    setUserInput('');
  };

  const handleSubmit = () => {
    const correctAnwer = numbers.join('');
    if (userInput === correctAnwer) {
      updateCoins(option.coins);
      triggerAlert(`Correct! You earned ${option.coins} coins.`, 'success');
    } else {
      triggerAlert('Incorrect. Try again.', 'error');
    }
    
    const newNumbers = Array.from({ length: option.count }, () => Math.floor(Math.random() * 10));
    setNumbers(newNumbers);
    setUserInput('');
  };

  if (!option) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Choose an option:</h2>
        {options.map((opt) => (
          <button
            key={opt.count}
            onClick={() => handleOptionSelect(opt)}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full mb-2 w-64"
          >
            {opt.count} numbers for {opt.coins} coin{opt.coins > 1 ? 's' : ''}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4 tracking-widest select-none">{numbers.join(' ')}</h2>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded-md w-1/2 mb-4"
        placeholder="Enter the numbers"
      />
      <button onClick={handleSubmit} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
        Submit
      </button>
    </div>
  );
};

const MemoryMode = ({ updateCoins, setMemoryGameCompleted, triggerAlert }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGameEnd = (isWin) => {
    if (isWin) {
      updateCoins(30);
      setMemoryGameCompleted(prev => prev + 1);
      triggerAlert('You won! 30 coins awarded.', 'success');
    } else {
      triggerAlert('Time is up! Try again.', 'error');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="text-center">
      <button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
        Play Memory Game
      </button>
      {isModalOpen && <MemoryGameModal onClose={() => setIsModalOpen(false)} onGameEnd={handleGameEnd} />}
    </div>
  );
};

const MemoryGameModal = ({ onClose, onGameEnd }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timer, setTimer] = useState(70);

  useEffect(() => {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    const gameCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({ id: index, number }));
    setCards(gameCards);
  }, []);

  useEffect(() => {
    if (timer > 0 && matched.length < 20) {
      const interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      onGameEnd(false);
    }
  }, [timer, matched]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].number === cards[second].number) {
        setMatched(prev => [...prev, first, second]);
      }
      setTimeout(() => setFlipped([]), 500);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === 20) {
      onGameEnd(true);
    }
  }, [matched]);

  const handleCardClick = (index) => {
    if (flipped.length < 2 && !flipped.includes(index) && !matched.includes(index)) {
      setFlipped(prev => [...prev, index]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Memory Game</h2>
          <div className="text-2xl font-bold text-red-500">{timer}s</div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`w-full h-24 rounded-lg cursor-pointer flex items-center justify-center text-3xl font-bold transition-transform duration-500 ${
                flipped.includes(index) || matched.includes(index) ? 'bg-blue-400 text-white transform rotate-y-180' : 'bg-gray-300'
              }`}
              onClick={() => handleCardClick(index)}
            >
              {flipped.includes(index) || matched.includes(index) ? card.number : '?'}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 bg-red-500 text-white font-bold py-2 px-4 rounded-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default Tasks;
