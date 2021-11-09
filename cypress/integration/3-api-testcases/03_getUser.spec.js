/// <reference types="Cypress" />

describe('Get API User test', function () {

    let accessToken = '2de746467799ecef3d6ae3ed750f243d58c59594346b6983450aff3141c44bdd'
    let baseUrlGetAPI = 'https://gorest.co.in/public/v1/users'

    it('get users test', function () {
        cy.log('get users test')
        cy.request({
            method: 'GET',
            url: baseUrlGetAPI,
            headers: {
                'authorization': 'Bearer ' + accessToken
            }
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body.meta.pagination.limit).to.be.equal(20)
        })
    })

    it('get users by ID test', function () {
        cy.log('get users by ID test')
        cy.request({
            method: 'GET',
            url: baseUrlGetAPI + '/3107',
            headers: {
                'authorization': 'Bearer ' + accessToken
            }
        }).then((res) => {
            expect(res.status).to.be.equal(200)
            expect(res.body.data.id).to.be.equal(3107)
        })
    })
})