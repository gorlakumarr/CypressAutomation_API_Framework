/// <reference types="Cypress" />

describe('OAuth feature test', function () {

    let access_token = ''
    let baseUrl = 'http://coop.apps.symfonycasts.com'
    let userId = ''

    before('Generate Token and User Id', () => {
        cy.log('Generate Token and User Id')
        cy.request({
            method: 'POST',
            url: baseUrl + '/token',
            form: true,
            body: {
                "client_id": 'cypressApplication',
                "client_secret": '4fb4f73eadf8d0b4764a0c5dddee0c72',
                "grant_type": 'client_credentials'
            }
        }).then((response) => {
            cy.log('Token Response ', JSON.stringify(response))
            access_token = response.body.access_token
            cy.log('token', response.body.access_token)

            cy.request({
                method: 'GET',
                url: baseUrl + '/api/me',
                headers: {
                    'Authorization': "Bearer " + access_token
                }
            }).then((getRes) => {
                userId = getRes.body.id
                cy.log('userId', userId)
            })
        })
    })

    it('Unlock Chickens Feed', () => {
        cy.request({
            method: 'POST',
            url: baseUrl + '/api/' + userId + '/chickens-feed',
            headers: {
                'Authorization': "Bearer " + access_token
            }
        }).then((putRes) => {
            cy.log('Post Response', JSON.stringify(putRes))
            expect(putRes.status).to.be.equal(200)
            expect(putRes.body).have.property('action', 'chickens-feed')
        })
    })
})