---
description: Manual validation steps for the CareerPilot Salone Onboarding and CV System
---

# Testing the Intelligent Career Flow

This workflow verifies that the Smart Intake Engine correctly feeds data into the Zero-Touch CV Builder.

## 1. Reset & Start Onboarding
- Navigate to: `http://localhost:3000/onboarding`
- *Note:* If you are redirected, clear LocalStorage or use an Incognito window.

## 2. Simulate "Student" Persona
- **Step 1:** Enter Name: "Test Student", Location: "Freetown"
- **Step 2:** Select Status: **Student / Recent Grad** (Crucial: This triggers the "High Potential" logic)
- **Step 3:** Enter North Star: "Junior React Developer"
- **Step 4:** Education: "University"
- **Step 5:** Skills: "React, Tailwind, TypeScript"
- **Step 6 (The Meat):**
  - **Top Project:** "Solar Energy Tracker App"
  - **Leadership:** "Tech Club President"
- **Step 7:** Complete & Launch Dashboard.

## 3. Verify Dashboard
- Check the "Next Best Action" card. It should encourage creating a CV.
- Click **"Execute Action"**.

## 4. Verify System 2 (CV Builder)
- **Strategy Banner:** Confirm it says "System Strategy: Modern Professional" (This is the text for Students).
- **Auto-Fill:**
  - **Title:** Should be "Junior React Developer".
  - **Summary:** Should mention "Aspiring Junior React Developer... expertise in React...".
  - **Projects:** Should list "Solar Energy Tracker App".
- **Download:** Click "Export Tactical PDF" to verify generation.

## 5. Alternate Test ("Pro" Persona)
- Go back to `/onboarding`.
- Select Status: **Working Professional**.
- Step 6 should ask for **"Recent Job Title"** instead of "Project".
- The resulting CV Strategy should be **"Clean Minimalist"**.
