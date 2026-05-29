// Simulated Employer Database
const employerData = {
    companyName: "บมจ. เจ มาร์ท จำกัด (มหาชน)",
    companyCode: "JMART-00281-2569",
    adminName: "คุณวรรณา พาสุข",
    adminEmail: "wanna.p@jaymart.co.th",
    adminPhone: "089-123-4567",
    totalEmployees: 142,
    deductedEmployees: 121,
    pendingEmployees: 21,
    totalDeductionAmount: "485,320.00",
    deductedAmount: "412,522.00",
    pendingAmount: "72,798.00",
    dueDate: "15 มิ.ย. 2569",
    employees: [
        { id: 1, name: "นายเกรียงไกร ใจซื่อ", citizenId: "1-1002-XXXXX-12-1", amount: "3,500.00", status: "หักเงินแล้ว", statusClass: "text-success", iconClass: "fa-circle-check" },
        { id: 2, name: "นางสาวศิริพร อุดมพร", citizenId: "3-1014-XXXXX-45-2", amount: "2,820.00", status: "หักเงินแล้ว", statusClass: "text-success", iconClass: "fa-circle-check" },
        { id: 3, name: "นายประวิทย์ รักชาติ", citizenId: "1-5099-XXXXX-88-3", amount: "4,150.00", status: "หักเงินแล้ว", statusClass: "text-success", iconClass: "fa-circle-check" },
        { id: 4, name: "นางสาวอารียา สุขสันต์", citizenId: "3-4012-XXXXX-99-1", amount: "3,200.00", status: "รอดำเนินการ", statusClass: "text-warning", iconClass: "fa-clock" },
        { id: 5, name: "นายสมชาย ชาญชัย", citizenId: "1-1204-XXXXX-33-4", amount: "1,500.00", status: "รอดำเนินการ", statusClass: "text-warning", iconClass: "fa-clock" }
    ],
    reasons: [
        "พนักงานลาออก / พ้นสภาพพนักงาน",
        "เงินเดือนสุทธิไม่ถึงเกณฑ์หักนำส่ง",
        "พนักงานอยู่ระหว่างลาพักร้อนยาว / ลาโดยไม่รับเงินเดือน",
        "มีการส่งยอดซ้ำหรือยอดเงินผิดพลาดจากระบบต้นสังกัด"
    ]
};

// PIN CODE INPUT STATE
let currentPin = "";

// ACTIVE SCREEN/DRAWER STATES
let activeRole = "Admin"; // "Admin" or "HR staff"

// LIVE CLOCK FOR STATUS BAR
function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// SIMULATED ALERT POPUP (Floating Toast)
function alertSim(title, message) {
    // Remove existing alert boxes if any
    const oldAlerts = document.querySelectorAll('.sim-alert-box');
    oldAlerts.forEach(a => a.remove());

    const alertBox = document.createElement('div');
    alertBox.className = 'sim-alert-box';
    alertBox.style.position = 'absolute';
    alertBox.style.bottom = '90px';
    alertBox.style.left = '20px';
    alertBox.style.right = '20px';
    alertBox.style.backgroundColor = '#1e293b';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '12px 16px';
    alertBox.style.borderRadius = '12px';
    alertBox.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)';
    alertBox.style.fontSize = '12.5px';
    alertBox.style.zIndex = '999';
    alertBox.style.display = 'flex';
    alertBox.style.flexDirection = 'column';
    alertBox.style.gap = '4px';
    alertBox.style.animation = 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    
    alertBox.innerHTML = `
        <strong style="color: #38bdf8; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-info"></i> ${title}
        </strong>
        <span>${message}</span>
    `;
    
    const viewport = document.querySelector('.app-viewport');
    if (viewport) {
        viewport.appendChild(alertBox);
        
        setTimeout(() => {
            alertBox.style.animation = 'fadeOutDown 0.3s ease';
            setTimeout(() => alertBox.remove(), 300);
        }, 2800);
    }
}

// HEADER ACCOUNT SELECTOR TOGGLE
function toggleAccountDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('account-dropdown');
    const container = document.querySelector('.account-selector-container');
    if (dropdown && container) {
        dropdown.classList.toggle('open');
        container.classList.toggle('open');
    }
}

