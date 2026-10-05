import React from 'react';
import { Globe, Moon, Sun, RotateCcw, Download, ShieldCheck, Calendar, Users, CheckCircle, AlertTriangle } from 'lucide-react';

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
      <div className="header-top-banner">
        <div className="banner-content">
          <span className="live-pulse"></span>
          <span className="banner-participant" id="workspace-status">
            {t.workspaceStatus}
          </span>
        </div>
        <div className="banner-actions">
          <button
            type="button"
            className="banner-btn"
            onClick={onOpenRules}
            title="View Contest Business Rules"
            id="view-rules-btn"
          >
            <ShieldCheck size={14} />
            <span>Rules</span>
          </button>
          <button
            type="button"
            className="banner-btn"
            onClick={onResetData}
            title={t.resetToSampleData}
            id="reset-sample-data-btn"
          >
            <RotateCcw size={14} />
            <span>{t.resetToSampleData}</span>
          </button>
          <button
            type="button"
            className="banner-btn"
            onClick={onExportJSON}
            title={t.exportJSON}
            id="export-backup-btn"
          >
            <Download size={14} />
            <span>JSON</span>
          </button>
        </div>
      </div>

      <div className="header-main">
        <div className="header-branding">
          <div className="brand-icon-wrapper">
            <div className="brand-icon">
              <Calendar className="icon-main" size={24} />
            </div>
          </div>
          <div>
            <h1 className="app-title">{t.appName}</h1>
            <p className="app-subtitle">{t.appSubtitle}</p>
          </div>
        </div>

        <div className="header-controls">
          {/* Clearly visible language switch */}
          <button
            type="button"
            className={`control-btn lang-toggle ${lang === 'bn' ? 'active-bn' : 'active-en'}`}
            onClick={onToggleLang}
            id="language-switch-btn"
            aria-label="Switch Language between English and Bangla"
          >
            <Globe size={18} className="control-icon" />
            <span className="lang-label">
              {lang === 'en' ? 'বাংলা (BN)' : 'English (EN)'}
            </span>
          </button>

          {/* Dark / Light theme toggle */}
          <button
            type="button"
            className="control-btn theme-toggle"
            onClick={onToggleTheme}
            id="theme-toggle-btn"
            aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            title={theme === 'dark' ? t.lightMode : t.darkMode}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="theme-icon sun-icon" />
            ) : (
              <Moon size={18} className="theme-icon moon-icon" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
