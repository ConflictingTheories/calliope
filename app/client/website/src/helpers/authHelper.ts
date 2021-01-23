/*
 * ---------------------------- *
 *                              *
 * 2020 (c) Kyle Derby MacInnis *
 *                              *
 * ---------------------------- *
 */

// import { session } from "electron";

// Auth Helper Class
class Authenticator {
  // Return Auth Header with Token
  static authHeader() {
    try {
      let user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user && user.authdata)
        return { Authorization: "Basic " + user.authdata };
      else return { Authorization: "" };
    } catch (e) {
      Authenticator.clearAuthData();
      return { Authorization: "" };
    }
  }

  // Checkf for Auth Status
  static isAuthenticated() {
    if (!sessionStorage.user && !localStorage.user) {
      return false;
    } else {
      try {
        var CalliopeUser = JSON.parse(sessionStorage.user || localStorage.user);
        if (CalliopeUser && CalliopeUser.is_authorized) return true;
        else return false;
      } catch (e) {
        Authenticator.clearAuthData();
        return false;
      }
    }
  }

  // Check for Admin Status
  static isAdmin() {
    if (!sessionStorage.user && !localStorage.user) {
      return false;
    } else {
      try {
        var CalliopeUser = JSON.parse(sessionStorage.user || localStorage.user);
        if (CalliopeUser && CalliopeUser.is_admin) return true;
        else return false;
      } catch (e) {
        Authenticator.clearAuthData();
        return false;
      }
    }
  }

  // Set Auth Data
  static setAuthData(authdata: any) {
    localStorage.setItem("user", JSON.stringify(authdata));
    sessionStorage.setItem("user", JSON.stringify(authdata));
  }

  // Clear Auth Data
  static clearAuthData() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }
}

export default Authenticator;
