"use client";

import { useCallback, useRef, useState, useEffect } from "react";

interface ARIAOptions {
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
  onListenResult?: (text: string) => void;
}

export function useARIA(options: ARIAOptions = {}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSupported("speechSynthesis" in window);
    }
  }, []);

  const speak = useCallback((text: string, priority: "high" | "normal" = "normal") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (priority === "high") {
      window.speechSynthesis.cancel();
    } else if (window.speechSynthesis.speaking) {
      return;
    }

    setCurrentText(text);
    const utterance = new SpeechSynthesisUtterance(text);

    // Find the best available voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      voices.find((v) => v.name.includes("Google UK English Female")),
      voices.find((v) => v.name.includes("Microsoft Zira")),
      voices.find((v) => v.name.includes("Google US English")),
      voices.find((v) => v.lang === "en-IN"),
      voices.find((v) => v.lang.startsWith("en")),
    ].filter(Boolean);

    if (preferredVoices[0]) {
      utterance.voice = preferredVoices[0] as SpeechSynthesisVoice;
    }

    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.volume = 0.9;

    utterance.onstart = () => {
      setIsSpeaking(true);
      options.onSpeakStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentText("");
      options.onSpeakEnd?.();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentText("");
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [options]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentText("");
    }
  }, []);

  const startListening = useCallback(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (SpeechRecognition as any)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      options.onListenResult?.(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [options]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any).stop();
      setIsListening(false);
    }
  }, []);

  return {
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    isSpeaking,
    isListening,
    isSupported,
    currentText,
  };
}
