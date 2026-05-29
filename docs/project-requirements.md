# แผนการพัฒนาระบบ Preview UX/UI Design

## สำหรับ Website, Admin Website และ Mobile App

## 1. ชื่อระบบเบื้องต้น

**UX/UI Preview Hub**

หรือชื่อภาษาไทย:

**ระบบศูนย์กลางตัวอย่างหน้าจอ UX/UI**

ระบบนี้เป็นระบบภายในบริษัท สำหรับจัดเก็บ แสดงผล ตรวจสอบ และส่งต่อหน้าตัวอย่าง UX/UI Design ในรูปแบบ HTML Preview ให้ทีม Dev หรือ AI Coding Agent นำไปพัฒนาต่อ โดยรองรับทั้ง Website, Admin Website และ Mobile App

---

# 2. วัตถุประสงค์ของระบบ

## 2.1 วัตถุประสงค์หลัก

1. เพื่อรวบรวมหน้าตัวอย่าง UX/UI Design ของแต่ละโปรเจกต์ไว้ในที่เดียว
2. เพื่อให้ทีมงานตรวจสอบ Mood & Tone, Layout, Style และ Flow ก่อนเริ่มพัฒนาจริง
3. เพื่อให้ Dev สามารถดูตัวอย่างหน้าจอจาก HTML Preview ได้อย่างชัดเจน
4. เพื่อให้สามารถส่ง HTML, Spec และ Prompt ให้ AI ช่วยพัฒนาต่อได้ง่าย
5. เพื่อแยก Project, Module, Feature, Flow และ Screen อย่างเป็นระบบ
6. เพื่อระบุผู้รับผิดชอบและสถานะของแต่ละหน้าจอได้
7. เพื่อช่วยลดปัญหาการตีความผิดระหว่าง SA, UX/UI, Dev และ AI

---

# 3. ขอบเขตของระบบ

## 3.1 ระบบที่รองรับ

ระบบ Preview Hub ต้องรองรับการจัดการ UX/UI Preview สำหรับ

1. Public Website
2. Admin Website / Back Office
3. Mobile App
4. Shared Components
5. User Flow
6. Design System เบื้องต้น

---

## 3.2 สิ่งที่ระบบต้องจัดการได้

1. จัดการ Project
2. จัดการ Module
3. จัดการ Feature
4. จัดการ Flow
5. จัดการ Screen / Page
6. แสดง HTML Preview
7. แสดง Spec สำหรับ Dev
8. แสดง Prompt สำหรับ AI
9. Filter รายการตาม Project, Module, Feature, Platform, Status, Assignee
10. กำหนดผู้รับผิดชอบ
11. กำหนดสถานะของงาน
12. เปิด Preview แบบ Desktop, Tablet, Mobile
13. Copy Prompt สำหรับส่งให้ AI
14. Export หรือ Download ไฟล์ที่เกี่ยวข้อง
15. เก็บ Version ของแต่ละหน้าจอในอนาคต

---

# 4. แนวคิดโครงสร้างข้อมูลของระบบ

ระบบควรจัดโครงสร้างข้อมูลตามลำดับนี้

```text
Project
  └── Platform
        └── Module
              └── Feature
                    └── Flow
                          └── Screen / Page
                                ├── HTML Preview
                                ├── Spec
                                ├── Prompt
                                └── Metadata
```

ตัวอย่าง:

```text
ระบบ อบต.
  └── Admin Website
        └── News Management
              └── Create News
                    └── Flow: เจ้าหน้าที่เพิ่มข่าวใหม่
                          ├── Screen: รายการข่าว
                          ├── Screen: เพิ่มข่าวใหม่
                          ├── Screen: Preview ข่าว
                          └── Screen: เผยแพร่สำเร็จ
```

---

# 5. Tech Stack ที่แนะนำสำหรับ MVP

## 5.1 Frontend

แนะนำใช้

```text
Next.js + React + TypeScript
```

เหตุผล:

1. ทำระบบภายในได้เร็ว
2. รองรับการทำ Dashboard และ Filter ได้ดี
3. แสดง HTML Preview ผ่าน iframe ได้ง่าย
4. อ่านไฟล์ JSON / Markdown ได้สะดวก
5. Dev สามารถนำโครงสร้างไปต่อยอดเป็นระบบจริงได้
6. ใช้ร่วมกับ AI Coding Agent ได้ดี

---

## 5.2 Styling

แนะนำใช้

```text
Tailwind CSS
```

เหตุผล:

1. ทำ UI ได้เร็ว
2. คุม Design System ได้ง่าย
3. เหมาะกับ Prototype และ Internal Tool
4. AI Coding Agent เข้าใจและแก้ต่อได้ง่าย

---

## 5.3 Data Storage สำหรับ MVP

ช่วงแรกยังไม่จำเป็นต้องใช้ Database

ให้ใช้ไฟล์เหล่านี้ก่อน

```text
metadata.json
spec.md
prompt.md
index.html
```

ข้อดี:

1. ทำระบบทดลองได้เร็ว
2. ใช้ GitHub เก็บ Version ได้ทันที
3. ไม่ต้องออกแบบ Database ตั้งแต่แรก
4. Dev และ AI อ่านไฟล์ต่อได้ง่าย
5. ย้ายไป Database ภายหลังได้

---

## 5.4 Version Control

ใช้

```text
GitHub Repository
```

เก็บทั้ง

