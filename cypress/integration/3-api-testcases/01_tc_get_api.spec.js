/// <reference types="Cypress" />

describe('Get API for Rest', function () {

    it('Get Api test for flask - motor bike', function () {
        cy.log('Get Api test for flask - motor bike')
        cy.request('https://flask-rest-api-demo.herokuapp.com/product/motorbike')
            .then(function (response) {
                expect(response.status).to.be.equal(200)
                expect(response.body.product[0]).has.property('price', 599.99)
                expect(response.body.product[0]).has.property('product', "motorbike")
            })
    })

    it('Get Api test for flask - Users', function () {
        cy.log('Get Api test for flask - Users')
        cy.request('https://flask-rest-api-demo.herokuapp.com/users')
            .then(function (response) {
                expect(response.status).to.be.equal(200)
                expect(response.body.users[0]).has.property('username', "test_1")
                expect(response.body.users[1]).has.property('id', 2)
                expect(response.body.users).has.length(5)
                expect(response.body.users[0]).not.have.property('price')
            })
    })

    it('Get Api test for flask - Users using params', function () {
        cy.log('Get Api test for flask - Users using params')
        cy.request('https://reqres.in/api/users?page=2')
            .then(function (response) {
                expect(response.status).to.be.equal(200)
                expect(response.body).has.property('page', 2)
                expect(response.body.data).has.length(6)
                expect(response.body.data[0]).has.property('id', 7)
            })
    })
})