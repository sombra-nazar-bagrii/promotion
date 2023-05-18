describe('User auth', () => {
  describe('Reset password page', () => {
    beforeEach(() => cy.fixture('auth').then((auth) => cy.get(auth.path.login.forgotPassLink).click()));

    it('Verify that user unable to trigger email for not registered user', () => {
      cy.fixture('auth').then(data => {
        cy.get(`${data.path.forgotPassword.submitBtn} button`).should('be.disabled');
        cy.get(data.path.forgotPassword.emailField).type('notValidEmailaddress@coo.cc');
        cy.get(`${data.path.forgotPassword.submitBtn} button`).should('not.be.disabled');
        cy.get(data.path.forgotPassword.submitBtn).click();
        cy.contains('There is no user record corresponding to this identifier.');
      });
    });

    it('Verify that user able to trigger email for registered user', () => {
      cy.fixture('auth').then(data => {
        cy.get(`${data.path.forgotPassword.submitBtn} button`).should('be.disabled');
        cy.get(data.path.forgotPassword.emailField).type(data.email);
        cy.get(`${data.path.forgotPassword.submitBtn} button`).should('not.be.disabled');
        cy.get(data.path.forgotPassword.submitBtn).click();
        cy.contains('Reset password link send to the provided email address.');
      });
    });
  });

  describe('Login page', () => {
    it('Verify that user unable to login with invalid credentials', () => {
      cy.fixture('auth').then(data => {
        cy.promo_login(data.email, '000000');
        cy.contains('Please check correctness of entered data');
      });
    });

    it('Verify validation for email field', () => {
      cy.fixture('auth').then((auth) => {
        cy.get(auth.path.login.emailField).click();
        cy.get(auth.path.login.passwordField).click();

        cy.get(`${auth.path.login.submitBtn} button`).should('be.disabled');
        cy.get(auth.path.login.emailField)
          .contains('Please fill the field')
          .type('invalid');

        cy.get(`${auth.path.login.submitBtn} button`).should('be.disabled');
        cy.get(auth.path.login.emailField).contains('Invalid email address');
      });
    });

    it('Verify validation for password field', () => {
      cy.fixture('auth').then((auth) => {
        cy.get(auth.path.login.passwordField).click();
        cy.get(auth.path.login.emailField).click();

        cy.get(`${auth.path.login.submitBtn} button`).should('be.disabled');
        cy.get(auth.path.login.passwordField).contains('Please fill the field').type('test');

        cy.get(`${auth.path.login.submitBtn} button`).should('be.disabled');
        cy.get(auth.path.login.passwordField).contains('Field should be at least 6 chars length');
      });
    });
    it('Verify that user able to login with proper credentials', () => {
      cy.fixture('auth').then(auth => {
        cy.promo_login(auth.email, auth.password);
        cy.url().should('include', 'dashboard');
        cy.contains('Articles Dashboard');
        cy.promo_logout();
      })
    });
  })

  describe('Registration page', () => {
    beforeEach(() => cy.fixture('auth').then((auth) => cy.get(auth.path.login.regLink).click()));

    it('Verify validation for name and age fields', function () {
      cy.fixture('auth').then((auth) => {
        cy.get(auth.path.reg.nameField).click();
        cy.get(auth.path.reg.ageField).click();
        cy.get(auth.path.reg.nameField).click().contains('Please fill the field');
        cy.get(auth.path.reg.ageField).contains('Please fill the field');
        cy.get(`${auth.path.reg.submitBtn} button`).should('be.disabled');
      });
    });

    it('Verify validation for email field', () => {
      cy.fixture('auth').then((auth) => {
        cy.get(auth.path.reg.emailField).click();
        cy.get(auth.path.reg.passwordField).click();

        cy.get(`${auth.path.reg.submitBtn} button`).should('be.disabled');
        cy.get(auth.path.reg.emailField).contains('Please fill the field');
      });
    });

    it('Verify validation for password and confirm password fields', () => {
      cy.fixture('auth').then((auth) => {
        const password = Math.random().toString(36).slice(-8);
        const notTheSamePassword = Math.random().toString(36).slice(-8);

        cy.get(auth.path.reg.passwordField).click();
        cy.get(auth.path.reg.confirmPasswordField).click();

        cy.get(auth.path.reg.passwordField)
          .click()
          .contains('Please fill the field')
          .type('test');

        cy.get(auth.path.reg.confirmPasswordField)
          .click()
          .contains('Please fill the field')
          .type('test');

        cy.get(auth.path.reg.passwordField).contains('Field should be at least 6 chars length');
        cy.get(auth.path.reg.confirmPasswordField).contains('Field should be at least 6 chars length');
        cy.get(`${auth.path.reg.submitBtn} button`).should('be.disabled');

        cy.get(auth.path.reg.passwordField).type(password);
        cy.get(auth.path.reg.confirmPasswordField).type(notTheSamePassword).contains('Passwords should match');
      });
    });

    it('Verify that user able to sign up with already registered email', () => {
      cy.fixture('auth').then((auth) => {
        const testIdx = Math.floor((Math.random() * 99) + 1);
        const password = Math.random().toString(36).slice(-8);

        cy.get(`${auth.path.reg.nameField} input`).type(`Test ${testIdx}`);
        cy.get(`${auth.path.reg.ageField} input`).type(testIdx.toString());
        cy.get(`${auth.path.reg.emailField} input`).type(auth.email);
        cy.get(`${auth.path.reg.passwordField} input`).type(password);
        cy.get(`${auth.path.reg.confirmPasswordField} input`).type(password);
        cy.get(auth.path.reg.submitBtn).click();
        cy.contains('The email address is already in use by another account.');
      });
    });

    it('Verify that user able to sign up with proper user data ', () => {
      cy.fixture('auth').then((auth) => {
        const testIdx = Math.floor((Math.random() * 99) + 1);
        const password = Math.random().toString(36).slice(-8);

        cy.get(`${auth.path.reg.nameField} input`).type(`Test ${testIdx}`);
        cy.get(`${auth.path.reg.ageField} input`).type(testIdx.toString());
        cy.get(`${auth.path.reg.emailField} input`).type(`nazaritikus+${testIdx}@gmail.com`);
        cy.get(`${auth.path.reg.passwordField} input`).type(password);
        cy.get(`${auth.path.reg.confirmPasswordField} input`).type(password);
        cy.get(auth.path.reg.submitBtn).click();
        cy.contains('Confirmation link send to the provided email address. Please confirm your account and login.');
        cy.url().should('include', 'dashboard');
        cy.contains('Articles Dashboard');
        cy.promo_logout();
      });
    });
  });
});