1. Source code ของ Preview Hub
2. ไฟล์ HTML Preview
3. Spec
4. Prompt
5. Metadata
6. Design System
7. Change log

---

# 6. โครงสร้าง Folder ที่แนะนำ

## 6.1 โครงสร้างหลักของโปรเจกต์

```text
ux-preview-hub/
  app/
    page.tsx
    projects/
      page.tsx
      [projectId]/
        page.tsx
        screens/
          page.tsx
          [screenId]/
            page.tsx
    flows/
      page.tsx
    components/
      page.tsx

  components/
    layout/
    dashboard/
    preview/
    filters/
    cards/
    tables/

  lib/
    data.ts
    metadata.ts
    markdown.ts
    filters.ts

  data/
    projects/
      obt-system/
        project.json
        public-website/
        admin-website/
        mobile-app/

  public/
    previews/
      obt-system/
        admin-website/
          news-list/
            index.html
          create-news/
            index.html

  styles/
    globals.css
```

---

## 6.2 โครงสร้างข้อมูลของแต่ละ Screen

```text
data/
  projects/
    obt-system/
      admin-website/
        news-management/
          create-news/
            metadata.json
            spec.md
            prompt.md
```

และ HTML Preview แยกไว้ใน public

```text
public/
  previews/
    obt-system/
      admin-website/
        news-management/
          create-news/
            index.html
```

---

# 7. ไฟล์สำคัญของแต่ละหน้าจอ

แต่ละ Screen ควรมีไฟล์หลัก 4 ไฟล์

```text
metadata.json
spec.md
prompt.md
index.html
```

---

## 7.1 metadata.json

ใช้เก็บข้อมูลสำหรับให้ระบบนำไปแสดงในหน้ารวมรายการและใช้ Filter

ตัวอย่าง:

```json
{
  "screenId": "ADM-NEWS-002",
  "screenName": "หน้าเพิ่มข่าวประชาสัมพันธ์",
  "projectId": "obt-system",
  "projectName": "ระบบ อบต.",
  "platform": "admin-web",
  "module": "news-management",
  "moduleName": "จัดการข่าวประชาสัมพันธ์",
  "feature": "create-news",
  "featureName": "เพิ่มข่าวใหม่",
  "flowId": "FLOW-NEWS-001",
  "flowName": "เจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์",
  "description": "หน้าสำหรับเจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์ พร้อมอัปโหลดรูป ตั้งค่าวันเผยแพร่ และบันทึกฉบับร่าง",
  "assignee": "Dev A",
  "reviewer": "UX Lead",
  "status": "in-review",
  "priority": "high",
  "version": "0.2.0",
  "previewPath": "/previews/obt-system/admin-website/news-management/create-news/index.html",
  "specPath": "/data/projects/obt-system/admin-website/news-management/create-news/spec.md",
  "promptPath": "/data/projects/obt-system/admin-website/news-management/create-news/prompt.md",
  "tags": ["news", "form", "admin", "content-management"],
  "createdAt": "2026-05-29",
  "updatedAt": "2026-05-29"
}
```

---

## 7.2 spec.md

ใช้เป็นรายละเอียดให้ Dev เข้าใจหน้าจอนั้น

ตัวอย่าง:

```markdown
# Screen Spec: หน้าเพิ่มข่าวประชาสัมพันธ์

## 1. วัตถุประสงค์ของหน้า

หน้านี้ใช้สำหรับให้เจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์ใหม่เข้าสู่ระบบ โดยสามารถกรอกหัวข้อข่าว รายละเอียดข่าว อัปโหลดรูปภาพ ตั้งค่าวันเผยแพร่ และเลือกสถานะของข่าวได้

## 2. ผู้ใช้งานหลัก

- เจ้าหน้าที่ประชาสัมพันธ์
- ผู้ดูแลระบบ
- เจ้าหน้าที่ฝ่ายข้อมูลข่าวสาร

## 3. องค์ประกอบหลักของหน้า

### 3.1 Header

- ชื่อหน้า: เพิ่มข่าวประชาสัมพันธ์
- Breadcrumb: Dashboard / ข่าวประชาสัมพันธ์ / เพิ่มข่าวใหม่
- ปุ่มย้อนกลับ

### 3.2 Form

ฟิลด์ที่ต้องมี:

1. หัวข้อข่าว
2. หมวดหมู่ข่าว
3. รายละเอียดย่อ
4. รายละเอียดข่าว
5. รูปภาพหน้าปก
6. ไฟล์แนบ
7. วันที่เผยแพร่
8. สถานะข่าว

### 3.3 Action Button

- บันทึกฉบับร่าง
- Preview
- เผยแพร่
- ยกเลิก

## 4. Validation

- หัวข้อข่าว: จำเป็นต้องกรอก
- หมวดหมู่ข่าว: จำเป็นต้องเลือก
- รายละเอียดข่าว: จำเป็นต้องกรอก
- รูปภาพหน้าปก: รองรับ JPG, PNG ขนาดไม่เกิน 5 MB
- วันที่เผยแพร่: ต้องไม่ย้อนหลังเกินวันที่ปัจจุบัน

## 5. State ที่ต้องรองรับ

- Empty State
- Loading State
- Error State
- Success State
- Validation Error
- Uploading State

## 6. API Mapping เบื้องต้น

- GET /api/news/categories
- POST /api/news
- POST /api/uploads
- GET /api/news/:id/preview

## 7. Permission

ผู้ที่สามารถใช้งานหน้านี้ได้:

- Admin
- Editor
- PR Officer

## 8. Responsive Behavior

Desktop:

- แสดง Form เต็มพื้นที่
- ปุ่ม Action อยู่ด้านขวาบนหรือขวาล่าง

Tablet:

- Form ย่อเป็น 1 Column

Mobile:

- Form เป็น 1 Column
- ปุ่ม Action แสดงแบบ Sticky Bottom
```

