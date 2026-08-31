# SmartBazaar - Security Policy

## Overview
SmartBazaar takes security seriously. This document outlines our security practices and how to report vulnerabilities.

## Security Features

### Authentication & Authorization
- Supabase Auth with JWT tokens
- OAuth 2.0 integration (Google)
- Row-Level Security (RLS) on database
- Secure password hashing
- Session management

### Data Protection
- HTTPS/TLS encryption in transit
- Database encryption at rest
- Sensitive data in environment variables
- Input validation and sanitization
- SQL injection prevention via parameterized queries

### Payment Security
- PCI-DSS compliance via Razorpay
- Tokenization of payment data
- Secure API key management
- Payment verification

## Security Best Practices

### For Users
- Never share your password
- Use strong passwords
- Enable 2FA when available
- Verify links before clicking
- Report suspicious activity

### For Developers
- Keep dependencies updated
- Use environment variables for secrets
- Validate all user inputs
- Implement rate limiting
- Log security events
- Regular security audits

## Reporting Security Issues

### Do NOT
- Publicly disclose vulnerabilities
- Access data without authorization
- Perform DOS attacks
- Share vulnerability details

### DO
- Email security@smartbazaar.com
- Include detailed description
- Provide proof of concept (if safe)
- Allow time for fix before disclosure
- Use responsible disclosure

## Incident Response

1. **Report received** - Acknowledged within 48 hours
2. **Assessment** - Severity and impact evaluation
3. **Fix** - Patch developed and tested
4. **Release** - Security update deployed
5. **Disclosure** - Public advisory issued (if needed)

## Dependencies Security

- Regular npm audit checks
- Automated dependency updates
- Security scanning in CI/CD
- Vulnerable package removal

## Database Security

- RLS policies on all sensitive tables
- Principle of least privilege
- Regular backups
- Encryption enabled
- Access logging

## API Security

- Rate limiting
- Request validation
- CORS configuration
- API key management
- Audit logging

## Compliance

- GDPR compliant
- Data retention policies
- User data export on request
- Account deletion capability
- Privacy policy available

## Updates & Patches

- Security updates within 24-48 hours
- Critical updates immediate
- Regular patch releases
- Changelog maintained

## Support

For security concerns: security@smartbazaar.com
For general support: support@smartbazaar.com

---

Last Updated: 2024
