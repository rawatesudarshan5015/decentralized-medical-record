# 🎨 Frontend UI/UX Overview

## Visual Design System

### Color Palette
```
Primary Gradient:  #667eea → #764ba2 (Purple)
Success:           #4caf50 (Green)
Error:             #f44336 (Red)
Warning:           #ff9800 (Orange)
Background:        #f9f9f9 (Light Gray)
Surface:           #ffffff (White)
Text Primary:      #333333 (Dark Gray)
Text Secondary:    #666666 (Medium Gray)
Border:            #e0e0e0 (Light Gray)
```

### Typography
```
h1:  2rem, bold
h2:  1.5rem, bold
h3:  1.25rem, bold
Body: 1rem, regular (14-16px)
Caption: 0.85rem, regular
```

---

## Page Layouts

### 1. Home Page (/)

```
┌────────────────────────────────────────┐
│  🏥 Medical Records  [CONNECT BUTTON]  │
├────────────────────────────────────────┤
│                                        │
│  🏥 Decentralized Medical Records     │
│                                        │
│  [Connect Wallet Prompt / Dashboard]   │
│                                        │
│  ┌──────────┬──────────┐              │
│  │ Patient  │  Doctor  │  Messages    │
│  └──────────┴──────────┴──────────────┘
│                                        │
│  ✅ Key Features                       │
│  • Patient-controlled access           │
│  • Time-limited permissions            │
│  • Fine-grained consent                │
│  • Secure messaging                    │
│                                        │
└────────────────────────────────────────┘
```

### 2. Patient Dashboard (/patient)

```
┌────────────────────────────────────────┐
│  👤 Patient Dashboard                  │
│  Account: 0xf39F...2266               │
├────────────────────────────────────────┤
│  [General Access] [Consent] [Records]  │
├────────────────────────────────────────┤
│                                        │
│  GRANT GENERAL ACCESS                  │
│  ┌─────────────────────────────┐      │
│  │ Healthcare Provider Address │      │
│  │ [0x__________________]      │      │
│  │                             │      │
│  │ Duration                    │      │
│  │ [▼ 1 Day]                  │      │
│  │                             │      │
│  │ [Grant Access]              │      │
│  └─────────────────────────────┘      │
│                                        │
│  REVOKE ACCESS                         │
│  ┌─────────────────────────────┐      │
│  │ Provider address to revoke  │      │
│  │ [0x__________________]      │      │
│  │                             │      │
│  │ [❌ Revoke Access]          │      │
│  └─────────────────────────────┘      │
│                                        │
└────────────────────────────────────────┘
```

### 3. Doctor Dashboard (/doctor)

```
┌────────────────────────────────────────┐
│  👨‍⚕️ Doctor Dashboard                   │
│  Your Address: 0x7099...79C8          │
├────────────────────────────────────────┤
│                                        │
│  ACCESS PATIENT RECORDS                │
│  ┌─────────────────────────────┐      │
│  │ Patient Address             │      │
│  │ [0x__________________]      │      │
│  │                             │      │
│  │ [Check Access]              │      │
│  └─────────────────────────────┘      │
│                                        │
│  ACCESS STATUS:                        │
│  ┌─────────────────────────────┐      │
│  │ ✅ You have access!         │      │
│  │ (Or ❌ You don't have access)│      │
│  └─────────────────────────────┘      │
│                                        │
│  VIEW PATIENT RECORDS                  │
│  ┌─────────────────────────────┐      │
│  │ Record Index: [0]           │      │
│  │ [Fetch Record]              │      │
│  └─────────────────────────────┘      │
│                                        │
│  RECORD DETAILS:                       │
│  CID: QmXxxxx...                       │
│  Category: blood_test                  │
│  [View on IPFS Gateway]                │
│                                        │
└────────────────────────────────────────┘
```

### 4. Messages Page (/messages)

```
┌────────────────────────────────────────┐
│  💬 Secure Messaging                   │
│  Your Address: 0xf39F...2266          │
├────────────────────────────────────────┤
│                                        │
│ ┌─────────────────┬─────────────────┐ │
│ │  SEND MESSAGE   │  YOUR INBOX     │ │
│ ├─────────────────┼─────────────────┤ │
│ │                 │                 │ │
│ │ Recipient:      │ Messages: 3     │ │
│ │ [0x______]      │                 │ │
│ │                 │ ┌─────────────┐ │ │
│ │ Message:        │ │ From: 0x70.. │ │
│ │ [Text box]      │ │ Time: 2:30pm │ │
│ │                 │ │             │ │
│ │ [Send Message]  │ │ Hi, please  │ │
│ │                 │ │ review docs │ │
│ │                 │ └─────────────┘ │ │
│ │                 │                 │ │
│ │                 │ ┌─────────────┐ │ │
│ │                 │ │ From: 0x14d.. │ │
│ │                 │ │ Time: 1:15pm │ │
│ │                 │ │             │ │
│ │                 │ │ Results are │ │
│ │                 │ │ ready!      │ │
│ │                 │ └─────────────┘ │ │
│ │                 │                 │ │
│ │                 │ [🔄 Refresh]   │ │
│ └─────────────────┴─────────────────┘ │
│                                        │
└────────────────────────────────────────┘
```

