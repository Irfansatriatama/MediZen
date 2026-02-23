// MediZen Utils
const MediZen = {
  auth: {
    isLoggedIn() { return !!localStorage.getItem('mz_user'); },
    login(user) { localStorage.setItem('mz_user', JSON.stringify(user)); },
    logout() { localStorage.removeItem('mz_user'); },
    getUser() {
      const u = localStorage.getItem('mz_user');
      return u ? JSON.parse(u) : null;
    }
  },

  toast(msg, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = {
      success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = (icons[type] || '') + msg;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-8px)';
      el.style.transition = '0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, duration);
  },

  storage: {
    get(key) {
      try { const v = localStorage.getItem('mz_' + key); return v ? JSON.parse(v) : null; }
      catch { return null; }
    },
    set(key, val) {
      try { localStorage.setItem('mz_' + key, JSON.stringify(val)); return true; }
      catch { return false; }
    },
    remove(key) { localStorage.removeItem('mz_' + key); }
  },

  formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  },

  formatDateShort(date) {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  },

  timeAgo(date) {
    const diff = (Date.now() - new Date(date)) / 1000;
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return Math.floor(diff / 60) + ' menit lalu';
    if (diff < 86400) return Math.floor(diff / 3600) + ' jam lalu';
    if (diff < 604800) return Math.floor(diff / 86400) + ' hari lalu';
    return MediZen.formatDateShort(date);
  }
};
