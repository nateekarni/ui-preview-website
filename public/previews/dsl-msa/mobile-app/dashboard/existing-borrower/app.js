// Simulated Database containing complete loan details matching all screenshots
const loanAccounts = {
    1: {
        id: 1,
        type: 'กยศ.',
        typeClass: 'type-koyosor',
        accountNo: '100825401',
        subName: 'ปี 2 ล้านนา',
        badges: [
            { text: 'สัญญา 15 ปี', class: 'tag-success' },
            { text: 'ปรับโครงสร้างหนี้', class: 'tag-warning' },
            { text: 'ปกติ', class: 'tag-success' }
        ],
        remainingBalance: '151,346.19',
        totalLoanAmount: '166,400.00', // Matching screenshot 1 sum
        installmentDue: '4,693.20',
        dueDate: '05 ก.ค. 2563', // Matching Screenshot 1
        overdueAmount: '2,015.01',
        statusText: 'ปกติ',
        statusColorClass: 'text-success',
        paidPercentage: '9.05%', // Matching Screenshot 1
        paidAmount: '15,053.81',
        remainingDuration: 'ชำระครั้งล่าสุด: 27 ส.ค. 2562 เป็นจำนวนเงิน 520.00 บาท',
        
        // Contracts matching Screenshot 1 table
        contracts: [
            { 
                accNo: '111111111', 
                level: 'ปริญญาตรี', 
                school: 'มหาวิทยาลัยเกษตรศาสตร์', 
                year: '2558', 
                amount: '83,200.00',
                guarantor: 'นายสมศักดิ์ รักเรียน',
                // History timeline matching Screenshot 3
                history: [
                    { step: 1, date: '15 พ.ค. 2560', process: 'ทำสัญญากู้ยืม', status: 'อนุมัติจัดทำสัญญาสำเร็จ', class: 'active' },
                    { step: 2, date: '15 ก.ค. 2563', process: 'ไกล่เกลี่ยก่อนฟ้อง', status: 'ไกล่เกลี่ยสำเร็จ ทำสัญญาประนีประนอม', class: 'active' },
                    { step: 3, date: '20 ธ.ค. 2564', process: 'ดำเนินคดี', status: 'ยื่นฟ้องต่อศาล', class: 'active' },
                    { step: 4, date: '20 ม.ค. 2565', process: 'บังคับคดี', status: 'บังคับคดี', class: 'active' },
                    { step: 5, date: '20 เม.ย. 2565', process: 'ปรับโครงสร้างหนี้', status: 'ปรับโครงสร้างหนี้จากคำพิพากษา (อนุมัติ)', class: 'current active' }
                ]
            },
            { 
                accNo: '222222222', 
                level: 'ปริญญาตรี', 
                school: 'มหาวิทยาลัยเกษตรศาสตร์', 
                year: '2559', 
                amount: '83,200.00',
                guarantor: 'นางสมศรี รักดี',
                history: [
                    { step: 1, date: '15 พ.ค. 2561', process: 'ทำสัญญากู้ยืม', status: 'อนุมัติจัดทำสัญญาสำเร็จ', class: 'current active' }
                ]
            }
        ],

        // Transactions Statement matching Screenshot 2 table
        transactions: [
            { 
                date: '05 ก.ค. 2566', 
                time: '10:30 น.', 
                type: 'ชำระเงินกู้ กยศ.', 
                ref: 'DSL66070500000000001001', 
                amount: '-5,000.00', 
                isRepayment: true, 
                principal: '4,500.00', 
                interest: '450.00', 
                penalty: '0.00', 
                fee: '50.00', 
                remaining: '151,346.19',
                receipt: true 
            },
            { 
                date: '05 ก.ค. 2565', 
                time: '09:15 น.', 
                type: 'ชำระเงินกู้ กยศ.', 
                ref: 'DSL65070500000000002002', 
                amount: '-3,000.00', 
                isRepayment: true, 
                principal: '2,500.00', 
                interest: '450.00', 
                penalty: '0.00', 
                fee: '50.00', 
                remaining: '155,846.19',
                receipt: true 
            },
            { 
                date: '15 ส.ค. 2564', 
                time: '14:00 น.', 
                type: 'โอนเงินกู้ยืม (ค่าครองชีพ)', 
                ref: 'DSL64081500000000003003', 
                amount: '+18,000.00', 
                isRepayment: false, 
                principal: '0.00', 
                interest: '0.00', 
                penalty: '0.00', 
                fee: '0.00', 
                remaining: '158,346.19',
                receipt: false 
            },
            { 
                date: '10 ม.ค. 2564', 
                time: '11:20 น.', 
                type: 'โอนเงินกู้ยืม (ค่าเล่าเรียน)', 
                ref: 'DSL64011000000000004004', 
                amount: '+32,000.00', 
                isRepayment: false, 
                principal: '0.00', 
                interest: '0.00', 
                penalty: '0.00', 
                fee: '0.00', 
                remaining: '140,346.19',
                receipt: false 
            },
            { 
                date: '15 ส.ค. 2563', 
                time: '08:45 น.', 
                type: 'โอนเงินกู้ยืม (ค่าเล่าเรียน)', 
                ref: 'DSL63081500000000005005', 
                amount: '+50,000.00', 
                isRepayment: false, 
                principal: '0.00', 
                interest: '0.00', 
                penalty: '0.00', 
                fee: '0.00', 
                remaining: '108,346.19',
                receipt: false 
            }
        ],
        
        installments: [
            { no: 1, dueDate: '05 ก.ค. 2562', principalLeft: '151,346.19', principalDue: '1,163.79', interestDue: '778.84', penalty: '68.00', penaltyStart: '26 พ.ค. 69', interestStart: '26 พ.ค. 69' },
            { no: 2, dueDate: '05 ก.ค. 2563', principalLeft: '146,652.99', principalDue: '3,293.20', interestDue: '1,400.00', penalty: '0.00', penaltyStart: '-', interestStart: '-' }
        ],
        
        billingOptions: {
            overdue: {
                total: '2,015.01',
                breakdown: [
                    { name: 'เงินต้นค้างชำระ', val: '1,163.79' },
                    { name: 'ดอกเบี้ยสะสม', val: '782.98' },
                    { name: 'เบี้ยปรับ (ล่าช้า)', val: '68.24', penalty: true }
                ]
            },
            dueAndOverdue: {
                total: '6,708.21',
                dueDate: '03 มี.ค. 2563 (23:59 น.)',
                breakdown: [
                    { name: 'เงินต้นค้างชำระ', val: '1,163.79' },
                    { name: 'เงินต้น', val: '4,693.20' },
                    { name: 'ดอกเบี้ยสะสม', val: '782.98' },
                    { name: 'เบี้ยปรับ (ล่าช้า)', val: '68.24', penalty: true }
                ]
            },
            custom: {
                finalDueDate: '05 ก.ค. 2575 (00:00 น.)',
                payoffAmount: '152,193.03'
            }
        }
    },
    2: {
        id: 2,
        type: 'กรอ.',
        typeClass: 'type-kror',
        accountNo: '10082542',
        subName: 'ปี 1 ลำปาง',
        badges: [
            { text: 'ไกล่เกลี่ย', class: 'tag-warning' },
            { text: 'ปรับโครงสร้างหนี้', class: 'tag-warning' },
            { text: 'ค้างชำระ', class: 'tag-danger' }
        ],
        remainingBalance: '98,500.00',
        totalLoanAmount: '120,000.00',
        installmentDue: '4,200.00',
        dueDate: '15 ส.ค. 2563',
        overdueAmount: '1,200.00',
        statusText: 'ค้างชำระ',
        statusColorClass: 'text-danger',
        paidPercentage: '18.0%',
        paidAmount: '21,500.00',
        remainingDuration: 'ประมาณ 12 ปี (ครบกำหนด 15 ส.ค. 2574)',
        
        contracts: [
            { 
                accNo: '333333333', 
                level: 'ปริญญาตรี', 
                school: 'มหาวิทยาลัยเทคโนโลยีล้านนา', 
                year: '2557', 
                amount: '120,000.00',
                guarantor: 'นางสมรัก ภักดี',
                history: [
                    { step: 1, date: '10 พ.ค. 2559', process: 'ทำสัญญากู้ยืม', status: 'อนุมัติจัดทำสัญญาสำเร็จ', class: 'active' },
                    { step: 2, date: '15 ส.ค. 2563', process: 'ไกล่เกลี่ยก่อนฟ้อง', status: 'ปรับโครงสร้างหนี้ไกล่เกลี่ยสำเร็จ', class: 'current active' }
                ]
            }
        ],

        transactions: [
            { 
                date: '15 ส.ค. 2566', 
                time: '09:30 น.', 
                type: 'ชำระเงินกู้ กรอ.', 
                ref: 'DSL66081500000000002001', 
                amount: '-4,200.00', 
                isRepayment: true, 
                principal: '3,000.00', 
                interest: '1,200.00', 
                penalty: '0.00', 
                fee: '0.00', 
                remaining: '98,500.00',
                receipt: true 
            }
        ],

        installments: [
            { no: 1, dueDate: '15 ส.ค. 2563', principalLeft: '98,500.00', principalDue: '3,000.00', interestDue: '1,200.00', penalty: '1,200.00', penaltyStart: '16 ส.ค. 63', interestStart: '16 ส.ค. 63' }
        ],

        billingOptions: {
            overdue: {
                total: '1,200.00',
                breakdown: [
                    { name: 'เบี้ยปรับสะสมสะสม', val: '1,200.00', penalty: true }
                ]
            },
            dueAndOverdue: {
                total: '5,400.00',
                dueDate: '15 ส.ค. 2563 (00:00 น.)',
                breakdown: [
                    { name: 'เงินต้นงวดปัจจุบัน', val: '3,000.00' },
                    { name: 'ดอกเบี้ยสะสมค้างชำระ', val: '1,200.00' },
                    { name: 'เบี้ยปรับสะสม', val: '1,200.00', penalty: true }
                ]
            },
            custom: {
                finalDueDate: '15 ส.ค. 2574 (00:00 น.)',
                payoffAmount: '99,700.00'
            }
        }
    },
    3: {
        id: 3,
        type: 'กยศ.',
        typeClass: 'type-koyosor',
        accountNo: '100825399',
        subName: 'ปี 1 ชัยภูมิ',
        badges: [
            { text: 'สัญญา ปี 0', class: 'tag-success' },
            { text: 'ปิดบัญชี', class: 'tag-info' }
        ],
        remainingBalance: '0.00',
        totalLoanAmount: '100,000.00',
        installmentDue: '0.00',
        dueDate: '-',
        overdueAmount: '0.00',
        statusText: 'ปิดบัญชีแล้ว',
        statusColorClass: 'text-success',
        paidPercentage: '100%',
        paidAmount: '100,000.00',
        remainingDuration: 'ชำระเสร็จสิ้นแล้ว',
        contracts: [
            { 
                accNo: '444444444', 
                level: 'ปริญญาตรี', 
                school: 'มหาวิทยาลัยราชภัฏชัยภูมิ', 
                year: '2556', 
                amount: '100,000.00',
                guarantor: 'นายมานะ มีชัย',
                history: [
                    { step: 1, date: '12 พ.ค. 2556', process: 'ทำสัญญากู้ยืม', status: 'อนุมัติสัญญาและปิดบัญชีเรียบร้อย', class: 'active' }
                ]
            }
        ],
        transactions: [],
        installments: [],
        billingOptions: null,
        donationRefund: {
            amount: '2,500.00',
            status: 'ยังไม่ทำรายการ'
        }
    }
};

