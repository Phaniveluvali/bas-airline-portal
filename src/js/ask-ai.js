document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const clearBtn = document.getElementById('clearBtn');
  const newChatBtn = document.getElementById('newChatBtn');
  const suggestions = document.querySelectorAll('.suggestion-card');

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function appendUserMessage(text) {
    const msgHTML = `
      <div class="chat-message user">
        <div class="chat-avatar user-avatar"><i class="bi bi-person"></i></div>
        <div class="chat-bubble">${text}</div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
  }

  function appendAIMessage(content) {
    const msgHTML = `
      <div class="chat-message ai">
        <div class="chat-avatar ai-avatar"><i class="bi bi-robot"></i></div>
        <div class="chat-bubble">
          ${content}
        </div>
      </div>
    `;
    // Simulate slight delay
    setTimeout(() => {
      chatMessages.insertAdjacentHTML('beforeend', msgHTML);
      scrollToBottom();
    }, 400);
  }

  // Common Table Wrapper
  function wrapTable(title, tableContent) {
    return `
      <div class="mb-2 fw-bold text-dark">${title}</div>
      <div class="table-responsive bg-white rounded border">
        <table class="table ai-table mb-0">
          ${tableContent}
        </table>
      </div>
    `;
  }

  // --- Handlers for Responses ---

  function showPendingRegistrations() {
    const table = `
      <thead>
        <tr><th>Airline</th><th>Submitted Date</th><th>Status</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark"><i class="bi bi-airplane text-danger me-2"></i>Gulf Air</td><td>15 Sep 2025</td><td><span class="badge bg-warning text-dark">Pending Review</span></td><td><button class="btn btn-sm btn-outline-danger" style="font-size:0.7rem;">View Details</button></td></tr>
        <tr><td class="fw-semibold text-dark"><i class="bi bi-airplane text-danger me-2"></i>Flynas</td><td>10 Sep 2025</td><td><span class="badge bg-warning text-dark">Pending Review</span></td><td><button class="btn btn-sm btn-outline-danger" style="font-size:0.7rem;">View Details</button></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Here are the pending registration approvals:", table));
  }

  function showTodaysFlights() {
    const table = `
      <thead>
        <tr><th>Flight No.</th><th>Route</th><th>Scheduled Time</th><th>Status</th><th>Stand</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">GF 504</td><td>BAH &rarr; BOM</td><td>10:50 AST</td><td><span class="badge bg-success">On Time</span></td><td>Stand 14</td><td><button class="btn btn-sm btn-outline-danger" style="font-size:0.7rem;">View Flight</button></td></tr>
        <tr><td class="fw-semibold text-dark">GF 003</td><td>BAH &rarr; LHR</td><td>08:10 AST</td><td><span class="badge bg-warning text-dark">Delayed</span></td><td>Stand 12</td><td><button class="btn btn-sm btn-outline-danger" style="font-size:0.7rem;">View Flight</button></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Here are your flights for today:", table));
  }

  function showDelayedFlights() {
    const table = `
      <thead>
        <tr><th>Flight No.</th><th>Route</th><th>Scheduled</th><th>Estimated</th><th>Delay Reason</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">GF 003</td><td>BAH &rarr; LHR</td><td>08:10 AST</td><td class="text-danger fw-bold">09:45 AST</td><td>Late Arrival</td><td><span class="badge bg-warning text-dark">Delayed</span></td></tr>
        <tr><td class="fw-semibold text-dark">BA 124</td><td>BAH &rarr; LHR</td><td>09:15 AST</td><td class="text-danger fw-bold">10:00 AST</td><td>Air Traffic</td><td><span class="badge bg-warning text-dark">Delayed</span></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Here are the delayed flights and their updated ETAs:", table));
  }

  function showPendingServices() {
    const table = `
      <thead>
        <tr><th>Request ID</th><th>Flight</th><th>Service Type</th><th>Requested Time</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">SR-2026-00124</td><td>GF 123</td><td>Ramp Handling</td><td>10:15 AST</td><td><span class="badge bg-warning text-dark">Pending</span></td></tr>
        <tr><td class="fw-semibold text-dark">SR-2026-00125</td><td>BA 078</td><td>Catering</td><td>10:30 AST</td><td><span class="badge bg-warning text-dark">Pending</span></td></tr>
        <tr><td class="fw-semibold text-dark">SR-2026-00128</td><td>EK 838</td><td>Cleaning</td><td>11:00 AST</td><td><span class="badge bg-warning text-dark">Pending</span></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("These are the currently pending service requests:", table));
  }

  function showSLARisks() {
    const table = `
      <thead>
        <tr><th>Flight</th><th>Service Type</th><th>Time Elapsed</th><th>SLA Limit</th><th>Risk Level</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">GF 003</td><td>Baggage Unload</td><td class="text-danger">35 mins</td><td>30 mins</td><td><span class="badge bg-danger">Breached</span></td></tr>
        <tr><td class="fw-semibold text-dark">QR 220</td><td>Refueling</td><td class="text-warning">28 mins</td><td>30 mins</td><td><span class="badge bg-warning text-dark">High Risk</span></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Warning: The following services are approaching or have breached SLA limits:", table));
  }

  function showAirlineActivity() {
    const table = `
      <thead>
        <tr><th>Airline</th><th>Active Flights</th><th>Active Services</th><th>Reported Issues</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">Gulf Air</td><td>12</td><td>48</td><td><span class="badge bg-danger">2</span></td></tr>
        <tr><td class="fw-semibold text-dark">Emirates</td><td>4</td><td>15</td><td><span class="badge bg-success">0</span></td></tr>
        <tr><td class="fw-semibold text-dark">British Airways</td><td>1</td><td>4</td><td><span class="badge bg-warning text-dark">1</span></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Here is a quick snapshot of current airline activity:", table));
  }

  function showAuditSummary() {
    const table = `
      <thead>
        <tr><th>Action</th><th>User</th><th>Module</th><th>Time</th></tr>
      </thead>
      <tbody>
        <tr><td class="text-dark">Approved GF Registration</td><td>Ahmed Al Khalifa</td><td>Registrations</td><td>10 mins ago</td></tr>
        <tr><td class="text-dark">Updated Invoice #998</td><td>Fatima Salman</td><td>Billing</td><td>1 hour ago</td></tr>
        <tr><td class="text-dark">Changed Role Permissions</td><td>System Admin</td><td>Roles</td><td>2 hours ago</td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Recent system audit logs over the last few hours:", table));
  }

  function showPendingConfirmations() {
    const table = `
      <thead>
        <tr><th>Flight No.</th><th>Turnaround Date</th><th>Services Logged</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">GF 504</td><td>04 Aug 2026</td><td>7 Services</td><td><button class="btn btn-sm btn-outline-danger" style="font-size:0.7rem;">Review & Sign</button></td></tr>
        <tr><td class="fw-semibold text-dark">EK 838</td><td>04 Aug 2026</td><td>5 Services</td><td><button class="btn btn-sm btn-outline-danger" style="font-size:0.7rem;">Review & Sign</button></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("You have 5 pending electronic confirmations awaiting your signature. Here are the oldest two:", table));
  }

  function showMyInvoices() {
    const table = `
      <thead>
        <tr><th>Invoice No.</th><th>Issue Date</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark">INV-2026-8991</td><td>01 Sep 2026</td><td>BHD 4,500.00</td><td>15 Sep 2026</td><td><span class="badge bg-danger">Overdue</span></td></tr>
        <tr><td class="fw-semibold text-dark">INV-2026-9024</td><td>05 Sep 2026</td><td>BHD 1,250.00</td><td>20 Sep 2026</td><td><span class="badge bg-warning text-dark">Unpaid</span></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("Here are your open and overdue invoices:", table));
  }

  function showFindDocuments() {
    const table = `
      <thead>
        <tr><th>Document Name</th><th>Category</th><th>Upload Date</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr><td class="fw-semibold text-dark"><i class="bi bi-file-pdf text-danger me-2"></i>Q3 SLA Report.pdf</td><td>Reports</td><td>01 Sep 2026</td><td><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-download"></i></button></td></tr>
        <tr><td class="fw-semibold text-dark"><i class="bi bi-file-pdf text-danger me-2"></i>Ground Handling Tariff 2026.pdf</td><td>Contracts</td><td>15 Aug 2026</td><td><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-download"></i></button></td></tr>
      </tbody>
    `;
    appendAIMessage(wrapTable("I found the following recent documents for your airline:", table));
  }

  function processQuery(text) {
    const lower = text.toLowerCase();
    
    if (lower.includes('registration approvals')) {
      showPendingRegistrations();
    } else if (lower.includes('today\'s flights') || lower.includes('todays flights') || (lower.includes('today') && lower.includes('flights'))) {
      showTodaysFlights();
    } else if (lower.includes('delayed')) {
      showDelayedFlights();
    } else if (lower.includes('pending service')) {
      showPendingServices();
    } else if (lower.includes('sla risks')) {
      showSLARisks();
    } else if (lower.includes('airline activity')) {
      showAirlineActivity();
    } else if (lower.includes('audit summary')) {
      showAuditSummary();
    } else if (lower.includes('pending confirmation')) {
      showPendingConfirmations();
    } else if (lower.includes('invoice')) {
      showMyInvoices();
    } else if (lower.includes('document')) {
      showFindDocuments();
    } else {
      appendAIMessage("I'm sorry, I'm just a demo assistant. Try asking about 'pending registration approvals', 'delayed flights', 'invoices', or 'documents'.");
    }
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendUserMessage(text);
    chatInput.value = '';
    processQuery(text);
  }

  // Event Listeners
  if(sendBtn) sendBtn.addEventListener('click', handleSend);
  if(chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });
  }

  suggestions.forEach(card => {
    card.addEventListener('click', () => {
      const text = card.textContent.trim();
      appendUserMessage(text);
      processQuery(text);
    });
  });

  if(clearBtn) {
    clearBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-message ai">
          <div class="chat-avatar ai-avatar"><i class="bi bi-robot"></i></div>
          <div class="chat-bubble">
            <h6 class="fw-bold mb-1">Hello! I am your BAS AI Assistant.</h6>
            <p class="mb-0 text-secondary" style="font-size:0.85rem;">How can I help you today? You can select a suggestion below or type your question.</p>
          </div>
        </div>
      `;
    });
  }
  
  if(newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      if(clearBtn) clearBtn.click();
    });
  }
});
