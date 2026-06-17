export function FlipText({ children }: { children: string }) {
  return (
    <span className="flip-text" aria-label={children}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}
