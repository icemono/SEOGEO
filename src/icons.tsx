export function Icon({ name = 'arrow', size = 20 }: { name?: string; size?: number }) {
 const paths: Record<string, React.ReactNode> = {
  arrow:<><path d="M5 12h14M13 6l6 6-6 6"/></>,
  code:<><path d="m7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18"/></>,
  search:<><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  grid:<><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/></>,
  sparkle:<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>,
  copy:<><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H3v12h5"/></>,
  check:<path d="m5 12 4 4L19 6"/>,
  external:<><path d="M14 3h7v7m0-7L10 14M9 3H3v18h18v-6"/></>,
  book:<><path d="M12 5v16m0-16C8 2 3 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-2-7-2-10 1Z"/></>,
  github:<><path d="M8 20c-5 1-5-3-7-3m14 5v-4c0-1-.4-2-1-2.5 4-.5 7-2 7-6.5 0-1.7-.6-3-1.7-4 .2-.8.2-2-.2-3-1.8-.1-3 1-4 1.7a15 15 0 0 0-6.2 0C8 3 6.8 2 5 2c-.4 1-.4 2.2-.2 3C3.6 6 3 7.3 3 9c0 4.5 3 6 7 6.5-.6.5-1 1.5-1 2.5v4"/></>,
 }
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.arrow}</svg>
}
