"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUserEntity = exports.AuthType = exports.AuthProvider = void 0;
const authentication_enum_1 = require("./authentication.enum");
const role_enum_1 = require("./role.enum");
const user_base_entity_1 = require("./user_base.entity");
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["FIREBASE"] = "FIREBASE";
    AuthProvider["SUPABASE"] = "SUPABASE";
})(AuthProvider || (exports.AuthProvider = AuthProvider = {}));
var AuthType;
(function (AuthType) {
    AuthType["EMAIL_AND_PASSWORD"] = "EMAIL_AND_PASSWORD";
    AuthType["FACEBOOK_AUTH"] = "FACEBOOK_AUTH";
    AuthType["GOOGLE_AUTH"] = "GOOGLE_AUTH";
    AuthType["GITHUB_AUTH"] = "GITHUB_AUTH";
})(AuthType || (exports.AuthType = AuthType = {}));
class CommonUserEntity extends user_base_entity_1.BaseUserEntity {
    constructor(username, firstName, lastName, email, identificationNumber, phoneNumber, terms, notifications, isActive, uid, authProvider, authType, organizationClientId) {
        const role = role_enum_1.UserRole.COMMON_USER;
        super(firstName, lastName, email, role, organizationClientId);
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.identificationNumber = identificationNumber;
        this.phoneNumber = phoneNumber;
        this.terms = terms;
        this.notifications = notifications;
        this.isActive = isActive;
        this.uid = uid;
        this.role = role;
        this.authProvider = authProvider;
        this.authType = authType;
    }
    static fromPrisma(payload) {
        return new CommonUserEntity(payload.user_username, payload.user_first_name, payload.user_last_name, payload.user_email, payload.user_identification_number, payload.user_phone_number, payload.user_terms, payload.user_notifications, payload.user_is_active, payload.user_uid, payload.user_auth_provider, payload.user_auth_type, payload.user_organization_client_id);
    }
    toResponse() {
        return {
            id: this.getId(),
            username: this.getUsername(),
            firstName: this.getFirstName(),
            lastName: this.getLastName(),
            email: this.getEmail(),
            identificationNumber: this.getIdentificationNumber(),
            phoneNumber: this.getPhoneNumber(),
            terms: this.getTerms(),
            notifications: this.getNotifications(),
            isActive: this.getIsActive(),
            uid: this.getUid(),
            role: this.getRole(),
            authProvider: this.getAuthProvider(),
            authType: this.getAuthType(),
            clientId: this.getClientId(),
        };
    }
    getUsername() {
        return this.username;
    }
    setUsername(username) {
        this.username = username;
    }
    getIdentificationNumber() {
        return this.identificationNumber;
    }
    setIdentificationNumber(identificationNumber) {
        this.identificationNumber = identificationNumber;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    getTerms() {
        return this.terms;
    }
    setTerms(terms) {
        this.terms = terms;
    }
    getNotifications() {
        return this.notifications;
    }
    setNotifications(notifications) {
        this.notifications = notifications;
    }
    getIsActive() {
        return this.isActive;
    }
    setIsActive(isActive) {
        this.isActive = isActive;
    }
    getUid() {
        return this.uid;
    }
    setUid(uid) {
        this.uid = uid;
    }
    getAuthProvider() {
        return this.authProvider;
    }
    setAuthProvider(authProvider) {
        this.authProvider = authProvider;
    }
    getAuthType() {
        return this.authType;
    }
    setAuthType(authType) {
        this.authType = authType;
    }
    getPermissions() {
        return Promise.resolve([authentication_enum_1.PermissionsValues.GUEST_USER]);
    }
}
exports.CommonUserEntity = CommonUserEntity;
