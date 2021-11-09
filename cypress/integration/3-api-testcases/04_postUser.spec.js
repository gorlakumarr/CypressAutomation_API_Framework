/// <reference types="Cypress" />

describe('Post API User test', function () {

    let accessToken = '2de746467799ecef3d6ae3ed750f243d58c59594346b6983450aff3141c44bdd'
    let baseUrlPostAPI = 'https://gorest.co.in/public/v1/users'
    let randomText = ''

    it('get users test', function () {

        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
        for (var ii = 0; ii < 15; ii++) {
            randomText += chars[Math.floor(Math.random() * chars.length)];
        }


        cy.log('get users test')
        cy.request({
            method: 'POST',
            url: baseUrlPostAPI,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                "name": "test automation",
                "email": randomText + "@gmail.com",
                "gender": "male",
                "status": "active"
            }
        }).then((res) => {
            expect(res.status).to.be.equal(201)
            expect(res.body.data).have.property('id')
            expect(res.body.data).have.property('name', 'test automation')
            expect(res.body.data).have.property('email', randomText + "@gmail.com")
            cy.log("Response", JSON.stringify(res))
        })
    })
})