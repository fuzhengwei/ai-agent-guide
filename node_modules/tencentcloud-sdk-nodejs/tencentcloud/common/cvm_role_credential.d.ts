import { Credential, DynamicCredential, CredentialResult } from "./interface";
interface CvmRoleCredentialResult extends CredentialResult {
    Code: string;
}
/**
 * Tencent Cloud Credential via CVM role
 *
 * Automatically generates temporary credentials when binding a service role to instance.
 * @see {@link https://cloud.tencent.com/document/product/598/85616} for more information.
 */
export default class CvmRoleCredential implements DynamicCredential {
    protected roleNameTask: Promise<string> | null;
    protected credentialTask: Promise<CvmRoleCredentialResult> | null;
    protected getRoleName(): Promise<string>;
    protected getRoleCredential(roleName: string): Promise<CvmRoleCredentialResult>;
    getCredential(): Promise<Credential>;
}
export {};
