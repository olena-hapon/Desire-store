declare module '*.mp4?inline' {
  const content: string;
  export default content;
}

declare module '*.mp4' {
  const content: string;
  export default content;
}