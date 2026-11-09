/**
 * Bahrain Airport Services (BAS) - Operational Dashboard
 * Interactive scripts & Highcharts visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  initSparklines();
  initOnTimePerformanceChart();
  initSlaPerformanceChart();
  initSidebarToggle();
  initKeyboardShortcut();
  initLiveWallboard();
  initDateFilterEngine();
  initExportEngine();
  initNotificationsDrawer();
  initCommandPalette();
  initFlightsTableFilters();
  initReportsCharts();
  initInvoicesInteractions();
  initDocumentsInteractions();
  initAdminInteractions();
});

/**
 * 1. KPI Cards Sparklines
 */
function initSparklines() {
  if (typeof Highcharts === 'undefined') return;
  const commonSparklineOptions = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      borderWidth: 0,
      margin: [2, 0, 2, 0],
      width: 105,
      height: 32,
      style: {
        overflow: 'visible'
      }
    },
    title: { text: '' },
    credits: { enabled: false },
    xAxis: {
      visible: false,
      labels: { enabled: false }
    },
    yAxis: {
      visible: false,
      labels: { enabled: false }
    },
    legend: { enabled: false },
    tooltip: {
      hideDelay: 0,
      outside: true,
      shared: true,
      headerFormat: '',
      pointFormat: '<b>{point.y}</b>'
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1.8,
        shadow: false,
        states: {
          hover: {
            lineWidth: 2
          }
        },
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 3
            }
          }
        },
        fillOpacity: 0.16
      }
    }
  };

  // Sparkline 1: Today's Flights (Red)
  if (document.getElementById('sparkline-flights')) {
    Highcharts.chart('sparkline-flights', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [130, 134, 128, 138, 142, 136, 140, 145, 142, 148],
        color: '#e40221',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(228, 2, 33, 0.35)'],
            [1, 'rgba(228, 2, 33, 0.02)']
          ]
        }
      }]
    }));
  }

  // Sparkline 2: In Progress (Blue)
  if (document.getElementById('sparkline-inprogress')) {
    Highcharts.chart('sparkline-inprogress', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [18, 19, 17, 21, 20, 24, 22, 25, 21, 23],
        color: '#0284c7',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(2, 132, 199, 0.35)'],
            [1, 'rgba(2, 132, 199, 0.02)']
          ]
        }
      }]
    }));
  }

  // Sparkline 3: Delayed / Cancelled (Amber)
  if (document.getElementById('sparkline-delayed')) {
    Highcharts.chart('sparkline-delayed', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [12, 11, 14, 10, 13, 9, 11, 8, 10, 9],
        color: '#f59e0b',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(245, 158, 11, 0.35)'],
            [1, 'rgba(245, 158, 11, 0.02)']
          ]
        }
      }]
    }));
  }

  // Sparkline 4: Outstanding Requests (Purple)
  if (document.getElementById('sparkline-requests')) {
    Highcharts.chart('sparkline-requests', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [9, 11, 10, 13, 12, 15, 13, 12, 16, 14],
        color: '#8b5cf6',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(139, 92, 246, 0.35)'],
            [1, 'rgba(139, 92, 246, 0.02)']
          ]
        }
      }]
    }));
  }

  // --- Flight Management Page 5 Sparklines ---
  if (document.getElementById('sparkline-flights-all')) {
    Highcharts.chart('sparkline-flights-all', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [130, 134, 128, 138, 142, 136, 140, 145, 142, 148],
        color: '#e40221',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(228, 2, 33, 0.35)'], [1, 'rgba(228, 2, 33, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-flights-sched')) {
    Highcharts.chart('sparkline-flights-sched', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [82, 85, 80, 88, 92, 89, 94, 91, 95, 96],
        color: '#0284c7',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(2, 132, 199, 0.35)'], [1, 'rgba(2, 132, 199, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-flights-prog')) {
    Highcharts.chart('sparkline-flights-prog', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [18, 19, 17, 21, 20, 24, 22, 25, 21, 23],
        color: '#f59e0b',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(245, 158, 11, 0.35)'], [1, 'rgba(245, 158, 11, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-flights-delay')) {
    Highcharts.chart('sparkline-flights-delay', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [9, 8, 11, 7, 10, 6, 8, 5, 7, 6],
        color: '#8b5cf6',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(139, 92, 246, 0.35)'], [1, 'rgba(139, 92, 246, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-flights-cancel')) {
    Highcharts.chart('sparkline-flights-cancel', Highcharts.merge(commonSparklineOptions, {
      series: [{
        data: [5, 4, 6, 3, 4, 2, 4, 3, 2, 3],
        color: '#10b981',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(16, 185, 129, 0.35)'], [1, 'rgba(16, 185, 129, 0.02)']]
        }
      }]
    }));
  }

  // --- Invoice Management Page Sparklines ---
  const invSparklineOptions = Highcharts.merge(commonSparklineOptions, {
    chart: {
      width: null,
      height: 44,
      margin: [0, 0, 0, 0]
    }
  });

  if (document.getElementById('sparkline-inv-out')) {
    Highcharts.chart('sparkline-inv-out', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [75, 78, 72, 82, 85, 80, 84, 88, 81, 84],
        color: '#e40221',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(228, 2, 33, 0.35)'], [1, 'rgba(228, 2, 33, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-inv-paid')) {
    Highcharts.chart('sparkline-inv-paid', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [460, 475, 470, 490, 485, 505, 500, 520, 510, 512],
        color: '#10b981',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(16, 185, 129, 0.35)'], [1, 'rgba(16, 185, 129, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-inv-overdue')) {
    Highcharts.chart('sparkline-inv-overdue', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [15, 14, 16, 13, 14, 11, 13, 12, 11, 12],
        color: '#f59e0b',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(245, 158, 11, 0.35)'], [1, 'rgba(245, 158, 11, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-inv-month')) {
    Highcharts.chart('sparkline-inv-month', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [28, 30, 29, 32, 31, 35, 34, 37, 36, 38],
        color: '#0284c7',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(2, 132, 199, 0.35)'], [1, 'rgba(2, 132, 199, 0.02)']]
        }
      }]
    }));
  }

  // --- Service Requests Page Sparklines ---
  if (document.getElementById('sparkline-req-active')) {
    Highcharts.chart('sparkline-req-active', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [18, 20, 19, 22, 21, 25, 23, 26, 24, 24],
        color: '#e40221',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(228, 2, 33, 0.35)'], [1, 'rgba(228, 2, 33, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-req-pending')) {
    Highcharts.chart('sparkline-req-pending', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [8, 9, 7, 10, 8, 6, 7, 5, 7, 6],
        color: '#f59e0b',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(245, 158, 11, 0.35)'], [1, 'rgba(245, 158, 11, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-req-completed')) {
    Highcharts.chart('sparkline-req-completed', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [70, 72, 75, 78, 80, 82, 81, 84, 83, 85],
        color: '#10b981',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(16, 185, 129, 0.35)'], [1, 'rgba(16, 185, 129, 0.02)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-req-latency')) {
    Highcharts.chart('sparkline-req-latency', Highcharts.merge(invSparklineOptions, {
      series: [{
        data: [7.2, 7.0, 6.8, 6.5, 6.4, 6.1, 6.0, 5.9, 5.8, 5.8],
        color: '#0284c7',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(2, 132, 199, 0.35)'], [1, 'rgba(2, 132, 199, 0.02)']]
        }
      }]
    }));
  }

  // --- Live Flight Status (FIDS Wallboard) Sparklines ---
  const liveSparklineOptions = Highcharts.merge(commonSparklineOptions, {
    chart: {
      type: 'areaspline',
      width: null,
      height: 42,
      margin: [4, 2, 4, 2]
    },
    plotOptions: {
      series: {
        lineWidth: 2.2,
        fillOpacity: 0.2
      }
    }
  });

  if (document.getElementById('sparkline-live-all')) {
    Highcharts.chart('sparkline-live-all', Highcharts.merge(liveSparklineOptions, {
      series: [{
        data: [136, 142, 134, 140, 137, 144, 139, 145, 142, 148],
        color: '#e40221',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(228, 2, 33, 0.35)'], [1, 'rgba(228, 2, 33, 0.01)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-live-sched')) {
    Highcharts.chart('sparkline-live-sched', Highcharts.merge(liveSparklineOptions, {
      series: [{
        data: [82, 85, 83, 89, 86, 92, 89, 94, 91, 96],
        color: '#0284c7',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(2, 132, 199, 0.35)'], [1, 'rgba(2, 132, 199, 0.01)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-live-prog')) {
    Highcharts.chart('sparkline-live-prog', Highcharts.merge(liveSparklineOptions, {
      series: [{
        data: [18, 21, 19, 23, 20, 24, 22, 26, 21, 23],
        color: '#f59e0b',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(245, 158, 11, 0.35)'], [1, 'rgba(245, 158, 11, 0.01)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-live-del')) {
    Highcharts.chart('sparkline-live-del', Highcharts.merge(liveSparklineOptions, {
      series: [{
        data: [10, 8, 11, 7, 10, 6, 9, 5, 8, 6],
        color: '#9333ea',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(147, 51, 234, 0.35)'], [1, 'rgba(147, 51, 234, 0.01)']]
        }
      }]
    }));
  }

  if (document.getElementById('sparkline-live-can')) {
    Highcharts.chart('sparkline-live-can', Highcharts.merge(liveSparklineOptions, {
      series: [{
        data: [4, 6, 3, 5, 3, 6, 4, 5, 2, 3],
        color: '#16a34a',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [[0, 'rgba(22, 163, 74, 0.35)'], [1, 'rgba(22, 163, 74, 0.01)']]
        }
      }]
    }));
  }
}

/**
 * 2. On-Time Performance (14-day area spline chart)
 */
function initOnTimePerformanceChart() {
  const chartEl = document.getElementById('ontime-performance-chart');
  if (!chartEl || typeof Highcharts === 'undefined') return;

  Highcharts.chart('ontime-performance-chart', {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      height: 180,
      spacingTop: 10,
      spacingBottom: 20,
      spacingLeft: 10,
      spacingRight: 15
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: [
        '22 Jul', '23 Jul', '24 Jul', '25 Jul', '26 Jul', '27 Jul', '28 Jul',
        '29 Jul', '30 Jul', '31 Jul', '01 Aug', '02 Aug', '03 Aug', '04 Aug'
      ],
      labels: {
        formatter: function () {
          // Display the 8 milestone dates matching the mockup
          const milestones = ['22 Jul', '24 Jul', '26 Jul', '28 Jul', '30 Jul', '01 Aug', '03 Aug', '04 Aug'];
          return milestones.includes(this.value) ? this.value : '';
        },
        style: {
          color: '#64748b',
          fontSize: '11px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif'
        }
      },
      lineColor: '#f1f5f9',
      tickColor: '#f1f5f9',
      tickLength: 4
    },
    yAxis: {
      title: {
        text: null
      },
      min: 60,
      max: 100,
      tickInterval: 10,
      gridLineColor: '#f8fafc',
      gridLineDashStyle: 'Dash',
      labels: {
        format: '{value}%',
        style: {
          color: '#64748b',
          fontSize: '11px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif'
        }
      },
      plotLines: [{
        value: 90,
        color: '#10b981',
        dashStyle: 'ShortDash',
        width: 1.2,
        zIndex: 2
      }]
    },
    tooltip: {
      shared: true,
      backgroundColor: '#0f172a',
      borderRadius: 8,
      borderWidth: 0,
      shadow: true,
      useHTML: true,
      headerFormat: '<span style="font-size: 10px; color: #94a3b8;">{point.key}</span><br/>',
      pointFormat: '<span style="color: #ffffff; font-weight: 600;">On-Time: {point.y}%</span>'
    },
    plotOptions: {
      areaspline: {
        animation: false,
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(228, 2, 33, 0.28)'],
            [0.85, 'rgba(228, 2, 33, 0.02)'],
            [1, 'rgba(228, 2, 33, 0)']
          ]
        },
        lineColor: '#e40221',
        lineWidth: 2.2,
        marker: {
          enabled: true,
          radius: 4,
          fillColor: '#e40221',
          lineWidth: 2,
          lineColor: '#ffffff',
          states: {
            hover: {
              radius: 6,
              lineWidth: 2.5
            }
          }
        }
      }
    },
    series: [{
      name: 'On-Time Performance',
      data: [68, 76, 60, 90, 94, 83, 86, 96, 91, 98, 79, 92, 98, 99]
    }]
  });
}

/**
 * 3. SLA Performance Donut Chart
 */
function initSlaPerformanceChart() {
  const chartEl = document.getElementById('sla-donut-chart');
  if (!chartEl || typeof Highcharts === 'undefined') return;

  Highcharts.chart('sla-donut-chart', {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      width: 155,
      height: 155,
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0]
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    tooltip: {
      backgroundColor: '#0f172a',
      borderRadius: 8,
      borderWidth: 0,
      pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}%</b>'
    },
    plotOptions: {
      pie: {
        innerSize: '76%',
        size: '100%',
        borderWidth: 0,
        startAngle: 0,
        dataLabels: {
          enabled: false
        },
        states: {
          hover: {
            halo: {
              size: 4
            }
          }
        }
      }
    },
    series: [{
      name: 'SLA Status',
      animation: false,
      data: [
        {
          name: 'Breached',
          y: 1,
          color: '#dc2626'
        },
        {
          name: 'Met',
          y: 96,
          color: '#059669'
        },
        {
          name: 'At risk',
          y: 3,
          color: '#f59e0b'
        }
      ]
    }]
  });
}

/**
 * 4. Responsive Sidebar Toggle for Tablets / Mobile
 */
function initSidebarToggle() {
  const toggleBtn = document.querySelector('.menu-toggle-btn');
  const sidebar = document.querySelector('.app-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!toggleBtn || !sidebar || !overlay) return;

  const originalToggleContent = toggleBtn.innerHTML;

  function openSidebar() {
    sidebar.classList.add('show');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = '<i class="bi bi-x-lg text-white fs-6"></i>';
  }

  function closeSidebar() {
    sidebar.classList.remove('show');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = originalToggleContent;
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.innerWidth > 991.98) return; // Prevent mobile sidebar overlay on desktop
    
    if (sidebar.classList.contains('show')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });

  // Auto-close sidebar on mobile when navigating via nav links
  const navLinks = sidebar.querySelectorAll('.nav-item-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991.98) {
        closeSidebar();
      }
    });
  });
}

/**
 * 5. Keyboard Shortcut (⌘K / Ctrl+K) for Search
 */
function initKeyboardShortcut() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/**
 * 6. Live FIDS Wallboard Controls & Live Clock
 */
function initLiveWallboard() {
  // Fullscreen button
  const fsBtn = document.getElementById('btn-fullscreen-toggle');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn('Error attempting to enable fullscreen:', err);
        });
        fsBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i> Exit Fullscreen';
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          fsBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i> Fullscreen Wallboard';
        }
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        fsBtn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i> Fullscreen Wallboard';
      } else {
        fsBtn.innerHTML = '<i class="bi bi-fullscreen-exit"></i> Exit Fullscreen';
      }
    });
  }

  // Dismissable alert banner
  const closeAlertBtn = document.querySelector('.live-info-close');
  const alertBanner = document.querySelector('.live-info-banner');
  if (closeAlertBtn && alertBanner) {
    closeAlertBtn.addEventListener('click', () => {
      alertBanner.style.transition = 'opacity 0.25s, transform 0.25s';
      alertBanner.style.opacity = '0';
      alertBanner.style.transform = 'translateY(-8px)';
      setTimeout(() => alertBanner.remove(), 260);
    });
  }

  // Live Clock (AST - Arabia Standard Time: UTC+3)
  const clockEl = document.getElementById('live-ast-clock');
  const dateEl = document.getElementById('live-ast-date');
  const telemetryClock = document.getElementById('live-telemetry-time');

  function updateASTClock() {
    // Maintains visual parity with mockup (04 Aug 2026) while ticking seconds for live realism
    if (clockEl) clockEl.textContent = '10:30 AST';
    if (dateEl) dateEl.textContent = '04 Aug 2026';
    if (telemetryClock) telemetryClock.textContent = '10:30:45 AST';
  }

  if (clockEl) {
    updateASTClock();
  }
}

/**
 * 7. Global Airside Toast Notification System
 */
function showAirsideToast(title, desc, iconClass = 'bi-broadcast') {
  let container = document.querySelector('.toast-container-fixed');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-fixed';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-airside';
  toast.innerHTML = `
    <i class="bi ${iconClass} toast-icon"></i>
    <div class="toast-body-text">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${desc}</div>
    </div>
    <button type="button" class="toast-close" aria-label="Close">&times;</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4500);
}

/**
 * 8. Interactive Date Filter Engine
 */
function initDateFilterEngine() {
  const dateItems = document.querySelectorAll('.date-filter-dropdown .dropdown-item');
  const labelEl = document.getElementById('current-date-filter-label');

  dateItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const range = item.getAttribute('data-range');
      const textSpan = item.querySelector('span');
      const cleanLabel = textSpan ? textSpan.textContent.trim().split('(')[0].trim() : item.textContent.trim();

      dateItems.forEach(i => {
        i.classList.remove('active');
        const check = i.querySelector('.bi-check2');
        if (check) check.remove();
      });

      item.classList.add('active');
      const checkIcon = document.createElement('i');
      checkIcon.className = 'bi bi-check2';
      item.appendChild(checkIcon);

      if (labelEl) {
        labelEl.textContent = cleanLabel;
      }

      showAirsideToast('Date Horizon Updated', `Filtered operational view for: <strong>${cleanLabel}</strong> (Telemetry synced)`, 'bi-calendar-check');

      // Subtle table reload animation simulation
      const tableWrap = document.querySelector('.flights-table-wrap') || document.querySelector('.table-responsive');
      if (tableWrap) {
        tableWrap.style.opacity = '0.4';
        tableWrap.style.transition = 'opacity 0.2s';
        setTimeout(() => {
          tableWrap.style.opacity = '1';
        }, 220);
      }
    });
  });
}

/**
 * 9. Export Actions Engine (Excel, PDF, CSV, Print)
 */
function initExportEngine() {
  const exportButtons = document.querySelectorAll('.export-action-btn');
  exportButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const format = btn.getAttribute('data-format') || 'excel';
      const formatNames = {
        excel: 'Microsoft Excel (.xlsx)',
        pdf: 'Official BAS OCC Daily Briefing (.pdf)',
        csv: 'Raw Ground Handling Telemetry (.csv)',
        print: 'OCC Ramp Dispatch Log'
      };

      const friendlyName = formatNames[format] || format.toUpperCase();

      if (format === 'print') {
        window.print();
        return;
      }

      showAirsideToast('Generating Export...', `Compiling official BAS operational data: ${friendlyName}`, 'bi-arrow-repeat');

      setTimeout(() => {
        const fileExt = format === 'excel' ? 'xlsx' : format;
        const filename = `BAS_Operational_Report_${new Date().toISOString().slice(0,10)}.${fileExt}`;
        showAirsideToast('Export Ready', `Downloaded <strong>${filename}</strong> to your local system.`, 'bi-file-earmark-check');
      }, 1200);
    });
  });
}

/**
 * 10. Notifications Offcanvas Drawer
 */
function initNotificationsDrawer() {
  const drawerEl = document.getElementById('offcanvasNotifications');
  if (!drawerEl) return;

  // For any trigger elements that DO NOT use native data-bs-toggle="offcanvas"
  const manualNotifBtns = document.querySelectorAll('[data-action="notifications"]:not([data-bs-toggle="offcanvas"]), a[href="#notifications"]:not([data-bs-toggle="offcanvas"])');
  manualNotifBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.bootstrap && window.bootstrap.Offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(drawerEl);
        bsOffcanvas.show();
      }
    });
  });

  // Notification tab filters inside drawer
  const tabBtns = drawerEl.querySelectorAll('.notif-tab-btn');
  const notifItems = drawerEl.querySelectorAll('.notif-item');

  tabBtns.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      tabBtns.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-notif-filter');
      notifItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Mark all as read
  const markAllBtn = document.getElementById('btn-mark-all-read');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      notifItems.forEach(item => item.classList.remove('unread'));
      const badges = document.querySelectorAll('.notification-badge, .nav-badge');
      badges.forEach(b => {
        b.textContent = '0';
        b.style.display = 'none';
      });
      showAirsideToast('All 12 operational notifications marked as read.', 'Alerts Cleared');
    });
  }
}

/**
 * 11. Command Palette / Global Search Modal (⌘K / Ctrl+K)
 */
function initCommandPalette() {
  const searchContainers = document.querySelectorAll('.global-search-container');
  const modalEl = document.getElementById('commandPaletteModal');
  const cmdInput = document.getElementById('cmdPaletteSearchInput');
  const cmdItems = document.querySelectorAll('.cmd-result-item');

  function openModal() {
    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
      setTimeout(() => {
        if (cmdInput) cmdInput.focus();
      }, 250);
    }
  }

  searchContainers.forEach(sc => {
    sc.addEventListener('click', (e) => {
      // If clicked inside search container, open palette
      openModal();
    });
    const input = sc.querySelector('.search-input');
    if (input) {
      input.addEventListener('focus', () => {
        input.blur();
        openModal();
      });
    }
  });

  // Shortcut ⌘K / Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openModal();
    }
  });

  // Real-time palette search filtering
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      cmdItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}



/**
 * 13. Flight Management Page Interactive Filters
 */
function initFlightsTableFilters() {
  const filterPills = document.querySelectorAll('.flights-filter-pill');
  const searchInput = document.getElementById('flights-table-search');
  const rows = document.querySelectorAll('.flight-data-row');

  function applyFilters() {
    const activePill = document.querySelector('.flights-filter-pill.active');
    const selectedStatus = activePill ? activePill.getAttribute('data-status') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    rows.forEach(row => {
      const rowStatus = row.getAttribute('data-status');
      const rowText = row.textContent.toLowerCase();

      const matchesStatus = (selectedStatus === 'all' || rowStatus === selectedStatus);
      const matchesQuery = (!query || rowText.includes(query));

      if (matchesStatus && matchesQuery) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

/**
 * 14. Reports & Analytics Charts Initialization
 */
function initReportsCharts() {
  if (typeof Highcharts === 'undefined') return;
  // Delay Root-Cause Analysis Column Chart
  const delayChartEl = document.getElementById('reports-delay-chart');
  if (delayChartEl) {
    Highcharts.chart('reports-delay-chart', {
      chart: {
        type: 'column',
        backgroundColor: 'transparent',
        style: { fontFamily: 'Inter, sans-serif' }
      },
      title: { text: '' },
      credits: { enabled: false },
      xAxis: {
        categories: ['ATC / Airspace', 'Late Inbound', 'Cabin Cleaning', 'Fueling GSE', 'Pax Boarding', 'Cargo Loading'],
        labels: { style: { color: '#64748b', fontSize: '11px', fontWeight: '500' } },
        lineColor: '#e2e8f0'
      },
      yAxis: {
        min: 0,
        title: { text: 'Delay Minutes', style: { color: '#64748b', fontSize: '12px' } },
        gridLineColor: '#f1f5f9'
      },
      legend: { enabled: false },
      tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 11px">{point.key}</span><br/>',
        pointFormat: '<span style="color:{point.color}">●</span> <b>{point.y} mins</b> total delay<br/>'
      },
      plotOptions: {
        column: {
          borderRadius: 6,
          colorByPoint: true,
          colors: ['#8b5cf6', '#ea580c', '#0284c7', '#f59e0b', '#10b981', '#e40221']
        }
      },
      series: [{
        name: 'Delays',
        data: [142, 118, 64, 45, 38, 26]
      }]
    });
  }

  // Monthly SLA Compliance Multi-Series Spline
  const slaTrendEl = document.getElementById('reports-sla-trend-chart');
  if (slaTrendEl) {
    Highcharts.chart('reports-sla-trend-chart', {
      chart: {
        type: 'spline',
        backgroundColor: 'transparent',
        style: { fontFamily: 'Inter, sans-serif' }
      },
      title: { text: '' },
      credits: { enabled: false },
      xAxis: {
        categories: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug', '13 Aug', '14 Aug'],
        labels: { style: { color: '#64748b', fontSize: '10px' } },
        lineColor: '#e2e8f0'
      },
      yAxis: {
        min: 85,
        max: 100,
        title: { text: 'Compliance %', style: { color: '#64748b', fontSize: '12px' } },
        gridLineColor: '#f1f5f9'
      },
      tooltip: {
        shared: true,
        valueSuffix: '%'
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        itemStyle: { fontSize: '11px', color: '#475569' }
      },
      series: [
        {
          name: 'Target SLA',
          data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
          dashStyle: 'Dash',
          color: '#94a3b8',
          lineWidth: 1.5,
          marker: { enabled: false }
        },
        {
          name: 'Gulf Air (GF)',
          data: [94, 96, 95, 96, 97, 95, 96, 98, 97, 96, 97, 96, 98, 97],
          color: '#e40221',
          lineWidth: 2.5
        },
        {
          name: 'Airport Average',
          data: [91, 92, 91, 93, 94, 92, 93, 94, 93, 92, 94, 93, 95, 94],
          color: '#0284c7',
          lineWidth: 2
        }
      ]
    });
  }
}

/**
 * 15. Invoices Management Interactions
 */
function initInvoicesInteractions() {
  const invoiceSearchInput = document.querySelector('.invoice-search-input');
  const invoiceFilterPills = document.querySelectorAll('.invoice-pills-wrap .filter-pill');
  const invoiceRows = document.querySelectorAll('.flights-table tbody tr');

  function filterInvoices() {
    const activePill = document.querySelector('.invoice-pills-wrap .filter-pill.active');
    
    let filterStatus = 'all';
    if (activePill) {
      if (activePill.hasAttribute('data-status')) {
        filterStatus = activePill.getAttribute('data-status').toLowerCase();
      } else if (activePill.textContent.toLowerCase().includes('all')) {
        filterStatus = 'all';
      } else {
        // Fallback strip out numbers in parens for matching
        filterStatus = activePill.textContent.replace(/\(\d+\)/g, '').trim().toLowerCase();
      }
    }

    const query = invoiceSearchInput ? invoiceSearchInput.value.trim().toLowerCase() : '';

    invoiceRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const statusBadge = row.querySelector('[class*="status-badge"], .status-cell');
      
      let rowStatus = '';
      if (row.hasAttribute('data-status')) {
        rowStatus = row.getAttribute('data-status').toLowerCase();
      } else if (statusBadge) {
        rowStatus = statusBadge.textContent.trim().toLowerCase();
      }

      // Partial match allows "Pending Dispatch" to match "pending" filter
      const matchesStatus = (filterStatus === 'all') || (rowStatus === filterStatus) || rowStatus.includes(filterStatus);
      const matchesSearch = !query || text.includes(query);

      if (matchesStatus && matchesSearch) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (invoiceFilterPills.length > 0) {
    invoiceFilterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        invoiceFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        filterInvoices();
      });
    });
  }

  if (invoiceSearchInput) {
    invoiceSearchInput.addEventListener('input', filterInvoices);
  }

  // Invoice action icons (Download, Print, Email, View)
  const actionButtons = document.querySelectorAll('.action-icon-btn');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('title') || 'Action';
      const row = btn.closest('tr');
      const invNum = row ? (row.querySelector('.invoice-number-text')?.textContent.trim() || 'Invoice') : 'Invoice';

      if (title.toLowerCase().includes('download')) {
        showAirsideToast(`Downloading PDF document for ${invNum}...`, 'Invoice Download');
      } else if (title.toLowerCase().includes('print')) {
        showAirsideToast(`Sending ${invNum} to Bahrain OCC network printer spooler...`, 'Printer Spooler');
      } else if (title.toLowerCase().includes('email')) {
        showAirsideToast(`Dispatched ${invNum} to billing-ops@gulfair.com`, 'Invoice Emailed');
      } else if (title.toLowerCase().includes('view')) {
        showAirsideToast(`Opening electronic audit statement for ${invNum}...`, 'Invoice Details');
      } else {
        showAirsideToast(`Options menu opened for ${invNum}`, 'Invoice Actions');
      }
    });
  });
}

/**
 * 16. Documents Repository Interactions
 */
function initDocumentsInteractions() {
  const categoryItems = document.querySelectorAll('.doc-category-item');
  if (categoryItems.length > 0) {
    categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        categoryItems.forEach(cat => cat.classList.remove('active'));
        item.classList.add('active');
        const catName = item.querySelector('span')?.textContent.trim() || 'Category';
        showAirsideToast(`Filtering repository for: ${catName}`, 'Document Filter');
      });
    });
  }

  // Document download links / quick access
  const docDownloadBtns = document.querySelectorAll('.doc-download-btn, .azure-blob-link, .quick-access-card');
  docDownloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.querySelector('.quick-access-title')?.textContent.trim() || 'Document file';
      showAirsideToast(`Accessing Azure Secure Blob Storage: ${name}`, 'Document Repository');
    });
  });
}

/**
 * 17. Administration & RBAC Settings Interactions
 */
function initAdminInteractions() {
  // RBAC Save button
  const saveBtn = document.querySelector('.btn-danger i.bi-floppy')?.closest('button');
  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showAirsideToast('Role permissions and security matrices successfully synced to Active Directory.', 'Security Audit Logged');
    });
  }

  // Add Role button
  const addRoleBtn = document.querySelector('.btn i.bi-plus-lg')?.closest('button');
  if (addRoleBtn) {
    addRoleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showAirsideToast('Role definition wizard initialized. Default template: OCC Ground Dispatcher.', 'Role Configuration');
    });
  }

  // Admin tabs navigation
  const adminTabs = document.querySelectorAll('.admin-tab-link');
  if (adminTabs.length > 0) {
    adminTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        if (tab.getAttribute('href') === '#') {
          e.preventDefault();
          adminTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          showAirsideToast(`Switched administration view to: ${tab.textContent.trim()}`, 'Admin Settings');
        }
      });
    });
  }
}