// Global Transaction State
let activeAccountId = null;
let selectedPaymentType = 'dueAndOverdue'; 
let customPaymentOption = 'payoff'; 
let customEnteredAmount = 0;

// LIVE CLOCK FOR PHONE STATUS BAR
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

// NAVIGATION TAB SWITCHER
function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Default to home active style unless it's a real tab shift
    const activeNav = document.getElementById(`nav-${tabName}`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    if (tabName === 'home') {
        navigateToPortal();
    } else if (tabName === 'services') {
        alertSim('ศูนย์บริการด่วน กยศ.', 'ตรวจสอบสิทธิ์กู้ยืม ขอผ่อนผัน หรือยื่นคำร้องปรับโครงสร้างหนี้ออนไลน์...');
        setTimeout(() => {
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.getElementById('nav-home').classList.add('active');
        }, 1500);
    } else if (tabName === 'notifications') {
        triggerNotification();
        setTimeout(() => {
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.getElementById('nav-home').classList.add('active');
        }, 300);
    } else if (tabName === 'profile') {
        toggleAppMenu();
        setTimeout(() => {
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.getElementById('nav-home').classList.add('active');
        }, 300);
    }
}

// SIMULATED ALERT POPUP
function alertSim(title, message) {
    const alertBox = document.createElement('div');
    alertBox.style.position = 'absolute';
    alertBox.style.bottom = '90px';
    alertBox.style.left = '20px';
    alertBox.style.right = '20px';
    alertBox.style.backgroundColor = '#1e293b';
    alertBox.style.color = '#fff';
    alertBox.style.padding = '12px 16px';
    alertBox.style.borderRadius = '12px';
    alertBox.style.boxShadow = '0 10px 25px -5px rgba(0,0,0,0.3)';
    alertBox.style.fontSize = '12px';
    alertBox.style.zIndex = '999';
    alertBox.style.display = 'flex';
    alertBox.style.flexDirection = 'column';
    alertBox.style.gap = '4px';
    alertBox.style.animation = 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    
    alertBox.innerHTML = `
        <strong style="color: #38bdf8; font-weight: 700;">${title}</strong>
        <span>${message}</span>
    `;
    
    const viewport = document.querySelector('.app-viewport');
    viewport.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.style.animation = 'fadeOutDown 0.3s ease';
        setTimeout(() => alertBox.remove(), 300);
    }, 2800);
}