---

## 7.3 prompt.md

ใช้เป็น Prompt สำหรับส่งให้ AI Coding Agent

ตัวอย่าง:

```markdown
You are a senior frontend developer.

Use the attached HTML preview as the source of truth for visual design.

Please convert this HTML preview into a production-ready frontend page.

Requirements:

1. Keep the layout, spacing, typography, color, and visual hierarchy as close as possible to the HTML preview.
2. Convert static HTML into reusable components.
3. Use clean and maintainable code.
4. Implement responsive behavior for desktop, tablet, and mobile.
5. Implement form validation based on the screen spec.
6. Implement loading, empty, error, success, and validation states.
7. Do not change the design unless required by functionality.
8. Use the metadata and screen spec as supporting requirements.

Target framework:

- Next.js
- React
- TypeScript
- Tailwind CSS

Screen information:

- Project: ระบบ อบต.
- Platform: Admin Website
- Module: News Management
- Feature: Create News
- Screen ID: ADM-NEWS-002
```

---

## 7.4 index.html

ใช้เป็น HTML Preview ที่เปิดดูได้ทันที

ตัวอย่างโครงสร้าง:

```html
<!DOCTYPE html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>หน้าเพิ่มข่าวประชาสัมพันธ์</title>
    <link rel="stylesheet" href="/preview-assets/design-system.css" />
  </head>
  <body>
    <main class="page">
      <header class="page-header">
        <div>
          <p class="breadcrumb">
            Dashboard / ข่าวประชาสัมพันธ์ / เพิ่มข่าวใหม่
          </p>
          <h1>เพิ่มข่าวประชาสัมพันธ์</h1>
        </div>
        <button class="btn secondary">ย้อนกลับ</button>
      </header>

      <section class="card">
        <form>
          <label>
            หัวข้อข่าว
            <input type="text" placeholder="กรอกหัวข้อข่าว" />
          </label>

          <label>
            หมวดหมู่ข่าว
            <select>
              <option>เลือกหมวดหมู่</option>
              <option>ข่าวประชาสัมพันธ์</option>
              <option>ประกาศ</option>
            </select>
          </label>

          <label>
            รายละเอียดข่าว
            <textarea placeholder="กรอกรายละเอียดข่าว"></textarea>
          </label>

          <div class="actions">
            <button type="button" class="btn secondary">บันทึกฉบับร่าง</button>
            <button type="button" class="btn secondary">Preview</button>
            <button type="submit" class="btn primary">เผยแพร่</button>
          </div>
        </form>
      </section>
    </main>
  </body>
</html>
```

---

# 8. หน้าจอของระบบ Preview Hub

## 8.1 Login Page

สำหรับเข้าใช้งานภายในบริษัท

ข้อมูลที่ต้องมี:

- Email
- Password
- Login Button

MVP อาจยังไม่ต้องทำระบบ Login จริง ใช้ Mock Login หรือข้ามไปก่อนก็ได้

---

## 8.2 Project List Page

หน้ารวมโปรเจกต์ทั้งหมด

ข้อมูลที่แสดง:

- Project Name
- Project Type
- Description
- จำนวน Module
- จำนวน Feature
- จำนวน Screen
- จำนวน Flow
- Progress
- Status
- Last Updated

ตัวอย่าง Card:

```text
ระบบ อบต.
Website / Admin Website / Mobile App

Modules: 12
Features: 48
Screens: 126
Flows: 24

Progress: 35%
Status: In Progress

[Open Project]
```

---

## 8.3 Project Overview Page

เมื่อกดเข้าโปรเจกต์ จะแสดงภาพรวมของโปรเจกต์นั้น

ข้อมูลที่ควรมี:

1. Project Name
2. Description
3. Platform ที่มีในโปรเจกต์
4. จำนวน Module
5. จำนวน Feature
6. จำนวน Screen
7. จำนวน Flow
8. Progress ตาม Status
9. รายการ Screen ล่าสุด
10. รายการที่รอตรวจ
11. รายการที่ Approved แล้ว

---

## 8.4 Module List Page

แสดง Module ทั้งหมดของโปรเจกต์

ตัวอย่าง Module:

```text
Public Website
- Home
- News
- About
- Service
- Download
- Contact

Admin Website
- Dashboard
- News Management
- User Management
- Request Management
- Report

Mobile App
- Home
- Complaint
- Tracking
- Notification
- Profile
```

---

## 8.5 Feature List Page

แสดง Feature แยกตาม Module

ข้อมูลที่ควรมี:

- Feature Name
- Module
- Platform
- Description
- Owner
- Status
- Related Screens
- Related Flows

---

## 8.6 Flow List Page

แสดง Flow การใช้งาน

ตัวอย่าง:

```text
FLOW-NEWS-001: เจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์
FLOW-REQ-001: ประชาชนแจ้งเรื่องร้องเรียน
FLOW-USER-001: ผู้ดูแลระบบเพิ่มผู้ใช้งาน
```

