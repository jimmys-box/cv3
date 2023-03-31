import { useState, useEffect } from 'react';
import styles from '@/styles/Menu.module.css';
import { useRouter } from 'next/router';

interface MenuItemProps {
  label: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size: string }>;
  isOpen?: boolean;
  setOpenItem?: (label: string) => void;
}

export default function MenuItem({
  label,
  children,
  icon: Icon,
  isOpen = false,
  setOpenItem = () => {}
}: MenuItemProps) {
  const router = useRouter();

  function toggleExpanded() {
    setOpenItem(isOpen ? '' : label);
  }

  useEffect(() => {
    setOpenItem('');
  }, [router.asPath]);

  return (
    <div onClick={toggleExpanded}>
      <div className={styles.subMenuItem}>
        {Icon && <Icon size="36" />}
        <p>{label}</p>
      </div>

      {isOpen && <div className="menu-item-expanded">{children}</div>}
    </div>
  );
}