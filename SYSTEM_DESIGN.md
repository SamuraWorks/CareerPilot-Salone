# CareerPilot Salone: Intelligent Career Operating System
## System Architecture & Strategic Blueprint

**Version:** 1.0  
**Status:** Approved Design  
**Objective:** Operationalize an AI-driven career guidance platform that removes decision fatigue and enforces realistic, competitive career advancement for Sierra Leonean talent.

---

## 1. CORE PRINCIPLES (NON-NEGOTIABLE)

1.  **Zero Decision Fatigue:** The system makes structural and design decisions; the user provides raw truth.
2.  **No Templates:** All outputs (CVs, letters) are dynamically generated based on content density, experience level, and industry norms.
3.  **Inference Over Input:** Adapt subsequent questions based on prior answers to minimize friction.
4.  **Radical Reality:** The AI will refuse to generate application materials for jobs the user is significantly unqualified for, instead offering a roadmap to bridge the gap.
5.  **Multi-Use Data:** One onboarding flow populates the CV, Cover Letter, Persona, and Advisor context.
6.  **Context Aware:** Deeply rooted in Sierra Leone's context (e.g., local internships, NGO dominance) while adhering to global remote-work standards.

---

## 2. SYSTEM 1: "LET'S GET TO KNOW YOU" (SMART INTAKE ENGINE)

**Goal:** Invisibly build the User Persona, CV Data, and baseline Readiness Score in a single pass.

### Dynamic Question Flow (Order is Critical)

| Phase | Question Group & Logic | Feeds Into |
| :--- | :--- | :--- |
| **1. Identity** | Name, Location, Contact. *Logic: If Location != Freetown, prioritization engine boosts remote/relocation options.* | Header Data, Local Context |
| **2. Status** | "Are you a student, employed, or looking?" *Logic: Sets the 'Persona Type'.* | CV Structure Algorithm |
| **3. Target** | "What is one job you want?" *Logic: Sets the 'North Star'.* | Roadmap & Match score |
| **4. Education** | Degree, Institution, Grad Year. *Logic: If < 2 years exp, this becomes the primary CV anchor.* | Education Section |
| **5. Hard Skills**| Specific tools/tech/languages. *Logic: No "soft skills" asked here.* | Skills Section, Match Score |
| **6. The "Meat"**| **Branching Logic:**<br>• *Student:* Focus on Projects, Volunteering, Leadership.<br>• *Pro:* Focus on Roles, metrics, outcomes.<br>• *Switcher:* Focus on transferable milestones. | Experience/Projects Section |

### Persona Divergence
*   **The Scholar (Student/Grad):** System tags as `High Potential / Low Proof`. UI emphasizes potential, coursework, and willingness to learn. Roadmaps are dense with skill acquisition.
*   **The Professional (Experienced):** System tags as `Proven / Specific`. UI emphasizes efficiency, metrics, and career pivots. Roadmaps focus on networking and advanced certification.
*   **The Switcher (Pivoters):** System tags as `High Experience / Low Domain`. UI emphasizes transferable skills and rapid upskilling. Roadmaps are aggressive and short-term.

---

## 3. SYSTEM 2: CV BUILDER (NO TEMPLATES)

**Goal:** Generate the single best CV version for the user's specific context without them ever touching a formatting tool.

### The Logic Engine (The "Brain")

1.  **Layout Decision Tree:**
    *   *Condition:* Is experience < 1 year? -> **Action:** Use `Education-First` Layout.
    *   *Condition:* Is experience > 3 years? -> **Action:** Use `Experience-First` Layout.
    *   *Condition:* Is `Technical Skills` count > 10 AND `Projects` > 2? -> **Action:** Use `Technical/hybrid` Layout.
    *   *Condition:* Is target `Academic/NGO`? -> **Action:** Use `Verbose/Standard` Layout.
    *   *Condition:* Is target `Startup/Remote`? -> **Action:** Use `Concise/One-Page` Layout.

2.  **Confidence & Realism Layer:**
    *   **The Polisher:** Automatically upgrades passive verbs ("Did", "Helped") to active power verbs ("Orchestrated", "Engineered") based on the implied complexity of the task.
    *   **The Realism Filter (The "Stop" Sign):** If a user claims "Expert React" but lists "0 Projects" and "0 Work Experience", the system flags this gap. It *auto-downgrades* the skill confidence on the CV to "Learning" or "Familiar" and adds a "Build a React Project" item to the user's Roadmap. **The system refuses to lie.**

