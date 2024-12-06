import React, { useState } from 'react';
import { EmailVerification } from './components/EmailVerification';
import { GenderSelection } from './components/GenderSelection';
import { ChatInterface } from './components/ChatInterface';
import { useChatStore } from './store/chatStore';
import type { Gender } from './types/chat';

function App() {
  const [step, setStep] = useState<'email' | 'gender' | 'chat'>('email');
  const { setUser } = useChatStore();

  const handleEmailVerify = (email: string) => {
    // In a real app, we would verify the email here
    setUser({
      id: crypto.randomUUID(),
      email,
      verified: true,
      gender: 'male', // Temporary, will be set in next step
    });
    setStep('gender');
  };

  const handleGenderSelect = (gender: Gender) => {
    setUser((prev) => prev ? { ...prev, gender } : null);
    setStep('chat');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {step === 'email' && <EmailVerification onVerify={handleEmailVerify} />}
        {step === 'gender' && <GenderSelection onSelect={handleGenderSelect} />}
        {step === 'chat' && <ChatInterface />}
      </div>
    </div>
  );
}

export default App;