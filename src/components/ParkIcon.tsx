export function ParkIcon({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" width={size} height={size}>
      <circle cx="20" cy="20" r="20" fill="#00C9A7" />
      <path
        d="M20 7C14.5 7 10 12 10 17.5C10 25 20 33 20 33C20 33 30 25 30 17.5C30 12 25.5 7 20 7Z"
        fill="white"
      />
      <circle cx="20" cy="17.5" r="4" fill="#00C9A7" />
    </svg>
  );
}
