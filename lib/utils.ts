import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function BlurData(width: number, height: number) {
  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f4f4f4" offset="20%" />
          <stop stop-color="#fff" offset="50%"/>
          <stop stop-color="#f4f4f4" offset="80%"  />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f4f4f4" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const blurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(width, height)
  )}`;

  return blurDataURL;
}
