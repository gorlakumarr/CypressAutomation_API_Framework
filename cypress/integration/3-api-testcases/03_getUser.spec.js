/// <reference types="Cypress" />

describe('Api testing with Aliases', function () {

    beforeEach(() => {
        cy.request('/users?page=2').as('usersGetApi')
    })

    it('Validate the header info', function () {
        cy.get('@usersGetApi')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('Validate the status code', function () {
        cy.get('@usersGetApi')
            .its('status')
            .should('equal', 200)
    })

    it('Validate the response body - Check total pages', function () {
        cy.get('@usersGetApi')
            .its('body')
            .should('contain', { "total_pages": 2 })
    })

    it('Validate the response body - user info data json array', function () {
        cy.get('@usersGetApi')
            .its('body')
            .then((response) => {
                expect(response.data[0]).has.property('first_name', 'Michael')
            })
    })
})