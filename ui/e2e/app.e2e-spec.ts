import { UiPage } from './app.po';

describe('ui App', function() {
  let page: UiPage;

  beforeEach(() => {
    page = new UiPage();
  });

  it('should display message saying IT WORKS! - SASS + TS = <3', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('IT WORKS! - SASS + TS = <3');
  });
});
