/// <reference types="Cypress" />

const dataJson = require('../../fixtures/createUser.json')

describe('Post and Delete and Get API User test', function () {

    let accessToken = '2de746467799ecef3d6ae3ed750f243d58c59594346b6983450aff3141c44bdd'
    let baseUrlPostAPI = 'https://gorest.co.in/public/v1/users'
    let randomText = ''
    let userId = ''

    it('get users test', function () {
        cy.log('get users test')
        cy.log('email', randomText + '@gmail.com')

        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        for (var ii = 0; ii < 15; ii++) {
            randomText += chars[Math.floor(Math.random() * chars.length)];
        }

        cy.fixture('createUser').then((payload) => {
            cy.request({
                method: 'POST',
                url: baseUrlPostAPI,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                body: {
                    "name": payload.name,
                    "email": randomText + "@gmail.com",
                    "gender": payload.gender,
                    "status": payload.status
                }
            }).then((res) => {
                expect(res.status).to.be.equal(201)
                expect(res.body.data).have.property('id')
                expect(res.body.data).have.property('name', payload.name)
                expect(res.body.data).have.property('email', randomText + "@gmail.com")
                cy.log("Response", JSON.stringify(res))
            })
                .then((response) => {
                    userId = response.body.data.id
                    cy.log('userId', userId)

                    cy.request({
                        method: 'DELETE',
                        url: baseUrlPostAPI + '/' + userId,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    }).then((getRes) => {
                        expect(getRes.status).to.be.equal(204)
                    }).then(() => {
                        cy.log('get users test')
                        cy.request({
                            method: 'GET',
                            url: baseUrlPostAPI + '/' + userId,
                            failOnStatusCode: false,
                            headers: {
                                'authorization': 'Bearer ' + accessToken
                            }
                        }).then((res) => {
                            expect(res.status).to.be.equal(404)
                            expect(res.body.data).have.property('message', 'Resource not found')
                        })
                    })
                })
        })
    })
})