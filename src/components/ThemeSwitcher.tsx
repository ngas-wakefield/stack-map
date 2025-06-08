import React from 'react';
import { Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';

const themes = ['Light', 'Dark', 'Galaxy'];

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState('Galaxy');

  const applyTheme = (themeName: string) => {
    // For MVP, simple background color change:
    switch (themeName) {
      case 'Light':
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        break;
      case 'Dark':
        document.body.style.backgroundColor = '#222';
        document.body.style.color = '#eee';
        break;
      case 'Galaxy':
        document.body.style.backgroundColor = '#09021c';
        document.body.style.color = '#e0c2ff';
        break;
    }
    setTheme(themeName);
  };

  return (
    <DropdownButton
      as={ButtonGroup}
      title={`Theme: ${theme}`}
      id="theme-switcher"
      onSelect={(key) => key && applyTheme(key)}
      variant="secondary"
      size="sm"
    >
      {themes.map((t) => (
        <Dropdown.Item key={t} eventKey={t}>
          {t}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}
