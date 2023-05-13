export const SNACK_BAR = {
  error: {
    auth: {
      invalid_email: {
        key: 'Whoops',
        value: 'The email address is badly formatted.',
      },
      user_not_found: {
        key: 'Whoops',
        value: 'There is no user record corresponding to this identifier.',
      },
      popup_closed_by_user: {
        key: 'Whoops',
        value: 'Please try again and select you account',
      },
      wrong_password: {
        key: 'Whoops',
        value: 'Please check correctness of entered data',
      },
    },
    SERVER_ERROR: {
      key: 'Something went wrong!',
      value: 'Please try again letter',
    },
    invalid_file_type: {
      key: 'Whoops',
      value: 'Looks like you are using unsupported file types. Please use only .png or .jpg.',
    },
    invalid_file_size: {
      key: 'Whoops',
      value: 'Looks like you are trying upload too big file.',
    },
  },
  success: {
    account_created: {
      key: 'Success!',
      value: 'Confirmation link send to the provided email address. Please confirm your account and login.',
    },
    password_change_request: {
      key: 'Success!',
      value: 'Reset password link send to the provided email address.',
    },
    article_updated: {
      key: 'Success!',
      value: 'Article information updated successfully.',
    },
    article_created: {
      key: 'Success!',
      value: 'Article successfully created and published.',
    },
    article_deleted: {
      key: 'Success!',
      value: 'Article successfully deleted.',
    },
    user_info_updated: {
      key: 'Success!',
      value: 'Profile information successfully updated.',
    },
    user_password_updated: {
      key: 'Success!',
      value: 'Password successfully updated.',
    },
    user_avatar_updated: {
      key: 'Success!',
      value: 'Profile avatar successfully updated.',
    }
  },
  info: {

  }
}
