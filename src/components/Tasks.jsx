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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Your Coins</h2>
            <div className="flex items-center mt-2">
              <img src="/doggy-coin.png" alt="Coin" className="w-12 h-12 mr-4" />
              <p className="text-4xl font-bold">{coins.toLocaleString()}</p>
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
          {mode === 'numberEncoding' && <NumberEncodingMode updateCoins={updateCoins} />}
          {mode === 'memory' && <MemoryMode updateCoins={updateCoins} setMemoryGameCompleted={setMemoryGameCompleted} />}
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
    setNum1(Math.floor(Math.random() * 100));
    setNum2(Math.floor(Math.random() * 100));
    const operators = ['+', '-', '*'];
    setOperator(operators[Math.floor(Math.random() * operators.length)]);
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
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    const reward = Math.floor(Math.random() * 951) + 50;
    updateCoins(reward);
    setClaimed(true);
    triggerAlert(`You claimed ${reward} coins!`, 'success');
  };

  return (
    <div className="text-center">
      <p className="text-lg mb-4">Reward Range: 50 - 1000 coins</p>
      <button onClick={handleClaim} disabled={claimed} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400">
        {claimed ? 'Claimed' : 'Claim'}
      </button>
    </div>
  );
};

const NumberEncodingMode = ({ updateCoins }) => {
  return <div className="text-center"><p>Number Encoding Mode - Coming Soon!</p></div>;
};

const MemoryMode = ({ updateCoins, setMemoryGameCompleted }) => {
  return <div className="text-center"><p>Memory Game Mode - Coming Soon!</p></div>;
};

export default Tasks;
