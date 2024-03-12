describe('spec.cy.ts', () => {
  it('should login', () => {
    cy.visit('http://localhost:4200/login')
      .get('[routerLink="/register"]')
      .click()
      .get('[routerLink="/login"]')
      .click()
      .get('[formControlName="email"]')
      .type('johnny@joe.com')
      .get('[formControlName="password"]')
      .type('johnny')
      .get('[type="submit"]')
      .click()

  })

  it('should logout', () => {
    localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWUwNWM2N2FhMjA4ZjMxMDM1M2U2YWMiLCJlbWFpbCI6ImpvaG5ueUBqb2UuY29tIiwiaWF0IjoxNzEwMjUzMjMxfQ.9qpNy1DpmFD5sgaLi3Z3I_UJr2-ueP8_0hw31LJ1XCg')

    cy.visit('http://localhost:4200')
      .get('#mon_compte')
      .click()
      .get('#logout')
      .click()
  })
})
