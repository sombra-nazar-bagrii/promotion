describe('Weather widget', function () {

  beforeEach(() => {
    cy.visit('/');
    cy.fixture('auth').then(auth => cy.promo_login(auth.email, auth.password));
  });

  it('Verify that Lviv region displays by default', function () {
    cy.fixture('weather').then(weather => {
      cy.get(weather.weatherLocation).contains('Lviv');
    })
  });

  it('Verify that user able to change region', function () {
    cy.fixture('weather').then(weather => {
      const newRegion = 'Ternopil';

      cy.get(weather.weatherMenu).click();
      cy.get(`[data-test="weatherRegion_${newRegion}"]`).contains(newRegion).click();
      cy.get(weather.weatherLocation).contains(newRegion);
    })
  });

  it('Verify that today\'s date displays', function () {
    cy.fixture('weather').then(weather => {
      cy.get(weather.weatherDate).contains(new Date().toLocaleString('en-US', { month: 'long', day: 'numeric' }));
    })
  });

  afterEach(() => cy.promo_logout());
});
