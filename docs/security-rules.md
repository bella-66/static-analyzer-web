# Security Rules

This document describes all security rules detected by the Static Analyzer.

---

## Hardcoded Credentials

### Description

Detects passwords or secrets hardcoded in source files.

### Impact

Can lead to full system compromise if attackers access the source code or compiled binaries.

---

## Hardcoded API Key

### Description

Detects API keys embedded directly in code.

### Impact

Allows unauthorized access to external services and cloud resources.

---

## Hardcoded Crypto Key

### Description

Detects cryptographic keys hardcoded in source files.

### Impact

Exposing cryptographic keys allows attackers to decrypt sensitive data, forge signatures, impersonate services, and completely break the application's security model.

---

## SQL Injection

### Description

Detects unsanitized user input passed to SQL queries via string concatenation.

### Impact

Allows attackers to execute arbitrary SQL, read sensitive data, or permanently destroy your databases.

---

## Command Injection

### Description

User input without proper validation is passed into system commands or runtime execution.

### Impact

Allows remote code execution on the server.

---

## LDAP Injection

### Description

User-controlled strings concatenated into LDAP queries.

### Impact

Can bypass authentication or extract directory data.

---

## Open Redirect

### Description

Redirect URLs are built from user input without proper validation.

### Impact

Users can be tricked into visiting malicious websites.

---

## Cross-Site Scripting (XSS)

### Description

Detects unsanitized input rendered directly into HTML or JS output.

### Impact

Allows attackers to steal user session cookies, redirect users, or deface your frontend interface.

---

## Weak Hash Algorithm

### Description

Detects the use of weak hash algorithms like MD5, SHA1 or SHA224.

### Impact

Attackers can reverse these hashes using modern computing power, exposing passwords and sensitive data.

---

## Insecure Randomness

### Description

Detects usage of java.util.Random for security-sensitive operations instead of SecureRandom.

### Impact

Because java.util.Random is deterministic, attackers can predict generated values such as session tokens or reset codes, enabling authentication bypass, session hijacking, or cryptographic compromise.

---

## Plaintext Password Storage

### Description

Passwords are stored in plaintext within files, databases, or configuration properties.

### Impact

Exposure of storage systems or backups can reveal user credentials, enabling account compromise and unauthorized access to services.

---

## Password Hashing Without Salt

### Description

Passwords are hashed without using a unique salt value per password before storage.

### Impact

Precomputed rainbow table attacks and hash reuse become possible, allowing attackers to recover multiple user passwords from leaked hashes.

---

## Improper Resource Release

### Description

System resources such as files, streams, sockets, or database connections are not properly closed after use.

### Impact

Leads to resource exhaustion, degraded performance, and potential application crashes due to exhausted file descriptors or connection limits.

---

## Incomplete Cleanup of Temporary Files

### Description

Temporary files created during execution are not properly deleted after use.

### Impact

Sensitive data may remain on disk longer than intended and can be accessed by unauthorized users or other processes.

---

## Overly Permissive File Permissions

### Description

Files or directories are assigned permissions that allow broader access than necessary.

### Impact

Unauthorized users or processes may read, modify, or execute sensitive files, leading to data exposure, tampering, or privilege escalation.

---

## Predictable Seed in PRNG

### Description

Pseudo-random number generators are initialized with predictable seed values.

### Impact

Attackers may predict generated random values such as tokens, session IDs, or cryptographic keys, weakening security mechanisms.

---

## Sensitive Information in Error Messages

### Description

Error messages returned by the application include internal system details or sensitive runtime information.

### Impact

Attackers can use exposed information to map system architecture, identify vulnerabilities, or refine further attacks against the application.

---

## Sensitive Information Stored in Cookies

### Description

Cookies contain sensitive data that should not be stored on the client side.

### Impact

Sensitive data stored in cookies can be exposed through client-side access, interception, or improper handling, leading to information disclosure and potential account compromise.

---