3.  **Context-Aware Output:**
    *   The system creates the file `User_CV_[TargetRole]_[Date].pdf`. It does not ask "which version". It generates the *correct* version for the stated goal.

---

## 4. SYSTEM 3: COVER LETTER ENGINE

**Goal:** Turn "Cover Letters" from a dreaded task into a disposable, high-impact utility.

### Generation Logic
1.  **Unlock Condition:** A cover letter can ONLY be generated if a Job Title + Company Name is provided. General cover letters are banned.
2.  **Mapping Algorithm:**
    *   Extract 3 key requirements from the Job Title/Description.
    *   Scan User CV for the 3 strongest matching evidence points.
    *   *Synthesis:* Construct a narrative connecting Matches -> Requirements.
3.  **Tone Selector (Auto-Inferred):**
    *   *Target: Bank/Gov/NGO* -> **Tone:** Formal, Respectful, Duty-driven.
    *   *Target: Tech Startup/Agency* -> **Tone:** Dynamic, Agile, Results-driven.
    *   *Target: Scholarship* -> **Tone:** Aspirational, Academic, Future-focused.

### "Disposable Mindset"
The UI treats cover letters as ephemeral. "Generate for this job." User sends it. User forgets it. The system stores the *success* of the letter, not the letter itself as a permanent artifact.

---

## 5. SYSTEM 4: CAREER READINESS & AUTHORITY

**Goal:** The platform acts as a senior mentor, determining *when* the user is allowed to "Apply" vs. when they must "Prepare".

### Readiness States
1.  **Exploring (Data Gathering):** User has low profile completion. System pushes: *Complete Profile, Explore Roles.*
2.  **Preparing (Gap Closing):** User has a goal but low match score (<50%). System pushes: *Roadmap Tasks, Skill Acquisition.* **Apply Button is "Locked" or explicitly warned.**
3.  **Ready (Market Fit):** Match score > 60%. CV is consistent. System pushes: *Job Feel, Networking, CV Polish.*
4.  **Applying (Active):** User is executing. System pushes: *Cover Letters, Interview Prep, Follow-up scripts.*

### The "Not Yet" Mechanism
If a user tries to generate a cover letter for a "Senior Developer" role but has a "Junior" profile:
*   **System Response:** "Hold on. Your profile matches 30% of this role's requirements. Applying now risks rejection fatigue. Here are 3 things to do first to increase your odds to 60%."

---

## 6. SYSTEM 5: FEEDBACK & LEARNING LOOP

**Goal:** The system gets smarter about the local market without manual data entry.

*   **Trigger:** 14 days after a "Generate Cover Letter" event.
*   **Micro-Interaction:** "Did you hear back from [Company]?"
    *   *Yes:* **System Action:** Tag keywords in that CV/Letter as "High Value" for that industry. Boost readiness score.
    *   *No:* **System Action:** Analyze text density. Suggest "Tightening" tone for next attempt.
    *   *Interviewed:* **System Action:** Unlock "Interview Prep" module for that specific role type.

---

## 7. FINAL SUMMARY for EVALUATION

### Why This Is Hard To Copy (The "Moat")
Most platforms are "Tools" (CV Builders, Job Boards). CareerPilot Salone is an **Operating System**.
*   **Competitors** ask the user to design. **We** design for them.
*   **Competitors** let users lie to themselves. **We** enforce realism.
*   **Competitors** provide templates. **We** provide strategy.
*   **Competitors** are static. **We** adapt based on outcome loops.

### Differentiators
| Feature | Generic CV Builder | Chatbot (GPT Wrapper) | **CareerPilot Salone** |
| :--- | :--- | :--- | :--- |
| **Input** | Manual typing into boxes | Unstructured chat | **Strategic Intake Flow** |
| **CV Design** | User picks template | Text-only output | **AI-Selected Layout Logic** |
| **Reality Check** | None (Writes whatever typed) | Hallucinates confidence | **Gap Detection & Coaching** |
| **Goal** | Make a PDF | Answer a question | **Get the User Employed** |

### System Flow Diagram
`Onboarding (Data)` -> `Persona Engine (Logic)` -> `Readiness Check (Gatekeeper)` -> `Roadmap (Gap Closing)` OR `CV/Letter Engine (Execution)` -> `Application` -> `Feedback Loop (Optimization)`
