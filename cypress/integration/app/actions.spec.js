/// <reference types="Cypress" />

context('Authentication', () => {



  it('Login - Login me email dhe password', () => {
	cy.visit('http://localhost:3333/login')
    cy.get('#email').type('kristoeri82@gmail.com')
    cy.get('#password').type('ErmalI82')
    cy.get('button[type=submit]').click()
	
	cy.get('#navbarDropdownMenuLink').should('contain.text', 'Ermal Kristo');

  })

  it('Logout - Klikon mbi butonin e Logout', () => {
	
	cy.get('#navbarDropdownMenuLink').click();
	
	cy.get('#logout').click()

	cy.get('#login').should('contain.text', 'Login');

  })


})
context('Friends', () => {

  it('Login - Login me email dhe password', () => {
	cy.visit('http://localhost:3333/login')
    cy.get('#email').type('kristoeri82@gmail.com')
    cy.get('#password').type('ErmalI82')
    cy.get('button[type=submit]').click()
	
	cy.get('#navbarDropdownMenuLink').should('contain.text', 'Ermal Kristo');

	cy.visit('http://localhost:3333/users')

	
    cy.get('a[data-friendship-status=not-following]').eq(1).invoke('attr', 'data-user-id').then(($userId) => {
		cy.wait(4000)
		cy.get('a[data-friendship-status=not-following]').eq(1).click()
		cy.wait(4000)
		cy.visit('http://localhost:3333/account/friends')

		cy.wait(4000)
		cy.get('a.following-link[data-user-id='+$userId+']').click()
		cy.wait(4000)
	})
	


  })


  it('Perdoruesit - Validon perdorimin e nje adrese emaili te sakte ne profil ', () => {
	cy.visit('http://localhost:3333/login')
    cy.get('#email').type('kristoeri82@gmail.com')
    cy.get('#password').type('ErmalI82')
    cy.get('button[type=submit]').click()
	
	cy.get('#navbarDropdownMenuLink').should('contain.text', 'Ermal Kristo');	  
	
	cy.visit('http://localhost:3333/account')


	cy.wait(3000)
    cy.get('#email').clear().type('kristoeri82@gmail')
	cy.wait(3000)
	
	
    cy.get('button[type=submit]').eq(0).click()
	cy.wait(2000)
	cy.get('.alert.alert-danger').should('contain', 'email validation failed on email')


  })




})
