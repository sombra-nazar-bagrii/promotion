export const ROUTES_DATA = {
  PRIVATE: {
    title: 'Private',
    url: '',
    children: {
      PROFILE: {
        title: 'The best articles',
        url: 'profile',
        children: {
          MY_PROFILE: {
            title: 'My Profile',
            url: 'my',
            fullUrl: 'profile/my'
          },
          PROFILE_INFO: {
            title: 'Profile info',
            url: ':id',
            fullUrl: 'profile/:id'
          },
        }
      },
      DASHBOARD: {
        title: 'Dashboard',
        url: 'dashboard',
      },
    }
  },

  AUTH: {
    title: 'Auth',
    url: '',
    children: {
      SIGN_IN: {
        url: '',
        title: 'Sign In',
      },
      SIGN_UP: {
        url: 'sign-up',
        title: 'Sign Up',
      },
      FORGOT_PASSWORD: {
        url: 'forgot-password',
        title: 'Forgot Password',
      },
    },
  },
};
