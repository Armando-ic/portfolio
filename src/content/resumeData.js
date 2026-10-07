// The Resume panel's text, copied word for word from the one-page resume I send.
// Everything after "export default" must stay strict JSON (double quotes, no comments,
// no trailing commas): a check outside this repository reads this file and fails
// when any line here is not in that resume's PDF.
export default {
  "summary": "George Mason University IT graduate (May 2026) with CompTIA Security+ ce, seeking a data center or network technician role. Hands-on with hardware and networks: planned and assembled a desktop PC; currently building a home network monitoring lab around a managed switch and a hardened Splunk server. Available for nights, weekends and rotating shifts.",
  "education": [
    {
      "school": "George Mason University",
      "date": "May 2026",
      "degree": "Bachelor of Science in Information Technology, Concentration: Cyber Security; Dean's List, Fall 2025 and Spring 2026"
    },
    {
      "school": "Northern Virginia Community College",
      "date": "May 2021",
      "degree": "Associate of Science in Information Technology"
    }
  ],
  "certifications": [
    {
      "name": "CompTIA Security+ ce",
      "detail": "(DoD 8570/8140 IAT Level II), earned September 2023, valid through September 2029"
    },
    {
      "name": "Cisco CCNA",
      "detail": "(in progress, exam target December 2026)"
    }
  ],
  "experience": [
    {
      "title": "Cloud Systems Developer & Communications Manager",
      "date": "Jan 2026 – Present",
      "org": "Lola's Party Co.",
      "note": "GMU IT 493 Senior Design capstone client; work continued after graduation",
      "bullets": [
        "Deployed and managed 11 Google Cloud Functions (Python/Flask) with Firestore, Cloud Storage and IAM service accounts for a production application",
        "Audited and fixed the application's security: admin authentication, Firestore rules, XSS, CORS, cron endpoint protection and Stripe webhook verification"
      ]
    },
    {
      "title": "Line Cook / Dishwasher / Server",
      "date": "Mar 2022 – Jun 2024",
      "org": "Brixx Wood Fired Pizza + Craft Bar",
      "bullets": []
    }
  ],
  "skills": [
    {
      "category": "Hardware & Networking",
      "skills": "PC assembly and part selection, Cisco Packet Tracer (VLSM, static routing, router and switch configuration), TCP/IP, subnetting"
    },
    {
      "category": "Systems",
      "skills": "Ubuntu Server and Linux, Windows 10/11, Windows Server and Active Directory (lab), VMware Workstation Pro, Docker Compose, Splunk Enterprise and SPL, Google Cloud, Intune and Entra ID (lab)"
    },
    {
      "category": "Scripting & Documentation",
      "skills": "Python, Bash, PowerShell (basic), Git, Claude Code; runbooks, architecture decision records"
    }
  ]
}
