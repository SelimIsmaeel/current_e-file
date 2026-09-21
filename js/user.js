const DB_USERS = "efile_users",
  DB_FILES = "efile_files",
  DB_SUBS = "efile_submissions",
  DB_NOTIFS = "efile_notifications",
  DB_SESSION = "efile_session",
  DB_ACTIVITY = "efile_activity";

function loadDB(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}
function saveDB(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
function uid(prefix) {
  return (
    prefix +
    "_" +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 6)
  );
}
function nowISO() {
  return new Date().toISOString();
}
function addDays(d) {
  const date = new Date();
  date.setDate(date.getDate() + d);
  return date.toISOString();
}
function fmtDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function fmtDateTime(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
}
function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + " min ago";
  if (diff < 86400)
    return (
      Math.floor(diff / 3600) +
      " hour" +
      (Math.floor(diff / 3600) > 1 ? "s" : "") +
      " ago"
    );
  return (
    Math.floor(diff / 86400) +
    " day" +
    (Math.floor(diff / 86400) > 1 ? "s" : "") +
    " ago"
  );
}

function seedData() {
  if (loadDB(DB_USERS).length) return;

  const admin = {
    id: "u_admin",
    name: "Admin",
    email: "admin@efile.com",
    phone: "234 5637 890",
    password: "admin123",
    role: "admin",
    status: "Active",
    joined: nowISO(),
    avatarColor: "#f30202",
  };
  const selim = {
    id: "u_selim",
    name: "Selim",
    email: "selim@email.com",
    phone: "234 567 8904",
    password: "user123",
    // role: "admin",
    role: "user",
    status: "Active",
    joined: nowISO(),
    avatarColor: "#2f6fed",
  };
  const john = {
    id: "u_john",
    name: "John Olakunle",
    email: "john.olakunle@email.com",
    phone: "+1 234 567 890",
    password: "user123",
    role: "user",
    status: "Active",
    joined: nowISO(),
    avatarColor: "#059669",
  };
  const sarah = {
    id: "u_sarah",
    name: "Sarah Adebola",
    email: "sarah.adebola@email.com",
    phone: "+1 234 567 891",
    password: "user123",
    role: "user",
    status: "Active",
    joined: nowISO(),
    avatarColor: "#d97706",
  };

  saveDB(DB_USERS, [admin, john, sarah]);

  const files = [
    {
      id: uid("f"),
      title: "Project Proposal",
      fileName: "Project Proposal.pdf",
      description: "Draft the Q3 project proposal.",
      category: "Documents",
      assignedTo: "u_john",
      assignedBy: "u_admin",
      uploadedOn: nowISO(),
      dueDate: addDays(10),
      status: "Pending",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
    {
      id: uid("f"),
      title: "Business Plan",
      fileName: "Business Plan.docx",
      description: "Outline the new business plan.",
      category: "Documents",
      assignedTo: "u_john",
      assignedBy: "u_admin",
      uploadedOn: nowISO(),
      dueDate: addDays(8),
      status: "Completed",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
    {
      id: uid("f"),
      title: "Market Analysis",
      fileName: "Market Analysis.xlsx",
      description: "Analyze current market trends.",
      category: "Spreadsheets",
      assignedTo: "u_john",
      assignedBy: "u_admin",
      uploadedOn: nowISO(),
      dueDate: addDays(5),
      status: "In Progress",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
    {
      id: uid("f"),
      title: "Presentation Guidelines",
      fileName: "Presentation Guidelines.pptx",
      description: "Guidelines for the client presentation.",
      category: "Presentations",
      assignedTo: "u_john",
      assignedBy: "u_admin",
      uploadedOn: nowISO(),
      dueDate: addDays(2),
      status: "Completed",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
  ];
  saveDB(DB_FILES, files);

  const subs = [
    {
      id: uid("s"),
      fileId: files[1].id,
      fileName: "Business Plan_Completed.docx",
      submittedBy: "u_john",
      submittedOn: nowISO(),
      status: "Approved",
      reviewedBy: "Admin",
      remarks: "Great work!",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
    {
      id: uid("s"),
      fileId: files[3].id,
      fileName: "Presentation_Completed.pptx",
      submittedBy: "u_john",
      submittedOn: nowISO(),
      status: "Approved",
      reviewedBy: "Admin",
      remarks: "Excellent!",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
    {
      id: uid("s"),
      fileId: files[0].id,
      fileName: "Project Proposal_Completed.pdf",
      submittedBy: "u_john",
      submittedOn: nowISO(),
      status: "Under Review",
      reviewedBy: "-",
      remarks: "-",
      data: "data:text/plain;base64,RGVtbyBmaWxlIGNvbnRlbnQ=",
    },
  ];
  saveDB(DB_SUBS, subs);

  const notifs = [
    {
      id: uid("n"),
      userId: "u_john",
      message: 'Your submission for "Business Plan.docx" has been approved.',
      type: "success",
      time: nowISO(),
      read: false,
    },
    {
      id: uid("n"),
      userId: "u_john",
      message: 'Your submission for "Project Proposal.pdf" is under review.',
      type: "pending",
      time: nowISO(),
      read: false,
    },
    {
      id: uid("n"),
      userId: "u_john",
      message: 'New file "Market Analysis.xlsx" has been assigned to you.',
      type: "info",
      time: nowISO(),
      read: false,
    },
  ];
  saveDB(DB_NOTIFS, notifs);

  const activity = [
    {
      id: uid("a"),
      user: "John Doe",
      action: "Submitted File",
      fileName: "Project Proposal_Completed.pdf",
      time: nowISO(),
    },
    {
      id: uid("a"),
      user: "Admin",
      action: "Approved Submission",
      fileName: "Business Plan_Completed.docx",
      time: nowISO(),
    },
  ];
  saveDB(DB_ACTIVITY, activity);
}

function logActivity(user, action, fileName, status = "") {
  const activity = loadDB(DB_ACTIVITY);
  activity.unshift({ id: uid("a"), user, action, fileName, time: nowISO() });
  saveDB(DB_ACTIVITY, activity.slice(0, 50));
}

let currentUser = null;

function switchAuthTab(tab) {
  document.getElementById("tabLoginBtn").className =
    tab === "login" ? "active" : "";
  document.getElementById("tabRegisterBtn").className =
    tab === "register" ? "active" : "";
  document.getElementById("loginForm").style.display =
    tab === "login" ? "block" : "none";
  document.getElementById("registerForm").style.display =
    tab === "register" ? "block" : "none";
  document.getElementById("loginError").style.display = "none";
}

function handleLogin() {
  const em = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();
  const err = document.getElementById("loginError");

  if (!em || !pass) {
    err.textContent = "Please fill all fields.";
    err.style.display = "block";
    return;
  }
  const u = loadDB(DB_USERS).find(
    (x) => x.email.toLowerCase() === em.toLowerCase() && x.password === pass,
  );
  if (!u) {
    err.textContent = "Invalid email or password.";
    err.style.display = "block";
    return;
  }
  if (u.status === "Inactive") {
    err.textContent = "Your account is deactivated. Contact Admin.";
    err.style.display = "block";
    return;
  }
  if (u.role !== "user") {
    err.textContent =
      "This portal is for standard users only. Please use the Admin Portal to log in.";
    err.style.display = "block";
    return;
  }

  saveDB(DB_SESSION, u);
  startSession(u);
}

function handleRegister() {
  const name = document.getElementById("regName").value.trim();
  const em = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const pass = document.getElementById("regPassword").value.trim();
  const err = document.getElementById("loginError");

  if (!name || !em || !pass) {
    err.textContent = "Name, Email, and Password are required.";
    err.style.display = "block";
    return;
  }
  const users = loadDB(DB_USERS);
  if (users.some((x) => x.email.toLowerCase() === em.toLowerCase())) {
    err.textContent = "Email already registered.";
    err.style.display = "block";
    return;
  }

  const newUser = {
    id: uid("u"),
    name,
    email: em,
    phone,
    password: pass,
    role: "user",
    status: "Active",
    joined: nowISO(),
    avatarColor: "#2f6fed",
  };
  users.push(newUser);
  saveDB(DB_USERS, users);
  toast("Account created successfully! You can now log in.");
  switchAuthTab("login");
}

function handleLogout() {
  localStorage.removeItem(DB_SESSION);
  currentUser = null;
  document.getElementById("app").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
}

function startSession(u) {
  currentUser = u;
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("sideName").textContent = u.name;
  document.getElementById("sideRole").textContent =
    u.role === "admin" ? "System Administrators" : "Standard User";
  document.getElementById("sideAvatar").innerHTML = avatarInner(u);
  document.getElementById("topAvatar").innerHTML = avatarInner(u);

  buildSidebar();
  navigate(u.role === "admin" ? "dashboard-admin" : "dashboard-user");
}

const adminNav = [
  {
    id: "dashboard-admin",
    label: "Dashboard",
    icon: '<i class="fa-solid fa-chart-line"></i>',
  },
  { id: "users", label: "Users", icon: '<i class="fa-solid fa-users"></i>' },
  {
    id: "upload-files",
    label: "Upload Files",
    icon: '<i class="fa-solid fa-upload"></i>',
  },
  {
    id: "files-folders",
    label: "Files & Folders",
    icon: '<i class="fa-solid fa-folder-open"></i>',
  },
  {
    id: "submissions-admin",
    label: "Submissions",
    icon: '<i class="fa-solid fa-file-lines"></i>',
  },
  {
    id: "tracking",
    label: "Tracking",
    icon: '<i class="fa-solid fa-clock-rotate-left"></i>',
  },
  {
    id: "reports",
    label: "Reports",
    icon: '<i class="fa-solid fa-chart-pie"></i>',
  },
  {
    id: "notifications-admin",
    label: "Notifications",
    icon: '<i class="fa-solid fa-bell"></i>',
  },
  {
    id: "settings",
    label: "Settings",
    icon: '<i class="fa-solid fa-gear"></i>',
  },
];

const userNav = [
  {
    id: "dashboard-user",
    label: "Dashboard",
    icon: '<i class="fa-solid fa-chart-line"></i>',
  },
  {
    id: "my-files",
    label: "My Files",
    icon: '<i class="fa-solid fa-folder"></i>',
  },
  {
    id: "upload-completed",
    label: "Upload Completed File",
    icon: '<i class="fa-solid fa-folder-open"></i>',
  },
  {
    id: "my-submissions",
    label: "My Submissions",
    icon: '<i class="fa-solid fa-file-lines"></i>',
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: '<i class="fa-solid fa-bell"></i>',
  },
  { id: "profile", label: "Profile", icon: '<i class="fa-solid fa-user"></i>' },
  {
    id: "help",
    label: "Help & Support",
    icon: '<i class="fa-solid fa-headset"></i>',
  },
];

let currentView = "dashboard-admin";
let myFilesTab = "all";
let preselectFileId = null;

function buildSidebar() {
  const isAdmin = currentUser.role === "admin";
  document.getElementById("panelLabel").textContent = isAdmin
    ? "ADMIN PANEL"
    : "USER PANEL";
  const nav = isAdmin ? adminNav : userNav;
  const navList = document.getElementById("navList");

  navList.innerHTML = nav
    .map((item) => {
      let badge = "";
      if (item.id === "notifications" || item.id === "notifications-admin") {
        const count = loadDB(DB_NOTIFS).filter(
          (n) => n.userId === currentUser.id && !n.read,
        ).length;
        document.getElementById("bellCount").textContent = count;
        document.getElementById("bellCount").style.display =
          count > 0 ? "block" : "none";
        if (count > 0) badge = `<span class="badge">${count}</span>`;
      }
      return `<div class="nav-item ${currentView === item.id ? "active" : ""}" onclick="navigate('${item.id}')">
      <span>${item.icon}</span> ${item.label} ${badge}
    </div>`;
    })
    .join("");
}

function navigate(viewId) {
  currentView = viewId;
  document.getElementById("sidebar").classList.remove("open");
  buildSidebar();

  const allNavs = [...adminNav, ...userNav];
  const currentItem = allNavs.find((n) => n.id === viewId);
  const title = currentItem ? currentItem.label : "System";
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageBreadcrumb").textContent = `E-File / ${title}`;

  render();
}

function render() {
  const c = document.getElementById("content");
  switch (currentView) {
    case "dashboard-admin":
      c.innerHTML = renderAdminDashboard();
      break;
    case "users":
      c.innerHTML = renderUsers();
      break;
    case "upload-files":
      c.innerHTML = renderUploadFiles();
      break;
    case "files-folders":
      c.innerHTML = renderFilesFolders();
      break;
    case "submissions-admin":
      c.innerHTML = renderSubmissionsAdmin();
      break;
    case "tracking":
      c.innerHTML = renderTracking();
      break;
    case "reports":
      c.innerHTML = renderReports();
      break;
    case "notifications-admin":
      c.innerHTML = renderNotifications(true);
      break;
    case "settings":
      c.innerHTML = renderSettings();
      break;
    case "dashboard-user":
      c.innerHTML = renderUserDashboard();
      break;
    case "my-files":
      c.innerHTML = renderMyFiles();
      break;
    case "upload-completed":
      c.innerHTML = renderUploadCompleted();
      break;
    case "my-submissions":
      c.innerHTML = renderMySubmissions();
      break;
    case "notifications":
      c.innerHTML = renderNotifications(false);
      break;
    case "profile":
      c.innerHTML = renderProfile();
      break;
    case "help":
      c.innerHTML = renderHelp();
      break;
    default:
      c.innerHTML = "<p>View not found.</p>";
  }
}

function toast(msg, type = "success") {
  const wrap = document.getElementById("toastWrap");
  const t = document.createElement("div");
  t.className = "toast " + type;
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function openModal(html) {
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalBg").classList.add("show");
}

function closeModal() {
  document.getElementById("modalBg").classList.remove("show");
}

document.getElementById("modalBg").addEventListener("click", (e) => {
  if (e.target.id === "modalBg") closeModal();
});

const fileIconMap = {
  pdf: ["PDF", "#dc2626"],
  docx: ["W", "#2563eb"],
  doc: ["W", "#2563eb"],
  xlsx: ["X", "#059669"],
  xls: ["X", "#059669"],
  pptx: ["P", "#ea580c"],
  ppt: ["P", "#ea580c"],
};
function fileIcon(fileName) {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  const m = fileIconMap[ext] || ["F", "#6b7280"];
  return `<div class="file-ic" style="background:${m[1]}">${m[0]}</div>`;
}

function statusBadgeClass(status) {
  switch (status) {
    case "Pending":
      return "pending";
    case "In Progress":
      return "progress";
    case "Completed":
    case "Approved":
    case "Active":
      return "completed";
    case "Rejected":
    case "Inactive":
      return "rejected";
    case "Under Review":
      return "review";
    default:
      return "pending";
  }
}

function badge(status) {
  return `<span class="badge ${statusBadgeClass(status)}">${status}</span>`;
}

function userName(id) {
  const u = loadDB(DB_USERS).find((x) => x.id === id);
  return u ? u.name : "Unknown";
}

function initials(name) {
  return (name || "?")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function avatarInner(u) {
  if (u && u.photo) {
    return `<img src="${u.photo}" alt="${u.name}">`;
  }
  return initials(u ? u.name : "?");
}

function emptyState(ic, txt) {
  return `<div class="empty-state"><div class="em-ic">${ic}</div><p>${txt}</p></div>`;
}

function statCard(ic, label, val, bg, color, sub) {
  return `<div class="stat-card">
    <div class="top">
      <div class="ic" style="background:${bg};color:${color}">${ic}</div>
      <div class="label">${label}</div>
    </div>
    <div class="value">${val}</div>
    <div class="sub">${sub}</div>
  </div>`;
}

function sparkline() {
  return `<div style="height:60px;display:flex;align-items:flex-end;gap:4px;padding-top:10px;">
    ${[3, 5, 4, 7, 9, 6, 8, 12, 10].map((h) => `<div style="flex:1;background:var(--accent);height:${h * 7}%;border-radius:2px;" title="Activity level: ${h}"></div>`).join("")}
  </div>`;
}

function donutChart(segs) {
  return `<div style="width:70px;height:70px;border-radius:50%;background:conic-gradient(var(--accent) 0% 40%, #059669 40% 75%, #d97706 75% 100%);flex-shrink:0;"></div>`;
}

function renderAdminDashboard() {
  const users = loadDB(DB_USERS).filter((u) => u.role === "user");
  const files = loadDB(DB_FILES);
  const subs = loadDB(DB_SUBS);
  const activity = loadDB(DB_ACTIVITY).slice(0, 5);

  const pending = subs.filter((s) => s.status === "Under Review").length;
  const approved = subs.filter((s) => s.status === "Approved").length;

  const segs = [
    {
      label: "Documents",
      value: files.filter((f) => f.category === "Documents").length,
      color: "var(--accent)",
    },
    {
      label: "Spreadsheets",
      value: files.filter((f) => f.category === "Spreadsheets").length,
      color: "#059669",
    },
    {
      label: "Presentations",
      value: files.filter((f) => f.category === "Presentations").length,
      color: "#d97706",
    },
  ];

  return `
  <div class="stat-grid">
    ${statCard(`<i class="fa-solid fa-user"></i>`, "Users", users.length, "#dbeafe", "#2563eb", users.length + " registered")}
    ${statCard(`<i class="fa-solid fa-file-lines"></i>`, "Total Files", files.length, "#d1fae5", "#059669", files.length + " total")}
    ${statCard(`<i class="fa-solid fa-hourglass-half"></i>`, "Pending Reviews", pending, "#fef3c7", "#b45309", pending + " awaiting review")}
    ${statCard(`<i class="fa-solid fa-thumbs-up"></i>`, "Approved Files", approved, "#ede9fe", "#6d28d9", approved + " approved")}
  </div>
  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>File Distribution Overview</h3></div>
      ${sparkline()}
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Files by Category</h3></div>
      <div style="display:flex;align-items:center;gap:18px;">
        ${donutChart(segs)}
        <div style="font-size:12.5px;flex:1;">
          ${segs
            .map(
              (
                s,
              ) => `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="width:9px;height:9px;border-radius:2px;background:${s.color};display:inline-block;"></span>
            ${s.label} <b style="margin-left:auto;">${s.value}</b></div>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  </div>
  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>Recent Activity</h3><span class="link-btn" style="cursor:pointer;" onclick="navigate('tracking')">View all</span></div>
      ${
        activity.length === 0
          ? emptyState("&#128203;", "No recent activity yet.")
          : `
      <table><thead><tr><th>User</th><th>Action</th><th>Target</th><th>Time</th></tr></thead><tbody>
        ${activity.map((a) => `<tr><td><b>${a.user}</b></td><td>${a.action}</td><td>${a.fileName}</td><td>${timeAgo(a.time)}</td></tr>`).join("")}
      </tbody></table>`
      }
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Quick Actions</h3></div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn primary" onclick="navigate('upload-files')">&#9729; Upload New File</button>
        <button class="btn ghost" onclick="navigate('users')">&#128101; View Accounts List</button>
        <button class="btn ghost" onclick="navigate('submissions-admin')">&#128196; Check Pending Log Submissions</button>
      </div>
    </div>
  </div>`;
}

function renderUsers() {
  const users = loadDB(DB_USERS);
  return `
  <div class="panel">
    <div class="panel-head">
      <h3>System Users</h3>
      <button class="btn primary" onclick="showAddUserModal()">+ Create User Account</button>
    </div>
    <table>
      <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${users
          .map(
            (u) => `<tr>
          <td><div class="file-cell"><div class="avatar" style="width:28px;height:28px;font-size:11px;">${avatarInner(u)}</div><b>${u.name}</b></div></td>
          <td>${u.email}</td>
          <td>${u.phone || "-"}</td>
          <td><span style="text-transform:capitalize;">${u.role}</span></td>
          <td>${fmtDate(u.joined)}</td>
          <td>${badge(u.status)}</td>
          <td>
            <button class="icon-btn blue" title="Toggle Status" onclick="toggleUserStatus('${u.id}')">&#8646;</button>
            ${u.id !== "u_admin" ? `<button class="icon-btn red" title="Delete" onclick="deleteUser('${u.id}')">&#128465;</button>` : ""}
          </td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  </div>`;
}

function showAddUserModal() {
  openModal(`
    <button class="modal-close" onclick="closeModal()">&times;</button>
    <h3>Create New User Account</h3>
    <div class="field"><label>Full Name</label><input id="muName" placeholder="Jane Doe"></div>
    <div class="field"><label>Email</label><input id="muEmail" type="email" placeholder="jane@email.com"></div>
    <div class="field"><label>Phone Number</label><input id="muPhone" placeholder="+1 234 567 890"></div>
    <div class="field"><label>Role</label><select id="muRole"><option value="user">Standard User</option><option value="admin">Administrator</option></select></div>
    <div class="field"><label>Initial Account Password</label><input id="muPass" type="password" placeholder="Create password"></div>
    <button class="btn primary" style="width:100%;margin-top:10px;" onclick="submitAddUser()">Create Account</button>
  `);
}

function submitAddUser() {
  const name = document.getElementById("muName").value.trim();
  const em = document.getElementById("muEmail").value.trim();
  const phone = document.getElementById("muPhone").value.trim();
  const role = document.getElementById("muRole").value;
  const pass = document.getElementById("muPass").value.trim();

  if (!name || !em || !pass) {
    toast("Please fill in Name, Email and Password fields.", "error");
    return;
  }
  const users = loadDB(DB_USERS);
  if (users.some((x) => x.email.toLowerCase() === em.toLowerCase())) {
    toast("Email address already exists.", "error");
    return;
  }

  users.push({
    id: uid("u"),
    name,
    email: em,
    phone,
    password: pass,
    role,
    status: "Active",
    joined: nowISO(),
  });
  saveDB(DB_USERS, users);
  closeModal();
  toast("User account added successfully.");
  render();
}

function toggleUserStatus(id) {
  const users = loadDB(DB_USERS);
  const u = users.find((x) => x.id === id);
  if (u.id === "u_admin") {
    toast("Cannot change root admin status.", "error");
    return;
  }
  u.status = u.status === "Active" ? "Inactive" : "Active";
  saveDB(DB_USERS, users);
  toast(`${u.name} status updated to ${u.status}.`);
  render();
}

function deleteUser(id) {
  if (id === "u_admin") {
    toast("Cannot delete Admin!", "error");
    return;
  }
  if (!confirm("Delete this user account? This cannot be undone.")) return;
  saveDB(
    DB_USERS,
    loadDB(DB_USERS).filter((x) => x.id !== id),
  );
  toast("User deleted.");
  render();
}

let pendingUploadData = null;
function renderUploadFiles() {
  const users = loadDB(DB_USERS).filter((u) => u.role === "user");
  return `
  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>File Information</h3></div>
      <div class="field"><label>File Title</label><input id="ufTitle" placeholder="Enter file title"></div>
      <div class="field"><label>Description</label><input id="ufDesc" placeholder="Enter file description"></div>
      <div class="form-grid">
        <div class="field">
          <label>
            Assign To User(s)
            <span class="selected-count-pill" id="ufSelectedCount">0 selected</span>
          </label>
          <div style="display:flex;justify-content:flex-end;gap:12px;margin-bottom:6px;">
            <span class="link-btn" style="cursor:pointer;" onclick="toggleSelectAllUsers(true)">Select all</span>
            <span class="link-btn" style="cursor:pointer;" onclick="toggleSelectAllUsers(false)">Clear</span>
          </div>
          <div class="user-check-list" id="ufUserList">
            ${
              users.length === 0
                ? `<div style="padding:10px;color:var(--muted);font-size:12.5px;">No standard users available.</div>`
                : users
                    .map((u) => {
                      const initials = u.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("");
                      return `<label class="user-check-item">
                  <input type="checkbox" class="ufUserCheckbox" value="${u.id}" onchange="updateSelectedUserCount()">
                  <span class="uci-avatar">${initials}</span>
                  <span>${u.name}</span>
                </label>`;
                    })
                    .join("")
            }
          </div>
        </div>
        <div class="field"><label>Category</label>
          <select id="ufCat"><option>Documents</option><option>Spreadsheets</option><option>Presentations</option><option>Images</option><option>Others</option></select>
        </div>
      </div>
      <div class="field"><label>Due Date</label><input id="ufDue" type="date"></div>
      <label style="font-size:12.5px;font-weight:600;display:block;margin-bottom:6px;">Upload File Attachment</label>
      <div class="dropzone" onclick="document.getElementById('ufFile').click()">
        <div class="dz-ic">&#9729;</div>
        <div>Drag & drop your file here or click to browse</div>
        <button class="btn ghost" type="button" style="margin-top:8px;" onclick="event.stopPropagation();document.getElementById('ufFile').click()">Browse File</button>
        <small id="fileSelectedName" style="color:var(--accent);font-weight:600;margin-top:6px;"></small>
      </div>
      <input type="file" id="ufFile" style="display:none;" onchange="catchUploadFile(this)">
      <button class="btn primary" style="width:100%;margin-top:18px;" onclick="submitUploadedFile()">Assign & Dispatch File</button>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Recent File Assignments</h3></div>
      <div style="font-size:12.5px;color:var(--muted);line-height:1.7;">
        Assign assessment tasks to one or multiple system users at once. Each selected user receives their own copy of the file and an instant notification ping inside their standard hub workspace dashboard logs.
      </div>
    </div>
  </div>`;
}

function updateSelectedUserCount() {
  const count = document.querySelectorAll(".ufUserCheckbox:checked").length;
  const pill = document.getElementById("ufSelectedCount");
  if (pill) pill.textContent = `${count} selected`;
}

function toggleSelectAllUsers(select) {
  document
    .querySelectorAll(".ufUserCheckbox")
    .forEach((cb) => (cb.checked = select));
  updateSelectedUserCount();
}

function catchUploadFile(input) {
  const file = input.files[0];
  if (!file) return;
  document.getElementById("fileSelectedName").textContent =
    `Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;

  const reader = new FileReader();
  reader.onload = function (e) {
    pendingUploadData = { name: file.name, base64: e.target.result };
  };
  reader.readAsDataURL(file);
}

function submitUploadedFile() {
  const title = document.getElementById("ufTitle").value.trim();
  const desc = document.getElementById("ufDesc").value.trim();
  const assignedUsers = Array.from(
    document.querySelectorAll(".ufUserCheckbox:checked"),
  ).map((cb) => cb.value);
  const category = document.getElementById("ufCat").value;
  const due = document.getElementById("ufDue").value;

  if (!title || !due || !pendingUploadData || assignedUsers.length === 0) {
    toast(
      "Title, Due Date, at least one assigned user, and File attachment are required.",
      "error",
    );
    return;
  }

  const files = loadDB(DB_FILES);
  const notifs = loadDB(DB_NOTIFS);

  assignedUsers.forEach((assignedTo) => {
    files.push({
      id: uid("f"),
      title,
      fileName: pendingUploadData.name,
      description: desc,
      category,
      assignedTo,
      assignedBy: currentUser.id,
      uploadedOn: nowISO(),
      dueDate: new Date(due).toISOString(),
      status: "Pending",
      data: pendingUploadData.base64,
    });

    notifs.unshift({
      id: uid("n"),
      userId: assignedTo,
      message: `New file assignment: "${title}" has been issued to you.`,
      type: "info",
      time: nowISO(),
      read: false,
    });
  });

  saveDB(DB_FILES, files);
  saveDB(DB_NOTIFS, notifs);

  logActivity(
    "Admin",
    "Assigned File",
    pendingUploadData.name +
      (assignedUsers.length > 1 ? ` (${assignedUsers.length} users)` : ""),
  );
  pendingUploadData = null;
  toast(
    `File successfully dispatched to ${assignedUsers.length} user${assignedUsers.length > 1 ? "s" : ""}.`,
  );
  navigate("files-folders");
}

function renderFilesFolders() {
  const files = loadDB(DB_FILES);
  return `
  <div class="panel">
    <div class="panel-head">
      <h3>All Dispatched Files</h3>
      <button class="btn primary" onclick="navigate('upload-files')">+ Dispatch New File</button>
    </div>
    ${
      files.length === 0
        ? emptyState("&#128193;", "No files tracked in system logs yet.")
        : `
    <table><thead><tr><th>Name / Title</th><th>Category</th><th>Assigned To</th><th>Uploaded On</th><th>Due Date</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      ${files
        .slice()
        .reverse()
        .map(
          (f) => `<tr>
        <td><div class="file-cell">${fileIcon(f.fileName)}<div><div style="font-weight:600;">${f.title}</div><div style="font-size:11.5px;color:var(--muted);">${f.fileName}</div></div></div></td>
        <td>${f.category}</td>
        <td>${userName(f.assignedTo)}</td>
        <td>${fmtDate(f.uploadedOn)}</td>
        <td>${fmtDate(f.dueDate)}</td>
        <td>${badge(f.status)}</td>
        <td>
          ${f.data ? `<button class="icon-btn blue" title="Download Source" onclick="downloadFile('${f.fileName}','${f.id}','files')">&#8681;</button>` : ""}
          <button class="icon-btn red" title="Delete Log Entry" onclick="deleteFile('${f.id}')">&#128465;</button>
        </td>
      </tr>`,
        )
        .join("")}
    </tbody></table>`
    }
  </div>`;
}

function deleteFile(id) {
  if (!confirm("Delete this file record entry entirely?")) return;
  saveDB(
    DB_FILES,
    loadDB(DB_FILES).filter((f) => f.id !== id),
  );
  toast("File record removed.");
  render();
}

function downloadFile(fileName, id, source) {
  let rec;
  if (source === "files") rec = loadDB(DB_FILES).find((f) => f.id === id);
  else rec = loadDB(DB_SUBS).find((s) => s.id === id);

  if (!rec || !rec.data) {
    toast("File contents are missing or unavailable.", "error");
    return;
  }
  const a = document.createElement("a");
  a.href = rec.data;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();

  logActivity(
    currentUser ? currentUser.name : "Unknown",
    "Downloaded File",
    fileName,
  );
}

function renderSubmissionsAdmin() {
  const subs = loadDB(DB_SUBS).slice().reverse();
  return `
  <div class="panel">
    <div class="panel-head"><h3>User Inbound Submissions</h3></div>
    ${
      subs.length === 0
        ? emptyState("&#128196;", "No inbound tracking submissions cataloged.")
        : `
    <table><thead><tr><th>Submitted File</th><th>Submitting User</th><th>Timestamp</th><th>Review Status</th><th>Evaluated By</th><th>Remarks</th><th>Actions</th></tr></thead>
    <tbody>
      ${subs
        .map(
          (s) => `<tr>
        <td><div class="file-cell">${fileIcon(s.fileName)}<span>${s.fileName}</span></div></td>
        <td><b>${userName(s.submittedBy)}</b></td>
        <td>${fmtDateTime(s.submittedOn)}</td>
        <td>${badge(s.status)}</td>
        <td>${s.reviewedBy || "-"}</td>
        <td><small style="color:var(--muted);">${s.remarks || "-"}</small></td>
        <td>
          ${s.data ? `<button class="icon-btn blue" title="Download Version" onclick="downloadFile('${s.fileName}','${s.id}','subs')">&#8681;</button>` : ""}
          ${
            s.status === "Under Review"
              ? `
            <button class="icon-btn green" title="Approve Work" onclick="reviewSubmission('${s.id}','Approved')">&#9989;</button>
            <button class="icon-btn red" title="Reject / Request Edits" onclick="reviewSubmission('${s.id}','Rejected')">&#9940;</button>
          `
              : ""
          }
        </td>
      </tr>`,
        )
        .join("")}
    </tbody></table>`
    }
  </div>`;
}

function reviewSubmission(subId, nextStatus) {
  const remarks = prompt(
    `Enter evaluation remarks or feedback for this submission (${nextStatus}):`,
  );
  if (remarks === null) return;

  const subs = loadDB(DB_SUBS);
  const s = subs.find((x) => x.id === subId);
  s.status = nextStatus;
  s.reviewedBy = "Admin";
  s.remarks =
    remarks ||
    (nextStatus === "Approved" ? "Looks good!" : "Requires adjustments.");
  saveDB(DB_SUBS, subs);

  const files = loadDB(DB_FILES);
  const f = files.find((x) => x.id === s.fileId);
  if (f) {
    f.status = nextStatus === "Approved" ? "Completed" : "In Progress";
    saveDB(DB_FILES, files);
  }

  const notifs = loadDB(DB_NOTIFS);
  notifs.unshift({
    id: uid("n"),
    userId: s.submittedBy,
    message: `Your submission variant for file "${s.fileName}" was updated to [${nextStatus}]. Feedback: "${s.remarks}"`,
    type: nextStatus === "Approved" ? "success" : "error",
    time: nowISO(),
    read: false,
  });
  saveDB(DB_NOTIFS, notifs);

  logActivity("Admin", `${nextStatus} Submission`, s.fileName);
  toast(`Submission record updated to ${nextStatus}.`);
  render();
}

function renderTracking() {
  const activity = loadDB(DB_ACTIVITY);
  const today = new Date().toDateString();
  const actionsToday = activity.filter(
    (a) => new Date(a.time).toDateString() === today,
  ).length;
  const downloads = activity.filter((a) =>
    a.action.toLowerCase().includes("download"),
  ).length;

  const counts = {};
  activity.forEach((a) => {
    counts[a.user] = (counts[a.user] || 0) + 1;
  });
  const topUser = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];

  const actionTypes = [...new Set(activity.map((a) => a.action))].sort();

  return `
  <div class="stat-grid">
    ${statCard(`<i class="fa-solid fa-list-check"></i>`, "Logged Actions", activity.length, "#dbeafe", "#2563eb", "All time")}
    ${statCard(`<i class="fa-solid fa-calendar-day"></i>`, "Actions Today", actionsToday, "#d1fae5", "#059669", "Since midnight")}
    ${statCard(`<i class="fa-solid fa-download"></i>`, "File Downloads", downloads, "#fef3c7", "#b45309", "Tracked downloads")}
    ${statCard(`<i class="fa-solid fa-user-clock"></i>`, "Most Active", topUser ? counts[topUser] : 0, "#ede9fe", "#6d28d9", topUser ? topUser : "No activity yet")}
  </div>
  <div class="panel">
    <div class="panel-head">
      <h3>User Activity &amp; File Audit Log</h3>
      <select id="trackFilter" onchange="filterTracking(this.value)" style="max-width:220px;">
        <option value="">All Actions</option>
        ${actionTypes.map((a) => `<option value="${a}">${a}</option>`).join("")}
      </select>
    </div>
    ${
      activity.length === 0
        ? emptyState(
            `<i class="fa-solid fa-clock-rotate-left"></i>`,
            "No user actions have been logged yet.",
          )
        : `
    <table id="trackingTable"><thead><tr><th>User</th><th>Action</th><th>File / Target</th><th>Timestamp</th></tr></thead>
    <tbody>
      ${activity
        .map(
          (a) => `<tr data-action="${a.action}">
        <td><b>${a.user}</b></td>
        <td>${a.action}</td>
        <td>${a.fileName || "-"}</td>
        <td>${fmtDateTime(a.time)}</td>
      </tr>`,
        )
        .join("")}
    </tbody></table>`
    }
  </div>`;
}

function filterTracking(action) {
  document.querySelectorAll("#trackingTable tbody tr").forEach((row) => {
    row.style.display = !action || row.dataset.action === action ? "" : "none";
  });
}

function renderReports() {
  const files = loadDB(DB_FILES);
  const completed = files.filter((f) => f.status === "Completed").length;
  const total = files.length;
  const rate = total ? Math.round((completed / total) * 100) : 0;

  return `
  <div class="panel">
    <div class="panel-head"><h3>Analytical Performance & Audit Reports</h3></div>
    <div class="form-grid" style="margin-bottom:20px;">
      <div style="background:#f8f9fc;padding:20px;border-radius:10px;text-align:center;">
        <h2 style="font-size:32px;color:var(--accent);">${rate}%</h2>
        <p style="color:var(--muted);font-size:13px;margin-top:4px;">Task Fulfillment Velocity Rate</p>
      </div>
      <div style="background:#f8f9fc;padding:20px;border-radius:10px;text-align:center;">
        <h2 style="font-size:32px;color:#059669;">${completed} / ${total}</h2>
        <p style="color:var(--muted);font-size:13px;margin-top:4px;">Completed Deliverables Ratio</p>
      </div>
    </div>
    <p style="color:var(--muted);font-size:13px;line-height:1.6;">
      Database diagnostics display active data structures operating normally. Metrics assess system workload delivery across active channels inside standard operational thresholds.
    </p>
  </div>`;
}

function renderNotifications(isAdmin) {
  const allNotifs = loadDB(DB_NOTIFS);
  const usersNotifs = allNotifs.filter((n) => n.userId === currentUser.id);

  const updated = allNotifs.map((n) => {
    if (n.userId === currentUser.id) n.read = true;
    return n;
  });
  saveDB(DB_NOTIFS, updated);
  setTimeout(() => {
    buildSidebar();
  }, 200);

  return `
  <div class="panel" style="max-width:680px;">
    <div class="panel-head"><h3>System Workspace Notifications</h3></div>
    ${
      usersNotifs.length === 0
        ? emptyState("&#128276;", "Inbox empty. No notifications active.")
        : `
      <div style="display:flex;flex-direction:column;">
        ${usersNotifs
          .map(
            (n) => `
          <div class="notif-item">
            <div class="notif-ic" style="background:#f1f3f9;">&#128392;</div>
            <div class="txt">
              <p>${n.message}</p>
              <div class="time">${timeAgo(n.time)}</div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `
    }
  </div>`;
}

function renderUserDashboard() {
  const files = loadDB(DB_FILES).filter((f) => f.assignedTo === currentUser.id);
  const subs = loadDB(DB_SUBS).filter((s) => s.submittedBy === currentUser.id);

  const completed = files.filter((f) => f.status === "Completed").length;
  const inProgress = files.filter((f) => f.status === "In Progress").length;
  const pending = files.filter((f) => f.status === "Pending").length;

  return `
 <div class="stat-grid">
  ${statCard('<i class="fa-solid fa-clipboard-list"></i>', "Assigned Tasks", files.length, "#dbeafe", "#2563eb", "Total assignments")}
  ${statCard(`<i class="fa-solid fa-hourglass-half"></i>`, "Awaiting Commences", pending, "#fef3c7", "#b45309", "Pending status")}
  ${statCard(`<i class="fa-solid fa-bolt"></i>`, "Active Actions", inProgress, "#ede9fe", "#6d28d9", "In progress state")}
  ${statCard(`<i class="fa-solid fa-thumbs-up"></i>`, "Completed Deliveries", completed, "#d1fae5", "#059669", "Approved variants")}
</div>
  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>User Hub Portal</h3></div>
      <p style="color:var(--muted);line-height:1.6;font-size:13.5px;">
        Welcome back, <b>${currentUser.name}</b>. Track target tasks assigned to you by administrative supervisors via the system logs. Dispatched item metrics can be managed inside the dashboard navigations.
      </p>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Fulfillment Metrics</h3></div>
      ${sparkline()}
    </div>
  </div>`;
}

function renderMyFiles() {
  let files = loadDB(DB_FILES).filter((f) => f.assignedTo === currentUser.id);

  if (myFilesTab === "pending")
    files = files.filter((f) => f.status === "Pending");
  if (myFilesTab === "progress")
    files = files.filter((f) => f.status === "In Progress");
  if (myFilesTab === "completed")
    files = files.filter((f) => f.status === "Completed");

  return `
  <div class="panel">
    <div class="tabs">
      <div class="tab ${myFilesTab === "all" ? "active" : ""}" onclick="setMyFilesTab('all')">All Files</div>
      <div class="tab ${myFilesTab === "pending" ? "active" : ""}" onclick="setMyFilesTab('pending')">Pending</div>
      <div class="tab ${myFilesTab === "progress" ? "active" : ""}" onclick="setMyFilesTab('progress')">In Progress</div>
      <div class="tab ${myFilesTab === "completed" ? "active" : ""}" onclick="setMyFilesTab('completed')">Completed</div>
    </div>
    ${
      files.length === 0
        ? emptyState(
            "&#128193;",
            "No file metrics detected in category filter.",
          )
        : `
    <table><thead><tr><th>Target File Name</th><th>Assigned Timestamp</th><th>Due Timeline</th><th>Work Status</th><th>Actions</th></tr></thead>
    <tbody>${files
      .map(
        (f) => `<tr>
      <td><div class="file-cell">${fileIcon(f.fileName)}<div><div style="font-weight:600;">${f.title}</div><div style="font-size:11.5px;color:var(--muted);">${f.description || ""}</div></div></div></td>
      <td>${fmtDate(f.uploadedOn)}</td>
      <td>${fmtDate(f.dueDate)}</td>
      <td>${badge(f.status)}</td>
      <td>
        ${f.data ? `<button class="icon-btn blue" title="Download Source" onclick="downloadFile('${f.fileName}','${f.id}','files')">&#8681;</button>` : `<button class="icon-btn" disabled style="opacity:.4;">&#8681;</button>`}
        <button class="icon-btn green" title="Upload Return Version" onclick="goUploadFor('${f.id}')">&#9729;</button>
      </td>
    </tr>`,
      )
      .join("")}</tbody></table>`
    }
  </div>`;
}

function setMyFilesTab(t) {
  myFilesTab = t;
  render();
}

function goUploadFor(fileId) {
  preselectFileId = fileId;
  navigate("upload-completed");
}

let pendingCompletedData = null;
function renderUploadCompleted() {
  const files = loadDB(DB_FILES).filter(
    (f) => f.assignedTo === currentUser.id && f.status !== "Completed",
  );
  return `
  <div class="panel" style="max-width:580px;">
    <div class="panel-head"><h3>Upload Fulfilling Deliverables</h3></div>
    <div class="field"><label>Select Reference Base File Task</label>
      <select id="ucFileId">${files.map((f) => `<option value="${f.id}" ${preselectFileId === f.id ? "selected" : ""}>${f.title} (${f.fileName})</option>`).join("")}</select>
    </div>
    <label style="font-size:12.5px;font-weight:600;display:block;margin-bottom:6px;">Upload Variant Attachment</label>
    <div class="dropzone" onclick="document.getElementById('ucFile').click()">
      <div class="dz-ic">&#9729;</div>
      <div>Click here to explore and select completing output version</div>
      <small id="completedSelectedName" style="color:var(--accent);font-weight:600;margin-top:6px;"></small>
    </div>
    <input type="file" id="ucFile" style="display:none;" onchange="catchCompletedFile(this)">
    <button class="btn primary" style="width:100%;margin-top:16px;" onclick="submitCompletedReturnFile()">Submit Document for Review</button>
  </div>`;
}

function catchCompletedFile(input) {
  const file = input.files[0];
  if (!file) return;
  document.getElementById("completedSelectedName").textContent =
    `Fulfillment Target: ${file.name}`;

  const reader = new FileReader();
  reader.onload = function (e) {
    pendingCompletedData = { name: file.name, base64: e.target.result };
  };
  reader.readAsDataURL(file);
}

function submitCompletedReturnFile() {
  const fileId = document.getElementById("ucFileId").value;
  if (!fileId || !pendingCompletedData) {
    toast(
      "Please select an active target file framework and attach a delivery file.",
      "error",
    );
    return;
  }

  const files = loadDB(DB_FILES);
  const targetF = files.find((x) => x.id === fileId);

  const subs = loadDB(DB_SUBS);
  const newSub = {
    id: uid("s"),
    fileId,
    fileName: pendingCompletedData.name,
    submittedBy: currentUser.id,
    submittedOn: nowISO(),
    status: "Under Review",
    reviewedBy: "-",
    remarks: "-",
    data: pendingCompletedData.base64,
  };
  subs.push(newSub);
  saveDB(DB_SUBS, subs);

  if (targetF) {
    targetF.status = "In Progress";
    saveDB(DB_FILES, files);
  }

  const notifs = loadDB(DB_NOTIFS);
  notifs.unshift({
    id: uid("n"),
    userId: "u_admin",
    message: `User ${currentUser.name} dispatched an inbound work submission for "${targetF ? targetF.title : "Task"}".`,
    type: "info",
    time: nowISO(),
    read: false,
  });
  saveDB(DB_NOTIFS, notifs);

  logActivity(
    currentUser.name,
    "Submitted Document",
    pendingCompletedData.name,
  );
  pendingCompletedData = null;
  preselectFileId = null;
  toast("Document submitted to Admin reviews successfully.");
  navigate("my-submissions");
}

function renderMySubmissions() {
  const subs = loadDB(DB_SUBS)
    .filter((s) => s.submittedBy === currentUser.id)
    .slice()
    .reverse();
  return `
  <div class="panel">
    <div class="panel-head"><h3>My Dispatched Submissions</h3></div>
    ${
      subs.length === 0
        ? emptyState("&#128196;", "No inbound entries recorded.")
        : `
    <table><thead><tr><th>File Name</th><th>Dispatched On</th><th>Fulfillment Status</th><th>Evaluated By</th><th>Remarks / Feedback</th><th>Actions</th></tr></thead>
    <tbody>${subs
      .map(
        (s) => `<tr>
      <td><div class="file-cell">${fileIcon(s.fileName)}<span>${s.fileName}</span></div></td>
      <td>${fmtDateTime(s.submittedOn)}</td>
      <td>${badge(s.status)}</td>
      <td>${s.reviewedBy}</td>
      <td><small style="color:var(--muted);">${s.remarks}</small></td>
      <td>
        ${s.data ? `<button class="icon-btn blue" title="Download Dispatched Copy" onclick="downloadFile('${s.fileName}','${s.id}','subs')">&#8681;</button>` : ""}
      </td>
    </tr>`,
      )
      .join("")}</tbody></table>`
    }
  </div>`;
}

let pendingProfilePhoto;

function renderProfile() {
  const u = currentUser;
  pendingProfilePhoto = undefined;
  return `
  <div class="panel" style="max-width:560px; margin: auto">
    <div class="panel-head"><h3>Account Settings Profile</h3></div>
    <div style="text-align:center;">
      <div class="avatar-lg" id="profileAvatarPreview">${avatarInner(u)}</div>
      <div class="avatar-photo-actions">
        <button class="btn ghost" type="button" onclick="document.getElementById('pPhotoInput').click()">&#128247; Upload Photo</button>
        <button class="btn ghost" type="button" id="removePhotoBtn" style="${u.photo ? "" : "display:none;"}" onclick="removeProfilePhoto()">Remove Photo</button>
      </div>
      <input type="file" id="pPhotoInput" accept="image/*" style="display:none;" onchange="catchProfilePhoto(this)">
    </div>
    <div class="field"><label>Full Name</label><input id="pName" value="${u.name}"></div>
    <div class="field"><label>Email Endpoint</label><input id="pEmail" value="${u.email}" disabled style="background:#f3f5fa;cursor:not-allowed;"></div>
    <div class="field"><label>Phone Configuration</label><input id="pPhone" value="${u.phone || ""}"></div>
    <div class="field"><label>Update Security Password (leave empty to keep current)</label><input id="pPass" type="password" placeholder="••••••••"></div>
    <button class="btn primary" onclick="saveUserProfile()">Save Changes</button>
  </div>`;
}

function catchProfilePhoto(input) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast("Please choose an image file.", "error");
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    toast("Please choose an image under 3MB.", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    pendingProfilePhoto = e.target.result;
    document.getElementById("profileAvatarPreview").innerHTML =
      `<img src="${pendingProfilePhoto}" alt="Preview">`;
    document.getElementById("removePhotoBtn").style.display = "";
  };
  reader.readAsDataURL(file);
}

function removeProfilePhoto() {
  pendingProfilePhoto = "";
  document.getElementById("profileAvatarPreview").innerHTML = initials(
    currentUser.name,
  );
  document.getElementById("removePhotoBtn").style.display = "none";
}

function saveUserProfile() {
  const users = loadDB(DB_USERS);
  const u = users.find((x) => x.id === currentUser.id);
  u.name = document.getElementById("pName").value.trim() || u.name;
  u.phone = document.getElementById("pPhone").value.trim();

  const pass = document.getElementById("pPass").value.trim();
  if (pass) u.password = pass;

  if (typeof pendingProfilePhoto !== "undefined") {
    u.photo = pendingProfilePhoto || null;
  }

  saveDB(DB_USERS, users);
  currentUser = u;
  pendingProfilePhoto = undefined;
  toast("Workspace profile values updated successfully.");
  startSession(u);
}

function renderSettings() {
  return (
    renderProfile() +
    `
  <div class="panel" style="max-width:560px;">
    <div class="panel-head"><h3>System Information</h3></div>
    <p style="color:var(--muted);font-size:13px;line-height:1.6;">E-File Management System v1.0. Update your name, phone, password, and profile photo above. User accounts and roles are managed from the Users section.</p>
  </div>`
  );
}

function renderHelp() {
  const faqs = [
    [
      "What file limits exist on system transmissions?",
      "System engines support document formatting up to 20MB safely across local pipelines.",
    ],
    [
      "How are submission metrics reviewed?",
      "Administrators evaluate arrivals under the Submissions log, triggering real-time pings upon appraisal changes.",
    ],
  ];
  return `
  <div class="grid-2">
    <div class="panel">
      <div class="panel-head"><h3>Frequently Asked Questions</h3></div>
      ${faqs
        .map(
          (
            f,
          ) => `<details style="padding:12px 4px;border-bottom:1px solid var(--border);">
        <summary style="cursor:pointer;font-weight:600;font-size:13.5px;">${f[0]}</summary>
        <p style="margin-top:8px;color:var(--muted);font-size:13px;">${f[1]}</p>
      </details>`,
        )
        .join("")}
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Contact Support Desk</h3></div>
      <p style="color:var(--muted);font-size:13px;margin-bottom:14px;">Can't locate structural answers? Open a workspace ticket instantly below.</p>
      <div class="field"><label>Support Ticket Message Description</label><input id="helpMsg" placeholder="Describe the behavior context..."></div>
      <button class="btn primary" onclick="sendHelpTicket()">Dispatch Support Ticket</button>
    </div>
  </div>`;
}

function sendHelpTicket() {
  const msg = document.getElementById("helpMsg").value.trim();
  if (!msg) {
    toast("Please input descriptive criteria before sending.", "error");
    return;
  }
  document.getElementById("helpMsg").value = "";
  toast("Support ticket channeled to infrastructure teams successfully.");
}

document.addEventListener("input", (e) => {
  if (e.target.id === "globalSearch") {
    const val = e.target.value.toLowerCase().trim();
    if (!val) {
      render();
      return;
    }

    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((r) => {
      const txt = r.textContent.toLowerCase();
      r.style.display = txt.includes(val) ? "" : "none";
    });
  }
});

seedData();
const sessionCheck = loadDB(DB_SESSION);
if (sessionCheck && sessionCheck.id) {
  const userMatch = loadDB(DB_USERS).find((x) => x.id === sessionCheck.id);
  if (userMatch && userMatch.status === "Active" && userMatch.role === "user") {
    startSession(userMatch);
  }
}
