# static-analyzer

A security-focused static analysis tool that scans source code for common vulnerabilities in Java and Spring Boot such as SQL Injection, hardcoded secrets, and insecure cryptographic usage.

---

## 🚀 Features

- Detects common security vulnerabilities in source code
- Supports rule-based analysis engine
- Scans Java files and projects
- Uses Semgrep for advanced pattern-based detection with extended custom rules
- Extended Semgrep rule set for improved security coverage

---

## 🔍 Detected Vulnerabilities

The analyzer currently detects the following security issues:

- Hardcoded Credentials
- Hardcoded Crypto Keys
- Weak Hash Algorithms (MD5, SHA1, SHA224)
- SQL Injection
- Command Injection
- Open Redirect
- Cross-Site Scripting (XSS)
- And many more...

---

## 📚 Documentation

Full documentation is available in:

- 👉 [Getting Started](./docs/getting-started.md) - how to run your first scan
- 👉 [Security Rules](./docs/security-rules.md) - detailed explanation of all detected security rules
