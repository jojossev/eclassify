"use client";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";
import { createStickyNote, t } from ".";
import { getFcmToken } from "@/redux/reducer/settingSlice";

const noop = () => Promise.resolve();
const noopUnsubscribe = () => {};

let missingFirebaseConfigWarned = false;

const buildFirebaseConfig = () => ({
  apiKey: process.env.NEXT_PUBLIC_API_KEY?.trim(),
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN?.trim(),
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID?.trim(),
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET?.trim(),
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID?.trim(),
  appId: process.env.NEXT_PUBLIC_APP_ID?.trim(),
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID?.trim(),
});

const isFirebaseWebConfigUsable = (config) =>
  Boolean(
    config.apiKey &&
      config.projectId &&
      config.appId &&
      config.apiKey.length > 10
  );

const FirebaseData = () => {
  const firebaseConfig = buildFirebaseConfig();

  if (!isFirebaseWebConfigUsable(firebaseConfig)) {
    if (typeof window !== "undefined" && !missingFirebaseConfigWarned) {
      missingFirebaseConfigWarned = true;
      console.warn(
        "[eClassify] Firebase env vars are missing or incomplete; push notifications and Firebase auth are disabled. Set NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_PROJECT_ID, NEXT_PUBLIC_APP_ID, etc."
      );
    }
    return {
      firebase: null,
      authentication: null,
      fetchToken: async () => {},
      onMessageListener: async () => noopUnsubscribe,
      signOut: noop,
    };
  }

  let firebaseApp;
  let authentication;
  try {
    firebaseApp = !getApps().length
      ? initializeApp(firebaseConfig)
      : getApp();
    authentication = getAuth(firebaseApp);
  } catch (err) {
    if (typeof window !== "undefined" && !missingFirebaseConfigWarned) {
      missingFirebaseConfigWarned = true;
      console.warn("[eClassify] Firebase initialization failed:", err?.message || err);
    }
    return {
      firebase: null,
      authentication: null,
      fetchToken: async () => {},
      onMessageListener: async () => noopUnsubscribe,
      signOut: noop,
    };
  }

  const messagingInstance = async () => {
    try {
      const isSupportedBrowser = await isSupported();
      if (isSupportedBrowser) {
        return getMessaging(firebaseApp);
      } else {
        createStickyNote();
        return null;
      }
    } catch (err) {
      console.error("Error checking messaging support:", err);
      return null;
    }
  };

  const fetchToken = async (setFcmToken) => {
    try {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const messaging = await messagingInstance();
        if (!messaging) {
          console.error("Messaging not supported.");
          return;
        }
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          })
            .then((currentToken) => {
              if (currentToken) {
                getFcmToken(currentToken);
                setFcmToken(currentToken);
              } else {
                console.error("No token found");
                toast.error(t("permissionRequired"));
              }
            })
            .catch((err) => {
              console.error("Error retrieving token:", err);
              if (err.message?.includes?.("no active Service Worker")) {
                registerServiceWorker();
              }
            });
        } else {
          console.error("Permission not granted");
        }
      }
    } catch (err) {
      console.error("Error requesting notification permission:", err);
    }
  };

  const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
          fetchToken(() => {});
        })
        .catch((err) => {
          console.log("Service Worker registration failed: ", err);
        });
    }
  };

  const onMessageListener = async (callback) => {
    const messaging = await messagingInstance();
    if (messaging) {
      return onMessage(messaging, callback);
    } else {
      console.error("Messaging not supported.");
      return null;
    }
  };

  const signOut = () => authentication.signOut();

  return {
    firebase: null,
    authentication,
    fetchToken,
    onMessageListener,
    signOut,
  };
};

export default FirebaseData;
