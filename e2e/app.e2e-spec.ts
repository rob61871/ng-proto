import { IspotPage } from './app.po'

describe('ispot App', () => {
  let page: IspotPage

  beforeEach(() => {
    page = new IspotPage()
  })

  it('should display welcome message', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('Welcome to app!')
  })
})