// SWITCH ACTIVE ACCOUNT/ROLE
function switchActiveAccount(roleId) {
    const dropdown = document.getElementById('account-dropdown');
    const container = document.querySelector('.account-selector-container');
    const label = document.querySelector('.acc-sel-lbl');
    
    if (dropdown && container) {
        dropdown.classList.remove('open');
        container.classList.remove('open');
    }

    // Update styling in dropdown
    const items = document.querySelectorAll('.account-dropdown-menu .dropdown-item');
    items.forEach((item, idx) => {
        if (idx + 1 === roleId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    if (roleId === 1) {
        activeRole = "Admin";
        if (label) label.textContent = "เจ มาร์ท (Admin)";
        document.querySelector('.welcome-subtitle').textContent = "ผู้ดูแลระบบ บมจ. เจ มาร์ท (e-PaySLF)";
        alertSim("สลับบทบาทผู้ใช้งาน", "เข้าใช้งานในบทบาท Admin สำเร็จ (มีสิทธิ์แก้ไขและพิมพ์ Pay In)");
    } else {
        activeRole = "HR staff";
        if (label) label.textContent = "เจ มาร์ท (HR staff)";
        document.querySelector('.welcome-subtitle').textContent = "ฝ่ายบุคคล บมจ. เจ มาร์ท (e-PaySLF)";
        alertSim("สลับบทบาทผู้ใช้งาน", "เข้าใช้งานในบทบาท HR staff สำเร็จ (มีสิทธิ์ตรวจสอบข้อมูลและอัปโหลดผลการหักเงิน)");
    }
}

// Click anywhere outside dropdown to close it
document.addEventListener('click', function(event) {
    const container = document.querySelector('.account-selector-container');
    const dropdown = document.getElementById('account-dropdown');
    if (container && dropdown && !container.contains(event.target)) {
        container.classList.remove('open');
        dropdown.classList.remove('open');
    }
});

// BOTTOM NAVBAR TABS ROUTER
function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNav = document.getElementById(`nav-${tabName}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    if (tabName === 'home') {
        // Just focus on main dashboard
        closeAllDrawers();
        alertSim("หน้าหลักนายจ้าง", "คุณกำลังแสดงผลข้อมูลหลักของ บมจ. เจ มาร์ท จำกัด (มหาชน)");
    } else if (tabName === 'services') {
        // Open service quick modal
        closeAllDrawers();
        alertSim("บริการ กยศ. นายจ้าง", "กรุณาเลือกบริการจากเมนูบนหน้าหลัก (มีทั้งหมด 7 ฟังก์ชัน)");
        // Highlight first service card visually
        const firstCard = document.querySelector('.glance-card');
        if (firstCard) {
            firstCard.style.transform = 'scale(1.02)';
            setTimeout(() => firstCard.style.transform = 'scale(1)', 600);
        }
    } else if (tabName === 'notifications') {
        triggerNotification();
    } else if (tabName === 'profile') {
        closeAllDrawers();
        handleEmployerService('profile');
    }
}

// OPEN DRAWERS
function triggerNotification() {
    closeAllDrawers();
    document.getElementById('app-overlay').classList.add('open');
    document.getElementById('notification-drawer').classList.add('open');
}

function closeAllDrawers() {
    document.getElementById('app-overlay').classList.remove('open');
    document.getElementById('notification-drawer').classList.remove('open');
}

// 7 CORE SERVICES MODAL ROUTER
function handleEmployerService(method) {
    const overlay = document.getElementById('payment-modal-overlay');
    const modal = document.getElementById('payment-modal');
    if (!overlay || !modal) return;

    let html = "";

    if (method === 'profile') {
        html = `
            <div class="modal-header">
                <h3>ข้อมูล Profile นายจ้าง</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 10px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px; background-color: var(--primary-light); padding: 12px; border-radius: 12px;">
                    <div style="width: 44px; height: 44px; background-color: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                        <i class="fa-solid fa-building"></i>
                    </div>
                    <div>
                        <h4 style="font-size: 13.5px; font-weight: 700; color: var(--dark);">${employerData.companyName}</h4>
                        <span style="font-size: 10px; color: var(--dark-muted);">รหัสหน่วยงาน: ${employerData.companyCode}</span>
                    </div>
                </div>
                
                <div class="form-container" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: var(--dark-muted); display: block; margin-bottom: 4px;">ชื่อ-นามสกุล ผู้ประสานงานหลัก</label>
                        <input type="text" id="prof-name" value="${employerData.adminName}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 12px; color: var(--dark);">
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: var(--dark-muted); display: block; margin-bottom: 4px;">อีเมลติดต่อประสานงาน</label>
                        <input type="email" id="prof-email" value="${employerData.adminEmail}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 12px; color: var(--dark);">
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: var(--dark-muted); display: block; margin-bottom: 4px;">เบอร์โทรศัพท์ฝ่ายบุคคล</label>
                        <input type="text" id="prof-phone" value="${employerData.adminPhone}" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 12px; color: var(--dark);">
                    </div>
                </div>

                <div class="modal-buttons" style="display: flex; gap: 8px;">
                    <button class="modal-btn-secondary" style="flex: 1; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ยกเลิก</button>
                    <button class="modal-btn-primary" style="flex: 1.5; padding: 10px; border-radius: 10px; border: none; background-color: var(--primary-dark); color: #fff; font-weight: 700; font-size: 12px; cursor: pointer;" onclick="saveProfileSim()">บันทึกข้อมูล</button>
                </div>
            </div>
        `;
    }
    else if (method === 'pincode') {
        currentPin = "";
        html = `
            <div class="modal-header">
                <h3>ตั้งค่ารหัสความปลอดภัย PIN</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 10px; text-align: center;">
                <p style="font-size: 11.5px; color: var(--dark-muted); margin-bottom: 18px; line-height: 1.45;">
                    กรุณากำหนดรหัส PIN Code 6 หลัก สำหรับการอนุมัติส่งยอดหักบัญชีและพิมพ์ใบนำส่งเงินอย่างปลอดภัย
                </p>

                <!-- Passcode indicators -->
                <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 24px;">
                    <span class="pin-dot" id="pin-1" style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border); background-color: transparent; transition: all 0.15s;"></span>
                    <span class="pin-dot" id="pin-2" style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border); background-color: transparent; transition: all 0.15s;"></span>
                    <span class="pin-dot" id="pin-3" style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border); background-color: transparent; transition: all 0.15s;"></span>
                    <span class="pin-dot" id="pin-4" style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border); background-color: transparent; transition: all 0.15s;"></span>
                    <span class="pin-dot" id="pin-5" style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border); background-color: transparent; transition: all 0.15s;"></span>
                    <span class="pin-dot" id="pin-6" style="width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--border); background-color: transparent; transition: all 0.15s;"></span>
                </div>

                <!-- Numerical keyboard layout -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 240px; margin: 0 auto 16px auto;">
                    <button class="kbd-btn" onclick="pressPin('1')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">1</button>
                    <button class="kbd-btn" onclick="pressPin('2')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">2</button>
                    <button class="kbd-btn" onclick="pressPin('3')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">3</button>
                    <button class="kbd-btn" onclick="pressPin('4')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">4</button>
                    <button class="kbd-btn" onclick="pressPin('5')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">5</button>
                    <button class="kbd-btn" onclick="pressPin('6')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">6</button>
                    <button class="kbd-btn" onclick="pressPin('7')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">7</button>
                    <button class="kbd-btn" onclick="pressPin('8')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">8</button>
                    <button class="kbd-btn" onclick="pressPin('9')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">9</button>
                    <button class="kbd-btn" onclick="pressPin('clear')" style="padding: 12px; border-radius: 50%; border: none; background-color: transparent; color: var(--danger); font-size: 10px; font-weight: 700; cursor: pointer; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-rotate-left"></i> ลบ</button>
                    <button class="kbd-btn" onclick="pressPin('0')" style="padding: 12px; border-radius: 50%; border: 1.5px solid var(--border); background-color: #f8fafc; font-size: 16px; font-weight: 700; font-family: var(--font-number); cursor: pointer; aspect-ratio: 1; transition: background 0.1s;">0</button>
                    <button class="kbd-btn" onclick="closePaymentModal()" style="padding: 12px; border-radius: 50%; border: none; background-color: transparent; color: var(--dark-muted); font-size: 10px; font-weight: 700; cursor: pointer; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-circle-xmark"></i> ปิด</button>
                </div>
            </div>
        `;
    }
    else if (method === 'view') {
        let employeesHtml = "";
        employerData.employees.forEach(emp => {
            employeesHtml += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                    <div>
                        <span style="font-size: 12px; font-weight: 700; color: var(--dark); display: block;">${emp.name}</span>
                        <span style="font-size: 9px; color: var(--dark-muted); font-family: var(--font-number);">${emp.citizenId}</span>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 12px; font-weight: 700; color: var(--primary); display: block; font-family: var(--font-number);">฿${emp.amount}</span>
                        <span style="font-size: 9px; display: inline-flex; align-items: center; gap: 3px;" class="${emp.statusClass}">
                            <i class="fa-solid ${emp.iconClass}" style="font-size: 8px;"></i> ${emp.status}
                        </span>
                    </div>
                </div>
            `;
        });

        html = `
            <div class="modal-header">
                <h3>รายการแจ้งหักพนักงานรายบุคคล</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 8px; max-height: 480px; overflow-y: auto;">
                <div style="background-color: var(--primary-light); padding: 10px; border-radius: 8px; font-size: 11px; margin-bottom: 12px; display: flex; justify-content: space-between;">
                    <span style="color: var(--primary); font-weight: 600;">ยอดเงินหักทั้งหมด:</span>
                    <strong style="color: var(--primary); font-family: var(--font-number);">฿${employerData.totalDeductionAmount}</strong>
                </div>

                <div style="display: flex; flex-direction: column; gap: 2px;">
                    ${employeesHtml}
                </div>
                
                <div style="margin-top: 14px; text-align: center;">
                    <span style="font-size: 9.5px; color: var(--dark-muted);">แสดงข้อมูลตัวอย่างพนักงานล่าสุด 5 รายจากทั้งหมด 142 ราย</span>
                </div>

                <div class="modal-buttons" style="margin-top: 16px;">
                    <button class="modal-btn-secondary" style="width: 100%; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ปิดแถบการแสดงผล</button>
                </div>
            </div>
        `;
    }
    else if (method === 'download') {
        html = `
            <div class="modal-header">
                <h3>ดาวน์โหลดข้อมูลแจ้งหัก (.xlsx / .csv)</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 10px; text-align: center;">
                <div style="font-size: 46px; color: #10b981; margin-bottom: 12px;">
                    <i class="fa-regular fa-file-excel"></i>
                </div>
                <p style="font-size: 11.5px; color: var(--dark-muted); margin-bottom: 16px; line-height: 1.5;">
                    กรุณาคลิกเลือกรูปแบบไฟล์ที่ต้องการบันทึก เพื่อนำไปเชื่อมต่อเข้ากับซอฟต์แวร์จัดทำเงินเดือน (Payroll) ของหน่วยงานนายจ้าง
                </p>

                <!-- Simulated progress bar -->
                <div id="download-progress-container" style="display: none; background-color: #f1f5f9; height: 8px; border-radius: 4px; overflow: hidden; margin: 16px 0;">
                    <div id="download-progress-bar" style="background-color: #10b981; height: 100%; width: 0%; transition: width 0.15s ease-out;"></div>
                </div>
                <span id="download-progress-text" style="display: none; font-size: 10.5px; font-weight: 700; color: #10b981; margin-bottom: 16px;">กำลังเตรียมการดาวน์โหลด 0%</span>

                <div class="modal-buttons" style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="modal-btn-primary" style="padding: 11px; border-radius: 10px; border: none; background-color: #10b981; color: #fff; font-weight: 700; font-size: 12.5px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="triggerDownloadSim('excel')">
                        <i class="fa-solid fa-file-arrow-down"></i> ดาวน์โหลดแบบ Excel (.xlsx)
                    </button>
                    <button class="modal-btn-secondary" style="padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;" onclick="triggerDownloadSim('csv')">
                        <i class="fa-solid fa-file-csv"></i> ดาวน์โหลดแบบ CSV (.csv)
                    </button>
                    <button class="modal-btn-secondary" style="padding: 10px; border-radius: 10px; border: none; background-color: transparent; color: var(--dark-muted); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ยกเลิก</button>
                </div>
            </div>
        `;
    }
    else if (method === 'upload') {
        html = `
            <div class="modal-header">
                <h3>อัปโหลดไฟล์รายงานผลการหักเงิน</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 10px; text-align: center;">
                <p style="font-size: 11px; color: var(--dark-muted); margin-bottom: 14px; line-height: 1.45;">
                    อัปโหลดไฟล์ผลลัพธ์ที่ดึงออกมาจากซอฟต์แวร์จัดทำเงินเดือน (Payroll) ของท่านในรูปแบบไฟล์ Excel หรือ CSV
                </p>

                <!-- Drag & drop mock layout -->
                <div id="dropzone" onclick="triggerUploadSelector()" style="border: 2px dashed #9333ea; background-color: #faf5ff; padding: 24px 16px; border-radius: 14px; cursor: pointer; margin-bottom: 18px; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div id="upload-icon" style="font-size: 32px; color: #9333ea; transition: all 0.15s;">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <span id="upload-main-lbl" style="font-size: 12.5px; font-weight: 700; color: #7c3aed;">คลิกเลือกไฟล์เพื่ออัปโหลด</span>
                    <span id="upload-sub-lbl" style="font-size: 9px; color: var(--dark-muted);">รองรับไฟล์ Excel (.xlsx) และ CSV (.csv) ขนาดสูงสุด 10MB</span>
                </div>

                <div class="modal-buttons">
                    <button class="modal-btn-secondary" style="width: 100%; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ยกเลิก</button>
                </div>
            </div>
        `;
    }
    else if (method === 'adjust') {
        let reasonsOptions = "";
        employerData.reasons.forEach((r, idx) => {
            reasonsOptions += `<option value="${idx}">${r}</option>`;
        });

        html = `
            <div class="modal-header">
                <h3>ปรับยอดและระบุสาเหตุส่งเงินน้อย</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 8px; max-height: 480px; overflow-y: auto;">
                <div style="font-size: 11px; background-color: var(--primary-light); padding: 8px 12px; border-radius: 8px; margin-bottom: 12px; line-height: 1.5; color: var(--primary);">
                    <i class="fa-solid fa-triangle-exclamation"></i> การปรับลดจำนวนเงินนำส่ง จะต้องมีการระบุสาเหตุทางราชการตามจริง เพื่อจัดส่งข้อมูลให้ กยศ. ตรวจสอบ
                </div>

                <div class="form-container" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px;">
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: var(--dark-muted); display: block; margin-bottom: 4px;">เลือกพนักงานที่ต้องการปรับยอด</label>
                        <select id="adjust-emp" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 12px; color: var(--dark); font-weight: 600;">
                            <option value="1">นายเกรียงไกร ใจซื่อ (กยศ. ฿3,500.00)</option>
                            <option value="2">นางสาวศิริพร อุดมพร (กยศ. ฿2,820.00)</option>
                            <option value="3">นายประวิทย์ รักชาติ (กยศ. ฿4,150.00)</option>
                            <option value="4">นางสาวอารียา สุขสันต์ (กยศ. ฿3,200.00)</option>
                            <option value="5">นายสมชาย ชาญชัย (กยศ. ฿1,500.00)</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: var(--dark-muted); display: block; margin-bottom: 4px;">ยอดแจ้งหักใหม่ (บาท)</label>
                        <div style="position: relative; display: flex; align-items: center;">
                            <input type="number" id="adjust-amount" placeholder="0.00" style="width: 100%; padding: 10px 48px 10px 12px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 14px; font-weight: 700; color: var(--primary); font-family: var(--font-number);">
                            <span style="position: absolute; right: 14px; font-size: 12px; font-weight: 700; color: var(--dark-muted);">บาท</span>
                        </div>
                    </div>
                    <div>
                        <label style="font-size: 11px; font-weight: 700; color: var(--dark-muted); display: block; margin-bottom: 4px;">ระบุสาเหตุผลการปรับลด</label>
                        <select id="adjust-reason" style="width: 100%; padding: 10px; border-radius: 8px; border: 1.5px solid var(--border); font-size: 12px; color: var(--dark);">
                            ${reasonsOptions}
                        </select>
                    </div>
                </div>

                <div class="modal-buttons" style="display: flex; gap: 8px;">
                    <button class="modal-btn-secondary" style="flex: 1; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ยกเลิก</button>
                    <button class="modal-btn-primary" style="flex: 1.5; padding: 10px; border-radius: 10px; border: none; background-color: var(--primary-dark); color: #fff; font-weight: 700; font-size: 12px; cursor: pointer;" onclick="saveAdjustSim()">บันทึกปรับยอด</button>
                </div>
            </div>
        `;
    }
    else if (method === 'print') {
        if (activeRole !== "Admin") {
            alertSim("สิทธิ์การเข้าใช้งานไม่เพียงพอ", "ขออภัย บทบาท HR staff สามารถเข้าดูยอดเงินได้เท่านั้น กรุณาสลับเป็นบทบาท Admin เพื่อยืนยันข้อมูลและพิมพ์ใบนำส่งเงิน Pay In");
            return;
        }

        // Format dates
        const now = new Date();
        const yearTh = now.getFullYear() + 543;
        const monthsTh = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
        const formattedDate = `${now.getDate()} ${monthsTh[now.getMonth()]} ${yearTh}`;
        
        html = `
            <div class="modal-header">
                <h3>พิมพ์ชุดชำระเงิน (Pay In Slip)</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body" style="padding-top: 6px; max-height: 480px; overflow-y: auto;">
                
                <!-- Premium High fidelity Pay In Slip Document representation -->
                <div style="background-color: #fff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 14px; margin-bottom: 16px; box-shadow: var(--shadow-sm); font-family: 'Sarabun', sans-serif;">
                    
                    <!-- Slip Header -->
                    <div style="display: flex; gap: 8px; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 8px;">
                        <img src="DSL.png" alt="กยศ" style="height: 24px; object-fit: contain;">
                        <div style="display: flex; flex-direction: column; gap: 1px;">
                            <span style="font-size: 10px; font-weight: 700; color: #1e3a8a; line-height: 1.2;">ใบแจ้งยอดชำระเงินคืนกองทุน กยศ. ผ่านนายจ้าง</span>
                            <span style="font-size: 7.5px; color: var(--dark-muted);">Student Loan Fund (Employer Payment Slip)</span>
                        </div>
                    </div>

                    <!-- Client Details -->
                    <div style="font-size: 9px; line-height: 1.4; color: var(--dark); display: flex; flex-direction: column; gap: 2px; margin-bottom: 8px;">
                        <div>หน่วยงานนายจ้าง: <strong>${employerData.companyName}</strong></div>
                        <div>รหัสบัญชีอ้างอิง: <strong>${employerData.companyCode}</strong></div>
                        <div>ประจำงวดเดือน: <strong>พฤษภาคม 2569</strong></div>
                        <div>วันที่ออกเอกสาร: <strong>${formattedDate}</strong></div>
                    </div>

                    <!-- Total Block -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10px; font-weight: 700; color: var(--dark-muted);">จำนวนเงินสุทธิสะสม:</span>
                        <strong style="font-size: 14.5px; font-weight: 800; color: var(--primary-dark); font-family: var(--font-number);">฿${employerData.totalDeductionAmount}</strong>
                    </div>

                    <!-- Barcode Representation -->
                    <div style="text-align: center; margin-bottom: 8px;">
                        <div style="font-size: 8px; color: var(--dark-muted); margin-bottom: 3px; font-family: var(--font-number); letter-spacing: 0.5px;">Ref1: ${employerData.companyCode.replace(/-/g, '')} | Ref2: 25690529</div>
                        
                        <!-- High fidelity dummy Barcode bars -->
                        <div style="display: inline-flex; height: 32px; width: 100%; max-width: 220px; background-color: #000; padding: 2px; box-sizing: border-box; justify-content: center; gap: 1px; overflow: hidden; border-radius: 2px; background-color: #fff; border: 1px solid #e2e8f0;">
                            <span style="width: 2px; background-color: #000; height: 100%;"></span>
                            <span style="width: 1px; background-color: #000; height: 100%;"></span>
                            <span style="width: 4px; background-color: #000; height: 100%;"></span>
                            <span style="width: 2px; background-color: #000; height: 100%;"></span>
                            <span style="width: 1px; background-color: #000; height: 100%;"></span>
                            <span style="width: 3px; background-color: #000; height: 100%;"></span>
                            <span style="width: 2px; background-color: #000; height: 100%;"></span>
                            <span style="width: 1px; background-color: #000; height: 100%;"></span>
                            <span style="width: 4px; background-color: #000; height: 100%;"></span>
                            <span style="width: 2px; background-color: #000; height: 100%;"></span>
                            <span style="width: 3px; background-color: #000; height: 100%;"></span>
                            <span style="width: 1px; background-color: #000; height: 100%;"></span>
                            <span style="width: 2px; background-color: #000; height: 100%;"></span>
                            <span style="width: 4px; background-color: #000; height: 100%;"></span>
                            <span style="width: 1px; background-color: #000; height: 100%;"></span>
                            <span style="width: 3px; background-color: #000; height: 100%;"></span>
                            <span style="width: 2px; background-color: #000; height: 100%;"></span>
                            <span style="width: 1px; background-color: #000; height: 100%;"></span>
                            <span style="width: 4px; background-color: #000; height: 100%;"></span>
                        </div>
                    </div>

                    <!-- Footer Stamp -->
                    <div style="font-size: 8px; color: var(--dark-muted); text-align: center; border-top: 1px dashed #cbd5e1; padding-top: 8px;">
                        <i class="fa-solid fa-shield-halved"></i> เอกสารออกโดยระบบคอมพิวเตอร์กรมสรรพากรเพื่อใช้ยืนยันการนำส่งเงิน
                    </div>
                </div>

                <div class="modal-buttons" style="display: flex; gap: 8px;">
                    <button class="modal-btn-secondary" style="flex: 1; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;" onclick="closePaymentModal()">ปิด</button>
                    
                    <button class="modal-btn-primary" style="flex: 1.8; padding: 10px; border-radius: 10px; border: none; background-color: var(--primary-dark); color: #fff; font-weight: 700; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;" onclick="downloadPayInSim()">
                        <i class="fa-solid fa-print"></i> พิมพ์ใบ Pay In (PDF)
                    </button>
                </div>
            </div>
        `;
    }

    modal.innerHTML = html;
    overlay.classList.add('open');
}