// SLIDE IN ACCOUNT DETAILS SCREEN (Screenshot 1 & Screenshot 2 components optimized)
function navigateToDetail(accountId) {
    const acc = loanAccounts[accountId];
    if (!acc) return;
    
    activeAccountId = accountId;
    
    // Sync header dropdown labels
    const typeLabel = document.getElementById('header-active-acc-type');
    const numLabel = document.getElementById('header-active-acc-num');
    if (typeLabel && numLabel) {
        typeLabel.textContent = acc.type + " ";
        numLabel.textContent = acc.accountNo;
    }
    
    // Sync active class in dropdown items
    document.querySelectorAll('.account-dropdown-menu .dropdown-item').forEach((item, idx) => {
        if (idx + 1 === accountId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const detailScreen = document.getElementById('detail-screen');
    const contentArea = document.getElementById('detail-content-area');

    // Compile badges HTML
    let badgesHtml = '';
    acc.badges.forEach(b => {
        badgesHtml += `<span class="tag-pill ${b.class}">${b.text}</span>`;
    });

    // Compile contract cards list layout (Screenshot 1 optimized for mobile)
    let contractsListHtml = '';
    acc.contracts.forEach(c => {
        contractsListHtml += `
            <div class="contract-card">
                <div class="contract-card-header">
                    <span class="title"><i class="fa-solid fa-file-contract"></i> สัญญา #${c.accNo}</span>
                    <span class="year">ปีการศึกษา ${c.year}</span>
                </div>
                <div class="contract-card-details">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span class="contract-row-lbl">ชื่อสถานศึกษา:</span>
                        <span class="contract-row-val">${c.school} (${c.level})</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span class="contract-row-lbl">วงเงินกู้ตามสัญญา:</span>
                        <span class="contract-row-val" style="color: var(--primary-dark); font-family: var(--font-number); font-weight:700;">฿${c.amount}</span>
                    </div>
                </div>
                <div class="contract-card-footer">
                    <span style="font-size:10px; color:var(--dark-muted);"><i class="fa-solid fa-user-shield"></i> ผู้ค้ำ: ${c.guarantor}</span>
                    <button class="contract-btn-history" onclick="openHistoryTimelineScreen('${c.accNo}')">
                        <i class="fa-solid fa-clock-rotate-left"></i> ประวัติการดำเนินการ
                    </button>
                </div>
            </div>
        `;
    });

    // Compile statement transaction list (Screenshot 2 optimized for mobile)
    let statementHtml = '';
    if (acc.transactions && acc.transactions.length > 0) {
        let txRowsHtml = '';
        acc.transactions.forEach((tx, idx) => {
            const isRepay = tx.isRepayment;
            txRowsHtml += `
                <div class="tx-item" id="tx-item-${idx}" onclick="toggleTransactionExpansion(${idx})">
                    <div class="tx-summary">
                        <div class="tx-icon-bg ${isRepay ? 'up' : 'down'}">
                            <i class="fa-solid ${isRepay ? 'fa-wallet' : 'fa-graduation-cap'}"></i>
                        </div>
                        <div class="tx-main-info">
                            <span class="tx-title">${tx.type}</span>
                            <span class="tx-date">${tx.date} ${tx.time}</span>
                        </div>
                        <div class="tx-amount-col">
                            <span class="tx-amount-val ${!isRepay ? 'receive' : ''}">
                                ${isRepay ? '-' : '+'}฿${tx.amount.replace(/[-+]/g, '')}
                            </span>
                            <span style="font-size: 8px; color: var(--dark-muted); margin-top:2px;">คงเหลือ: ฿${tx.remaining}</span>
                        </div>
                        <div class="tx-caret" id="tx-caret-${idx}"><i class="fa-solid fa-chevron-right"></i></div>
                    </div>

                    <!-- Collapsible transaction detailed breakdown -->
                    <div class="tx-details-pane" id="tx-details-${idx}" onclick="event.stopPropagation()">
                        <div class="tx-detail-row" style="font-size:10px; color: var(--dark-muted); border-bottom: 1px dashed var(--border); padding-bottom:4px; margin-bottom:4px;">
                            <span>เลขที่อ้างอิง: ${tx.ref}</span>
                        </div>
                        <div class="tx-detail-row">
                            <span class="lbl">ยอดโอน/ชำระทั้งหมด</span>
                            <span class="val" style="font-weight:700;">฿${tx.amount.replace(/[-+]/g, '')}</span>
                        </div>
                        <div class="tx-detail-row">
                            <span class="lbl">เงินต้นที่หัก</span>
                            <span class="val">฿${tx.principal}</span>
                        </div>
                        <div class="tx-detail-row">
                            <span class="lbl">ดอกเบี้ย</span>
                            <span class="val">฿${tx.interest}</span>
                        </div>
                        <div class="tx-detail-row">
                            <span class="lbl">เบี้ยปรับสะสม</span>
                            <span class="val">฿${tx.penalty}</span>
                        </div>
                        <div class="tx-detail-row">
                            <span class="lbl">ค่าธรรมเนียม</span>
                            <span class="val">฿${tx.fee}</span>
                        </div>
                        ${tx.receipt ? `
                            <button class="tx-receipt-btn" onclick="downloadReceiptSim('${tx.ref}')">
                                <i class="fa-solid fa-file-invoice-dollar"></i> ดาวน์โหลดใบเสร็จรับเงิน
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        statementHtml = `
            <div class="detail-card flat">
                <div class="detail-card-title">รายการเดินบัญชี (Statement)</div>
                
                <!-- Screenshot 2 Statement download primary button -->
                <button class="download-statement-btn" onclick="downloadStatementSim('${acc.accountNo}')">
                    <i class="fa-solid fa-file-arrow-down"></i> ดาวน์โหลด Statement บัญชีทั้งหมด
                </button>

                <div class="tx-list">
                    ${txRowsHtml}
                </div>
            </div>
        `;
    }

    // Progress Ring variables for Screenshot 1 Chart
    const pctNumber = parseFloat(acc.paidPercentage);
    const dashArray = 2 * Math.PI * 50; 
    const dashOffset = dashArray - (dashArray * pctNumber) / 100;

    let detailsBodyHtml = `
        <!-- Repayment Circular Graph Chart (Screenshot 1) -->
        <div class="detail-card">
            <div class="detail-card-title">ความคืบหน้ายอดชำระคืนเงินกู้</div>
            <div class="repay-progress-section">
                <div class="repay-circle-wrapper">
                    <svg width="120" height="120" style="transform: rotate(-90deg);">
                        <circle cx="60" cy="60" r="50" stroke="#f1f5f9" stroke-width="8" fill="transparent"/>
                        <circle cx="60" cy="60" r="50" stroke="var(--primary)" stroke-width="8" fill="transparent"
                            stroke-dasharray="${dashArray}" stroke-dashoffset="${dashOffset}" stroke-linecap="round"/>
                    </svg>
                    <div class="repay-circle-text">
                        <span class="repay-circle-pct">${acc.paidPercentage}</span>
                        <span class="repay-circle-lbl">ชำระแล้ว</span>
                    </div>
                </div>
                <div style="width:100%; text-align: left; margin-top: 6px;">
                    <div class="detail-row">
                        <span class="lbl">ยอดกู้ยืมรวมสัญญา</span>
                        <span class="val">฿${acc.totalLoanAmount}</span>
                    </div>
                    <div class="detail-row">
                        <span class="lbl">ยอดคงเหลือสุทธิ</span>
                        <span class="val bold-val">฿${acc.remainingBalance}</span>
                    </div>
                    <div class="detail-row">
                        <span class="lbl">ยอดเงินต้นที่ชำระไปแล้ว</span>
                        <span class="val text-success">฿${acc.paidAmount}</span>
                    </div>
                    <p style="font-size: 10px; color: var(--dark-muted); text-align: center; margin-top: 10px; width: 100%; font-weight:600; background-color: var(--primary-light); padding: 6px; border-radius: 8px;">
                        <i class="fa-solid fa-clock-rotate-left"></i> ${acc.remainingDuration}
                    </p>
                </div>
            </div>
        </div>

        ${!acc.donationRefund ? `
        <!-- Current Payment Due section -->
        <div class="detail-card" style="border: 1.5px solid rgba(239, 68, 68, 0.2); background: linear-gradient(to bottom, #fff, #fffcfc); padding: 16px 16px 12px 16px;">
            <div class="detail-card-title" style="color: var(--danger); margin-bottom: 8px;">ยอดรวมที่ต้องชำระงวดนี้</div>
            <div class="detail-row" style="border-bottom: none; padding: 6px 0;">
                <span class="lbl" style="color: var(--danger); opacity: 0.85;">ยอดชำระงวดนี้สะสม</span>
                <span class="val" style="color: var(--danger); font-size: 19px; font-weight: 700;">฿${accountId === 1 ? '6,703.83' : '5,400.00'}</span>
            </div>
            <div class="detail-row" style="border-bottom: none; padding: 6px 0;">
                <span class="lbl" style="color: var(--danger); opacity: 0.85;">ยอดหนี้ค้างชำระสะสม</span>
                <span class="val" style="color: var(--danger); font-weight: 700;">฿${acc.overdueAmount}</span>
            </div>
            <div class="detail-row" style="border-bottom: none; padding: 6px 0; padding-bottom: 0;">
                <span class="lbl" style="color: var(--danger); opacity: 0.85;">วันครบกำหนดชำระ</span>
                <span class="val" style="color: var(--danger); font-weight: 700;">${acc.dueDate} (00:00 น.)</span>
            </div>
            <div style="margin-top: 14px;">
                <button class="danger-action-btn" onclick="openPaymentScreen(${accountId})">
                    <i class="fa-solid fa-wallet"></i> ชำระเงินงวดนี้
                </button>
            </div>
        </div>
        ` : `
        <!-- Refund donation block -->
        <div class="detail-card" style="border-left: 4px solid var(--success);">
            <div class="detail-card-title" style="color: var(--success);">สถานะการรับเงินคืน/บริจาค</div>
            <div class="detail-row">
                <span class="lbl">ยอดเงินที่ชำระเกิน</span>
                <span class="val bold-val" style="color: var(--success)">฿${acc.donationRefund.amount}</span>
            </div>
            <div class="detail-row">
                <span class="lbl">สถานะการรับเงินคืน/บริจาค</span>
                <span class="val text-warning" style="font-weight: 700;">${acc.donationRefund.status}</span>
            </div>
            <div style="margin-top: 14px;">
                <button class="secondary-action-btn btn-green" onclick="handleAction('refund', '${acc.accountNo}')">
                    <i class="fa-solid fa-hand-holding-dollar"></i> ยื่นขอคืนเงินบริจาค
                </button>
            </div>
        </div>
        `}

        <!-- ข้อมูลสัญญาย่อย -->
        <div class="detail-card flat">
            <div class="detail-card-title">ข้อมูลสัญญาเงินกู้ย่อย (Contracts)</div>
            ${contractsListHtml}
        </div>

        <!-- รายการเดินบัญชี (Statement & Transactions) -->
        ${statementHtml}
    `;

    contentArea.innerHTML = `
        <div class="detail-card" style="background-color: var(--primary-dark); color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span class="acc-type ${acc.typeClass}" style="border: 1px solid rgba(255,255,255,0.4);">${acc.type}</span>
                    <span style="font-family: var(--font-number); font-size: 16px; font-weight: 700; margin-left: 6px;">#${acc.accountNo}</span>
                    <p style="font-size: 11px; opacity: 0.7; margin-top: 4px;">สาขา: ${acc.subName}</p>
                </div>
                <i class="fa-solid fa-circle-info" style="font-size: 20px; opacity: 0.8;"></i>
            </div>
            <div class="badges-block">
                ${badgesHtml}
            </div>
        </div>

        ${detailsBodyHtml}
    `;

    detailScreen.classList.add('open');
}

function closeDetailScreen() {
    document.getElementById('detail-screen').classList.remove('open');
}

// TOGGLE TRANSACTION CARD IN STATEMENT LIST
function toggleTransactionExpansion(idx) {
    const card = document.getElementById(`tx-item-${idx}`);
    const details = document.getElementById(`tx-details-${idx}`);
    const caret = document.getElementById(`tx-caret-${idx}`);

    if (card && details && caret) {
        const isExpanded = card.classList.contains('expanded');
        if (isExpanded) {
            card.classList.remove('expanded');
        } else {
            card.classList.add('expanded');
        }
    }
}

// SIMULATE DOWNLOAD STATEMENT
function downloadStatementSim(accountNo) {
    alertSim('กำลังดาวน์โหลด Statement', 'ระบบกำลังสร้างไฟล์ PDF ของบัญชี #' + accountNo + ' กรุณารอความปลอดภัย...');
    setTimeout(() => {
        alertSim('ดาวน์โหลดสำเร็จ', 'ไฟล์ Statement_' + accountNo + '.pdf บันทึกลงในเครื่องเรียบร้อย!');
    }, 2000);
}

// SIMULATE DOWNLOAD RECEIPT
function downloadReceiptSim(refNo) {
    alertSim('ดาวน์โหลดใบเสร็จ', 'กำลังประมวลผลใบเสร็จ e-Receipt เลขที่ ' + refNo + '...');
    setTimeout(() => {
        alertSim('ดาวน์โหลดสำเร็จ', 'ใบเสร็จ_' + refNo + '.pdf ถูกเก็บลงคลังของอุปกรณ์');
    }, 2000);
}

// OPEN HISTORY TIMELINE VERTICAL STEPPER (Screenshot 3 optimized for mobile)
function openHistoryTimelineScreen(contractNo) {
    // Find contract details in database
    let matchedContract = null;
    let accType = '';
    
    for (let key in loanAccounts) {
        const acc = loanAccounts[key];
        const con = acc.contracts.find(c => c.accNo === contractNo);
        if (con) {
            matchedContract = con;
            accType = acc.type;
            break;
        }
    }

    if (!matchedContract) return;

    const timelineScreen = document.getElementById('history-timeline-screen');
    const contentArea = document.getElementById('history-timeline-content-area');

    // Build vertical timeline steps HTML
    let stepsHtml = '';
    matchedContract.history.forEach(step => {
        stepsHtml += `
            <div class="timeline-step-node ${step.class}">
                <div class="timeline-circle"></div>
                <div class="timeline-step-content">
                    <div class="timeline-step-header">
                        <span class="timeline-step-date">${step.date}</span>
                        <span class="tag-pill ${step.class.includes('current') ? 'tag-warning' : 'tag-success'}" style="font-size:8px;">
                            ${step.class.includes('current') ? 'ปัจจุบัน' : 'สำเร็จ'}
                        </span>
                    </div>
                    <span class="timeline-step-title">${step.process}</span>
                    <p class="timeline-step-desc">${step.status}</p>
                </div>
            </div>
        `;
    });

    contentArea.innerHTML = `
        <!-- Contract and Guarantor basic info box -->
        <div class="detail-card" style="background-color: var(--primary-dark); color: #fff;">
            <div style="font-size:13.5px; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:8px; margin-bottom:8px;">
                <i class="fa-solid fa-file-invoice"></i> สัญญาเลขที่: #${matchedContract.accNo}
            </div>
            <div style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
                <span>ประเภทบัญชีเงินกู้: <strong>${accType}</strong></span>
                <span>ผู้ค้ำประกันในสัญญา: <strong>${matchedContract.guarantor}</strong></span>
                <span>ชื่อสถานศึกษา: <strong>${matchedContract.school}</strong></span>
            </div>
        </div>

        <div class="detail-card flat">
            <div class="detail-card-title">ไทม์ไลน์สถานะสัญญา (Vertical Timeline Steps)</div>
            
            <div class="timeline-stepper">
                ${stepsHtml}
            </div>
        </div>
    `;

    timelineScreen.classList.add('open');
}

function closeHistoryTimelineScreen() {
    document.getElementById('history-timeline-screen').classList.remove('open');
}

// SLIDE IN AND POPULATE PAYMENT SELECTION SCREEN
function openPaymentScreen(accountId) {
    const acc = loanAccounts[accountId];
    if (!acc || !acc.billingOptions) return;

    activeAccountId = accountId;
    selectedPaymentType = 'dueAndOverdue'; 
    customPaymentOption = 'payoff';
    
    const payScreen = document.getElementById('payment-screen');
    const contentArea = document.getElementById('payment-content-area');
    
    document.getElementById('payment-header-title').textContent = 'เลือกรายการชำระเงิน';
    
    contentArea.innerHTML = `
        <div style="font-size: 11.5px; text-align: center; color: var(--dark-muted); font-weight: 600; margin: -4px 0 14px 0; background-color: #fff; padding: 8px 12px; border-radius: 10px; border: 1.5px solid var(--border);">
            <i class="fa-solid fa-clock-rotate-left"></i> ข้อมูลอัปเดต ณ วันที่ 26 พ.ค. 2569 (09:44 น.)
        </div>

        <div class="pay-segments">
            <button class="segment-tab" id="tab-overdue" onclick="selectPaymentTab('overdue')">
                <span class="tab-lbl">ชำระยอดค้าง</span>
                <span class="tab-val">฿${acc.billingOptions.overdue.total}</span>
            </button>
            <button class="segment-tab recommended active" id="tab-dueAndOverdue" onclick="selectPaymentTab('dueAndOverdue')">
                <span class="tab-lbl">ยอดค้าง + งวดนี้</span>
                <span class="tab-val">฿${acc.billingOptions.dueAndOverdue.total}</span>
            </button>
            <button class="segment-tab" id="tab-custom" onclick="selectPaymentTab('custom')">
                <span class="tab-lbl">ระบุยอดเอง</span>
                <span class="tab-val">ระบุเอง</span>
            </button>
        </div>

        <div class="breakdown-card" id="breakdown-container"></div>
    `;

    renderBreakdownDetails();
    payScreen.classList.add('open');
}

function selectPaymentTab(type) {
    selectedPaymentType = type;
    document.querySelectorAll('.segment-tab').forEach(t => {
        t.classList.remove('active');
    });
    document.getElementById(`tab-${type}`).classList.add('active');
    renderBreakdownDetails();
}

function renderBreakdownDetails() {
    const acc = loanAccounts[activeAccountId];
    const container = document.getElementById('breakdown-container');
    const stickyAmount = document.getElementById('sticky-pay-amount');
    
    if (!acc || !container) return;

    let html = '';
    let payAmountText = '';

    if (selectedPaymentType === 'overdue') {
        const option = acc.billingOptions.overdue;
        payAmountText = `฿${option.total}`;
        
        let rowsHtml = '';
        option.breakdown.forEach(row => {
            rowsHtml += `
                <div class="breakdown-row ${row.penalty ? 'penalty' : ''}">
                    <span class="lbl">${row.name}</span>
                    <span class="val">฿${row.val}</span>
                </div>
            `;
        });

        html = `
            <div class="breakdown-header-sm"><i class="fa-solid fa-list-check"></i> รายละเอียดค้างชำระสะสม</div>
            ${rowsHtml}
            <div class="breakdown-row highlight" style="padding-top: 12px; margin-top: 4px;">
                <span class="lbl">ยอดชำระยอดค้างสะสมรวม</span>
                <span class="val">฿${option.total}</span>
            </div>
        `;
    } 
    else if (selectedPaymentType === 'dueAndOverdue') {
        const option = acc.billingOptions.dueAndOverdue;
        payAmountText = `฿${option.total}`;
        
        let rowsHtml = '';
        option.breakdown.forEach(row => {
            rowsHtml += `
                <div class="breakdown-row ${row.penalty ? 'penalty' : ''}">
                    <span class="lbl">${row.name}</span>
                    <span class="val">฿${row.val}</span>
                </div>
            `;
        });

        html = `
            <div class="breakdown-header-sm"><i class="fa-solid fa-circle-exclamation"></i> รายละเอียดค้างรวมงวดปัจจุบัน</div>
            ${rowsHtml}
            <div class="breakdown-row" style="background-color: var(--primary-light); padding: 8px 10px; border-radius: 8px; margin-top: 8px; font-size: 11px;">
                <span class="lbl" style="color: var(--primary); font-weight:700;"><i class="fa-regular fa-calendar-check"></i> กำหนดชำระภายใน:</span>
                <span class="val" style="color: var(--primary); font-weight:700;">${option.dueDate}</span>
            </div>
            <div class="breakdown-row highlight" style="padding-top: 12px; margin-top: 4px;">
                <span class="lbl">ยอดรวมชำระงวดปัจจุบันสะสม</span>
                <span class="val">฿${option.total}</span>
            </div>
        `;
    } 
    else if (selectedPaymentType === 'custom') {
        const option = acc.billingOptions.custom;
        
        if (customPaymentOption === 'payoff') {
            payAmountText = `฿${option.payoffAmount}`;
        } else {
            payAmountText = `฿${customEnteredAmount.toFixed(2)}`;
        }

        html = `
            <div class="breakdown-header-sm"><i class="fa-solid fa-hand-holding-dollar"></i> ระบุจำนวนเงินตามสิทธิ์</div>
            <div class="breakdown-row">
                <span class="lbl">ครบกำหนดชำระงวดสุดท้าย</span>
                <span class="val">${option.finalDueDate}</span>
            </div>
            <div class="breakdown-row" style="margin-bottom: 12px;">
                <span class="lbl">ยอดเงินเพื่อชำระปิดบัญชีสุทธิ</span>
                <span class="val text-success" style="font-size:14px; font-weight:700;">฿${option.payoffAmount}</span>
            </div>

            <div class="custom-pay-options">
                <div class="radio-option ${customPaymentOption === 'payoff' ? 'selected' : ''}" onclick="selectCustomPayOption('payoff', ${option.payoffAmount.replace(/,/g, '')})">
                    <div class="radio-circle"></div>
                    <div class="radio-details">
                        <span class="title">ชำระเงินปิดบัญชี</span>
                        <span class="subtitle">จ่ายเพื่อเคลียร์สัญญาหนี้สิน กยศ. ทั้งหมด</span>
                    </div>
                </div>

                <div class="radio-option ${customPaymentOption === 'specify' ? 'selected' : ''}" onclick="selectCustomPayOption('specify', 0)">
                    <div class="radio-circle"></div>
                    <div class="radio-details">
                        <span class="title">ระบุจำนวนเงินที่ต้องการชำระเอง</span>
                        <span class="subtitle">ป้อนตัวเลขยอดเงินเพื่อหักหนี้บางส่วน</span>
                    </div>
                </div>
            </div>

            <div class="pay-input-container ${customPaymentOption === 'specify' ? '' : 'hidden'}" id="custom-amount-input-box">
                <span class="pay-input-label">ระบุจำนวนเงิน</span>
                <div class="pay-input-row">
                    <input type="number" step="100" class="pay-text-input" id="custom-pay-input" placeholder="0.00" value="${customEnteredAmount > 0 ? customEnteredAmount : ''}" oninput="handleCustomAmountInput(this)">
                    <span class="pay-currency">บาท</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    stickyAmount.textContent = payAmountText;
}

function selectCustomPayOption(option, amount) {
    customPaymentOption = option;
    if (option === 'payoff') {
        customEnteredAmount = 0;
    } else {
        customEnteredAmount = 0;
    }
    renderBreakdownDetails();
}

function handleCustomAmountInput(input) {
    let rawVal = parseFloat(input.value);
    if (isNaN(rawVal) || rawVal <= 0) {
        customEnteredAmount = 0;
    } else {
        customEnteredAmount = rawVal;
    }
    document.getElementById('sticky-pay-amount').textContent = `฿${customEnteredAmount.toFixed(2)}`;
}

function closePaymentScreen() {
    document.getElementById('payment-screen').classList.remove('open');
}

// PRIMARY TRANSACTION SUBMIT (Sticky proceed button click)
function submitPayment() {
    const acc = loanAccounts[activeAccountId] || loanAccounts[1];
    let finalAmount = '';
    let breakdownHtml = '';

    if (selectedPaymentType === 'overdue') {
        finalAmount = acc.billingOptions.overdue.total;
        acc.billingOptions.overdue.breakdown.forEach(row => {
            breakdownHtml += `
                <div class="summary-breakdown-row">
                    <span class="lbl">${row.name}</span>
                    <span class="val">฿${row.val}</span>
                </div>
            `;
        });
        breakdownHtml += `
            <div class="summary-breakdown-row highlight-blue">
                <span class="lbl">ยอดรวม</span>
                <span class="val bold-val">฿${finalAmount}</span>
            </div>
        `;
    } else if (selectedPaymentType === 'dueAndOverdue') {
        finalAmount = acc.billingOptions.dueAndOverdue.total;
        acc.billingOptions.dueAndOverdue.breakdown.forEach(row => {
            breakdownHtml += `
                <div class="summary-breakdown-row">
                    <span class="lbl">${row.name}</span>
                    <span class="val">฿${row.val}</span>
                </div>
            `;
        });
        breakdownHtml += `
            <div class="summary-breakdown-row time-row">
                <span class="lbl"><i class="fa-regular fa-calendar-check"></i> กำหนดชำระภายใน:</span>
                <span class="val">${acc.billingOptions.dueAndOverdue.dueDate.replace(' (23:59 น.)', '')} (23:59 น.)</span>
            </div>
            <div class="summary-breakdown-row highlight-blue">
                <span class="lbl">ยอดรวม</span>
                <span class="val bold-val">฿${finalAmount}</span>
            </div>
        `;
    } else if (selectedPaymentType === 'custom') {
        if (customPaymentOption === 'payoff') {
            finalAmount = acc.billingOptions.custom.payoffAmount;
        } else {
            if (customEnteredAmount <= 0) {
                alertSim('ยอดเงินไม่ถูกต้อง', 'กรุณาระบุจำนวนเงินมากกว่า 0.00 บาท');
                return;
            }
            finalAmount = customEnteredAmount.toFixed(2);
        }
        breakdownHtml += `
            <div class="summary-breakdown-row">
                <span class="lbl">ชำระระบุจำนวนเงินเอง</span>
                <span class="val">฿${finalAmount}</span>
            </div>
            <div class="summary-breakdown-row highlight-blue">
                <span class="lbl">ยอดรวม</span>
                <span class="val bold-val">฿${finalAmount}</span>
            </div>
        `;
    }

    openPaymentChannelScreen(finalAmount, breakdownHtml);
}

function openPaymentChannelScreen(finalAmount, breakdownHtml) {
    const channelScreen = document.getElementById('payment-channel-screen');
    const contentArea = document.getElementById('payment-channel-content-area');
    
    if (!channelScreen || !contentArea) return;
    
    contentArea.innerHTML = `
        <div style="font-size: 11px; text-align: center; color: var(--primary); font-weight: 600; margin: -4px 0 14px 0; background-color: var(--primary-light); padding: 8px 12px; border-radius: 10px; border: 1px solid rgba(29, 78, 216, 0.1);">
            <i class="fa-solid fa-circle-info"></i> ข้อมูลอัปเดต ณ วันที่ 26 พ.ค. 2569 (09:44 น.)
        </div>

        <div class="channel-options-list">
            <!-- QR Code Card -->
            <div class="channel-option-card" onclick="openPaymentModal('qrcode', '${finalAmount}')">
                <div class="channel-option-body">
                    <div class="channel-icon-wrapper qr-icon">
                        <i class="fa-solid fa-qrcode"></i>
                    </div>
                    <div class="channel-info">
                        <span class="channel-title">QR Code</span>
                        <span class="channel-desc">บริการชำระเงินผ่าน QR Code ด้วยแอปพลิเคชันทุกธนาคาร</span>
                    </div>
                </div>
                <div class="channel-arrow">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>

            <!-- ATM KTB Card -->
            <div class="channel-option-card" onclick="openPaymentModal('atmktb', '${finalAmount}')">
                <div class="channel-option-body">
                    <div class="channel-icon-wrapper atm-icon">
                        <i class="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div class="channel-info">
                        <span class="channel-title">ตู้ ATM กรุงไทย</span>
                        <span class="channel-desc">บริการชำระเงินผ่านตู้ ATM ธนาคารกรุงไทย</span>
                    </div>
                </div>
                <div class="channel-arrow">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>

            <!-- Agent Card -->
            <div class="channel-option-card" onclick="openPaymentModal('agent', '${finalAmount}')">
                <div class="channel-option-body">
                    <div class="channel-icon-wrapper agent-icon">
                        <i class="fa-solid fa-barcode"></i>
                    </div>
                    <div class="channel-info">
                        <span class="channel-title">ตัวแทนชำระ</span>
                        <span class="channel-desc">บริการชำระผ่านเคาน์เตอร์ธนาคารกรุงไทย หรือเคาน์เตอร์เซอร์วิส</span>
                    </div>
                </div>
                <div class="channel-arrow">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </div>

        <!-- สรุปยอดชำระ Card -->
        <div class="detail-card payment-summary-card">
            <div class="summary-card-header">สรุปยอดชำระ:</div>
            <div class="summary-breakdown-list">
                ${breakdownHtml}
            </div>
        </div>

        <!-- Info note -->
        <div class="channel-info-note">
            <i class="fa-solid fa-circle-info"></i>
            <span>หากชำระผ่าน QR Code ธนาคารกรุงไทย, Krungthai NEXT, ตู้ ATM กรุงไทย และเคาน์เตอร์ธนาคารกรุงไทย จะมีการปรับยอดเงินทันที</span>
        </div>
    `;

    channelScreen.classList.add('open');
}

function closePaymentChannelScreen() {
    document.getElementById('payment-channel-screen').classList.remove('open');
}

function openPaymentModal(method, finalAmount) {
    const overlay = document.getElementById('payment-modal-overlay');
    const modal = document.getElementById('payment-modal');
    const acc = loanAccounts[activeAccountId] || loanAccounts[1];
    
    if (!overlay || !modal) return;
    
    let html = '';
    
    // Format current date and time
    const now = new Date();
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const thaiYear = now.getFullYear() + 543;
    const dateStr = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${thaiYear}`;
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} น.`;
    
    if (method === 'qrcode') {
        html = `
            <div class="modal-header">
                <h3>การชำระผ่าน QR Code</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <div class="modal-amount-row" style="font-size: 12px; text-align: center; margin-bottom: 12px;">
                    ยอดชำระ: <strong style="color: var(--primary); font-size: 15px; font-family: var(--font-number);">${parseFloat(finalAmount.replace(/,/g, '')).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> บาท
                </div>
                
                <div class="modal-qrcode-container" style="display: flex; justify-content: center; margin-bottom: 14px;">
                    <div style="background-color: #fff; border: 1.5px solid var(--border); padding: 12px; border-radius: 16px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <svg class="modal-qrcode-svg" viewBox="0 0 100 100" width="150" height="150">
                            <!-- QR Outer finder pattern top-left -->
                            <rect x="0" y="0" width="30" height="30" fill="#0f172a" rx="4"/>
                            <rect x="5" y="5" width="20" height="20" fill="#ffffff" rx="2"/>
                            <rect x="10" y="10" width="10" height="10" fill="#0f172a" rx="1"/>
                            
                            <!-- QR Outer finder pattern top-right -->
                            <rect x="70" y="0" width="30" height="30" fill="#0f172a" rx="4"/>
                            <rect x="75" y="5" width="20" height="20" fill="#ffffff" rx="2"/>
                            <rect x="80" y="10" width="10" height="10" fill="#0f172a" rx="1"/>
                            
                            <!-- QR Outer finder pattern bottom-left -->
                            <rect x="0" y="70" width="30" height="30" fill="#0f172a" rx="4"/>
                            <rect x="5" y="75" width="20" height="20" fill="#ffffff" rx="2"/>
                            <rect x="10" y="80" width="10" height="10" fill="#0f172a" rx="1"/>
                            
                            <!-- Dummy high-fidelity QR Code blocks -->
                            <rect x="40" y="5" width="10" height="5" fill="#1e3a8a" rx="1"/>
                            <rect x="55" y="10" width="5" height="15" fill="#1d4ed8" rx="1"/>
                            <rect x="40" y="20" width="10" height="10" fill="#0f172a" rx="1"/>
                            
                            <rect x="5" y="40" width="15" height="5" fill="#1e3a8a" rx="1"/>
                            <rect x="25" y="45" width="5" height="10" fill="#0f172a" rx="1"/>
                            
                            <rect x="75" y="40" width="10" height="5" fill="#1d4ed8" rx="1"/>
                            <rect x="90" y="45" width="5" height="15" fill="#0f172a" rx="1"/>
                            
                            <rect x="40" y="40" width="20" height="20" fill="#0f172a" rx="2"/>
                            <rect x="45" y="45" width="10" height="10" fill="#ffffff" rx="1"/>
                            
                            <rect x="5" y="60" width="10" height="5" fill="#1d4ed8" rx="1"/>
                            <rect x="20" y="60" width="10" height="5" fill="#1e3a8a" rx="1"/>
                            
                            <rect x="40" y="70" width="5" height="15" fill="#0f172a" rx="1"/>
                            <rect x="50" y="80" width="15" height="5" fill="#1d4ed8" rx="1"/>
                            <rect x="45" y="90" width="20" height="10" fill="#1e3a8a" rx="1"/>
                            
                            <rect x="75" y="70" width="15" height="15" fill="#0f172a" rx="1"/>
                            <rect x="80" y="75" width="5" height="5" fill="#ffffff" rx="1"/>
                            <rect x="90" y="90" width="10" height="10" fill="#1d4ed8" rx="1"/>
                        </svg>
                    </div>
                </div>

                <div class="modal-details-grid" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; border-top: 1px dashed var(--border); padding-top: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                        <span style="color: var(--dark-muted);">เลขที่บัญชีเงินกู้:</span>
                        <strong style="color: var(--dark); font-family: var(--font-number);">${acc.accountNo.slice(0, 3)}-${acc.accountNo.slice(3, 4)}-${acc.accountNo.slice(4)}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                        <span style="color: var(--dark-muted);">ชื่อ-นามสกุลผู้กู้:</span>
                        <strong style="color: var(--dark);">ทดสอบ ผู้กู้</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                        <span style="color: var(--dark-muted);">ยอดที่ต้องชำระ:</span>
                        <strong style="color: var(--primary); font-family: var(--font-number);">฿${parseFloat(finalAmount.replace(/,/g, '')).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                        <span style="color: var(--dark-muted);">ชำระภายใน:</span>
                        <strong style="color: var(--danger);">${dateStr} 23:59 น.</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 11px;">
                        <span style="color: var(--dark-muted);">เวลาที่ออก QR Code:</span>
                        <strong style="color: var(--dark);">${dateStr} ${timeStr}</strong>
                    </div>
                </div>

                <div class="modal-buttons" style="display: flex; gap: 8px;">
                    <button class="modal-btn-secondary" style="flex: 1; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ปิด</button>
                    <button class="modal-btn-primary" style="flex: 1.5; padding: 10px; border-radius: 10px; border: none; background-color: var(--primary-dark); color: #fff; font-weight: 700; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;" onclick="downloadQrCodeSim()"><i class="fa-solid fa-download"></i> ดาวน์โหลด QR</button>
                </div>
            </div>
        `;
    } 
    else if (method === 'atmktb') {
        html = `
            <div class="modal-header">
                <h3>การชำระผ่าน ATM กรุงไทย</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <div class="modal-amount-row" style="font-size: 12px; text-align: center; margin-bottom: 12px;">
                    ยอดชำระ: <strong style="color: var(--primary); font-size: 15px; font-family: var(--font-number);">${parseFloat(finalAmount.replace(/,/g, '')).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> บาท
                </div>

                <div class="modal-steps" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; border-top: 1px dashed var(--border); padding-top: 12px;">
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">1</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">สอดบัตร ATM และใส่รหัส</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">2</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">เลือก "บริการอื่นๆ" (Others)</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">3</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">เลือก "ชำระหนี้ กยศ./กรอ."</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">4</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">ระบุ "รหัสบัตรประชาชน"</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">5</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">ระบุ "วัน-เดือน-ปีเกิด" (วว/ดด/ปปปป)</span>
                    </div>
                </div>

                <div style="display: flex; gap: 8px; font-size: 9.5px; color: var(--dark-muted); line-height: 1.45; background-color: var(--primary-light); padding: 8px; border-radius: 8px; border: 1px solid rgba(29, 78, 216, 0.1); margin-bottom: 16px;">
                    <i class="fa-solid fa-circle-info" style="color: var(--primary); font-size: 11px; margin-top: 1px;"></i>
                    <span>หากพบปัญหาการชำระเงินผ่านตู้ ATM กรุงไทย กรุณาสอบถามพนักงานกรุงไทย หรือโทร Call Center 02-111-1111</span>
                </div>

                <div class="modal-buttons">
                    <button class="modal-btn-secondary" style="width: 100%; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ปิด</button>
                </div>
            </div>
        `;
    } 
    else if (method === 'agent') {
        html = `
            <div class="modal-header">
                <h3>การชำระผ่านตัวแทนรับชำระ</h3>
                <button class="modal-close-x" onclick="closePaymentModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <div class="modal-amount-row" style="font-size: 12px; text-align: center; margin-bottom: 12px;">
                    ยอดชำระ: <strong style="color: var(--primary); font-size: 15px; font-family: var(--font-number);">${parseFloat(finalAmount.replace(/,/g, '')).toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong> บาท
                </div>

                <div class="modal-steps" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; border-top: 1px dashed var(--border); padding-top: 12px;">
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">1</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">พิมพ์หรือดาวน์โหลดใบแจ้งยอดชำระ</span>
                    </div>
                    <div style="display: flex; align-items: flex-start; gap: 10px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--primary); color: var(--primary); font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;">2</span>
                        <span style="font-size: 11.5px; color: var(--dark); line-height: 1.45;">นำใบแจ้งยอดชำระไปที่เคาน์เตอร์ธนาคารกรุงไทย หรือเคาน์เตอร์เซอร์วิสเพื่อชำระเงิน</span>
                    </div>
                </div>

                <div class="modal-buttons" style="display: flex; gap: 8px;">
                    <button class="modal-btn-secondary" style="flex: 1; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background-color: #fff; color: var(--dark); font-weight: 600; font-size: 12px; cursor: pointer;" onclick="closePaymentModal()">ปิด</button>
                    <button class="modal-btn-primary" style="flex: 1.5; padding: 10px; border-radius: 10px; border: none; background-color: var(--primary-dark); color: #fff; font-weight: 700; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;" onclick="printAgentInvoiceSim()"><i class="fa-solid fa-print"></i> พิมพ์ใบแจ้งยอดชำระ</button>
                </div>
            </div>
        `;
    }
    
    modal.innerHTML = html;
    overlay.classList.add('open');
}

function closePaymentModal() {
    document.getElementById('payment-modal-overlay').classList.remove('open');
}

function downloadQrCodeSim() {
    alertSim('กำลังดาวน์โหลด QR Code', 'ระบบกำลังบันทึกรูปภาพ QR Code ไปยังคลังภาพของคุณ...');
    setTimeout(() => {
        alertSim('ดาวน์โหลดสำเร็จ', 'บันทึกรูปภาพ QR Code ลงในคลังภาพเรียบร้อยแล้ว!');
        closePaymentModal();
        closePaymentChannelScreen();
        closePaymentScreen();
        closeDetailScreen();
    }, 1500);
}

function printAgentInvoiceSim() {
    alertSim('กำลังพิมพ์ใบแจ้งยอดชำระ', 'กำลังสร้างไฟล์ใบแจ้งชำระเงิน (Barcode/QR) ในรูปแบบ PDF...');
    setTimeout(() => {
        alertSim('สร้างไฟล์สำเร็จ', 'ดาวน์โหลดใบแจ้งชำระเงิน DSL_Invoice.pdf เรียบร้อย!');
        closePaymentModal();
        closePaymentChannelScreen();
        closePaymentScreen();
        closeDetailScreen();
    }, 1500);
}

// CTA DIRECT HANDLER
function handleAction(actionType, accountNo) {
    if (actionType === 'refund') {
        alertSim('ทำเรื่องขอเงินคืนบริจาค', `ส่งคำร้องสิทธิ์ขอคืนเงินบริจาคสะสม ฿2,500.00 บัญชี #${accountNo} เรียบร้อยแล้ว`);
    }
}

// NOTIFICATION BELL DRAWER
function triggerNotification() {
    closeAllDrawers();
    document.getElementById('app-overlay').classList.add('open');
    document.getElementById('notification-drawer').classList.add('open');
    const dot = document.querySelector('.badge-dot');
    if (dot) dot.style.display = 'none';
}

// MENU TOGGLE
function toggleAppMenu() {
    closeAllDrawers();
    document.getElementById('app-overlay').classList.add('open');
    document.getElementById('menu-drawer').classList.add('open');
}

// CLOSE DRAWERS
function closeAllDrawers() {
    document.getElementById('app-overlay').classList.remove('open');
    document.getElementById('notification-drawer').classList.remove('open');
    document.getElementById('menu-drawer').classList.remove('open');
}

// WARNING POPUP FOR SYSTEM CHECKS
function showSectionUnderDev(menuName) {
    closeAllDrawers();
    alertSim('ระบบจำลอง', `เมนู "${menuName}" อยู่ระหว่างการพัฒนาเชื่อมต่อระบบของกองทุน`);
}



// INTERACTIVE HEADER ACCOUNT SELECTOR DROPDOWN
function toggleAccountDropdown(event) {
    if (event) event.stopPropagation();
    const container = document.querySelector('.account-selector-container');
    const dropdown = document.getElementById('account-dropdown');
    
    if (container && dropdown) {
        const isOpen = container.classList.contains('open');
        if (isOpen) {
            container.classList.remove('open');
            dropdown.classList.remove('open');
        } else {
            container.classList.add('open');
            dropdown.classList.add('open');
        }
    }
}

function switchActiveAccount(accountId) {
    const container = document.querySelector('.account-selector-container');
    const dropdown = document.getElementById('account-dropdown');
    
    if (container && dropdown) {
        container.classList.remove('open');
        dropdown.classList.remove('open');
    }
    
    // Smoothly show detailed card view for the selected account
    navigateToDetail(accountId);
    
    alertSim('สลับบัญชีเงินกู้', `ระบบทำการแสดงผลรายละเอียด บัญชี #${loanAccounts[accountId].accountNo} เรียบร้อยแล้ว`);
}

// Global portal router for aggregate payments (e.g. Pay All)
function openPaymentPortal(type, amount) {
    const targetId = activeAccountId || 1;
    openPaymentScreen(targetId);
}

// Global click event to close dropdown if clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.account-selector-container');
    const dropdown = document.getElementById('account-dropdown');
    
    if (container && dropdown && !container.contains(event.target)) {
        container.classList.remove('open');
        dropdown.classList.remove('open');
    }
});

// Expose functions globally to window so that inline HTML onclick event handlers can access them
window.switchTab = switchTab;
window.navigateToDetail = navigateToDetail;
window.closeDetailScreen = closeDetailScreen;
window.toggleTransactionExpansion = toggleTransactionExpansion;
window.downloadStatementSim = downloadStatementSim;
window.downloadReceiptSim = downloadReceiptSim;
window.openHistoryTimelineScreen = openHistoryTimelineScreen;
window.closeHistoryTimelineScreen = closeHistoryTimelineScreen;
window.openPaymentScreen = openPaymentScreen;
window.selectPaymentTab = selectPaymentTab;
window.renderBreakdownDetails = renderBreakdownDetails;
window.selectCustomPayOption = selectCustomPayOption;
window.handleCustomAmountInput = handleCustomAmountInput;
window.closePaymentScreen = closePaymentScreen;
window.submitPayment = submitPayment;
window.closePaymentChannelScreen = closePaymentChannelScreen;
window.openPaymentChannelScreen = openPaymentChannelScreen;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.downloadQrCodeSim = downloadQrCodeSim;
window.printAgentInvoiceSim = printAgentInvoiceSim;
window.handleAction = handleAction;
window.triggerNotification = triggerNotification;
window.toggleAppMenu = toggleAppMenu;
window.closeAllDrawers = closeAllDrawers;
window.showSectionUnderDev = showSectionUnderDev;

window.toggleAccountDropdown = toggleAccountDropdown;
window.switchActiveAccount = switchActiveAccount;
window.openPaymentPortal = openPaymentPortal;

// ==========================================
// NEW PORTAL NAVIGATION & INTERACTIVE FLOWS
// ==========================================

function navigateToPortal() {
    // Portal view has been removed — redirect to dashboard instead
    navigateToDashboard();
}

function navigateToDashboard() {
    // Hide the desktop web portal container
    const webPortal = document.getElementById('web-portal-view');
    if (webPortal) {
        webPortal.classList.remove('active');
    }
    
    // Show the phone shell container
    const phoneShell = document.getElementById('phone-shell-container');
    if (phoneShell) {
        phoneShell.style.display = 'flex';
    }
    
    // Show the floating web back button
    const backBtn = document.getElementById('web-portal-control');
    if (backBtn) {
        backBtn.classList.add('visible');
    }
    
    // Hide all internal phone views, show the Dashboard view
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
    });
    const dashboardView = document.getElementById('dashboard-view');
    if (dashboardView) {
        dashboardView.classList.add('active');
    }
    
    // Manage header states (Show account selector)
    const accSelector = document.querySelector('.account-selector-container');
    if (accSelector) {
        accSelector.style.display = 'inline-block';
        setTimeout(() => {
            accSelector.style.opacity = '1';
        }, 50);
    }
    

    
    // Set Active Bottom Tab to home
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    const homeTab = document.getElementById('nav-home');
    if (homeTab) homeTab.classList.add('active');
}

function openNewFlow(flowId) {
    // Hide the desktop web portal container
    const webPortal = document.getElementById('web-portal-view');
    if (webPortal) {
        webPortal.classList.remove('active');
    }
    
    // Show the phone shell container
    const phoneShell = document.getElementById('phone-shell-container');
    if (phoneShell) {
        phoneShell.style.display = 'flex';
    }
    
    // Show the floating web back button
    const backBtn = document.getElementById('web-portal-control');
    if (backBtn) {
        backBtn.classList.add('visible');
    }
    
    // Hide all internal phone views, show the target flow view
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
    });
    const flowView = document.getElementById(`${flowId}-view`);
    if (flowView) {
        flowView.classList.add('active');
    }
    
    // Manage header states (Hide account selector during other mock flows)
    const accSelector = document.querySelector('.account-selector-container');
    if (accSelector) {
        accSelector.style.display = 'none';
        accSelector.style.opacity = '0';
    }
    

    
    // Initialize New Borrower form if clicked
    if (flowId === 'new-borrower') {
        resetNbForm();
    }
}

// NEW BORROWER STEPPER INTERACTION
let activeNbStep = 1;

function resetNbForm() {
    activeNbStep = 1;
    updateNbStepUI();
}

function nextNbStep(currentStep) {
    if (currentStep < 4) {
        activeNbStep = currentStep + 1;
        updateNbStepUI();
    }
}

function prevNbStep(currentStep) {
    if (currentStep > 1) {
        activeNbStep = currentStep - 1;
        updateNbStepUI();
    }
}

function updateNbStepUI() {
    // Update active content pane
    document.querySelectorAll('#new-borrower-view .step-content-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    const activePane = document.getElementById(`nb-step-${activeNbStep}`);
    if (activePane) activePane.classList.add('active');
    
    // Update step dots
    document.querySelectorAll('#new-borrower-view .step-dot').forEach((dot, idx) => {
        const stepNum = idx + 1;
        dot.classList.remove('active', 'completed');
        if (stepNum === activeNbStep) {
            dot.classList.add('active');
        } else if (stepNum < activeNbStep) {
            dot.classList.add('completed');
        }
    });
    
    // Update progress bar width
    const progressPercent = ((activeNbStep - 1) / 3) * 100;
    const progressLine = document.getElementById('nb-progress');
    if (progressLine) {
        progressLine.style.width = `${progressPercent}%`;
    }
}

function submitNbApplication() {
    alertSim('ส่งใบสมัครกู้ยืมสำเร็จ', 'กองทุนได้รับข้อมูลการขอกู้รายใหม่เรียบร้อย จะส่งให้สถานศึกษาพิจารณาใน 48 ชม.');
    setTimeout(() => {
        navigateToDashboard();
    }, 2000);
}

// GENERAL CALCULATOR LOGIC
function runSimCalc() {
    const pInput = document.getElementById('calc-principal');
    const yInput = document.getElementById('calc-years');
    
    if (!pInput || !yInput) return;
    
    let principal = parseFloat(pInput.value);
    let years = parseInt(yInput.value);
    
    if (isNaN(principal) || principal <= 0) {
        principal = 100000;
    }
    
    const annualRepay = principal / years;
    const interest = principal * 0.01; // 1% interest rate
    const penalty = principal * 0.005; // 0.5% penalty rate
    
    const annualRes = document.getElementById('calc-res-annual');
    const interestRes = document.getElementById('calc-res-interest');
    const penaltyRes = document.getElementById('calc-res-penalty');
    
    if (annualRes) annualRes.textContent = `฿${annualRepay.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})} / ปี`;
    if (interestRes) interestRes.textContent = `฿${interest.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})} / ปี`;
    if (penaltyRes) penaltyRes.textContent = `฿${penalty.toLocaleString('th-TH', {minimumFractionDigits: 2, maximumFractionDigits: 2})} / ปี`;
}

// Expose new functions globally
window.navigateToPortal = navigateToPortal;
window.navigateToDashboard = navigateToDashboard;
window.openNewFlow = openNewFlow;
window.nextNbStep = nextNbStep;
window.prevNbStep = prevNbStep;
window.submitNbApplication = submitNbApplication;
window.runSimCalc = runSimCalc;

// ==========================================
// SHOWCASE DIRECTORY SEARCH LOGIC
// ==========================================
function filterPortalCards() {
    const searchInput = document.getElementById('flow-search-input');
    const searchVal = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cards = document.querySelectorAll('.web-portal-list-item');
    let visibleCount = 0;

    cards.forEach(card => {
        const keywords = card.getAttribute('data-keywords') || '';
        const title = card.querySelector('.wpli-name') ? card.querySelector('.wpli-name').textContent.toLowerCase() : '';
        
        const matchSearch = !searchVal || 
                            title.includes(searchVal) || 
                            keywords.includes(searchVal);

        if (matchSearch) {
            card.style.display = 'flex';
            // Smoothly animate showing the card
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            // Hide the card after the opacity transition ends
            setTimeout(() => {
                card.style.display = 'none';
            }, 200);
        }
    });

    const noResults = document.getElementById('portal-no-results');
    if (noResults) {
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            setTimeout(() => {
                noResults.style.opacity = '1';
            }, 10);
        } else {
            noResults.style.opacity = '0';
            setTimeout(() => {
                noResults.style.display = 'none';
            }, 200);
        }
    }
}

function resetPortalSearch() {
    const searchInput = document.getElementById('flow-search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Immediately show all items with reset states
    const cards = document.querySelectorAll('.web-portal-list-item');
    cards.forEach(card => {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });
    
    const noResults = document.getElementById('portal-no-results');
    if (noResults) {
        noResults.style.opacity = '0';
        noResults.style.display = 'none';
    }
}

// Expose filters to window
window.filterPortalCards = filterPortalCards;
window.resetPortalSearch = resetPortalSearch;

// INITIALIZE ON LOAD
function initApp() {
    navigateToDashboard();
    runSimCalc();

    // Bind payment button programmatically to ensure it works on all configurations
    const payBtn = document.getElementById('sticky-pay-btn');
    if (payBtn) {
        payBtn.addEventListener('click', (e) => {
            e.preventDefault();
            submitPayment();
        });
    }

    // Bind back button programmatically for payment channel screen
    const channelBackBtn = document.querySelector('#payment-channel-screen .back-btn');
    if (channelBackBtn) {
        channelBackBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closePaymentChannelScreen();
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

