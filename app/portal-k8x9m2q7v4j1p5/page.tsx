'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  FiHome,
  FiInfo,
  FiLayers,
  FiBriefcase,
  FiPhone,
  FiCalendar,
  FiCode,
  FiShoppingBag,
  FiSearch,
  FiTrendingUp,
  FiRepeat,
  FiFileText,
  FiBookOpen,
  FiMic,
  FiVideo,
  FiMail,
  FiShield,
  FiCheckSquare,
  FiDollarSign,
  FiKey,
  FiExternalLink,
  FiLogOut,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
} from 'react-icons/fi';
import {
  CmsSiteContent,
  CmsArticle,
  CHARACTER_LIMITS,
  HomeGalleryItem,
  HomeServiceItem,
  HomeProjectItem,
} from '~/lib/cms/types';
import { ALL_SERVICE_PAGES, ServiceMenuItem } from '~/data/allServiceLinks';

function getCategoryIcon(category: string) {
  switch (category) {
    case 'software':
      return <FiCode size={14} style={{ flexShrink: 0, opacity: 0.85 }} />;
    case 'shopify':
      return <FiShoppingBag size={14} style={{ flexShrink: 0, opacity: 0.85 }} />;
    case 'search_ai':
      return <FiSearch size={14} style={{ flexShrink: 0, opacity: 0.85 }} />;
    case 'optimise':
      return <FiTrendingUp size={14} style={{ flexShrink: 0, opacity: 0.85 }} />;
    case 'migrations':
      return <FiRepeat size={14} style={{ flexShrink: 0, opacity: 0.85 }} />;
    default:
      return <FiLayers size={14} style={{ flexShrink: 0, opacity: 0.85 }} />;
  }
}

interface UserInfo {
  id: string;
  email: string;
  twoFactorEnabled: boolean;
}

