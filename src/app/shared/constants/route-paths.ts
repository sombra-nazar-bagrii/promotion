export const ROUTES_DATA = {
  PRIVATE: {
    title: 'Private',
    url: '',
    children: {
      PROFILE: {
        title: 'Profile',
        url: 'profile',
      },
      DASHBOARD: {
        title: 'Dashboard',
        url: 'dashboard',
      },
      ARTICLE: {
        title: 'Article',
        url: 'article'
      }
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
