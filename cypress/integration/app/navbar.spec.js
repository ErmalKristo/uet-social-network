/// <reference types="Cypress" />

context('Navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3333')
  })

  // https://on.cypress.io/interacting-with-elements

	it('Navbar - Teston nese elemnti Navbar ndodhet ne Faqen e pare', () => {
		cy.get('a.navbar-brand') .should('have.text', 'Detyre Kursi');
		
	})


})