## Sensitive Information in Logs

### Description

Sensitive data is written into application or system logs.

### Impact

Log files may be accessed by unauthorized users, leading to exposure of sensitive information such as credentials, personal data, or system details.

---

## Deserialization of Untrusted Input

### Description

Untrusted objects are deserialized without input validation.

### Impact

Can lead to remote code execution.

---

## Log Injection

### Description

Untrusted user input is written directly into logs without proper validation.

### Impact

Attackers can forge or manipulate log entries, hide malicious actions, or inject fake audit trails, making incident detection and forensics unreliable.

---

## Socket Bound to All Interfaces

### Description

A network socket is bound to 0.0.0.0 or all network interfaces instead of a specific trusted interface.

### Impact

Exposes the service to all network interfaces, increasing the attack surface and allowing unauthorized external access if firewall rules are misconfigured.

---

## Code Execution from Untrusted Input

### Description

Untrusted input is executed as code within the application runtime (e.g. eval, scripting engines, groovy shell).

### Impact

Allows attackers to execute arbitrary code on the server, leading to full system compromise, data theft, or complete takeover of the application.

---

## CSRF Protection Disabled

### Description

Cross-Site Request Forgery (CSRF) protection is disabled or not enforced for state-changing requests in the application.

### Impact

Attackers can trick authenticated users into executing unwanted actions such as changing settings, transferring funds, or modifying sensitive data without their consent.

---

## Tainted Environment Variable

### Description

Application uses environment variables that may be controlled or influenced by untrusted sources without validation or sanitization.

### Impact

Attackers may manipulate environment configuration to alter application behavior, bypass security controls, expose secrets, or redirect execution flow.

---

## Tainted Session

### Description

Detects user input flowing directly into session storage methods such as setAttribute without validation.

### Impact

Attackers can inject or overwrite session values, leading to session poisoning, privilege escalation, authentication bypass, or impersonation of other users.

---

## XPath Injection

### Description

Detects user input being directly used in XPath queries without proper validation.

### Impact

Attackers can manipulate XPath expressions to bypass authentication, access unauthorized XML data, or extract sensitive information from XML-based storage.

---

## Spring Model Injection

### Description

Detects untrusted user input being placed into Spring MVC models or views without proper output encoding.

### Impact

Can lead to Cross-Site Scripting (XSS) where attackers execute malicious scripts in the user's browser, steal session cookies, or manipulate page content.

---

## Path Traversal

### Description

Detects user-controlled input being used to construct file paths without proper validation.

### Impact

Attackers can access arbitrary files on the server, including configuration files, source code, or sensitive system data, potentially leading to full system compromise.

---

## URL Host Injection

### Description

Detects user input being used to construct the host portion of a URL without proper validation.

### Impact

Attackers can redirect requests to malicious servers, enabling phishing, credential theft, server-side request manipulation, or bypass of security controls.

---

## Permissive CORS Configuration

### Description

Cross-Origin Resource Sharing (CORS) is configured too permissively, allowing requests from untrusted or all origins.

### Impact

Attackers can make authenticated cross-origin requests from malicious websites, leading to data theft, session abuse, or unauthorized actions on behalf of the user.

---

## Unrestricted Request Mapping

### Description

Detects overly broad request mappings in a Spring application that expose endpoints without proper restrictions.

### Impact

Attackers may access sensitive or internal endpoints that should be restricted, potentially leading to data exposure, privilege escalation, or unauthorized actions.

---

## Custom Digest Implementation

### Description

Detects custom implementation of cryptographic hash or digest functions instead of using standard, well-tested cryptographic libraries.

### Impact

Custom cryptographic implementations are often flawed and can lead to weak hashing, collision vulnerabilities, or complete bypass of integrity checks, compromising data security.

---

## Deprecated DefaultHttpClient Usage

### Description

Detects usage of the deprecated DefaultHttpClient class for making HTTP requests.

### Impact

