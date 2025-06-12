
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  title?: string;
  subtitle?: string;
  length?: number;
}

const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  title = "Enter Verification Code",
  subtitle = "Please enter the 6-digit code sent to your device",
  length = 6
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOtp(new Array(length).fill(''));
    }
  }, [isOpen, length]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < length - 1) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
    
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === length) {
      setIsLoading(true);
      try {
        await onVerify(otpString);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResend = () => {
    setOtp(new Array(length).fill(''));
    // Focus first input
    const firstInput = document.querySelector('input[data-index="0"]') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400 text-sm">{subtitle}</p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <div key={index}>
                <input
                  data-index={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold text-white bg-gray-800 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 hover:border-gray-600"
                  maxLength={1}
                  inputMode="numeric"
                  autoFocus={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={otp.join('').length !== length || isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 mb-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              'Verify Code'
            )}
          </button>

          {/* Resend */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;