/// <reference types="Cypress" />

describe('intercept with cypress examples', function () {

    it('test api with simple intercept', () => {

        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept({
            path: '/posts'
        }).as('posts')

        cy.get('table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a')
            .click()
        cy.wait('@posts').then(res => {
            cy.log(JSON.stringify(res))
            console.log(JSON.stringify(res))
            expect(res.response.body).to.have.length(100)
        })
    })

    it.only('mock the api using intercept', () => {

        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept('GET', '/posts', { totalpost: 5 }).as('post')

        cy.get('table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a')
            .click()
        cy.wait('@post').then(res => {
            cy.log(JSON.stringify(res))
            console.log(JSON.stringify(res))
            expect(res.response.body).to.have.property('totalpost', 5)
        })
    })
})