// CLOSE CORE SERVICES MODAL
function closePaymentModal() {
    const overlay = document.getElementById('payment-modal-overlay');
    if (overlay) {
        overlay.classList.remove('open');
    }
}

// SIMULATE SAVE PROFILE
function saveProfileSim() {
    const nameVal = document.getElementById('prof-name').value;
    const emailVal = document.getElementById('prof-email').value;
    const phoneVal = document.getElementById('prof-phone').value;

    employerData.adminName = nameVal;
    employerData.adminEmail = emailVal;
    employerData.adminPhone = phoneVal;

    document.querySelector('.welcome-title span').textContent = nameVal;

    closePaymentModal();
    alertSim("บันทึกข้อมูลเรียบร้อย", "ปรับปรุงข้อมูลโปรไฟล์แอดมินฝ่ายบุคคลเรียบร้อยแล้ว!");
}

// SIMULATE INTERACTIVE PASSCODE (PIN CODE)
function pressPin(key) {
    if (key === 'clear') {
        if (currentPin.length > 0) {
            const lastIdx = currentPin.length;
            document.getElementById(`pin-${lastIdx}`).classList.remove('filled');
            document.getElementById(`pin-${lastIdx}`).style.backgroundColor = 'transparent';
            currentPin = currentPin.slice(0, -1);
        }
    } else {
        if (currentPin.length < 6) {
            currentPin += key;
            const currentIdx = currentPin.length;
            const dot = document.getElementById(`pin-${currentIdx}`);
            if (dot) {
                dot.classList.add('filled');
                dot.style.backgroundColor = 'var(--primary)';
            }

            // Check if passcode is complete
            if (currentPin.length === 6) {
                setTimeout(() => {
                    closePaymentModal();
                    alertSim("ตั้งรหัส PIN สำเร็จ", "ระบบบันทึกรหัส PIN ยืนยันตัวตน 6 หลักของท่านเรียบร้อยแล้ว!");
                }, 400);
            }
        }
    }
}