Deprecated HTTP clients may lack security fixes and modern TLS support, leading to insecure communication, compatibility issues, or exposure to man-in-the-middle attacks.

---

## Weak Cryptographic Algorithm

### Description

Detects the use of weak cryptographic algorithms like Blowfish, RC2 or RC4.

### Impact

Attackers can reverse these hashes using modern computing power, exposing passwords and sensitive data.

---

## Weak Cryptographic Key

### Description

Detects use of cryptographic or key-based algorithms (DH, RSA, DSA, Blowfish) configured with insecurely small key sizes.

### Impact

Weak key sizes can be brute-forced or cracked much faster, allowing attackers to recover sensitive data, forge signatures, or bypass integrity protections.

---

## Use of Deprecated DES/3DES (DESede)

### Description

Detects usage of outdated symmetric encryption algorithms such as DES or 3DES (DESede).

### Impact

These legacy algorithms are cryptographically weak and vulnerable to modern brute-force attacks, allowing attackers to decrypt sensitive data and compromise confidentiality.

---

## Use of ECB Mode for Encryption

### Description

Detects use of Electronic Codebook (ECB) mode in symmetric encryption algorithms.

### Impact

ECB mode does not properly randomize encrypted data, making patterns visible and allowing attackers to infer information about the plaintext, weakening overall data confidentiality.

---

## GCM Nonce Reuse

### Description

Detects reuse of initialization vectors (nonces) in AES-GCM encryption mode.

### Impact

Reusing nonces in GCM breaks cryptographic security, allowing attackers to recover plaintext, forge authentication tags, or fully compromise encrypted communication.

---

## MD5 Used for Password Hashing

### Description

Detects use of MD5 hashing algorithm for password storage or authentication purposes.

### Impact

MD5 is cryptographically broken and vulnerable to fast brute-force and rainbow table attacks, allowing attackers to recover user passwords and compromise accounts.

---

## Use of Null Cipher

### Description

Detects usage of a null cipher or disabled encryption configuration where data is transmitted or stored without actual encryption.

### Impact

Data is effectively sent or stored in plaintext, allowing attackers to intercept, read, or modify sensitive information without any cryptographic protection.

---

## RSA Without Padding

### Description

Detects use of RSA encryption without secure padding schemes such as OAEP.

### Impact

Raw RSA encryption is vulnerable to multiple cryptographic attacks, including message recovery and chosen ciphertext attacks, potentially exposing sensitive data.

---

## Weak SSL Configuration

### Description

Detects insecure SSL/TLS context configuration that uses weak protocols, insecure defaults, or disabled security checks.

### Impact

Can allow attackers to exploit weak encryption settings, downgrade attacks, or intercept sensitive data through man-in-the-middle attacks.

---

## Cleartext Password Transmission in Response Entity

### Description

Sensitive credentials such as passwords are returned in HTTP response entities without encryption or masking.

### Impact

Passwords can be intercepted through network traffic, logs, or browser tools, leading to account compromise and unauthorized access.

---

## Unencrypted Socket Communication

### Description

Detects use of plain sockets without TLS/SSL encryption for transmitting data over the network.

### Impact

Data is transmitted in plaintext and can be intercepted, modified, or stolen by attackers performing network sniffing or man-in-the-middle attacks.

---

## XML External Entity Misconfiguration

### Description

Detects XML parser configuration that allows external entity processing, enabling unsafe resolution of external resources.

### Impact

Attackers can exploit XXE to read local files, perform server-side request forgery, or cause denial of service by forcing the server to load malicious external entities.

---

## Anonymous LDAP Bind

### Description

LDAP connection allows binding without authentication (anonymous access).

### Impact

Allows unauthorized users to query directory services, potentially exposing sensitive user information and enabling enumeration of accounts or system structure.

---

## Incorrect Hexadecimal Conversion

### Description

Hexadecimal encoding or decoding is implemented incorrectly using Integer.toHexString().

### Impact