ข้อมูลที่ควรมี:

- Flow ID
- Flow Name
- Project
- Platform
- Module
- Feature
- Number of Steps
- Status
- Owner
- Preview Flow Button

---

## 8.7 Screen Library Page

หน้านี้เป็นหัวใจหลักของระบบ

เป็นหน้ารวม Screen ทั้งหมด พร้อม Filter

Filter ที่ควรมี:

1. Project
2. Platform
3. Module
4. Feature
5. Flow
6. Assignee
7. Reviewer
8. Status
9. Priority
10. Version
11. Updated Date
12. Tags

ข้อมูลในตาราง:

```text
Screen ID
Screen Name
Project
Platform
Module
Feature
Flow
Assignee
Status
Version
Updated Date
Action
```

Action ที่ควรมี:

```text
View Preview
View Spec
Copy Prompt
Open HTML
```

---

## 8.8 Screen Detail / Preview Viewer Page

หน้านี้ใช้ดูรายละเอียดของแต่ละ Screen

ส่วนประกอบของหน้า:

### Header

- Screen Name
- Screen ID
- Status Badge
- Version
- Assignee
- Last Updated

### Toolbar

- Desktop View
- Tablet View
- Mobile View
- Fullscreen
- Open HTML
- Copy Prompt
- Download Package

### Preview Area

แสดง HTML Preview ด้วย iframe

```html
<iframe
  src="/previews/obt-system/admin-website/news-management/create-news/index.html"
></iframe>
```

### Tabs

1. Overview
2. Spec
3. Prompt
4. Flow
5. Comments
6. Version History

---

## 8.9 Flow Preview Page

แสดง Flow แบบ Step-by-step

ตัวอย่าง:

```text
Flow: เจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์

Step 1: Dashboard
Step 2: รายการข่าว
Step 3: เพิ่มข่าวใหม่
Step 4: Preview ข่าว
Step 5: เผยแพร่สำเร็จ
```

แต่ละ Step ควรมี:

- Screen Name
- Screen ID
- Thumbnail หรือ Preview ขนาดย่อ
- View Preview Button
- Status
- Assignee

---

## 8.10 Assignee Board

หน้าแสดงงานแยกตามผู้รับผิดชอบ

ตัวอย่าง:

```text
Dev A
- ADM-NEWS-002 หน้าเพิ่มข่าว
- ADM-USER-001 หน้าจัดการผู้ใช้

UX Team
- WEB-HOME-001 หน้าแรกเว็บไซต์
- APP-HOME-001 หน้าแรก Mobile App

Product Owner
- FLOW-NEWS-001 Flow เพิ่มข่าว
```

ใช้สำหรับดูว่าคนใดรับผิดชอบอะไรอยู่

---

# 9. สถานะของงาน

ควรกำหนด Status มาตรฐานดังนี้

```text
draft
ready-for-review
in-review
need-revision
approved
in-development
developed
deprecated
```

## ความหมายของแต่ละสถานะ

### Draft

กำลังร่าง ยังไม่พร้อมตรวจ

### Ready for Review

ทำ Preview เบื้องต้นเสร็จแล้ว พร้อมให้ตรวจ

### In Review

กำลังอยู่ระหว่างการตรวจสอบ

### Need Revision

ตรวจแล้วต้องแก้ไข

### Approved

ผ่านการตรวจแล้ว ใช้เป็นต้นแบบในการพัฒนาต่อได้

### In Development

Dev กำลังนำไปพัฒนาจริง

### Developed

พัฒนาเสร็จแล้ว

### Deprecated

ยกเลิกการใช้ หรือมีเวอร์ชันใหม่แทนแล้ว

---

# 10. Role ของผู้ใช้งาน

## 10.1 Admin

สิทธิ์:

- จัดการผู้ใช้งาน
- จัดการ Project
- ตั้งค่า Role
- จัดการระบบทั้งหมด

## 10.2 Product Owner / SA

สิทธิ์:

- สร้าง Project
- สร้าง Module
- สร้าง Feature
- สร้าง Flow
- เขียน Requirement
- ตรวจสอบความครบถ้วนของ Business Flow

## 10.3 UX/UI Designer

สิทธิ์:

- สร้าง HTML Preview
- แก้ไข HTML Preview
- เขียน Design Spec
- อัปเดต Mood & Tone
- แก้ไขตาม Comment

## 10.4 Developer

สิทธิ์:

- ดู HTML Preview
- ดู Spec
- Copy Prompt
- Download Package
- อัปเดตสถานะ In Development / Developed

## 10.5 Reviewer / Approver

สิทธิ์:

- ตรวจ Preview
- Comment
- Approve
- Reject
- เปลี่ยนสถานะเป็น Need Revision หรือ Approved

---

# 11. User Flow การใช้งานระบบ

## 11.1 Flow: สร้างหน้าจอใหม่

```text
1. Product Owner / SA เข้า Project
2. เลือก Module
3. สร้าง Feature
4. สร้าง Flow ถ้ามี
5. สร้าง Screen ใหม่
6. กรอก Metadata
7. แนบ HTML Preview
8. เขียน Spec
9. เขียน Prompt
10. ตั้งสถานะ Draft หรือ Ready for Review
```

---

## 11.2 Flow: ตรวจสอบหน้าจอ