// SIMULATE DOWNLOAD FILE
function triggerDownloadSim(type) {
    const pContainer = document.getElementById('download-progress-container');
    const pBar = document.getElementById('download-progress-bar');
    const pText = document.getElementById('download-progress-text');
    
    if (pContainer && pBar && pText) {
        pContainer.style.display = 'block';
        pText.style.display = 'block';
        
        let percent = 0;
        const interval = setInterval(() => {
            percent += 10;
            pBar.style.width = `${percent}%`;
            pText.textContent = `กำลังเตรียมการดาวน์โหลด ${percent}%`;
            
            if (percent >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    closePaymentModal();
                    alertSim("ดาวน์โหลดข้อมูลสำเร็จ", `ดาวน์โหลดไฟล์รายงานประจำเดือนย่อยในรูปแบบ ${type.toUpperCase()} เรียบร้อยแล้ว!`);
                }, 300);
            }
        }, 100);
    }
}

// SIMULATE UPLOAD FILE
function triggerUploadSelector() {
    const dropzone = document.getElementById('dropzone');
    const uIcon = document.getElementById('upload-icon');
    const uMain = document.getElementById('upload-main-lbl');
    const uSub = document.getElementById('upload-sub-lbl');

    if (dropzone && uIcon && uMain && uSub) {
        uIcon.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
        uMain.textContent = "กำลังวิเคราะห์ไฟล์ข้อมูลนำส่ง...";
        uSub.textContent = "กรุณารอสักครู่ ระบบกำลังคำนวณยอดเงินและเลขบัตรประชาชนพนักงาน 142 ราย";

        setTimeout(() => {
            uIcon.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i>`;
            uIcon.style.color = "#10b981";
            uMain.textContent = "วิเคราะห์ไฟล์ Jaymart_Payroll_May2026.xlsx สำเร็จ";
            uMain.style.color = "#10b981";
            uSub.textContent = "พนักงานทั้งหมด 142 ราย | ยอดเงินหักรวม ฿485,320.00 ครบถ้วนถูกต้อง!";
            
            alertSim("ประมวลผลไฟล์สำเร็จ", "ระบบอ่านไฟล์ Payroll ยอดหักนายจ้างเรียบร้อยแล้ว 142 รายการ");
            
            setTimeout(() => {
                closePaymentModal();
                alertSim("อัปโหลดเรียบร้อย", "อัปโหลดข้อมูลการแจ้งหักเงินเดือนกลับขึ้นระบบ (e-PaySLF) สำเร็จ!");
            }, 1200);
        }, 2200);
    }
}

// SIMULATE ADJUST VALUE
function saveAdjustSim() {
    const empSelect = document.getElementById('adjust-emp');
    const amountInput = document.getElementById('adjust-amount');
    const reasonSelect = document.getElementById('adjust-reason');

    const empName = empSelect.options[empSelect.selectedIndex].text.split(' (')[0];
    const amountVal = amountInput.value ? parseFloat(amountInput.value).toLocaleString('th-TH', {minimumFractionDigits: 2}) : "0.00";
    const reasonVal = reasonSelect.options[reasonSelect.selectedIndex].text;

    closePaymentModal();
    alertSim("บันทึกปรับยอดพนักงาน", `ปรับลดจำนวนเงินของ "${empName}" เป็น ฿${amountVal} บาท ด้วยสาเหตุ "${reasonVal}" เรียบร้อยแล้ว`);
}

// SIMULATE DOWNLOAD PAYIN PDF
function downloadPayInSim() {
    alertSim("กำลังพิมพ์ชุดชำระเงิน Pay In", "กำลังสร้างไฟล์นำส่งชำระเงิน e-PaySLF ในรูปแบบ PDF ความละเอียดสูง...");
    setTimeout(() => {
        closePaymentModal();
        alertSim("พิมพ์ใบนำส่งเงินสำเร็จ", "ดาวน์โหลดเอกสาร PayIn_Jaymart_May2026.pdf ลงเครื่องเรียบร้อยแล้ว!");
    }, 1800);
}

// EXPOSE FUNCTIONS GLOBALLY FOR INLINE ONCLICK EVENTS
window.toggleAccountDropdown = toggleAccountDropdown;
window.switchActiveAccount = switchActiveAccount;
window.switchTab = switchTab;
window.handleEmployerService = handleEmployerService;
window.closePaymentModal = closePaymentModal;
window.saveProfileSim = saveProfileSim;
window.pressPin = pressPin;
window.triggerDownloadSim = triggerDownloadSim;
window.triggerUploadSelector = triggerUploadSelector;
window.saveAdjustSim = saveAdjustSim;
window.downloadPayInSim = downloadPayInSim;
window.alertSim = alertSim;
window.triggerNotification = triggerNotification;
window.closeAllDrawers = closeAllDrawers;
