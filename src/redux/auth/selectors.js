export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectToastError = (state) => state.auth.toastError;
export const selectToastSuccess = (state) => state.auth.toastSuccess;
