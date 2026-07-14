'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInAnonymously, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';

interface UserProfile {
  uid: string;
  username: string;
  isAnonymous: boolean;
  isOffline: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isOffline: boolean;
  loginAnonymously: () => Promise<UserProfile>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const prefixes = ["Happy", "Kind", "Sunny", "Peaceful", "Sparkly", "Brave", "Magic", "Friendly", "Cosmic", "Gentle"];
const nouns = ["Panda", "Koala", "Dolphin", "Rabbit", "Deer", "Squirrel", "Star", "Cloud", "Flower", "Butterfly"];

const generateAnonymousUsername = (): string => {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${noun}${randomNum}`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(true);

  useEffect(() => {
    const configured = isFirebaseConfigured();
    setIsOffline(!configured);

    if (configured && auth && db) {
      // Listen to Firebase Auth state
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            // Get or create Firestore user doc
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            let username = '';
            if (userSnap.exists()) {
              username = userSnap.data().username;
            } else {
              username = generateAnonymousUsername();
              await setDoc(userRef, {
                username,
                createdAt: serverTimestamp(),
              });
            }

            setUser({
              uid: firebaseUser.uid,
              username,
              isAnonymous: firebaseUser.isAnonymous,
              isOffline: false,
            });
          } catch (error) {
            console.error("Error synchronizing auth user profile:", error);
            // Fallback user if Firestore fails (permissions, offline etc.)
            setUser({
              uid: firebaseUser.uid,
              username: "YouAreOkayFriend",
              isAnonymous: firebaseUser.isAnonymous,
              isOffline: false,
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Local storage fallback flow
      const loadOfflineUser = () => {
        try {
          const stored = localStorage.getItem('youareokay_offline_user');
          if (stored) {
            setUser(JSON.parse(stored));
          }
        } catch (e) {
          console.error("Error reading offline user:", e);
        }
        setLoading(false);
      };

      loadOfflineUser();
    }
  }, []);

  const loginAnonymously = async (): Promise<UserProfile> => {
    setLoading(true);
    const configured = isFirebaseConfigured();

    if (configured && auth && db) {
      try {
        const credential = await signInAnonymously(auth);
        const firebaseUser = credential.user;

        // Fetch or create profile
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        let username = '';
        if (userSnap.exists()) {
          username = userSnap.data().username;
        } else {
          username = generateAnonymousUsername();
          await setDoc(userRef, {
            username,
            createdAt: serverTimestamp(),
          });
        }

        const profile = {
          uid: firebaseUser.uid,
          username,
          isAnonymous: firebaseUser.isAnonymous,
          isOffline: false,
        };

        setUser(profile);
        setLoading(false);
        return profile;
      } catch (error) {
        console.error("Firebase anonymous sign-in error:", error);
        setLoading(false);
        throw error;
      }
    } else {
      // Offline implementation
      const newUid = 'offline-' + Math.random().toString(36).substring(2, 11);
      const newUsername = generateAnonymousUsername();
      const profile = {
        uid: newUid,
        username: newUsername,
        isAnonymous: true,
        isOffline: true,
      };

      try {
        localStorage.setItem('youareokay_offline_user', JSON.stringify(profile));
      } catch (e) {
        console.error("Error saving offline user:", e);
      }

      setUser(profile);
      setLoading(false);
      return profile;
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    const configured = isFirebaseConfigured();

    if (configured && auth) {
      try {
        await signOut(auth);
        setUser(null);
      } catch (error) {
        console.error("Firebase logout error:", error);
      }
    } else {
      try {
        localStorage.removeItem('youareokay_offline_user');
      } catch (e) {
        console.error("Error removing offline user:", e);
      }
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isOffline, loginAnonymously, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
