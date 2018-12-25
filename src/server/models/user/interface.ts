import { Entity } from '../base';
import { TypeRoles } from '../../plugins/roles/interface';

/**
 * Description of user object
 */
interface Interface extends Entity {
  /**
   * JWT Auth token value
   */
  token?: string;
  /**
   * Assigned user access roles
   */
  roles: TypeRoles[];
  /**
   * Flag that indicates the user is active or not
   * Disabled user can't login
   */
  isActive: boolean;
  /**
   * Login will be used for identify user
   */
  login: string;
  /**
   * Password hash for validation of user authorisation
   * Default password: password123 / $2a$08$t/BCmqpB7IqiLrs627abBugo9BGHv3cCEvfFas52dxH5b6byBGNZ.
   */
  password: string;

  /**
   * Generate new access token for user
   * @returns {string}
   */
  generateToken (): string;

  /**
   * Method for validating user password
   * @param {string} requestPassword
   * @returns {boolean}
   */
  validatePassword (requestPassword: string): boolean;
}

export default Interface;
