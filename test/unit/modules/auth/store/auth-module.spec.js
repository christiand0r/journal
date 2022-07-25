import { describe, expect, test } from "vitest";

import createVuexStore from "../../../mocks/data/mockStore";

import authApi from "@/api/authAPI.js";

describe("Vuex: Test in auth module", () => {
  test("This must be the initial state", () => {
    const store = createVuexStore({
      user: null,
      status: "authenticating",
      token: null,
      refreshToken: null,
    });

    const { user, status, token, refreshToken } = store.state.auth;

    expect(user).toBe(null);
    expect(status).toBe("authenticating");
    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
  });

  // @Mutations
  test("Mutation: loginUser", () => {
    const store = createVuexStore({
      user: null,
      status: "authenticating",
      token: null,
      refreshToken: null,
    });

    const payload = {
      user: { name: "Test", email: "test@test.com" },
      token: "abc123",
      refreshToken: "xyz123",
    };

    store.commit("auth/loginUser", payload);

    const { user, status, token, refreshToken } = store.state.auth;

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "Test", email: "test@test.com" });
    expect(token).toBeTypeOf("string");
    expect(refreshToken).toBeTypeOf("string");
  });

  test("Mutation: logoutUser", () => {
    const store = createVuexStore({
      user: { name: "Test", email: "test@test.com" },
      status: "authenticated",
      token: "abc123",
      refreshToken: "xyz123",
    });

    localStorage.setItem("token", "abc123");
    localStorage.setItem("refreshToken", "xyz123");

    store.commit("auth/logoutUser");

    const { user, status, token, refreshToken } = store.state.auth;

    expect(status).toBe("not-authenticated");
    expect(user).toBeFalsy();
    expect(token).toBeFalsy(null);
    expect(refreshToken).toBeFalsy(null);

    // Check localStorage
    expect(localStorage.getItem("token")).toBeFalsy();
    expect(localStorage.getItem("refreshToken")).toBeFalsy();
  });

  // @Getters
  test("Mutation: currentStateAuth and currentUser", () => {
    const store = createVuexStore({
      user: { name: "Test", email: "test@test.com" },
      status: "authenticated",
      token: "abc123",
      refreshToken: "xyz123",
    });

    expect(store.getters["auth/currentStateAuth"]).toBe("authenticated");

    expect(store.getters["auth/currentUser"]).toBe("Test");
  });

  // @Actions
  test("Actions: createUser when user exist", async () => {
    const store = createVuexStore({
      user: null,
      status: "authenticating",
      token: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Test",
      email: "test@test.com",
      password: "123456",
    };

    const res = await store.dispatch("auth/createUser", newUser);

    expect(res).toEqual({ code: 400, message: "EMAIL_EXISTS", ok: false });
  });

  test("Actions: createUser when user not exist", async () => {
    const store = createVuexStore({
      user: null,
      status: "authenticating",
      token: null,
      refreshToken: null,
    });

    const newUser = {
      name: "Tester",
      email: "test2@test.com",
      password: "123456",
    };

    const res = await store.dispatch("auth/createUser", newUser);

    const { token, user } = store.state.auth;

    expect(res).toEqual({ ok: true });
    expect(user).toMatchObject({ name: "Tester", email: "test2@test.com" });

    // Delete user create
    await authApi.post(":delete", { idToken: token });
  });

  test("Actions: checkAuthentication positive", async () => {
    const store = createVuexStore({
      user: null,
      status: "not-authenticated",
      token: null,
      refreshToken: null,
    });

    // Login with user test user
    await store.dispatch("auth/singInUser", {
      email: "test@test.com",
      password: "123456",
    });

    const { token } = store.state.auth;

    // Clear state for prevent false positives
    store.commit("auth/logoutUser");

    // Set again the token
    localStorage.setItem("token", token);

    const res = await store.dispatch("auth/checkAuthentication");

    const { user, status, token: Token } = store.state.auth;

    expect(res).toEqual({ ok: true });

    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "test", email: "test@test.com" });
    expect(Token).toBeTypeOf("string");
  });

  test("Actions: checkAuthentication negative", async () => {
    const store = createVuexStore({
      user: null,
      status: "authenticating",
      token: null,
      refreshToken: null,
    });

    //Clear localStorage
    localStorage.removeItem("token");

    const res = await store.dispatch("auth/checkAuthentication");

    const { status } = store.state.auth;

    expect(res).toEqual({ ok: false, message: "Token no encontrado" });

    expect(status).toBe("not-authenticated");
  });

  test("Actions: checkAuthentication invalid token", async () => {
    const store = createVuexStore({
      user: null,
      status: "authenticating",
      token: null,
      refreshToken: null,
    });

    // Set the token
    localStorage.setItem("token", `ABC-123`);

    const res = await store.dispatch("auth/checkAuthentication");

    const { status } = store.state.auth;

    expect(res).toEqual({ ok: false, message: "INVALID_ID_TOKEN" });
    expect(status).toBe("not-authenticated");
  });
});
