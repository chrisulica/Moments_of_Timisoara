import * as mock from "./api.mock.js";
import * as real from "./api.real.js";

const impl = import.meta.env.VITE_USE_MOCK === "true" ? mock : real;

export const uploadPhoto = (...args) => impl.uploadPhoto(...args);
export const subscribeToPhotos = (...args) => impl.subscribeToPhotos(...args);