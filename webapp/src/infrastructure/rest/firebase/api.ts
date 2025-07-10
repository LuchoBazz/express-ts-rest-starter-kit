import type { Method } from "axios";
import { FIREBASE_API_KEY, firebaseApiInstance } from ".";

export const httpFirebaseRequest = async <T>(
  method: Method,
  url: string,
  body: {} = {},
  query: {} = {},
): Promise<T> => {
  try {
    const { data } = await firebaseApiInstance.request<T>({
      method,
      url,
      data: body,
      params: { ...query, key: FIREBASE_API_KEY },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};

/*

interface FirebaseLoginPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

interface FirebaseLoginResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  email: string;
}

export const loginWithFirebase = async (email: string, password: string): Promise<FirebaseLoginResponse> => {
  const body: FirebaseLoginPayload = {
    email,
    password,
    returnSecureToken: true,
  };

  try {
    const { data } = await firebaseApiInstance.post<FirebaseLoginResponse>(
      `/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      body,
    );

    return data;
  } catch (error: any) {
    throw error;
  }
};
*/