Incorrect conversion can corrupt data, break cryptographic operations, or introduce security vulnerabilities such as bypassing validation or weakening encoding-based protections.

---

## Cookie Missing HttpOnly Flag

### Description

Cookies are set without the HttpOnly flag, allowing them to be accessed from client-side scripts.

### Impact

Sensitive cookies such as session identifiers can be accessed via JavaScript, making them vulnerable to theft through Cross-Site Scripting (XSS) attacks and enabling session hijacking.

---

## Cookie Missing Secure Flag

### Description

Cookies are set without the Secure flag, allowing them to be transmitted over unencrypted HTTP connections.

### Impact

Sensitive cookies can be intercepted over insecure networks, enabling attackers to steal session identifiers and hijack user sessions.

---

## Improper Neutralization of CRLF Sequences in HTTP Headers

### Description

Untrusted input is included in HTTP response headers without proper validation, allowing injection of CRLF sequences.

### Impact

Attackers can manipulate HTTP responses to perform header injection, cache poisoning, Cross-Site Scripting (XSS), or redirect users to malicious content.

---

## Insecure SMTP Connection

### Description

SMTP communication is performed without encryption or without enforcing secure protocols such as TLS.

### Impact

Email contents, credentials, and metadata can be intercepted or modified in transit, enabling attackers to steal sensitive information or manipulate email communication.

---

## Use of User Input to Select Classes

### Description

User-controlled input is used to determine which classes are loaded or instantiated at runtime.

### Impact

Attackers may influence class loading to execute unintended code paths, access restricted functionality, or trigger remote code execution depending on available classes.

---

## Session ID Included in URL

### Description

Session identifiers are passed in the URL as query parameters or path segments instead of secure cookie storage.

### Impact

Session IDs may be exposed through browser history, server logs, or referrer headers, enabling attackers to hijack user sessions.

---

## Unsafe Use of doPrivileged Block

### Description

Privileged code execution blocks are used without proper restriction or validation of the executing context.

### Impact

Attackers may escalate privileges or bypass security manager restrictions by exploiting improperly scoped privileged operations.

---

## Regex Pattern from String Parameter

### Description

Regular expression patterns are constructed directly from string parameters without validation or restrictions.

### Impact

Attackers may supply crafted input that causes performance degradation (ReDoS), unexpected matching behavior, or bypass of input validation rules.

---

## Insecure Hostname Verifier

### Description

Detects usage of a hostname verifier that disables or weakens hostname validation during TLS/SSL connections.

### Impact

Attackers can perform man-in-the-middle attacks by impersonating trusted servers, leading to data interception, credential theft, or session hijacking.

---

## Insecure Trust Manager

### Description

Detects usage of a custom or permissive TrustManager that bypasses proper certificate validation in TLS/SSL connections.

### Impact

Disables proper certificate validation, allowing attackers to perform man-in-the-middle attacks, intercept sensitive data, and impersonate trusted servers.

---

## Assignment in Conditional

### Description

Assignment operator (=) is used inside a conditional statement instead of comparison.

### Impact

Can cause logic bugs where conditions always evaluate unexpectedly, leading to security or flow bypass.

---

## Self Comparison Bug

### Description

A value is compared with itself using '==' or '!=' (e.g. x == x or x != x).

### Impact

This leads to dead code, broken logic, or security checks that can never work correctly.

---

## Hardcoded Conditional Value

### Description

A condition always evaluates to true or false due to hardcoded constants.

### Impact

Dead code paths or security checks that can never execute correctly.

---

## Improper String Comparison

### Description

Strings are compared using '==' instead of '.equals()'.

### Impact

String content is not properly compared, causing authentication or validation bugs.

---

## Comparison of Classes by Name

### Description

Classes are compared using their name (e.g. getClass().getName()) instead of proper type checking like 'instanceof'.

### Impact

This can lead to incorrect type checks, broken logic, and security bypass if class names are spoofed or refactored.

---