export default function CmsPortalPage() {
  // Auth state
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  // Login form state
  const [email, setEmail] = useState('samiullahqureshi@gmail.com');
  const [password, setPassword] = useState('sami@1234');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2FA login challenge state
  const [requires2fa, setRequires2fa] = useState(false);
  const [pendingUserId, setPendingUserId] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Navigation & Search state
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchFilter, setSearchFilter] = useState('');

  // Site content state
  const [siteContent, setSiteContent] = useState<CmsSiteContent | null>(null);
  const [contentSaving, setContentSaving] = useState(false);
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  // Articles state
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<CmsArticle | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [articleFormSaving, setArticleFormSaving] = useState(false);
  const [articleMessage, setArticleMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Security state (Password & 2FA)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pwdSaving, setPwdSaving] = useState(false);

  // 2FA Setup state
  const [twoFaSetupData, setTwoFaSetupData] = useState<{
    secret: string;
    otpAuthUri: string;
    recoveryCodes: string[];
  } | null>(null);
  const [twoFaVerifyCode, setTwoFaVerifyCode] = useState('');
  const [twoFaSetupError, setTwoFaSetupError] = useState('');
  const [twoFaSetupSuccess, setTwoFaSetupSuccess] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      setLoading(true);
      const res = await fetch('/api/cms/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          loadSiteContent();
          loadArticles();
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadSiteContent() {
    try {
      const res = await fetch('/api/cms/content');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setSiteContent(data.content);
        }
      }
    } catch (e) {
      console.error('Failed to load site content:', e);
    }
  }

  async function loadArticles() {
    try {
      const res = await fetch('/api/cms/articles?all=true');
      if (res.ok) {
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
        }
      }
    } catch (e) {
      console.error('Failed to load articles:', e);
    }
  }

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/cms/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || 'Invalid credentials');
        setIsSubmitting(false);
        return;
      }

      if (data.requires2fa) {
        setRequires2fa(true);
        setPendingUserId(data.userId);
        setIsSubmitting(false);
        return;
      }

      setUser(data.user);
      loadSiteContent();
      loadArticles();
    } catch {
      setLoginError('An unexpected connection error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle 2FA Verification
  async function handleVerify2fa(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/cms/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: pendingUserId, code: twoFactorCode.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || 'Invalid 2FA code');
        setIsSubmitting(false);
        return;
      }

      setRequires2fa(false);
      setUser(data.user);
      loadSiteContent();
      loadArticles();
    } catch {
      setLoginError('An unexpected connection error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await fetch('/api/cms/auth/logout', { method: 'POST' });
      setUser(null);
      setPassword('');
      setRequires2fa(false);
    } catch (e) {
      console.error('Logout error:', e);
    }
  }

  // Save Page Content
  async function handleSaveContent() {
    if (!siteContent) return;
    setContentSaving(true);
    setContentSaveSuccess(false);

    try {
      const res = await fetch('/api/cms/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteContent),
      });
      if (res.ok) {
        setContentSaveSuccess(true);
        setTimeout(() => setContentSaveSuccess(false), 4000);
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to save content');
      }
    } catch {
      alert('Network error saving content');
    } finally {
      setContentSaving(false);
    }
  }

  // Handle Change Password
  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwdMessage(null);
    setPwdSaving(true);

    try {
      const res = await fetch('/api/cms/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwdMessage({ type: 'success', text: 'Password successfully updated!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPwdMessage({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch {
      setPwdMessage({ type: 'error', text: 'Network error updating password' });
    } finally {
      setPwdSaving(false);
    }
  }

  // Start 2FA Setup
  async function handleStart2faSetup() {
    setTwoFaSetupError('');
    setTwoFaSetupSuccess('');
    try {
      const res = await fetch('/api/cms/auth/setup-2fa', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setTwoFaSetupData(data);
      } else {
        setTwoFaSetupError(data.error || 'Failed to initialize 2FA setup');
      }
    } catch {
      setTwoFaSetupError('Failed to initialize 2FA');
    }
  }

  // Confirm and Enable 2FA
  async function handleConfirm2fa(e: React.FormEvent) {
    e.preventDefault();
    if (!twoFaSetupData) return;
    setTwoFaSetupError('');

    try {
      const res = await fetch('/api/cms/auth/confirm-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: twoFaSetupData.secret,
          code: twoFaVerifyCode.trim(),
          recoveryCodes: twoFaSetupData.recoveryCodes,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setTwoFaSetupSuccess('Two-Factor Authentication is now active on your account!');
        setTwoFaSetupData(null);
        setTwoFaVerifyCode('');
        if (user) {
          setUser({ ...user, twoFactorEnabled: true });
        }
      } else {
        setTwoFaSetupError(data.error || 'Invalid 6-digit code');
      }
    } catch {
      setTwoFaSetupError('Connection error confirming 2FA');
    }
  }

  // Save Article
  async function handleSaveArticle(article: Partial<CmsArticle>, isNew: boolean) {
    setArticleFormSaving(true);
    setArticleMessage(null);

    try {
      const url = isNew ? '/api/cms/articles' : `/api/cms/articles/${article.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      const data = await res.json();

      if (res.ok) {
        setArticleMessage({
          type: 'success',
          text: isNew ? 'Article created successfully!' : 'Article updated successfully!',
        });
        setEditingArticle(null);
        setIsCreatingArticle(false);
        loadArticles();
      } else {
        setArticleMessage({ type: 'error', text: data.error || 'Failed to save article' });
      }
    } catch {
      setArticleMessage({ type: 'error', text: 'Network error saving article' });
    } finally {
      setArticleFormSaving(false);
    }
  }

  // Delete Article
  async function handleDeleteArticle(id: string) {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const res = await fetch(`/api/cms/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticleMessage({ type: 'success', text: 'Article deleted successfully' });
        loadArticles();
      } else {
        alert('Failed to delete article');
      }
    } catch {
      alert('Network error deleting article');
    }
  }

  // Character limit counter helper
  const renderCharMeter = (currentText: string | undefined, limitKey: string) => {
    const limit = CHARACTER_LIMITS[limitKey] || { max: 100, recommendedMax: 80, label: limitKey };
    const count = (currentText || '').length;
    const isOver = count > limit.max;
    const isWarning = limit.recommendedMax ? count > limit.recommendedMax : count > limit.max * 0.85;

    const pillClass = isOver
      ? 'ft-cms-counter__pill--danger'
      : isWarning
      ? 'ft-cms-counter__pill--warning'
      : 'ft-cms-counter__pill--safe';

    return (
      <div className="ft-cms-counter">
        <span className="ft-cms-counter__rec">
          Max: {limit.max} {limit.recommendedMax ? `(Ideal: ≤${limit.recommendedMax})` : ''}
        </span>
        <span className={`ft-cms-counter__pill ${pillClass}`}>
          {count} / {limit.max}
        </span>
      </div>
    );
  };

  // Live Image input & preview helper
  const renderImageField = (
    label: string,
    value: string | undefined,
    onChange: (val: string) => void,
    placeholder = 'https://... (Shopify CDN, Cloudinary, S3, Unsplash) or /images/...'
  ) => {
    const imgUrl = (value || '').trim();
    return (
      <div className="ft-cms-field ft-cms-col-span-2" style={{ background: '#090e1c', padding: '16px', borderRadius: '12px', border: '1px solid #1c2640', marginTop: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <label className="ft-cms-label" style={{ color: '#60a5fa', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🖼️</span> {label}
          </label>
          {imgUrl && (
            <span style={{ fontSize: '10px', color: '#34d399', fontFamily: 'monospace', fontWeight: 600 }}>
              ✓ Live Preview Active
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="ft-cms-input"
              style={{ fontSize: '12.5px', fontFamily: 'monospace' }}
            />
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Paste image URL (supports Shopify CDN, Cloudinary, S3, Unsplash) or local path (/images/...)
            </span>
          </div>

          {imgUrl ? (
            <div
              style={{
                width: '100px',
                height: '62px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #28375a',
                backgroundColor: '#111728',
                position: 'relative',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={imgUrl}
                alt="Live Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLElement).style.opacity = '0.3';
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '100px',
                height: '62px',
                borderRadius: '8px',
                border: '1px dashed #28375a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: '11px',
                flexShrink: 0,
              }}
            >
              No image
            </div>
          )}
        </div>
      </div>
    );
  };

  // Filtered Services List
  const filteredServices = useMemo(() => {
    if (!searchFilter.trim()) return ALL_SERVICE_PAGES;
    const q = searchFilter.toLowerCase().trim();
    return ALL_SERVICE_PAGES.filter(
      (s) =>
        s.label.toLowerCase().includes(q) ||
        s.key.toLowerCase().includes(q) ||
        s.defaultHeading.toLowerCase().includes(q)
    );
  }, [searchFilter]);

  // Active Service Item (if current section is a service)
  const currentServiceItem = useMemo(() => {
    return ALL_SERVICE_PAGES.find((s) => s.key === activeSection);
  }, [activeSection]);

  if (loading) {
    return (
      <div className="ft-cms-wrapper" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #2563eb', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loading Master Portal...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: MINIMAL CLEAN LOGIN FORM
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#060813', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
        <div style={{ width: '100%', maxWidth: '380px', backgroundColor: '#0c101d', border: '1px solid #1a2238', borderRadius: '16px', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
            <img
              src="https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655"
              alt="ByteOperator"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          {loginError && (
            <div style={{ marginBottom: '20px', padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '12px', textAlign: 'center' }}>
              {loginError}
            </div>
          )}

          {!requires2fa ? (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="ft-cms-input"
                />
              </div>

              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="ft-cms-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="ft-cms-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px' }}
              >
                {isSubmitting ? 'Verifying...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify2fa} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={12}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="2FA Code"
                  className="ft-cms-input"
                  style={{ textAlign: 'center', letterSpacing: '0.2em', fontFamily: 'monospace', fontSize: '16px' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="ft-cms-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                {isSubmitting ? 'Verifying...' : 'Verify'}
              </button>

              <button
                type="button"
                onClick={() => setRequires2fa(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: MASTER ADMIN CMS DASHBOARD WITH COMPREHENSIVE SIDEBAR
  // -------------------------------------------------------------
  return (
    <div className="ft-cms-wrapper">
      {/* Top Navigation Bar */}
      <header className="ft-cms-nav">
        <div className="ft-cms-nav__brand">
          <img
            src="https://cdn.shopify.com/s/files/1/0928/7421/1691/files/final.png?v=1790264655"
            alt="ByteOperator"
            className="ft-cms-nav__logo"
          />
          <span className="ft-cms-nav__badge">Master Studio</span>
        </div>

        <div className="ft-cms-nav__actions">
          <div className="ft-cms-nav__user-pill">
            <span>{user.email}</span>
            <span
              className={`ft-cms-nav__status-dot ${
                user.twoFactorEnabled
                  ? 'ft-cms-nav__status-dot--active'
                  : 'ft-cms-nav__status-dot--inactive'
              }`}
            >
              {user.twoFactorEnabled ? '● 2FA Active' : '○ 2FA Off'}
            </span>
          </div>

          <Link href="/" target="_blank" className="ft-cms-btn-secondary">
            <FiExternalLink size={13} />
            <span>Live Site</span>
          </Link>

          <button onClick={handleLogout} className="ft-cms-btn-danger">
            <FiLogOut size={13} />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="ft-cms-body">
        {/* Left Comprehensive Sidebar */}
        <div className="ft-cms-sidebar">
          {/* Quick Search / Filter Box */}
          <div className="ft-cms-sidebar__search-sticky">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search 40+ pages..."
              className="ft-cms-input"
              style={{ padding: '8px 12px', fontSize: '12px', background: '#111728' }}
            />
          </div>

          {/* 1. CORE / MAIN PAGES */}
          <div className="ft-cms-sidebar__group-title">
            <span>Main Pages</span>
            <span>6</span>
          </div>

          <button
            onClick={() => setActiveSection('home')}
            className={`ft-cms-sidebar__item ${activeSection === 'home' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiHome size={14} />
            <span>Home Page</span>
          </button>

          <button
            onClick={() => setActiveSection('about')}
            className={`ft-cms-sidebar__item ${activeSection === 'about' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiInfo size={14} />
            <span>About Us</span>
          </button>

          <button
            onClick={() => setActiveSection('services')}
            className={`ft-cms-sidebar__item ${activeSection === 'services' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiLayers size={14} />
            <span>Services Hub</span>
          </button>

          <button
            onClick={() => setActiveSection('work')}
            className={`ft-cms-sidebar__item ${activeSection === 'work' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiBriefcase size={14} />
            <span>Case Studies & Work</span>
          </button>

          <button
            onClick={() => setActiveSection('contact')}
            className={`ft-cms-sidebar__item ${activeSection === 'contact' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiPhone size={14} />
            <span>Contact Us</span>
          </button>

          <button
            onClick={() => setActiveSection('bookACall')}
            className={`ft-cms-sidebar__item ${activeSection === 'bookACall' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiCalendar size={14} />
            <span>Book A Call</span>
          </button>

          {/* 2. SERVICES & SUB-SERVICES */}
          {/* Software & Engineering */}
          <div className="ft-cms-sidebar__group-title">
            <span>Software & Engineering</span>
            <span>7</span>
          </div>

          {filteredServices
            .filter((s) => s.category === 'software')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`ft-cms-sidebar__item ${
                  activeSection === item.key ? 'ft-cms-sidebar__item--active' : ''
                }`}
              >
                <FiCode size={14} />
                <span>{item.label}</span>
              </button>
            ))}

          {/* Shopify & Ecommerce */}
          <div className="ft-cms-sidebar__group-title">
            <span>Shopify & Ecommerce</span>
            <span>6</span>
          </div>

          {filteredServices
            .filter((s) => s.category === 'shopify')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`ft-cms-sidebar__item ${
                  activeSection === item.key ? 'ft-cms-sidebar__item--active' : ''
                }`}
              >
                <FiShoppingBag size={14} />
                <span>{item.label}</span>
              </button>
            ))}

          {/* Search & AI Visibility */}
          <div className="ft-cms-sidebar__group-title">
            <span>Search & AI</span>
            <span>6</span>
          </div>

          {filteredServices
            .filter((s) => s.category === 'search_ai')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`ft-cms-sidebar__item ${
                  activeSection === item.key ? 'ft-cms-sidebar__item--active' : ''
                }`}
              >
                <FiSearch size={14} />
                <span>{item.label}</span>
              </button>
            ))}

          {/* Optimise & Support */}
          <div className="ft-cms-sidebar__group-title">
            <span>Optimise & Support</span>
            <span>5</span>
          </div>

          {filteredServices
            .filter((s) => s.category === 'optimise')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`ft-cms-sidebar__item ${
                  activeSection === item.key ? 'ft-cms-sidebar__item--active' : ''
                }`}
              >
                <FiTrendingUp size={14} />
                <span>{item.label}</span>
              </button>
            ))}

          {/* Platform Migrations */}
          <div className="ft-cms-sidebar__group-title">
            <span>Platform Migrations</span>
            <span>4</span>
          </div>

          {filteredServices
            .filter((s) => s.category === 'migrations')
            .map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`ft-cms-sidebar__item ${
                  activeSection === item.key ? 'ft-cms-sidebar__item--active' : ''
                }`}
              >
                <FiRepeat size={14} />
                <span>{item.label}</span>
              </button>
            ))}

          {/* 3. RESOURCES & MEDIA */}
          <div className="ft-cms-sidebar__group-title">
            <span>Resources & Media</span>
            <span>5</span>
          </div>

          <button
            onClick={() => setActiveSection('articles_mgr')}
            className={`ft-cms-sidebar__item ${activeSection === 'articles_mgr' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiFileText size={14} />
            <span>Blog & Articles</span>
            <span className="ft-cms-sidebar__badge">{articles.length}</span>
          </button>

          <button
            onClick={() => setActiveSection('guides')}
            className={`ft-cms-sidebar__item ${activeSection === 'guides' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiBookOpen size={14} />
            <span>Guides Directory</span>
          </button>

          <button
            onClick={() => setActiveSection('podcasts')}
            className={`ft-cms-sidebar__item ${activeSection === 'podcasts' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiMic size={14} />
            <span>Podcasts</span>
          </button>

          <button
            onClick={() => setActiveSection('webinars')}
            className={`ft-cms-sidebar__item ${activeSection === 'webinars' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiVideo size={14} />
            <span>Webinars</span>
          </button>

          <button
            onClick={() => setActiveSection('newsletter')}
            className={`ft-cms-sidebar__item ${activeSection === 'newsletter' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiMail size={14} />
            <span>Newsletter</span>
          </button>

          {/* 4. POLICIES & LEGAL */}
          <div className="ft-cms-sidebar__group-title">
            <span>Policies & Legal</span>
            <span>4</span>
          </div>

          <button
            onClick={() => setActiveSection('privacyPolicy')}
            className={`ft-cms-sidebar__item ${activeSection === 'privacyPolicy' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiShield size={14} />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveSection('termsOfService')}
            className={`ft-cms-sidebar__item ${activeSection === 'termsOfService' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiCheckSquare size={14} />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveSection('refundPolicy')}
            className={`ft-cms-sidebar__item ${activeSection === 'refundPolicy' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiDollarSign size={14} />
            <span>Refund Policy</span>
          </button>

          <button
            onClick={() => setActiveSection('subscriptionPolicy')}
            className={`ft-cms-sidebar__item ${activeSection === 'subscriptionPolicy' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiRepeat size={14} />
            <span>Subscription Policy</span>
          </button>

          {/* 5. SETTINGS & SECURITY (IN THE LAST) */}
          <div className="ft-cms-sidebar__group-title">
            <span>Settings & Security</span>
          </div>

          <button
            onClick={() => setActiveSection('security')}
            className={`ft-cms-sidebar__item ${activeSection === 'security' ? 'ft-cms-sidebar__item--active' : ''}`}
          >
            <FiKey size={14} />
            <span>Password & 2FA</span>
          </button>
        </div>

        {/* Main Workspace Content Area */}
        <main className="ft-cms-main">
          {/* Header Toolbar with Save Button */}
          {activeSection !== 'articles_mgr' && activeSection !== 'security' && (
            <div className="ft-cms-toolbar">
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  Editing: {currentServiceItem ? currentServiceItem.label : activeSection.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </h3>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>
                  Live changes will sync across all mobile, tablet, and desktop viewports.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {currentServiceItem && (
                  <Link
                    href={currentServiceItem.path}
                    target="_blank"
                    className="ft-cms-btn-secondary"
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                  >
                    <span>Preview Live ↗</span>
                  </Link>
                )}

                {contentSaveSuccess && (
                  <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 600 }}>
                    ✓ Published to Live Site!
                  </span>
                )}
                <button
                  onClick={handleSaveContent}
                  disabled={contentSaving}
                  className="ft-cms-btn-primary"
                >
                  {contentSaving ? 'Publishing...' : 'Publish Changes'}
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* EDITING A DEDICATED SPECIALIZED SERVICE PAGE */}
          {/* ======================================================== */}
          {currentServiceItem && siteContent && (
            <div className="ft-cms-card">
              <div className="ft-cms-card__title">
                {currentServiceItem.label} — Hero, Value Proposition & Media
              </div>

              <div className="ft-cms-grid-2">
                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Eyebrow Badge</label>
                  <input
                    type="text"
                    value={
                      siteContent.servicePages?.[currentServiceItem.key]?.eyebrow ??
                      currentServiceItem.defaultEyebrow
                    }
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        servicePages: {
                          ...siteContent.servicePages,
                          [currentServiceItem.key]: {
                            ...siteContent.servicePages?.[currentServiceItem.key],
                            eyebrow: e.target.value,
                            heading:
                              siteContent.servicePages?.[currentServiceItem.key]?.heading ??
                              currentServiceItem.defaultHeading,
                            description:
                              siteContent.servicePages?.[currentServiceItem.key]?.description ??
                              currentServiceItem.defaultDescription,
                          },
                        },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(
                    siteContent.servicePages?.[currentServiceItem.key]?.eyebrow ??
                      currentServiceItem.defaultEyebrow,
                    'heroEyebrow'
                  )}
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Main Title / Heading</label>
                  <input
                    type="text"
                    value={
                      siteContent.servicePages?.[currentServiceItem.key]?.heading ??
                      currentServiceItem.defaultHeading
                    }
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        servicePages: {
                          ...siteContent.servicePages,
                          [currentServiceItem.key]: {
                            ...siteContent.servicePages?.[currentServiceItem.key],
                            eyebrow:
                              siteContent.servicePages?.[currentServiceItem.key]?.eyebrow ??
                              currentServiceItem.defaultEyebrow,
                            heading: e.target.value,
                            description:
                              siteContent.servicePages?.[currentServiceItem.key]?.description ??
                              currentServiceItem.defaultDescription,
                          },
                        },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(
                    siteContent.servicePages?.[currentServiceItem.key]?.heading ??
                      currentServiceItem.defaultHeading,
                    'heroTitle'
                  )}
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Description / Architecture Summary</label>
                  <textarea
                    rows={3}
                    value={
                      siteContent.servicePages?.[currentServiceItem.key]?.description ??
                      currentServiceItem.defaultDescription
                    }
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        servicePages: {
                          ...siteContent.servicePages,
                          [currentServiceItem.key]: {
                            ...siteContent.servicePages?.[currentServiceItem.key],
                            eyebrow:
                              siteContent.servicePages?.[currentServiceItem.key]?.eyebrow ??
                              currentServiceItem.defaultEyebrow,
                            heading:
                              siteContent.servicePages?.[currentServiceItem.key]?.heading ??
                              currentServiceItem.defaultHeading,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                  {renderCharMeter(
                    siteContent.servicePages?.[currentServiceItem.key]?.description ??
                      currentServiceItem.defaultDescription,
                    'heroSubtitle'
                  )}
                </div>

                {renderImageField(
                  'Service Hero / Featured Image',
                  siteContent.servicePages?.[currentServiceItem.key]?.heroImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      servicePages: {
                        ...siteContent.servicePages,
                        [currentServiceItem.key]: {
                          ...siteContent.servicePages?.[currentServiceItem.key],
                          heroImage: url,
                        },
                      },
                    }),
                  'Hero or architecture visual for this specialized service.'
                )}

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Discovery CTA Button Label</label>
                  <input
                    type="text"
                    value={
                      siteContent.servicePages?.[currentServiceItem.key]?.ctaButtonText ??
                      'Book Technical Call'
                    }
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        servicePages: {
                          ...siteContent.servicePages,
                          [currentServiceItem.key]: {
                            ...siteContent.servicePages?.[currentServiceItem.key],
                            ctaButtonText: e.target.value,
                          },
                        },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(
                    siteContent.servicePages?.[currentServiceItem.key]?.ctaButtonText ??
                      'Book Technical Call',
                    'ctaButtonText'
                  )}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Title</label>
                  <input
                    type="text"
                    value={
                      siteContent.servicePages?.[currentServiceItem.key]?.seoTitle ??
                      `${currentServiceItem.label} | Byte Operator`
                    }
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        servicePages: {
                          ...siteContent.servicePages,
                          [currentServiceItem.key]: {
                            ...siteContent.servicePages?.[currentServiceItem.key],
                            seoTitle: e.target.value,
                          },
                        },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(
                    siteContent.servicePages?.[currentServiceItem.key]?.seoTitle ??
                      `${currentServiceItem.label} | Byte Operator`,
                    'metaTitle'
                  )}
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Google SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={
                      siteContent.servicePages?.[currentServiceItem.key]?.seoDescription ??
                      currentServiceItem.defaultDescription
                    }
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        servicePages: {
                          ...siteContent.servicePages,
                          [currentServiceItem.key]: {
                            ...siteContent.servicePages?.[currentServiceItem.key],
                            seoDescription: e.target.value,
                          },
                        },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                  {renderCharMeter(
                    siteContent.servicePages?.[currentServiceItem.key]?.seoDescription ??
                      currentServiceItem.defaultDescription,
                    'metaDesc'
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. HOME PAGE — 9 GRANULAR DYNAMIC SECTIONS */}
          {/* ======================================================== */}
          {activeSection === 'home' && siteContent && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* SECTION 1: HERO */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 1: Hero Banner & Headline
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.heroShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.heroShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, heroShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.heroShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Hero Eyebrow Badge</label>
                    <input
                      type="text"
                      value={siteContent.home.heroEyebrow}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, heroEyebrow: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.heroEyebrow, 'heroEyebrow')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Hero Title Prefix</label>
                    <input
                      type="text"
                      value={siteContent.home.heroTitlePrefix}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, heroTitlePrefix: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.heroTitlePrefix, 'heroTitle')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Hero Title Highlight (Gradient Color)</label>
                    <input
                      type="text"
                      value={siteContent.home.heroTitleHighlight}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, heroTitleHighlight: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.heroTitleHighlight, 'heroTitle')}
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Hero Subtitle / Description</label>
                    <textarea
                      rows={3}
                      value={siteContent.home.heroSubtitle}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, heroSubtitle: e.target.value },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                    {renderCharMeter(siteContent.home.heroSubtitle, 'heroSubtitle')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={siteContent.home.primaryCtaText}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, primaryCtaText: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.primaryCtaText, 'ctaButtonText')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Primary CTA URL / Anchor</label>
                    <input
                      type="text"
                      value={siteContent.home.primaryCtaLink || '#ft-home-hero-gallery'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, primaryCtaLink: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Secondary CTA Button Label</label>
                    <input
                      type="text"
                      value={siteContent.home.secondaryCtaText}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, secondaryCtaText: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.secondaryCtaText, 'ctaButtonText')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Secondary CTA URL</label>
                    <input
                      type="text"
                      value={siteContent.home.secondaryCtaLink || '/book-a-call'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, secondaryCtaLink: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  {renderImageField(
                    'Hero Background / Visual Image',
                    siteContent.home.heroImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        home: { ...siteContent.home, heroImage: url },
                      }),
                    'Hero header background visual.'
                  )}
                </div>
              </div>

              {/* SECTION 2: HERO MEDIA / GALLERY / VIDEO */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div>
                    <div className="ft-cms-card__title" style={{ margin: 0 }}>
                      Section 2: Hero Media Showcase (Gallery / Image / Video)
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                      Choose whether to display an interactive multi-item gallery, a single hero image, or a video player.
                    </p>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.galleryShowSection !== false ? '#34d399' : '#94a3b8', flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.galleryShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, galleryShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.galleryShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                {/* 3-Mode Checkbox / Radio Selector */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', padding: '12px', backgroundColor: '#060813', borderRadius: '10px', border: '1px solid #1e293b' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: (siteContent.home.galleryMediaType || 'gallery') === 'gallery' ? '#1d4ed8' : '#0f172a',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: (siteContent.home.galleryMediaType || 'gallery') === 'gallery' ? '#3b82f6' : '#334155',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="galleryMediaType"
                      value="gallery"
                      checked={(siteContent.home.galleryMediaType || 'gallery') === 'gallery'}
                      onChange={() =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, galleryMediaType: 'gallery' },
                        })
                      }
                      style={{ accentColor: '#ffffff' }}
                    />
                    <span>1. Interactive Gallery</span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: siteContent.home.galleryMediaType === 'image' ? '#1d4ed8' : '#0f172a',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: siteContent.home.galleryMediaType === 'image' ? '#3b82f6' : '#334155',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="galleryMediaType"
                      value="image"
                      checked={siteContent.home.galleryMediaType === 'image'}
                      onChange={() =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, galleryMediaType: 'image' },
                        })
                      }
                      style={{ accentColor: '#ffffff' }}
                    />
                    <span>2. Just Single Image</span>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: siteContent.home.galleryMediaType === 'video' ? '#1d4ed8' : '#0f172a',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      border: '1px solid',
                      borderColor: siteContent.home.galleryMediaType === 'video' ? '#3b82f6' : '#334155',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="galleryMediaType"
                      value="video"
                      checked={siteContent.home.galleryMediaType === 'video'}
                      onChange={() =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, galleryMediaType: 'video' },
                        })
                      }
                      style={{ accentColor: '#ffffff' }}
                    />
                    <span>3. Just Single Video</span>
                  </label>
                </div>

                {/* MODE 1: GALLERY ITEMS MANAGER */}
                {(siteContent.home.galleryMediaType || 'gallery') === 'gallery' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <label className="ft-cms-label" style={{ margin: 0 }}>
                        Gallery Showcase Items &amp; Images ({siteContent.home.galleryItems?.length || 0} items)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = siteContent.home.galleryItems || [];
                          const newItem: HomeGalleryItem = {
                            title: 'New Showcase Project',
                            image: 'https://cdn.shopify.com/s/files/1/0676/1155/7936/files/ryan-waring-164_6wVEHfI-unsplash.jpg?v=1790430992',
                            alt: 'Project Showcase',
                            url: '/work',
                          };
                          setSiteContent({
                            ...siteContent,
                            home: { ...siteContent.home, galleryItems: [...current, newItem] },
                          });
                        }}
                        className="ft-cms-btn-secondary"
                        style={{ fontSize: '11px', padding: '4px 10px' }}
                      >
                        + Add Gallery Item
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {(siteContent.home.galleryItems || []).map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                            padding: '12px',
                            backgroundColor: '#0a0e1a',
                            borderRadius: '8px',
                            border: '1px solid #1e293b',
                          }}
                        >
                          <div
                            style={{
                              width: '70px',
                              height: '50px',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              backgroundColor: '#111728',
                              border: '1px solid #28375a',
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                (e.target as HTMLElement).style.opacity = '0.3';
                              }}
                            />
                          </div>

                          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                            <input
                              type="text"
                              value={item.title}
                              placeholder="Title"
                              onChange={(e) => {
                                const updated = [...(siteContent.home.galleryItems || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  home: { ...siteContent.home, galleryItems: updated },
                                });
                              }}
                              className="ft-cms-input"
                              style={{ fontSize: '12px', padding: '6px 10px' }}
                            />

                            <input
                              type="text"
                              value={item.image}
                              placeholder="Image URL"
                              onChange={(e) => {
                                const updated = [...(siteContent.home.galleryItems || [])];
                                updated[idx] = { ...updated[idx], image: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  home: { ...siteContent.home, galleryItems: updated },
                                });
                              }}
                              className="ft-cms-input"
                              style={{ fontSize: '12px', padding: '6px 10px', fontFamily: 'monospace' }}
                            />

                            <input
                              type="text"
                              value={item.url || '/work'}
                              placeholder="Redirection Link"
                              onChange={(e) => {
                                const updated = [...(siteContent.home.galleryItems || [])];
                                updated[idx] = { ...updated[idx], url: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  home: { ...siteContent.home, galleryItems: updated },
                                });
                              }}
                              className="ft-cms-input"
                              style={{ fontSize: '12px', padding: '6px 10px' }}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const updated = (siteContent.home.galleryItems || []).filter((_, i) => i !== idx);
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, galleryItems: updated },
                              });
                            }}
                            style={{
                              backgroundColor: 'transparent',
                              border: '1px solid #ef4444',
                              color: '#ef4444',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '16px' }}>
                      {renderImageField(
                        'Center Video Poster Preview (in Gallery Mode)',
                        siteContent.home.galleryVideoPoster || '',
                        (url) =>
                          setSiteContent({
                            ...siteContent,
                            home: { ...siteContent.home, galleryVideoPoster: url },
                          }),
                        'Poster displayed for center looping showcase video.'
                      )}
                    </div>
                  </div>
                )}

                {/* MODE 2: SINGLE IMAGE */}
                {siteContent.home.galleryMediaType === 'image' && (
                  <div className="ft-cms-grid-2">
                    {renderImageField(
                      'Single Hero Feature Image URL',
                      siteContent.home.gallerySingleImageUrl || '',
                      (url) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, gallerySingleImageUrl: url },
                        }),
                      'Full-bleed featured image banner for the hero media container.'
                    )}

                    <div className="ft-cms-field ft-cms-col-span-2">
                      <label className="ft-cms-label">Image Alt Text (for SEO &amp; Accessibility)</label>
                      <input
                        type="text"
                        value={siteContent.home.gallerySingleImageAlt || ''}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            home: { ...siteContent.home, gallerySingleImageAlt: e.target.value },
                          })
                        }
                        placeholder="Byte Operator Platform Architecture"
                        className="ft-cms-input"
                      />
                    </div>
                  </div>
                )}

                {/* MODE 3: SINGLE VIDEO */}
                {siteContent.home.galleryMediaType === 'video' && (
                  <div className="ft-cms-grid-2">
                    <div className="ft-cms-field ft-cms-col-span-2">
                      <label className="ft-cms-label">Video URL (MP4 / WebM / Cloud CDN)</label>
                      <input
                        type="text"
                        value={siteContent.home.galleryVideoUrl || '/videos/home-hero-1600.mp4'}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            home: { ...siteContent.home, galleryVideoUrl: e.target.value },
                          })
                        }
                        placeholder="/videos/home-hero-1600.mp4 or https://cdn..."
                        className="ft-cms-input"
                        style={{ fontFamily: 'monospace' }}
                      />
                    </div>

                    {renderImageField(
                      'Video Poster / Fallback Image URL',
                      siteContent.home.galleryVideoPoster || '',
                      (url) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, galleryVideoPoster: url },
                        }),
                      'Poster shown before video plays or on reduced motion devices.'
                    )}

                    <div className="ft-cms-field ft-cms-col-span-2">
                      <label className="ft-cms-label">Mobile Video URL (Optional optimized MP4)</label>
                      <input
                        type="text"
                        value={siteContent.home.galleryVideoMobileUrl || '/videos/home-hero-960.mp4'}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            home: { ...siteContent.home, galleryVideoMobileUrl: e.target.value },
                          })
                        }
                        placeholder="/videos/home-hero-960.mp4"
                        className="ft-cms-input"
                        style={{ fontFamily: 'monospace' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 3: ABOUT US & METRICS */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 3: About Us, Architectural Story &amp; Stat Metrics
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.aboutShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.aboutShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.aboutShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">About Left Eyebrow</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutEyebrow || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutEyebrow: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">About Main Heading</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutHeading || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutHeading: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Story Heading Prefix</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutRightHeadingPrefix || 'About'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutRightHeadingPrefix: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Story Heading Highlight (Bold)</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutRightHeadingEmphasis || 'Byte Operator'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutRightHeadingEmphasis: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Story Heading Suffix</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutRightHeadingSuffix || '— Independent AI & Software Engineering'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutRightHeadingSuffix: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Story Detailed Description</label>
                    <textarea
                      rows={4}
                      value={siteContent.home.aboutDescription || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutDescription: e.target.value },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                  </div>

                  {/* 4 Stat Counters */}
                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 1 Value</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat1Value || '20+'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat1Value: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 1 Label</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat1Label || 'Projects Delivered'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat1Label: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 2 Value</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat2Value || '4.9/5.0'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat2Value: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 2 Label</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat2Label || 'Client Satisfaction'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat2Label: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 3 Value</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat3Value || '100%'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat3Value: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 3 Label</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat3Label || 'Job Success Rate'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat3Label: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 4 Value</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat4Value || '2025'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat4Value: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Stat 4 Label</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutStat4Label || 'Established Since'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutStat4Label: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">About CTA Button Label</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutCtaText || 'Explore Our Case Studies'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutCtaText: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">About CTA Redirection URL</label>
                    <input
                      type="text"
                      value={siteContent.home.aboutCtaLink || '/work'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, aboutCtaLink: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  {renderImageField(
                    'About Showcase / Philosophy Image',
                    siteContent.home.aboutImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        home: { ...siteContent.home, aboutImage: url },
                      }),
                    'Image showcased in the About Section.'
                  )}
                </div>
              </div>

              {/* SECTION 4: SERVICES */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 4: Engineering Capabilities &amp; Services Grid
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.servicesShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.servicesShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, servicesShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.servicesShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Services Section Title</label>
                    <input
                      type="text"
                      value={siteContent.home.servicesHeading}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, servicesHeading: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.servicesHeading, 'sectionTitle')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Services Section Subtitle</label>
                    <input
                      type="text"
                      value={siteContent.home.servicesSubtitle}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, servicesSubtitle: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.servicesSubtitle, 'sectionSubtitle')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Services CTA Button Label</label>
                    <input
                      type="text"
                      value={siteContent.home.servicesCtaText || 'View all services'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, servicesCtaText: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Services CTA Redirection Link</label>
                    <input
                      type="text"
                      value={siteContent.home.servicesCtaLink || '/services'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, servicesCtaLink: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>
                </div>

                {/* Individual Service Cards Manager */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1a2238' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div>
                      <label className="ft-cms-label" style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>
                        Service Cards ({(siteContent.home.servicesList || []).length} cards)
                      </label>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Edit card titles, descriptions, and redirection links.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = siteContent.home.servicesList || [];
                        const newCard: HomeServiceItem = {
                          title: 'New Engineering Service',
                          description: 'High-performance cloud architecture and automated pipelines.',
                          href: '/services/software-developers',
                        };
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, servicesList: [...current, newCard] },
                        });
                      }}
                      className="ft-cms-btn-secondary"
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                    >
                      + Add Service Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {(siteContent.home.servicesList || []).map((card, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '14px',
                          backgroundColor: '#070a14',
                          borderRadius: '8px',
                          border: '1px solid #1e293b',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6' }}>
                            Card #{idx + 1}: {card.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (siteContent.home.servicesList || []).filter((_, i) => i !== idx);
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, servicesList: updated },
                              });
                            }}
                            style={{
                              backgroundColor: 'transparent',
                              border: '1px solid #ef4444',
                              color: '#ef4444',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              cursor: 'pointer',
                            }}
                          >
                            Delete Card
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                          <div>
                            <label className="ft-cms-label" style={{ fontSize: '11px' }}>Card Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => {
                                const updated = [...(siteContent.home.servicesList || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  home: { ...siteContent.home, servicesList: updated },
                                });
                              }}
                              className="ft-cms-input"
                              style={{ fontSize: '12px' }}
                            />
                          </div>

                          <div>
                            <label className="ft-cms-label" style={{ fontSize: '11px' }}>Redirection Link (URL)</label>
                            <input
                              type="text"
                              value={card.href}
                              onChange={(e) => {
                                const updated = [...(siteContent.home.servicesList || [])];
                                updated[idx] = { ...updated[idx], href: e.target.value };
                                setSiteContent({
                                  ...siteContent,
                                  home: { ...siteContent.home, servicesList: updated },
                                });
                              }}
                              className="ft-cms-input"
                              style={{ fontSize: '12px' }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="ft-cms-label" style={{ fontSize: '11px' }}>Card Description</label>
                          <textarea
                            rows={2}
                            value={card.description}
                            onChange={(e) => {
                              const updated = [...(siteContent.home.servicesList || [])];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, servicesList: updated },
                              });
                            }}
                            className="ft-cms-input ft-cms-textarea"
                            style={{ fontSize: '12px' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 5: PROJECTS / CASE STUDIES */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 5: Selected Case Studies &amp; Projects Slider
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.projectsShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.projectsShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, projectsShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.projectsShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Case Studies Section Headline</label>
                    <input
                      type="text"
                      value={siteContent.home.projectsHeading}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, projectsHeading: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.projectsHeading, 'sectionTitle')}
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Case Studies Section Subtitle</label>
                    <textarea
                      rows={2}
                      value={siteContent.home.projectsSubtitle}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, projectsSubtitle: e.target.value },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                    {renderCharMeter(siteContent.home.projectsSubtitle, 'sectionSubtitle')}
                  </div>
                </div>

                {/* Individual Projects List Manager */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #1a2238' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div>
                      <label className="ft-cms-label" style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>
                        Case Studies / Projects ({(siteContent.home.projectsList || []).length} projects)
                      </label>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Manage the interactive case study cards, titles, screenshots, and URLs.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = siteContent.home.projectsList || [];
                        const newProject: HomeProjectItem = {
                          title: 'New Case Study Project',
                          type: 'Custom SaaS & Platform Engineering',
                          href: '/services/software-developers',
                          image: 'https://cdn.shopify.com/s/files/1/0673/9610/8363/files/custom_software_case_study.png?v=1790400442',
                          alt: 'Case study architecture preview',
                        };
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, projectsList: [...current, newProject] },
                        });
                      }}
                      className="ft-cms-btn-secondary"
                      style={{ fontSize: '11px', padding: '4px 10px' }}
                    >
                      + Add Case Study
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {(siteContent.home.projectsList || []).map((project, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '14px',
                          backgroundColor: '#070a14',
                          borderRadius: '8px',
                          border: '1px solid #1e293b',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6' }}>
                            Project #{idx + 1}: {project.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (siteContent.home.projectsList || []).filter((_, i) => i !== idx);
                              setSiteContent({
                                ...siteContent,
                                home: { ...siteContent.home, projectsList: updated },
                              });
                            }}
                            style={{
                              backgroundColor: 'transparent',
                              border: '1px solid #ef4444',
                              color: '#ef4444',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              cursor: 'pointer',
                            }}
                          >
                            Delete Project
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          {/* Image preview thumbnail */}
                          <div
                            style={{
                              width: '120px',
                              height: '75px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              backgroundColor: '#111728',
                              border: '1px solid #28375a',
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                (e.target as HTMLElement).style.opacity = '0.3';
                              }}
                            />
                          </div>

                          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                            <div>
                              <label className="ft-cms-label" style={{ fontSize: '11px' }}>Project Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => {
                                  const updated = [...(siteContent.home.projectsList || [])];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setSiteContent({
                                    ...siteContent,
                                    home: { ...siteContent.home, projectsList: updated },
                                  });
                                }}
                                className="ft-cms-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>

                            <div>
                              <label className="ft-cms-label" style={{ fontSize: '11px' }}>Category / Type Tagline</label>
                              <input
                                type="text"
                                value={project.type}
                                onChange={(e) => {
                                  const updated = [...(siteContent.home.projectsList || [])];
                                  updated[idx] = { ...updated[idx], type: e.target.value };
                                  setSiteContent({
                                    ...siteContent,
                                    home: { ...siteContent.home, projectsList: updated },
                                  });
                                }}
                                className="ft-cms-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>

                            <div>
                              <label className="ft-cms-label" style={{ fontSize: '11px' }}>Project Image / Screenshot URL</label>
                              <input
                                type="text"
                                value={project.image}
                                onChange={(e) => {
                                  const updated = [...(siteContent.home.projectsList || [])];
                                  updated[idx] = { ...updated[idx], image: e.target.value };
                                  setSiteContent({
                                    ...siteContent,
                                    home: { ...siteContent.home, projectsList: updated },
                                  });
                                }}
                                className="ft-cms-input"
                                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                              />
                            </div>

                            <div>
                              <label className="ft-cms-label" style={{ fontSize: '11px' }}>Case Study URL (href)</label>
                              <input
                                type="text"
                                value={project.href}
                                onChange={(e) => {
                                  const updated = [...(siteContent.home.projectsList || [])];
                                  updated[idx] = { ...updated[idx], href: e.target.value };
                                  setSiteContent({
                                    ...siteContent,
                                    home: { ...siteContent.home, projectsList: updated },
                                  });
                                }}
                                className="ft-cms-input"
                                style={{ fontSize: '12px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 6: FEATURE PIPELINES */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 6: Feature Pipelines &amp; Architecture Showcases
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.featuresShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.featuresShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, featuresShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.featuresShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  {renderImageField(
                    'Feature Pipeline Showcase Diagram / Image',
                    siteContent.home.featureImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        home: { ...siteContent.home, featureImage: url },
                      }),
                    'Infographic or UI showcase diagram on home page.'
                  )}
                </div>
              </div>

              {/* SECTION 7: PEOPLE / FOUNDERS */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 7: People, Founders &amp; Engineering Team
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.peopleShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.peopleShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.peopleShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Team Eyebrow Badge</label>
                    <input
                      type="text"
                      value={siteContent.home.peopleEyebrow || 'Senior Engineers, AI Architects & Growth Strategists'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleEyebrow: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Headline Line 1</label>
                    <input
                      type="text"
                      value={siteContent.home.peopleHeadingFirstLine || 'Engineering-led'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleHeadingFirstLine: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Headline Line 2</label>
                    <input
                      type="text"
                      value={siteContent.home.peopleHeadingSecondLine || 'software & AI agency'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleHeadingSecondLine: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Team Description</label>
                    <textarea
                      rows={3}
                      value={siteContent.home.peopleDescription || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleDescription: e.target.value },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Team Button Label</label>
                    <input
                      type="text"
                      value={siteContent.home.peopleButtonLabel || 'About Byte Operator'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleButtonLabel: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Team Button Link</label>
                    <input
                      type="text"
                      value={siteContent.home.peopleButtonLink || '/about'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, peopleButtonLink: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  {renderImageField(
                    'Team Group Photo / Image',
                    siteContent.home.peopleImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        home: { ...siteContent.home, peopleImage: url },
                      }),
                    'Team photo banner.'
                  )}
                </div>
              </div>

              {/* SECTION 8: PARTNERS & TECH STACK */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 8: Platforms, Technologies &amp; Partner Ecosystem
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.partnersShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.partnersShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, partnersShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.partnersShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                  This section automatically renders the verified platform badges (Shopify Plus, Hydrogen, BigCommerce, Magento, WooCommerce, Next.js, React, Node.js, Python, AWS, Supabase, n8n) and expandable interactive technology categories.
                </p>
              </div>

              {/* SECTION 9: SENIOR ENGINEERING & AI ARCHITECTS BANNER */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #1a2238' }}>
                  <div className="ft-cms-card__title" style={{ margin: 0 }}>
                    Section 9: Senior Engineering &amp; AI Architects (Call to Action Banner)
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.observatoryShowSection !== false ? '#34d399' : '#94a3b8' }}>
                    <input
                      type="checkbox"
                      checked={siteContent.home.observatoryShowSection !== false}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, observatoryShowSection: e.target.checked },
                        })
                      }
                      style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                    />
                    <span>{siteContent.home.observatoryShowSection !== false ? 'Section Visible' : 'Section Hidden'}</span>
                  </label>
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Section Eyebrow Badge</label>
                    <input
                      type="text"
                      value={siteContent.home.observatoryEyebrow || 'Senior Engineering & AI Architects'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, observatoryEyebrow: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.observatoryEyebrow || 'Senior Engineering & AI Architects', 'heroEyebrow')}
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Headline Title</label>
                    <input
                      type="text"
                      value={
                        siteContent.home.observatoryHeading ||
                        'Ready to architect your next software platform, Shopify store, or AI automation?'
                      }
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, observatoryHeading: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(
                      siteContent.home.observatoryHeading ||
                        'Ready to architect your next software platform, Shopify store, or AI automation?',
                      'heroTitle'
                    )}
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Primary Paragraph</label>
                    <textarea
                      rows={3}
                      value={
                        siteContent.home.observatorySubtitle ||
                        'Byte Operator partners directly with ambitious founders and enterprise brands to design, engineer, and deploy high-impact digital solutions.'
                      }
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, observatorySubtitle: e.target.value },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Secondary Technical Paragraph</label>
                    <textarea
                      rows={3}
                      value={
                        siteContent.home.observatoryDescriptionSecondary ||
                        'Speak directly with our senior software engineers and AI automation architects to map your technical roadmap.'
                      }
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: {
                            ...siteContent.home,
                            observatoryDescriptionSecondary: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2" style={{ backgroundColor: '#060813', padding: '14px', borderRadius: '8px', border: '1px solid #1e293b' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: siteContent.home.observatoryShowImage !== false ? '#34d399' : '#94a3b8' }}>
                      <input
                        type="checkbox"
                        checked={siteContent.home.observatoryShowImage !== false}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            home: { ...siteContent.home, observatoryShowImage: e.target.checked },
                          })
                        }
                        style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                      />
                      <span>{siteContent.home.observatoryShowImage !== false ? 'Show Images on this Banner' : 'Hide Images on this Banner'}</span>
                    </label>
                  </div>

                  {renderImageField(
                    'Banner Visual / Media Image',
                    siteContent.home.observatoryImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        home: { ...siteContent.home, observatoryImage: url },
                      }),
                    'Image displayed alongside the consultation banner.'
                  )}

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">CTA Button Label</label>
                    <input
                      type="text"
                      value={siteContent.home.observatoryCtaText || 'Schedule Technical Consultation'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, observatoryCtaText: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.observatoryCtaText || 'Schedule Technical Consultation', 'ctaButtonText')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">CTA Redirection Link</label>
                    <input
                      type="text"
                      value={siteContent.home.observatoryCtaLink || '/contact'}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, observatoryCtaLink: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>
                </div>
              </div>

              {/* SEO SETTINGS */}
              <div className="ft-cms-card">
                <div className="ft-cms-card__title">Home Page Google SEO &amp; Meta Tags</div>
                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Google SEO Meta Title</label>
                    <input
                      type="text"
                      value={siteContent.home.seoTitle || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, seoTitle: e.target.value },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent.home.seoTitle || '', 'metaTitle')}
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Google SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={siteContent.home.seoDescription || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          home: { ...siteContent.home, seoDescription: e.target.value },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                    {renderCharMeter(siteContent.home.seoDescription || '', 'metaDesc')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. ABOUT PAGE */}
          {activeSection === 'about' && siteContent && (
            <div className="ft-cms-card">
              <div className="ft-cms-card__title">About Us, Architectural Philosophy & Media</div>

              <div className="ft-cms-grid-2">
                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={siteContent.about.heroEyebrow}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, heroEyebrow: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.about.heroEyebrow, 'heroEyebrow')}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Main Title</label>
                  <input
                    type="text"
                    value={siteContent.about.heroTitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, heroTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.about.heroTitle, 'heroTitle')}
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Description</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.heroDescription}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, heroDescription: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                  {renderCharMeter(siteContent.about.heroDescription, 'heroSubtitle')}
                </div>

                {renderImageField(
                  'About Hero Cover Image',
                  siteContent.about.heroImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, heroImage: url },
                    }),
                  'Hero banner displayed at the top of the About page.'
                )}

                {renderImageField(
                  'About Story & Mission Image',
                  siteContent.about.storyImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, storyImage: url },
                    }),
                  'Visual accompanying the Byte Operator engineering origin story.'
                )}

                {renderImageField(
                  'Engineering Space & Studio Image',
                  siteContent.about.spaceImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, spaceImage: url },
                    }),
                  'Workspace, team culture, or laboratory visual.'
                )}

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Team Engineers Count Stat</label>
                  <input
                    type="text"
                    value={siteContent.about.statTeamCount}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, statTeamCount: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Client Retention Rate Stat</label>
                  <input
                    type="text"
                    value={siteContent.about.statRetentionRate}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, statRetentionRate: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Client Rating Stat</label>
                  <input
                    type="text"
                    value={siteContent.about.statClientRating}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, statClientRating: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Projects Delivered Stat</label>
                  <input
                    type="text"
                    value={siteContent.about.statProjectsDelivered}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, statProjectsDelivered: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Story Section Heading</label>
                  <input
                    type="text"
                    value={siteContent.about.storyHeading || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, storyHeading: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Story Content Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.storyParagraph1 || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, storyParagraph1: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Story Content Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.storyParagraph2 || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, storyParagraph2: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Title</label>
                  <input
                    type="text"
                    value={siteContent.about.seoTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, seoTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.about.seoTitle || '', 'metaTitle')}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.about.seoDescription || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, seoDescription: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                  {renderCharMeter(siteContent.about.seoDescription || '', 'metaDesc')}
                </div>
              </div>
            </div>
          )}

          {/* 3. SERVICES DIRECTORY */}
          {activeSection === 'services' && siteContent && (
            <div className="ft-cms-card">
              <div className="ft-cms-card__title">Services Directory & Technical Capabilities</div>

              <div className="ft-cms-grid-2">
                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={siteContent.services.heroEyebrow}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, heroEyebrow: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.services.heroEyebrow, 'heroEyebrow')}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Title</label>
                  <input
                    type="text"
                    value={siteContent.services.heroTitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, heroTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.services.heroTitle, 'heroTitle')}
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={siteContent.services.heroSubtitle}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, heroSubtitle: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                  {renderCharMeter(siteContent.services.heroSubtitle, 'heroSubtitle')}
                </div>

                {renderImageField(
                  'Services Hero Featured Image',
                  siteContent.services.heroImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      services: { ...siteContent.services, heroImage: url },
                    }),
                  'Hero banner displayed on the Services directory.'
                )}

                {renderImageField(
                  'Capabilities Showcase Image',
                  siteContent.services.featureImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      services: { ...siteContent.services, featureImage: url },
                    }),
                  'Image preview for full-stack engineering capabilities.'
                )}

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Discovery CTA Title</label>
                  <input
                    type="text"
                    value={siteContent.services.ctaHeading}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, ctaHeading: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.services.ctaHeading, 'sectionTitle')}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">CTA Button Label</label>
                  <input
                    type="text"
                    value={siteContent.services.ctaButtonText}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, ctaButtonText: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.services.ctaButtonText, 'ctaButtonText')}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Title</label>
                  <input
                    type="text"
                    value={siteContent.services.seoTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, seoTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                  {renderCharMeter(siteContent.services.seoTitle || '', 'metaTitle')}
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.services.seoDescription || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        services: { ...siteContent.services, seoDescription: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                  {renderCharMeter(siteContent.services.seoDescription || '', 'metaDesc')}
                </div>
              </div>
            </div>
          )}

          {/* 4. WORK & CASE STUDIES */}
          {activeSection === 'work' && siteContent && (
            <div className="ft-cms-card">
              <div className="ft-cms-card__title">Case Studies & Production Outcomes</div>

              <div className="ft-cms-grid-2">
                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={siteContent.work?.heroEyebrow || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        work: { ...siteContent.work, heroEyebrow: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Title</label>
                  <input
                    type="text"
                    value={siteContent.work?.heroTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        work: { ...siteContent.work, heroTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={siteContent.work?.heroSubtitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        work: { ...siteContent.work, heroSubtitle: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>

                {renderImageField(
                  'Work Hero Featured Image',
                  siteContent.work?.heroImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      work: { ...siteContent.work, heroImage: url },
                    }),
                  'Hero graphic on the Case Studies & Work page.'
                )}

                {renderImageField(
                  'Featured Case Study Showcase Image',
                  siteContent.work?.showcaseImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      work: { ...siteContent.work, showcaseImage: url },
                    }),
                  'Large project preview featured on the Work page.'
                )}

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Title</label>
                  <input
                    type="text"
                    value={siteContent.work?.seoTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        work: { ...siteContent.work, seoTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.work?.seoDescription || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        work: { ...siteContent.work, seoDescription: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 5. CONTACT PAGE */}
          {activeSection === 'contact' && siteContent && (
            <div className="ft-cms-card">
              <div className="ft-cms-card__title">Contact Information & Operational Channels</div>

              <div className="ft-cms-grid-2">
                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={siteContent.contact?.heroEyebrow || 'Get In Touch'}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, heroEyebrow: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Main Title</label>
                  <input
                    type="text"
                    value={siteContent.contact?.heroTitle || 'Let’s Architect Something Exceptional Together'}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, heroTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={siteContent.contact?.heroSubtitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, heroSubtitle: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Direct Phone Number</label>
                  <input
                    type="text"
                    value={siteContent.contact.directPhone}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, directPhone: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Sales Inquiries Email</label>
                  <input
                    type="email"
                    value={siteContent.contact.salesEmail}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, salesEmail: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Support Email</label>
                  <input
                    type="email"
                    value={siteContent.contact.supportEmail}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, supportEmail: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Office Address</label>
                  <input
                    type="text"
                    value={siteContent.contact.officeAddress}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, officeAddress: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                {renderImageField(
                  'Contact Page Featured Image',
                  siteContent.contact?.heroImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      contact: { ...siteContent.contact, heroImage: url },
                    }),
                  'Header or side visual for the contact page.'
                )}

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Title</label>
                  <input
                    type="text"
                    value={siteContent.contact?.seoTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, seoTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Google SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.contact?.seoDescription || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        contact: { ...siteContent.contact, seoDescription: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 6. BOOK A CALL */}
          {activeSection === 'bookACall' && siteContent && (
            <div className="ft-cms-card">
              <div className="ft-cms-card__title">Book a Call Strategy Session</div>

              <div className="ft-cms-grid-2">
                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={siteContent.bookACall?.heroEyebrow || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        bookACall: { ...siteContent.bookACall, heroEyebrow: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Hero Title</label>
                  <input
                    type="text"
                    value={siteContent.bookACall?.heroTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        bookACall: { ...siteContent.bookACall, heroTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={siteContent.bookACall?.heroSubtitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        bookACall: { ...siteContent.bookACall, heroSubtitle: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>

                {renderImageField(
                  'Book A Call Hero Image',
                  siteContent.bookACall?.heroImage || '',
                  (url) =>
                    setSiteContent({
                      ...siteContent,
                      bookACall: { ...siteContent.bookACall, heroImage: url },
                    }),
                  'Header or side visual for the booking consultation page.'
                )}

                <div className="ft-cms-field">
                  <label className="ft-cms-label">Google SEO Meta Title</label>
                  <input
                    type="text"
                    value={siteContent.bookACall?.seoTitle || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        bookACall: { ...siteContent.bookACall, seoTitle: e.target.value },
                      })
                    }
                    className="ft-cms-input"
                  />
                </div>

                <div className="ft-cms-field ft-cms-col-span-2">
                  <label className="ft-cms-label">Google SEO Meta Description</label>
                  <textarea
                    rows={2}
                    value={siteContent.bookACall?.seoDescription || ''}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        bookACall: { ...siteContent.bookACall, seoDescription: e.target.value },
                      })
                    }
                    className="ft-cms-input ft-cms-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 7. RESOURCE PAGES (Guides, Podcasts, Webinars, Newsletter) */}
          {(activeSection === 'guides' ||
            activeSection === 'podcasts' ||
            activeSection === 'webinars' ||
            activeSection === 'newsletter') &&
            siteContent && (
              <div className="ft-cms-card">
                <div className="ft-cms-card__title">
                  {activeSection === 'guides' && 'Technical Guides Directory & Media'}
                  {activeSection === 'podcasts' && 'Podcast Breakdowns & Episodes Media'}
                  {activeSection === 'webinars' && 'Webinars & Live Masterclasses Media'}
                  {activeSection === 'newsletter' && 'Weekly Newsletter Dispatch & Media'}
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Hero Eyebrow</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.heroEyebrow || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            heroEyebrow: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent[activeSection]?.heroEyebrow, 'heroEyebrow')}
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Hero Title</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.heroTitle || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            heroTitle: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                    {renderCharMeter(siteContent[activeSection]?.heroTitle, 'heroTitle')}
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Hero Subtitle</label>
                    <textarea
                      rows={3}
                      value={siteContent[activeSection]?.heroSubtitle || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            heroSubtitle: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                    {renderCharMeter(siteContent[activeSection]?.heroSubtitle, 'heroSubtitle')}
                  </div>

                  {renderImageField(
                    'Hero Featured Image',
                    siteContent[activeSection]?.heroImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        [activeSection]: {
                          ...siteContent[activeSection],
                          heroImage: url,
                        },
                      }),
                    'Banner image for this resource hub.'
                  )}

                  {renderImageField(
                    'Content Cover / Thumbnail Image',
                    siteContent[activeSection]?.coverImage || '',
                    (url) =>
                      setSiteContent({
                        ...siteContent,
                        [activeSection]: {
                          ...siteContent[activeSection],
                          coverImage: url,
                        },
                      }),
                    'Secondary showcase or card cover graphic.'
                  )}

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Call to Action Label</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.ctaText || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            ctaText: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Google SEO Meta Title</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.seoTitle || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            seoTitle: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Google SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={siteContent[activeSection]?.seoDescription || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            seoDescription: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

          {/* 8. LEGAL & POLICY PAGES */}
          {(activeSection === 'privacyPolicy' ||
            activeSection === 'termsOfService' ||
            activeSection === 'refundPolicy' ||
            activeSection === 'subscriptionPolicy') &&
            siteContent && (
              <div className="ft-cms-card">
                <div className="ft-cms-card__title">
                  {activeSection === 'privacyPolicy' && 'Privacy Policy Content & SEO'}
                  {activeSection === 'termsOfService' && 'Terms of Service Content & SEO'}
                  {activeSection === 'refundPolicy' && 'Refund Policy Content & SEO'}
                  {activeSection === 'subscriptionPolicy' && 'Subscription & Retainer Policy Content & SEO'}
                </div>

                <div className="ft-cms-grid-2">
                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Document Title</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.title || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            title: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Last Updated Date Stamp</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.lastUpdated || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            lastUpdated: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Summary Synopsis</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.summary || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            summary: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field ft-cms-col-span-2">
                    <label className="ft-cms-label">Policy Legal Body (HTML)</label>
                    <textarea
                      rows={8}
                      value={siteContent[activeSection]?.contentHtml || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            contentHtml: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                      style={{ fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Google SEO Meta Title</label>
                    <input
                      type="text"
                      value={siteContent[activeSection]?.seoTitle || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            seoTitle: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Google SEO Meta Description</label>
                    <textarea
                      rows={2}
                      value={siteContent[activeSection]?.seoDescription || ''}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          [activeSection]: {
                            ...siteContent[activeSection],
                            seoDescription: e.target.value,
                          },
                        })
                      }
                      className="ft-cms-input ft-cms-textarea"
                    />
                  </div>
                </div>
              </div>
            )}

          {/* 9. BLOG & ARTICLES MANAGER */}
          {activeSection === 'articles_mgr' && (
            <>
              <div className="ft-cms-toolbar">
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                    Blog & Articles Engine
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>
                    Publish guides, thought leadership, and case studies to your live site.
                  </p>
                </div>

                {!isCreatingArticle && !editingArticle && (
                  <button
                    onClick={() => {
                      setIsCreatingArticle(true);
                      setEditingArticle({
                        id: '',
                        handle: '',
                        title: '',
                        excerpt: '',
                        contentHtml: '<p>Write your detailed article content here...</p>',
                        publishedAt: new Date().toISOString(),
                        category: 'cro',
                        articleType: 'Article',
                        featured: false,
                        mainFeatured: false,
                        status: 'published',
                        image: {
                          url: '/images/mega-menu-resources.webp',
                          altText: '',
                          width: 1200,
                          height: 675,
                        },
                        seo: {
                          title: '',
                          description: '',
                        },
                      });
                    }}
                    className="ft-cms-btn-primary"
                  >
                    <FiPlus size={14} />
                    <span>New Article</span>
                  </button>
                )}
              </div>

              {articleMessage && (
                <div
                  className={
                    articleMessage.type === 'success'
                      ? 'ft-cms-alert-success'
                      : 'ft-cms-alert-danger'
                  }
                >
                  <span>{articleMessage.text}</span>
                </div>
              )}

              {/* ARTICLE FORM */}
              {editingArticle ? (
                <div className="ft-cms-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1a2238', paddingBottom: '12px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>
                      {isCreatingArticle ? 'Create New Article' : `Editing: ${editingArticle.title}`}
                    </h4>
                    <button
                      onClick={() => {
                        setEditingArticle(null);
                        setIsCreatingArticle(false);
                      }}
                      className="ft-cms-btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="ft-cms-grid-2">
                    <div className="ft-cms-field ft-cms-col-span-2">
                      <label className="ft-cms-label">Article Headline / Title</label>
                      <input
                        type="text"
                        required
                        value={editingArticle.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          setEditingArticle({
                            ...editingArticle,
                            title: val,
                            handle: isCreatingArticle ? slug : editingArticle.handle,
                            seo: {
                              ...editingArticle.seo,
                              title: editingArticle.seo?.title || val,
                            },
                          });
                        }}
                        className="ft-cms-input"
                      />
                      {renderCharMeter(editingArticle.title, 'articleTitle')}
                    </div>

                    <div className="ft-cms-field">
                      <label className="ft-cms-label">URL Slug (Handle)</label>
                      <input
                        type="text"
                        required
                        value={editingArticle.handle}
                        onChange={(e) =>
                          setEditingArticle({ ...editingArticle, handle: e.target.value })
                        }
                        className="ft-cms-input"
                        style={{ fontFamily: 'monospace' }}
                      />
                      {renderCharMeter(editingArticle.handle, 'articleSlug')}
                    </div>

                    <div className="ft-cms-field">
                      <label className="ft-cms-label">Category</label>
                      <select
                        value={editingArticle.category}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            category: e.target.value as any,
                          })
                        }
                        className="ft-cms-input"
                      >
                        <option value="cro">CRO & Conversions</option>
                        <option value="platform">Platform Architecture</option>
                        <option value="apps">Custom Apps & Systems</option>
                        <option value="seo">SEO & Performance</option>
                        <option value="marketing">Growth & Marketing</option>
                        <option value="email">Email & Retention</option>
                      </select>
                    </div>

                    <div className="ft-cms-field ft-cms-col-span-2">
                      <label className="ft-cms-label">Article Excerpt</label>
                      <textarea
                        rows={2}
                        value={editingArticle.excerpt}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            excerpt: e.target.value,
                            seo: {
                              ...editingArticle.seo,
                              description: editingArticle.seo?.description || e.target.value,
                            },
                          })
                        }
                        className="ft-cms-input ft-cms-textarea"
                      />
                      {renderCharMeter(editingArticle.excerpt, 'articleExcerpt')}
                    </div>

                    <div className="ft-cms-field ft-cms-col-span-2">
                      <label className="ft-cms-label">Article Content (HTML)</label>
                      <textarea
                        rows={10}
                        value={editingArticle.contentHtml}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            contentHtml: e.target.value,
                          })
                        }
                        className="ft-cms-input"
                        style={{ fontFamily: 'monospace', fontSize: '12px' }}
                      />
                    </div>

                    <div className="ft-cms-field">
                      <label className="ft-cms-label">Google Meta Title (SEO)</label>
                      <input
                        type="text"
                        value={editingArticle.seo?.title || ''}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            seo: { ...editingArticle.seo, title: e.target.value },
                          })
                        }
                        className="ft-cms-input"
                      />
                      {renderCharMeter(editingArticle.seo?.title, 'metaTitle')}
                    </div>

                    <div className="ft-cms-field">
                      <label className="ft-cms-label">Google Meta Description (SEO)</label>
                      <input
                        type="text"
                        value={editingArticle.seo?.description || ''}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            seo: { ...editingArticle.seo, description: e.target.value },
                          })
                        }
                        className="ft-cms-input"
                      />
                      {renderCharMeter(editingArticle.seo?.description, 'metaDescription')}
                    </div>

                    <div className="ft-cms-col-span-2" style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingTop: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        <input
                          type="checkbox"
                          checked={editingArticle.status === 'published'}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              status: e.target.checked ? 'published' : 'draft',
                            })
                          }
                          style={{ width: '16px', height: '16px' }}
                        />
                        <span>Published to Live Site</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(editingArticle.featured)}
                          onChange={(e) =>
                            setEditingArticle({
                              ...editingArticle,
                              featured: e.target.checked,
                            })
                          }
                          style={{ width: '16px', height: '16px' }}
                        />
                        <span>Featured on Resources</span>
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #1a2238', paddingTop: '16px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingArticle(null);
                        setIsCreatingArticle(false);
                      }}
                      className="ft-cms-btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={articleFormSaving}
                      onClick={() => handleSaveArticle(editingArticle, isCreatingArticle)}
                      className="ft-cms-btn-primary"
                    >
                      <FiSave size={14} />
                      <span>{articleFormSaving ? 'Saving...' : 'Save & Publish'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ARTICLES LIST */
                <div className="ft-cms-table-container">
                  <table className="ft-cms-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((art) => (
                        <tr key={art.id}>
                          <td>
                            <div style={{ fontWeight: 600, color: '#ffffff' }}>{art.title}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>/{art.handle}</div>
                          </td>
                          <td>
                            <span className="ft-cms-tag">{art.category}</span>
                          </td>
                          <td>
                            <span
                              className={`ft-cms-tag ${
                                art.status === 'published'
                                   ? 'ft-cms-tag--active'
                                  : 'ft-cms-tag--draft'
                              }`}
                            >
                              {art.status}
                            </span>
                          </td>
                          <td style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
                            {new Date(art.publishedAt).toLocaleDateString()}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <Link
                                href={`/articles/${art.handle}`}
                                target="_blank"
                                className="ft-cms-btn-secondary"
                                style={{ padding: '5px 10px', fontSize: '11px' }}
                              >
                                <FiExternalLink size={12} />
                                <span>View</span>
                              </Link>
                              <button
                                onClick={() => {
                                  setEditingArticle(art);
                                  setIsCreatingArticle(false);
                                }}
                                className="ft-cms-btn-secondary"
                                style={{ padding: '5px 10px', fontSize: '11px', color: '#60a5fa', borderColor: '#2563eb' }}
                              >
                                <FiEdit2 size={12} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id)}
                                className="ft-cms-btn-danger"
                                style={{ padding: '5px 10px', fontSize: '11px' }}
                              >
                                <FiTrash2 size={12} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* 10. SECURITY & 2FA */}
          {activeSection === 'security' && (
            <>
              {/* Change Password Card */}
              <div className="ft-cms-card">
                <div className="ft-cms-card__title">Change Admin Password</div>

                {pwdMessage && (
                  <div
                    className={
                      pwdMessage.type === 'success'
                        ? 'ft-cms-alert-success'
                        : 'ft-cms-alert-danger'
                    }
                  >
                    <span>{pwdMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} style={{ maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current password"
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password (min. 6 chars)"
                      className="ft-cms-input"
                    />
                  </div>

                  <div className="ft-cms-field">
                    <label className="ft-cms-label">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="ft-cms-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pwdSaving}
                    className="ft-cms-btn-primary"
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {pwdSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>

              {/* Two-Factor Authentication Card */}
              <div className="ft-cms-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1a2238', paddingBottom: '12px' }}>
                  <div className="ft-cms-card__title" style={{ border: 'none', padding: 0 }}>
                    Two-Factor Authentication (2FA)
                  </div>
                  <span
                    className={`ft-cms-nav__status-dot ${
                      user.twoFactorEnabled
                        ? 'ft-cms-nav__status-dot--active'
                        : 'ft-cms-nav__status-dot--inactive'
                    }`}
                  >
                    {user.twoFactorEnabled ? '● Enabled' : '○ Disabled'}
                  </span>
                </div>

                {twoFaSetupSuccess && (
                  <div className="ft-cms-alert-success">
                    <span>{twoFaSetupSuccess}</span>
                  </div>
                )}

                {twoFaSetupError && (
                  <div className="ft-cms-alert-danger">
                    <span>{twoFaSetupError}</span>
                  </div>
                )}

                {!twoFaSetupData ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, maxWidth: '580px', margin: 0 }}>
                      Protect your admin account with Google Authenticator, Authy, or 1Password.
                    </p>

                    <button
                      onClick={handleStart2faSetup}
                      className="ft-cms-btn-primary"
                      style={{ alignSelf: 'flex-start' }}
                    >
                      {user.twoFactorEnabled ? 'Reconfigure 2FA' : 'Setup 2FA Authenticator'}
                    </button>
                  </div>
                ) : (
                  <div className="ft-cms-grid-2">
                    <div style={{ backgroundColor: '#13192b', border: '1px solid #1a2238', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', marginBottom: '16px' }}>
                        1. Scan with Authenticator App
                      </p>
                      <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                            twoFaSetupData.otpAuthUri
                          )}`}
                          alt="2FA QR Code"
                          width={160}
                          height={160}
                          style={{ display: 'block' }}
                        />
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                        Secret key:
                      </div>
                      <code style={{ fontSize: '12px', color: '#60a5fa', fontFamily: 'monospace', fontWeight: 700, backgroundColor: '#0c101d', padding: '4px 10px', borderRadius: '6px', border: '1px solid #1a2238' }}>
                        {twoFaSetupData.secret}
                      </code>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ backgroundColor: '#13192b', border: '1px solid #1a2238', borderRadius: '12px', padding: '16px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', margin: '0 0 6px' }}>
                          2. Save Recovery Codes
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', backgroundColor: '#0c101d', padding: '10px', borderRadius: '8px', border: '1px solid #1a2238' }}>
                          {twoFaSetupData.recoveryCodes.map((c, i) => (
                            <div key={i}>{c}</div>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleConfirm2fa} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label className="ft-cms-label">3. Enter 6-digit verification code</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={twoFaVerifyCode}
                            onChange={(e) => setTwoFaVerifyCode(e.target.value)}
                            placeholder="123456"
                            className="ft-cms-input"
                            style={{ width: '130px', textAlign: 'center', fontFamily: 'monospace', letterSpacing: '0.1em' }}
                          />
                          <button type="submit" className="ft-cms-btn-primary">
                            Activate 2FA
                          </button>
                          <button
                            type="button"
                            onClick={() => setTwoFaSetupData(null)}
                            className="ft-cms-btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
