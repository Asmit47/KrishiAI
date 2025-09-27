import { cn } from "../../lib/utils";
import { Paperclip, Send, Mic } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend: (message: string) => void;
  onAttach?: () => void;
  onVoiceInput?: (isListening: boolean) => void;
  isLoading?: boolean;
}

export const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({
    className,
    onSend,
    onAttach,
    onVoiceInput,
    isLoading = false,
    ...props
  }, ref) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (props.value && typeof props.value === 'string' && props.value.trim()) {
        onSend(props.value.trim());
        if (ref && typeof ref === 'object' && 'current' in ref && ref.current) {
          ref.current.value = '';
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const handleMicrophoneClick = () => {
      if (!recognitionRef.current) {
        const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';
          
          recognition.onstart = () => {
            setIsListening(true);
            onVoiceInput?.(true);
          };
          
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            if (ref && typeof ref === 'object' && 'current' in ref && ref.current) {
              ref.current.value = transcript;
            }
            setIsListening(false);
            onVoiceInput?.(false);
          };
          
          recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            onVoiceInput?.(false);
          };
          
          recognition.onend = () => {
            setIsListening(false);
            onVoiceInput?.(false);
          };
          
          recognitionRef.current = recognition;
          recognition.start();
        } else {
          alert('Speech recognition is not supported in this browser.');
        }
      } else {
        if (isListening) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        } else {
          recognitionRef.current.start();
        }
      }
    };

    useEffect(() => {
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    }, []);

    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 p-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus-within:border-green-500 focus-within:bg-white dark:focus-within:bg-gray-800 transition-all"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAttach}
            className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleMicrophoneClick}
            className={`h-8 w-8 flex items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
              isListening 
                ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        
        <textarea
          ref={ref}
          className={cn(
            "flex-1 min-h-8 max-h-32 resize-none border-0 bg-transparent px-2 py-1 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            className,
          )}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          {...props}
        />
        
        <button 
          type="submit" 
          className="h-8 w-8 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !props.value || (typeof props.value === 'string' && !props.value.trim())}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    );
  },
);

ChatInput.displayName = "ChatInput";
