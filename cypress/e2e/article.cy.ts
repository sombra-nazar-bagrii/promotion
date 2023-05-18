describe('Articles', () => {
  beforeEach(() => cy.fixture('auth').then(auth => cy.promo_login(auth.email, auth.password)));

  describe('Add new article', () => {
    beforeEach(() => cy.fixture('article')
      .then(article => cy.get(article.addNewArticleBtn).click()));

    it('Verify title form validation rules', function () {
      cy.fixture('article').then((article) => {
        cy.get(article.manageArticleTitle).click();
        cy.get(article.manageArticleBody).click();

        cy.get(article.manageArticleTitle)
          .contains('Please fill the field');
        cy.get(`${article.manageArticleSubmit} button`)
          .should('be.disabled');
      });
    });

    it('Verify that user unable to upload photo with size more that 1mb', function () {
      cy.get(`input[type=file]`)
        .attachFile(
          'images/moreThan1mb.jpg',
          { subjectType: 'drag-n-drop' }
        );

      cy.contains('Looks like you are trying upload too big file.');
    });

    it('Verify that user unable to upload photo with invalid file type', function () {
      cy.get(`input[type=file]`).selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.txt',
        mimeType: 'txt',
      }, { force: true });

      cy.contains('Looks like you are using unsupported file types. Please use only .png or .jpg.');
    });

    it('Verify that user able to create new article', () => {
      cy.fixture('article').then(article => {
        cy.get(article.manageArticleTitle)
          .type(article.mock.title);
        cy.get(article.manageArticleBody)
          .type(article.mock.body);
        cy.get(`input[type=file]`)
          .attachFile(
            'images/file.png',
            { subjectType: 'drag-n-drop' }
          );
        cy.wait(500);
        cy.get(article.imageCropperConfirm).click();

        cy.get(article.manageArticlePhoto)
          .should('be.visible');
        cy.get(`${article.manageArticleSubmit} button`)
          .should('not.be.disabled').click();
        cy.contains('Article successfully created and published.');
      })
    })
  });

  describe('View articles', () => {
    it('Verify that user able to filter articles by category', function () {
      cy.fixture('article').then(article => {
        const testCategoryOption = 'Art';

        cy.get(article.categorySelector).click();
        cy.get(`[data-test='category_${testCategoryOption}']`).click();
        cy.get(article.categorySelector).contains(testCategoryOption);
        cy.wait(500);

        cy.get(article.articlePreviewItem).each((el) =>
          cy.wrap(el).contains(testCategoryOption.toUpperCase()));
      })
    });

    it('Verify that user able navigate to the article preview page', function () {
      cy.fixture('article').then(article => {
        cy.get(article.articlePreviewItem).first().contains('Read more').click();
        cy.get(article.articleViewCard).should('be.visible');
      });
    });

    it('Verify that user able to remove the article', function () {
      cy.fixture('article').then(article => {
        cy.get(article.articlePreviewManage).first().click();
        cy.get(article.articlePreviewRemove).should('be.visible').click();
        cy.contains('Article successfully deleted.');
      });
    });

    it('Verify that user able to load more articles', function () {
      cy.fixture('article').then(article => {
        cy.get(article.loadMoreBtn).click();
        cy.wait(500);
        cy.get(article.articlePreviewItem).should('have.length.gt', 10);
      });
    });
  });

  afterEach(() => cy.promo_logout());
});
