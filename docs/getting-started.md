# Getting Started

This guide explains how to use the Static Analyzer to run your first security scan.

---

## 🌐 Live Application

You can access the application here:

👉 https://static-analyzer-web.vercel.app/

No installation is required.

---

## 📤 Running your first scan

- Open the web app
- Upload your Java source code
- Click **Scan**
- Wait for results

---

## 📊 View results

After processing, you will receive a list of detected vulnerabilities:

- Severity level
- Confidence level
- Description of the issue
- File and line number
- Snippet of the vulnerable code
- CWE
- Remediation steps
- Suggested Fix
- References

---

## 🧠 How it works

1. Upload your Java project
2. Server analyzes files
3. Semgrep + custom rules scan the code
4. Security issues are detected
5. Results are returned instantly

---

## ⚙️ Supported analysis

The static analyzer detects:

- Hardcoded secrets
- Injection vulnerabilities
- XSS vulnerabilities
- Weak cryptographic algorithms
- And many more...

---

## 📚 More information

- [Security Rules](./security-rules.md)