### 5. About Page (/about)

```
┌────────────────────────────────────────┐
│  ℹ️ About Decentralized Medical Rec.   │
├────────────────────────────────────────┤
│                                        │
│  WHAT IS THIS?                         │
│  ────────────────────────────────────  │
│  Patient-controlled medical records... │
│                                        │
│  KEY FEATURES                          │
│  ────────────────────────────────────  │
│  ✓ Patient Control                     │
│  ✓ Time-Limited Permissions            │
│  ✓ Granular Consent                    │
│  ✓ Secure Messaging                    │
│                                        │
│  HOW IT WORKS                          │
│  ────────────────────────────────────  │
│  1. Patient uploads records            │
│  2. Grants access                      │
│  3. Doctor views records               │
│                                        │
│  SMART CONTRACTS                       │
│  ────────────────────────────────────  │
│  • AccessControlManager                │
│  • ConsentManager                      │
│  • MedicalRecordStorage                │
│  • MessageInbox                        │
│                                        │
│  PRIVACY & SECURITY                    │
│  ────────────────────────────────────  │
│  ✓ Data stored on IPFS                 │
│  ✓ Only hashes on blockchain           │
│  ✓ Patient controls all access         │
│                                        │
│  [Go to home page]                     │
│                                        │
└────────────────────────────────────────┘
```

---

## Component Library

### Buttons

**Primary Button**
```
Background: Gradient (purple)
Color: White
Padding: 0.75rem 1.5rem
Border-radius: 8px
Hover: Translate up, shadow
```

**Secondary Button**
```
Background: Light gray
Color: Dark gray
Border: 1px solid gray
Padding: 0.75rem 1.5rem
Hover: Dark gray bg
```

**Danger Button**
```
Background: Gradient (red)
Color: White
Padding: 0.75rem 1.5rem
Border-radius: 8px
```

### Form Elements

**Input Field**
```
Border: 1px solid #ddd
Padding: 0.75rem
Border-radius: 8px
Focus: Border #667eea, box-shadow
```

**Textarea**
```
Same as input
Rows: 4-6
Resize: Vertical
```

**Select Dropdown**
```
Same styling as input
Arrow icon
Hover effects
```

### Cards & Sections

**Card**
```
Background: White
Border: 1px solid #e0e0e0
Border-radius: 12px
Padding: 2rem
Box-shadow: None (hover shadow)
```

**Status Badge**
```
Success: Green bg, green text
Error: Red bg, red text
Padding: 0.5rem 1rem
Border-radius: 6px
```

---

## Responsive Design Breakpoints

```
Desktop (1200px+):
- Full layout
- Multi-column layouts
- Hover effects

Tablet (768px - 1199px):
- Adjusted padding
- 2-column grids
- Responsive nav

Mobile (< 768px):
- Single column
- Stacked navigation
- Larger touch targets
- Full-width inputs
```

---

## User Flows

### Patient Flow
```
1. Connect Wallet
   ↓
2. Choose "Patient"
   ↓
3. Grant Access to Doctor
   ↓
4. (Optional) Upload Records
   ↓
5. Monitor Access / Revoke
   ↓
6. Send/Receive Messages
```

### Doctor Flow
```
1. Connect Wallet
   ↓
2. Choose "Doctor"
   ↓
3. Ask Patient for Access
   ↓
4. Check Access Status
   ↓
5. View Records
   ↓
6. Send/Receive Messages
```

---

## Accessibility Features

✅ Semantic HTML
✅ ARIA labels (where needed)
✅ Keyboard navigation
✅ High contrast colors
✅ Focus indicators
✅ Form labels
✅ Error messages
✅ Alternative text

---

## Performance Optimizations

✅ CSS Modules (no global conflicts)
✅ Next.js Image optimization
✅ Code splitting
✅ Lazy loading
✅ Minification
✅ Gzip compression

---

## Theme Customization

To change the theme, update:

```css
/* In styles/globals.css */
:root {
  --primary-color: #667eea;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #4caf50;
  --error-color: #f44336;
  --background: #f9f9f9;
  --surface: #ffffff;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border: #e0e0e0;
}
```

---

## Animation & Transitions

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Button hover */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Form focus */
transition: border-color 0.3s ease, box-shadow 0.3s ease;
```

---

## Dark Mode (Future Enhancement)

Structure ready for dark mode:
```
Colors would be inverted
Background: #1a1a1a
Surface: #2d2d2d
Text: #f5f5f5
Accents: Lighter versions
```

---

**Design System is complete and ready for use!**
