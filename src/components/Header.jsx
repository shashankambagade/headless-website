// Header.jsx
import { useState } from 'react';
import Menu from './Menu';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-0 left-0 w-full z-50">
      <Menu />
    </div>
  );
}
