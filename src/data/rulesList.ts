import { FiAlertTriangle, FiCommand, FiCode, FiLock } from "react-icons/fi";
import type { IconType } from "react-icons";

interface Rule {
  id: string;
  name: string;
  desc: string;
  impact: string;
  icon: IconType;
  color: string;
}

export const getRules = (): Rule[] => [
  {
    id: "SEC-001",
    name: "Hardcoded Credentials",
    desc: "Detects passwords or secrets hardcoded in source files.",
    impact:
      "Can lead to full system compromise if attackers view your source code or compiled binaries.",
    icon: FiAlertTriangle,
    color: "text-amber-500",
  },
  {
    id: "SEC-002",
    name: "Hardcoded API Key",
    desc: "Detects different API keys embedded in code.",
    impact:
      "Enables unauthorized access to your cloud infrastructure, incurring massive costs or data theft.",
    icon: FiAlertTriangle,
    color: "text-amber-500",
  },
  {
    id: "SEC-003",
    name: "Hardcoded Crypto Key",
    desc: "Detects cryptographic keys hardcoded in source files.",
    impact:
      "Exposing cryptographic keys allows attackers to decrypt sensitive data, forge signatures, impersonate services, and completely break the application's security model.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-004",
    name: "SQL Injection",
    desc: "Detects unsanitized user input passed to SQL queries via string concatenation.",
    impact:
      "Allows attackers to execute arbitrary SQL, read sensitive data, or permanently destroy your databases.",
    icon: FiCode,
    color: "text-information",
  },
  {
    id: "SEC-005",
    name: "Command Injection",
    desc: "User input without proper validation is passed into system commands or runtime execution.",
    impact: "Allows remote code execution on the server.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-006",
    name: "LDAP Injection",
    desc: "User-controlled strings concatenated into LDAP queries.",
    impact: "Can bypass authentication or extract directory data.",
    icon: FiCode,
    color: "text-red-500",
  },
  {
    id: "SEC-007",
    name: "Open Redirect",
    desc: "Redirect URLs are built from user input without proper validation.",
    impact: "Users can be tricked into visiting malicious websites.",
    icon: FiCode,
    color: "text-orange-500",
  },
  {
    id: "SEC-008",
    name: "Cross-Site Scripting (XSS)",
    desc: "Detects unsanitized input rendered directly into HTML or JS output.",
    impact:
      "Allows attackers to steal user session cookies, redirect users, or deface your frontend interface.",
    icon: FiCode,
    color: "text-information",
  },
  {
    id: "SEC-009",
    name: "Weak Hash Algorithm",
    desc: "Detects the use of weak hash algorithms like MD5, SHA1 or SHA224.",
    impact:
      "Attackers can reverse these hashes using modern computing power, exposing passwords and sensitive data.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-010",
    name: "Insecure Randomness",
    desc: "Detects usage of java.util.Random for security-sensitive operations instead of SecureRandom.",
    impact:
      "Because java.util.Random is deterministic, attackers can predict generated values such as session tokens or reset codes, enabling authentication bypass, session hijacking, or cryptographic compromise.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-011",
    name: "Deserialization of Untrusted Input",
    desc: "Untrusted objects are deserialized without input validation.",
    impact: "Can lead to remote code execution.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-012",
    name: "Log Injection",
    desc: "Untrusted user input is written directly into logs without proper validation.",
    impact:
      "Attackers can forge or manipulate log entries, hide malicious actions, or inject fake audit trails, making incident detection and forensics unreliable.",
    icon: FiAlertTriangle,
    color: "text-orange-500",
  },
  {
    id: "SEC-013",
    name: "Socket Bound to All Interfaces",
    desc: "A network socket is bound to 0.0.0.0 or all network interfaces instead of a specific trusted interface.",
    impact:
      "Exposes the service to all network interfaces, increasing the attack surface and allowing unauthorized external access if firewall rules are misconfigured.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-014",
    name: "Code Execution from Untrusted Input",
    desc: "Untrusted input is executed as code within the application runtime (e.g. eval, scripting engines, groovy shell).",
    impact:
      "Allows attackers to execute arbitrary code on the server, leading to full system compromise, data theft, or complete takeover of the application.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-015",
    name: "CSRF Protection Disabled",
    desc: "Cross-Site Request Forgery (CSRF) protection is disabled or not enforced for state-changing requests in the application.",
    impact:
      "Attackers can trick authenticated users into executing unwanted actions such as changing settings, transferring funds, or modifying sensitive data without their consent.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-016",
    name: "Tainted Environment Variable",
    desc: "Application uses environment variables that may be controlled or influenced by untrusted sources without validation or sanitization.",
    impact:
      "Attackers may manipulate environment configuration to alter application behavior, bypass security controls, expose secrets, or redirect execution flow.",
    icon: FiAlertTriangle,
    color: "text-orange-500",
  },
  {
    id: "SEC-017",
    name: "Tainted Session",
    desc: "Detects user input flowing directly into session storage methods such as setAttribute without validation.",
    impact:
      "Attackers can inject or overwrite session values, leading to session poisoning, privilege escalation, authentication bypass, or impersonation of other users.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-018",
    name: "XPath Injection",
    desc: "Detects user input being directly used in XPath queries without proper validation.",
    impact:
      "Attackers can manipulate XPath expressions to bypass authentication, access unauthorized XML data, or extract sensitive information from XML-based storage.",
    icon: FiCode,
    color: "text-red-500",
  },
  {
    id: "SEC-019",
    name: "Spring Model Injection",
    desc: "Detects untrusted user input being placed into Spring MVC models or views without proper output encoding.",
    impact:
      "Can lead to Cross-Site Scripting (XSS) where attackers execute malicious scripts in the user's browser, steal session cookies, or manipulate page content.",
    icon: FiCode,
    color: "text-red-500",
  },
  {
    id: "SEC-020",
    name: "Path Traversal",
    desc: "Detects user-controlled input being used to construct file paths without proper validation.",
    impact:
      "Attackers can access arbitrary files on the server, including configuration files, source code, or sensitive system data, potentially leading to full system compromise.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-021",
    name: "URL Host Injection",
    desc: "Detects user input being used to construct the host portion of a URL without proper validation.",
    impact:
      "Attackers can redirect requests to malicious servers, enabling phishing, credential theft, server-side request manipulation, or bypass of security controls.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-022",
    name: "Permissive CORS Configuration",
    desc: "Cross-Origin Resource Sharing (CORS) is configured too permissively, allowing requests from untrusted or all origins.",
    impact:
      "Attackers can make authenticated cross-origin requests from malicious websites, leading to data theft, session abuse, or unauthorized actions on behalf of the user.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-023",
    name: "Unrestricted Request Mapping",
    desc: "Detects overly broad request mappings in a Spring application that expose endpoints without proper restrictions.",
    impact:
      "Attackers may access sensitive or internal endpoints that should be restricted, potentially leading to data exposure, privilege escalation, or unauthorized actions.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-024",
    name: "Custom Digest Implementation",
    desc: "Detects custom implementation of cryptographic hash or digest functions instead of using standard, well-tested cryptographic libraries.",
    impact:
      "Custom cryptographic implementations are often flawed and can lead to weak hashing, collision vulnerabilities, or complete bypass of integrity checks, compromising data security.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-025",
    name: "Deprecated DefaultHttpClient Usage",
    desc: "Detects usage of the deprecated DefaultHttpClient class for making HTTP requests.",
    impact:
      "Deprecated HTTP clients may lack security fixes and modern TLS support, leading to insecure communication, compatibility issues, or exposure to man-in-the-middle attacks.",
    icon: FiAlertTriangle,
    color: "text-orange-500",
  },
  {
    id: "SEC-026",
    name: "Insecure Hostname Verifier",
    desc: "Detects usage of a hostname verifier that disables or weakens hostname validation during TLS/SSL connections.",
    impact:
      "Attackers can perform man-in-the-middle attacks by impersonating trusted servers, leading to data interception, credential theft, or session hijacking.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-027",
    name: "Insecure Trust Manager",
    desc: "Detects usage of a custom or permissive TrustManager that bypasses proper certificate validation in TLS/SSL connections.",
    impact:
      "Disables proper certificate validation, allowing attackers to perform man-in-the-middle attacks, intercept sensitive data, and impersonate trusted servers.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-028",
    name: "Weak SSL Configuration",
    desc: "Detects insecure SSL/TLS context configuration that uses weak protocols, insecure defaults, or disabled security checks.",
    impact:
      "Can allow attackers to exploit weak encryption settings, downgrade attacks, or intercept sensitive data through man-in-the-middle attacks.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-029",
    name: "Weak Cryptographic Key",
    desc: "Detects use of cryptographic or key-based algorithms (DH, RSA, DSA, Blowfish) configured with insecurely small key sizes.",
    impact:
      "Weak key sizes can be brute-forced or cracked much faster, allowing attackers to recover sensitive data, forge signatures, or bypass integrity protections.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-030",
    name: "Use of Deprecated DES/3DES (DESede)",
    desc: "Detects usage of outdated symmetric encryption algorithms such as DES or 3DES (DESede).",
    impact:
      "These legacy algorithms are cryptographically weak and vulnerable to modern brute-force attacks, allowing attackers to decrypt sensitive data and compromise confidentiality.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-031",
    name: "Use of ECB Mode for Encryption",
    desc: "Detects use of Electronic Codebook (ECB) mode in symmetric encryption algorithms.",
    impact:
      "ECB mode does not properly randomize encrypted data, making patterns visible and allowing attackers to infer information about the plaintext, weakening overall data confidentiality.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-032",
    name: "GCM Nonce Reuse",
    desc: "Detects reuse of initialization vectors (nonces) in AES-GCM encryption mode.",
    impact:
      "Reusing nonces in GCM breaks cryptographic security, allowing attackers to recover plaintext, forge authentication tags, or fully compromise encrypted communication.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-033",
    name: "MD5 Used for Password Hashing",
    desc: "Detects use of MD5 hashing algorithm for password storage or authentication purposes.",
    impact:
      "MD5 is cryptographically broken and vulnerable to fast brute-force and rainbow table attacks, allowing attackers to recover user passwords and compromise accounts.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-034",
    name: "Use of Null Cipher",
    desc: "Detects usage of a null cipher or disabled encryption configuration where data is transmitted or stored without actual encryption.",
    impact:
      "Data is effectively sent or stored in plaintext, allowing attackers to intercept, read, or modify sensitive information without any cryptographic protection.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-035",
    name: "RSA Without Padding",
    desc: "Detects use of RSA encryption without secure padding schemes such as OAEP.",
    impact:
      "Raw RSA encryption is vulnerable to multiple cryptographic attacks, including message recovery and chosen ciphertext attacks, potentially exposing sensitive data.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-036",
    name: "Unencrypted Socket Communication",
    desc: "Detects use of plain sockets without TLS/SSL encryption for transmitting data over the network.",
    impact:
      "Data is transmitted in plaintext and can be intercepted, modified, or stolen by attackers performing network sniffing or man-in-the-middle attacks.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-037",
    name: "Weak Cryptographic Algorithm",
    desc: "Detects the use of weak cryptographic algorithms like Blowfish, RC2 or RC4.",
    impact:
      "Attackers can reverse these hashes using modern computing power, exposing passwords and sensitive data.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-038",
    name: "XML External Entity Misconfiguration",
    desc: "Detects XML parser configuration that allows external entity processing, enabling unsafe resolution of external resources.",
    impact:
      "Attackers can exploit XXE to read local files, perform server-side request forgery, or cause denial of service by forcing the server to load malicious external entities.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-039",
    name: "Anonymous LDAP Bind",
    desc: "LDAP connection allows binding without authentication (anonymous access).",
    impact:
      "Allows unauthorized users to query directory services, potentially exposing sensitive user information and enabling enumeration of accounts or system structure.",
    icon: FiAlertTriangle,
    color: "text-orange-500",
  },
  {
    id: "SEC-040",
    name: "Incorrect Hexadecimal Conversion",
    desc: "Hexadecimal encoding or decoding is implemented incorrectly using Integer.toHexString().",
    impact:
      "Incorrect conversion can corrupt data, break cryptographic operations, or introduce security vulnerabilities such as bypassing validation or weakening encoding-based protections.",
    icon: FiCode,
    color: "text-orange-500",
  },
  {
    id: "SEC-041",
    name: "Cookie Missing HttpOnly Flag",
    desc: "Cookies are set without the HttpOnly flag, allowing them to be accessed from client-side scripts.",
    impact:
      "Sensitive cookies such as session identifiers can be accessed via JavaScript, making them vulnerable to theft through Cross-Site Scripting (XSS) attacks and enabling session hijacking.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-042",
    name: "Cookie Missing Secure Flag",
    desc: "Cookies are set without the Secure flag, allowing them to be transmitted over unencrypted HTTP connections.",
    impact:
      "Sensitive cookies can be intercepted over insecure networks, enabling attackers to steal session identifiers and hijack user sessions.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-043",
    name: "Improper Neutralization of CRLF Sequences in HTTP Headers",
    desc: "Untrusted input is included in HTTP response headers without proper validation, allowing injection of CRLF sequences.",
    impact:
      "Attackers can manipulate HTTP responses to perform header injection, cache poisoning, Cross-Site Scripting (XSS), or redirect users to malicious content.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-044",
    name: "Insecure SMTP Connection",
    desc: "SMTP communication is performed without encryption or without enforcing secure protocols such as TLS.",
    impact:
      "Email contents, credentials, and metadata can be intercepted or modified in transit, enabling attackers to steal sensitive information or manipulate email communication.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-045",
    name: "Overly Permissive File Permissions",
    desc: "Files or directories are assigned permissions that allow broader access than necessary.",
    impact:
      "Unauthorized users or processes may read, modify, or execute sensitive files, leading to data exposure, tampering, or privilege escalation.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-046",
    name: "Use of User Input to Select Classes",
    desc: "User-controlled input is used to determine which classes are loaded or instantiated at runtime.",
    impact:
      "Attackers may influence class loading to execute unintended code paths, access restricted functionality, or trigger remote code execution depending on available classes.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-047",
    name: "Session ID Included in URL",
    desc: "Session identifiers are passed in the URL as query parameters or path segments instead of secure cookie storage.",
    impact:
      "Session IDs may be exposed through browser history, server logs, or referrer headers, enabling attackers to hijack user sessions.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-048",
    name: "Cleartext Password Transmission in Response Entity",
    desc: "Sensitive credentials such as passwords are returned in HTTP response entities without encryption or masking.",
    impact:
      "Passwords can be intercepted through network traffic, logs, or browser tools, leading to account compromise and unauthorized access.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-049",
    name: "Unsafe Use of doPrivileged Block",
    desc: "Privileged code execution blocks are used without proper restriction or validation of the executing context.",
    impact:
      "Attackers may escalate privileges or bypass security manager restrictions by exploiting improperly scoped privileged operations.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-050",
    name: "Password Hashing Without Salt",
    desc: "Passwords are hashed without using a unique salt value per password before storage.",
    impact:
      "Precomputed rainbow table attacks and hash reuse become possible, allowing attackers to recover multiple user passwords from leaked hashes.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-051",
    name: "Improper Resource Release",
    desc: "System resources such as files, streams, sockets, or database connections are not properly closed after use.",
    impact:
      "Leads to resource exhaustion, degraded performance, and potential application crashes due to exhausted file descriptors or connection limits.",
    icon: FiCommand,
    color: "text-yellow-500",
  },
  {
    id: "SEC-052",
    name: "Incomplete Cleanup of Temporary Files",
    desc: "Temporary files created during execution are not properly deleted after use.",
    impact:
      "Sensitive data may remain on disk longer than intended and can be accessed by unauthorized users or other processes.",
    icon: FiCommand,
    color: "text-yellow-500",
  },
  {
    id: "SEC-053",
    name: "Regex Pattern from String Parameter",
    desc: "Regular expression patterns are constructed directly from string parameters without validation or restrictions.",
    impact:
      "Attackers may supply crafted input that causes performance degradation (ReDoS), unexpected matching behavior, or bypass of input validation rules.",
    icon: FiCode,
    color: "text-orange-500",
  },
  {
    id: "SEC-054",
    name: "Plaintext Password Storage",
    desc: "Passwords are stored in plaintext within files, databases, or configuration properties.",
    impact:
      "Exposure of storage systems or backups can reveal user credentials, enabling account compromise and unauthorized access to services.",
    icon: FiLock,
    color: "text-red-600",
  },
  {
    id: "SEC-055",
    name: "Predictable Seed in PRNG",
    desc: "Pseudo-random number generators are initialized with predictable seed values.",
    impact:
      "Attackers may predict generated random values such as tokens, session IDs, or cryptographic keys, weakening security mechanisms.",
    icon: FiLock,
    color: "text-purple-500",
  },
  {
    id: "SEC-057",
    name: "Sensitive Information in Error Messages",
    desc: "Error messages returned by the application include internal system details or sensitive runtime information.",
    impact:
      "Attackers can use exposed information to map system architecture, identify vulnerabilities, or refine further attacks against the application.",
    icon: FiAlertTriangle,
    color: "text-orange-500",
  },
  {
    id: "SEC-058",
    name: "Sensitive Information Stored in Cookies",
    desc: "Cookies contain sensitive data that should not be stored on the client side.",
    impact:
      "Sensitive data stored in cookies can be exposed through client-side access, interception, or improper handling, leading to information disclosure and potential account compromise.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "SEC-059",
    name: "Sensitive Information in Logs",
    desc: "Sensitive data is written into application or system logs.",
    impact:
      "Log files may be accessed by unauthorized users, leading to exposure of sensitive information such as credentials, personal data, or system details.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "COR-001",
    name: "Assignment in Conditional",
    desc: "Assignment operator (=) is used inside a conditional statement instead of comparison.",
    impact:
      "Can cause logic bugs where conditions always evaluate unexpectedly, leading to security or flow bypass.",
    icon: FiAlertTriangle,
    color: "text-red-500",
  },
  {
    id: "COR-002",
    name: "Self Comparison Bug",
    desc: "A value is compared with itself using '==' or '!=' (e.g. x == x or x != x).",
    impact:
      "This leads to dead code, broken logic, or security checks that can never work correctly.",
    icon: FiAlertTriangle,
    color: "text-red-500",
  },
  {
    id: "COR-003",
    name: "Hardcoded Conditional Value",
    desc: "A condition always evaluates to true or false due to hardcoded constants.",
    impact:
      "Dead code paths or security checks that can never execute correctly.",
    icon: FiCommand,
    color: "text-yellow-500",
  },
  {
    id: "COR-004",
    name: "Improper String Comparison",
    desc: "Strings are compared using '==' instead of '.equals()'.",
    impact:
      "String content is not properly compared, causing authentication or validation bugs.",
    icon: FiAlertTriangle,
    color: "text-red-600",
  },
  {
    id: "COR-005",
    name: "Comparison of Classes by Name",
    desc: "Classes are compared using their name (e.g. getClass().getName()) instead of proper type checking like 'instanceof'.",
    impact:
      "This can lead to incorrect type checks, broken logic, and security bypass if class names are spoofed or refactored.",
    icon: FiAlertTriangle,
    color: "text-red-500",
  },
];