```text
1. Reviewer เข้า Screen Library
2. Filter เฉพาะ Status: Ready for Review
3. กดเข้า Screen Detail
4. ดู Preview แบบ Desktop / Tablet / Mobile
5. อ่าน Spec
6. ตรวจ Flow ที่เกี่ยวข้อง
7. Comment ถ้าต้องแก้
8. เปลี่ยนสถานะเป็น Need Revision หรือ Approved
```

---

## 11.3 Flow: Dev นำไปพัฒนาต่อ

```text
1. Dev เข้า Screen Library
2. Filter Status: Approved
3. เลือก Screen ที่รับผิดชอบ
4. เปิด HTML Preview
5. อ่าน Spec
6. Copy Prompt
7. ส่ง HTML + Spec + Prompt ให้ AI Coding Agent
8. นำผลลัพธ์ไปพัฒนาต่อในระบบจริง
9. เปลี่ยนสถานะเป็น In Development
10. เมื่อทำเสร็จ เปลี่ยนเป็น Developed
```

---

## 11.4 Flow: AI Coding Handoff

```text
1. เปิดหน้า Screen Detail
2. กด Copy AI Prompt
3. Download HTML Preview หรือ Copy HTML
4. ส่งให้ AI Coding Agent
5. AI แปลงเป็น Next.js / Flutter / Vue ตามที่กำหนด
6. Dev ตรวจ Code
7. Dev ปรับ Logic, API, Validation และ State
8. Commit เข้าระบบจริง
```

---

# 12. Feature ที่ควรทำใน MVP

MVP ควรทำเฉพาะสิ่งที่จำเป็นต่อการทดลองใช้งานจริงก่อน

## 12.1 Feature หลักของ MVP

1. Project List
2. Project Overview
3. Screen Library
4. Filter Screen
5. Screen Detail
6. HTML Preview ผ่าน iframe
7. Desktop / Tablet / Mobile Toggle
8. อ่าน metadata.json
9. แสดง spec.md
10. แสดง prompt.md
11. Copy Prompt
12. Open HTML Preview
13. Status Badge
14. Assignee Display
15. Mock Data หรือ File-based Data

---

## 12.2 Feature ที่ยังไม่ต้องทำใน MVP

ยังไม่จำเป็นต้องทำทันที:

1. Login จริง
2. Database
3. Comment แบบ Real-time
4. Upload File ผ่านหน้าเว็บ
5. Version Compare
6. Permission ซับซ้อน
7. Notification
8. Export ZIP
9. เชื่อม Jira / GitHub Projects
10. AI Generate Prompt อัตโนมัติ

---

# 13. Phase การพัฒนา

## Phase 1: Setup Project Structure

เป้าหมาย:

สร้างโครงสร้างระบบพื้นฐานให้รันได้

งานที่ต้องทำ:

1. สร้าง Next.js Project
2. ติดตั้ง TypeScript
3. ติดตั้ง Tailwind CSS
4. สร้าง Layout หลัก
5. สร้าง Sidebar / Header
6. สร้างหน้า Home
7. สร้างโครงสร้าง Folder data และ public/previews
8. สร้าง Mock Project 1 โปรเจกต์
9. สร้าง Mock Screen 3-5 หน้า

ผลลัพธ์ที่ต้องได้:

- เปิดระบบได้
- เห็นหน้า Dashboard เบื้องต้น
- มีข้อมูลตัวอย่างให้ทดลอง

---

## Phase 2: Project & Screen Library

เป้าหมาย:

ทำหน้ารวม Project และหน้ารวม Screen

งานที่ต้องทำ:

1. สร้าง Project List Page
2. สร้าง Project Card
3. สร้าง Project Overview Page
4. สร้าง Screen Library Page
5. อ่าน metadata.json จากหลาย Screen
6. รวมข้อมูลเป็นตาราง
7. ทำ Search
8. ทำ Filter ตาม Project, Platform, Module, Status, Assignee
9. ทำ Status Badge
10. ทำปุ่ม View Preview

ผลลัพธ์ที่ต้องได้:

- เห็นรายการหน้าจอทั้งหมด
- Filter หน้าจอได้
- กดเข้า Preview ได้

---

## Phase 3: Preview Viewer

เป้าหมาย:

แสดง HTML Preview ได้จริง

งานที่ต้องทำ:

1. สร้าง Screen Detail Page
2. แสดงข้อมูล Metadata
3. แสดง iframe ของ HTML Preview
4. ทำ Toggle Desktop / Tablet / Mobile
5. ทำปุ่ม Fullscreen
6. ทำปุ่ม Open HTML
7. ทำปุ่ม Copy Preview Path
8. ทำ Preview Container ให้ปรับขนาดได้

ขนาด Preview ที่แนะนำ:

```text
Desktop: 1440px
Tablet: 768px
Mobile: 390px
```

ผลลัพธ์ที่ต้องได้:

- เปิดดูหน้าตัวอย่าง HTML ได้
- สลับ Desktop / Tablet / Mobile ได้
- Dev เห็นหน้าตาใกล้เคียงของจริง

---

## Phase 4: Spec & Prompt Viewer

เป้าหมาย:

ให้ Dev และ AI ใช้ข้อมูลต่อได้

งานที่ต้องทำ:

1. อ่านไฟล์ spec.md
2. แสดง Markdown ในระบบ
3. อ่านไฟล์ prompt.md
4. แสดง Prompt ในระบบ
5. ทำปุ่ม Copy Prompt
6. ทำปุ่ม Copy Spec
7. แยก Tab: Overview / Spec / Prompt / Flow

