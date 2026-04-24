import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <h2>new Layouyt</h2>
      {children}
    </div>
  );
}
