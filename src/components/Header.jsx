import React from 'react';
import { Globe, Moon, Sun, RotateCcw, Download, ShieldCheck, Layers } from 'lucide-react';

export function Header({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  t,
  onResetData,
  onExportJSON,
  onOpenRules,
}) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left Branding */}
        <div className="header-branding">
          <div className="brand-logo-mark" aria-hidden="true">
            <Layers size={20} className="brand-logo-icon" />
          </div>
          <div className="brand-titles">
            <div className="brand-primary-row">
              <h1 className="app-title">{t.appName}</h1>
              <span className="live-status-pill" id="workspace-status">
                <span className="status-dot" aria-hidden="true"></span>
                <span>{t.workspaceStatus}</span>
              </span>
            </div>
            <p className="app-subtitle">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Right Actions & Controls */}
        <div className="header-actions">
          <div className="header-utility-group">
            <button
              type="button"
              className="utility-btn"
              onClick={onOpenRules}
              title={t.businessRulesTitle}
              id="view-rules-btn"
            >
              <ShieldCheck size={15} />
              <span>{lang === 'bn' ? 'নিয়মাবলী' : 'Rules'}</span>
            </button>
            <button
              type="button"
              className="utility-btn"
              onClick={onResetData}
              title={t.resetToSampleData}
              id="reset-sample-data-btn"
            >
              <RotateCcw size={15} />
              <span>{t.resetToSampleData}</span>
            </button>
            <button
              type="button"
              className="utility-btn"
              onClick={onExportJSON}
              title={t.exportJSON}
              id="export-backup-btn"
            >
              <Download size={15} />
              <span>JSON</span>
            </button>
          </div>

          <div className="header-separator" aria-hidden="true"></div>

          <div className="header-preferences-group">
            <button
              type="button"
              className="control-btn lang-toggle"
              onClick={onToggleLang}
              id="language-switch-btn"
              aria-label="Switch Language"
            >
              <Globe size={15} />
              <span className="lang-text">{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            <button
              type="button"
              className="control-btn theme-toggle"
              onClick={onToggleTheme}
              id="theme-toggle-btn"
              aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
              title={theme === 'dark' ? t.lightMode : t.darkMode}
            >
              {theme === 'dark' ? (
                <Sun size={16} className="theme-icon sun-icon" />
              ) : (
                <Moon size={16} className="theme-icon moon-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