ผลลัพธ์ที่ต้องได้:

- Dev อ่าน Requirement ได้
- Copy Prompt ส่งให้ AI ได้
- HTML + Spec + Prompt อยู่ในหน้าเดียวกัน

---

## Phase 5: Flow Management เบื้องต้น

เป้าหมาย:

แสดง Flow การใช้งานแบบ Step-by-step

งานที่ต้องทำ:

1. สร้าง flow.json
2. สร้าง Flow List Page
3. สร้าง Flow Detail Page
4. แสดง Step ของแต่ละ Flow
5. ผูก Step กับ Screen ID
6. กดจาก Step ไปยัง Screen Preview ได้
7. แสดงสถานะของแต่ละ Step

ตัวอย่าง flow.json:

```json
{
  "flowId": "FLOW-NEWS-001",
  "flowName": "เจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์",
  "projectId": "obt-system",
  "platform": "admin-web",
  "module": "news-management",
  "feature": "create-news",
  "status": "in-review",
  "assignee": "Product Owner",
  "steps": [
    {
      "step": 1,
      "screenId": "ADM-DASH-001",
      "screenName": "Dashboard"
    },
    {
      "step": 2,
      "screenId": "ADM-NEWS-001",
      "screenName": "รายการข่าวประชาสัมพันธ์"
    },
    {
      "step": 3,
      "screenId": "ADM-NEWS-002",
      "screenName": "เพิ่มข่าวประชาสัมพันธ์"
    }
  ]
}
```

ผลลัพธ์ที่ต้องได้:

- ดู Flow ได้
- เห็นว่า Flow หนึ่งประกอบด้วย Screen อะไรบ้าง
- กดไปดู Preview แต่ละ Step ได้

---

## Phase 6: Assignee & Status Board

เป้าหมาย:

ช่วยติดตามงานตามผู้รับผิดชอบ

งานที่ต้องทำ:

1. สร้างหน้า Assignee Board
2. Group Screen ตาม Assignee
3. Group Screen ตาม Status
4. แสดงจำนวนงานของแต่ละคน
5. แสดงรายการที่ต้อง Review
6. แสดงรายการที่ Approved แล้ว
7. แสดงรายการที่ Need Revision

ผลลัพธ์ที่ต้องได้:

- ดูได้ว่าใครรับผิดชอบอะไร
- ดูงานค้างตาม Status ได้
- ใช้ประชุมติดตามงานได้

---

## Phase 7: Review Workflow เบื้องต้น

เป้าหมาย:

รองรับการตรวจและอนุมัติแบบง่าย

ใน MVP ช่วงแรกอาจยังไม่ต้องบันทึกลง Database ให้แก้จาก metadata.json ผ่าน Git ก่อน

งานที่ต้องทำ:

1. แสดง Status ปัจจุบัน
2. แสดง Reviewer
3. แสดง Last Updated
4. เพิ่ม Comment แบบ Markdown File หรือ comments.json
5. แสดง Comment ในหน้า Screen Detail
6. เพิ่ม Review Checklist

ตัวอย่าง review-checklist.json:

```json
{
  "screenId": "ADM-NEWS-002",
  "checklist": [
    {
      "label": "Layout ถูกต้องตาม Requirement",
      "checked": true
    },
    {
      "label": "Mood & Tone ตรงกับ Design System",
      "checked": true
    },
    {
      "label": "รองรับ Desktop / Tablet / Mobile",
      "checked": false
    },
    {
      "label": "มี Empty / Loading / Error / Success State",
      "checked": false
    }
  ]
}
```

ผลลัพธ์ที่ต้องได้:

- Reviewer ตรวจตาม Checklist ได้
- เห็น Comment ได้
- รู้ว่าหน้านี้ผ่านหรือยังไม่ผ่าน

---

# 14. Database Design สำหรับระยะต่อไป

เมื่อ MVP ใช้งานได้แล้ว ค่อยย้ายจาก File-based ไปเป็น Database

แนะนำใช้

```text
PostgreSQL + Prisma
```

## 14.1 ตารางหลักที่ควรมี

### projects

```text
id
name
description
type
status
owner_id
created_at
updated_at
```

### platforms

```text
id
project_id
name
code
description
```

### modules

```text
id
project_id
platform_id
name
code
description
owner_id
status
```

### features

```text
id
project_id
module_id
name
code
description
owner_id
status
```

### flows

```text
id
project_id
module_id
feature_id
name
code
description
status
assignee_id
```

### flow_steps

```text
id
flow_id
screen_id
step_order
step_name
description
```

### screens

```text
id
project_id
platform_id
module_id
feature_id
flow_id
screen_code
name
description
preview_path
spec_path
prompt_path
status
priority
version
assignee_id
reviewer_id
created_at
updated_at
```

### users

```text
id
name
email
role
avatar_url
status
```

### comments

```text
id
screen_id
user_id
comment
status
created_at
updated_at
```

### versions

```text
id
screen_id
version
preview_path
spec_path
prompt_path
change_summary
created_by
created_at
```

---

# 15. Design System สำหรับ Preview

เพื่อให้ทุก HTML Preview ดูเป็นระบบเดียวกัน ควรมีไฟล์ CSS กลาง

```text
public/
  preview-assets/
    design-system.css
    components.css
    reset.css
```

