describe('Visual regression tests of static pages', () => {
  it('Should match previous screenshot "Accueil"', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Tutoriel"', () => {
    cy.visit('/tutoriel')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "À propos"', () => {
    cy.visit('/a-propos')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Accessibilite"', () => {
    cy.visit('/accessibilite')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Amis"', () => {
    cy.visit('/amis')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Nouveautes"', () => {
    cy.visit('/nouveautes')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Personas"', () => {
    cy.visit('/personas')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Actions"', () => {
    cy.visit('/actions')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "FAQ"', () => {
    cy.visit('/questions-frequentes')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Profil"', () => {
    cy.visit('/profil')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Diffuser"', () => {
    cy.visit('/diffuser')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Blog"', () => {
    cy.visit('/blog')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Ambassadeurs"', () => {
    cy.visit('/ambassadeurs')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Plan du site"', () => {
    cy.visit('/plan-du-site')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
  it('Should match previous screenshot "Accessibilite"', () => {
    cy.visit('/accessibilite')
    cy.wait(1000)
    cy.matchImageSnapshot()
  })
})