## 15.1 Design Token เบื้องต้น

ควรกำหนด

```css
:root {
  --color-primary: #1d4ed8;
  --color-primary-light: #dbeafe;
  --color-secondary: #64748b;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

## 15.2 Component กลาง

ควรมี Class มาตรฐาน เช่น

```text
.btn
.btn.primary
.btn.secondary
.card
.input
.select
.textarea
.badge
.badge.approved
.badge.in-review
.page
.page-header
.form-grid
.table
.sidebar
.topbar
```

---

# 16. Naming Convention

## 16.1 Project ID

ใช้ตัวพิมพ์เล็กและขีดกลาง

```text
obt-system
school-management
finance-clearance
municipality-platform
```

## 16.2 Platform Code

```text
public-website
admin-web
mobile-app
shared
```

## 16.3 Module Code

```text
news-management
user-management
complaint-management
dashboard
report
setting
```

## 16.4 Screen ID

ใช้ Prefix แยกตาม Platform

```text
WEB-HOME-001
WEB-NEWS-001
ADM-DASH-001
ADM-NEWS-001
ADM-NEWS-002
APP-HOME-001
APP-REQ-001
```

## 16.5 Flow ID

```text
FLOW-NEWS-001
FLOW-REQ-001
FLOW-USER-001
FLOW-AUTH-001
```

---

# 17. ตัวอย่างข้อมูลสำหรับทดลอง MVP

## 17.1 Project ตัวอย่าง

```json
{
  "projectId": "obt-system",
  "projectName": "ระบบบริการประชาชน อบต.",
  "description": "ระบบตัวอย่างสำหรับ Public Website, Admin Website และ Mobile App ขององค์กรปกครองส่วนท้องถิ่น",
  "platforms": ["public-website", "admin-web", "mobile-app"],
  "status": "in-progress",
  "owner": "Product Team",
  "createdAt": "2026-05-29",
  "updatedAt": "2026-05-29"
}
```

---

## 17.2 Screen ตัวอย่างที่ควรสร้างก่อน

สำหรับทดลอง MVP ควรมีอย่างน้อย 9 หน้า

### Public Website

1. WEB-HOME-001 หน้าแรกเว็บไซต์
2. WEB-NEWS-001 รายการข่าวประชาสัมพันธ์
3. WEB-NEWS-002 รายละเอียดข่าว

### Admin Website

4. ADM-DASH-001 Dashboard
5. ADM-NEWS-001 รายการข่าว
6. ADM-NEWS-002 เพิ่มข่าวใหม่

### Mobile App

7. APP-HOME-001 หน้าแรก Mobile App
8. APP-REQ-001 แจ้งเรื่องร้องเรียน
9. APP-TRACK-001 ติดตามสถานะคำร้อง

---

# 18. Development Checklist

## 18.1 Checklist สำหรับเริ่มทำระบบ

```text
[ ] สร้าง Next.js Project
[ ] ติดตั้ง Tailwind CSS
[ ] สร้าง Layout หลัก
[ ] สร้าง Sidebar
[ ] สร้าง Project List Page
[ ] สร้าง Project Overview Page
[ ] สร้าง Screen Library Page
[ ] สร้าง Mock metadata.json
[ ] สร้าง HTML Preview ตัวอย่าง
[ ] สร้าง Preview Viewer
[ ] ทำ iframe Preview
[ ] ทำ Desktop / Tablet / Mobile Toggle
[ ] ทำ Markdown Viewer สำหรับ spec.md
[ ] ทำ Prompt Viewer
[ ] ทำ Copy Prompt Button
[ ] ทำ Filter
[ ] ทำ Flow List
[ ] ทำ Flow Detail
[ ] ทำ Assignee Board
[ ] ทดลองกับ Project ตัวอย่าง
```

---

# 19. Acceptance Criteria ของ MVP

ระบบ MVP จะถือว่าใช้งานทดลองได้ เมื่อทำสิ่งเหล่านี้ได้ครบ

1. เปิดระบบ Preview Hub ได้
2. เห็นรายการ Project
3. เข้า Project แล้วเห็นภาพรวม
4. เห็นรายการ Screen ทั้งหมด
5. Filter Screen ได้
6. กดเข้า Screen Detail ได้
7. เห็น HTML Preview ผ่าน iframe
8. สลับ Desktop / Tablet / Mobile ได้
9. อ่าน Spec ได้
10. อ่าน Prompt ได้
11. Copy Prompt ได้
12. เปิด HTML Preview แยกได้
13. ดู Flow แบบ Step-by-step ได้
14. ดู Assignee และ Status ได้
15. มี Project ตัวอย่างสำหรับทดลองครบอย่างน้อย 1 Project

---

# 20. Roadmap การพัฒนา

## Sprint 1: Foundation

เป้าหมาย: วางโครงสร้างระบบ

งาน:

1. Setup Next.js
2. Setup Tailwind
3. สร้าง Layout
4. สร้าง Mock Data
5. สร้าง Project List
6. สร้าง Screen Library เบื้องต้น

ผลลัพธ์:

- เปิดระบบได้
- เห็นรายการ Project และ Screen

---

## Sprint 2: Preview Core

เป้าหมาย: ทำ Preview Viewer

งาน:

1. สร้าง Screen Detail
2. แสดง iframe
3. ทำ Device Toggle
4. แสดง Metadata
5. เปิด HTML แยกได้

ผลลัพธ์:

- กดดู HTML Preview ได้จริง

---

## Sprint 3: Spec & Prompt

เป้าหมาย: ให้ Dev ใช้ข้อมูลต่อได้

งาน:

1. อ่าน spec.md
2. อ่าน prompt.md
3. แสดง Markdown
4. Copy Prompt
5. เพิ่ม Tab View

ผลลัพธ์:

- Dev สามารถใช้ HTML + Spec + Prompt ต่อได้

---

## Sprint 4: Flow & Assignee

เป้าหมาย: จัดการ Flow และผู้รับผิดชอบ

งาน:

1. สร้าง Flow List
2. สร้าง Flow Detail
3. ผูก Flow กับ Screen
4. สร้าง Assignee Board
5. Filter ตาม Assignee และ Status

ผลลัพธ์:

- ดูภาพรวม Flow และงานของแต่ละคนได้

---

## Sprint 5: Review Workflow

เป้าหมาย: รองรับการตรวจงานเบื้องต้น

งาน:

1. แสดง Review Checklist
2. แสดง Comment
3. แสดง Version
4. กำหนดสถานะ Review
5. เตรียมโครงสร้างสำหรับอนาคต

ผลลัพธ์:

- ใช้ในการประชุมตรวจ UX/UI ได้

---

# 21. วิธีทดลองใช้งานหลังทำ MVP

## 21.1 เตรียม Project ตัวอย่าง

สร้าง Project ชื่อ

```text
ระบบบริการประชาชน อบต.
```

มี 3 Platform

```text
Public Website
Admin Website
Mobile App
```

---

## 21.2 สร้างหน้าตัวอย่าง

สร้าง HTML Preview อย่างน้อย 9 หน้า

```text
WEB-HOME-001
WEB-NEWS-001
WEB-NEWS-002
ADM-DASH-001
ADM-NEWS-001
ADM-NEWS-002
APP-HOME-001
APP-REQ-001
APP-TRACK-001
```

---

## 21.3 ทดลอง Flow

ทดลองสร้าง Flow เช่น

```text
FLOW-NEWS-001: เจ้าหน้าที่เพิ่มข่าวประชาสัมพันธ์
FLOW-REQ-001: ประชาชนแจ้งเรื่องร้องเรียน
```

---

## 21.4 ทดลอง Review

ให้ทีมทดลองตรวจโดยใช้คำถามเหล่านี้

1. หน้าจอดูเข้าใจง่ายหรือไม่
2. Mood & Tone ตรงกับที่ต้องการหรือไม่
3. Layout เหมาะกับ Platform หรือไม่
4. Dev เข้าใจจาก Spec หรือไม่
5. Prompt ที่ให้ AI ใช้ต่อชัดเจนหรือไม่
6. Flow แต่ละ Step ครบหรือไม่
7. Filter หา Screen ได้สะดวกหรือไม่
8. Assignee ช่วยติดตามงานได้จริงหรือไม่

---

# 22. แนวทางขยายระบบในอนาคต

เมื่อ MVP ใช้งานได้แล้ว สามารถขยายต่อได้ดังนี้

## 22.1 Database

ย้ายจาก File-based Data ไปใช้ PostgreSQL

## 22.2 Authentication

เพิ่ม Login และ Role Permission

## 22.3 Upload Manager

ให้ผู้ใช้ Upload HTML, Spec, Prompt ผ่านหน้าเว็บได้

## 22.4 Version Compare

เปรียบเทียบ Preview ระหว่าง Version

## 22.5 Comment System

เพิ่ม Comment แบบ Resolve ได้

## 22.6 Approval Workflow

เพิ่มปุ่ม Approve / Reject

## 22.7 Export Package

Export HTML + Spec + Prompt + Metadata เป็น ZIP

## 22.8 GitHub Integration

สร้าง GitHub Issue จาก Screen หรือ Flow ได้

## 22.9 AI Integration

ให้ระบบ Generate Prompt อัตโนมัติจาก Metadata และ Spec

## 22.10 Component Library

สร้างคลัง Component กลางให้ใช้ซ้ำใน HTML Preview

---

# 23. สรุปแนวทางพัฒนา

ระบบ Preview Hub ควรเริ่มจาก MVP ที่เรียบง่ายก่อน โดยใช้

```text
Next.js + Tailwind CSS + Static HTML Preview + JSON Metadata + Markdown Spec + GitHub
```

เริ่มจากการทำให้ระบบสามารถ

1. รวม Project
2. รวม Screen
3. Filter ได้
4. Preview HTML ได้
5. อ่าน Spec ได้
6. Copy Prompt ได้
7. ดู Flow ได้
8. ดู Assignee ได้

เมื่อทดลองใช้งานจริงแล้วค่อยขยายไปสู่ระบบที่มี Database, Login, Comment, Approval, Versioning และ AI Integration

หลักสำคัญคือ

```text
HTML Preview = Source of Truth ด้านหน้าตา
Spec.md = Source of Truth ด้าน Requirement
Prompt.md = Source of Truth สำหรับ AI Handoff
Metadata.json = Source of Truth สำหรับจัดการรายการในระบบ
```

หากวางโครงสร้างนี้ตั้งแต่ต้น ระบบจะสามารถใช้ได้ทั้งกับ Website, Admin Website และ Mobile App และยังสามารถส่งต่อให้ Dev หรือ AI พัฒนาระบบจริงได้อย่างเป็นระบบ
